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

### 3. Load a photodownload

PhotoDownload is nested under filename, so provide the `filename`.

```php
try {
    // load() returns the ENTITY — call data_get() for the PhotoDownload record (throws on error).
    $photodownload = $client->PhotoDownload()->load(["filename" => "example_filename"]);
    print_r($photodownload->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created AdminInbox record.
$created = $client->AdminInbox()->create(["command" => "example_command", "id" => 1, "message" => "example_message", "status" => 1]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $publicinboxs = $client->PublicInbox()->list();
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

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = RailwayStationPhotosSDK::test([
    "entity" => ["photostationsbycountry" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$photostationsbycountry = $client->PhotoStationsByCountry()->load(["id" => "test01"]);
print_r($photostationsbycountry->data_get());
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
| `OAuthToken` | `($data): OAuthTokenEntity` | Create an OAuthToken entity instance. |
| `Oauth` | `($data): OauthEntity` | Create an Oauth entity instance. |
| `Photo` | `($data): PhotoEntity` | Create a Photo entity instance. |
| `PhotoDownload` | `($data): PhotoDownloadEntity` | Create a PhotoDownload entity instance. |
| `PhotoStationById` | `($data): PhotoStationByIdEntity` | Create a PhotoStationById entity instance. |
| `PhotoStationsByCountry` | `($data): PhotoStationsByCountryEntity` | Create a PhotoStationsByCountry entity instance. |
| `PhotoStationsByPhotographer` | `($data): PhotoStationsByPhotographerEntity` | Create a PhotoStationsByPhotographer entity instance. |
| `PhotoStationsByRecentPhotoImport` | `($data): PhotoStationsByRecentPhotoImportEntity` | Create a PhotoStationsByRecentPhotoImport entity instance. |
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

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
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
| `DS100` | DS100 attribute of a new station |
| `active` | active flag of a new station (default true) |
| `command` |  |
| `conflictResolution` | how to handle conflicts |
| `countryCode` | a two character country code |
| `id` |  |
| `lat` |  |
| `lon` |  |
| `message` |  |
| `rejectReason` | explanation of a rejection |
| `stationId` | ID of a new station |
| `status` |  |
| `title` |  |

Operations: Create.

API path: `/adminInbox`

#### Country

| Field | Description |
| --- | --- |
| `active` | Is this an active country where we collect photos? |
| `allowPhotoUploads` | Are photo uploads allowed? |
| `code` | a two character country code |
| `email` | Contact email address |
| `message` | Informational message about this country |
| `name` | Name of the country |
| `overrideLicense` | if a country needs a special license |
| `providerApps` | array with links to provider apps |
| `timetableUrlTemplate` | URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced |

Operations: List.

API path: `/countries`

#### Inbox

| Field | Description |
| --- | --- |
| `comment` |  |
| `countryCode` | a two character country code |
| `crc32` | CRC32 checksum of the uploaded photo |
| `createdAt` |  |
| `filename` | filename in inbox |
| `id` |  |
| `inboxUrl` | url of the photo in the inbox |
| `lat` |  |
| `lon` |  |
| `newLat` |  |
| `newLon` |  |
| `newTitle` |  |
| `problemReportType` | types of problem reports |
| `rejectedReason` |  |
| `state` |  |
| `stationId` |  |
| `title` |  |

Operations: Create, List, Remove.

API path: `/reportProblem`

#### InboxCount

| Field | Description |
| --- | --- |
| `pendingInboxEntries` |  |

Operations: Load.

API path: `/adminInboxCount`

#### InboxEntry

| Field | Description |
| --- | --- |
| `active` | active flag provided by the user |
| `comment` |  |
| `countryCode` | a two character country code |
| `createdAt` |  |
| `done` | true if this photo was already imported or rejected |
| `filename` | name of the file in inbox |
| `hasConflict` | conflict with another upload or existing photo |
| `hasPhoto` | this station has already a photo (conflict) |
| `id` |  |
| `inboxUrl` | url of the photo in the inbox |
| `isProcessed` | was this image process (e.g. |
| `lat` |  |
| `lon` |  |
| `newLat` |  |
| `newLon` |  |
| `newTitle` |  |
| `photoId` | ID of the photo |
| `photographerEmail` |  |
| `photographerNickname` |  |
| `problemReportType` | types of problem reports |
| `stationId` |  |
| `title` |  |

Operations: List.

API path: `/adminInbox`

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
| `id` |  |

Operations: Load.

API path: `/photos/{country}/{filename}`

#### PhotoDownload

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/inbox/done/{filename}`

