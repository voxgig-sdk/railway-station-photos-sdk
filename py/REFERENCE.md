# RailwayStationPhotos Python SDK Reference

Complete API reference for the RailwayStationPhotos Python SDK.


## RailwayStationPhotosSDK

### Constructor

```python
from railwaystationphotos_sdk import RailwayStationPhotosSDK

client = RailwayStationPhotosSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RailwayStationPhotosSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = RailwayStationPhotosSDK.test()
```


### Instance Methods

#### `AdminInbox(data=None)`

Create a new `AdminInboxEntity` instance. Pass `None` for no initial data.

#### `Country(data=None)`

Create a new `CountryEntity` instance. Pass `None` for no initial data.

#### `Inbox(data=None)`

Create a new `InboxEntity` instance. Pass `None` for no initial data.

#### `InboxCount(data=None)`

Create a new `InboxCountEntity` instance. Pass `None` for no initial data.

#### `InboxEntry(data=None)`

Create a new `InboxEntryEntity` instance. Pass `None` for no initial data.

#### `InboxStateQuery(data=None)`

Create a new `InboxStateQueryEntity` instance. Pass `None` for no initial data.

#### `OAuthToken(data=None)`

Create a new `OAuthTokenEntity` instance. Pass `None` for no initial data.

#### `Oauth(data=None)`

Create a new `OauthEntity` instance. Pass `None` for no initial data.

#### `Photo(data=None)`

Create a new `PhotoEntity` instance. Pass `None` for no initial data.

#### `PhotoDownload(data=None)`

Create a new `PhotoDownloadEntity` instance. Pass `None` for no initial data.

#### `PhotoStation(data=None)`

Create a new `PhotoStationEntity` instance. Pass `None` for no initial data.

#### `PhotoUpload(data=None)`

Create a new `PhotoUploadEntity` instance. Pass `None` for no initial data.

#### `Photographer(data=None)`

Create a new `PhotographerEntity` instance. Pass `None` for no initial data.

#### `Profile(data=None)`

Create a new `ProfileEntity` instance. Pass `None` for no initial data.

#### `PublicInbox(data=None)`

Create a new `PublicInboxEntity` instance. Pass `None` for no initial data.

#### `Stat(data=None)`

