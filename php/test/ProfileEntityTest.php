<?php
declare(strict_types=1);

// Profile entity test

require_once __DIR__ . '/../railwaystationphotos_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ProfileEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = RailwayStationPhotosSDK::test(null, null);
        $ent = $testsdk->Profile(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = profile_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "profile." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set RAILWAY_STATION_PHOTOS_TEST_PROFILE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $profile_ref01_ent = $client->Profile(null);
        $profile_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.profile"), "profile_ref01"));

        $profile_ref01_data_result = $profile_ref01_ent->create($profile_ref01_data, null);
        $profile_ref01_data = Helpers::to_map(is_object($profile_ref01_data_result) && method_exists($profile_ref01_data_result, 'data_get') ? $profile_ref01_data_result->data_get() : $profile_ref01_data_result);
        $this->assertNotNull($profile_ref01_data);

        // LOAD
        $profile_ref01_match_dt0 = [];
        $profile_ref01_data_dt0_loaded = $profile_ref01_ent->load($profile_ref01_match_dt0, null);
        $this->assertNotNull($profile_ref01_data_dt0_loaded);


    }
}

function profile_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/profile/ProfileTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = RailwayStationPhotosSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["profile01", "profile02", "profile03", "email_verification01", "email_verification02", "email_verification03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("RAILWAY_STATION_PHOTOS_TEST_PROFILE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "RAILWAY_STATION_PHOTOS_TEST_PROFILE_ENTID" => $idmap,
        "RAILWAY_STATION_PHOTOS_TEST_LIVE" => "FALSE",
        "RAILWAY_STATION_PHOTOS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["RAILWAY_STATION_PHOTOS_TEST_PROFILE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["RAILWAY_STATION_PHOTOS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        $client = new RailwayStationPhotosSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["RAILWAY_STATION_PHOTOS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["RAILWAY_STATION_PHOTOS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
