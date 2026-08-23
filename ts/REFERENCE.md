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
| `DS100` | `string` | No | DS100 attribute of a new station |
| `active` | `boolean` | No | active flag of a new station (default true) |
| `command` | `string` | Yes |  |
| `conflictResolution` | `string` | No | how to handle conflicts |
| `countryCode` | `string` | No | a two character country code |
| `id` | `number` | Yes |  |
| `lat` | `number` | No |  |
| `lon` | `number` | No |  |
| `message` | `string` | Yes |  |
| `rejectReason` | `string` | No | explanation of a rejection |
| `stationId` | `string` | No | ID of a new station |
| `status` | `number` | Yes |  |
| `title` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.AdminInbox().create({
  command: 'example_command',
  id: 1,
  message: 'example_message',
  status: 1,
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
| `active` | `boolean` | Yes | Is this an active country where we collect photos? |
| `allowPhotoUploads` | `boolean` | Yes | Are photo uploads allowed? |
| `code` | `string` | Yes | a two character country code |
| `email` | `string` | No | Contact email address |
| `message` | `string` | No | Informational message about this country |
| `name` | `string` | Yes | Name of the country |
| `overrideLicense` | `string` | No | if a country needs a special license |
| `providerApps` | `any[]` | No | array with links to provider apps |
| `timetableUrlTemplate` | `string` | No | URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced |

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
| `countryCode` | `string` | No | a two character country code |
| `crc32` | `number` | No | CRC32 checksum of the uploaded photo |
| `createdAt` | `number` | No |  |
| `filename` | `string` | No | filename in inbox |
| `id` | `number` | Yes |  |
| `inboxUrl` | `string` | No | url of the photo in the inbox |
| `lat` | `number` | No |  |
| `lon` | `number` | No |  |
| `newLat` | `number` | No |  |
| `newLon` | `number` | No |  |
| `newTitle` | `string` | No |  |
| `problemReportType` | `string` | No | types of problem reports |
| `rejectedReason` | `string` | No |  |
| `state` | `string` | Yes |  |
| `stationId` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Inbox().create({
  id: 1,
  state: 'example_state',
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
const result = await client.Inbox().remove({ id: 1 })
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
| `pendingInboxEntries` | `number` | Yes |  |

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
| `active` | `boolean` | No | active flag provided by the user |
| `comment` | `string` | Yes |  |
| `countryCode` | `string` | No | a two character country code |
| `createdAt` | `number` | Yes |  |
| `done` | `boolean` | Yes | true if this photo was already imported or rejected |
| `filename` | `string` | No | name of the file in inbox |
| `hasConflict` | `boolean` | No | conflict with another upload or existing photo |
| `hasPhoto` | `boolean` | Yes | this station has already a photo (conflict) |
| `id` | `number` | Yes |  |
| `inboxUrl` | `string` | No | url of the photo in the inbox |
| `isProcessed` | `boolean` | No | was this image process (e.g. |
| `lat` | `number` | No |  |
| `lon` | `number` | No |  |
| `newLat` | `number` | No |  |
| `newLon` | `number` | No |  |
| `newTitle` | `string` | No |  |
| `photoId` | `number` | No | ID of the photo |
| `photographerEmail` | `string` | No |  |
| `photographerNickname` | `string` | Yes |  |
| `problemReportType` | `string` | No | types of problem reports |
| `stationId` | `string` | No |  |
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
  access_token: 'example_access_token',
  scope: 'example_scope',
  token_type: 'example_token_type',
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
const result = await client.Photo().load({ country: 'country', filename: 'filename' })
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
const result = await client.PhotoDownload().load({ filename: 'filename' })
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
| `licenses` | `any[]` | Yes | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Yes | Base URL of all photos |
| `photographers` | `any[]` | Yes | List of all photographers, might be empty if no photos available |
| `stations` | `any[]` | Yes | List of the stations |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PhotoStation().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PhotoStation().load({ country: 'country' })
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
| `emailVerified` | `boolean` | No |  |
| `license` | `string` | Yes | the only accepted type is "CC0 1.0 Universell (CC0 1.0)", the others are listed for backward compatibility |
| `link` | `string` | No |  |
| `newPassword` | `string` | Yes |  |
| `nickname` | `string` | Yes |  |
| `photoOwner` | `boolean` | Yes |  |
| `sendNotifications` | `boolean` | No |  |

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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Profile().create({
  license: 'example_license',
  newPassword: 'example_newPassword',
  nickname: 'example_nickname',
  photoOwner: true,
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Profile().load({ token: 'token' })
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
| `countryCode` | `string` | No | a two character country code |
| `lat` | `number` | Yes |  |
| `lon` | `number` | Yes |  |
| `stationId` | `string` | No |  |
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
| `countryCode` | `string` | No | an optional two character country code |
| `photographers` | `number` | Yes |  |
| `total` | `number` | Yes |  |
| `withPhoto` | `number` | Yes |  |
| `withoutPhoto` | `number` | Yes |  |

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

