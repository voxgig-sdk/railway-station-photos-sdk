# RailwayStationPhotos Golang SDK



The Golang SDK for the RailwayStationPhotos API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.AdminInbox(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/railway-station-photos-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/railway-station-photos-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/railway-station-photos-sdk/go=../railway-station-photos-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/railway-station-photos-sdk/go"
)

func main() {
    client := sdk.New()

    // Create a adminInbox.
    created, err := client.AdminInbox(nil).Create(map[string]any{"command": "example_command", "id": 1, "message": "example_message", "status": 1}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
countrys, err := client.Country(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = countrys
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
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
client := sdk.Test()

country, err := client.Country(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(country) // the returned mock data
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
RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE
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
| `AdminInbox` | `(data map[string]any) RailwayStationPhotosEntity` | Create an AdminInbox entity instance. |
| `Country` | `(data map[string]any) RailwayStationPhotosEntity` | Create a Country entity instance. |
| `Inbox` | `(data map[string]any) RailwayStationPhotosEntity` | Create an Inbox entity instance. |
| `InboxCount` | `(data map[string]any) RailwayStationPhotosEntity` | Create an InboxCount entity instance. |
| `InboxEntry` | `(data map[string]any) RailwayStationPhotosEntity` | Create an InboxEntry entity instance. |
| `InboxStateQuery` | `(data map[string]any) RailwayStationPhotosEntity` | Create an InboxStateQuery entity instance. |
| `OAuthToken` | `(data map[string]any) RailwayStationPhotosEntity` | Create an OAuthToken entity instance. |
| `Oauth` | `(data map[string]any) RailwayStationPhotosEntity` | Create an Oauth entity instance. |
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
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    adminInbox, err := client.AdminInbox(nil).Create(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // adminInbox is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

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
| `"override_license"` |  |
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
| `"license"` |  |
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

Create an instance: `adminInbox := client.AdminInbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `command` | `string` |  |
| `conflict_resolution` | `string` |  |
| `country_code` | `string` |  |
| `ds100` | `string` |  |
| `id` | `int` |  |
| `lat` | `float64` |  |
| `lon` | `float64` |  |
| `message` | `string` |  |
| `reject_reason` | `string` |  |
| `station_id` | `string` |  |
| `status` | `int` |  |
| `title` | `string` |  |

#### Example: Create

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


### Country

Create an instance: `country := client.Country(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `allow_photo_upload` | `bool` |  |
| `code` | `string` |  |
| `email` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `override_license` | `string` |  |
| `provider_app` | `[]any` |  |
| `timetable_url_template` | `string` |  |

#### Example: List

```go
countrys, err := client.Country(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(countrys) // the array of records
```


### Inbox

Create an instance: `inbox := client.Inbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comment` | `string` |  |
| `country_code` | `string` |  |
| `crc32` | `int` |  |
| `created_at` | `int` |  |
| `filename` | `string` |  |
| `id` | `int` |  |
| `inbox_url` | `string` |  |
| `lat` | `float64` |  |
| `lon` | `float64` |  |
| `new_lat` | `float64` |  |
| `new_lon` | `float64` |  |
| `new_title` | `string` |  |
| `problem_report_type` | `string` |  |
| `rejected_reason` | `string` |  |
| `state` | `string` |  |
| `station_id` | `string` |  |
| `title` | `string` |  |

#### Example: List

```go
inboxs, err := client.Inbox(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(inboxs) // the array of records
```

#### Example: Create

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


### InboxCount

Create an instance: `inboxCount := client.InboxCount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `pending_inbox_entry` | `int` |  |

#### Example: Load

```go
inboxCount, err := client.InboxCount(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(inboxCount) // the loaded record
```


### InboxEntry

Create an instance: `inboxEntry := client.InboxEntry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` |  |
| `comment` | `string` |  |
| `country_code` | `string` |  |
| `created_at` | `int` |  |
| `done` | `bool` |  |
| `filename` | `string` |  |
| `has_conflict` | `bool` |  |
| `has_photo` | `bool` |  |
| `id` | `int` |  |
| `inbox_url` | `string` |  |
| `is_processed` | `bool` |  |
| `lat` | `float64` |  |
| `lon` | `float64` |  |
| `new_lat` | `float64` |  |
| `new_lon` | `float64` |  |
| `new_title` | `string` |  |
| `photo_id` | `int` |  |
| `photographer_email` | `string` |  |
| `photographer_nickname` | `string` |  |
| `problem_report_type` | `string` |  |
| `station_id` | `string` |  |
| `title` | `string` |  |

#### Example: List

```go
inboxEntrys, err := client.InboxEntry(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(inboxEntrys) // the array of records
```


### InboxStateQuery

Create an instance: `inboxStateQuery := client.InboxStateQuery(nil)`


### OAuthToken

Create an instance: `oAuthToken := client.OAuthToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` |  |
| `expires_in` | `int` |  |
| `refresh_token` | `string` |  |
| `scope` | `string` |  |
| `token_type` | `string` |  |

#### Example: Create

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


### Oauth

Create an instance: `oauth := client.Oauth(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Load

```go
oauth, err := client.Oauth(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(oauth) // the loaded record
```

#### Example: Create

```go
result, err := client.Oauth(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Photo

Create an instance: `photo := client.Photo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
photo, err := client.Photo(nil).Load(map[string]any{"country": "country", "filename": "filename"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(photo) // the loaded record
```


### PhotoDownload

Create an instance: `photoDownload := client.PhotoDownload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
photoDownload, err := client.PhotoDownload(nil).Load(map[string]any{"filename": "filename"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(photoDownload) // the loaded record
```


### PhotoStation

Create an instance: `photoStation := client.PhotoStation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `license` | `[]any` |  |
| `photo_base_url` | `string` |  |
| `photographer` | `[]any` |  |
| `station` | `[]any` |  |

#### Example: Load

```go
photoStation, err := client.PhotoStation(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(photoStation) // the loaded record
```

#### Example: List

```go
photoStations, err := client.PhotoStation(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(photoStations) // the array of records
```


### PhotoUpload

Create an instance: `photoUpload := client.PhotoUpload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Example: Create

```go
result, err := client.PhotoUpload(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Photographer

Create an instance: `photographer := client.Photographer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
photographer, err := client.Photographer(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(photographer) // the loaded record
```


### Profile

Create an instance: `profile := client.Profile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `bool` |  |
| `anonymous` | `bool` |  |
| `email` | `string` |  |
| `email_verified` | `bool` |  |
| `license` | `string` |  |
| `link` | `string` |  |
| `new_password` | `string` |  |
| `nickname` | `string` |  |
| `photo_owner` | `bool` |  |
| `send_notification` | `bool` |  |

#### Example: Load

```go
profile, err := client.Profile(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(profile) // the loaded record
```

#### Example: Create

```go
result, err := client.Profile(nil).Create(map[string]any{
    "license": "example_license",
    "new_password": "example_new_password",
    "nickname": "example_nickname",
    "photo_owner": true,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### PublicInbox

Create an instance: `publicInbox := client.PublicInbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | `string` |  |
| `lat` | `float64` |  |
| `lon` | `float64` |  |
| `station_id` | `string` |  |
| `title` | `string` |  |

#### Example: List

```go
publicInboxs, err := client.PublicInbox(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(publicInboxs) // the array of records
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
| `country_code` | `string` |  |
| `photographer` | `int` |  |
| `total` | `int` |  |
| `with_photo` | `int` |  |
| `without_photo` | `int` |  |

#### Example: Load

```go
stat, err := client.Stat(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(stat) // the loaded record
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

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

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

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
github.com/voxgig-sdk/railway-station-photos-sdk/go/
├── railway-station-photos.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/railway-station-photos-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
country := client.Country(nil)
country.List(nil, nil)

// country.Data() now returns the country data from the last list
// country.Match() returns the last match criteria
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
