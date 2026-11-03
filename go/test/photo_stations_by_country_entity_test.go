package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/railway-station-photos-sdk/go"
	"github.com/voxgig-sdk/railway-station-photos-sdk/go/core"

	vs "github.com/voxgig-sdk/railway-station-photos-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const photo_stations_by_countryEntityLiveStrict = true


func TestPhotoStationsByCountryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PhotoStationsByCountry(nil)
		if ent == nil {
			t.Fatal("expected non-nil PhotoStationsByCountryEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.PhotoStationsByCountry(nil).Load(map[string]any{"id": 1}, nil)
		if sdkerr, ok := err.(*core.RailwayStationPhotosError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := photo_stations_by_countryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "photo_stations_by_country." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"photo_stations_by_country01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, photo_stations_by_countryEntityLiveStrict, "Live entity test blocked: needs %s via RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_COUNTRY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, photo_stations_by_countryEntityLiveStrict, setup.data, "photo_stations_by_country", func() (any, error) {
				return []any{map[string]any{"id": setup.idmap["photo_stations_by_country01"]}}, nil
			})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		photoStationsByCountryRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.photo_stations_by_country")))
		var photoStationsByCountryRef01Data map[string]any
		if len(photoStationsByCountryRef01DataRaw) > 0 {
			photoStationsByCountryRef01Data = core.ToMapAny(photoStationsByCountryRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = photoStationsByCountryRef01Data

		// LOAD
		photoStationsByCountryRef01Ent := client.PhotoStationsByCountry(nil)
		photoStationsByCountryRef01MatchDt0 := map[string]any{
			"id": photoStationsByCountryRef01Data["id"],
		}
		photoStationsByCountryRef01DataDt0Loaded, err := photoStationsByCountryRef01Ent.Load(photoStationsByCountryRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		photoStationsByCountryRef01DataDt0LoadResult := core.ToMapAny(entityData(photoStationsByCountryRef01DataDt0Loaded))
		if photoStationsByCountryRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if photoStationsByCountryRef01DataDt0LoadResult["id"] != photoStationsByCountryRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func photo_stations_by_countryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "photo_stations_by_country", "PhotoStationsByCountryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read photo_stations_by_country test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse photo_stations_by_country test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"photo_stations_by_country01", "photo_stations_by_country02", "photo_stations_by_country03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_COUNTRY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_COUNTRY_ENTID": idmap,
		"RAILWAY_STATION_PHOTOS_TEST_LIVE":      "FALSE",
		"RAILWAY_STATION_PHOTOS_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_COUNTRY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["RAILWAY_STATION_PHOTOS_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewRailwayStationPhotosSDK(core.ToMapAny(mergedOpts))
	}

	live := env["RAILWAY_STATION_PHOTOS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["RAILWAY_STATION_PHOTOS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
