<?php
declare(strict_types=1);

// Inbox entity test

require_once __DIR__ . '/../railwaystationphotos_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class InboxEntityTestFailHook extends RailwayStationPhotosBaseFeature
{
    public int $unexpected = 0;

    public function __construct()
    {
        parent::__construct();
        $this->name = 'failhook';
    }

    public function init(RailwayStationPhotosContext $ctx, array $options): void
    {
    }

    public function PreSpec(RailwayStationPhotosContext $ctx): void
    {
        throw new \RuntimeException('inbox hook failed');
    }

    public function PreUnexpected(RailwayStationPhotosContext $ctx): void
    {
        $this->unexpected++;
    }
}

class InboxEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = RailwayStationPhotosSDK::test(null, null);
        $ent = $testsdk->Inbox(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "inbox" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = RailwayStationPhotosSDK::test($seed, null);
        $seen = iterator_to_array($base->Inbox(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = RailwayStationPhotosConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = RailwayStationPhotosSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Inbox(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_stream_error(): void
    {
        $offline = ["net" => ["offline" => true]];
        $streamerr = null;
        try {
            iterator_to_array(RailwayStationPhotosSDK::test($offline, null)->Inbox(null)
                ->stream("list", null, null), false);
        } catch (\Throwable $e) {
            $streamerr = $e;
        }
        $this->assertNotNull($streamerr, 'the stream should raise the transport failure');
        $this->assertStringContainsString('offline', $streamerr->getMessage());

        iterator_to_array(RailwayStationPhotosSDK::test($offline, null)->Inbox(null)
            ->stream("list", null, ["ctrl" => ["throw" => false]]), false);

        $cfg = RailwayStationPhotosConfig::shared_config();
        if (isset($cfg["feature"]["rbac"])) {
            $denied = RailwayStationPhotosSDK::test(null, ["feature" => ["rbac" => ["active" => true, "deny" => true]]]);
            $denyerr = null;
            try {
                iterator_to_array($denied->Inbox(null)->stream("list", null, null), false);
            } catch (\Throwable $e) {
                $denyerr = $e;
            }
            $this->assertSame('rbac_denied', $denyerr->sdk_code ?? null);
        }
    }

    public function test_stream_ctrl(): void
    {
        $ctrl = ["explain" => []];
        iterator_to_array(RailwayStationPhotosSDK::test(null, null)->Inbox(null)
            ->stream("list", null, ["ctrl" => $ctrl]), false);
        $this->assertSame(["explain"], array_keys($ctrl));
    }

    public function test_unexpected(): void
    {
        $hook = new InboxEntityTestFailHook();
        $client = new RailwayStationPhotosSDK(["feature" => ["test" => ["active" => true]], "extend" => [$hook]]);

        $err = null;
        try {
            $client->Inbox(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertNotNull($err, 'the throwing hook should fail the operation');
        $this->assertStringContainsString('hook failed', $err->getMessage());
        $this->assertGreaterThan(0, $hook->unexpected, 'PreUnexpected did not fire');

        $fired = $hook->unexpected;
        $this->assertNull($client->Inbox(null)->list(null, ["throw" => false]));
        $this->assertGreaterThan($fired, $hook->unexpected, 'PreUnexpected did not fire');
    }

    public function test_cost_commits_a_throwing_transport(): void
    {
        $cfg = RailwayStationPhotosConfig::shared_config();
        if (!isset($cfg["feature"]["cost"])) {
            $this->markTestSkipped('feature not present in this SDK: cost');
        }
        $client = new RailwayStationPhotosSDK([
            "test" => ["active" => true],
            "feature" => ["cost" => ["active" => true, "unit" => 1]],
            "utility" => ["fetcher" => function ($ctx, $url, $fetchdef) {
                throw new \RuntimeException('inbox transport failed');
            }],
        ]);

        $err = null;
        try {
            $client->Inbox(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertInstanceOf(RailwayStationPhotosError::class, $err);
        $this->assertStringContainsString('transport failed', $err->getMessage());

        $client->Inbox(null)->list(null, ["throw" => false]);
        $this->assertSame(2, $client->_cost["total"]["calls"]);
        $this->assertSame(2, $client->_cost["total"]["attempts"]);
    }

    public function test_validate(): void
    {
        $cfg = RailwayStationPhotosConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = RailwayStationPhotosSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->Inbox(null)->list(["show_completed_entry" => 'x'], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = inbox_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "inbox." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        if (!empty($setup["live"]) && getenv('VOXGIG_GETONLY_GUARD') === "TRUE") {
            fwrite(STDOUT, 'LIVE STEP {"id":"inbox.create.0","state":"excluded","attempted":false,"reason":"GET-only live run: needs POST /userInbox"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"inbox.remove.2","state":"excluded","attempted":false,"reason":"GET-only live run: needs DELETE /userInbox/{id}"}' . "\n");
            fwrite(STDOUT, 'LIVE STEP {"id":"inbox.list.3","state":"excluded","attempted":false,"reason":"GET-only live run: checks a removal this run does not make"}' . "\n");
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $inbox_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.inbox")));
        $inbox_ref01_data = null;
        if (count($inbox_ref01_data_raw) > 0) {
            $inbox_ref01_data = Helpers::to_map($inbox_ref01_data_raw[0][1]);
        }

        // LIST
        $inbox_ref01_ent = $client->Inbox(null);
        $inbox_ref01_match = [];

        $inbox_ref01_list_result = $inbox_ref01_ent->list($inbox_ref01_match, null);
        $this->assertIsArray($inbox_ref01_list_result);

            return;
        }

        $client = $setup["client"];

        // CREATE
        $inbox_ref01_ent = $client->Inbox(null);
        $inbox_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.inbox"), "inbox_ref01"));

        $inbox_ref01_data_result = $inbox_ref01_ent->create($inbox_ref01_data, null);
        $inbox_ref01_data = Helpers::to_map(is_object($inbox_ref01_data_result) && method_exists($inbox_ref01_data_result, 'data_get') ? $inbox_ref01_data_result->data_get() : $inbox_ref01_data_result);
        $this->assertNotNull($inbox_ref01_data);
        $this->assertNotNull($inbox_ref01_data["id"]);

        // LIST
        $inbox_ref01_match = [];

        $inbox_ref01_list_result = $inbox_ref01_ent->list($inbox_ref01_match, null);
        $this->assertIsArray($inbox_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($inbox_ref01_list_result),
            ["id" => $inbox_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // REMOVE
        $inbox_ref01_match_rm0 = [
            "id" => $inbox_ref01_data["id"],
        ];
        $inbox_ref01_ent->remove($inbox_ref01_match_rm0, null);

        // LIST
        $inbox_ref01_match_rt0 = [];

        $inbox_ref01_list_rt0_result = $inbox_ref01_ent->list($inbox_ref01_match_rt0, null);
        $this->assertIsArray($inbox_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($inbox_ref01_list_rt0_result),
            ["id" => $inbox_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function inbox_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/inbox/InboxTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = RailwayStationPhotosSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["inbox01", "inbox02", "inbox03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTID" => $idmap,
        "RAILWAY_STATION_PHOTOS_TEST_LIVE" => "FALSE",
        "RAILWAY_STATION_PHOTOS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTID"]);
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
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new RailwayStationPhotosSDK(Helpers::to_map($merged_opts) ?? []);
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
