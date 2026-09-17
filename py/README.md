# RailwayStationPhotos Python SDK



The Python SDK for the RailwayStationPhotos API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.AdminInbox()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

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

### 3. Load a photo

Photo is nested under country, so provide the `country`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    photo = client.Photo().load({"country": "example_country", "filename": "example_filename"})
    print(photo)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.AdminInbox().create({"command": "example_command", "id": 1, "message": "example_message", "status": 1})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    publicinboxs = client.PublicInbox().list()
    print(publicinboxs)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
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
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
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

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
publicinbox = client.PublicInbox().list()
# publicinbox contains the mock response record
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
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
| `DS100` | DS100 attribute of a new station |
| `active` | active flag of a new station (default true) |
| `command` |  |
| `conflictResolution` | how to handle conflicts |
| `countryCode` | a two character country code |
| `id` |  |
| `lat` |  |
| `lon` |  |
| `message` |  |
| `rejectReason` | explanation of a rejection |
| `stationId` | ID of a new station |
| `status` |  |
| `title` |  |

Operations: Create.

API path: `/adminInbox`

#### Country

| Field | Description |
| --- | --- |
| `active` | Is this an active country where we collect photos? |
| `allowPhotoUploads` | Are photo uploads allowed? |
| `code` | a two character country code |
| `email` | Contact email address |
| `message` | Informational message about this country |
| `name` | Name of the country |
| `overrideLicense` | if a country needs a special license |
| `providerApps` | array with links to provider apps |
| `timetableUrlTemplate` | URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced |

Operations: List.

API path: `/countries`

#### Inbox

| Field | Description |
| --- | --- |
| `comment` |  |
| `countryCode` | a two character country code |
| `crc32` | CRC32 checksum of the uploaded photo |
| `createdAt` |  |
| `filename` | filename in inbox |
| `id` |  |
| `inboxUrl` | url of the photo in the inbox |
| `lat` |  |
| `lon` |  |
| `newLat` |  |
| `newLon` |  |
| `newTitle` |  |
| `problemReportType` | types of problem reports |
| `rejectedReason` |  |
| `state` |  |
| `stationId` |  |
| `title` |  |

Operations: Create, List, Remove.

API path: `/reportProblem`

#### InboxCount

| Field | Description |
| --- | --- |
| `pendingInboxEntries` |  |

Operations: Load.

API path: `/adminInboxCount`

#### InboxEntry

