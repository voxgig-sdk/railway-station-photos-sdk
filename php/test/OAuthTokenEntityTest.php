<?php
declare(strict_types=1);

// OAuthToken entity test

require_once __DIR__ . '/../railwaystationphotos_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class OAuthTokenEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = RailwayStationPhotosSDK::test(null, null);
        $ent = $testsdk->OAuthToken(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = o_auth_token_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "o_auth_token." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set RAILWAYSTATIONPHOTOS_TEST_O_AUTH_TOKEN_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $o_auth_token_ref01_ent = $client->OAuthToken(null);
        $o_auth_token_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.o_auth_token"), "o_auth_token_ref01"));

        $o_auth_token_ref01_data_result = $o_auth_token_ref01_ent->create($o_auth_token_ref01_data, null);
        $o_auth_token_ref01_data = Helpers::to_map($o_auth_token_ref01_data_result);
        $this->assertNotNull($o_auth_token_ref01_data);

    }
}

function o_auth_token_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/o_auth_token/OAuthTokenTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = RailwayStationPhotosSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["o_auth_token01", "o_auth_token02", "o_auth_token03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("RAILWAYSTATIONPHOTOS_TEST_O_AUTH_TOKEN_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "RAILWAYSTATIONPHOTOS_TEST_O_AUTH_TOKEN_ENTID" => $idmap,
        "RAILWAYSTATIONPHOTOS_TEST_LIVE" => "FALSE",
        "RAILWAYSTATIONPHOTOS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["RAILWAYSTATIONPHOTOS_TEST_O_AUTH_TOKEN_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["RAILWAYSTATIONPHOTOS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new RailwayStationPhotosSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["RAILWAYSTATIONPHOTOS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["RAILWAYSTATIONPHOTOS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
