# PhotoStationsByCountry entity test

require "minitest/autorun"
require "json"
require_relative "../RailwayStationPhotos_sdk"
require_relative "runner"

class PhotoStationsByCountryEntityTest < Minitest::Test
  def test_create_instance
    testsdk = RailwayStationPhotosSDK.test(nil, nil)
    ent = testsdk.PhotoStationsByCountry(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = photo_stations_by_country_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "photo_stations_by_country." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_COUNTRY_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    photo_stations_by_country_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.photo_stations_by_country")))
    photo_stations_by_country_ref01_data = nil
    if photo_stations_by_country_ref01_data_raw.length > 0
      photo_stations_by_country_ref01_data = Helpers.to_map(photo_stations_by_country_ref01_data_raw[0][1])
    end

    # LOAD
    photo_stations_by_country_ref01_ent = client.PhotoStationsByCountry(nil)
    photo_stations_by_country_ref01_match_dt0 = {
      "id" => photo_stations_by_country_ref01_data["id"],
    }
    photo_stations_by_country_ref01_data_dt0_loaded = photo_stations_by_country_ref01_ent.load(photo_stations_by_country_ref01_match_dt0, nil)
    photo_stations_by_country_ref01_data_dt0_load_result = Helpers.to_map(photo_stations_by_country_ref01_data_dt0_loaded.respond_to?(:data_get) ? photo_stations_by_country_ref01_data_dt0_loaded.data_get : photo_stations_by_country_ref01_data_dt0_loaded)
    assert !photo_stations_by_country_ref01_data_dt0_load_result.nil?
    assert_equal photo_stations_by_country_ref01_data_dt0_load_result["id"], photo_stations_by_country_ref01_data["id"]

  end
end

def photo_stations_by_country_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "photo_stations_by_country", "PhotoStationsByCountryTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = RailwayStationPhotosSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["photo_stations_by_country01", "photo_stations_by_country02", "photo_stations_by_country03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_COUNTRY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_COUNTRY_ENTID" => idmap,
    "RAILWAY_STATION_PHOTOS_TEST_LIVE" => "FALSE",
    "RAILWAY_STATION_PHOTOS_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_COUNTRY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["RAILWAY_STATION_PHOTOS_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = RailwayStationPhotosSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["RAILWAY_STATION_PHOTOS_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["RAILWAY_STATION_PHOTOS_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
