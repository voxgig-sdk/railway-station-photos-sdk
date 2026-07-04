<?php
declare(strict_types=1);

// RailwayStationPhotos SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class RailwayStationPhotosSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new RailwayStationPhotosUtility();
        $this->_utility = $utility;

        $config = RailwayStationPhotosConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = RailwayStationPhotosHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = RailwayStationPhotosHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, RailwayStationPhotosFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return RailwayStationPhotosUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = RailwayStationPhotosHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = RailwayStationPhotosHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = RailwayStationPhotosHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new RailwayStationPhotosSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = RailwayStationPhotosHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = RailwayStationPhotosHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_admin_inbox = null;

    // Canonical facade: $client->AdminInbox()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->admin_inbox()
    // resolves here too.
    public function AdminInbox($data = null)
    {
        require_once __DIR__ . '/entity/admin_inbox_entity.php';
        if ($data === null) {
            if ($this->_admin_inbox === null) {
                $this->_admin_inbox = new AdminInboxEntity($this, null);
            }
            return $this->_admin_inbox;
        }
        return new AdminInboxEntity($this, $data);
    }


    private $_country = null;

    // Canonical facade: $client->Country()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->country()
    // resolves here too.
    public function Country($data = null)
    {
        require_once __DIR__ . '/entity/country_entity.php';
        if ($data === null) {
            if ($this->_country === null) {
                $this->_country = new CountryEntity($this, null);
            }
            return $this->_country;
        }
        return new CountryEntity($this, $data);
    }


    private $_inbox = null;

    // Canonical facade: $client->Inbox()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->inbox()
    // resolves here too.
    public function Inbox($data = null)
    {
        require_once __DIR__ . '/entity/inbox_entity.php';
        if ($data === null) {
            if ($this->_inbox === null) {
                $this->_inbox = new InboxEntity($this, null);
            }
            return $this->_inbox;
        }
        return new InboxEntity($this, $data);
    }


    private $_inbox_count = null;

    // Canonical facade: $client->InboxCount()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->inbox_count()
    // resolves here too.
    public function InboxCount($data = null)
    {
        require_once __DIR__ . '/entity/inbox_count_entity.php';
        if ($data === null) {
            if ($this->_inbox_count === null) {
                $this->_inbox_count = new InboxCountEntity($this, null);
            }
            return $this->_inbox_count;
        }
        return new InboxCountEntity($this, $data);
    }


    private $_inbox_entry = null;

    // Canonical facade: $client->InboxEntry()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->inbox_entry()
    // resolves here too.
    public function InboxEntry($data = null)
    {
        require_once __DIR__ . '/entity/inbox_entry_entity.php';
        if ($data === null) {
            if ($this->_inbox_entry === null) {
                $this->_inbox_entry = new InboxEntryEntity($this, null);
            }
            return $this->_inbox_entry;
        }
        return new InboxEntryEntity($this, $data);
    }


    private $_inbox_state_query = null;

    // Canonical facade: $client->InboxStateQuery()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->inbox_state_query()
    // resolves here too.
    public function InboxStateQuery($data = null)
    {
        require_once __DIR__ . '/entity/inbox_state_query_entity.php';
        if ($data === null) {
            if ($this->_inbox_state_query === null) {
                $this->_inbox_state_query = new InboxStateQueryEntity($this, null);
            }
            return $this->_inbox_state_query;
        }
        return new InboxStateQueryEntity($this, $data);
    }


    private $_o_auth_token = null;

    // Canonical facade: $client->OAuthToken()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->o_auth_token()
    // resolves here too.
    public function OAuthToken($data = null)
    {
        require_once __DIR__ . '/entity/o_auth_token_entity.php';
        if ($data === null) {
            if ($this->_o_auth_token === null) {
                $this->_o_auth_token = new OAuthTokenEntity($this, null);
            }
            return $this->_o_auth_token;
        }
        return new OAuthTokenEntity($this, $data);
    }


    private $_oauth = null;

    // Canonical facade: $client->Oauth()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->oauth()
    // resolves here too.
    public function Oauth($data = null)
    {
        require_once __DIR__ . '/entity/oauth_entity.php';
        if ($data === null) {
            if ($this->_oauth === null) {
                $this->_oauth = new OauthEntity($this, null);
            }
            return $this->_oauth;
        }
        return new OauthEntity($this, $data);
    }


    private $_photo = null;

    // Canonical facade: $client->Photo()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->photo()
    // resolves here too.
    public function Photo($data = null)
    {
        require_once __DIR__ . '/entity/photo_entity.php';
        if ($data === null) {
            if ($this->_photo === null) {
                $this->_photo = new PhotoEntity($this, null);
            }
            return $this->_photo;
        }
        return new PhotoEntity($this, $data);
    }


    private $_photo_download = null;

    // Canonical facade: $client->PhotoDownload()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->photo_download()
    // resolves here too.
    public function PhotoDownload($data = null)
    {
        require_once __DIR__ . '/entity/photo_download_entity.php';
        if ($data === null) {
            if ($this->_photo_download === null) {
                $this->_photo_download = new PhotoDownloadEntity($this, null);
            }
            return $this->_photo_download;
        }
        return new PhotoDownloadEntity($this, $data);
    }


    private $_photo_station = null;

    // Canonical facade: $client->PhotoStation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->photo_station()
    // resolves here too.
    public function PhotoStation($data = null)
    {
        require_once __DIR__ . '/entity/photo_station_entity.php';
        if ($data === null) {
            if ($this->_photo_station === null) {
                $this->_photo_station = new PhotoStationEntity($this, null);
            }
            return $this->_photo_station;
        }
        return new PhotoStationEntity($this, $data);
    }


    private $_photo_upload = null;

    // Canonical facade: $client->PhotoUpload()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->photo_upload()
    // resolves here too.
    public function PhotoUpload($data = null)
    {
        require_once __DIR__ . '/entity/photo_upload_entity.php';
        if ($data === null) {
            if ($this->_photo_upload === null) {
                $this->_photo_upload = new PhotoUploadEntity($this, null);
            }
            return $this->_photo_upload;
        }
        return new PhotoUploadEntity($this, $data);
    }


    private $_photographer = null;

    // Canonical facade: $client->Photographer()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->photographer()
    // resolves here too.
    public function Photographer($data = null)
    {
        require_once __DIR__ . '/entity/photographer_entity.php';
        if ($data === null) {
            if ($this->_photographer === null) {
                $this->_photographer = new PhotographerEntity($this, null);
            }
            return $this->_photographer;
        }
        return new PhotographerEntity($this, $data);
    }


    private $_profile = null;

    // Canonical facade: $client->Profile()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->profile()
    // resolves here too.
    public function Profile($data = null)
    {
        require_once __DIR__ . '/entity/profile_entity.php';
        if ($data === null) {
            if ($this->_profile === null) {
                $this->_profile = new ProfileEntity($this, null);
            }
            return $this->_profile;
        }
        return new ProfileEntity($this, $data);
    }


    private $_public_inbox = null;

    // Canonical facade: $client->PublicInbox()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->public_inbox()
    // resolves here too.
    public function PublicInbox($data = null)
    {
        require_once __DIR__ . '/entity/public_inbox_entity.php';
        if ($data === null) {
            if ($this->_public_inbox === null) {
                $this->_public_inbox = new PublicInboxEntity($this, null);
            }
            return $this->_public_inbox;
        }
        return new PublicInboxEntity($this, $data);
    }


    private $_stat = null;

    // Canonical facade: $client->Stat()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->stat()
    // resolves here too.
    public function Stat($data = null)
    {
        require_once __DIR__ . '/entity/stat_entity.php';
        if ($data === null) {
            if ($this->_stat === null) {
                $this->_stat = new StatEntity($this, null);
            }
            return $this->_stat;
        }
        return new StatEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new RailwayStationPhotosSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
