# RailwayStationPhotos Ruby SDK Reference

Complete API reference for the RailwayStationPhotos Ruby SDK.


## RailwayStationPhotosSDK

### Constructor

```ruby
require_relative 'railway-station-photos_sdk'

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.AdminInbox.create({
  "command" => # `$STRING`,
  "message" => # `$STRING`,
  "status" => # `$INTEGER`,
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Country.list(nil)
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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Inbox.create({
  "state" => # `$STRING`,
})
```

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Inbox.list(nil)
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Inbox.remove({ "id" => "inbox_id" })
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
| `pending_inbox_entry` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.InboxCount.load({ "id" => "inbox_count_id" })
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

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.InboxEntry.list(nil)
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
| `access_token` | ``$STRING`` | Yes |  |
| `expires_in` | ``$INTEGER`` | No |  |
| `refresh_token` | ``$STRING`` | No |  |
| `scope` | ``$STRING`` | Yes |  |
| `token_type` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.OAuthToken.create({
  "access_token" => # `$STRING`,
  "scope" => # `$STRING`,
  "token_type" => # `$STRING`,
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
result = client.Oauth.load({ "id" => "oauth_id" })
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
result = client.Photo.load({ "id" => "photo_id" })
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
result = client.PhotoDownload.load({ "id" => "photo_download_id" })
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
| `license` | ``$ARRAY`` | Yes |  |
| `photo_base_url` | ``$STRING`` | Yes |  |
| `photographer` | ``$ARRAY`` | Yes |  |
| `station` | ``$ARRAY`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.PhotoStation.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.PhotoStation.load({ "id" => "photo_station_id" })
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
result = client.Photographer.load({ "id" => "photographer_id" })
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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Profile.create({
  "license" => # `$STRING`,
  "new_password" => # `$STRING`,
  "nickname" => # `$STRING`,
  "photo_owner" => # `$BOOLEAN`,
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Profile.load({ "id" => "profile_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Profile.remove({ "id" => "profile_id" })
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
| `country_code` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | Yes |  |
| `lon` | ``$NUMBER`` | Yes |  |
| `station_id` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.PublicInbox.list(nil)
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
| `country_code` | ``$STRING`` | No |  |
| `photographer` | ``$INTEGER`` | Yes |  |
| `total` | ``$INTEGER`` | Yes |  |
| `with_photo` | ``$INTEGER`` | Yes |  |
| `without_photo` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Stat.load({ "id" => "stat_id" })
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

