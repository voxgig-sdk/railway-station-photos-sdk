# RailwayStationPhotos Lua SDK



The Lua SDK for the RailwayStationPhotos API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:AdminInbox()` — each with the same small set of operations (`list`, `load`, `create`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/railway-station-photos-sdk/tags)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("railway-station-photos_sdk")

local client = sdk.new()
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:AdminInbox():create({ command = "example_command", id = 1 })
if err then error(err) end

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local publicinboxs, err = client:PublicInbox():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:PublicInbox():list()
-- result is an array of entities, one per mock record; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### RailwayStationPhotosSDK

```lua
local sdk = require("railway-station-photos_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### RailwayStationPhotosSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `AdminInbox` | `(data) -> AdminInboxEntity` | Create an AdminInbox entity instance. |
| `Country` | `(data) -> CountryEntity` | Create a Country entity instance. |
| `Done` | `(data) -> DoneEntity` | Create a Done entity instance. |
| `Inbox` | `(data) -> InboxEntity` | Create an Inbox entity instance. |
| `InboxCount` | `(data) -> InboxCountEntity` | Create an InboxCount entity instance. |
| `InboxEntry` | `(data) -> InboxEntryEntity` | Create an InboxEntry entity instance. |
| `OAuthToken` | `(data) -> OAuthTokenEntity` | Create an OAuthToken entity instance. |
| `Oauth` | `(data) -> OauthEntity` | Create an Oauth entity instance. |
| `Photo` | `(data) -> PhotoEntity` | Create a Photo entity instance. |
| `PhotoDownloadInbox` | `(data) -> PhotoDownloadInboxEntity` | Create a PhotoDownloadInbox entity instance. |
| `PhotoStationById` | `(data) -> PhotoStationByIdEntity` | Create a PhotoStationById entity instance. |
| `PhotoStationsByCountry` | `(data) -> PhotoStationsByCountryEntity` | Create a PhotoStationsByCountry entity instance. |
| `PhotoStationsByPhotographer` | `(data) -> PhotoStationsByPhotographerEntity` | Create a PhotoStationsByPhotographer entity instance. |
| `PhotoStationsByRecentPhotoImport` | `(data) -> PhotoStationsByRecentPhotoImportEntity` | Create a PhotoStationsByRecentPhotoImport entity instance. |
| `PhotoUpload` | `(data) -> PhotoUploadEntity` | Create a PhotoUpload entity instance. |
| `Photographer` | `(data) -> PhotographerEntity` | Create a Photographer entity instance. |
| `Processed` | `(data) -> ProcessedEntity` | Create a Processed entity instance. |
| `Profile` | `(data) -> ProfileEntity` | Create a Profile entity instance. |
| `PublicInbox` | `(data) -> PublicInboxEntity` | Create a PublicInbox entity instance. |
| `Rejected` | `(data) -> RejectedEntity` | Create a Rejected entity instance. |
| `Stat` | `(data) -> StatEntity` | Create a Stat entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity, and return it. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity, and return it marked as deleted. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `remove` | the entity, whose `data_get()` reads its record (a `table`) |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local done, err = client:Done():load({ id = "example_id" })
    if err then error(err) end
    -- done is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

#### Done

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/inbox/done/{filename}`

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
| `inbox_state_queries` | Inbox state query request |
| `lat` | new latitude value for the station |
| `lon` | new longitude value for the station |
| `message` |  |
| `newLat` |  |
| `newLon` |  |
| `newTitle` |  |
| `photoId` | Unique id of a photo, can be used for WRONG_PHOTO and PHOTO_OUTDATED type. |
| `problemReportType` | types of problem reports |
| `rejectedReason` |  |
| `state` |  |
| `stationId` |  |
| `title` | a new title for the station |
| `type` | types of problem reports |

Operations: Create, List, Remove.

API path: `/userInbox`

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
| `client_id` |  |
| `code` |  |
| `code_verifier` |  |
| `expires_in` |  |
| `grant_type` |  |
| `redirect_uri` |  |
| `refresh_token` |  |
| `scope` |  |
| `token_type` |  |

Operations: Create.

API path: `/oauth2/token`

#### Oauth

| Field | Description |
| --- | --- |
| `token` |  |
| `token_type_hint` |  |

Operations: Create, Load.

API path: `/oauth2/revoke`

#### Photo

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/photos/{country}/{filename}`

#### PhotoDownloadInbox

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/inbox/{filename}`

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
| `crc32` | CRC32 checksum of the uploaded photo |
| `filename` | filename in inbox |
| `id` |  |
| `inboxUrl` | url of the photo in the inbox |
| `message` |  |
| `state` |  |

Operations: Create.

API path: `/photoUpload`

#### Photographer

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/photographers`

#### Processed

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/inbox/processed/{filename}`

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

#### Rejected

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/inbox/rejected/{filename}`

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

Create an instance: `local admin_inbox = client:AdminInbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `DS100` | `string` | DS100 attribute of a new station |
| `active` | `boolean` | active flag of a new station (default true) |
| `command` | `string` |  |
| `conflictResolution` | `string` | how to handle conflicts |
| `countryCode` | `string` | a two character country code |
| `id` | `number` |  |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `message` | `string` |  |
| `rejectReason` | `string` | explanation of a rejection |
| `stationId` | `string` | ID of a new station |
| `status` | `number` |  |
| `title` | `string` |  |

#### Example: Create

```lua
local admin_inbox, err = client:AdminInbox():create({
  command = "example_command", -- string
  id = 1, -- number
})
```


### Country

Create an instance: `local country = client:Country(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` | Is this an active country where we collect photos? |
| `allowPhotoUploads` | `boolean` | Are photo uploads allowed? |
| `code` | `string` | a two character country code |
| `email` | `string` | Contact email address |
| `message` | `string` | Informational message about this country |
| `name` | `string` | Name of the country |
| `overrideLicense` | `string` | if a country needs a special license |
| `providerApps` | `table` | array with links to provider apps |
| `timetableUrlTemplate` | `string` | URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced |

#### Example: List

```lua
local countrys, err = client:Country():list()
```


### Done

Create an instance: `local done = client:Done(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local done, err = client:Done():load({ id = "done_id" })
```


### Inbox

Create an instance: `local inbox = client:Inbox(nil)`

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
| `crc32` | `number` | CRC32 checksum of the uploaded photo |
| `createdAt` | `number` |  |
| `filename` | `string` | filename in inbox |
| `id` | `number` |  |
| `inboxUrl` | `string` | url of the photo in the inbox |
| `inbox_state_queries` | `table` | Inbox state query request |
| `lat` | `number` | new latitude value for the station |
| `lon` | `number` | new longitude value for the station |
| `message` | `string` |  |
| `newLat` | `number` |  |
| `newLon` | `number` |  |
| `newTitle` | `string` |  |
| `photoId` | `number` | Unique id of a photo, can be used for WRONG_PHOTO and PHOTO_OUTDATED type. |
| `problemReportType` | `string` | types of problem reports |
| `rejectedReason` | `string` |  |
| `state` | `string` |  |
| `stationId` | `string` |  |
| `title` | `string` | a new title for the station |
| `type` | `string` | types of problem reports |

#### Example: List

```lua
local inboxs, err = client:Inbox():list()
```

#### Example: Create

```lua
local inbox, err = client:Inbox():create({
  comment = "example_comment", -- string
  countryCode = "example_countryCode", -- string
  stationId = "example_stationId", -- string
  type = "example_type", -- string
})
```


### InboxCount

Create an instance: `local inbox_count = client:InboxCount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `pendingInboxEntries` | `number` |  |

#### Example: Load

```lua
local inbox_count, err = client:InboxCount():load()
```


### InboxEntry

Create an instance: `local inbox_entry = client:InboxEntry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` | active flag provided by the user |
| `comment` | `string` |  |
| `countryCode` | `string` | a two character country code |
| `createdAt` | `number` |  |
| `done` | `boolean` | true if this photo was already imported or rejected |
| `filename` | `string` | name of the file in inbox |
| `hasConflict` | `boolean` | conflict with another upload or existing photo |
| `hasPhoto` | `boolean` | this station has already a photo (conflict) |
| `id` | `number` |  |
| `inboxUrl` | `string` | url of the photo in the inbox |
| `isProcessed` | `boolean` | was this image process (e.g. |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `newLat` | `number` |  |
| `newLon` | `number` |  |
| `newTitle` | `string` |  |
| `photoId` | `number` | ID of the photo |
| `photographerEmail` | `string` |  |
| `photographerNickname` | `string` |  |
| `problemReportType` | `string` | types of problem reports |
| `stationId` | `string` |  |
| `title` | `string` |  |

#### Example: List

```lua
local inbox_entrys, err = client:InboxEntry():list()
```


### OAuthToken

Create an instance: `local o_auth_token = client:OAuthToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` |  |
| `client_id` | `string` |  |
| `code` | `string` |  |
| `code_verifier` | `string` |  |
| `expires_in` | `number` |  |
| `grant_type` | `string` |  |
| `redirect_uri` | `string` |  |
| `refresh_token` | `string` |  |
| `scope` | `string` |  |
| `token_type` | `string` |  |

#### Example: Create

```lua
local o_auth_token, err = client:OAuthToken():create({
  access_token = "example_access_token", -- string
  client_id = "example_client_id", -- string
  grant_type = "example_grant_type", -- string
  redirect_uri = "example_redirect_uri", -- string
  scope = "example_scope", -- string
  token_type = "example_token_type", -- string
})
```


### Oauth

Create an instance: `local oauth = client:Oauth(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `token` | `string` |  |
| `token_type_hint` | `string` |  |

#### Example: Load

```lua
local oauth, err = client:Oauth():load({ client_id = "client_id", redirect_uri = "redirect_uri", response_type = "response_type", scope = "scope" })
```

#### Example: Create

```lua
local oauth, err = client:Oauth():create({
  token = "example_token", -- string
})
```


### Photo

Create an instance: `local photo = client:Photo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local photo, err = client:Photo():load({ country = "country", filename = "filename" })
```


### PhotoDownloadInbox

Create an instance: `local photo_download_inbox = client:PhotoDownloadInbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local photo_download_inbox, err = client:PhotoDownloadInbox():load({ id = "photo_download_inbox_id" })
```


### PhotoStationById

Create an instance: `local photo_station_by_id = client:PhotoStationById(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `licenses` | `table` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Base URL of all photos |
| `photographers` | `table` | List of all photographers, might be empty if no photos available |
| `stations` | `table` | List of the stations |

#### Example: Load

```lua
local photo_station_by_id, err = client:PhotoStationById():load({ id = "photo_station_by_id_id", country = "country" })
```


### PhotoStationsByCountry

Create an instance: `local photo_stations_by_country = client:PhotoStationsByCountry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `licenses` | `table` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Base URL of all photos |
| `photographers` | `table` | List of all photographers, might be empty if no photos available |
| `stations` | `table` | List of the stations |

#### Example: Load

```lua
local photo_stations_by_country, err = client:PhotoStationsByCountry():load({ id = "photo_stations_by_country_id" })
```


### PhotoStationsByPhotographer

Create an instance: `local photo_stations_by_photographer = client:PhotoStationsByPhotographer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `licenses` | `table` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Base URL of all photos |
| `photographers` | `table` | List of all photographers, might be empty if no photos available |
| `stations` | `table` | List of the stations |

#### Example: Load

```lua
local photo_stations_by_photographer, err = client:PhotoStationsByPhotographer():load({ id = "photo_stations_by_photographer_id" })
```


### PhotoStationsByRecentPhotoImport

Create an instance: `local photo_stations_by_recent_photo_import = client:PhotoStationsByRecentPhotoImport(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `licenses` | `table` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Base URL of all photos |
| `photographers` | `table` | List of all photographers, might be empty if no photos available |
| `stations` | `table` | List of the stations |

#### Example: List

```lua
local photo_stations_by_recent_photo_imports, err = client:PhotoStationsByRecentPhotoImport():list()
```


### PhotoUpload

Create an instance: `local photo_upload = client:PhotoUpload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crc32` | `number` | CRC32 checksum of the uploaded photo |
| `filename` | `string` | filename in inbox |
| `id` | `number` |  |
| `inboxUrl` | `string` | url of the photo in the inbox |
| `message` | `string` |  |
| `state` | `string` |  |

#### Example: Create

```lua
local photo_upload, err = client:PhotoUpload():create({
  state = "example_state", -- string
})
```


### Photographer

Create an instance: `local photographer = client:Photographer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local photographer, err = client:Photographer():load()
```


### Processed

Create an instance: `local processed = client:Processed(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local processed, err = client:Processed():load({ id = "processed_id" })
```


### Profile

Create an instance: `local profile = client:Profile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `boolean` |  |
| `anonymous` | `boolean` |  |
| `email` | `string` |  |
| `emailVerified` | `boolean` |  |
| `license` | `string` | the only accepted type is "CC0 1.0 Universell (CC0 1.0)", the others are listed for backward compatibility |
| `link` | `string` |  |
| `newPassword` | `string` |  |
| `nickname` | `string` |  |
| `photoOwner` | `boolean` |  |
| `sendNotifications` | `boolean` |  |

#### Example: Load

```lua
local profile, err = client:Profile():load({ token = "token" })
```

#### Example: Create

```lua
local profile, err = client:Profile():create({
  email = "example_email", -- string
  newPassword = "example_newPassword", -- string
  nickname = "example_nickname", -- string
})
```


### PublicInbox

Create an instance: `local public_inbox = client:PublicInbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countryCode` | `string` | a two character country code |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `stationId` | `string` |  |
| `title` | `string` |  |

#### Example: List

```lua
local public_inboxs, err = client:PublicInbox():list()
```


### Rejected

Create an instance: `local rejected = client:Rejected(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local rejected, err = client:Rejected():load({ id = "rejected_id" })
```


### Stat

Create an instance: `local stat = client:Stat(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countryCode` | `string` | an optional two character country code |
| `photographers` | `number` |  |
| `total` | `number` |  |
| `withPhoto` | `number` |  |
| `withoutPhoto` | `number` |  |

#### Example: Load

```lua
local stat, err = client:Stat():load()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── railway-station-photos_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`railway-station-photos_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local publicinbox = client:PublicInbox()
publicinbox:list()

-- publicinbox:data_get() now returns the publicinbox data from the last list
-- publicinbox:match_get() returns the last match criteria
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
