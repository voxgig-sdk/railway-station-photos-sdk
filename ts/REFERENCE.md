# RailwayStationPhotos TypeScript SDK Reference

Complete API reference for the RailwayStationPhotos TypeScript SDK.


## RailwayStationPhotosSDK

### Constructor

```ts
new RailwayStationPhotosSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RailwayStationPhotosSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = RailwayStationPhotosSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `RailwayStationPhotosSDK` instance in test mode.


### Instance Methods

#### `AdminInbox(data?: object)`

Create a new `AdminInbox` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AdminInboxEntity` instance.

#### `Country(data?: object)`

Create a new `Country` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CountryEntity` instance.

#### `Inbox(data?: object)`

Create a new `Inbox` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InboxEntity` instance.

#### `InboxCount(data?: object)`

Create a new `InboxCount` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InboxCountEntity` instance.

#### `InboxEntry(data?: object)`

Create a new `InboxEntry` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InboxEntryEntity` instance.

#### `InboxStateQuery(data?: object)`

Create a new `InboxStateQuery` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InboxStateQueryEntity` instance.

#### `OAuthToken(data?: object)`

Create a new `OAuthToken` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OAuthTokenEntity` instance.

#### `Oauth(data?: object)`

Create a new `Oauth` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OauthEntity` instance.

#### `Photo(data?: object)`

Create a new `Photo` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PhotoEntity` instance.

#### `PhotoDownload(data?: object)`

Create a new `PhotoDownload` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PhotoDownloadEntity` instance.

#### `PhotoStation(data?: object)`

Create a new `PhotoStation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PhotoStationEntity` instance.

#### `PhotoUpload(data?: object)`

Create a new `PhotoUpload` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PhotoUploadEntity` instance.

#### `Photographer(data?: object)`

Create a new `Photographer` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PhotographerEntity` instance.

#### `Profile(data?: object)`

Create a new `Profile` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProfileEntity` instance.

#### `PublicInbox(data?: object)`

