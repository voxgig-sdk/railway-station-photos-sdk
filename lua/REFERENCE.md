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
| `active` | `boolean` | No |  |
| `command` | `string` | Yes |  |
| `conflict_resolution` | `string` | No |  |
| `country_code` | `string` | No |  |
| `ds100` | `string` | No |  |
| `id` | `number` | Yes |  |
| `lat` | `number` | No |  |
| `lon` | `number` | No |  |
| `message` | `string` | Yes |  |
| `reject_reason` | `string` | No |  |
| `station_id` | `string` | No |  |
| `status` | `number` | Yes |  |
| `title` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:AdminInbox():create({
  command = --[[ string ]],
  id = --[[ number ]],
  message = --[[ string ]],
  status = --[[ number ]],
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
| `active` | `boolean` | Yes |  |
| `allow_photo_upload` | `boolean` | Yes |  |
| `code` | `string` | Yes |  |
| `email` | `string` | No |  |
| `message` | `string` | No |  |
| `name` | `string` | Yes |  |
| `override_license` | `string` | No |  |
| `provider_app` | `table` | No |  |
| `timetable_url_template` | `string` | No |  |

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
| `comment` | `string` | No |  |
| `country_code` | `string` | No |  |
| `crc32` | `number` | No |  |
| `created_at` | `number` | No |  |
| `filename` | `string` | No |  |
| `id` | `number` | Yes |  |
| `inbox_url` | `string` | No |  |
| `lat` | `number` | No |  |
| `lon` | `number` | No |  |
| `new_lat` | `number` | No |  |
| `new_lon` | `number` | No |  |
| `new_title` | `string` | No |  |
| `problem_report_type` | `string` | No |  |
| `rejected_reason` | `string` | No |  |
| `state` | `string` | Yes |  |
| `station_id` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Inbox():create({
  id = --[[ number ]],
  state = --[[ string ]],
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
| `pending_inbox_entry` | `number` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

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
| `active` | `boolean` | No |  |
| `comment` | `string` | Yes |  |
| `country_code` | `string` | No |  |
| `created_at` | `number` | Yes |  |
| `done` | `boolean` | Yes |  |
| `filename` | `string` | No |  |
| `has_conflict` | `boolean` | No |  |
| `has_photo` | `boolean` | Yes |  |
| `id` | `number` | Yes |  |
| `inbox_url` | `string` | No |  |
| `is_processed` | `boolean` | No |  |
| `lat` | `number` | No |  |
| `lon` | `number` | No |  |
| `new_lat` | `number` | No |  |
| `new_lon` | `number` | No |  |
| `new_title` | `string` | No |  |
| `photo_id` | `number` | No |  |
| `photographer_email` | `string` | No |  |
| `photographer_nickname` | `string` | Yes |  |
| `problem_report_type` | `string` | No |  |
| `station_id` | `string` | No |  |
| `title` | `string` | No |  |

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
| `access_token` | `string` | Yes |  |
| `expires_in` | `number` | No |  |
| `refresh_token` | `string` | No |  |
| `scope` | `string` | Yes |  |
| `token_type` | `string` | Yes |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:OAuthToken():create({
  access_token = --[[ string ]],
  scope = --[[ string ]],
  token_type = --[[ string ]],
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
local result, err = client:Oauth():load()
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

## PhotoDownloadEntity

```lua
local photo_download = client:PhotoDownload(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PhotoDownload():load({ filename = "filename" })
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
| `license` | `table` | Yes |  |
| `photo_base_url` | `string` | Yes |  |
| `photographer` | `table` | Yes |  |
| `station` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:PhotoStation():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PhotoStation():load()
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
| `email_verified` | `boolean` | No |  |
| `license` | `string` | Yes |  |
| `link` | `string` | No |  |
| `new_password` | `string` | Yes |  |
| `nickname` | `string` | Yes |  |
| `photo_owner` | `boolean` | Yes |  |
| `send_notification` | `boolean` | No |  |

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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Profile():create({
  license = --[[ string ]],
  new_password = --[[ string ]],
  nickname = --[[ string ]],
  photo_owner = --[[ boolean ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Profile():load()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

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
| `country_code` | `string` | No |  |
| `lat` | `number` | Yes |  |
| `lon` | `number` | Yes |  |
| `station_id` | `string` | No |  |
| `title` | `string` | Yes |  |

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
| `country_code` | `string` | No |  |
| `photographer` | `number` | Yes |  |
| `total` | `number` | Yes |  |
| `with_photo` | `number` | Yes |  |
| `without_photo` | `number` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

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
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

