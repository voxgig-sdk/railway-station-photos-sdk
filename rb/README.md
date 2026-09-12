# RailwayStationPhotos Ruby SDK



The Ruby SDK for the RailwayStationPhotos API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.AdminInbox` — with named operations (`list`/`load`/`create`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/railway-station-photos-sdk/releases](https://github.com/voxgig-sdk/railway-station-photos-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "RailwayStationPhotos_sdk"

client = RailwayStationPhotosSDK.new
```

### 3. Load a photo

Photo is nested under country, so provide the `country`.

```ruby
begin
  # load returns the ENTITY — call data_get for the Photo record (raises on error).
  photo = client.Photo.load({ "country" => "example_country", "filename" => "example_filename" })
  puts photo
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created AdminInbox record.
created = client.AdminInbox.create({ "command" => "example_command", "id" => 1, "message" => "example_message", "status" => 1 })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  publicinboxs = client.PublicInbox.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = RailwayStationPhotosSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
publicinbox = client.PublicInbox.list()
puts publicinbox
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = RailwayStationPhotosSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### RailwayStationPhotosSDK

```ruby
require_relative "RailwayStationPhotos_sdk"
client = RailwayStationPhotosSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = RailwayStationPhotosSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### RailwayStationPhotosSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `AdminInbox` | `(data) -> AdminInboxEntity` | Create an AdminInbox entity instance. |
| `Country` | `(data) -> CountryEntity` | Create a Country entity instance. |
| `Inbox` | `(data) -> InboxEntity` | Create an Inbox entity instance. |
| `InboxCount` | `(data) -> InboxCountEntity` | Create an InboxCount entity instance. |
| `InboxEntry` | `(data) -> InboxEntryEntity` | Create an InboxEntry entity instance. |
| `InboxStateQuery` | `(data) -> InboxStateQueryEntity` | Create an InboxStateQuery entity instance. |
| `OAuthToken` | `(data) -> OAuthTokenEntity` | Create an OAuthToken entity instance. |
| `Oauth` | `(data) -> OauthEntity` | Create an Oauth entity instance. |
| `Photo` | `(data) -> PhotoEntity` | Create a Photo entity instance. |
| `PhotoDownload` | `(data) -> PhotoDownloadEntity` | Create a PhotoDownload entity instance. |
| `PhotoStation` | `(data) -> PhotoStationEntity` | Create a PhotoStation entity instance. |
| `PhotoUpload` | `(data) -> PhotoUploadEntity` | Create a PhotoUpload entity instance. |
| `Photographer` | `(data) -> PhotographerEntity` | Create a Photographer entity instance. |
| `Profile` | `(data) -> ProfileEntity` | Create a Profile entity instance. |
| `PublicInbox` | `(data) -> PublicInboxEntity` | Create a PublicInbox entity instance. |
| `Stat` | `(data) -> StatEntity` | Create a Stat entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `RailwayStationPhotosError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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
| `id` |  |

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
| `id` |  |
| `licenses` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | Base URL of all photos |
| `photographers` | List of all photographers, might be empty if no photos available |
| `stations` | List of the stations |

Operations: List, Load.

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

Create an instance: `admin_inbox = client.AdminInbox`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `DS100` | `String` | DS100 attribute of a new station |
| `active` | `Boolean` | active flag of a new station (default true) |
| `command` | `String` |  |
| `conflictResolution` | `String` | how to handle conflicts |
| `countryCode` | `String` | a two character country code |
| `id` | `Integer` |  |
| `lat` | `Float` |  |
| `lon` | `Float` |  |
| `message` | `String` |  |
| `rejectReason` | `String` | explanation of a rejection |
| `stationId` | `String` | ID of a new station |
| `status` | `Integer` |  |
| `title` | `String` |  |

#### Example: Create

```ruby
admin_inbox = client.AdminInbox.create({
  "command" => "example_command", # String
  "id" => 1, # Integer
  "message" => "example_message", # String
  "status" => 1, # Integer
})
```


### Country

Create an instance: `country = client.Country`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `Boolean` | Is this an active country where we collect photos? |
| `allowPhotoUploads` | `Boolean` | Are photo uploads allowed? |
| `code` | `String` | a two character country code |
| `email` | `String` | Contact email address |
| `message` | `String` | Informational message about this country |
| `name` | `String` | Name of the country |
| `overrideLicense` | `String` | if a country needs a special license |
| `providerApps` | `Array` | array with links to provider apps |
| `timetableUrlTemplate` | `String` | URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced |

#### Example: List

```ruby
# list returns an Array of Country records (raises on error).
countrys = client.Country.list
```


### Inbox

Create an instance: `inbox = client.Inbox`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comment` | `String` |  |
| `countryCode` | `String` | a two character country code |
| `crc32` | `Integer` | CRC32 checksum of the uploaded photo |
| `createdAt` | `Integer` |  |
| `filename` | `String` | filename in inbox |
| `id` | `Integer` |  |
| `inboxUrl` | `String` | url of the photo in the inbox |
| `lat` | `Float` |  |
| `lon` | `Float` |  |
| `newLat` | `Float` |  |
| `newLon` | `Float` |  |
| `newTitle` | `String` |  |
| `problemReportType` | `String` | types of problem reports |
| `rejectedReason` | `String` |  |
| `state` | `String` |  |
| `stationId` | `String` |  |
| `title` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Inbox records (raises on error).
inboxs = client.Inbox.list
```

#### Example: Create

```ruby
inbox = client.Inbox.create({
  "id" => 1, # Integer
  "state" => "example_state", # String
})
```


### InboxCount

Create an instance: `inbox_count = client.InboxCount`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `pendingInboxEntries` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the InboxCount record (raises on error).
inbox_count = client.InboxCount.load()
```