#### PhotoStationById

| Field | Description |
| --- | --- |
| `id` |  |
| `licenses` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | Base URL of all photos |
| `photographers` | List of all photographers, might be empty if no photos available |
| `stations` | List of the stations |

Operations: Load.

API path: `/photoStationById/{country}/{id}`

#### PhotoStationsByCountry

| Field | Description |
| --- | --- |
| `id` |  |
| `licenses` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | Base URL of all photos |
| `photographers` | List of all photographers, might be empty if no photos available |
| `stations` | List of the stations |

Operations: Load.

API path: `/photoStationsByCountry/{country}`

#### PhotoStationsByPhotographer

| Field | Description |
| --- | --- |
| `id` |  |
| `licenses` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | Base URL of all photos |
| `photographers` | List of all photographers, might be empty if no photos available |
| `stations` | List of the stations |

Operations: Load.

API path: `/photoStationsByPhotographer/{photographer}`

#### PhotoStationsByRecentPhotoImport

| Field | Description |
| --- | --- |
| `licenses` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | Base URL of all photos |
| `photographers` | List of all photographers, might be empty if no photos available |
| `stations` | List of the stations |

Operations: List.

API path: `/photoStationsByRecentPhotoImports`

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
| `emailVerified` |  |
| `license` | the only accepted type is "CC0 1.0 Universell (CC0 1.0)", the others are listed for backward compatibility |
| `link` |  |
| `newPassword` |  |
| `nickname` |  |
| `photoOwner` |  |
| `sendNotifications` |  |

Operations: Create, Load, Remove.

API path: `/changePassword`

#### PublicInbox

| Field | Description |
| --- | --- |
| `countryCode` | a two character country code |
| `lat` |  |
| `lon` |  |
| `stationId` |  |
| `title` |  |

Operations: List.

API path: `/publicInbox`

#### Stat