Create a new `PublicInbox` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PublicInboxEntity` instance.

#### `Stat(data?: object)`

Create a new `Stat` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StatEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `RailwayStationPhotosSDK.test()`.

**Returns:** `RailwayStationPhotosSDK` instance in test mode.


---

## AdminInboxEntity

```ts
const admin_inbox = client.AdminInbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | No |  |
| `command` | `string` | Yes |  |
| `conflict_resolution` | `string` | No |  |
| `country_code` | `string` | No |  |
| `ds100` | `string` | No |  |
| `id` | `number` | Yes |  |
| `lat` | `number` | No |  |
| `lon` | `number` | No |  |
| `message` | `string` | Yes |  |
| `reject_reason` | `string` | No |  |
| `station_id` | `string` | No |  |
| `status` | `number` | Yes |  |
| `title` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.AdminInbox().create({
  command: /* string */,
  message: /* string */,
  status: /* number */,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AdminInboxEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CountryEntity

```ts
const country = client.Country()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | Yes |  |
| `allow_photo_upload` | `boolean` | Yes |  |
| `code` | `string` | Yes |  |
| `email` | `string` | No |  |
| `message` | `string` | No |  |
| `name` | `string` | Yes |  |
| `override_license` | `string` | No |  |
| `provider_app` | `any[]` | No |  |
| `timetable_url_template` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Country().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CountryEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InboxEntity

```ts
const inbox = client.Inbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `comment` | `string` | No |  |
| `country_code` | `string` | No |  |
| `crc32` | `number` | No |  |
| `created_at` | `number` | No |  |
| `filename` | `string` | No |  |
| `id` | `number` | Yes |  |
| `inbox_url` | `string` | No |  |
| `lat` | `number` | No |  |
| `lon` | `number` | No |  |
| `new_lat` | `number` | No |  |
| `new_lon` | `number` | No |  |
| `new_title` | `string` | No |  |
| `problem_report_type` | `string` | No |  |
| `rejected_reason` | `string` | No |  |
| `state` | `string` | Yes |  |
| `station_id` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Inbox().create({
  state: /* string */,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Inbox().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Inbox().remove()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InboxEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InboxCountEntity

```ts
const inbox_count = client.InboxCount()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `pending_inbox_entry` | `number` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.InboxCount().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InboxCountEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InboxEntryEntity

```ts
const inbox_entry = client.InboxEntry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `active` | `boolean` | No |  |
| `comment` | `string` | Yes |  |
| `country_code` | `string` | No |  |
| `created_at` | `number` | Yes |  |
| `done` | `boolean` | Yes |  |
| `filename` | `string` | No |  |
| `has_conflict` | `boolean` | No |  |
| `has_photo` | `boolean` | Yes |  |
| `id` | `number` | Yes |  |
| `inbox_url` | `string` | No |  |
| `is_processed` | `boolean` | No |  |
| `lat` | `number` | No |  |
| `lon` | `number` | No |  |
| `new_lat` | `number` | No |  |
| `new_lon` | `number` | No |  |
| `new_title` | `string` | No |  |
| `photo_id` | `number` | No |  |
| `photographer_email` | `string` | No |  |
| `photographer_nickname` | `string` | Yes |  |
| `problem_report_type` | `string` | No |  |
| `station_id` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.InboxEntry().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InboxEntryEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InboxStateQueryEntity

```ts
const inbox_state_query = client.InboxStateQuery()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InboxStateQueryEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OAuthTokenEntity

```ts
const o_auth_token = client.OAuthToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes |  |
| `expires_in` | `number` | No |  |
| `refresh_token` | `string` | No |  |
| `scope` | `string` | Yes |  |
| `token_type` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.OAuthToken().create({
  access_token: /* string */,
  scope: /* string */,
  token_type: /* string */,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OAuthTokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OauthEntity

```ts
const oauth = client.Oauth()
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Oauth().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Oauth().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OauthEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PhotoEntity

```ts
const photo = client.Photo()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Photo().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PhotoEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PhotoDownloadEntity

```ts
const photo_download = client.PhotoDownload()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PhotoDownload().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PhotoDownloadEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PhotoStationEntity

```ts
const photo_station = client.PhotoStation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `license` | `any[]` | Yes |  |
| `photo_base_url` | `string` | Yes |  |
| `photographer` | `any[]` | Yes |  |
| `station` | `any[]` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PhotoStation().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PhotoStation().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PhotoStationEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PhotoUploadEntity

```ts
const photo_upload = client.PhotoUpload()
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.PhotoUpload().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PhotoUploadEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PhotographerEntity

```ts
const photographer = client.Photographer()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Photographer().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PhotographerEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProfileEntity

```ts
const profile = client.Profile()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `admin` | `boolean` | No |  |
| `anonymous` | `boolean` | No |  |
| `email` | `string` | No |  |
| `email_verified` | `boolean` | No |  |
| `license` | `string` | Yes |  |
| `link` | `string` | No |  |
| `new_password` | `string` | Yes |  |
| `nickname` | `string` | Yes |  |
| `photo_owner` | `boolean` | Yes |  |
| `send_notification` | `boolean` | No |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Profile().create({
  license: /* string */,
  new_password: /* string */,
  nickname: /* string */,
  photo_owner: /* boolean */,
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Profile().load()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Profile().remove()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProfileEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PublicInboxEntity

```ts
const public_inbox = client.PublicInbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `string` | No |  |
| `lat` | `number` | Yes |  |
| `lon` | `number` | Yes |  |
| `station_id` | `string` | No |  |
| `title` | `string` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PublicInbox().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PublicInboxEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StatEntity

```ts
const stat = client.Stat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `string` | No |  |
| `photographer` | `number` | Yes |  |
| `total` | `number` | Yes |  |
| `with_photo` | `number` | Yes |  |
| `without_photo` | `number` | Yes |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Stat().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StatEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new RailwayStationPhotosSDK({
  feature: {
    test: { active: true },
  }
})
```

