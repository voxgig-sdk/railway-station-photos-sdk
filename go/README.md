# RailwayStationPhotos Golang SDK

The Golang SDK for the RailwayStationPhotos API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/railway-station-photos-sdk
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/railway-station-photos-sdk=../path/to/github.com/voxgig-sdk/railway-station-photos-sdk
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/railway-station-photos-sdk"
    "github.com/voxgig-sdk/railway-station-photos-sdk/core"
)

func main() {
    client := sdk.NewRailwayStationPhotosSDK(map[string]any{
        "apikey": os.Getenv("RAILWAY-STATION-PHOTOS_APIKEY"),
    })
```

### 4. Create, update, and remove

```go
// Create
created, _ := client.AdminInbox(nil).Create(
    map[string]any{"name": "Example"}, nil,
)
cm := core.ToMapAny(created)
newID := core.ToMapAny(cm["data"])["id"]

```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewRailwayStationPhotosSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
RAILWAY-STATION-PHOTOS_TEST_LIVE=TRUE
RAILWAY-STATION-PHOTOS_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewRailwayStationPhotosSDK

```go
func NewRailwayStationPhotosSDK(options map[string]any) *RailwayStationPhotosSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *RailwayStationPhotosSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### RailwayStationPhotosSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `AdminInbox` | `(data map[string]any) RailwayStationPhotosEntity` | Create a AdminInbox entity instance. |
| `Country` | `(data map[string]any) RailwayStationPhotosEntity` | Create a Country entity instance. |
| `Inbox` | `(data map[string]any) RailwayStationPhotosEntity` | Create a Inbox entity instance. |
| `InboxCount` | `(data map[string]any) RailwayStationPhotosEntity` | Create a InboxCount entity instance. |
| `InboxEntry` | `(data map[string]any) RailwayStationPhotosEntity` | Create a InboxEntry entity instance. |
| `InboxStateQuery` | `(data map[string]any) RailwayStationPhotosEntity` | Create a InboxStateQuery entity instance. |
| `OAuthToken` | `(data map[string]any) RailwayStationPhotosEntity` | Create a OAuthToken entity instance. |
| `Oauth` | `(data map[string]any) RailwayStationPhotosEntity` | Create a Oauth entity instance. |
| `Photo` | `(data map[string]any) RailwayStationPhotosEntity` | Create a Photo entity instance. |
| `PhotoDownload` | `(data map[string]any) RailwayStationPhotosEntity` | Create a PhotoDownload entity instance. |
| `PhotoStation` | `(data map[string]any) RailwayStationPhotosEntity` | Create a PhotoStation entity instance. |
| `PhotoUpload` | `(data map[string]any) RailwayStationPhotosEntity` | Create a PhotoUpload entity instance. |
| `Photographer` | `(data map[string]any) RailwayStationPhotosEntity` | Create a Photographer entity instance. |
| `Profile` | `(data map[string]any) RailwayStationPhotosEntity` | Create a Profile entity instance. |
| `PublicInbox` | `(data map[string]any) RailwayStationPhotosEntity` | Create a PublicInbox entity instance. |
| `Stat` | `(data map[string]any) RailwayStationPhotosEntity` | Create a Stat entity instance. |

### Entity interface (RailwayStationPhotosEntity)

All entities implement the `RailwayStationPhotosEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### AdminInbox

| Field | Description |
| --- | --- |
| `"active"` |  |
| `"command"` |  |
| `"conflict_resolution"` |  |
| `"country_code"` |  |
| `"ds100"` |  |
| `"id"` |  |
| `"lat"` |  |
| `"lon"` |  |
| `"message"` |  |
| `"reject_reason"` |  |
| `"station_id"` |  |
| `"status"` |  |
| `"title"` |  |

Operations: Create.

API path: `/adminInbox`

#### Country

| Field | Description |
| --- | --- |
| `"active"` |  |
| `"allow_photo_upload"` |  |
| `"code"` |  |
| `"email"` |  |
| `"message"` |  |
| `"name"` |  |
| `"override_licenses"` |  |
| `"provider_app"` |  |
| `"timetable_url_template"` |  |

Operations: List.

API path: `/countries`

#### Inbox

| Field | Description |
| --- | --- |
| `"comment"` |  |
| `"country_code"` |  |
| `"crc32"` |  |
| `"created_at"` |  |
| `"filename"` |  |
| `"id"` |  |
| `"inbox_url"` |  |
| `"lat"` |  |
| `"lon"` |  |
| `"new_lat"` |  |
| `"new_lon"` |  |
| `"new_title"` |  |
| `"problem_report_type"` |  |
| `"rejected_reason"` |  |
| `"state"` |  |
| `"station_id"` |  |
| `"title"` |  |

Operations: Create, List, Remove.

API path: `/reportProblem`

#### InboxCount

| Field | Description |
| --- | --- |
| `"pending_inbox_entry"` |  |

Operations: Load.

API path: `/adminInboxCount`

#### InboxEntry

| Field | Description |
| --- | --- |
| `"active"` |  |
| `"comment"` |  |
| `"country_code"` |  |
| `"created_at"` |  |
| `"done"` |  |
| `"filename"` |  |
| `"has_conflict"` |  |
| `"has_photo"` |  |
| `"id"` |  |
| `"inbox_url"` |  |
| `"is_processed"` |  |
| `"lat"` |  |
| `"lon"` |  |
| `"new_lat"` |  |
| `"new_lon"` |  |
| `"new_title"` |  |
| `"photo_id"` |  |
| `"photographer_email"` |  |
| `"photographer_nickname"` |  |
| `"problem_report_type"` |  |
| `"station_id"` |  |
| `"title"` |  |

Operations: List.

API path: `/adminInbox`

#### InboxStateQuery

| Field | Description |
| --- | --- |

Operations: .

API path: ``

#### OAuthToken

| Field | Description |
| --- | --- |
| `"access_token"` |  |
| `"expires_in"` |  |
| `"refresh_token"` |  |
| `"scope"` |  |
| `"token_type"` |  |

Operations: Create.

API path: `/oauth2/token`

#### Oauth

| Field | Description |
| --- | --- |

Operations: Create, Load.

API path: `/oauth2/revoke`

#### Photo

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/photos/{country}/{filename}`

#### PhotoDownload

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/inbox/done/{filename}`

#### PhotoStation

| Field | Description |
| --- | --- |
| `"license"` |  |
| `"photo_base_url"` |  |
| `"photographer"` |  |
| `"station"` |  |

Operations: List, Load.

API path: `/photoStationById/{country}/{id}`

#### PhotoUpload

| Field | Description |
| --- | --- |

Operations: Create.

API path: `/photoUpload`

#### Photographer

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/photographers`

#### Profile

| Field | Description |
| --- | --- |
| `"admin"` |  |
| `"anonymous"` |  |
| `"email"` |  |
| `"email_verified"` |  |
| `"licenses"` |  |
| `"link"` |  |
| `"new_password"` |  |
| `"nickname"` |  |
| `"photo_owner"` |  |
| `"send_notification"` |  |

Operations: Create, Load, Remove.

API path: `/changePassword`

#### PublicInbox

| Field | Description |
| --- | --- |
| `"country_code"` |  |
| `"lat"` |  |
| `"lon"` |  |
| `"station_id"` |  |
| `"title"` |  |

Operations: List.

API path: `/publicInbox`

#### Stat

| Field | Description |
| --- | --- |
| `"country_code"` |  |
| `"photographer"` |  |
| `"total"` |  |
| `"with_photo"` |  |
| `"without_photo"` |  |

Operations: Load.

API path: `/stats`



## Entities


### AdminInbox

Create an instance: `admin_inbox := client.AdminInbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | ``$BOOLEAN`` |  |
| `command` | ``$STRING`` |  |
| `conflict_resolution` | ``$STRING`` |  |
| `country_code` | ``$STRING`` |  |
| `ds100` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `lat` | ``$NUMBER`` |  |
| `lon` | ``$NUMBER`` |  |
| `message` | ``$STRING`` |  |
| `reject_reason` | ``$STRING`` |  |
| `station_id` | ``$STRING`` |  |
| `status` | ``$INTEGER`` |  |
| `title` | ``$STRING`` |  |

#### Example: Create

```go
result, err := client.AdminInbox(nil).Create(map[string]any{
    "command": /* `$STRING` */,
    "message": /* `$STRING` */,
    "status": /* `$INTEGER` */,
}, nil)
```


### Country

Create an instance: `country := client.Country(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | ``$BOOLEAN`` |  |
| `allow_photo_upload` | ``$BOOLEAN`` |  |
| `code` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `message` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `override_licenses` | ``$STRING`` |  |
| `provider_app` | ``$ARRAY`` |  |
| `timetable_url_template` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Country(nil).List(nil, nil)
```


### Inbox

Create an instance: `inbox := client.Inbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comment` | ``$STRING`` |  |
| `country_code` | ``$STRING`` |  |
| `crc32` | ``$INTEGER`` |  |
| `created_at` | ``$INTEGER`` |  |
| `filename` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `inbox_url` | ``$STRING`` |  |
| `lat` | ``$NUMBER`` |  |
| `lon` | ``$NUMBER`` |  |
| `new_lat` | ``$NUMBER`` |  |
| `new_lon` | ``$NUMBER`` |  |
| `new_title` | ``$STRING`` |  |
| `problem_report_type` | ``$STRING`` |  |
| `rejected_reason` | ``$STRING`` |  |
| `state` | ``$STRING`` |  |
| `station_id` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Inbox(nil).List(nil, nil)
```

#### Example: Create

```go
result, err := client.Inbox(nil).Create(map[string]any{
    "state": /* `$STRING` */,
}, nil)
```


### InboxCount

Create an instance: `inbox_count := client.InboxCount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `pending_inbox_entry` | ``$INTEGER`` |  |

#### Example: Load

```go
result, err := client.InboxCount(nil).Load(map[string]any{"id": "inbox_count_id"}, nil)
```


### InboxEntry

Create an instance: `inbox_entry := client.InboxEntry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | ``$BOOLEAN`` |  |
| `comment` | ``$STRING`` |  |
| `country_code` | ``$STRING`` |  |
| `created_at` | ``$INTEGER`` |  |
| `done` | ``$BOOLEAN`` |  |
| `filename` | ``$STRING`` |  |
| `has_conflict` | ``$BOOLEAN`` |  |
| `has_photo` | ``$BOOLEAN`` |  |
| `id` | ``$INTEGER`` |  |
| `inbox_url` | ``$STRING`` |  |
| `is_processed` | ``$BOOLEAN`` |  |
| `lat` | ``$NUMBER`` |  |
| `lon` | ``$NUMBER`` |  |
| `new_lat` | ``$NUMBER`` |  |
| `new_lon` | ``$NUMBER`` |  |
| `new_title` | ``$STRING`` |  |
| `photo_id` | ``$INTEGER`` |  |
| `photographer_email` | ``$STRING`` |  |
| `photographer_nickname` | ``$STRING`` |  |
| `problem_report_type` | ``$STRING`` |  |
| `station_id` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.InboxEntry(nil).List(nil, nil)
```


### InboxStateQuery

Create an instance: `inbox_state_query := client.InboxStateQuery(nil)`


### OAuthToken

Create an instance: `o_auth_token := client.OAuthToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | ``$STRING`` |  |
| `expires_in` | ``$INTEGER`` |  |
| `refresh_token` | ``$STRING`` |  |
| `scope` | ``$STRING`` |  |
| `token_type` | ``$STRING`` |  |

#### Example: Create

```go
result, err := client.OAuthToken(nil).Create(map[string]any{
    "access_token": /* `$STRING` */,
    "scope": /* `$STRING` */,
    "token_type": /* `$STRING` */,
}, nil)
```


### Oauth

Create an instance: `oauth := client.Oauth(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.Oauth(nil).Load(map[string]any{"id": "oauth_id"}, nil)
```

#### Example: Create

```go
result, err := client.Oauth(nil).Create(map[string]any{
}, nil)
```


### Photo

Create an instance: `photo := client.Photo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.Photo(nil).Load(map[string]any{"id": "photo_id"}, nil)
```


### PhotoDownload

Create an instance: `photo_download := client.PhotoDownload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.PhotoDownload(nil).Load(map[string]any{"id": "photo_download_id"}, nil)
```


### PhotoStation

Create an instance: `photo_station := client.PhotoStation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `license` | ``$ARRAY`` |  |
| `photo_base_url` | ``$STRING`` |  |
| `photographer` | ``$ARRAY`` |  |
| `station` | ``$ARRAY`` |  |

#### Example: Load

```go
result, err := client.PhotoStation(nil).Load(map[string]any{"id": "photo_station_id"}, nil)
```

#### Example: List

```go
results, err := client.PhotoStation(nil).List(nil, nil)
```


### PhotoUpload

Create an instance: `photo_upload := client.PhotoUpload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.PhotoUpload(nil).Create(map[string]any{
}, nil)
```


### Photographer

Create an instance: `photographer := client.Photographer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
result, err := client.Photographer(nil).Load(map[string]any{"id": "photographer_id"}, nil)
```


### Profile

Create an instance: `profile := client.Profile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | ``$BOOLEAN`` |  |
| `anonymous` | ``$BOOLEAN`` |  |
| `email` | ``$STRING`` |  |
| `email_verified` | ``$BOOLEAN`` |  |
| `licenses` | ``$STRING`` |  |
| `link` | ``$STRING`` |  |
| `new_password` | ``$STRING`` |  |
| `nickname` | ``$STRING`` |  |
| `photo_owner` | ``$BOOLEAN`` |  |
| `send_notification` | ``$BOOLEAN`` |  |

#### Example: Load

```go
result, err := client.Profile(nil).Load(map[string]any{"id": "profile_id"}, nil)
```

#### Example: Create

```go
result, err := client.Profile(nil).Create(map[string]any{
    "licenses": /* `$STRING` */,
    "new_password": /* `$STRING` */,
    "nickname": /* `$STRING` */,
    "photo_owner": /* `$BOOLEAN` */,
}, nil)
```


### PublicInbox

Create an instance: `public_inbox := client.PublicInbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | ``$STRING`` |  |
| `lat` | ``$NUMBER`` |  |
| `lon` | ``$NUMBER`` |  |
| `station_id` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.PublicInbox(nil).List(nil, nil)
```


### Stat

Create an instance: `stat := client.Stat(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | ``$STRING`` |  |
| `photographer` | ``$INTEGER`` |  |
| `total` | ``$INTEGER`` |  |
| `with_photo` | ``$INTEGER`` |  |
| `without_photo` | ``$INTEGER`` |  |

#### Example: Load

```go
result, err := client.Stat(nil).Load(map[string]any{"id": "stat_id"}, nil)
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/railway-station-photos-sdk/
├── railway-station-photos.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/railway-station-photos-sdk`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
