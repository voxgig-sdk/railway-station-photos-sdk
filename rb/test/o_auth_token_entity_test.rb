# OAuthToken entity test

require "minitest/autorun"
require "json"
require_relative "../RailwayStationPhotos_sdk"
require_relative "runner"

class OAuthTokenEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = RailwayStationPhotosSDK.test(nil, nil)
    ent = testsdk.OAuthToken(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = RailwayStationPhotosConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = RailwayStationPhotosSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.OAuthToken(nil).create({ "access_token" => 1, "client_id" => "x", "grant_type" => "x", "redirect_uri" => "x", "scope" => "x", "token_type" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = o_auth_token_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "o_auth_token." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"o_auth_token.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /oauth2/token\"}"
      skip("Live coverage incomplete: o_auth_token.create.0 excluded (GET-only live run: needs POST /oauth2/token)")
    end

    client = setup[:client]

    # CREATE
    o_auth_token_ref01_ent = client.OAuthToken(nil)
    o_auth_token_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.o_auth_token"), "o_auth_token_ref01"))

    o_auth_token_ref01_data_result = o_auth_token_ref01_ent.create(o_auth_token_ref01_data, nil)
    o_auth_token_ref01_data = Helpers.to_map(o_auth_token_ref01_data_result.respond_to?(:data_get) ? o_auth_token_ref01_data_result.data_get : o_auth_token_ref01_data_result)
    assert !o_auth_token_ref01_data.nil?

  end
end

def o_auth_token_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "o_auth_token", "OAuthTokenTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = RailwayStationPhotosSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["o_auth_token01", "o_auth_token02", "o_auth_token03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["RAILWAY_STATION_PHOTOS_TEST_O_AUTH_TOKEN_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "RAILWAY_STATION_PHOTOS_TEST_O_AUTH_TOKEN_ENTID" => idmap,
    "RAILWAY_STATION_PHOTOS_TEST_LIVE" => "FALSE",
    "RAILWAY_STATION_PHOTOS_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["RAILWAY_STATION_PHOTOS_TEST_O_AUTH_TOKEN_ENTID"])
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