| Field | Description |
| --- | --- |
| `countryCode` | an optional two character country code |
| `photographers` |  |
| `total` |  |
| `withPhoto` |  |
| `withoutPhoto` |  |

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
| `DS100` | `string` | DS100 attribute of a new station |
| `active` | `bool` | active flag of a new station (default true) |
| `command` | `string` |  |
| `conflictResolution` | `string` | how to handle conflicts |
| `countryCode` | `string` | a two character country code |
| `id` | `int` |  |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `message` | `string` |  |
| `rejectReason` | `string` | explanation of a rejection |
| `stationId` | `string` | ID of a new station |
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
| `active` | `bool` | Is this an active country where we collect photos? |
| `allowPhotoUploads` | `bool` | Are photo uploads allowed? |
| `code` | `string` | a two character country code |
| `email` | `string` | Contact email address |
| `message` | `string` | Informational message about this country |
| `name` | `string` | Name of the country |
| `overrideLicense` | `string` | if a country needs a special license |
| `providerApps` | `array` | array with links to provider apps |
| `timetableUrlTemplate` | `string` | URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced |

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
| `countryCode` | `string` | a two character country code |
| `crc32` | `int` | CRC32 checksum of the uploaded photo |
| `createdAt` | `int` |  |
| `filename` | `string` | filename in inbox |
| `id` | `int` |  |
| `inboxUrl` | `string` | url of the photo in the inbox |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `newLat` | `float` |  |
| `newLon` | `float` |  |
| `newTitle` | `string` |  |
| `problemReportType` | `string` | types of problem reports |
| `rejectedReason` | `string` |  |
| `state` | `string` |  |
| `stationId` | `string` |  |
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
| `pendingInboxEntries` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the InboxCount record (throws on error).
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
| `active` | `bool` | active flag provided by the user |
| `comment` | `string` |  |
| `countryCode` | `string` | a two character country code |
| `createdAt` | `int` |  |
| `done` | `bool` | true if this photo was already imported or rejected |
| `filename` | `string` | name of the file in inbox |
| `hasConflict` | `bool` | conflict with another upload or existing photo |
| `hasPhoto` | `bool` | this station has already a photo (conflict) |
| `id` | `int` |  |
| `inboxUrl` | `string` | url of the photo in the inbox |
| `isProcessed` | `bool` | was this image process (e.g. |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `newLat` | `float` |  |
| `newLon` | `float` |  |
| `newTitle` | `string` |  |
| `photoId` | `int` | ID of the photo |
| `photographerEmail` | `string` |  |
| `photographerNickname` | `string` |  |
| `problemReportType` | `string` | types of problem reports |
| `stationId` | `string` |  |
| `title` | `string` |  |

#### Example: List

```php
// list() returns an array of InboxEntry records (throws on error).
$inbox_entrys = $client->InboxEntry()->list();
```


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
// load() returns the ENTITY — call data_get() for the Oauth record (throws on error).
$oauth = $client->Oauth()->load(["client_id" => "client_id", "redirect_uri" => "redirect_uri", "response_type" => "response_type", "scope" => "scope"]);
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

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Photo record (throws on error).
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
// load() returns the ENTITY — call data_get() for the PhotoDownload record (throws on error).
$photo_download = $client->PhotoDownload()->load(["filename" => "filename"]);
```


### PhotoStationById

Create an instance: `$photo_station_by_id = $client->PhotoStationById();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `licenses` | `array` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Base URL of all photos |
| `photographers` | `array` | List of all photographers, might be empty if no photos available |
| `stations` | `array` | List of the stations |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PhotoStationById record (throws on error).
$photo_station_by_id = $client->PhotoStationById()->load(["id" => "photo_station_by_id_id", "country" => "country"]);
```


### PhotoStationsByCountry

Create an instance: `$photo_stations_by_country = $client->PhotoStationsByCountry();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `licenses` | `array` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Base URL of all photos |
| `photographers` | `array` | List of all photographers, might be empty if no photos available |
| `stations` | `array` | List of the stations |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PhotoStationsByCountry record (throws on error).
$photo_stations_by_country = $client->PhotoStationsByCountry()->load(["id" => "photo_stations_by_country_id"]);
```


### PhotoStationsByPhotographer

Create an instance: `$photo_stations_by_photographer = $client->PhotoStationsByPhotographer();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `licenses` | `array` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Base URL of all photos |
| `photographers` | `array` | List of all photographers, might be empty if no photos available |
| `stations` | `array` | List of the stations |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PhotoStationsByPhotographer record (throws on error).
$photo_stations_by_photographer = $client->PhotoStationsByPhotographer()->load(["id" => "photo_stations_by_photographer_id"]);
```


### PhotoStationsByRecentPhotoImport

Create an instance: `$photo_stations_by_recent_photo_import = $client->PhotoStationsByRecentPhotoImport();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `licenses` | `array` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Base URL of all photos |
| `photographers` | `array` | List of all photographers, might be empty if no photos available |
| `stations` | `array` | List of the stations |

#### Example: List

```php
// list() returns an array of PhotoStationsByRecentPhotoImport records (throws on error).
$photo_stations_by_recent_photo_imports = $client->PhotoStationsByRecentPhotoImport()->list();
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
// load() returns the ENTITY — call data_get() for the Photographer record (throws on error).
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
| `emailVerified` | `bool` |  |
| `license` | `string` | the only accepted type is "CC0 1.0 Universell (CC0 1.0)", the others are listed for backward compatibility |
| `link` | `string` |  |
| `newPassword` | `string` |  |
| `nickname` | `string` |  |
| `photoOwner` | `bool` |  |
| `sendNotifications` | `bool` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Profile record (throws on error).
$profile = $client->Profile()->load(["token" => "token"]);
```

#### Example: Create

```php
$profile = $client->Profile()->create([
    "license" => null, // string
    "newPassword" => null, // string
    "nickname" => null, // string
    "photoOwner" => null, // bool
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
| `countryCode` | `string` | a two character country code |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `stationId` | `string` |  |
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
| `countryCode` | `string` | an optional two character country code |
| `photographers` | `int` |  |
| `total` | `int` |  |
| `withPhoto` | `int` |  |
| `withoutPhoto` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Stat record (throws on error).
$stat = $client->Stat()->load();
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

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
├── schema.php                     -- Generated option + entity specs
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
$publicinbox = $client->PublicInbox();
$publicinbox->list();

// $publicinbox->data_get() now returns the publicinbox data from the last list
// $publicinbox->match_get() returns the last match criteria
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
