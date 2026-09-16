# RailwayStationPhotos SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module RailwayStationPhotosFeatures
  def self.make_feature(name)
    case name
    when "base"
      RailwayStationPhotosBaseFeature.new
    when "ratelimit"
      RailwayStationPhotosRatelimitFeature.new
    when "retry"
      RailwayStationPhotosRetryFeature.new
    when "test"
      RailwayStationPhotosTestFeature.new
    when "timeout"
      RailwayStationPhotosTimeoutFeature.new
    else
      RailwayStationPhotosBaseFeature.new
    end
  end
end
