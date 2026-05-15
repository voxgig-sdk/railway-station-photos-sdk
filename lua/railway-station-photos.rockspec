package = "voxgig-sdk-railway-station-photos"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/railway-station-photos-sdk.git"
}
description = {
  summary = "RailwayStationPhotos SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["railway-station-photos_sdk"] = "railway-station-photos_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
