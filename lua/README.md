# RailwayStationPhotos Lua SDK



The Lua SDK for the RailwayStationPhotos API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:AdminInbox()` — each with the same small set of operations (`list`, `load`, `create`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/railway-station-photos-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("railway-station-photos_sdk")

local client = sdk.new()
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:AdminInbox():create({ command = "example", message = "example", status = 1 })
if err then error(err) end

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local admininbox, err = client:AdminInbox():create({ command = "example", message = "example", status = 1 })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:AdminInbox():create({ command = "example", message = "example", status = 1 })
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### RailwayStationPhotosSDK

```lua
local sdk = require("railway-station-photos_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### RailwayStationPhotosSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `AdminInbox` | `(data) -> AdminInboxEntity` | Create an AdminInbox entity instance. |
| `Country` | `(data) -> CountryEntity` | Create a Country entity instance. |
| `Inbox` | `(data) -> InboxEntity` | Create an Inbox entity instance. |
| `InboxCount` | `(data) -> InboxCountEntity` | Create an InboxCount entity instance. |
| `InboxEntry` | `(data) -> InboxEntryEntity` | Create an InboxEntry entity instance. |
| `InboxStateQuery` | `(data) -> InboxStateQueryEntity` | Create an InboxStateQuery entity instance. |
| `OAuthToken` | `(data) -> OAuthTokenEntity` | Create an OAuthToken entity instance. |
| `Oauth` | `(data) -> OauthEntity` | Create an Oauth entity instance. |
| `Photo` | `(data) -> PhotoEntity` | Create a Photo entity instance. |
| `PhotoDownload` | `(data) -> PhotoDownloadEntity` | Create a PhotoDownload entity instance. |
| `PhotoStation` | `(data) -> PhotoStationEntity` | Create a PhotoStation entity instance. |
| `PhotoUpload` | `(data) -> PhotoUploadEntity` | Create a PhotoUpload entity instance. |
| `Photographer` | `(data) -> PhotographerEntity` | Create a Photographer entity instance. |
| `Profile` | `(data) -> ProfileEntity` | Create a Profile entity instance. |
| `PublicInbox` | `(data) -> PublicInboxEntity` | Create a PublicInbox entity instance. |
| `Stat` | `(data) -> StatEntity` | Create a Stat entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local admin_inbox, err = client:AdminInbox():load()
    if err then error(err) end
    -- admin_inbox is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### AdminInbox

| Field | Description |
| --- | --- |
| `active` |  |
| `command` |  |
| `conflict_resolution` |  |
| `country_code` |  |
| `ds100` |  |
| `id` |  |
| `lat` |  |
| `lon` |  |
| `message` |  |
| `reject_reason` |  |
| `station_id` |  |
| `status` |  |
| `title` |  |

Operations: Create.

API path: `/adminInbox`

#### Country

| Field | Description |
| --- | --- |
| `active` |  |
| `allow_photo_upload` |  |
| `code` |  |
| `email` |  |
| `message` |  |
| `name` |  |
| `override_license` |  |
| `provider_app` |  |
| `timetable_url_template` |  |

Operations: List.

API path: `/countries`

#### Inbox

| Field | Description |
| --- | --- |
| `comment` |  |
| `country_code` |  |
| `crc32` |  |
| `created_at` |  |
| `filename` |  |
| `id` |  |
| `inbox_url` |  |
| `lat` |  |
| `lon` |  |
| `new_lat` |  |
| `new_lon` |  |
| `new_title` |  |
| `problem_report_type` |  |
| `rejected_reason` |  |
| `state` |  |
| `station_id` |  |
| `title` |  |

Operations: Create, List, Remove.

API path: `/reportProblem`

#### InboxCount

| Field | Description |
| --- | --- |
| `pending_inbox_entry` |  |

Operations: Load.

API path: `/adminInboxCount`

#### InboxEntry

| Field | Description |
| --- | --- |
| `active` |  |
| `comment` |  |
| `country_code` |  |
| `created_at` |  |
| `done` |  |
| `filename` |  |
| `has_conflict` |  |
| `has_photo` |  |
| `id` |  |
| `inbox_url` |  |
| `is_processed` |  |
| `lat` |  |
| `lon` |  |
| `new_lat` |  |
| `new_lon` |  |
| `new_title` |  |
| `photo_id` |  |
| `photographer_email` |  |
| `photographer_nickname` |  |
| `problem_report_type` |  |
| `station_id` |  |
| `title` |  |

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
| `access_token` |  |
| `expires_in` |  |
| `refresh_token` |  |
| `scope` |  |
| `token_type` |  |

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
| `license` |  |
| `photo_base_url` |  |
| `photographer` |  |
| `station` |  |

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
| `admin` |  |
| `anonymous` |  |
| `email` |  |
| `email_verified` |  |
| `license` |  |
| `link` |  |
| `new_password` |  |
| `nickname` |  |
| `photo_owner` |  |
| `send_notification` |  |

Operations: Create, Load, Remove.

API path: `/changePassword`

#### PublicInbox

| Field | Description |
| --- | --- |
| `country_code` |  |
| `lat` |  |
| `lon` |  |
| `station_id` |  |
| `title` |  |

Operations: List.

API path: `/publicInbox`

#### Stat

| Field | Description |
| --- | --- |
| `country_code` |  |
| `photographer` |  |
| `total` |  |
| `with_photo` |  |
| `without_photo` |  |

Operations: Load.

API path: `/stats`



## Entities


### AdminInbox

Create an instance: `local admin_inbox = client:AdminInbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` |  |
| `command` | `string` |  |
| `conflict_resolution` | `string` |  |
| `country_code` | `string` |  |
| `ds100` | `string` |  |
| `id` | `number` |  |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `message` | `string` |  |
| `reject_reason` | `string` |  |
| `station_id` | `string` |  |
| `status` | `number` |  |
| `title` | `string` |  |

#### Example: Create

```lua
local admin_inbox, err = client:AdminInbox():create({
  command = nil, -- string
  message = nil, -- string
  status = nil, -- number
})
```


### Country

Create an instance: `local country = client:Country(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` |  |
| `allow_photo_upload` | `boolean` |  |
| `code` | `string` |  |
| `email` | `string` |  |
| `message` | `string` |  |
| `name` | `string` |  |
| `override_license` | `string` |  |
| `provider_app` | `table` |  |
| `timetable_url_template` | `string` |  |

#### Example: List

```lua
local countrys, err = client:Country():list()
```


### Inbox

Create an instance: `local inbox = client:Inbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comment` | `string` |  |
| `country_code` | `string` |  |
| `crc32` | `number` |  |
| `created_at` | `number` |  |
| `filename` | `string` |  |
| `id` | `number` |  |
| `inbox_url` | `string` |  |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `new_lat` | `number` |  |
| `new_lon` | `number` |  |
| `new_title` | `string` |  |
| `problem_report_type` | `string` |  |
| `rejected_reason` | `string` |  |
| `state` | `string` |  |
| `station_id` | `string` |  |
| `title` | `string` |  |

#### Example: List

```lua
local inboxs, err = client:Inbox():list()
```

#### Example: Create

```lua
local inbox, err = client:Inbox():create({
  state = nil, -- string
})
```


### InboxCount

Create an instance: `local inbox_count = client:InboxCount(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `pending_inbox_entry` | `number` |  |

#### Example: Load

```lua
local inbox_count, err = client:InboxCount():load()
```


### InboxEntry

Create an instance: `local inbox_entry = client:InboxEntry(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` |  |
| `comment` | `string` |  |
| `country_code` | `string` |  |
| `created_at` | `number` |  |
| `done` | `boolean` |  |
| `filename` | `string` |  |
| `has_conflict` | `boolean` |  |
| `has_photo` | `boolean` |  |
| `id` | `number` |  |
| `inbox_url` | `string` |  |
| `is_processed` | `boolean` |  |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `new_lat` | `number` |  |
| `new_lon` | `number` |  |
| `new_title` | `string` |  |
| `photo_id` | `number` |  |
| `photographer_email` | `string` |  |
| `photographer_nickname` | `string` |  |
| `problem_report_type` | `string` |  |
| `station_id` | `string` |  |
| `title` | `string` |  |

#### Example: List

```lua
local inbox_entrys, err = client:InboxEntry():list()
```


### InboxStateQuery

Create an instance: `local inbox_state_query = client:InboxStateQuery(nil)`


### OAuthToken

Create an instance: `local o_auth_token = client:OAuthToken(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `string` |  |
| `expires_in` | `number` |  |
| `refresh_token` | `string` |  |
| `scope` | `string` |  |
| `token_type` | `string` |  |

#### Example: Create

```lua
local o_auth_token, err = client:OAuthToken():create({
  access_token = nil, -- string
  scope = nil, -- string
  token_type = nil, -- string
})
```


### Oauth

Create an instance: `local oauth = client:Oauth(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local oauth, err = client:Oauth():load()
```

#### Example: Create

```lua
local oauth, err = client:Oauth():create({
})
```


### Photo

Create an instance: `local photo = client:Photo(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local photo, err = client:Photo():load()
```


### PhotoDownload

Create an instance: `local photo_download = client:PhotoDownload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local photo_download, err = client:PhotoDownload():load()
```


### PhotoStation

Create an instance: `local photo_station = client:PhotoStation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `license` | `table` |  |
| `photo_base_url` | `string` |  |
| `photographer` | `table` |  |
| `station` | `table` |  |

#### Example: Load

```lua
local photo_station, err = client:PhotoStation():load()
```

#### Example: List

```lua
local photo_stations, err = client:PhotoStation():list()
```


### PhotoUpload

Create an instance: `local photo_upload = client:PhotoUpload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```lua
local photo_upload, err = client:PhotoUpload():create({
})
```


### Photographer

Create an instance: `local photographer = client:Photographer(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```lua
local photographer, err = client:Photographer():load()
```


### Profile

Create an instance: `local profile = client:Profile(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `boolean` |  |
| `anonymous` | `boolean` |  |
| `email` | `string` |  |
| `email_verified` | `boolean` |  |
| `license` | `string` |  |
| `link` | `string` |  |
| `new_password` | `string` |  |
| `nickname` | `string` |  |
| `photo_owner` | `boolean` |  |
| `send_notification` | `boolean` |  |

#### Example: Load

```lua
local profile, err = client:Profile():load()
```

#### Example: Create

```lua
local profile, err = client:Profile():create({
  license = nil, -- string
  new_password = nil, -- string
  nickname = nil, -- string
  photo_owner = nil, -- boolean
})
```


### PublicInbox

Create an instance: `local public_inbox = client:PublicInbox(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | `string` |  |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `station_id` | `string` |  |
| `title` | `string` |  |

#### Example: List

```lua
local public_inboxs, err = client:PublicInbox():list()
```


### Stat

Create an instance: `local stat = client:Stat(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | `string` |  |
| `photographer` | `number` |  |
| `total` | `number` |  |
| `with_photo` | `number` |  |
| `without_photo` | `number` |  |

#### Example: Load

```lua
local stat, err = client:Stat():load()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── railway-station-photos_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`railway-station-photos_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `create`, the entity
stores the returned data and match criteria internally.

```lua
local admininbox = client:AdminInbox()
admininbox:create({ command = "example", message = "example", status = 1 })

-- admininbox:data_get() now returns the admininbox data from the last create
-- admininbox:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
