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

#### `Inbox(data = nil)`

Create a new `Inbox` entity instance. Pass `nil` for no initial data.

#### `InboxCount(data = nil)`

Create a new `InboxCount` entity instance. Pass `nil` for no initial data.

#### `InboxEntry(data = nil)`

Create a new `InboxEntry` entity instance. Pass `nil` for no initial data.

#### `InboxStateQuery(data = nil)`

Create a new `InboxStateQuery` entity instance. Pass `nil` for no initial data.

#### `OAuthToken(data = nil)`

Create a new `OAuthToken` entity instance. Pass `nil` for no initial data.

#### `Oauth(data = nil)`

Create a new `Oauth` entity instance. Pass `nil` for no initial data.

#### `Photo(data = nil)`

Create a new `Photo` entity instance. Pass `nil` for no initial data.

#### `PhotoDownload(data = nil)`

Create a new `PhotoDownload` entity instance. Pass `nil` for no initial data.

#### `PhotoStation(data = nil)`

Create a new `PhotoStation` entity instance. Pass `nil` for no initial data.

#### `PhotoUpload(data = nil)`

Create a new `PhotoUpload` entity instance. Pass `nil` for no initial data.

#### `Photographer(data = nil)`

Create a new `Photographer` entity instance. Pass `nil` for no initial data.

#### `Profile(data = nil)`

Create a new `Profile` entity instance. Pass `nil` for no initial data.

#### `PublicInbox(data = nil)`

Create a new `PublicInbox` entity instance. Pass `nil` for no initial data.

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
| `active` | `Boolean` | No |  |
| `command` | `String` | Yes |  |
| `conflict_resolution` | `String` | No |  |
| `country_code` | `String` | No |  |
| `ds100` | `String` | No |  |
| `id` | `Integer` | Yes |  |
| `lat` | `Float` | No |  |
| `lon` | `Float` | No |  |
| `message` | `String` | Yes |  |
| `reject_reason` | `String` | No |  |
| `station_id` | `String` | No |  |
| `status` | `Integer` | Yes |  |
| `title` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.AdminInbox.create({
  "command" => "example", # String
  "message" => "example", # String
  "status" => 1, # Integer
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
| `active` | `Boolean` | Yes |  |
| `allow_photo_upload` | `Boolean` | Yes |  |
| `code` | `String` | Yes |  |
| `email` | `String` | No |  |
| `message` | `String` | No |  |
| `name` | `String` | Yes |  |
| `override_license` | `String` | No |  |
| `provider_app` | `Array` | No |  |
| `timetable_url_template` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Country.list
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

## InboxEntity

```ruby
inbox = client.Inbox
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | `String` | No |  |
| `country_code` | `String` | No |  |
| `crc32` | `Integer` | No |  |
| `created_at` | `Integer` | No |  |
| `filename` | `String` | No |  |
| `id` | `Integer` | Yes |  |
| `inbox_url` | `String` | No |  |
| `lat` | `Float` | No |  |
| `lon` | `Float` | No |  |
| `new_lat` | `Float` | No |  |
| `new_lon` | `Float` | No |  |
| `new_title` | `String` | No |  |
| `problem_report_type` | `String` | No |  |
| `rejected_reason` | `String` | No |  |
| `state` | `String` | Yes |  |
| `station_id` | `String` | No |  |
| `title` | `String` | No |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Inbox.create({
  "state" => "example", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Inbox.list
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Inbox.remove()
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
| `pending_inbox_entry` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

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
| `active` | `Boolean` | No |  |
| `comment` | `String` | Yes |  |
| `country_code` | `String` | No |  |
| `created_at` | `Integer` | Yes |  |
| `done` | `Boolean` | Yes |  |
| `filename` | `String` | No |  |
| `has_conflict` | `Boolean` | No |  |
| `has_photo` | `Boolean` | Yes |  |
| `id` | `Integer` | Yes |  |
| `inbox_url` | `String` | No |  |
| `is_processed` | `Boolean` | No |  |
| `lat` | `Float` | No |  |
| `lon` | `Float` | No |  |
| `new_lat` | `Float` | No |  |
| `new_lon` | `Float` | No |  |
| `new_title` | `String` | No |  |
| `photo_id` | `Integer` | No |  |
| `photographer_email` | `String` | No |  |
| `photographer_nickname` | `String` | Yes |  |
| `problem_report_type` | `String` | No |  |
| `station_id` | `String` | No |  |
| `title` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.InboxEntry.list
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

## InboxStateQueryEntity

```ruby
inbox_state_query = client.InboxStateQuery
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

Create a new `InboxStateQueryEntity` instance with the same client and
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
| `expires_in` | `Integer` | No |  |
| `refresh_token` | `String` | No |  |
| `scope` | `String` | Yes |  |
| `token_type` | `String` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.OAuthToken.create({
  "access_token" => "example", # String
  "scope" => "example", # String
  "token_type" => "example", # String
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

Create a new `OAuthTokenEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OauthEntity

```ruby
oauth = client.Oauth
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Oauth.create({
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Oauth.load()
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

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Photo.load()
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

## PhotoDownloadEntity

```ruby
photo_download = client.PhotoDownload
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.PhotoDownload.load()
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

Create a new `PhotoDownloadEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PhotoStationEntity

```ruby
photo_station = client.PhotoStation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `license` | `Array` | Yes |  |
| `photo_base_url` | `String` | Yes |  |
| `photographer` | `Array` | Yes |  |
| `station` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.PhotoStation.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.PhotoStation.load()
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

Create a new `PhotoStationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PhotoUploadEntity

```ruby
photo_upload = client.PhotoUpload
```

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.PhotoUpload.create({
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

Load a single entity matching the given criteria. Raises on error.

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
| `email_verified` | `Boolean` | No |  |
| `license` | `String` | Yes |  |
| `link` | `String` | No |  |
| `new_password` | `String` | Yes |  |
| `nickname` | `String` | Yes |  |
| `photo_owner` | `Boolean` | Yes |  |
| `send_notification` | `Boolean` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Profile.create({
  "license" => "example", # String
  "new_password" => "example", # String
  "nickname" => "example", # String
  "photo_owner" => true, # Boolean
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Profile.load()
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

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
| `country_code` | `String` | No |  |
| `lat` | `Float` | Yes |  |
| `lon` | `Float` | Yes |  |
| `station_id` | `String` | No |  |
| `title` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.PublicInbox.list
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

## StatEntity

```ruby
stat = client.Stat
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `String` | No |  |
| `photographer` | `Integer` | Yes |  |
| `total` | `Integer` | Yes |  |
| `with_photo` | `Integer` | Yes |  |
| `without_photo` | `Integer` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

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
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = RailwayStationPhotosSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

