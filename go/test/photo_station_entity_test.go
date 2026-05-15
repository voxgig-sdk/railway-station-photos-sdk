package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/railway-station-photos-sdk"
	"github.com/voxgig-sdk/railway-station-photos-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestPhotoStationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PhotoStation(nil)
		if ent == nil {
			t.Fatal("expected non-nil PhotoStationEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := photo_stationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "photo_station." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set RAILWAYSTATIONPHOTOS_TEST_PHOTO_STATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		photoStationRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.photo_station", setup.data)))
		var photoStationRef01Data map[string]any
		if len(photoStationRef01DataRaw) > 0 {
			photoStationRef01Data = core.ToMapAny(photoStationRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = photoStationRef01Data

		// LIST
		photoStationRef01Ent := client.PhotoStation(nil)
		photoStationRef01Match := map[string]any{}

		photoStationRef01ListResult, err := photoStationRef01Ent.List(photoStationRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, photoStationRef01ListOk := photoStationRef01ListResult.([]any)
		if !photoStationRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", photoStationRef01ListResult)
		}

		// LOAD
		photoStationRef01MatchDt0 := map[string]any{}
		photoStationRef01DataDt0Loaded, err := photoStationRef01Ent.Load(photoStationRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if photoStationRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func photo_stationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "photo_station", "PhotoStationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read photo_station test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse photo_station test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"photo_station01", "photo_station02", "photo_station03", "photo_station_by_id01", "photo_station_by_id02", "photo_station_by_id03", "photo_stations_by_country01", "photo_stations_by_country02", "photo_stations_by_country03", "photo_stations_by_photographer01", "photo_stations_by_photographer02", "photo_stations_by_photographer03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("RAILWAYSTATIONPHOTOS_TEST_PHOTO_STATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"RAILWAYSTATIONPHOTOS_TEST_PHOTO_STATION_ENTID": idmap,
		"RAILWAYSTATIONPHOTOS_TEST_LIVE":      "FALSE",
		"RAILWAYSTATIONPHOTOS_TEST_EXPLAIN":   "FALSE",
		"RAILWAYSTATIONPHOTOS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["RAILWAYSTATIONPHOTOS_TEST_PHOTO_STATION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["RAILWAYSTATIONPHOTOS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["RAILWAYSTATIONPHOTOS_APIKEY"],
			},
			extra,
		})
		client = sdk.NewRailwayStationPhotosSDK(core.ToMapAny(mergedOpts))
	}

	live := env["RAILWAYSTATIONPHOTOS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["RAILWAYSTATIONPHOTOS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
