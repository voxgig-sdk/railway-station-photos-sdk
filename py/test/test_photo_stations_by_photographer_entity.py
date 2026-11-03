# PhotoStationsByPhotographer entity test

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



# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


class TestPhotoStationsByPhotographerEntity:

    def test_should_create_instance(self):
        testsdk = RailwayStationPhotosSDK.test(None, None)
        ent = testsdk.PhotoStationsByPhotographer(None)
        assert ent is not None

    def test_should_refuse_an_invalid_request(self):
        if "validate" not in (shared_config().get("feature") or {}):
            pytest.skip("feature not present in this SDK: validate")
        client = RailwayStationPhotosSDK.test(
            None, {"feature": {"validate": {"active": True}}})
        with pytest.raises(Exception) as err:
            client.PhotoStationsByPhotographer(None).load({"id": 1}, None)
        assert "validate_failed" == getattr(err.value, "code", None)

    def test_should_run_basic_flow(self):
        setup = _photo_stations_by_photographer_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "photo_stations_by_photographer." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        if setup["live"]:
            for _live_key in ["photo_stations_by_photographer01"]:
                if setup.get("synthetic_only") or setup["idmap"].get(_live_key) is None:
                    runner.live_miss(LIVE_STRICT, f"Live entity test blocked: needs {_live_key} via RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_PHOTOGRAPHER_ENTID")
        client = setup["client"]
        if setup["live"]:
            runner.live_existing(setup, LIVE_STRICT, "photo_stations_by_photographer",
                                 lambda: [{"id": setup["idmap"].get("photo_stations_by_photographer01")}])

        # Bootstrap entity data from existing test data.
        photo_stations_by_photographer_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.photo_stations_by_photographer")))
        photo_stations_by_photographer_ref01_data = None
        if len(photo_stations_by_photographer_ref01_data_raw) > 0:
            photo_stations_by_photographer_ref01_data = helpers.to_map(photo_stations_by_photographer_ref01_data_raw[0][1])

        # LOAD
        photo_stations_by_photographer_ref01_ent = client.PhotoStationsByPhotographer(None)
        photo_stations_by_photographer_ref01_match_dt0 = {
            "id": photo_stations_by_photographer_ref01_data["id"],
        }
        photo_stations_by_photographer_ref01_data_dt0_loaded = photo_stations_by_photographer_ref01_ent.load(photo_stations_by_photographer_ref01_match_dt0, None)
        photo_stations_by_photographer_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(photo_stations_by_photographer_ref01_data_dt0_loaded))
        assert photo_stations_by_photographer_ref01_data_dt0_load_result is not None
        assert photo_stations_by_photographer_ref01_data_dt0_load_result["id"] == photo_stations_by_photographer_ref01_data["id"]



def _photo_stations_by_photographer_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/photo_stations_by_photographer/PhotoStationsByPhotographerTestData.json")
    with open(entity_data_file, "r", encoding="utf-8") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = RailwayStationPhotosSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["photo_stations_by_photographer01", "photo_stations_by_photographer02", "photo_stations_by_photographer03"],
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
        "RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_PHOTOGRAPHER_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_PHOTOGRAPHER_ENTID": idmap,
        "RAILWAY_STATION_PHOTOS_TEST_LIVE": "FALSE",
        "RAILWAY_STATION_PHOTOS_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_PHOTOGRAPHER_ENTID"))
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