Create a new `StatEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AdminInboxEntity

```python
admin_inbox = client.AdminInbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `DS100` | `str` | No | DS100 attribute of a new station |
| `active` | `bool` | No | active flag of a new station (default true) |
| `command` | `str` | Yes |  |
| `conflictResolution` | `str` | No | how to handle conflicts |
| `countryCode` | `str` | No | a two character country code |
| `id` | `int` | Yes |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `message` | `str` | Yes |  |
| `rejectReason` | `str` | No | explanation of a rejection |
| `stationId` | `str` | No | ID of a new station |
| `status` | `int` | Yes |  |
| `title` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.AdminInbox().create({
    "command": "example_command",  # str
    "id": 1,  # int
    "message": "example_message",  # str
    "status": 1,  # int
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AdminInboxEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CountryEntity

```python
country = client.Country()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | Yes | Is this an active country where we collect photos? |
| `allowPhotoUploads` | `bool` | Yes | Are photo uploads allowed? |
| `code` | `str` | Yes | a two character country code |
| `email` | `str` | No | Contact email address |
| `message` | `str` | No | Informational message about this country |
| `name` | `str` | Yes | Name of the country |
| `overrideLicense` | `str` | No | if a country needs a special license |
| `providerApps` | `list` | No | array with links to provider apps |
| `timetableUrlTemplate` | `str` | No | URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Country().list()
for country in results:
    print(country)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CountryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InboxEntity

```python
inbox = client.Inbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | `str` | No |  |
| `countryCode` | `str` | No | a two character country code |
| `crc32` | `int` | No | CRC32 checksum of the uploaded photo |
| `createdAt` | `int` | No |  |
| `filename` | `str` | No | filename in inbox |
| `id` | `int` | Yes |  |
| `inboxUrl` | `str` | No | url of the photo in the inbox |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `newLat` | `float` | No |  |
| `newLon` | `float` | No |  |
| `newTitle` | `str` | No |  |
| `problemReportType` | `str` | No | types of problem reports |
| `rejectedReason` | `str` | No |  |
| `state` | `str` | Yes |  |
| `stationId` | `str` | No |  |
| `title` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Inbox().create({
    "id": 1,  # int
    "state": "example_state",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Inbox().list()
for inbox in results:
    print(inbox)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Inbox().remove({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InboxEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InboxCountEntity

```python
inbox_count = client.InboxCount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `pendingInboxEntries` | `int` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.InboxCount().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InboxCountEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InboxEntryEntity

```python
inbox_entry = client.InboxEntry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `bool` | No | active flag provided by the user |
| `comment` | `str` | Yes |  |
| `countryCode` | `str` | No | a two character country code |
| `createdAt` | `int` | Yes |  |
| `done` | `bool` | Yes | true if this photo was already imported or rejected |
| `filename` | `str` | No | name of the file in inbox |
| `hasConflict` | `bool` | No | conflict with another upload or existing photo |
| `hasPhoto` | `bool` | Yes | this station has already a photo (conflict) |
| `id` | `int` | Yes |  |
| `inboxUrl` | `str` | No | url of the photo in the inbox |
| `isProcessed` | `bool` | No | was this image process (e.g. |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `newLat` | `float` | No |  |
| `newLon` | `float` | No |  |
| `newTitle` | `str` | No |  |
| `photoId` | `int` | No | ID of the photo |
| `photographerEmail` | `str` | No |  |
| `photographerNickname` | `str` | Yes |  |
| `problemReportType` | `str` | No | types of problem reports |
| `stationId` | `str` | No |  |
| `title` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.InboxEntry().list()
for inbox_entry in results:
    print(inbox_entry)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InboxEntryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InboxStateQueryEntity

```python
inbox_state_query = client.InboxStateQuery()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InboxStateQueryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OAuthTokenEntity

```python
o_auth_token = client.OAuthToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `str` | Yes |  |
| `expires_in` | `int` | No |  |
| `refresh_token` | `str` | No |  |
| `scope` | `str` | Yes |  |
| `token_type` | `str` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.OAuthToken().create({
    "access_token": "example_access_token",  # str
    "scope": "example_scope",  # str
    "token_type": "example_token_type",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OAuthTokenEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OauthEntity

```python
oauth = client.Oauth()
```

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Oauth().create({
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Oauth().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OauthEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PhotoEntity

```python
photo = client.Photo()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Photo().load({"country": "country", "filename": "filename"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhotoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PhotoDownloadEntity

```python
photo_download = client.PhotoDownload()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PhotoDownload().load({"filename": "filename"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhotoDownloadEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PhotoStationEntity

```python
photo_station = client.PhotoStation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `licenses` | `list` | Yes | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `str` | Yes | Base URL of all photos |
| `photographers` | `list` | Yes | List of all photographers, might be empty if no photos available |
| `stations` | `list` | Yes | List of the stations |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.PhotoStation().list()
for photo_station in results:
    print(photo_station)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PhotoStation().load({"country": "country"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhotoStationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PhotoUploadEntity

```python
photo_upload = client.PhotoUpload()
```

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.PhotoUpload().create({
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhotoUploadEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PhotographerEntity

```python
photographer = client.Photographer()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Photographer().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PhotographerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProfileEntity

```python
profile = client.Profile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `bool` | No |  |
| `anonymous` | `bool` | No |  |
| `email` | `str` | No |  |
| `emailVerified` | `bool` | No |  |
| `license` | `str` | Yes | the only accepted type is "CC0 1.0 Universell (CC0 1.0)", the others are listed for backward compatibility |
| `link` | `str` | No |  |
| `newPassword` | `str` | Yes |  |
| `nickname` | `str` | Yes |  |
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Profile().create({
    "license": "example_license",  # str
    "newPassword": "example_newPassword",  # str
    "nickname": "example_nickname",  # str
    "photoOwner": True,  # bool
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Profile().load({"token": "token"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Profile().remove()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProfileEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PublicInboxEntity

```python
public_inbox = client.PublicInbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryCode` | `str` | No | a two character country code |
| `lat` | `float` | Yes |  |
| `lon` | `float` | Yes |  |
| `stationId` | `str` | No |  |
| `title` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.PublicInbox().list()
for public_inbox in results:
    print(public_inbox)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicInboxEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StatEntity

```python
stat = client.Stat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countryCode` | `str` | No | an optional two character country code |
| `photographers` | `int` | Yes |  |
| `total` | `int` | Yes |  |
| `withPhoto` | `int` | Yes |  |
| `withoutPhoto` | `int` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Stat().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StatEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = RailwayStationPhotosSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

