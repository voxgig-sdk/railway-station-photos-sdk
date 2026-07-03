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
| `options.apikey` | `string` | API key for authentication. |
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

#### `Inbox(data)`

Create a new `Inbox` entity instance. Pass `nil` for no initial data.

#### `InboxCount(data)`

Create a new `InboxCount` entity instance. Pass `nil` for no initial data.

#### `InboxEntry(data)`

Create a new `InboxEntry` entity instance. Pass `nil` for no initial data.

#### `InboxStateQuery(data)`

Create a new `InboxStateQuery` entity instance. Pass `nil` for no initial data.

#### `OAuthToken(data)`

Create a new `OAuthToken` entity instance. Pass `nil` for no initial data.

#### `Oauth(data)`

Create a new `Oauth` entity instance. Pass `nil` for no initial data.

#### `Photo(data)`

Create a new `Photo` entity instance. Pass `nil` for no initial data.

#### `PhotoDownload(data)`

Create a new `PhotoDownload` entity instance. Pass `nil` for no initial data.

#### `PhotoStation(data)`

Create a new `PhotoStation` entity instance. Pass `nil` for no initial data.

#### `PhotoUpload(data)`

Create a new `PhotoUpload` entity instance. Pass `nil` for no initial data.

#### `Photographer(data)`

Create a new `Photographer` entity instance. Pass `nil` for no initial data.

#### `Profile(data)`

Create a new `Profile` entity instance. Pass `nil` for no initial data.

#### `PublicInbox(data)`

Create a new `PublicInbox` entity instance. Pass `nil` for no initial data.

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:AdminInbox():create({
  command = --[[ `$STRING` ]],
  message = --[[ `$STRING` ]],
  status = --[[ `$INTEGER` ]],
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

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

## InboxEntity

```lua
local inbox = client:Inbox(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Inbox():create({
  state = --[[ `$STRING` ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Inbox():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Inbox():remove({ id = "inbox_id" })
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
| `pending_inbox_entry` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:InboxCount():load({ id = "inbox_count_id" })
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

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

## InboxStateQueryEntity

```lua
local inbox_state_query = client:InboxStateQuery(nil)
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

Create a new `InboxStateQueryEntity` instance with the same client and
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
| `access_token` | ``$STRING`` | Yes |  |
| `expires_in` | ``$INTEGER`` | No |  |
| `refresh_token` | ``$STRING`` | No |  |
| `scope` | ``$STRING`` | Yes |  |
| `token_type` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:OAuthToken():create({
  access_token = --[[ `$STRING` ]],
  scope = --[[ `$STRING` ]],
  token_type = --[[ `$STRING` ]],
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

Create a new `OAuthTokenEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OauthEntity

```lua
local oauth = client:Oauth(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Oauth():create({
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Oauth():load({ id = "oauth_id" })
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

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Photo():load({ id = "photo_id" })
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

## PhotoDownloadEntity

```lua
local photo_download = client:PhotoDownload(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PhotoDownload():load({ id = "photo_download_id" })
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

Create a new `PhotoDownloadEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PhotoStationEntity

```lua
local photo_station = client:PhotoStation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `license` | ``$ARRAY`` | Yes |  |
| `photo_base_url` | ``$STRING`` | Yes |  |
| `photographer` | ``$ARRAY`` | Yes |  |
| `station` | ``$ARRAY`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:PhotoStation():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PhotoStation():load({ id = "photo_station_id" })
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

Create a new `PhotoStationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PhotoUploadEntity

```lua
local photo_upload = client:PhotoUpload(nil)
```

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:PhotoUpload():create({
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

Load a single entity matching the given criteria.

```lua
local result, err = client:Photographer():load({ id = "photographer_id" })
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

## ProfileEntity

```lua
local profile = client:Profile(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Profile():create({
  license = --[[ `$STRING` ]],
  new_password = --[[ `$STRING` ]],
  nickname = --[[ `$STRING` ]],
  photo_owner = --[[ `$BOOLEAN` ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Profile():load({ id = "profile_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Profile():remove({ id = "profile_id" })
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
| `country_code` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | Yes |  |
| `lon` | ``$NUMBER`` | Yes |  |
| `station_id` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

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

## StatEntity

```lua
local stat = client:Stat(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Stat():load({ id = "stat_id" })
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
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

