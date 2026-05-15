# RailwayStationPhotos SDK utility: feature_add
module RailwayStationPhotosUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
