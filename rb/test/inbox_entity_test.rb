# Inbox entity test

require "minitest/autorun"
require "json"
require_relative "../RailwayStationPhotos_sdk"
require_relative "runner"

class InboxEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = RailwayStationPhotosSDK.test(nil, nil)
    ent = testsdk.Inbox(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "inbox" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = RailwayStationPhotosSDK.test(seed, nil).Inbox(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "inbox" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = RailwayStationPhotosSDK.test(seed, nil)
    seen = base.Inbox(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = RailwayStationPhotosConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = RailwayStationPhotosSDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Inbox(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < RailwayStationPhotosBaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "inbox hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      RailwayStationPhotosSDK.test(offline, nil).Inbox(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    RailwayStationPhotosSDK.test(offline, nil).Inbox(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = RailwayStationPhotosConfig.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = RailwayStationPhotosSDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.Inbox(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    RailwayStationPhotosSDK.test(nil, nil).Inbox(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = RailwayStationPhotosSDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.Inbox(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.Inbox(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate
    cfg = RailwayStationPhotosConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = RailwayStationPhotosSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Inbox(nil).list({ "show_completed_entry" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = inbox_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "inbox." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live] && ENV["VOXGIG_GETONLY_GUARD"] == "TRUE"
      puts "LIVE STEP {\"id\":\"inbox.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /userInbox\"}"
      puts "LIVE STEP {\"id\":\"inbox.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /userInbox/{id}\"}"
      puts "LIVE STEP {\"id\":\"inbox.list.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}"
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    inbox_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.inbox")))
    inbox_ref01_data = nil
    if inbox_ref01_data_raw.length > 0
      inbox_ref01_data = Helpers.to_map(inbox_ref01_data_raw[0][1])
    end

    # LIST
    inbox_ref01_ent = client.Inbox(nil)
    inbox_ref01_match = {}

    inbox_ref01_list_result = inbox_ref01_ent.list(inbox_ref01_match, nil)
    assert inbox_ref01_list_result.is_a?(Array)

      return
    end

    client = setup[:client]

    # CREATE
    inbox_ref01_ent = client.Inbox(nil)
    inbox_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.inbox"), "inbox_ref01"))

    inbox_ref01_data_result = inbox_ref01_ent.create(inbox_ref01_data, nil)
    inbox_ref01_data = Helpers.to_map(inbox_ref01_data_result.respond_to?(:data_get) ? inbox_ref01_data_result.data_get : inbox_ref01_data_result)
    assert !inbox_ref01_data.nil?
    assert !inbox_ref01_data["id"].nil?

    # LIST
    inbox_ref01_match = {}

    inbox_ref01_list_result = inbox_ref01_ent.list(inbox_ref01_match, nil)
    assert inbox_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(inbox_ref01_list_result),
      { "id" => inbox_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # REMOVE
    inbox_ref01_match_rm0 = {
      "id" => inbox_ref01_data["id"],
    }
    inbox_ref01_ent.remove(inbox_ref01_match_rm0, nil)

    # LIST
    inbox_ref01_match_rt0 = {}

    inbox_ref01_list_rt0_result = inbox_ref01_ent.list(inbox_ref01_match_rt0, nil)
    assert inbox_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(inbox_ref01_list_rt0_result),
      { "id" => inbox_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def inbox_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "inbox", "InboxTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = RailwayStationPhotosSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["inbox01", "inbox02", "inbox03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTID" => idmap,
    "RAILWAY_STATION_PHOTOS_TEST_LIVE" => "FALSE",
    "RAILWAY_STATION_PHOTOS_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTID"])
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
