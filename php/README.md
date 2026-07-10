# RailwayStationPhotos PHP SDK



The PHP SDK for the RailwayStationPhotos API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->AdminInbox()` — with named operations (`list`/`load`/`create`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/railway-station-photos-sdk/releases](https://github.com/voxgig-sdk/railway-station-photos-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'railwaystationphotos_sdk.php';

$client = new RailwayStationPhotosSDK();
```

### 3. Load a photo

Photo is nested under country, so provide the `country`.

```php
try {
    // load() returns the bare Photo record (throws on error).
    $photo = $client->Photo()->load(["country" => "example_country", "filename" => "example_filename"]);
    print_r($photo);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the bare created AdminInbox record.
$created = $client->AdminInbox()->create(["command" => "example_command", "id" => 1, "message" => "example_message", "status" => 1]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $countrys = $client->Country()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = RailwayStationPhotosSDK::test();

// Entity ops return the bare mock record (throws on error).
$country = $client->Country()->list();
print_r($country);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new RailwayStationPhotosSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### RailwayStationPhotosSDK

```php
require_once 'railwaystationphotos_sdk.php';
$client = new RailwayStationPhotosSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = RailwayStationPhotosSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### RailwayStationPhotosSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `AdminInbox` | `($data): AdminInboxEntity` | Create an AdminInbox entity instance. |
| `Country` | `($data): CountryEntity` | Create a Country entity instance. |
| `Inbox` | `($data): InboxEntity` | Create an Inbox entity instance. |
| `InboxCount` | `($data): InboxCountEntity` | Create an InboxCount entity instance. |
| `InboxEntry` | `($data): InboxEntryEntity` | Create an InboxEntry entity instance. |
| `InboxStateQuery` | `($data): InboxStateQueryEntity` | Create an InboxStateQuery entity instance. |
| `OAuthToken` | `($data): OAuthTokenEntity` | Create an OAuthToken entity instance. |
| `Oauth` | `($data): OauthEntity` | Create an Oauth entity instance. |
| `Photo` | `($data): PhotoEntity` | Create a Photo entity instance. |
| `PhotoDownload` | `($data): PhotoDownloadEntity` | Create a PhotoDownload entity instance. |
| `PhotoStation` | `($data): PhotoStationEntity` | Create a PhotoStation entity instance. |
| `PhotoUpload` | `($data): PhotoUploadEntity` | Create a PhotoUpload entity instance. |
| `Photographer` | `($data): PhotographerEntity` | Create a Photographer entity instance. |
| `Profile` | `($data): ProfileEntity` | Create a Profile entity instance. |
| `PublicInbox` | `($data): PublicInboxEntity` | Create a PublicInbox entity instance. |
| `Stat` | `($data): StatEntity` | Create a Stat entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### AdminInbox

| Field | Description |
| --- | --- |
| `active` |  |
| `command` |  |
| `conflict_resolution` |  |
| `country_code` |  |
| `ds100` |  |
| `id` |  |
| `lat` |  |
| `lon` |  |
| `message` |  |
| `reject_reason` |  |
| `station_id` |  |
| `status` |  |
| `title` |  |

Operations: Create.

API path: `/adminInbox`

#### Country

| Field | Description |
| --- | --- |
| `active` |  |
| `allow_photo_upload` |  |
| `code` |  |
| `email` |  |
| `message` |  |
| `name` |  |
| `override_license` |  |
| `provider_app` |  |
| `timetable_url_template` |  |

Operations: List.

API path: `/countries`

#### Inbox

| Field | Description |
| --- | --- |
| `comment` |  |
| `country_code` |  |
| `crc32` |  |
| `created_at` |  |
| `filename` |  |
| `id` |  |
| `inbox_url` |  |
| `lat` |  |
| `lon` |  |
| `new_lat` |  |
| `new_lon` |  |
| `new_title` |  |
| `problem_report_type` |  |
| `rejected_reason` |  |
| `state` |  |
| `station_id` |  |
| `title` |  |

Operations: Create, List, Remove.

API path: `/reportProblem`

#### InboxCount

| Field | Description |
| --- | --- |
| `pending_inbox_entry` |  |

Operations: Load.

API path: `/adminInboxCount`

#### InboxEntry

