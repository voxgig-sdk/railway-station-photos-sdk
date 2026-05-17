# RailwayStationPhotos Golang SDK Reference

Complete API reference for the RailwayStationPhotos Golang SDK.


## RailwayStationPhotosSDK

### Constructor

```go
func NewRailwayStationPhotosSDK(options map[string]any) *RailwayStationPhotosSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TestSDK(testopts, sdkopts map[string]any) *RailwayStationPhotosSDK`

Create a test client with mock features active. Both arguments may be `nil`.

```go
client := sdk.TestSDK(nil, nil)
```


### Instance Methods

#### `AdminInbox(data map[string]any) RailwayStationPhotosEntity`

Create a new `AdminInbox` entity instance. Pass `nil` for no initial data.

#### `Country(data map[string]any) RailwayStationPhotosEntity`

Create a new `Country` entity instance. Pass `nil` for no initial data.

#### `Inbox(data map[string]any) RailwayStationPhotosEntity`

Create a new `Inbox` entity instance. Pass `nil` for no initial data.

#### `InboxCount(data map[string]any) RailwayStationPhotosEntity`

Create a new `InboxCount` entity instance. Pass `nil` for no initial data.

#### `InboxEntry(data map[string]any) RailwayStationPhotosEntity`

Create a new `InboxEntry` entity instance. Pass `nil` for no initial data.

#### `InboxStateQuery(data map[string]any) RailwayStationPhotosEntity`

Create a new `InboxStateQuery` entity instance. Pass `nil` for no initial data.

#### `OAuthToken(data map[string]any) RailwayStationPhotosEntity`

Create a new `OAuthToken` entity instance. Pass `nil` for no initial data.

#### `Oauth(data map[string]any) RailwayStationPhotosEntity`

Create a new `Oauth` entity instance. Pass `nil` for no initial data.

#### `Photo(data map[string]any) RailwayStationPhotosEntity`

Create a new `Photo` entity instance. Pass `nil` for no initial data.

#### `PhotoDownload(data map[string]any) RailwayStationPhotosEntity`

Create a new `PhotoDownload` entity instance. Pass `nil` for no initial data.

#### `PhotoStation(data map[string]any) RailwayStationPhotosEntity`

Create a new `PhotoStation` entity instance. Pass `nil` for no initial data.

#### `PhotoUpload(data map[string]any) RailwayStationPhotosEntity`

Create a new `PhotoUpload` entity instance. Pass `nil` for no initial data.

#### `Photographer(data map[string]any) RailwayStationPhotosEntity`

Create a new `Photographer` entity instance. Pass `nil` for no initial data.

#### `Profile(data map[string]any) RailwayStationPhotosEntity`

Create a new `Profile` entity instance. Pass `nil` for no initial data.

#### `PublicInbox(data map[string]any) RailwayStationPhotosEntity`

Create a new `PublicInbox` entity instance. Pass `nil` for no initial data.

#### `Stat(data map[string]any) RailwayStationPhotosEntity`

Create a new `Stat` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AdminInboxEntity

```go
admin_inbox := client.AdminInbox(nil)
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.AdminInbox(nil).Create(map[string]any{
    "command": /* `$STRING` */,
    "message": /* `$STRING` */,
    "status": /* `$INTEGER` */,
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AdminInboxEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CountryEntity

```go
country := client.Country(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Country(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CountryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InboxEntity

```go
inbox := client.Inbox(nil)
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Inbox(nil).Create(map[string]any{
    "state": /* `$STRING` */,
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Inbox(nil).List(nil, nil)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Inbox(nil).Remove(map[string]any{"id": "inbox_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InboxEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InboxCountEntity

```go
inbox_count := client.InboxCount(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `pending_inbox_entry` | ``$INTEGER`` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.InboxCount(nil).Load(map[string]any{"id": "inbox_count_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InboxCountEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InboxEntryEntity

```go
inbox_entry := client.InboxEntry(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.InboxEntry(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InboxEntryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InboxStateQueryEntity

```go
inbox_state_query := client.InboxStateQuery(nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InboxStateQueryEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OAuthTokenEntity

```go
o_auth_token := client.OAuthToken(nil)
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.OAuthToken(nil).Create(map[string]any{
    "access_token": /* `$STRING` */,
    "scope": /* `$STRING` */,
    "token_type": /* `$STRING` */,
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OAuthTokenEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OauthEntity

```go
oauth := client.Oauth(nil)
```

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Oauth(nil).Create(map[string]any{
}, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Oauth(nil).Load(map[string]any{"id": "oauth_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OauthEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PhotoEntity

```go
photo := client.Photo(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Photo(nil).Load(map[string]any{"id": "photo_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PhotoEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PhotoDownloadEntity

```go
photo_download := client.PhotoDownload(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.PhotoDownload(nil).Load(map[string]any{"id": "photo_download_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PhotoDownloadEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PhotoStationEntity

```go
photo_station := client.PhotoStation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `license` | ``$ARRAY`` | Yes |  |
| `photo_base_url` | ``$STRING`` | Yes |  |
| `photographer` | ``$ARRAY`` | Yes |  |
| `station` | ``$ARRAY`` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.PhotoStation(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.PhotoStation(nil).Load(map[string]any{"id": "photo_station_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PhotoStationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PhotoUploadEntity

```go
photo_upload := client.PhotoUpload(nil)
```

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.PhotoUpload(nil).Create(map[string]any{
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PhotoUploadEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PhotographerEntity

```go
photographer := client.Photographer(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Photographer(nil).Load(map[string]any{"id": "photographer_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PhotographerEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ProfileEntity

```go
profile := client.Profile(nil)
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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Profile(nil).Create(map[string]any{
    "license": /* `$STRING` */,
    "new_password": /* `$STRING` */,
    "nickname": /* `$STRING` */,
    "photo_owner": /* `$BOOLEAN` */,
}, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Profile(nil).Load(map[string]any{"id": "profile_id"}, nil)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Profile(nil).Remove(map[string]any{"id": "profile_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProfileEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PublicInboxEntity

```go
public_inbox := client.PublicInbox(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.PublicInbox(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PublicInboxEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StatEntity

```go
stat := client.Stat(nil)
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Stat(nil).Load(map[string]any{"id": "stat_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StatEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewRailwayStationPhotosSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

