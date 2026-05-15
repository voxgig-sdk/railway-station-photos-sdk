-- ProjectName SDK exists test

local sdk = require("railway-station-photos_sdk")

describe("RailwayStationPhotosSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
