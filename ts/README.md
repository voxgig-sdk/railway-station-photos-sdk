# RailwayStationPhotos TypeScript SDK



The TypeScript SDK for the RailwayStationPhotos API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.AdminInbox()` — each with a small set of operations (`list`, `load`, `create`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/railway-station-photos-sdk/releases](https://github.com/voxgig-sdk/railway-station-photos-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { RailwayStationPhotosSDK } from '@voxgig-sdk/railway-station-photos'

const client = new RailwayStationPhotosSDK()
```

### 3. Load a photo

Photo is nested under country, so provide the `country`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const photo = await client.Photo().load({
    country: 'example_country',
    filename: 'example_filename',
  })
  console.log(photo)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created AdminInbox ENTITY (.data() for the record)
const created = await client.AdminInbox().create({
  command: 'example_command',
  id: 1,
  message: 'example_message',
  status: 1,
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const publicinboxs = await client.PublicInbox().list()
  console.log(publicinboxs)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = RailwayStationPhotosSDK.test()

const publicinbox = await client.PublicInbox().list()
// publicinbox is the entity, populated with mock response data
// — call publicinbox.data() for the record itself
console.log(publicinbox)
```

You can also use the instance method:

```ts
const client = new RailwayStationPhotosSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.PublicInbox()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new RailwayStationPhotosSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### RailwayStationPhotosSDK

#### Constructor

```ts
new RailwayStationPhotosSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `AdminInbox(data?)` | `AdminInboxEntity` | Create an AdminInbox entity instance. |
| `Country(data?)` | `CountryEntity` | Create a Country entity instance. |
| `Inbox(data?)` | `InboxEntity` | Create an Inbox entity instance. |
| `InboxCount(data?)` | `InboxCountEntity` | Create an InboxCount entity instance. |
| `InboxEntry(data?)` | `InboxEntryEntity` | Create an InboxEntry entity instance. |
| `InboxStateQuery(data?)` | `InboxStateQueryEntity` | Create an InboxStateQuery entity instance. |
| `OAuthToken(data?)` | `OAuthTokenEntity` | Create an OAuthToken entity instance. |
| `Oauth(data?)` | `OauthEntity` | Create an Oauth entity instance. |
| `Photo(data?)` | `PhotoEntity` | Create a Photo entity instance. |
| `PhotoDownload(data?)` | `PhotoDownloadEntity` | Create a PhotoDownload entity instance. |
| `PhotoStation(data?)` | `PhotoStationEntity` | Create a PhotoStation entity instance. |
| `PhotoUpload(data?)` | `PhotoUploadEntity` | Create a PhotoUpload entity instance. |
| `Photographer(data?)` | `PhotographerEntity` | Create a Photographer entity instance. |
| `Profile(data?)` | `ProfileEntity` | Create a Profile entity instance. |
| `PublicInbox(data?)` | `PublicInboxEntity` | Create a PublicInbox entity instance. |
| `Stat(data?)` | `StatEntity` | Create a Stat entity instance. |
| `tester(testopts?, sdkopts?)` | `RailwayStationPhotosSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `RailwayStationPhotosSDK.test(testopts?, sdkopts?)` | `RailwayStationPhotosSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): RailwayStationPhotosSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: create.

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

Operations: list.

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

Operations: create, list, remove.

API path: `/reportProblem`

#### InboxCount

| Field | Description |
| --- | --- |
| `pendingInboxEntries` |  |

Operations: load.

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

Operations: list.

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

Operations: create.

API path: `/oauth2/token`

#### Oauth

| Field | Description |
| --- | --- |

Operations: create, load.

API path: `/oauth2/revoke`

#### Photo

| Field | Description |
| --- | --- |

Operations: load.

API path: `/photos/{country}/{filename}`

#### PhotoDownload

| Field | Description |
| --- | --- |

Operations: load.

API path: `/inbox/done/{filename}`

#### PhotoStation

| Field | Description |
| --- | --- |
| `id` |  |
| `licenses` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | Base URL of all photos |
| `photographers` | List of all photographers, might be empty if no photos available |
| `stations` | List of the stations |

Operations: list, load.

API path: `/photoStationsByRecentPhotoImports`

#### PhotoUpload

| Field | Description |
| --- | --- |

Operations: create.

API path: `/photoUpload`

#### Photographer

| Field | Description |
| --- | --- |

Operations: load.

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

Operations: create, load, remove.

API path: `/changePassword`

#### PublicInbox

| Field | Description |
| --- | --- |
| `countryCode` | a two character country code |
| `lat` |  |
| `lon` |  |
| `stationId` |  |
| `title` |  |

Operations: list.

API path: `/publicInbox`

#### Stat

| Field | Description |
| --- | --- |
| `countryCode` | an optional two character country code |
| `photographers` |  |
| `total` |  |
| `withPhoto` |  |
| `withoutPhoto` |  |

Operations: load.

API path: `/stats`



## Entities


### AdminInbox

Create an instance: `const admin_inbox = client.AdminInbox()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `DS100` | `string` | DS100 attribute of a new station |
| `active` | `boolean` | active flag of a new station (default true) |
| `command` | `string` |  |
| `conflictResolution` | `string` | how to handle conflicts |
| `countryCode` | `string` | a two character country code |
| `id` | `number` |  |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `message` | `string` |  |
| `rejectReason` | `string` | explanation of a rejection |
| `stationId` | `string` | ID of a new station |
| `status` | `number` |  |
| `title` | `string` |  |

#### Example: Create

```ts
const admin_inbox = await client.AdminInbox().create({
  command: 'example_command',
  id: 1,
  message: 'example_message',
  status: 1,
})
```


### Country

Create an instance: `const country = client.Country()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` | Is this an active country where we collect photos? |
| `allowPhotoUploads` | `boolean` | Are photo uploads allowed? |
| `code` | `string` | a two character country code |
| `email` | `string` | Contact email address |
| `message` | `string` | Informational message about this country |
| `name` | `string` | Name of the country |
| `overrideLicense` | `string` | if a country needs a special license |
| `providerApps` | `any[]` | array with links to provider apps |
| `timetableUrlTemplate` | `string` | URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced |

#### Example: List

```ts
const countrys = await client.Country().list()
```


### Inbox

Create an instance: `const inbox = client.Inbox()`

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
| `countryCode` | `string` | a two character country code |
| `crc32` | `number` | CRC32 checksum of the uploaded photo |
| `createdAt` | `number` |  |
| `filename` | `string` | filename in inbox |
| `id` | `number` |  |
| `inboxUrl` | `string` | url of the photo in the inbox |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `newLat` | `number` |  |
| `newLon` | `number` |  |
| `newTitle` | `string` |  |
| `problemReportType` | `string` | types of problem reports |
| `rejectedReason` | `string` |  |
| `state` | `string` |  |
| `stationId` | `string` |  |
| `title` | `string` |  |

#### Example: List

```ts
const inboxs = await client.Inbox().list()
```

#### Example: Create

```ts
const inbox = await client.Inbox().create({
  id: 1,
  state: 'example_state',
})
```


### InboxCount

Create an instance: `const inbox_count = client.InboxCount()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `pendingInboxEntries` | `number` |  |

#### Example: Load

```ts
const inbox_count = await client.InboxCount().load()
```


### InboxEntry

Create an instance: `const inbox_entry = client.InboxEntry()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `active` | `boolean` | active flag provided by the user |
| `comment` | `string` |  |
| `countryCode` | `string` | a two character country code |
| `createdAt` | `number` |  |
| `done` | `boolean` | true if this photo was already imported or rejected |
| `filename` | `string` | name of the file in inbox |
| `hasConflict` | `boolean` | conflict with another upload or existing photo |
| `hasPhoto` | `boolean` | this station has already a photo (conflict) |
| `id` | `number` |  |
| `inboxUrl` | `string` | url of the photo in the inbox |
| `isProcessed` | `boolean` | was this image process (e.g. |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `newLat` | `number` |  |
| `newLon` | `number` |  |
| `newTitle` | `string` |  |
| `photoId` | `number` | ID of the photo |
| `photographerEmail` | `string` |  |
| `photographerNickname` | `string` |  |
| `problemReportType` | `string` | types of problem reports |
| `stationId` | `string` |  |
| `title` | `string` |  |

#### Example: List

```ts
const inbox_entrys = await client.InboxEntry().list()
```


### InboxStateQuery

Create an instance: `const inbox_state_query = client.InboxStateQuery()`


### OAuthToken

Create an instance: `const o_auth_token = client.OAuthToken()`

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

```ts
const o_auth_token = await client.OAuthToken().create({
  access_token: 'example_access_token',
  scope: 'example_scope',
  token_type: 'example_token_type',
})
```


### Oauth

Create an instance: `const oauth = client.Oauth()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const oauth = await client.Oauth().load({ client_id: 'client_id', redirect_uri: 'redirect_uri', response_type: 'response_type', scope: 'scope' })
```

#### Example: Create

```ts
const oauth = await client.Oauth().create({
})
```


### Photo

Create an instance: `const photo = client.Photo()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const photo = await client.Photo().load({ country: 'country', filename: 'filename' })
```


### PhotoDownload

Create an instance: `const photo_download = client.PhotoDownload()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const photo_download = await client.PhotoDownload().load({ filename: 'filename' })
```


### PhotoStation

Create an instance: `const photo_station = client.PhotoStation()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `licenses` | `any[]` | List of used licenses, might be empty if no photos available |
| `photoBaseUrl` | `string` | Base URL of all photos |
| `photographers` | `any[]` | List of all photographers, might be empty if no photos available |
| `stations` | `any[]` | List of the stations |

#### Example: Load

```ts
const photo_station = await client.PhotoStation().load({ country: 'country' })
```

#### Example: List

```ts
const photo_stations = await client.PhotoStation().list()
```


### PhotoUpload

Create an instance: `const photo_upload = client.PhotoUpload()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Example: Create

```ts
const photo_upload = await client.PhotoUpload().create({
})
```


### Photographer

Create an instance: `const photographer = client.Photographer()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const photographer = await client.Photographer().load()
```


### Profile

Create an instance: `const profile = client.Profile()`

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
| `emailVerified` | `boolean` |  |
| `license` | `string` | the only accepted type is "CC0 1.0 Universell (CC0 1.0)", the others are listed for backward compatibility |
| `link` | `string` |  |
| `newPassword` | `string` |  |
| `nickname` | `string` |  |
| `photoOwner` | `boolean` |  |
| `sendNotifications` | `boolean` |  |

#### Example: Load

```ts
const profile = await client.Profile().load({ token: 'token' })
```

#### Example: Create

```ts
const profile = await client.Profile().create({
  license: 'example_license',
  newPassword: 'example_newPassword',
  nickname: 'example_nickname',
  photoOwner: true,
})
```


### PublicInbox

Create an instance: `const public_inbox = client.PublicInbox()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countryCode` | `string` | a two character country code |
| `lat` | `number` |  |
| `lon` | `number` |  |
| `stationId` | `string` |  |
| `title` | `string` |  |

#### Example: List

```ts
const public_inboxs = await client.PublicInbox().list()
```


### Stat

Create an instance: `const stat = client.Stat()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countryCode` | `string` | an optional two character country code |
| `photographers` | `number` |  |
| `total` | `number` |  |
| `withPhoto` | `number` |  |
| `withoutPhoto` | `number` |  |

#### Example: Load

```ts
const stat = await client.Stat().load()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
railway-station-photos/
├── src/
│   ├── RailwayStationPhotosSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { RailwayStationPhotosSDK } from '@voxgig-sdk/railway-station-photos'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const publicinbox = client.PublicInbox()
await publicinbox.list()

// publicinbox.data() now returns the publicinbox data from the last `list`
// publicinbox.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
