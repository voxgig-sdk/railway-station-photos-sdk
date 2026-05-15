# RailwayStationPhotos SDK exists test

require "minitest/autorun"
require_relative "../RailwayStationPhotos_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = RailwayStationPhotosSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
