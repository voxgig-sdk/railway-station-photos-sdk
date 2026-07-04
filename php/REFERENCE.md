# RailwayStationPhotos PHP SDK Reference

Complete API reference for the RailwayStationPhotos PHP SDK.


## RailwayStationPhotosSDK

### Constructor

```php
require_once __DIR__ . '/railway-station-photos_sdk.php';

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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
$admin_inbox = $client->admin_inbox();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | ``$BOOLEAN`` | No |  |
| `command` | ``$STRING`` | Yes |  |
| `conflict_resolution` | ``$STRING`` | No |  |
| `country_code` | ``$STRING`` | No |  |
| `ds100` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | Yes |  |
| `lat` | ``$NUMBER`` | No |  |
| `lon` | ``$NUMBER`` | No |  |
| `message` | ``$STRING`` | Yes |  |
| `reject_reason` | ``$STRING`` | No |  |
| `station_id` | ``$STRING`` | No |  |
| `status` | ``$INTEGER`` | Yes |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->admin_inbox()->create([
  "command" => /* `$STRING` */,
  "message" => /* `$STRING` */,
  "status" => /* `$INTEGER` */,
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AdminInboxEntity`

Create a new `AdminInboxEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## CountryEntity

```php
$country = $client->country();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | ``$BOOLEAN`` | Yes |  |
| `allow_photo_upload` | ``$BOOLEAN`` | Yes |  |
| `code` | ``$STRING`` | Yes |  |
| `email` | ``$STRING`` | No |  |
| `message` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | Yes |  |
| `override_license` | ``$STRING`` | No |  |
| `provider_app` | ``$ARRAY`` | No |  |
| `timetable_url_template` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->country()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): CountryEntity`

Create a new `CountryEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## InboxEntity

```php
$inbox = $client->inbox();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | ``$STRING`` | No |  |
| `country_code` | ``$STRING`` | No |  |
| `crc32` | ``$INTEGER`` | No |  |
| `created_at` | ``$INTEGER`` | No |  |
| `filename` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | Yes |  |
| `inbox_url` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | No |  |
| `lon` | ``$NUMBER`` | No |  |
| `new_lat` | ``$NUMBER`` | No |  |
| `new_lon` | ``$NUMBER`` | No |  |
| `new_title` | ``$STRING`` | No |  |
| `problem_report_type` | ``$STRING`` | No |  |
| `rejected_reason` | ``$STRING`` | No |  |
| `state` | ``$STRING`` | Yes |  |
| `station_id` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->inbox()->create([
  "state" => /* `$STRING` */,
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->inbox()->list([]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->inbox()->remove(["id" => "inbox_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): InboxEntity`

