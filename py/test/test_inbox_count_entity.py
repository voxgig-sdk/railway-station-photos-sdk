# InboxCount entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from railwaystationphotos_sdk import RailwayStationPhotosSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestInboxCountEntity:

    def test_should_create_instance(self):
        testsdk = RailwayStationPhotosSDK.test(None, None)
        ent = testsdk.InboxCount(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _inbox_count_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "inbox_count." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set RAILWAYSTATIONPHOTOS_TEST_INBOX_COUNT_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        inbox_count_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.inbox_count")))
        inbox_count_ref01_data = None
        if len(inbox_count_ref01_data_raw) > 0:
            inbox_count_ref01_data = helpers.to_map(inbox_count_ref01_data_raw[0][1])

        # LOAD
        inbox_count_ref01_ent = client.InboxCount(None)
        inbox_count_ref01_match_dt0 = {}
        inbox_count_ref01_data_dt0_loaded, err = inbox_count_ref01_ent.load(inbox_count_ref01_match_dt0, None)
        assert err is None
        assert inbox_count_ref01_data_dt0_loaded is not None



def _inbox_count_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/inbox_count/InboxCountTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = RailwayStationPhotosSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["inbox_count01", "inbox_count02", "inbox_count03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "RAILWAYSTATIONPHOTOS_TEST_INBOX_COUNT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "RAILWAYSTATIONPHOTOS_TEST_INBOX_COUNT_ENTID": idmap,
        "RAILWAYSTATIONPHOTOS_TEST_LIVE": "FALSE",
        "RAILWAYSTATIONPHOTOS_TEST_EXPLAIN": "FALSE",
        "RAILWAYSTATIONPHOTOS_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("RAILWAYSTATIONPHOTOS_TEST_INBOX_COUNT_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("RAILWAYSTATIONPHOTOS_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("RAILWAYSTATIONPHOTOS_APIKEY"),
            },
            extra or {},
        ])
        client = RailwayStationPhotosSDK(helpers.to_map(merged_opts))

    _live = env.get("RAILWAYSTATIONPHOTOS_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("RAILWAYSTATIONPHOTOS_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
