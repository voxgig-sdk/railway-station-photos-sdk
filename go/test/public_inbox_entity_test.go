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

func TestPublicInboxEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PublicInbox(nil)
		if ent == nil {
			t.Fatal("expected non-nil PublicInboxEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := public_inboxBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "public_inbox." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set RAILWAYSTATIONPHOTOS_TEST_PUBLIC_INBOX_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		publicInboxRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.public_inbox", setup.data)))
		var publicInboxRef01Data map[string]any
		if len(publicInboxRef01DataRaw) > 0 {
			publicInboxRef01Data = core.ToMapAny(publicInboxRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = publicInboxRef01Data

		// LIST
		publicInboxRef01Ent := client.PublicInbox(nil)
		publicInboxRef01Match := map[string]any{}

		publicInboxRef01ListResult, err := publicInboxRef01Ent.List(publicInboxRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, publicInboxRef01ListOk := publicInboxRef01ListResult.([]any)
		if !publicInboxRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", publicInboxRef01ListResult)
		}

	})
}

func public_inboxBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "public_inbox", "PublicInboxTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read public_inbox test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse public_inbox test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"public_inbox01", "public_inbox02", "public_inbox03"},
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
	entidEnvRaw := os.Getenv("RAILWAYSTATIONPHOTOS_TEST_PUBLIC_INBOX_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"RAILWAYSTATIONPHOTOS_TEST_PUBLIC_INBOX_ENTID": idmap,
		"RAILWAYSTATIONPHOTOS_TEST_LIVE":      "FALSE",
		"RAILWAYSTATIONPHOTOS_TEST_EXPLAIN":   "FALSE",
		"RAILWAYSTATIONPHOTOS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["RAILWAYSTATIONPHOTOS_TEST_PUBLIC_INBOX_ENTID"])
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
