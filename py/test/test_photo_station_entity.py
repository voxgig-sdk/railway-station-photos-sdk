# PhotoStation entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from railwaystationphotos_sdk import RailwayStationPhotosSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestPhotoStationEntity:

    def test_should_create_instance(self):
        testsdk = RailwayStationPhotosSDK.test(None, None)
        ent = testsdk.PhotoStation(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _photo_station_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "photo_station." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set RAILWAYSTATIONPHOTOS_TEST_PHOTO_STATION_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        photo_station_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.photo_station")))
        photo_station_ref01_data = None
        if len(photo_station_ref01_data_raw) > 0:
            photo_station_ref01_data = helpers.to_map(photo_station_ref01_data_raw[0][1])

        # LIST
        photo_station_ref01_ent = client.PhotoStation(None)
        photo_station_ref01_match = {}

        photo_station_ref01_list_result = photo_station_ref01_ent.list(photo_station_ref01_match, None)
        assert isinstance(photo_station_ref01_list_result, list)

        # LOAD
        photo_station_ref01_match_dt0 = {}
        photo_station_ref01_data_dt0_loaded = photo_station_ref01_ent.load(photo_station_ref01_match_dt0, None)
        assert photo_station_ref01_data_dt0_loaded is not None



def _photo_station_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/photo_station/PhotoStationTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = RailwayStationPhotosSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["photo_station01", "photo_station02", "photo_station03", "photo_station_by_id01", "photo_station_by_id02", "photo_station_by_id03", "photo_stations_by_country01", "photo_stations_by_country02", "photo_stations_by_country03", "photo_stations_by_photographer01", "photo_stations_by_photographer02", "photo_stations_by_photographer03"],
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
        "RAILWAYSTATIONPHOTOS_TEST_PHOTO_STATION_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "RAILWAYSTATIONPHOTOS_TEST_PHOTO_STATION_ENTID": idmap,
        "RAILWAYSTATIONPHOTOS_TEST_LIVE": "FALSE",
        "RAILWAYSTATIONPHOTOS_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("RAILWAYSTATIONPHOTOS_TEST_PHOTO_STATION_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("RAILWAYSTATIONPHOTOS_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
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
