# RailwayStationPhotos Ruby SDK Reference

Complete API reference for the RailwayStationPhotos Ruby SDK.


## RailwayStationPhotosSDK

### Constructor

```ruby
require_relative 'RailwayStationPhotos_sdk'

client = RailwayStationPhotosSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RailwayStationPhotosSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = RailwayStationPhotosSDK.test
```


### Instance Methods

#### `AdminInbox(data = nil)`

Create a new `AdminInbox` entity instance. Pass `nil` for no initial data.

#### `Country(data = nil)`

Create a new `Country` entity instance. Pass `nil` for no initial data.

#### `Done(data = nil)`

Create a new `Done` entity instance. Pass `nil` for no initial data.

#### `Inbox(data = nil)`

Create a new `Inbox` entity instance. Pass `nil` for no initial data.

#### `InboxCount(data = nil)`

Create a new `InboxCount` entity instance. Pass `nil` for no initial data.

#### `InboxEntry(data = nil)`

Create a new `InboxEntry` entity instance. Pass `nil` for no initial data.

#### `OAuthToken(data = nil)`

Create a new `OAuthToken` entity instance. Pass `nil` for no initial data.

#### `Oauth(data = nil)`

Create a new `Oauth` entity instance. Pass `nil` for no initial data.

#### `Photo(data = nil)`

Create a new `Photo` entity instance. Pass `nil` for no initial data.

#### `PhotoDownloadInbox(data = nil)`

Create a new `PhotoDownloadInbox` entity instance. Pass `nil` for no initial data.

#### `PhotoStationById(data = nil)`

Create a new `PhotoStationById` entity instance. Pass `nil` for no initial data.

#### `PhotoStationsByCountry(data = nil)`

Create a new `PhotoStationsByCountry` entity instance. Pass `nil` for no initial data.

#### `PhotoStationsByPhotographer(data = nil)`

Create a new `PhotoStationsByPhotographer` entity instance. Pass `nil` for no initial data.

#### `PhotoStationsByRecentPhotoImport(data = nil)`

Create a new `PhotoStationsByRecentPhotoImport` entity instance. Pass `nil` for no initial data.

#### `PhotoUpload(data = nil)`

Create a new `PhotoUpload` entity instance. Pass `nil` for no initial data.

#### `Photographer(data = nil)`

Create a new `Photographer` entity instance. Pass `nil` for no initial data.

#### `Processed(data = nil)`

Create a new `Processed` entity instance. Pass `nil` for no initial data.

#### `Profile(data = nil)`

Create a new `Profile` entity instance. Pass `nil` for no initial data.

#### `PublicInbox(data = nil)`

Create a new `PublicInbox` entity instance. Pass `nil` for no initial data.

#### `Rejected(data = nil)`

Create a new `Rejected` entity instance. Pass `nil` for no initial data.

#### `Stat(data = nil)`

Create a new `Stat` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AdminInboxEntity

```ruby
admin_inbox = client.AdminInbox
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `DS100` | `String` | No | DS100 attribute of a new station |
| `active` | `Boolean` | No | active flag of a new station (default true) |
| `command` | `String` | Yes |  |
| `conflictResolution` | `String` | No | how to handle conflicts |
| `countryCode` | `String` | No | a two character country code |
| `id` | `Integer` | Yes |  |
| `lat` | `Float` | No |  |
| `lon` | `Float` | No |  |
| `message` | `String` | Yes |  |
| `rejectReason` | `String` | No | explanation of a rejection |
| `stationId` | `String` | No | ID of a new station |
| `status` | `Integer` | Yes |  |
| `title` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.AdminInbox.create({
  "command" => "example_command", # String
  "id" => 1, # Integer
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AdminInboxEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CountryEntity

```ruby
country = client.Country
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `Boolean` | Yes | Is this an active country where we collect photos? |
| `allowPhotoUploads` | `Boolean` | Yes | Are photo uploads allowed? |
| `code` | `String` | Yes | a two character country code |
| `email` | `String` | No | Contact email address |
| `message` | `String` | No | Informational message about this country |
| `name` | `String` | Yes | Name of the country |
| `overrideLicense` | `String` | No | if a country needs a special license |
| `providerApps` | `Array` | No | array with links to provider apps |
| `timetableUrlTemplate` | `String` | No | URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Country.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CountryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DoneEntity