| Field | Description |
| --- | --- |
| `active` |  |
| `comment` |  |
| `country_code` |  |
| `created_at` |  |
| `done` |  |
| `filename` |  |
| `has_conflict` |  |
| `has_photo` |  |
| `id` |  |
| `inbox_url` |  |
| `is_processed` |  |
| `lat` |  |
| `lon` |  |
| `new_lat` |  |
| `new_lon` |  |
| `new_title` |  |
| `photo_id` |  |
| `photographer_email` |  |
| `photographer_nickname` |  |
| `problem_report_type` |  |
| `station_id` |  |
| `title` |  |

Operations: List.

API path: `/adminInbox`

#### InboxStateQuery

| Field | Description |
| --- | --- |

Operations: .

API path: ``

#### OAuthToken

| Field | Description |
| --- | --- |
| `access_token` |  |
| `expires_in` |  |
| `refresh_token` |  |
| `scope` |  |
| `token_type` |  |

Operations: Create.

API path: `/oauth2/token`

#### Oauth

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/oauth2/revoke`

#### Photo

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/photos/{country}/{filename}`

#### PhotoDownload

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/inbox/done/{filename}`

#### PhotoStation

| Field | Description |
| --- | --- |
| `license` |  |
| `photo_base_url` |  |
| `photographer` |  |
| `station` |  |

Operations: List, Load.

API path: `/photoStationById/{country}/{id}`

#### PhotoUpload

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/photoUpload`

#### Photographer

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/photographers`

#### Profile

| Field | Description |
| --- | --- |
| `admin` |  |
| `anonymous` |  |
| `email` |  |
| `email_verified` |  |
| `license` |  |
| `link` |  |
| `new_password` |  |
| `nickname` |  |
| `photo_owner` |  |
| `send_notification` |  |

Operations: Create, Load, Remove.

API path: `/changePassword`

#### PublicInbox

| Field | Description |
| --- | --- |
| `country_code` |  |
| `lat` |  |
| `lon` |  |
| `station_id` |  |
| `title` |  |

Operations: List.

API path: `/publicInbox`

#### Stat

| Field | Description |
| --- | --- |
| `country_code` |  |
| `photographer` |  |
| `total` |  |
| `with_photo` |  |
| `without_photo` |  |

Operations: Load.

API path: `/stats`



## Entities


### AdminInbox

Create an instance: `$admin_inbox = $client->AdminInbox();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `command` | `string` |  |
| `conflict_resolution` | `string` |  |
| `country_code` | `string` |  |
| `ds100` | `string` |  |
| `id` | `int` |  |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `message` | `string` |  |
| `reject_reason` | `string` |  |
| `station_id` | `string` |  |
| `status` | `int` |  |
| `title` | `string` |  |

#### Example: Create

```php
$admin_inbox = $client->AdminInbox()->create([
    "command" => null, // string
    "id" => null, // int
    "message" => null, // string
    "status" => null, // int
]);
```


### Country

Create an instance: `$country = $client->Country();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `allow_photo_upload` | `bool` |  |
| `code` | `string` |  |
| `email` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `override_license` | `string` |  |
| `provider_app` | `array` |  |
| `timetable_url_template` | `string` |  |

#### Example: List

```php
// list() returns an array of Country records (throws on error).
$countrys = $client->Country()->list();
```


### Inbox

Create an instance: `$inbox = $client->Inbox();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comment` | `string` |  |
| `country_code` | `string` |  |
| `crc32` | `int` |  |
| `created_at` | `int` |  |
| `filename` | `string` |  |
| `id` | `int` |  |
| `inbox_url` | `string` |  |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `new_lat` | `float` |  |
| `new_lon` | `float` |  |
| `new_title` | `string` |  |
| `problem_report_type` | `string` |  |
| `rejected_reason` | `string` |  |
| `state` | `string` |  |
| `station_id` | `string` |  |
| `title` | `string` |  |

#### Example: List

```php
// list() returns an array of Inbox records (throws on error).
$inboxs = $client->Inbox()->list();
```

#### Example: Create

```php
$inbox = $client->Inbox()->create([
    "id" => null, // int
    "state" => null, // string
]);
```


### InboxCount

Create an instance: `$inbox_count = $client->InboxCount();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `pending_inbox_entry` | `int` |  |

#### Example: Load

```php
// load() returns the bare InboxCount record (throws on error).
$inbox_count = $client->InboxCount()->load();
```


### InboxEntry

