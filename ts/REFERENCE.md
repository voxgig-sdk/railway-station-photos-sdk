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

#### `Done(data?: object)`

Create a new `Done` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DoneEntity` instance.

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

#### `PhotoDownloadInbox(data?: object)`

Create a new `PhotoDownloadInbox` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PhotoDownloadInboxEntity` instance.

#### `PhotoStationById(data?: object)`

Create a new `PhotoStationById` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PhotoStationByIdEntity` instance.

#### `PhotoStationsByCountry(data?: object)`

Create a new `PhotoStationsByCountry` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PhotoStationsByCountryEntity` instance.

#### `PhotoStationsByPhotographer(data?: object)`

Create a new `PhotoStationsByPhotographer` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PhotoStationsByPhotographerEntity` instance.

#### `PhotoStationsByRecentPhotoImport(data?: object)`

Create a new `PhotoStationsByRecentPhotoImport` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PhotoStationsByRecentPhotoImportEntity` instance.

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

#### `Processed(data?: object)`

Create a new `Processed` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProcessedEntity` instance.

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

#### `Rejected(data?: object)`

Create a new `Rejected` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RejectedEntity` instance.

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
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `RailwayStationPhotosSDK.test()`.

**Returns:** `RailwayStationPhotosSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


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

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.AdminInbox().create({
  command: 'example_command',
  id: 1,
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

List entities matching the given criteria. Resolves to an array of entities, one per record.

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

## DoneEntity

```ts
const done = client.Done()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Done().load({ id: 'done_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DoneEntity` instance with the same client and
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
| `comment` | `string` | Yes |  |
| `countryCode` | `string` | Yes | a two character country code |
| `crc32` | `number` | No | CRC32 checksum of the uploaded photo |
| `createdAt` | `number` | No |  |
| `filename` | `string` | No | filename in inbox |
| `id` | `number` | No |  |
| `inboxUrl` | `string` | No | url of the photo in the inbox |
| `inbox_state_queries` | `any[]` | No | Inbox state query request |
| `lat` | `number` | No | new latitude value for the station |
| `lon` | `number` | No | new longitude value for the station |
| `message` | `string` | No |  |
| `newLat` | `number` | No |  |
| `newLon` | `number` | No |  |
| `newTitle` | `string` | No |  |
| `photoId` | `number` | No | Unique id of a photo, can be used for WRONG_PHOTO and PHOTO_OUTDATED type. |
| `problemReportType` | `string` | No | types of problem reports |
| `rejectedReason` | `string` | No |  |
| `state` | `string` | Yes |  |
| `stationId` | `string` | Yes |  |
| `title` | `string` | No | a new title for the station |
| `type` | `string` | Yes | types of problem reports |

### Field Usage by Operation

| Field | list | create | remove |
| --- | --- | --- | --- |
| `comment` | Yes | - | - |
| `countryCode` | Yes | - | - |
| `crc32` | - | - | - |
| `createdAt` | - | - | - |
| `filename` | - | - | - |
| `id` | Yes | - | - |
| `inboxUrl` | - | - | - |
| `inbox_state_queries` | - | - | - |
| `lat` | - | - | - |
| `lon` | - | - | - |
| `message` | - | - | - |
| `newLat` | - | - | - |
| `newLon` | - | - | - |
| `newTitle` | - | - | - |
| `photoId` | - | - | - |
| `problemReportType` | - | - | - |
| `rejectedReason` | - | - | - |
| `state` | - | - | - |
| `stationId` | Yes | - | - |
| `title` | - | - | - |
| `type` | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Inbox().create({
  comment: 'example_comment',
  countryCode: 'example_countryCode',
  stationId: 'example_stationId',
  type: 'example_type',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Inbox().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

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

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

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

List entities matching the given criteria. Resolves to an array of entities, one per record.

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

## OAuthTokenEntity

```ts
const o_auth_token = client.OAuthToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `access_token` | `string` | Yes |  |
| `client_id` | `string` | Yes |  |
| `code` | `string` | No |  |
| `code_verifier` | `string` | No |  |
| `expires_in` | `number` | No |  |
| `grant_type` | `string` | Yes |  |
| `redirect_uri` | `string` | Yes |  |
| `refresh_token` | `string` | No |  |
| `scope` | `string` | Yes |  |
| `token_type` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.OAuthToken().create({
  access_token: 'example_access_token',
  client_id: 'example_client_id',
  grant_type: 'example_grant_type',
  redirect_uri: 'example_redirect_uri',
  scope: 'example_scope',
  token_type: 'example_token_type',
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | `string` | Yes |  |
| `token_type_hint` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Oauth().create({
  token: 'example_token',
})
```

Declares a `application/x-www-form-urlencoded` body, which this SDK does not encode yet: it sends the data as JSON.

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Oauth().load({ client_id: 'client_id', redirect_uri: 'redirect_uri', response_type: 'response_type', scope: 'scope' })
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

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

## PhotoDownloadInboxEntity

```ts
const photo_download_inbox = client.PhotoDownloadInbox()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.PhotoDownloadInbox().load({ id: 'photo_download_inbox_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PhotoDownloadInboxEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PhotoStationByIdEntity

```ts
const photo_station_by_id = client.PhotoStationById()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `licenses` | `any[]` | Yes | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Yes | Base URL of all photos |
| `photographers` | `any[]` | Yes | List of all photographers, might be empty if no photos available |
| `stations` | `any[]` | Yes | List of the stations |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.PhotoStationById().load({ id: 'photo_station_by_id_id', country: 'country' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PhotoStationByIdEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PhotoStationsByCountryEntity

```ts
const photo_stations_by_country = client.PhotoStationsByCountry()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `licenses` | `any[]` | Yes | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Yes | Base URL of all photos |
| `photographers` | `any[]` | Yes | List of all photographers, might be empty if no photos available |
| `stations` | `any[]` | Yes | List of the stations |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.PhotoStationsByCountry().load({ id: 'photo_stations_by_country_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PhotoStationsByCountryEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PhotoStationsByPhotographerEntity

```ts
const photo_stations_by_photographer = client.PhotoStationsByPhotographer()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `licenses` | `any[]` | Yes | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Yes | Base URL of all photos |
| `photographers` | `any[]` | Yes | List of all photographers, might be empty if no photos available |
| `stations` | `any[]` | Yes | List of the stations |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.PhotoStationsByPhotographer().load({ id: 'photo_stations_by_photographer_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PhotoStationsByPhotographerEntity` instance with the same client and
options.

#### `client()`

Return the parent `RailwayStationPhotosSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PhotoStationsByRecentPhotoImportEntity

```ts
const photo_stations_by_recent_photo_import = client.PhotoStationsByRecentPhotoImport()
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

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.PhotoStationsByRecentPhotoImport().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PhotoStationsByRecentPhotoImportEntity` instance with the same client and
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

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crc32` | `number` | No | CRC32 checksum of the uploaded photo |
| `filename` | `string` | No | filename in inbox |
| `id` | `number` | No |  |
| `inboxUrl` | `string` | No | url of the photo in the inbox |
| `message` | `string` | No |  |
| `state` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.PhotoUpload().create({
  state: 'example_state',
})
```

Sends its body unencoded, as `application/octet-stream`: pass it as `$body`, a `Buffer`, `Uint8Array`, `ArrayBuffer`, `Blob`, stream or string. A stream is read in full before the request is sent, so that a retry sends the same bytes. The operation also accepts `image/jpeg`, `image/png`: a `content-type` header option that is not JSON replaces the declared one.

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

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

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

## ProcessedEntity

```ts
const processed = client.Processed()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Processed().load({ id: 'processed_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProcessedEntity` instance with the same client and
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

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Profile().create({
  email: 'example_email',
  newPassword: 'example_newPassword',
  nickname: 'example_nickname',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Profile().load({ token: 'token' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

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

List entities matching the given criteria. Resolves to an array of entities, one per record.

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

## RejectedEntity

```ts
const rejected = client.Rejected()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Rejected().load({ id: 'rejected_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RejectedEntity` instance with the same client and
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

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

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
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ts
const client = new RailwayStationPhotosSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