| Field | Description |
| --- | --- |
| `active` | active flag provided by the user |
| `comment` |  |
| `countryCode` | a two character country code |
| `createdAt` |  |
| `done` | true if this photo was already imported or rejected |
| `filename` | name of the file in inbox |
| `hasConflict` | conflict with another upload or existing photo |
| `hasPhoto` | this station has already a photo (conflict) |
| `id` |  |
| `inboxUrl` | url of the photo in the inbox |
| `isProcessed` | was this image process (e.g. |
| `lat` |  |
| `lon` |  |
| `newLat` |  |
| `newLon` |  |
| `newTitle` |  |
| `photoId` | ID of the photo |
| `photographerEmail` |  |
| `photographerNickname` |  |
| `problemReportType` | types of problem reports |
| `stationId` |  |
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
| `id` |  |

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
| `id` |  |
| `licenses` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | Base URL of all photos |
| `photographers` | List of all photographers, might be empty if no photos available |
| `stations` | List of the stations |

Operations: List, Load.

API path: `/photoStationsByRecentPhotoImports`

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
| `emailVerified` |  |
| `license` | the only accepted type is "CC0 1.0 Universell (CC0 1.0)", the others are listed for backward compatibility |
| `link` |  |
| `newPassword` |  |
| `nickname` |  |
| `photoOwner` |  |
| `sendNotifications` |  |

Operations: Create, Load, Remove.

API path: `/changePassword`

#### PublicInbox

| Field | Description |
| --- | --- |
| `countryCode` | a two character country code |
| `lat` |  |
| `lon` |  |
| `stationId` |  |
| `title` |  |

Operations: List.

API path: `/publicInbox`

#### Stat

| Field | Description |
| --- | --- |
| `countryCode` | an optional two character country code |
| `photographers` |  |
| `total` |  |
| `withPhoto` |  |
| `withoutPhoto` |  |

Operations: Load.

API path: `/stats`



## Entities


### AdminInbox

Create an instance: `admin_inbox = client.AdminInbox()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `DS100` | `str` | DS100 attribute of a new station |
| `active` | `bool` | active flag of a new station (default true) |
| `command` | `str` |  |
| `conflictResolution` | `str` | how to handle conflicts |
| `countryCode` | `str` | a two character country code |
| `id` | `int` |  |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `message` | `str` |  |
| `rejectReason` | `str` | explanation of a rejection |
| `stationId` | `str` | ID of a new station |
| `status` | `int` |  |
| `title` | `str` |  |

#### Example: Create

```python
admin_inbox = client.AdminInbox().create({
    "command": "example_command",  # str
    "id": 1,  # int
    "message": "example_message",  # str
    "status": 1,  # int
})
```


### Country

Create an instance: `country = client.Country()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` | Is this an active country where we collect photos? |
| `allowPhotoUploads` | `bool` | Are photo uploads allowed? |
| `code` | `str` | a two character country code |
| `email` | `str` | Contact email address |
| `message` | `str` | Informational message about this country |
| `name` | `str` | Name of the country |
| `overrideLicense` | `str` | if a country needs a special license |
| `providerApps` | `list` | array with links to provider apps |
| `timetableUrlTemplate` | `str` | URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced |

#### Example: List

```python
countrys = client.Country().list()
```


### Inbox

Create an instance: `inbox = client.Inbox()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `comment` | `str` |  |
| `countryCode` | `str` | a two character country code |
| `crc32` | `int` | CRC32 checksum of the uploaded photo |
| `createdAt` | `int` |  |
| `filename` | `str` | filename in inbox |
| `id` | `int` |  |
| `inboxUrl` | `str` | url of the photo in the inbox |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `newLat` | `float` |  |
| `newLon` | `float` |  |
| `newTitle` | `str` |  |
| `problemReportType` | `str` | types of problem reports |
| `rejectedReason` | `str` |  |
| `state` | `str` |  |
| `stationId` | `str` |  |
| `title` | `str` |  |

#### Example: List

```python
inboxs = client.Inbox().list()
```

#### Example: Create

```python
inbox = client.Inbox().create({
    "id": 1,  # int
    "state": "example_state",  # str
})
```


### InboxCount

Create an instance: `inbox_count = client.InboxCount()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `pendingInboxEntries` | `int` |  |

#### Example: Load

```python
inbox_count = client.InboxCount().load()
```


### InboxEntry

Create an instance: `inbox_entry = client.InboxEntry()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `bool` | active flag provided by the user |
| `comment` | `str` |  |
| `countryCode` | `str` | a two character country code |
| `createdAt` | `int` |  |
| `done` | `bool` | true if this photo was already imported or rejected |
| `filename` | `str` | name of the file in inbox |
| `hasConflict` | `bool` | conflict with another upload or existing photo |
| `hasPhoto` | `bool` | this station has already a photo (conflict) |
| `id` | `int` |  |
| `inboxUrl` | `str` | url of the photo in the inbox |
| `isProcessed` | `bool` | was this image process (e.g. |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `newLat` | `float` |  |
| `newLon` | `float` |  |
| `newTitle` | `str` |  |
| `photoId` | `int` | ID of the photo |
| `photographerEmail` | `str` |  |
| `photographerNickname` | `str` |  |
| `problemReportType` | `str` | types of problem reports |
| `stationId` | `str` |  |
| `title` | `str` |  |

#### Example: List

```python
inbox_entrys = client.InboxEntry().list()
```


### InboxStateQuery

Create an instance: `inbox_state_query = client.InboxStateQuery()`


### OAuthToken

Create an instance: `o_auth_token = client.OAuthToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `access_token` | `str` |  |
| `expires_in` | `int` |  |
| `refresh_token` | `str` |  |
| `scope` | `str` |  |
| `token_type` | `str` |  |

#### Example: Create

```python
o_auth_token = client.OAuthToken().create({
    "access_token": "example_access_token",  # str
    "scope": "example_scope",  # str
    "token_type": "example_token_type",  # str
})
```


### Oauth

Create an instance: `oauth = client.Oauth()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
oauth = client.Oauth().load({"client_id": "client_id", "redirect_uri": "redirect_uri", "response_type": "response_type", "scope": "scope"})
```

#### Example: Create

```python
oauth = client.Oauth().create({
})
```


### Photo

Create an instance: `photo = client.Photo()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Load

```python
photo = client.Photo().load({"country": "country", "filename": "filename"})
```


### PhotoDownload

Create an instance: `photo_download = client.PhotoDownload()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
photo_download = client.PhotoDownload().load({"filename": "filename"})
```


### PhotoStation

Create an instance: `photo_station = client.PhotoStation()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `licenses` | `list` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `str` | Base URL of all photos |
| `photographers` | `list` | List of all photographers, might be empty if no photos available |
| `stations` | `list` | List of the stations |

#### Example: Load

```python
photo_station = client.PhotoStation().load({"country": "country"})
```

#### Example: List

```python
photo_stations = client.PhotoStation().list()
```


### PhotoUpload

Create an instance: `photo_upload = client.PhotoUpload()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```python
photo_upload = client.PhotoUpload().create({
})
```


### Photographer

Create an instance: `photographer = client.Photographer()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```python
photographer = client.Photographer().load()
```


### Profile

Create an instance: `profile = client.Profile()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `admin` | `bool` |  |
| `anonymous` | `bool` |  |
| `email` | `str` |  |
| `emailVerified` | `bool` |  |
| `license` | `str` | the only accepted type is "CC0 1.0 Universell (CC0 1.0)", the others are listed for backward compatibility |
| `link` | `str` |  |
| `newPassword` | `str` |  |
| `nickname` | `str` |  |
| `photoOwner` | `bool` |  |
| `sendNotifications` | `bool` |  |

#### Example: Load

```python
profile = client.Profile().load({"token": "token"})
```

#### Example: Create

```python
profile = client.Profile().create({
    "license": "example_license",  # str
    "newPassword": "example_newPassword",  # str
    "nickname": "example_nickname",  # str
    "photoOwner": True,  # bool
})
```


### PublicInbox

Create an instance: `public_inbox = client.PublicInbox()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countryCode` | `str` | a two character country code |
| `lat` | `float` |  |
| `lon` | `float` |  |
| `stationId` | `str` |  |
| `title` | `str` |  |

#### Example: List

```python
public_inboxs = client.PublicInbox().list()
```


### Stat

Create an instance: `stat = client.Stat()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countryCode` | `str` | an optional two character country code |
| `photographers` | `int` |  |
| `total` | `int` |  |
| `withPhoto` | `int` |  |
| `withoutPhoto` | `int` |  |

#### Example: Load

```python
stat = client.Stat().load()
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

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
├── schema.py                    -- Generated option + entity specs
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
publicinbox = client.PublicInbox()
publicinbox.list()

# publicinbox.data_get() now returns the publicinbox data from the last list
# publicinbox.match_get() returns the last match criteria
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
