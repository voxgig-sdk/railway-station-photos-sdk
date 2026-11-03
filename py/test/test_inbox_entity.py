# Inbox entity test

import json
import os
import time

import pytest

from railwaystationphotos_sdk.utility.voxgig_struct import voxgig_struct as vs
from railwaystationphotos_sdk import RailwayStationPhotosSDK
from railwaystationphotos_sdk.core import helpers
from railwaystationphotos_sdk.config import shared_config
from railwaystationphotos_sdk.feature.base_feature import RailwayStationPhotosBaseFeature

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class _FailHook(RailwayStationPhotosBaseFeature):
    def __init__(self):
        super().__init__()
        self.name = "failhook"
        self.unexpected = 0

    def init(self, ctx, options):
        pass

    def PreSpec(self, ctx):
        raise RuntimeError("inbox hook failed")

    def PreUnexpected(self, ctx):
        self.unexpected += 1



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestInboxEntity:

    def test_should_create_instance(self):
        testsdk = RailwayStationPhotosSDK.test(None, None)
        ent = testsdk.Inbox(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "inbox": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = RailwayStationPhotosSDK.test(seed, None)
        seen = list(base.Inbox(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from railwaystationphotos_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = RailwayStationPhotosSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Inbox(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_report_a_failed_stream(self):
        offline = {"net": {"offline": True}}
        with pytest.raises(Exception, match="offline"):
            list(RailwayStationPhotosSDK.test(offline, None).Inbox(None).stream("list", None, None))

        quiet = {"ctrl": {"throw": False}}
        list(RailwayStationPhotosSDK.test(offline, None).Inbox(None).stream("list", None, quiet))

        if "rbac" in (shared_config().get("feature") or {}):
            denied = RailwayStationPhotosSDK.test(
                None, {"feature": {"rbac": {"active": True, "deny": True}}})
            with pytest.raises(Exception) as err:
                list(denied.Inbox(None).stream("list", None, None))
            assert "rbac_denied" == getattr(err.value, "code", None)

    def test_should_leave_the_callers_ctrl(self):
        explain = {}
        ctrl = {"explain": explain}
        list(RailwayStationPhotosSDK.test(None, None).Inbox(None).stream("list", None, {"ctrl": ctrl}))
        assert ["explain"] == list(ctrl.keys())
        assert explain is ctrl["explain"] and 0 < len(explain)

    def test_should_fire_pre_unexpected(self):
        hook = _FailHook()
        client = RailwayStationPhotosSDK({"feature": {"test": {"active": True}}, "extend": [hook]})
        with pytest.raises(Exception, match="hook failed"):
            client.Inbox(None).list(None, None)
        assert 0 < hook.unexpected

        fired = hook.unexpected
        assert client.Inbox(None).list(None, {"throw": False}) is None
        assert fired < hook.unexpected

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = RailwayStationPhotosSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.Inbox(None).list({"show_completed_entry": "x"}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _inbox_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "inbox." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"] and os.environ.get("VOXGIG_GETONLY_GUARD") == "TRUE":
            print("LIVE STEP {\"id\":\"inbox.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /userInbox\"}")
            print("LIVE STEP {\"id\":\"inbox.remove.2\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs DELETE /userInbox/{id}\"}")
            print("LIVE STEP {\"id\":\"inbox.list.3\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: checks a removal this run does not make\"}")
            return self._run_get_only_flow(setup)

        client = setup["client"]

        # CREATE
        inbox_ref01_ent = client.Inbox(None)
        inbox_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.inbox"), "inbox_ref01"))

        inbox_ref01_data = helpers.to_map(runner.entity_data(inbox_ref01_ent.create(inbox_ref01_data, None)))
        assert inbox_ref01_data is not None
        assert inbox_ref01_data["id"] is not None

        # LIST
        inbox_ref01_match = {}

        inbox_ref01_list_result = inbox_ref01_ent.list(inbox_ref01_match, None)
        assert isinstance(inbox_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(inbox_ref01_list_result),
            {"id": inbox_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # REMOVE
        inbox_ref01_match_rm0 = {
            "id": inbox_ref01_data["id"],
        }
        inbox_ref01_ent.remove(inbox_ref01_match_rm0, None)

        # LIST
        inbox_ref01_match_rt0 = {}

        inbox_ref01_list_rt0_result = inbox_ref01_ent.list(inbox_ref01_match_rt0, None)
        assert isinstance(inbox_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(inbox_ref01_list_rt0_result),
            {"id": inbox_ref01_data["id"]})
        assert vs.isempty(not_found_item)


    def _run_get_only_flow(self, setup):
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        inbox_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.inbox")))
        inbox_ref01_data = None
        if len(inbox_ref01_data_raw) > 0:
            inbox_ref01_data = helpers.to_map(inbox_ref01_data_raw[0][1])

        # LIST
        inbox_ref01_ent = client.Inbox(None)
        inbox_ref01_match = {}

        inbox_ref01_list_result = inbox_ref01_ent.list(inbox_ref01_match, None)
        assert isinstance(inbox_ref01_list_result, list)



def _inbox_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/inbox/InboxTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = RailwayStationPhotosSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["inbox01", "inbox02", "inbox03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Whether *_ENTID supplied the idmap, read before env_override consumes
    # it: without it, the ids a live flow binds are the fixture's synthetic ones.
    _entid_env_raw = os.environ.get(
        "RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTID": idmap,
        "RAILWAY_STATION_PHOTOS_TEST_LIVE": "FALSE",
        "RAILWAY_STATION_PHOTOS_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("RAILWAY_STATION_PHOTOS_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
            },
            extra or {},
        ])
        client = RailwayStationPhotosSDK(helpers.to_map(merged_opts))

    _live = env.get("RAILWAY_STATION_PHOTOS_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("RAILWAY_STATION_PHOTOS_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
