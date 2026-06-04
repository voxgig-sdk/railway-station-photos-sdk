<?php
declare(strict_types=1);

// Oauth entity test

require_once __DIR__ . '/../railwaystationphotos_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class OauthEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = RailwayStationPhotosSDK::test(null, null);
        $ent = $testsdk->Oauth(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = oauth_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "oauth." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set RAILWAYSTATIONPHOTOS_TEST_OAUTH_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $oauth_ref01_ent = $client->Oauth(null);
        $oauth_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.oauth"), "oauth_ref01"));

        [$oauth_ref01_data_result, $err] = $oauth_ref01_ent->create($oauth_ref01_data, null);
        $this->assertNull($err);
        $oauth_ref01_data = Helpers::to_map($oauth_ref01_data_result);
        $this->assertNotNull($oauth_ref01_data);

        // LOAD
        $oauth_ref01_match_dt0 = [];
        [$oauth_ref01_data_dt0_loaded, $err] = $oauth_ref01_ent->load($oauth_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($oauth_ref01_data_dt0_loaded);

    }
}

function oauth_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/oauth/OauthTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = RailwayStationPhotosSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["oauth01", "oauth02", "oauth03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("RAILWAYSTATIONPHOTOS_TEST_OAUTH_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "RAILWAYSTATIONPHOTOS_TEST_OAUTH_ENTID" => $idmap,
        "RAILWAYSTATIONPHOTOS_TEST_LIVE" => "FALSE",
        "RAILWAYSTATIONPHOTOS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["RAILWAYSTATIONPHOTOS_TEST_OAUTH_ENTID"]);
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
