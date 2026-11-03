# PhotoStationById entity test

require "minitest/autorun"
require "json"
require_relative "../RailwayStationPhotos_sdk"
require_relative "runner"

class PhotoStationByIdEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = RailwayStationPhotosSDK.test(nil, nil)
    ent = testsdk.PhotoStationById(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = RailwayStationPhotosConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = RailwayStationPhotosSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.PhotoStationById(nil).load({ "country" => 1, "id" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = photo_station_by_id_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "photo_station_by_id." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["country01", "photo_station_by_id01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATION_BY_ID_ENTID")
        end
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "photo_station_by_id") do
        [{ "id" => setup[:idmap]["photo_station_by_id01"] }]
      end
    end

    # Bootstrap entity data from existing test data.
    photo_station_by_id_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.photo_station_by_id")))
    photo_station_by_id_ref01_data = nil
    if photo_station_by_id_ref01_data_raw.length > 0
      photo_station_by_id_ref01_data = Helpers.to_map(photo_station_by_id_ref01_data_raw[0][1])
    end

    # LOAD
    photo_station_by_id_ref01_ent = client.PhotoStationById(nil)
    photo_station_by_id_ref01_match_dt0 = {
      "id" => photo_station_by_id_ref01_data["id"],
    }
    photo_station_by_id_ref01_match_dt0["country"] = setup[:idmap]["country"] || setup[:idmap]["country01"]
    photo_station_by_id_ref01_data_dt0_loaded = photo_station_by_id_ref01_ent.load(photo_station_by_id_ref01_match_dt0, nil)
    photo_station_by_id_ref01_data_dt0_load_result = Helpers.to_map(photo_station_by_id_ref01_data_dt0_loaded.respond_to?(:data_get) ? photo_station_by_id_ref01_data_dt0_loaded.data_get : photo_station_by_id_ref01_data_dt0_loaded)
    assert !photo_station_by_id_ref01_data_dt0_load_result.nil?
    assert_equal photo_station_by_id_ref01_data_dt0_load_result["id"], photo_station_by_id_ref01_data["id"]

  end
end

def photo_station_by_id_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "photo_station_by_id", "PhotoStationByIdTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = RailwayStationPhotosSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["photo_station_by_id01", "photo_station_by_id02", "photo_station_by_id03", "country01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATION_BY_ID_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATION_BY_ID_ENTID" => idmap,
    "RAILWAY_STATION_PHOTOS_TEST_LIVE" => "FALSE",
    "RAILWAY_STATION_PHOTOS_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATION_BY_ID_ENTID"])
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
