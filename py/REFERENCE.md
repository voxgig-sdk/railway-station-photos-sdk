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
| `active` | `bool` | No |  |
| `command` | `str` | Yes |  |
| `conflict_resolution` | `str` | No |  |
| `country_code` | `str` | No |  |
| `ds100` | `str` | No |  |
| `id` | `int` | Yes |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `message` | `str` | Yes |  |
| `reject_reason` | `str` | No |  |
| `station_id` | `str` | No |  |
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
| `active` | `bool` | Yes |  |
| `allow_photo_upload` | `bool` | Yes |  |
| `code` | `str` | Yes |  |
| `email` | `str` | No |  |
| `message` | `str` | No |  |
| `name` | `str` | Yes |  |
| `override_license` | `str` | No |  |
| `provider_app` | `list` | No |  |
| `timetable_url_template` | `str` | No |  |

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
| `country_code` | `str` | No |  |
| `crc32` | `int` | No |  |
| `created_at` | `int` | No |  |
| `filename` | `str` | No |  |
| `id` | `int` | Yes |  |
| `inbox_url` | `str` | No |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `new_lat` | `float` | No |  |
| `new_lon` | `float` | No |  |
| `new_title` | `str` | No |  |
| `problem_report_type` | `str` | No |  |
| `rejected_reason` | `str` | No |  |
| `state` | `str` | Yes |  |
| `station_id` | `str` | No |  |
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
| `pending_inbox_entry` | `int` | Yes |  |

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
| `active` | `bool` | No |  |
| `comment` | `str` | Yes |  |
| `country_code` | `str` | No |  |
| `created_at` | `int` | Yes |  |
| `done` | `bool` | Yes |  |
| `filename` | `str` | No |  |
| `has_conflict` | `bool` | No |  |
| `has_photo` | `bool` | Yes |  |
| `id` | `int` | Yes |  |
| `inbox_url` | `str` | No |  |
| `is_processed` | `bool` | No |  |
| `lat` | `float` | No |  |
| `lon` | `float` | No |  |
| `new_lat` | `float` | No |  |
| `new_lon` | `float` | No |  |
| `new_title` | `str` | No |  |
| `photo_id` | `int` | No |  |
| `photographer_email` | `str` | No |  |
| `photographer_nickname` | `str` | Yes |  |
| `problem_report_type` | `str` | No |  |
| `station_id` | `str` | No |  |
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
| `license` | `list` | Yes |  |
| `photo_base_url` | `str` | Yes |  |
| `photographer` | `list` | Yes |  |
| `station` | `list` | Yes |  |

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
result = client.PhotoStation().load()
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
| `email_verified` | `bool` | No |  |
| `license` | `str` | Yes |  |
| `link` | `str` | No |  |
| `new_password` | `str` | Yes |  |
| `nickname` | `str` | Yes |  |
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Profile().create({
    "license": "example_license",  # str
    "new_password": "example_new_password",  # str
    "nickname": "example_nickname",  # str
    "photo_owner": True,  # bool
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Profile().load()
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
| `country_code` | `str` | No |  |
| `lat` | `float` | Yes |  |
| `lon` | `float` | Yes |  |
| `station_id` | `str` | No |  |
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
| `country_code` | `str` | No |  |
| `photographer` | `int` | Yes |  |
| `total` | `int` | Yes |  |
| `with_photo` | `int` | Yes |  |
| `without_photo` | `int` | Yes |  |

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

