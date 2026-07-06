# RailwayStationPhotos PHP SDK Reference

Complete API reference for the RailwayStationPhotos PHP SDK.


## RailwayStationPhotosSDK

### Constructor

```php
require_once __DIR__ . '/railwaystationphotos_sdk.php';

$client = new RailwayStationPhotosSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RailwayStationPhotosSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = RailwayStationPhotosSDK::test();
```


### Instance Methods

#### `AdminInbox($data = null)`

Create a new `AdminInboxEntity` instance. Pass `null` for no initial data.

#### `Country($data = null)`

Create a new `CountryEntity` instance. Pass `null` for no initial data.

#### `Inbox($data = null)`

Create a new `InboxEntity` instance. Pass `null` for no initial data.

#### `InboxCount($data = null)`

Create a new `InboxCountEntity` instance. Pass `null` for no initial data.

#### `InboxEntry($data = null)`

Create a new `InboxEntryEntity` instance. Pass `null` for no initial data.

#### `InboxStateQuery($data = null)`

Create a new `InboxStateQueryEntity` instance. Pass `null` for no initial data.

#### `OAuthToken($data = null)`

Create a new `OAuthTokenEntity` instance. Pass `null` for no initial data.

#### `Oauth($data = null)`

Create a new `OauthEntity` instance. Pass `null` for no initial data.

#### `Photo($data = null)`

Create a new `PhotoEntity` instance. Pass `null` for no initial data.

#### `PhotoDownload($data = null)`

Create a new `PhotoDownloadEntity` instance. Pass `null` for no initial data.

#### `PhotoStation($data = null)`

Create a new `PhotoStationEntity` instance. Pass `null` for no initial data.

#### `PhotoUpload($data = null)`

Create a new `PhotoUploadEntity` instance. Pass `null` for no initial data.

#### `Photographer($data = null)`

Create a new `PhotographerEntity` instance. Pass `null` for no initial data.

#### `Profile($data = null)`

Create a new `ProfileEntity` instance. Pass `null` for no initial data.

#### `PublicInbox($data = null)`

Create a new `PublicInboxEntity` instance. Pass `null` for no initial data.

#### `Stat($data = null)`

