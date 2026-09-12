<?php
declare(strict_types=1);

// AdminInbox entity test

require_once __DIR__ . '/../railwaystationphotos_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class AdminInboxEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = RailwayStationPhotosSDK::test(null, null);
        $ent = $testsdk->AdminInbox(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = admin_inbox_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "admin_inbox." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set RAILWAY_STATION_PHOTOS_TEST_ADMIN_INBOX_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $admin_inbox_ref01_ent = $client->AdminInbox(null);
        $admin_inbox_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.admin_inbox"), "admin_inbox_ref01"));

        $admin_inbox_ref01_data_result = $admin_inbox_ref01_ent->create($admin_inbox_ref01_data, null);
        $admin_inbox_ref01_data = Helpers::to_map(is_object($admin_inbox_ref01_data_result) && method_exists($admin_inbox_ref01_data_result, 'data_get') ? $admin_inbox_ref01_data_result->data_get() : $admin_inbox_ref01_data_result);
        $this->assertNotNull($admin_inbox_ref01_data);
        $this->assertNotNull($admin_inbox_ref01_data["id"]);

    }
}

function admin_inbox_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/admin_inbox/AdminInboxTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = RailwayStationPhotosSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["admin_inbox01", "admin_inbox02", "admin_inbox03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("RAILWAY_STATION_PHOTOS_TEST_ADMIN_INBOX_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "RAILWAY_STATION_PHOTOS_TEST_ADMIN_INBOX_ENTID" => $idmap,
        "RAILWAY_STATION_PHOTOS_TEST_LIVE" => "FALSE",
        "RAILWAY_STATION_PHOTOS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["RAILWAY_STATION_PHOTOS_TEST_ADMIN_INBOX_ENTID"]);
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
