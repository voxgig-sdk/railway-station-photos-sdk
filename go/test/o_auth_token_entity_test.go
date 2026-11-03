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
const o_auth_tokenEntityLiveStrict = true


func TestOAuthTokenEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.OAuthToken(nil)
		if ent == nil {
			t.Fatal("expected non-nil OAuthTokenEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.OAuthToken(nil).Create(map[string]any{"access_token": 1, "client_id": "x", "grant_type": "x", "redirect_uri": "x", "scope": "x", "token_type": "x"}, nil)
		if sdkerr, ok := err.(*core.RailwayStationPhotosError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := o_auth_tokenBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "o_auth_token." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live && os.Getenv("VOXGIG_GETONLY_GUARD") == "TRUE" {
			t.Log("LIVE STEP {\"id\":\"o_auth_token.create.0\",\"state\":\"excluded\",\"attempted\":false,\"reason\":\"GET-only live run: needs POST /oauth2/token\"}")
			t.Skip("Live coverage incomplete: o_auth_token.create.0 excluded (GET-only live run: needs POST /oauth2/token)")
			return
		}

		client := setup.client
		_ = client

		// CREATE
		oAuthTokenRef01Ent := client.OAuthToken(nil)
		oAuthTokenRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "o_auth_token"}), "o_auth_token_ref01"))

		oAuthTokenRef01DataResult, err := oAuthTokenRef01Ent.Create(oAuthTokenRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		oAuthTokenRef01Data = core.ToMapAny(entityData(oAuthTokenRef01DataResult))
		if oAuthTokenRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func o_auth_tokenBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "o_auth_token", "OAuthTokenTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read o_auth_token test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse o_auth_token test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"o_auth_token01", "o_auth_token02", "o_auth_token03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("RAILWAY_STATION_PHOTOS_TEST_O_AUTH_TOKEN_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"RAILWAY_STATION_PHOTOS_TEST_O_AUTH_TOKEN_ENTID": idmap,
		"RAILWAY_STATION_PHOTOS_TEST_LIVE":      "FALSE",
		"RAILWAY_STATION_PHOTOS_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["RAILWAY_STATION_PHOTOS_TEST_O_AUTH_TOKEN_ENTID"])
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
