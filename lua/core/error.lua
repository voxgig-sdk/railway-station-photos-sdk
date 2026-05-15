-- RailwayStationPhotos SDK error

local RailwayStationPhotosError = {}
RailwayStationPhotosError.__index = RailwayStationPhotosError


function RailwayStationPhotosError.new(code, msg, ctx)
  local self = setmetatable({}, RailwayStationPhotosError)
  self.is_sdk_error = true
  self.sdk = "RailwayStationPhotos"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function RailwayStationPhotosError:error()
  return self.msg
end


function RailwayStationPhotosError:__tostring()
  return self.msg
end


return RailwayStationPhotosError
