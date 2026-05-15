# RailwayStationPhotos SDK utility: make_context
require_relative '../core/context'
module RailwayStationPhotosUtilities
  MakeContext = ->(ctxmap, basectx) {
    RailwayStationPhotosContext.new(ctxmap, basectx)
  }
end