Create a new `InboxEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## InboxCountEntity

```php
$inbox_count = $client->inbox_count();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `pending_inbox_entry` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->inbox_count()->load(["id" => "inbox_count_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): InboxCountEntity`

Create a new `InboxCountEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## InboxEntryEntity

```php
$inbox_entry = $client->inbox_entry();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | ``$BOOLEAN`` | No |  |
| `comment` | ``$STRING`` | Yes |  |
| `country_code` | ``$STRING`` | No |  |
| `created_at` | ``$INTEGER`` | Yes |  |
| `done` | ``$BOOLEAN`` | Yes |  |
| `filename` | ``$STRING`` | No |  |
| `has_conflict` | ``$BOOLEAN`` | No |  |
| `has_photo` | ``$BOOLEAN`` | Yes |  |
| `id` | ``$INTEGER`` | Yes |  |
| `inbox_url` | ``$STRING`` | No |  |
| `is_processed` | ``$BOOLEAN`` | No |  |
| `lat` | ``$NUMBER`` | No |  |
| `lon` | ``$NUMBER`` | No |  |
| `new_lat` | ``$NUMBER`` | No |  |
| `new_lon` | ``$NUMBER`` | No |  |
| `new_title` | ``$STRING`` | No |  |
| `photo_id` | ``$INTEGER`` | No |  |
| `photographer_email` | ``$STRING`` | No |  |
| `photographer_nickname` | ``$STRING`` | Yes |  |
| `problem_report_type` | ``$STRING`` | No |  |
| `station_id` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->inbox_entry()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): InboxEntryEntity`

Create a new `InboxEntryEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## InboxStateQueryEntity

```php
$inbox_state_query = $client->inbox_state_query();
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): InboxStateQueryEntity`

Create a new `InboxStateQueryEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## OAuthTokenEntity

```php
$o_auth_token = $client->o_auth_token();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | ``$STRING`` | Yes |  |
| `expires_in` | ``$INTEGER`` | No |  |
| `refresh_token` | ``$STRING`` | No |  |
| `scope` | ``$STRING`` | Yes |  |
| `token_type` | ``$STRING`` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->o_auth_token()->create([
  "access_token" => /* `$STRING` */,
  "scope" => /* `$STRING` */,
  "token_type" => /* `$STRING` */,
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): OAuthTokenEntity`

Create a new `OAuthTokenEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## OauthEntity

```php
$oauth = $client->oauth();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->oauth()->create([
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->oauth()->load(["id" => "oauth_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): OauthEntity`

Create a new `OauthEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PhotoEntity

```php
$photo = $client->photo();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->photo()->load(["id" => "photo_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PhotoEntity`

Create a new `PhotoEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PhotoDownloadEntity

```php
$photo_download = $client->photo_download();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->photo_download()->load(["id" => "photo_download_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PhotoDownloadEntity`

Create a new `PhotoDownloadEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PhotoStationEntity

```php
$photo_station = $client->photo_station();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `license` | ``$ARRAY`` | Yes |  |
| `photo_base_url` | ``$STRING`` | Yes |  |
| `photographer` | ``$ARRAY`` | Yes |  |
| `station` | ``$ARRAY`` | Yes |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->photo_station()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->photo_station()->load(["id" => "photo_station_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PhotoStationEntity`

Create a new `PhotoStationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PhotoUploadEntity

```php
$photo_upload = $client->photo_upload();
```

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->photo_upload()->create([
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PhotoUploadEntity`

Create a new `PhotoUploadEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PhotographerEntity

```php
$photographer = $client->photographer();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->photographer()->load(["id" => "photographer_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PhotographerEntity`

Create a new `PhotographerEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ProfileEntity

```php
$profile = $client->profile();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | ``$BOOLEAN`` | No |  |
| `anonymous` | ``$BOOLEAN`` | No |  |
| `email` | ``$STRING`` | No |  |
| `email_verified` | ``$BOOLEAN`` | No |  |
| `license` | ``$STRING`` | Yes |  |
| `link` | ``$STRING`` | No |  |
| `new_password` | ``$STRING`` | Yes |  |
| `nickname` | ``$STRING`` | Yes |  |
| `photo_owner` | ``$BOOLEAN`` | Yes |  |
| `send_notification` | ``$BOOLEAN`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `admin` | - | - | - | - | - |
| `anonymous` | - | - | - | - | - |
| `email` | - | - | Yes | - | - |
| `email_verified` | - | - | - | - | - |
| `license` | - | - | Yes | - | - |
| `link` | - | - | - | - | - |
| `new_password` | - | - | - | - | - |
| `nickname` | - | - | - | - | - |
| `photo_owner` | - | - | Yes | - | - |
| `send_notification` | - | - | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->profile()->create([
  "license" => /* `$STRING` */,
  "new_password" => /* `$STRING` */,
  "nickname" => /* `$STRING` */,
  "photo_owner" => /* `$BOOLEAN` */,
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->profile()->load(["id" => "profile_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->profile()->remove(["id" => "profile_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ProfileEntity`

Create a new `ProfileEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PublicInboxEntity

```php
$public_inbox = $client->public_inbox();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | Yes |  |
| `lon` | ``$NUMBER`` | Yes |  |
| `station_id` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | Yes |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->public_inbox()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PublicInboxEntity`

Create a new `PublicInboxEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## StatEntity

```php
$stat = $client->stat();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | ``$STRING`` | No |  |
| `photographer` | ``$INTEGER`` | Yes |  |
| `total` | ``$INTEGER`` | Yes |  |
| `with_photo` | ``$INTEGER`` | Yes |  |
| `without_photo` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->stat()->load(["id" => "stat_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): StatEntity`

Create a new `StatEntity` instance with the same client and
options.

#### `getName(): string`

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