Create a new `StatEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): RailwayStationPhotosUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AdminInboxEntity

```php
$admin_inbox = $client->AdminInbox();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | No |  |
| `command` | `string` | Yes |  |
| `conflict_resolution` | `string` | No |  |
| `country_code` | `string` | No |  |
| `ds100` | `string` | No |  |
| `id` | `int` | Yes |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `message` | `string` | Yes |  |
| `reject_reason` | `string` | No |  |
| `station_id` | `string` | No |  |
| `status` | `int` | Yes |  |
| `title` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->AdminInbox()->create([
  "command" => null, // string
  "message" => null, // string
  "status" => null, // int
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AdminInboxEntity`

Create a new `AdminInboxEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CountryEntity

```php
$country = $client->Country();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | Yes |  |
| `allow_photo_upload` | `bool` | Yes |  |
| `code` | `string` | Yes |  |
| `email` | `string` | No |  |
| `message` | `string` | No |  |
| `name` | `string` | Yes |  |
| `override_license` | `string` | No |  |
| `provider_app` | `array` | No |  |
| `timetable_url_template` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Country()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CountryEntity`

Create a new `CountryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InboxEntity

```php
$inbox = $client->Inbox();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | `string` | No |  |
| `country_code` | `string` | No |  |
| `crc32` | `int` | No |  |
| `created_at` | `int` | No |  |
| `filename` | `string` | No |  |
| `id` | `int` | Yes |  |
| `inbox_url` | `string` | No |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `new_lat` | `float` | No |  |
| `new_lon` | `float` | No |  |
| `new_title` | `string` | No |  |
| `problem_report_type` | `string` | No |  |
| `rejected_reason` | `string` | No |  |
| `state` | `string` | Yes |  |
| `station_id` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Inbox()->create([
  "state" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Inbox()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Inbox()->remove();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InboxEntity`

Create a new `InboxEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InboxCountEntity

```php
$inbox_count = $client->InboxCount();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `pending_inbox_entry` | `int` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->InboxCount()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InboxCountEntity`

Create a new `InboxCountEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InboxEntryEntity

```php
$inbox_entry = $client->InboxEntry();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | No |  |
| `comment` | `string` | Yes |  |
| `country_code` | `string` | No |  |
| `created_at` | `int` | Yes |  |
| `done` | `bool` | Yes |  |
| `filename` | `string` | No |  |
| `has_conflict` | `bool` | No |  |
| `has_photo` | `bool` | Yes |  |
| `id` | `int` | Yes |  |
| `inbox_url` | `string` | No |  |
| `is_processed` | `bool` | No |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `new_lat` | `float` | No |  |
| `new_lon` | `float` | No |  |
| `new_title` | `string` | No |  |
| `photo_id` | `int` | No |  |
| `photographer_email` | `string` | No |  |
| `photographer_nickname` | `string` | Yes |  |
| `problem_report_type` | `string` | No |  |
| `station_id` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->InboxEntry()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InboxEntryEntity`

Create a new `InboxEntryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InboxStateQueryEntity

```php
$inbox_state_query = $client->InboxStateQuery();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InboxStateQueryEntity`

Create a new `InboxStateQueryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OAuthTokenEntity

```php
$o_auth_token = $client->OAuthToken();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes |  |
| `expires_in` | `int` | No |  |
| `refresh_token` | `string` | No |  |
| `scope` | `string` | Yes |  |
| `token_type` | `string` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->OAuthToken()->create([
  "access_token" => null, // string
  "scope" => null, // string
  "token_type" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OAuthTokenEntity`

Create a new `OAuthTokenEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OauthEntity

```php
$oauth = $client->Oauth();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Oauth()->create([
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Oauth()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OauthEntity`

Create a new `OauthEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PhotoEntity

```php
$photo = $client->Photo();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Photo()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PhotoEntity`

Create a new `PhotoEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PhotoDownloadEntity

```php
$photo_download = $client->PhotoDownload();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->PhotoDownload()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PhotoDownloadEntity`

Create a new `PhotoDownloadEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PhotoStationEntity

```php
$photo_station = $client->PhotoStation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `license` | `array` | Yes |  |
| `photo_base_url` | `string` | Yes |  |
| `photographer` | `array` | Yes |  |
| `station` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->PhotoStation()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->PhotoStation()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PhotoStationEntity`

Create a new `PhotoStationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PhotoUploadEntity

```php
$photo_upload = $client->PhotoUpload();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->PhotoUpload()->create([
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PhotoUploadEntity`

Create a new `PhotoUploadEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PhotographerEntity

```php
$photographer = $client->Photographer();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Photographer()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PhotographerEntity`

Create a new `PhotographerEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProfileEntity

```php
$profile = $client->Profile();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `bool` | No |  |
| `anonymous` | `bool` | No |  |
| `email` | `string` | No |  |
| `email_verified` | `bool` | No |  |
| `license` | `string` | Yes |  |
| `link` | `string` | No |  |
| `new_password` | `string` | Yes |  |
| `nickname` | `string` | Yes |  |
| `photo_owner` | `bool` | Yes |  |
| `send_notification` | `bool` | No |  |

### Field Usage by Operation

| Field | load | create | remove |
| --- | --- | --- | --- |
| `admin` | - | - | - |
| `anonymous` | - | - | - |
| `email` | - | Yes | - |
| `email_verified` | - | - | - |
| `license` | - | Yes | - |
| `link` | - | - | - |
| `new_password` | - | - | - |
| `nickname` | - | - | - |
| `photo_owner` | - | Yes | - |
| `send_notification` | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Profile()->create([
  "license" => null, // string
  "new_password" => null, // string
  "nickname" => null, // string
  "photo_owner" => null, // bool
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Profile()->load();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Profile()->remove();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProfileEntity`

Create a new `ProfileEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PublicInboxEntity

```php
$public_inbox = $client->PublicInbox();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `string` | No |  |
| `lat` | `float` | Yes |  |
| `lon` | `float` | Yes |  |
| `station_id` | `string` | No |  |
| `title` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->PublicInbox()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PublicInboxEntity`

Create a new `PublicInboxEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StatEntity

```php
$stat = $client->Stat();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `string` | No |  |
| `photographer` | `int` | Yes |  |
| `total` | `int` | Yes |  |
| `with_photo` | `int` | Yes |  |
| `without_photo` | `int` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Stat()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StatEntity`

Create a new `StatEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new RailwayStationPhotosSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

