# RailwayStationPhotos Python SDK



The Python SDK for the RailwayStationPhotos API — an entity-oriented client following Pythonic conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/railway-station-photos-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from railwaystationphotos_sdk import RailwayStationPhotosSDK

client = RailwayStationPhotosSDK()
```

### 4. Create, update, and remove

```python
# Create
created = client.admininbox.create({"name": "Example"})

```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    print(result["err"])     # error value
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = RailwayStationPhotosSDK.test()

result = client.admininbox.load({"id": "test01"})
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = RailwayStationPhotosSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### RailwayStationPhotosSDK

```python
from railwaystationphotos_sdk import RailwayStationPhotosSDK

client = RailwayStationPhotosSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = RailwayStationPhotosSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### RailwayStationPhotosSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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
error is returned to the caller as the second element in the return tuple.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── railwaystationphotos_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`railwaystationphotos_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
admininbox = client.admininbox
admininbox.load({"id": "example_id"})

# admininbox.data_get() now returns the loaded admininbox data
# admininbox.match_get() returns the last match criteria
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
