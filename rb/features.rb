# RailwayStationPhotos SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module RailwayStationPhotosFeatures
  def self.make_feature(name)
    case name
    when "base"
      RailwayStationPhotosBaseFeature.new
    when "test"
      RailwayStationPhotosTestFeature.new
    else
      RailwayStationPhotosBaseFeature.new
    end
  end
end
