# RailwayStationPhotos Ruby SDK



The Ruby SDK for the RailwayStationPhotos API — an entity-oriented client using idiomatic Ruby conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/railway-station-photos-sdk/releases](https://github.com/voxgig-sdk/railway-station-photos-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "RailwayStationPhotos_sdk"

client = RailwayStationPhotosSDK.new
```

### 4. Create, update, and remove

```ruby
# Create
created = client.admininbox.create({ "name" => "Example" })

```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  warn result["err"]
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = RailwayStationPhotosSDK.test

result = client.admininbox.load({ "id" => "test01" })
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = RailwayStationPhotosSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### RailwayStationPhotosSDK

```ruby
require_relative "RailwayStationPhotos_sdk"
client = RailwayStationPhotosSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = RailwayStationPhotosSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### RailwayStationPhotosSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `AdminInbox` | `(data) -> AdminInboxEntity` | Create a AdminInbox entity instance. |
| `Country` | `(data) -> CountryEntity` | Create a Country entity instance. |
| `Inbox` | `(data) -> InboxEntity` | Create a Inbox entity instance. |
| `InboxCount` | `(data) -> InboxCountEntity` | Create a InboxCount entity instance. |
| `InboxEntry` | `(data) -> InboxEntryEntity` | Create a InboxEntry entity instance. |
| `InboxStateQuery` | `(data) -> InboxStateQueryEntity` | Create a InboxStateQuery entity instance. |
| `OAuthToken` | `(data) -> OAuthTokenEntity` | Create a OAuthToken entity instance. |
| `Oauth` | `(data) -> OauthEntity` | Create a Oauth entity instance. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> Array` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `RailwayStationPhotosError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `const admin_inbox = client.admin_inbox`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

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

```ts
const admin_inbox = await client.admin_inbox.create({
  command: /* `$STRING` */,
  message: /* `$STRING` */,
  status: /* `$INTEGER` */,
})
```


### Country

Create an instance: `const country = client.country`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | ``$BOOLEAN`` |  |
| `allow_photo_upload` | ``$BOOLEAN`` |  |
| `code` | ``$STRING`` |  |
| `email` | ``$STRING`` |  |
| `message` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `override_license` | ``$STRING`` |  |
| `provider_app` | ``$ARRAY`` |  |
| `timetable_url_template` | ``$STRING`` |  |

#### Example: List

```ts
const countrys = await client.country.list()
```


### Inbox

Create an instance: `const inbox = client.inbox`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

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

```ts
const inboxs = await client.inbox.list()
```

#### Example: Create

```ts
const inbox = await client.inbox.create({
  state: /* `$STRING` */,
})
```


### InboxCount

Create an instance: `const inbox_count = client.inbox_count`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `pending_inbox_entry` | ``$INTEGER`` |  |

#### Example: Load

```ts
const inbox_count = await client.inbox_count.load({ id: 'inbox_count_id' })
```


### InboxEntry

Create an instance: `const inbox_entry = client.inbox_entry`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

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

```ts
const inbox_entrys = await client.inbox_entry.list()
```


### InboxStateQuery

Create an instance: `const inbox_state_query = client.inbox_state_query`


### OAuthToken

Create an instance: `const o_auth_token = client.o_auth_token`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | ``$STRING`` |  |
| `expires_in` | ``$INTEGER`` |  |
| `refresh_token` | ``$STRING`` |  |
| `scope` | ``$STRING`` |  |
| `token_type` | ``$STRING`` |  |

#### Example: Create

```ts
const o_auth_token = await client.o_auth_token.create({
  access_token: /* `$STRING` */,
  scope: /* `$STRING` */,
  token_type: /* `$STRING` */,
})
```


### Oauth

Create an instance: `const oauth = client.oauth`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const oauth = await client.oauth.load({ id: 'oauth_id' })
```

#### Example: Create

```ts
const oauth = await client.oauth.create({
})
```


### Photo

Create an instance: `const photo = client.photo`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const photo = await client.photo.load({ id: 'photo_id' })
```


### PhotoDownload

Create an instance: `const photo_download = client.photo_download`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const photo_download = await client.photo_download.load({ id: 'photo_download_id' })
```


### PhotoStation

Create an instance: `const photo_station = client.photo_station`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `license` | ``$ARRAY`` |  |
| `photo_base_url` | ``$STRING`` |  |
| `photographer` | ``$ARRAY`` |  |
| `station` | ``$ARRAY`` |  |

#### Example: Load

```ts
const photo_station = await client.photo_station.load({ id: 'photo_station_id' })
```

#### Example: List

```ts
const photo_stations = await client.photo_station.list()
```


### PhotoUpload

Create an instance: `const photo_upload = client.photo_upload`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const photo_upload = await client.photo_upload.create({
})
```


### Photographer

Create an instance: `const photographer = client.photographer`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const photographer = await client.photographer.load({ id: 'photographer_id' })
```


### Profile

Create an instance: `const profile = client.profile`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | ``$BOOLEAN`` |  |
| `anonymous` | ``$BOOLEAN`` |  |
| `email` | ``$STRING`` |  |
| `email_verified` | ``$BOOLEAN`` |  |
| `license` | ``$STRING`` |  |
| `link` | ``$STRING`` |  |
| `new_password` | ``$STRING`` |  |
| `nickname` | ``$STRING`` |  |
| `photo_owner` | ``$BOOLEAN`` |  |
| `send_notification` | ``$BOOLEAN`` |  |

#### Example: Load

```ts
const profile = await client.profile.load({ id: 'profile_id' })
```

#### Example: Create

```ts
const profile = await client.profile.create({
  license: /* `$STRING` */,
  new_password: /* `$STRING` */,
  nickname: /* `$STRING` */,
  photo_owner: /* `$BOOLEAN` */,
})
```


### PublicInbox

Create an instance: `const public_inbox = client.public_inbox`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | ``$STRING`` |  |
| `lat` | ``$NUMBER`` |  |
| `lon` | ``$NUMBER`` |  |
| `station_id` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

#### Example: List

```ts
const public_inboxs = await client.public_inbox.list()
```


### Stat

Create an instance: `const stat = client.stat`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | ``$STRING`` |  |
| `photographer` | ``$INTEGER`` |  |
| `total` | ``$INTEGER`` |  |
| `with_photo` | ``$INTEGER`` |  |
| `without_photo` | ``$INTEGER`` |  |

#### Example: Load

```ts
const stat = await client.stat.load({ id: 'stat_id' })
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
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── RailwayStationPhotos_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`RailwayStationPhotos_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
admininbox = client.admininbox
admininbox.load({ "id" => "example_id" })

# admininbox.data_get now returns the loaded admininbox data
# admininbox.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