### InboxEntry

Create an instance: `inbox_entry = client.InboxEntry`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `Boolean` | active flag provided by the user |
| `comment` | `String` |  |
| `countryCode` | `String` | a two character country code |
| `createdAt` | `Integer` |  |
| `done` | `Boolean` | true if this photo was already imported or rejected |
| `filename` | `String` | name of the file in inbox |
| `hasConflict` | `Boolean` | conflict with another upload or existing photo |
| `hasPhoto` | `Boolean` | this station has already a photo (conflict) |
| `id` | `Integer` |  |
| `inboxUrl` | `String` | url of the photo in the inbox |
| `isProcessed` | `Boolean` | was this image process (e.g. |
| `lat` | `Float` |  |
| `lon` | `Float` |  |
| `newLat` | `Float` |  |
| `newLon` | `Float` |  |
| `newTitle` | `String` |  |
| `photoId` | `Integer` | ID of the photo |
| `photographerEmail` | `String` |  |
| `photographerNickname` | `String` |  |
| `problemReportType` | `String` | types of problem reports |
| `stationId` | `String` |  |
| `title` | `String` |  |

#### Example: List

```ruby
# list returns an Array of InboxEntry records (raises on error).
inbox_entrys = client.InboxEntry.list
```


### InboxStateQuery

Create an instance: `inbox_state_query = client.InboxStateQuery`


### OAuthToken

Create an instance: `o_auth_token = client.OAuthToken`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `String` |  |
| `expires_in` | `Integer` |  |
| `refresh_token` | `String` |  |
| `scope` | `String` |  |
| `token_type` | `String` |  |

#### Example: Create

```ruby
o_auth_token = client.OAuthToken.create({
  "access_token" => "example_access_token", # String
  "scope" => "example_scope", # String
  "token_type" => "example_token_type", # String
})
```


### Oauth

Create an instance: `oauth = client.Oauth`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Oauth record (raises on error).
oauth = client.Oauth.load({ "client_id" => "client_id", "redirect_uri" => "redirect_uri", "response_type" => "response_type", "scope" => "scope" })
```

#### Example: Create

```ruby
oauth = client.Oauth.create({
})
```


### Photo

Create an instance: `photo = client.Photo`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Photo record (raises on error).
photo = client.Photo.load({ "country" => "country", "filename" => "filename" })
```


### PhotoDownload

Create an instance: `photo_download = client.PhotoDownload`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PhotoDownload record (raises on error).
photo_download = client.PhotoDownload.load({ "filename" => "filename" })
```


### PhotoStation

Create an instance: `photo_station = client.PhotoStation`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `licenses` | `Array` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `String` | Base URL of all photos |
| `photographers` | `Array` | List of all photographers, might be empty if no photos available |
| `stations` | `Array` | List of the stations |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the PhotoStation record (raises on error).
photo_station = client.PhotoStation.load({ "country" => "country" })
```

#### Example: List

```ruby
# list returns an Array of PhotoStation records (raises on error).
photo_stations = client.PhotoStation.list
```


### PhotoUpload

Create an instance: `photo_upload = client.PhotoUpload`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ruby
photo_upload = client.PhotoUpload.create({
})
```


### Photographer

Create an instance: `photographer = client.Photographer`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Photographer record (raises on error).
photographer = client.Photographer.load()
```


### Profile

Create an instance: `profile = client.Profile`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `Boolean` |  |
| `anonymous` | `Boolean` |  |
| `email` | `String` |  |
| `emailVerified` | `Boolean` |  |
| `license` | `String` | the only accepted type is "CC0 1.0 Universell (CC0 1.0)", the others are listed for backward compatibility |
| `link` | `String` |  |
| `newPassword` | `String` |  |
| `nickname` | `String` |  |
| `photoOwner` | `Boolean` |  |
| `sendNotifications` | `Boolean` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Profile record (raises on error).
profile = client.Profile.load({ "token" => "token" })
```

#### Example: Create

```ruby
profile = client.Profile.create({
  "license" => "example_license", # String
  "newPassword" => "example_newPassword", # String
  "nickname" => "example_nickname", # String
  "photoOwner" => true, # Boolean
})
```


### PublicInbox

Create an instance: `public_inbox = client.PublicInbox`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countryCode` | `String` | a two character country code |
| `lat` | `Float` |  |
| `lon` | `Float` |  |
| `stationId` | `String` |  |
| `title` | `String` |  |

#### Example: List

```ruby
# list returns an Array of PublicInbox records (raises on error).
public_inboxs = client.PublicInbox.list
```


### Stat

Create an instance: `stat = client.Stat`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countryCode` | `String` | an optional two character country code |
| `photographers` | `Integer` |  |
| `total` | `Integer` |  |
| `withPhoto` | `Integer` |  |
| `withoutPhoto` | `Integer` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Stat record (raises on error).
stat = client.Stat.load()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── RailwayStationPhotos_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`RailwayStationPhotos_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
publicinbox = client.PublicInbox
publicinbox.list()

# publicinbox.data_get now returns the publicinbox data from the last list
# publicinbox.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
