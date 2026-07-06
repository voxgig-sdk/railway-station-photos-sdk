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
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *RailwayStationPhotosSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *RailwayStationPhotosSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
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
| `active` | `bool` | No |  |
| `command` | `string` | Yes |  |
| `conflict_resolution` | `string` | No |  |
| `country_code` | `string` | No |  |
| `ds100` | `string` | No |  |
| `id` | `int` | Yes |  |
| `lat` | `float64` | No |  |
| `lon` | `float64` | No |  |
| `message` | `string` | Yes |  |
| `reject_reason` | `string` | No |  |
| `station_id` | `string` | No |  |
| `status` | `int` | Yes |  |
| `title` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.AdminInbox(nil).Create(map[string]any{
    "command": /* string */,
    "message": /* string */,
    "status": /* int */,
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
| `active` | `bool` | Yes |  |
| `allow_photo_upload` | `bool` | Yes |  |
| `code` | `string` | Yes |  |
| `email` | `string` | No |  |
| `message` | `string` | No |  |
| `name` | `string` | Yes |  |
| `override_license` | `string` | No |  |
| `provider_app` | `[]any` | No |  |
| `timetable_url_template` | `string` | No |  |

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
| `comment` | `string` | No |  |
| `country_code` | `string` | No |  |
| `crc32` | `int` | No |  |
| `created_at` | `int` | No |  |
| `filename` | `string` | No |  |
| `id` | `int` | Yes |  |
| `inbox_url` | `string` | No |  |
| `lat` | `float64` | No |  |
| `lon` | `float64` | No |  |
| `new_lat` | `float64` | No |  |
| `new_lon` | `float64` | No |  |
| `new_title` | `string` | No |  |
| `problem_report_type` | `string` | No |  |
| `rejected_reason` | `string` | No |  |
| `state` | `string` | Yes |  |
| `station_id` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Inbox(nil).Create(map[string]any{
    "state": /* string */,
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
result, err := client.Inbox(nil).Remove(nil, nil)
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
| `pending_inbox_entry` | `int` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.InboxCount(nil).Load(nil, nil)
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
| `active` | `bool` | No |  |
| `comment` | `string` | Yes |  |
| `country_code` | `string` | No |  |
| `created_at` | `int` | Yes |  |
| `done` | `bool` | Yes |  |
| `filename` | `string` | No |  |
| `has_conflict` | `bool` | No |  |
| `has_photo` | `bool` | Yes |  |
| `id` | `int` | Yes |  |
| `inbox_url` | `string` | No |  |
| `is_processed` | `bool` | No |  |
| `lat` | `float64` | No |  |
| `lon` | `float64` | No |  |
| `new_lat` | `float64` | No |  |
| `new_lon` | `float64` | No |  |
| `new_title` | `string` | No |  |
| `photo_id` | `int` | No |  |
| `photographer_email` | `string` | No |  |
| `photographer_nickname` | `string` | Yes |  |
| `problem_report_type` | `string` | No |  |
| `station_id` | `string` | No |  |
| `title` | `string` | No |  |

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
| `access_token` | `string` | Yes |  |
| `expires_in` | `int` | No |  |
| `refresh_token` | `string` | No |  |
| `scope` | `string` | Yes |  |
| `token_type` | `string` | Yes |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.OAuthToken(nil).Create(map[string]any{
    "access_token": /* string */,
    "scope": /* string */,
    "token_type": /* string */,
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
result, err := client.Oauth(nil).Load(nil, nil)
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
result, err := client.Photo(nil).Load(nil, nil)
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
result, err := client.PhotoDownload(nil).Load(nil, nil)
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
| `license` | `[]any` | Yes |  |
| `photo_base_url` | `string` | Yes |  |
| `photographer` | `[]any` | Yes |  |
| `station` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.PhotoStation(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.PhotoStation(nil).Load(nil, nil)
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
result, err := client.Photographer(nil).Load(nil, nil)
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
| `admin` | `bool` | No |  |
| `anonymous` | `bool` | No |  |
| `email` | `string` | No |  |
| `email_verified` | `bool` | No |  |
| `license` | `string` | Yes |  |
| `link` | `string` | No |  |
| `new_password` | `string` | Yes |  |
| `nickname` | `string` | Yes |  |
| `photo_owner` | `bool` | Yes |  |
| `send_notification` | `bool` | No |  |

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

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Profile(nil).Create(map[string]any{
    "license": /* string */,
    "new_password": /* string */,
    "nickname": /* string */,
    "photo_owner": /* bool */,
}, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Profile(nil).Load(nil, nil)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Profile(nil).Remove(nil, nil)
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
| `country_code` | `string` | No |  |
| `lat` | `float64` | Yes |  |
| `lon` | `float64` | Yes |  |
| `station_id` | `string` | No |  |
| `title` | `string` | Yes |  |

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
| `country_code` | `string` | No |  |
| `photographer` | `int` | Yes |  |
| `total` | `int` | Yes |  |
| `with_photo` | `int` | Yes |  |
| `without_photo` | `int` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Stat(nil).Load(nil, nil)
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