Create an instance: `$inbox_entry = $client->InboxEntry();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `comment` | `string` |  |
| `country_code` | `string` |  |
| `created_at` | `int` |  |
| `done` | `bool` |  |
| `filename` | `string` |  |
| `has_conflict` | `bool` |  |
| `has_photo` | `bool` |  |
| `id` | `int` |  |
| `inbox_url` | `string` |  |
| `is_processed` | `bool` |  |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `new_lat` | `float` |  |
| `new_lon` | `float` |  |
| `new_title` | `string` |  |
| `photo_id` | `int` |  |
| `photographer_email` | `string` |  |
| `photographer_nickname` | `string` |  |
| `problem_report_type` | `string` |  |
| `station_id` | `string` |  |
| `title` | `string` |  |

#### Example: List

```php
// list() returns an array of InboxEntry records (throws on error).
$inbox_entrys = $client->InboxEntry()->list();
```


### InboxStateQuery

Create an instance: `$inbox_state_query = $client->InboxStateQuery();`


### OAuthToken

Create an instance: `$o_auth_token = $client->OAuthToken();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` |  |
| `expires_in` | `int` |  |
| `refresh_token` | `string` |  |
| `scope` | `string` |  |
| `token_type` | `string` |  |

#### Example: Create

```php
$o_auth_token = $client->OAuthToken()->create([
    "access_token" => null, // string
    "scope" => null, // string
    "token_type" => null, // string
]);
```


### Oauth

Create an instance: `$oauth = $client->Oauth();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare Oauth record (throws on error).
$oauth = $client->Oauth()->load();
```

#### Example: Create

```php
$oauth = $client->Oauth()->create([
]);
```


### Photo

Create an instance: `$photo = $client->Photo();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare Photo record (throws on error).
$photo = $client->Photo()->load(["country" => "country", "filename" => "filename"]);
```


### PhotoDownload

Create an instance: `$photo_download = $client->PhotoDownload();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare PhotoDownload record (throws on error).
$photo_download = $client->PhotoDownload()->load(["filename" => "filename"]);
```


### PhotoStation

Create an instance: `$photo_station = $client->PhotoStation();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `license` | `array` |  |
| `photo_base_url` | `string` |  |
| `photographer` | `array` |  |
| `station` | `array` |  |

#### Example: Load

```php
// load() returns the bare PhotoStation record (throws on error).
$photo_station = $client->PhotoStation()->load();
```

#### Example: List

```php
// list() returns an array of PhotoStation records (throws on error).
$photo_stations = $client->PhotoStation()->list();
```


### PhotoUpload

Create an instance: `$photo_upload = $client->PhotoUpload();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```php
$photo_upload = $client->PhotoUpload()->create([
]);
```


### Photographer

Create an instance: `$photographer = $client->Photographer();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```php
// load() returns the bare Photographer record (throws on error).
$photographer = $client->Photographer()->load();
```


### Profile

Create an instance: `$profile = $client->Profile();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `bool` |  |
| `anonymous` | `bool` |  |
| `email` | `string` |  |
| `email_verified` | `bool` |  |
| `license` | `string` |  |
| `link` | `string` |  |
| `new_password` | `string` |  |
| `nickname` | `string` |  |
| `photo_owner` | `bool` |  |
| `send_notification` | `bool` |  |

#### Example: Load

```php
// load() returns the bare Profile record (throws on error).
$profile = $client->Profile()->load();
```

#### Example: Create

```php
$profile = $client->Profile()->create([
    "license" => null, // string
    "new_password" => null, // string
    "nickname" => null, // string
    "photo_owner" => null, // bool
]);
```


### PublicInbox

Create an instance: `$public_inbox = $client->PublicInbox();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | `string` |  |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `station_id` | `string` |  |
| `title` | `string` |  |

#### Example: List

```php
// list() returns an array of PublicInbox records (throws on error).
$public_inboxs = $client->PublicInbox()->list();
```


### Stat

Create an instance: `$stat = $client->Stat();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | `string` |  |
| `photographer` | `int` |  |
| `total` | `int` |  |
| `with_photo` | `int` |  |
| `without_photo` | `int` |  |

#### Example: Load

```php
// load() returns the bare Stat record (throws on error).
$stat = $client->Stat()->load();
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── railwaystationphotos_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`railwaystationphotos_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$country = $client->Country();
$country->list();

// $country->data_get() now returns the country data from the last list
// $country->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