```ruby
done = client.Done
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Done.load({ "id" => "done_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DoneEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InboxEntity

```ruby
inbox = client.Inbox
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | `String` | Yes |  |
| `countryCode` | `String` | Yes | a two character country code |
| `crc32` | `Integer` | No | CRC32 checksum of the uploaded photo |
| `createdAt` | `Integer` | No |  |
| `filename` | `String` | No | filename in inbox |
| `id` | `Integer` | No |  |
| `inboxUrl` | `String` | No | url of the photo in the inbox |
| `inbox_state_queries` | `Array` | No | Inbox state query request |
| `lat` | `Float` | No | new latitude value for the station |
| `lon` | `Float` | No | new longitude value for the station |
| `message` | `String` | No |  |
| `newLat` | `Float` | No |  |
| `newLon` | `Float` | No |  |
| `newTitle` | `String` | No |  |
| `photoId` | `Integer` | No | Unique id of a photo, can be used for WRONG_PHOTO and PHOTO_OUTDATED type. |
| `problemReportType` | `String` | No | types of problem reports |
| `rejectedReason` | `String` | No |  |
| `state` | `String` | Yes |  |
| `stationId` | `String` | Yes |  |
| `title` | `String` | No | a new title for the station |
| `type` | `String` | Yes | types of problem reports |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Inbox.create({
  "comment" => "example_comment", # String
  "countryCode" => "example_countryCode", # String
  "stationId" => "example_stationId", # String
  "type" => "example_type", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Inbox.list
results.each { |item| puts item.data_get }
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Inbox.remove({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InboxEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InboxCountEntity

```ruby
inbox_count = client.InboxCount
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `pendingInboxEntries` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.InboxCount.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InboxCountEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InboxEntryEntity

```ruby
inbox_entry = client.InboxEntry
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `Boolean` | No | active flag provided by the user |
| `comment` | `String` | Yes |  |
| `countryCode` | `String` | No | a two character country code |
| `createdAt` | `Integer` | Yes |  |
| `done` | `Boolean` | Yes | true if this photo was already imported or rejected |
| `filename` | `String` | No | name of the file in inbox |
| `hasConflict` | `Boolean` | No | conflict with another upload or existing photo |
| `hasPhoto` | `Boolean` | Yes | this station has already a photo (conflict) |
| `id` | `Integer` | Yes |  |
| `inboxUrl` | `String` | No | url of the photo in the inbox |
| `isProcessed` | `Boolean` | No | was this image process (e.g. |
| `lat` | `Float` | No |  |
| `lon` | `Float` | No |  |
| `newLat` | `Float` | No |  |
| `newLon` | `Float` | No |  |
| `newTitle` | `String` | No |  |
| `photoId` | `Integer` | No | ID of the photo |
| `photographerEmail` | `String` | No |  |
| `photographerNickname` | `String` | Yes |  |
| `problemReportType` | `String` | No | types of problem reports |
| `stationId` | `String` | No |  |
| `title` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.InboxEntry.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InboxEntryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OAuthTokenEntity

```ruby
o_auth_token = client.OAuthToken
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `String` | Yes |  |
| `client_id` | `String` | Yes |  |
| `code` | `String` | No |  |
| `code_verifier` | `String` | No |  |
| `expires_in` | `Integer` | No |  |
| `grant_type` | `String` | Yes |  |
| `redirect_uri` | `String` | Yes |  |
| `refresh_token` | `String` | No |  |
| `scope` | `String` | Yes |  |
| `token_type` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.OAuthToken.create({
  "access_token" => "example_access_token", # String
  "client_id" => "example_client_id", # String
  "grant_type" => "example_grant_type", # String
  "redirect_uri" => "example_redirect_uri", # String
  "scope" => "example_scope", # String
  "token_type" => "example_token_type", # String
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OAuthTokenEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OauthEntity

```ruby
oauth = client.Oauth
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | `String` | Yes |  |
| `token_type_hint` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Oauth.create({
  "token" => "example_token", # String
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Oauth.load({ "client_id" => "client_id", "redirect_uri" => "redirect_uri", "response_type" => "response_type", "scope" => "scope" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OauthEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PhotoEntity

```ruby
photo = client.Photo
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Photo.load({ "country" => "country", "filename" => "filename" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PhotoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PhotoDownloadInboxEntity

```ruby
photo_download_inbox = client.PhotoDownloadInbox
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.PhotoDownloadInbox.load({ "id" => "photo_download_inbox_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PhotoDownloadInboxEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PhotoStationByIdEntity

```ruby
photo_station_by_id = client.PhotoStationById
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `licenses` | `Array` | Yes | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `String` | Yes | Base URL of all photos |
| `photographers` | `Array` | Yes | List of all photographers, might be empty if no photos available |
| `stations` | `Array` | Yes | List of the stations |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.PhotoStationById.load({ "id" => "photo_station_by_id_id", "country" => "country" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PhotoStationByIdEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PhotoStationsByCountryEntity

```ruby
photo_stations_by_country = client.PhotoStationsByCountry
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `licenses` | `Array` | Yes | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `String` | Yes | Base URL of all photos |
| `photographers` | `Array` | Yes | List of all photographers, might be empty if no photos available |
| `stations` | `Array` | Yes | List of the stations |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.PhotoStationsByCountry.load({ "id" => "photo_stations_by_country_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PhotoStationsByCountryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PhotoStationsByPhotographerEntity

```ruby
photo_stations_by_photographer = client.PhotoStationsByPhotographer
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `licenses` | `Array` | Yes | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `String` | Yes | Base URL of all photos |
| `photographers` | `Array` | Yes | List of all photographers, might be empty if no photos available |
| `stations` | `Array` | Yes | List of the stations |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.PhotoStationsByPhotographer.load({ "id" => "photo_stations_by_photographer_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PhotoStationsByPhotographerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PhotoStationsByRecentPhotoImportEntity

```ruby
photo_stations_by_recent_photo_import = client.PhotoStationsByRecentPhotoImport
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `licenses` | `Array` | Yes | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `String` | Yes | Base URL of all photos |
| `photographers` | `Array` | Yes | List of all photographers, might be empty if no photos available |
| `stations` | `Array` | Yes | List of the stations |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PhotoStationsByRecentPhotoImport.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PhotoStationsByRecentPhotoImportEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PhotoUploadEntity

```ruby
photo_upload = client.PhotoUpload
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crc32` | `Integer` | No | CRC32 checksum of the uploaded photo |
| `filename` | `String` | No | filename in inbox |
| `id` | `Integer` | No |  |
| `inboxUrl` | `String` | No | url of the photo in the inbox |
| `message` | `String` | No |  |
| `state` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.PhotoUpload.create({
  "state" => "example_state", # String
})
```

Sends its body unencoded, as `application/octet-stream`: pass it as `$body`, a `String`, or an IO that responds to `read`. An IO is read in full before the request is sent, so that a retry sends the same bytes. The operation also accepts `image/jpeg`, `image/png`: a `content-type` header option that is not JSON replaces the declared one.

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PhotoUploadEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PhotographerEntity

```ruby
photographer = client.Photographer
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Photographer.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PhotographerEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProcessedEntity

```ruby
processed = client.Processed
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Processed.load({ "id" => "processed_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProcessedEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProfileEntity

```ruby
profile = client.Profile
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `Boolean` | No |  |
| `anonymous` | `Boolean` | No |  |
| `email` | `String` | No |  |
| `emailVerified` | `Boolean` | No |  |
| `license` | `String` | Yes | the only accepted type is "CC0 1.0 Universell (CC0 1.0)", the others are listed for backward compatibility |
| `link` | `String` | No |  |
| `newPassword` | `String` | Yes |  |
| `nickname` | `String` | Yes |  |
| `photoOwner` | `Boolean` | Yes |  |
| `sendNotifications` | `Boolean` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Returns the created entity and raises on error.

```ruby
result = client.Profile.create({
  "email" => "example_email", # String
  "newPassword" => "example_newPassword", # String
  "nickname" => "example_nickname", # String
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Profile.load({ "token" => "token" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Returns the entity, marked as deleted, and raises on error.

```ruby
result = client.Profile.remove()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProfileEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PublicInboxEntity

```ruby
public_inbox = client.PublicInbox
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryCode` | `String` | No | a two character country code |
| `lat` | `Float` | Yes |  |
| `lon` | `Float` | Yes |  |
| `stationId` | `String` | No |  |
| `title` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.PublicInbox.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PublicInboxEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RejectedEntity

```ruby
rejected = client.Rejected
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Rejected.load({ "id" => "rejected_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RejectedEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StatEntity

```ruby
stat = client.Stat
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryCode` | `String` | No | an optional two character country code |
| `photographers` | `Integer` | Yes |  |
| `total` | `Integer` | Yes |  |
| `withPhoto` | `Integer` | Yes |  |
| `withoutPhoto` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Stat.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StatEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = RailwayStationPhotosSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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

