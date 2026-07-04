# RailwayStationPhotos SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'RailwayStationPhotos_types'


class RailwayStationPhotosSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = RailwayStationPhotosUtility.new
    @_utility = utility

    config = RailwayStationPhotosConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = RailwayStationPhotosHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = RailwayStationPhotosHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, RailwayStationPhotosFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    RailwayStationPhotosUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = RailwayStationPhotosHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = RailwayStationPhotosHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = RailwayStationPhotosHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = RailwayStationPhotosSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue RailwayStationPhotosError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = RailwayStationPhotosHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = RailwayStationPhotosHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.admin_inbox.list / client.admin_inbox.load({ "id" => ... })
  def admin_inbox
    require_relative 'entity/admin_inbox_entity'
    @admin_inbox ||= AdminInboxEntity.new(self, nil)
  end

  # Deprecated: use client.admin_inbox instead.
  def AdminInbox(data = nil)
    require_relative 'entity/admin_inbox_entity'
    AdminInboxEntity.new(self, data)
  end


  # Idiomatic facade: client.country.list / client.country.load({ "id" => ... })
  def country
    require_relative 'entity/country_entity'
    @country ||= CountryEntity.new(self, nil)
  end

  # Deprecated: use client.country instead.
  def Country(data = nil)
    require_relative 'entity/country_entity'
    CountryEntity.new(self, data)
  end


  # Idiomatic facade: client.inbox.list / client.inbox.load({ "id" => ... })
  def inbox
    require_relative 'entity/inbox_entity'
    @inbox ||= InboxEntity.new(self, nil)
  end

  # Deprecated: use client.inbox instead.
  def Inbox(data = nil)
    require_relative 'entity/inbox_entity'
    InboxEntity.new(self, data)
  end


  # Idiomatic facade: client.inbox_count.list / client.inbox_count.load({ "id" => ... })
  def inbox_count
    require_relative 'entity/inbox_count_entity'
    @inbox_count ||= InboxCountEntity.new(self, nil)
  end

  # Deprecated: use client.inbox_count instead.
  def InboxCount(data = nil)
    require_relative 'entity/inbox_count_entity'
    InboxCountEntity.new(self, data)
  end


  # Idiomatic facade: client.inbox_entry.list / client.inbox_entry.load({ "id" => ... })
  def inbox_entry
    require_relative 'entity/inbox_entry_entity'
    @inbox_entry ||= InboxEntryEntity.new(self, nil)
  end

  # Deprecated: use client.inbox_entry instead.
  def InboxEntry(data = nil)
    require_relative 'entity/inbox_entry_entity'
    InboxEntryEntity.new(self, data)
  end


  # Idiomatic facade: client.inbox_state_query.list / client.inbox_state_query.load({ "id" => ... })
  def inbox_state_query
    require_relative 'entity/inbox_state_query_entity'
    @inbox_state_query ||= InboxStateQueryEntity.new(self, nil)
  end

  # Deprecated: use client.inbox_state_query instead.
  def InboxStateQuery(data = nil)
    require_relative 'entity/inbox_state_query_entity'
    InboxStateQueryEntity.new(self, data)
  end


  # Idiomatic facade: client.o_auth_token.list / client.o_auth_token.load({ "id" => ... })
  def o_auth_token
    require_relative 'entity/o_auth_token_entity'
    @o_auth_token ||= OAuthTokenEntity.new(self, nil)
  end

  # Deprecated: use client.o_auth_token instead.
  def OAuthToken(data = nil)
    require_relative 'entity/o_auth_token_entity'
    OAuthTokenEntity.new(self, data)
  end


  # Idiomatic facade: client.oauth.list / client.oauth.load({ "id" => ... })
  def oauth
    require_relative 'entity/oauth_entity'
    @oauth ||= OauthEntity.new(self, nil)
  end

  # Deprecated: use client.oauth instead.
  def Oauth(data = nil)
    require_relative 'entity/oauth_entity'
    OauthEntity.new(self, data)
  end


  # Idiomatic facade: client.photo.list / client.photo.load({ "id" => ... })
  def photo
    require_relative 'entity/photo_entity'
    @photo ||= PhotoEntity.new(self, nil)
  end

  # Deprecated: use client.photo instead.
  def Photo(data = nil)
    require_relative 'entity/photo_entity'
    PhotoEntity.new(self, data)
  end


  # Idiomatic facade: client.photo_download.list / client.photo_download.load({ "id" => ... })
  def photo_download
    require_relative 'entity/photo_download_entity'
    @photo_download ||= PhotoDownloadEntity.new(self, nil)
  end

  # Deprecated: use client.photo_download instead.
  def PhotoDownload(data = nil)
    require_relative 'entity/photo_download_entity'
    PhotoDownloadEntity.new(self, data)
  end


  # Idiomatic facade: client.photo_station.list / client.photo_station.load({ "id" => ... })
  def photo_station
    require_relative 'entity/photo_station_entity'
    @photo_station ||= PhotoStationEntity.new(self, nil)
  end

  # Deprecated: use client.photo_station instead.
  def PhotoStation(data = nil)
    require_relative 'entity/photo_station_entity'
    PhotoStationEntity.new(self, data)
  end


  # Idiomatic facade: client.photo_upload.list / client.photo_upload.load({ "id" => ... })
  def photo_upload
    require_relative 'entity/photo_upload_entity'
    @photo_upload ||= PhotoUploadEntity.new(self, nil)
  end

  # Deprecated: use client.photo_upload instead.
  def PhotoUpload(data = nil)
    require_relative 'entity/photo_upload_entity'
    PhotoUploadEntity.new(self, data)
  end


  # Idiomatic facade: client.photographer.list / client.photographer.load({ "id" => ... })
  def photographer
    require_relative 'entity/photographer_entity'
    @photographer ||= PhotographerEntity.new(self, nil)
  end

  # Deprecated: use client.photographer instead.
  def Photographer(data = nil)
    require_relative 'entity/photographer_entity'
    PhotographerEntity.new(self, data)
  end


  # Idiomatic facade: client.profile.list / client.profile.load({ "id" => ... })
  def profile
    require_relative 'entity/profile_entity'
    @profile ||= ProfileEntity.new(self, nil)
  end

  # Deprecated: use client.profile instead.
  def Profile(data = nil)
    require_relative 'entity/profile_entity'
    ProfileEntity.new(self, data)
  end


  # Idiomatic facade: client.public_inbox.list / client.public_inbox.load({ "id" => ... })
  def public_inbox
    require_relative 'entity/public_inbox_entity'
    @public_inbox ||= PublicInboxEntity.new(self, nil)
  end

  # Deprecated: use client.public_inbox instead.
  def PublicInbox(data = nil)
    require_relative 'entity/public_inbox_entity'
    PublicInboxEntity.new(self, data)
  end


  # Idiomatic facade: client.stat.list / client.stat.load({ "id" => ... })
  def stat
    require_relative 'entity/stat_entity'
    @stat ||= StatEntity.new(self, nil)
  end

  # Deprecated: use client.stat instead.
  def Stat(data = nil)
    require_relative 'entity/stat_entity'
    StatEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = RailwayStationPhotosSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
