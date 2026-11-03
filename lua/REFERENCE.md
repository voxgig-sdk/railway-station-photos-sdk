# RailwayStationPhotos Lua SDK Reference

Complete API reference for the RailwayStationPhotos Lua SDK.


## RailwayStationPhotosSDK

### Constructor

```lua
local sdk = require("railway-station-photos_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `AdminInbox(data)`

Create a new `AdminInbox` entity instance. Pass `nil` for no initial data.

#### `Country(data)`

Create a new `Country` entity instance. Pass `nil` for no initial data.

#### `Done(data)`

Create a new `Done` entity instance. Pass `nil` for no initial data.

#### `Inbox(data)`

Create a new `Inbox` entity instance. Pass `nil` for no initial data.

#### `InboxCount(data)`

Create a new `InboxCount` entity instance. Pass `nil` for no initial data.

#### `InboxEntry(data)`

Create a new `InboxEntry` entity instance. Pass `nil` for no initial data.

#### `OAuthToken(data)`

Create a new `OAuthToken` entity instance. Pass `nil` for no initial data.

#### `Oauth(data)`

Create a new `Oauth` entity instance. Pass `nil` for no initial data.

#### `Photo(data)`

Create a new `Photo` entity instance. Pass `nil` for no initial data.

#### `PhotoDownloadInbox(data)`

Create a new `PhotoDownloadInbox` entity instance. Pass `nil` for no initial data.

#### `PhotoStationById(data)`

Create a new `PhotoStationById` entity instance. Pass `nil` for no initial data.

#### `PhotoStationsByCountry(data)`

Create a new `PhotoStationsByCountry` entity instance. Pass `nil` for no initial data.

#### `PhotoStationsByPhotographer(data)`

Create a new `PhotoStationsByPhotographer` entity instance. Pass `nil` for no initial data.

#### `PhotoStationsByRecentPhotoImport(data)`

Create a new `PhotoStationsByRecentPhotoImport` entity instance. Pass `nil` for no initial data.

#### `PhotoUpload(data)`

Create a new `PhotoUpload` entity instance. Pass `nil` for no initial data.

#### `Photographer(data)`

Create a new `Photographer` entity instance. Pass `nil` for no initial data.

#### `Processed(data)`

Create a new `Processed` entity instance. Pass `nil` for no initial data.

#### `Profile(data)`

Create a new `Profile` entity instance. Pass `nil` for no initial data.

#### `PublicInbox(data)`

Create a new `PublicInbox` entity instance. Pass `nil` for no initial data.

#### `Rejected(data)`

Create a new `Rejected` entity instance. Pass `nil` for no initial data.

#### `Stat(data)`

Create a new `Stat` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AdminInboxEntity

```lua
local admin_inbox = client:AdminInbox(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `DS100` | `string` | No | DS100 attribute of a new station |
| `active` | `boolean` | No | active flag of a new station (default true) |
| `command` | `string` | Yes |  |
| `conflictResolution` | `string` | No | how to handle conflicts |
| `countryCode` | `string` | No | a two character country code |
| `id` | `number` | Yes |  |
| `lat` | `number` | No |  |
| `lon` | `number` | No |  |
| `message` | `string` | Yes |  |
| `rejectReason` | `string` | No | explanation of a rejection |
| `stationId` | `string` | No | ID of a new station |
| `status` | `number` | Yes |  |
| `title` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:AdminInbox():create({
  command = --[[ string ]],
  id = --[[ number ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AdminInboxEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CountryEntity

```lua
local country = client:Country(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | Yes | Is this an active country where we collect photos? |
| `allowPhotoUploads` | `boolean` | Yes | Are photo uploads allowed? |
| `code` | `string` | Yes | a two character country code |
| `email` | `string` | No | Contact email address |
| `message` | `string` | No | Informational message about this country |
| `name` | `string` | Yes | Name of the country |
| `overrideLicense` | `string` | No | if a country needs a special license |
| `providerApps` | `table` | No | array with links to provider apps |
| `timetableUrlTemplate` | `string` | No | URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Country():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CountryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DoneEntity

```lua
local done = client:Done(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Done():load({ id = "done_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DoneEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InboxEntity

```lua
local inbox = client:Inbox(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | `string` | Yes |  |
| `countryCode` | `string` | Yes | a two character country code |
| `crc32` | `number` | No | CRC32 checksum of the uploaded photo |
| `createdAt` | `number` | No |  |
| `filename` | `string` | No | filename in inbox |
| `id` | `number` | No |  |
| `inboxUrl` | `string` | No | url of the photo in the inbox |
| `inbox_state_queries` | `table` | No | Inbox state query request |
| `lat` | `number` | No | new latitude value for the station |
| `lon` | `number` | No | new longitude value for the station |
| `message` | `string` | No |  |
| `newLat` | `number` | No |  |
| `newLon` | `number` | No |  |
| `newTitle` | `string` | No |  |
| `photoId` | `number` | No | Unique id of a photo, can be used for WRONG_PHOTO and PHOTO_OUTDATED type. |
| `problemReportType` | `string` | No | types of problem reports |
| `rejectedReason` | `string` | No |  |
| `state` | `string` | Yes |  |
| `stationId` | `string` | Yes |  |
| `title` | `string` | No | a new title for the station |
| `type` | `string` | Yes | types of problem reports |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `comment` | Yes | - | - |
| `countryCode` | Yes | - | - |
| `crc32` | - | - | - |
| `createdAt` | - | - | - |
| `filename` | - | - | - |
| `id` | Yes | - | - |
| `inboxUrl` | - | - | - |
| `inbox_state_queries` | - | - | - |
| `lat` | - | - | - |
| `lon` | - | - | - |
| `message` | - | - | - |
| `newLat` | - | - | - |
| `newLon` | - | - | - |
| `newTitle` | - | - | - |
| `photoId` | - | - | - |
| `problemReportType` | - | - | - |
| `rejectedReason` | - | - | - |
| `state` | - | - | - |
| `stationId` | Yes | - | - |
| `title` | - | - | - |
| `type` | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Inbox():create({
  comment = --[[ string ]],
  countryCode = --[[ string ]],
  stationId = --[[ string ]],
  type = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Inbox():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Inbox():remove({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InboxEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InboxCountEntity

```lua
local inbox_count = client:InboxCount(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `pendingInboxEntries` | `number` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:InboxCount():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InboxCountEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InboxEntryEntity

```lua
local inbox_entry = client:InboxEntry(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | No | active flag provided by the user |
| `comment` | `string` | Yes |  |
| `countryCode` | `string` | No | a two character country code |
| `createdAt` | `number` | Yes |  |
| `done` | `boolean` | Yes | true if this photo was already imported or rejected |
| `filename` | `string` | No | name of the file in inbox |
| `hasConflict` | `boolean` | No | conflict with another upload or existing photo |
| `hasPhoto` | `boolean` | Yes | this station has already a photo (conflict) |
| `id` | `number` | Yes |  |
| `inboxUrl` | `string` | No | url of the photo in the inbox |
| `isProcessed` | `boolean` | No | was this image process (e.g. |
| `lat` | `number` | No |  |
| `lon` | `number` | No |  |
| `newLat` | `number` | No |  |
| `newLon` | `number` | No |  |
| `newTitle` | `string` | No |  |
| `photoId` | `number` | No | ID of the photo |
| `photographerEmail` | `string` | No |  |
| `photographerNickname` | `string` | Yes |  |
| `problemReportType` | `string` | No | types of problem reports |
| `stationId` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:InboxEntry():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InboxEntryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OAuthTokenEntity

```lua
local o_auth_token = client:OAuthToken(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes |  |
| `client_id` | `string` | Yes |  |
| `code` | `string` | No |  |
| `code_verifier` | `string` | No |  |
| `expires_in` | `number` | No |  |
| `grant_type` | `string` | Yes |  |
| `redirect_uri` | `string` | Yes |  |
| `refresh_token` | `string` | No |  |
| `scope` | `string` | Yes |  |
| `token_type` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:OAuthToken():create({
  access_token = --[[ string ]],
  client_id = --[[ string ]],
  grant_type = --[[ string ]],
  redirect_uri = --[[ string ]],
  scope = --[[ string ]],
  token_type = --[[ string ]],
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OAuthTokenEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OauthEntity

```lua
local oauth = client:Oauth(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | `string` | Yes |  |
| `token_type_hint` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Oauth():create({
  token = --[[ string ]],
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Oauth():load({ client_id = "client_id", redirect_uri = "redirect_uri", response_type = "response_type", scope = "scope" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OauthEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PhotoEntity

```lua
local photo = client:Photo(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Photo():load({ country = "country", filename = "filename" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhotoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PhotoDownloadInboxEntity

```lua
local photo_download_inbox = client:PhotoDownloadInbox(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:PhotoDownloadInbox():load({ id = "photo_download_inbox_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhotoDownloadInboxEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PhotoStationByIdEntity

```lua
local photo_station_by_id = client:PhotoStationById(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `licenses` | `table` | Yes | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Yes | Base URL of all photos |
| `photographers` | `table` | Yes | List of all photographers, might be empty if no photos available |
| `stations` | `table` | Yes | List of the stations |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:PhotoStationById():load({ id = "photo_station_by_id_id", country = "country" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhotoStationByIdEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PhotoStationsByCountryEntity

```lua
local photo_stations_by_country = client:PhotoStationsByCountry(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `licenses` | `table` | Yes | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Yes | Base URL of all photos |
| `photographers` | `table` | Yes | List of all photographers, might be empty if no photos available |
| `stations` | `table` | Yes | List of the stations |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:PhotoStationsByCountry():load({ id = "photo_stations_by_country_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhotoStationsByCountryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PhotoStationsByPhotographerEntity

```lua
local photo_stations_by_photographer = client:PhotoStationsByPhotographer(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `licenses` | `table` | Yes | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Yes | Base URL of all photos |
| `photographers` | `table` | Yes | List of all photographers, might be empty if no photos available |
| `stations` | `table` | Yes | List of the stations |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:PhotoStationsByPhotographer():load({ id = "photo_stations_by_photographer_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhotoStationsByPhotographerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PhotoStationsByRecentPhotoImportEntity

```lua
local photo_stations_by_recent_photo_import = client:PhotoStationsByRecentPhotoImport(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `licenses` | `table` | Yes | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Yes | Base URL of all photos |
| `photographers` | `table` | Yes | List of all photographers, might be empty if no photos available |
| `stations` | `table` | Yes | List of the stations |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PhotoStationsByRecentPhotoImport():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhotoStationsByRecentPhotoImportEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PhotoUploadEntity

```lua
local photo_upload = client:PhotoUpload(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crc32` | `number` | No | CRC32 checksum of the uploaded photo |
| `filename` | `string` | No | filename in inbox |
| `id` | `number` | No |  |
| `inboxUrl` | `string` | No | url of the photo in the inbox |
| `message` | `string` | No |  |
| `state` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:PhotoUpload():create({
  state = --[[ string ]],
})
```

Sends its body unencoded, as `application/octet-stream`: pass it as `$body`, a string. The operation also accepts `image/jpeg`, `image/png`: a `content-type` header option that is not JSON replaces the declared one.

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhotoUploadEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PhotographerEntity

```lua
local photographer = client:Photographer(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Photographer():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhotographerEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProcessedEntity

```lua
local processed = client:Processed(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Processed():load({ id = "processed_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProcessedEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProfileEntity

```lua
local profile = client:Profile(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `boolean` | No |  |
| `anonymous` | `boolean` | No |  |
| `email` | `string` | No |  |
| `emailVerified` | `boolean` | No |  |
| `license` | `string` | Yes | the only accepted type is "CC0 1.0 Universell (CC0 1.0)", the others are listed for backward compatibility |
| `link` | `string` | No |  |
| `newPassword` | `string` | Yes |  |
| `nickname` | `string` | Yes |  |
| `photoOwner` | `boolean` | Yes |  |
| `sendNotifications` | `boolean` | No |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data. Returns the created entity, or `nil` and an error on failure.

```lua
local result, err = client:Profile():create({
  email = --[[ string ]],
  newPassword = --[[ string ]],
  nickname = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Profile():load({ token = "token" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, or `nil` and an error on failure.

```lua
local result, err = client:Profile():remove()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProfileEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PublicInboxEntity

```lua
local public_inbox = client:PublicInbox(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryCode` | `string` | No | a two character country code |
| `lat` | `number` | Yes |  |
| `lon` | `number` | Yes |  |
| `stationId` | `string` | No |  |
| `title` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:PublicInbox():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicInboxEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RejectedEntity

```lua
local rejected = client:Rejected(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Rejected():load({ id = "rejected_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RejectedEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StatEntity

```lua
local stat = client:Stat(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryCode` | `string` | No | an optional two character country code |
| `photographers` | `number` | Yes |  |
| `total` | `number` | Yes |  |
| `withPhoto` | `number` | Yes |  |
| `withoutPhoto` | `number` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Stat():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StatEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
  },
})
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

Rate limiting.

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

Retry.

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

Test transport.

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

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
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

