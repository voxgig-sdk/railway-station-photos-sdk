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
| `DS100` | `string` | No | DS100 attribute of a new station |
| `active` | `bool` | No | active flag of a new station (default true) |
| `command` | `string` | Yes |  |
| `conflictResolution` | `string` | No | how to handle conflicts |
| `countryCode` | `string` | No | a two character country code |
| `id` | `int` | Yes |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `message` | `string` | Yes |  |
| `rejectReason` | `string` | No | explanation of a rejection |
| `stationId` | `string` | No | ID of a new station |
| `status` | `int` | Yes |  |
| `title` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->AdminInbox()->create([
  "command" => null, // string
  "id" => null, // int
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
| `active` | `bool` | Yes | Is this an active country where we collect photos? |
| `allowPhotoUploads` | `bool` | Yes | Are photo uploads allowed? |
| `code` | `string` | Yes | a two character country code |
| `email` | `string` | No | Contact email address |
| `message` | `string` | No | Informational message about this country |
| `name` | `string` | Yes | Name of the country |
| `overrideLicense` | `string` | No | if a country needs a special license |
| `providerApps` | `array` | No | array with links to provider apps |
| `timetableUrlTemplate` | `string` | No | URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced |

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
| `countryCode` | `string` | No | a two character country code |
| `crc32` | `int` | No | CRC32 checksum of the uploaded photo |
| `createdAt` | `int` | No |  |
| `filename` | `string` | No | filename in inbox |
| `id` | `int` | Yes |  |
| `inboxUrl` | `string` | No | url of the photo in the inbox |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `newLat` | `float` | No |  |
| `newLon` | `float` | No |  |
| `newTitle` | `string` | No |  |
| `problemReportType` | `string` | No | types of problem reports |
| `rejectedReason` | `string` | No |  |
| `state` | `string` | Yes |  |
| `stationId` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Inbox()->create([
  "id" => null, // int
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
$result = $client->Inbox()->remove(["id" => 1]);
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
| `pendingInboxEntries` | `int` | Yes |  |

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
| `active` | `bool` | No | active flag provided by the user |
| `comment` | `string` | Yes |  |
| `countryCode` | `string` | No | a two character country code |
| `createdAt` | `int` | Yes |  |
| `done` | `bool` | Yes | true if this photo was already imported or rejected |
| `filename` | `string` | No | name of the file in inbox |
| `hasConflict` | `bool` | No | conflict with another upload or existing photo |
| `hasPhoto` | `bool` | Yes | this station has already a photo (conflict) |
| `id` | `int` | Yes |  |
| `inboxUrl` | `string` | No | url of the photo in the inbox |
| `isProcessed` | `bool` | No | was this image process (e.g. |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `newLat` | `float` | No |  |
| `newLon` | `float` | No |  |
| `newTitle` | `string` | No |  |
| `photoId` | `int` | No | ID of the photo |
| `photographerEmail` | `string` | No |  |
| `photographerNickname` | `string` | Yes |  |
| `problemReportType` | `string` | No | types of problem reports |
| `stationId` | `string` | No |  |
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
$result = $client->Oauth()->load(["client_id" => "client_id", "redirect_uri" => "redirect_uri", "response_type" => "response_type", "scope" => "scope"]);
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Photo()->load(["country" => "country", "filename" => "filename"]);
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
$result = $client->PhotoDownload()->load(["filename" => "filename"]);
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
| `id` | `string` | No |  |
| `licenses` | `array` | Yes | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Yes | Base URL of all photos |
| `photographers` | `array` | Yes | List of all photographers, might be empty if no photos available |
| `stations` | `array` | Yes | List of the stations |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->PhotoStation()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->PhotoStation()->load(["country" => "country"]);
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
| `emailVerified` | `bool` | No |  |
| `license` | `string` | Yes | the only accepted type is "CC0 1.0 Universell (CC0 1.0)", the others are listed for backward compatibility |
| `link` | `string` | No |  |
| `newPassword` | `string` | Yes |  |
| `nickname` | `string` | Yes |  |
| `photoOwner` | `bool` | Yes |  |
| `sendNotifications` | `bool` | No |  |

### Field Usage by Operation

| Field | load | create | remove |
| --- | --- | --- | --- |
| `admin` | - | - | - |
| `anonymous` | - | - | - |
| `email` | - | Yes | - |
| `emailVerified` | - | - | - |
| `license` | - | Yes | - |
| `link` | - | - | - |
| `newPassword` | - | - | - |
| `nickname` | - | - | - |
| `photoOwner` | - | Yes | - |
| `sendNotifications` | - | - | - |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Profile()->create([
  "license" => null, // string
  "newPassword" => null, // string
  "nickname" => null, // string
  "photoOwner" => null, // bool
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Profile()->load(["token" => "token"]);
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
| `countryCode` | `string` | No | a two character country code |
| `lat` | `float` | Yes |  |
| `lon` | `float` | Yes |  |
| `stationId` | `string` | No |  |
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
| `countryCode` | `string` | No | an optional two character country code |
| `photographers` | `int` | Yes |  |
| `total` | `int` | Yes |  |
| `withPhoto` | `int` | Yes |  |
| `withoutPhoto` | `int` | Yes |  |

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
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```php
$client = new RailwayStationPhotosSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

