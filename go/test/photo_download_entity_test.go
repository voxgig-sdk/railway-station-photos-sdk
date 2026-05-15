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

func TestPhotoDownloadEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PhotoDownload(nil)
		if ent == nil {
			t.Fatal("expected non-nil PhotoDownloadEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := photo_downloadBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "photo_download." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set RAILWAYSTATIONPHOTOS_TEST_PHOTO_DOWNLOAD_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		photoDownloadRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.photo_download", setup.data)))
		var photoDownloadRef01Data map[string]any
		if len(photoDownloadRef01DataRaw) > 0 {
			photoDownloadRef01Data = core.ToMapAny(photoDownloadRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = photoDownloadRef01Data

		// LOAD
		photoDownloadRef01Ent := client.PhotoDownload(nil)
		photoDownloadRef01MatchDt0 := map[string]any{}
		photoDownloadRef01DataDt0Loaded, err := photoDownloadRef01Ent.Load(photoDownloadRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if photoDownloadRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func photo_downloadBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "photo_download", "PhotoDownloadTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read photo_download test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse photo_download test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"photo_download01", "photo_download02", "photo_download03", "done01", "done02", "done03", "processed01", "processed02", "processed03", "rejected01", "rejected02", "rejected03", "inbox01", "inbox02", "inbox03"},
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
	entidEnvRaw := os.Getenv("RAILWAYSTATIONPHOTOS_TEST_PHOTO_DOWNLOAD_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"RAILWAYSTATIONPHOTOS_TEST_PHOTO_DOWNLOAD_ENTID": idmap,
		"RAILWAYSTATIONPHOTOS_TEST_LIVE":      "FALSE",
		"RAILWAYSTATIONPHOTOS_TEST_EXPLAIN":   "FALSE",
		"RAILWAYSTATIONPHOTOS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["RAILWAYSTATIONPHOTOS_TEST_PHOTO_DOWNLOAD_ENTID"])
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
