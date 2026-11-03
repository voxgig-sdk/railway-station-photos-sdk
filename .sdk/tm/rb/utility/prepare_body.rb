# RailwayStationPhotos SDK utility: prepare_body
require_relative 'media'
module RailwayStationPhotosUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return RailwayStationPhotosUtilities.raw_body(ctx.reqdata) if RailwayStationPhotosUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
