# PhotoStation entity test

require "minitest/autorun"
require "json"
require_relative "../RailwayStationPhotos_sdk"
require_relative "runner"

class PhotoStationEntityTest < Minitest::Test
  def test_create_instance
    testsdk = RailwayStationPhotosSDK.test(nil, nil)
    ent = testsdk.PhotoStation(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = photo_station_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "photo_station." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set RAILWAYSTATIONPHOTOS_TEST_PHOTO_STATION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    photo_station_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.photo_station")))
    photo_station_ref01_data = nil
    if photo_station_ref01_data_raw.length > 0
      photo_station_ref01_data = Helpers.to_map(photo_station_ref01_data_raw[0][1])
    end

    # LIST
    photo_station_ref01_ent = client.PhotoStation(nil)
    photo_station_ref01_match = {}

    photo_station_ref01_list_result = photo_station_ref01_ent.list(photo_station_ref01_match, nil)
    assert photo_station_ref01_list_result.is_a?(Array)

    # LOAD
    photo_station_ref01_match_dt0 = {}
    photo_station_ref01_data_dt0_loaded = photo_station_ref01_ent.load(photo_station_ref01_match_dt0, nil)
    assert !photo_station_ref01_data_dt0_loaded.nil?

  end
end

def photo_station_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "photo_station", "PhotoStationTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = RailwayStationPhotosSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["photo_station01", "photo_station02", "photo_station03", "photo_station_by_id01", "photo_station_by_id02", "photo_station_by_id03", "photo_stations_by_country01", "photo_stations_by_country02", "photo_stations_by_country03", "photo_stations_by_photographer01", "photo_stations_by_photographer02", "photo_stations_by_photographer03"],
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
  entid_env_raw = ENV["RAILWAYSTATIONPHOTOS_TEST_PHOTO_STATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "RAILWAYSTATIONPHOTOS_TEST_PHOTO_STATION_ENTID" => idmap,
    "RAILWAYSTATIONPHOTOS_TEST_LIVE" => "FALSE",
    "RAILWAYSTATIONPHOTOS_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["RAILWAYSTATIONPHOTOS_TEST_PHOTO_STATION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["RAILWAYSTATIONPHOTOS_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = RailwayStationPhotosSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["RAILWAYSTATIONPHOTOS_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["RAILWAYSTATIONPHOTOS_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
