-- RailwayStationPhotos SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local RailwayStationPhotosSDK = {}
RailwayStationPhotosSDK.__index = RailwayStationPhotosSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

RailwayStationPhotosSDK._make_feature = _make_feature


function RailwayStationPhotosSDK.new(options)
  local self = setmetatable({}, RailwayStationPhotosSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function RailwayStationPhotosSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function RailwayStationPhotosSDK:get_utility()
  return Utility.copy(self._utility)
end


function RailwayStationPhotosSDK:get_root_ctx()
  return self._rootctx
end


function RailwayStationPhotosSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function RailwayStationPhotosSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:AdminInbox():list() / client:AdminInbox():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function RailwayStationPhotosSDK:AdminInbox(data)
  local EntityMod = require("entity.admin_inbox_entity")
  if data == nil then
    if self._admin_inbox == nil then
      self._admin_inbox = EntityMod.new(self, nil)
    end
    return self._admin_inbox
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Country():list() / client:Country():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function RailwayStationPhotosSDK:Country(data)
  local EntityMod = require("entity.country_entity")
  if data == nil then
    if self._country == nil then
      self._country = EntityMod.new(self, nil)
    end
    return self._country
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Inbox():list() / client:Inbox():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function RailwayStationPhotosSDK:Inbox(data)
  local EntityMod = require("entity.inbox_entity")
  if data == nil then
    if self._inbox == nil then
      self._inbox = EntityMod.new(self, nil)
    end
    return self._inbox
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:InboxCount():list() / client:InboxCount():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function RailwayStationPhotosSDK:InboxCount(data)
  local EntityMod = require("entity.inbox_count_entity")
  if data == nil then
    if self._inbox_count == nil then
      self._inbox_count = EntityMod.new(self, nil)
    end
    return self._inbox_count
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:InboxEntry():list() / client:InboxEntry():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function RailwayStationPhotosSDK:InboxEntry(data)
  local EntityMod = require("entity.inbox_entry_entity")
  if data == nil then
    if self._inbox_entry == nil then
      self._inbox_entry = EntityMod.new(self, nil)
    end
    return self._inbox_entry
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:InboxStateQuery():list() / client:InboxStateQuery():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function RailwayStationPhotosSDK:InboxStateQuery(data)
  local EntityMod = require("entity.inbox_state_query_entity")
  if data == nil then
    if self._inbox_state_query == nil then
      self._inbox_state_query = EntityMod.new(self, nil)
    end
    return self._inbox_state_query
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:OAuthToken():list() / client:OAuthToken():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function RailwayStationPhotosSDK:OAuthToken(data)
  local EntityMod = require("entity.o_auth_token_entity")
  if data == nil then
    if self._o_auth_token == nil then
      self._o_auth_token = EntityMod.new(self, nil)
    end
    return self._o_auth_token
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Oauth():list() / client:Oauth():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function RailwayStationPhotosSDK:Oauth(data)
  local EntityMod = require("entity.oauth_entity")
  if data == nil then
    if self._oauth == nil then
      self._oauth = EntityMod.new(self, nil)
    end
    return self._oauth
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Photo():list() / client:Photo():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function RailwayStationPhotosSDK:Photo(data)
  local EntityMod = require("entity.photo_entity")
  if data == nil then
    if self._photo == nil then
      self._photo = EntityMod.new(self, nil)
    end
    return self._photo
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PhotoDownload():list() / client:PhotoDownload():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function RailwayStationPhotosSDK:PhotoDownload(data)
  local EntityMod = require("entity.photo_download_entity")
  if data == nil then
    if self._photo_download == nil then
      self._photo_download = EntityMod.new(self, nil)
    end
    return self._photo_download
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PhotoStation():list() / client:PhotoStation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function RailwayStationPhotosSDK:PhotoStation(data)
  local EntityMod = require("entity.photo_station_entity")
  if data == nil then
    if self._photo_station == nil then
      self._photo_station = EntityMod.new(self, nil)
    end
    return self._photo_station
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PhotoUpload():list() / client:PhotoUpload():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function RailwayStationPhotosSDK:PhotoUpload(data)
  local EntityMod = require("entity.photo_upload_entity")
  if data == nil then
    if self._photo_upload == nil then
      self._photo_upload = EntityMod.new(self, nil)
    end
    return self._photo_upload
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Photographer():list() / client:Photographer():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function RailwayStationPhotosSDK:Photographer(data)
  local EntityMod = require("entity.photographer_entity")
  if data == nil then
    if self._photographer == nil then
      self._photographer = EntityMod.new(self, nil)
    end
    return self._photographer
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Profile():list() / client:Profile():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function RailwayStationPhotosSDK:Profile(data)
  local EntityMod = require("entity.profile_entity")
  if data == nil then
    if self._profile == nil then
      self._profile = EntityMod.new(self, nil)
    end
    return self._profile
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PublicInbox():list() / client:PublicInbox():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function RailwayStationPhotosSDK:PublicInbox(data)
  local EntityMod = require("entity.public_inbox_entity")
  if data == nil then
    if self._public_inbox == nil then
      self._public_inbox = EntityMod.new(self, nil)
    end
    return self._public_inbox
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Stat():list() / client:Stat():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function RailwayStationPhotosSDK:Stat(data)
  local EntityMod = require("entity.stat_entity")
  if data == nil then
    if self._stat == nil then
      self._stat = EntityMod.new(self, nil)
    end
    return self._stat
  end
  return EntityMod.new(self, data)
end




function RailwayStationPhotosSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = RailwayStationPhotosSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return RailwayStationPhotosSDK
