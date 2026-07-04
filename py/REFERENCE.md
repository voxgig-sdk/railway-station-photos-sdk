# RailwayStationPhotos Python SDK Reference

Complete API reference for the RailwayStationPhotos Python SDK.


## RailwayStationPhotosSDK

### Constructor

```python
from railway-station-photos_sdk import RailwayStationPhotosSDK

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
| `active` | ``$BOOLEAN`` | No |  |
| `command` | ``$STRING`` | Yes |  |
| `conflict_resolution` | ``$STRING`` | No |  |
| `country_code` | ``$STRING`` | No |  |
| `ds100` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | Yes |  |
| `lat` | ``$NUMBER`` | No |  |
| `lon` | ``$NUMBER`` | No |  |
| `message` | ``$STRING`` | Yes |  |
| `reject_reason` | ``$STRING`` | No |  |
| `station_id` | ``$STRING`` | No |  |
| `status` | ``$INTEGER`` | Yes |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.AdminInbox().create({
    "command": ...,  # `$STRING`
    "message": ...,  # `$STRING`
    "status": ...,  # `$INTEGER`
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
| `active` | ``$BOOLEAN`` | Yes |  |
| `allow_photo_upload` | ``$BOOLEAN`` | Yes |  |
| `code` | ``$STRING`` | Yes |  |
| `email` | ``$STRING`` | No |  |
| `message` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | Yes |  |
| `override_license` | ``$STRING`` | No |  |
| `provider_app` | ``$ARRAY`` | No |  |
| `timetable_url_template` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Country().list({})
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
| `comment` | ``$STRING`` | No |  |
| `country_code` | ``$STRING`` | No |  |
| `crc32` | ``$INTEGER`` | No |  |
| `created_at` | ``$INTEGER`` | No |  |
| `filename` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | Yes |  |
| `inbox_url` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | No |  |
| `lon` | ``$NUMBER`` | No |  |
| `new_lat` | ``$NUMBER`` | No |  |
| `new_lon` | ``$NUMBER`` | No |  |
| `new_title` | ``$STRING`` | No |  |
| `problem_report_type` | ``$STRING`` | No |  |
| `rejected_reason` | ``$STRING`` | No |  |
| `state` | ``$STRING`` | Yes |  |
| `station_id` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Inbox().create({
    "state": ...,  # `$STRING`
})
```

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Inbox().list({})
for inbox in results:
    print(inbox)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Inbox().remove({"id": "inbox_id"})
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
| `pending_inbox_entry` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.InboxCount().load({"id": "inbox_count_id"})
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
| `active` | ``$BOOLEAN`` | No |  |
| `comment` | ``$STRING`` | Yes |  |
| `country_code` | ``$STRING`` | No |  |
| `created_at` | ``$INTEGER`` | Yes |  |
| `done` | ``$BOOLEAN`` | Yes |  |
| `filename` | ``$STRING`` | No |  |
| `has_conflict` | ``$BOOLEAN`` | No |  |
| `has_photo` | ``$BOOLEAN`` | Yes |  |
| `id` | ``$INTEGER`` | Yes |  |
| `inbox_url` | ``$STRING`` | No |  |
| `is_processed` | ``$BOOLEAN`` | No |  |
| `lat` | ``$NUMBER`` | No |  |
| `lon` | ``$NUMBER`` | No |  |
| `new_lat` | ``$NUMBER`` | No |  |
| `new_lon` | ``$NUMBER`` | No |  |
| `new_title` | ``$STRING`` | No |  |
| `photo_id` | ``$INTEGER`` | No |  |
| `photographer_email` | ``$STRING`` | No |  |
| `photographer_nickname` | ``$STRING`` | Yes |  |
| `problem_report_type` | ``$STRING`` | No |  |
| `station_id` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.InboxEntry().list({})
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
| `access_token` | ``$STRING`` | Yes |  |
| `expires_in` | ``$INTEGER`` | No |  |
| `refresh_token` | ``$STRING`` | No |  |
| `scope` | ``$STRING`` | Yes |  |
| `token_type` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.OAuthToken().create({
    "access_token": ...,  # `$STRING`
    "scope": ...,  # `$STRING`
    "token_type": ...,  # `$STRING`
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
result = client.Oauth().load({"id": "oauth_id"})
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
result = client.Photo().load({"id": "photo_id"})
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
result = client.PhotoDownload().load({"id": "photo_download_id"})
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
| `license` | ``$ARRAY`` | Yes |  |
| `photo_base_url` | ``$STRING`` | Yes |  |
| `photographer` | ``$ARRAY`` | Yes |  |
| `station` | ``$ARRAY`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.PhotoStation().list({})
for photo_station in results:
    print(photo_station)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PhotoStation().load({"id": "photo_station_id"})
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
result = client.Photographer().load({"id": "photographer_id"})
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
| `admin` | ``$BOOLEAN`` | No |  |
| `anonymous` | ``$BOOLEAN`` | No |  |
| `email` | ``$STRING`` | No |  |
| `email_verified` | ``$BOOLEAN`` | No |  |
| `license` | ``$STRING`` | Yes |  |
| `link` | ``$STRING`` | No |  |
| `new_password` | ``$STRING`` | Yes |  |
| `nickname` | ``$STRING`` | Yes |  |
| `photo_owner` | ``$BOOLEAN`` | Yes |  |
| `send_notification` | ``$BOOLEAN`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `admin` | - | - | - | - | - |
| `anonymous` | - | - | - | - | - |
| `email` | - | - | Yes | - | - |
| `email_verified` | - | - | - | - | - |
| `license` | - | - | Yes | - | - |
| `link` | - | - | - | - | - |
| `new_password` | - | - | - | - | - |
| `nickname` | - | - | - | - | - |
| `photo_owner` | - | - | Yes | - | - |
| `send_notification` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Profile().create({
    "license": ...,  # `$STRING`
    "new_password": ...,  # `$STRING`
    "nickname": ...,  # `$STRING`
    "photo_owner": ...,  # `$BOOLEAN`
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Profile().load({"id": "profile_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Profile().remove({"id": "profile_id"})
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
| `country_code` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | Yes |  |
| `lon` | ``$NUMBER`` | Yes |  |
| `station_id` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.PublicInbox().list({})
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
| `country_code` | ``$STRING`` | No |  |
| `photographer` | ``$INTEGER`` | Yes |  |
| `total` | ``$INTEGER`` | Yes |  |
| `with_photo` | ``$INTEGER`` | Yes |  |
| `without_photo` | ``$INTEGER`` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Stat().load({"id": "stat_id"})
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

