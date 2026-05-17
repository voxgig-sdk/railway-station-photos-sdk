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

func TestAdminInboxEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.AdminInbox(nil)
		if ent == nil {
			t.Fatal("expected non-nil AdminInboxEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := admin_inboxBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "admin_inbox." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set RAILWAYSTATIONPHOTOS_TEST_ADMIN_INBOX_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		adminInboxRef01Ent := client.AdminInbox(nil)
		adminInboxRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "admin_inbox"}, setup.data), "admin_inbox_ref01"))

		adminInboxRef01DataResult, err := adminInboxRef01Ent.Create(adminInboxRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		adminInboxRef01Data = core.ToMapAny(adminInboxRef01DataResult)
		if adminInboxRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if adminInboxRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

	})
}

func admin_inboxBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "admin_inbox", "AdminInboxTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read admin_inbox test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse admin_inbox test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"admin_inbox01", "admin_inbox02", "admin_inbox03"},
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
	entidEnvRaw := os.Getenv("RAILWAYSTATIONPHOTOS_TEST_ADMIN_INBOX_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"RAILWAYSTATIONPHOTOS_TEST_ADMIN_INBOX_ENTID": idmap,
		"RAILWAYSTATIONPHOTOS_TEST_LIVE":      "FALSE",
		"RAILWAYSTATIONPHOTOS_TEST_EXPLAIN":   "FALSE",
		"RAILWAYSTATIONPHOTOS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["RAILWAYSTATIONPHOTOS_TEST_ADMIN_INBOX_ENTID"])
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
