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
adminInbox := client.AdminInbox(nil)
fmt.Println(adminInbox.GetName()) // "admin_inbox"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `DS100` | `string` | No | DS100 attribute of a new station |
| `active` | `bool` | No | active flag of a new station (default true) |
| `command` | `string` | Yes |  |
| `conflictResolution` | `string` | No | how to handle conflicts |
| `countryCode` | `string` | No | a two character country code |
| `id` | `int` | Yes |  |
| `lat` | `float64` | No |  |
| `lon` | `float64` | No |  |
| `message` | `string` | Yes |  |
| `rejectReason` | `string` | No | explanation of a rejection |
| `stationId` | `string` | No | ID of a new station |
| `status` | `int` | Yes |  |
| `title` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.AdminInbox(nil).Create(map[string]any{
    "command": "example_command",
    "id": 1,
    "message": "example_message",
    "status": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(country.GetName()) // "country"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | Yes | Is this an active country where we collect photos? |
| `allowPhotoUploads` | `bool` | Yes | Are photo uploads allowed? |
| `code` | `string` | Yes | a two character country code |
| `email` | `string` | No | Contact email address |
| `message` | `string` | No | Informational message about this country |
| `name` | `string` | Yes | Name of the country |
| `overrideLicense` | `string` | No | if a country needs a special license |
| `providerApps` | `[]any` | No | array with links to provider apps |
| `timetableUrlTemplate` | `string` | No | URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Country(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
fmt.Println(inbox.GetName()) // "inbox"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | `string` | No |  |
| `countryCode` | `string` | No | a two character country code |
| `crc32` | `int` | No | CRC32 checksum of the uploaded photo |
| `createdAt` | `int` | No |  |
| `filename` | `string` | No | filename in inbox |
| `id` | `int` | Yes |  |
| `inboxUrl` | `string` | No | url of the photo in the inbox |
| `lat` | `float64` | No |  |
| `lon` | `float64` | No |  |
| `newLat` | `float64` | No |  |
| `newLon` | `float64` | No |  |
| `newTitle` | `string` | No |  |
| `problemReportType` | `string` | No | types of problem reports |
| `rejectedReason` | `string` | No |  |
| `state` | `string` | Yes |  |
| `stationId` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Inbox(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Inbox(nil).Create(map[string]any{
    "id": 1,
    "state": "example_state",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Inbox(nil).Remove(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
inboxCount := client.InboxCount(nil)
fmt.Println(inboxCount.GetName()) // "inbox_count"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `pendingInboxEntries` | `int` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.InboxCount(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
inboxEntry := client.InboxEntry(nil)
fmt.Println(inboxEntry.GetName()) // "inbox_entry"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | No | active flag provided by the user |
| `comment` | `string` | Yes |  |
| `countryCode` | `string` | No | a two character country code |
| `createdAt` | `int` | Yes |  |
| `done` | `bool` | Yes | true if this photo was already imported or rejected |
| `filename` | `string` | No | name of the file in inbox |
| `hasConflict` | `bool` | No | conflict with another upload or existing photo |
| `hasPhoto` | `bool` | Yes | this station has already a photo (conflict) |
| `id` | `int` | Yes |  |
| `inboxUrl` | `string` | No | url of the photo in the inbox |
| `isProcessed` | `bool` | No | was this image process (e.g. |
| `lat` | `float64` | No |  |
| `lon` | `float64` | No |  |
| `newLat` | `float64` | No |  |
| `newLon` | `float64` | No |  |
| `newTitle` | `string` | No |  |
| `photoId` | `int` | No | ID of the photo |
| `photographerEmail` | `string` | No |  |
| `photographerNickname` | `string` | Yes |  |
| `problemReportType` | `string` | No | types of problem reports |
| `stationId` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.InboxEntry(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
inboxStateQuery := client.InboxStateQuery(nil)
fmt.Println(inboxStateQuery.GetName()) // "inbox_state_query"
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
oAuthToken := client.OAuthToken(nil)
fmt.Println(oAuthToken.GetName()) // "o_auth_token"
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
    "access_token": "example_access_token",
    "scope": "example_scope",
    "token_type": "example_token_type",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(oauth.GetName()) // "oauth"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Oauth(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Oauth(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(photo.GetName()) // "photo"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Photo(nil).Load(map[string]any{"country": "country", "filename": "filename"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
photoDownload := client.PhotoDownload(nil)
fmt.Println(photoDownload.GetName()) // "photo_download"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.PhotoDownload(nil).Load(map[string]any{"filename": "filename"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
photoStation := client.PhotoStation(nil)
fmt.Println(photoStation.GetName()) // "photo_station"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `licenses` | `[]any` | Yes | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Yes | Base URL of all photos |
| `photographers` | `[]any` | Yes | List of all photographers, might be empty if no photos available |
| `stations` | `[]any` | Yes | List of the stations |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.PhotoStation(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.PhotoStation(nil).Load(map[string]any{"country": "country"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
photoUpload := client.PhotoUpload(nil)
fmt.Println(photoUpload.GetName()) // "photo_upload"
```

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.PhotoUpload(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(photographer.GetName()) // "photographer"
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Photographer(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(profile.GetName()) // "profile"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `bool` | No |  |
| `anonymous` | `bool` | No |  |
| `email` | `string` | No |  |
| `emailVerified` | `bool` | No |  |
| `license` | `string` | Yes | the only accepted type is "CC0 1.0 Universell (CC0 1.0)", the others are listed for backward compatibility |
| `link` | `string` | No |  |
| `newPassword` | `string` | Yes |  |
| `nickname` | `string` | Yes |  |
| `photoOwner` | `bool` | Yes |  |
| `sendNotifications` | `bool` | No |  |

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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Profile(nil).Load(map[string]any{"token": "token"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Profile(nil).Create(map[string]any{
    "license": "example_license",
    "newPassword": "example_newPassword",
    "nickname": "example_nickname",
    "photoOwner": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Profile(nil).Remove(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
publicInbox := client.PublicInbox(nil)
fmt.Println(publicInbox.GetName()) // "public_inbox"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryCode` | `string` | No | a two character country code |
| `lat` | `float64` | Yes |  |
| `lon` | `float64` | Yes |  |
| `stationId` | `string` | No |  |
| `title` | `string` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.PublicInbox(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
fmt.Println(stat.GetName()) // "stat"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryCode` | `string` | No | an optional two character country code |
| `photographers` | `int` | Yes |  |
| `total` | `int` | Yes |  |
| `withPhoto` | `int` | Yes |  |
| `withoutPhoto` | `int` | Yes |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Stat(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

