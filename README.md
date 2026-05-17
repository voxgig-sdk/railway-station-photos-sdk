# RailwayStationPhotos SDK



Available for [Golang](go/) and [Go CLI](go-cli/) and [Lua](lua/) and [PHP](php/) and [Python](py/) and [Ruby](rb/) and [TypeScript](ts/).


## Entities

The API exposes 16 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **AdminInbox** |  | `/adminInbox` |
| **Country** |  | `/countries` |
| **Inbox** |  | `/reportProblem` |
| **InboxCount** |  | `/adminInboxCount` |
| **InboxEntry** |  | `/adminInbox` |
| **InboxStateQuery** |  | `` |
| **OAuthToken** |  | `/oauth2/token` |
| **Oauth** |  | `/oauth2/revoke` |
| **Photo** |  | `/photos/{country}/{filename}` |
| **PhotoDownload** |  | `/inbox/done/{filename}` |
| **PhotoStation** |  | `/photoStationById/{country}/{id}` |
| **PhotoUpload** |  | `/photoUpload` |
| **Photographer** |  | `/photographers` |
| **Profile** |  | `/changePassword` |
| **PublicInbox** |  | `/publicInbox` |
| **Stat** |  | `/stats` |

Each entity supports the following operations where available: **load**, **list**, **create**,
**update**, and **remove**.


## Architecture

### Entity-operation model

Every SDK call follows the same pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

At each stage a feature hook fires (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), allowing features to inspect or modify the pipeline.

### Features

Features are hook-based middleware that extend SDK behaviour.

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

You can add custom features by passing them in the `extend` option at
construction time.

### Direct and Prepare

For endpoints not covered by the entity model, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`, `headers`,
and `body`.


## Quick start

### Golang

```go
import sdk "github.com/voxgig-sdk/railway-station-photos-sdk/go"

client := sdk.NewRailwayStationPhotosSDK(map[string]any{
    "apikey": os.Getenv("RAILWAY-STATION-PHOTOS_APIKEY"),
})

```

### Lua

```lua
local sdk = require("railway-station-photos_sdk")

local client = sdk.new({
  apikey = os.getenv("RAILWAY-STATION-PHOTOS_APIKEY"),
})

```

### PHP

```php
<?php
require_once 'railwaystationphotos_sdk.php';

$client = new RailwayStationPhotosSDK([
    "apikey" => getenv("RAILWAY-STATION-PHOTOS_APIKEY"),
]);

```

### Python

```python
import os
from railwaystationphotos_sdk import RailwayStationPhotosSDK

client = RailwayStationPhotosSDK({
    "apikey": os.environ.get("RAILWAY-STATION-PHOTOS_APIKEY"),
})

```

### Ruby

```ruby
require_relative "RailwayStationPhotos_sdk"

client = RailwayStationPhotosSDK.new({
  "apikey" => ENV["RAILWAY-STATION-PHOTOS_APIKEY"],
})

```

### TypeScript

```ts
import { RailwayStationPhotosSDK } from 'railway-station-photos'

const client = new RailwayStationPhotosSDK({
  apikey: process.env.RAILWAY-STATION-PHOTOS_APIKEY,
})

```


## Testing

Both SDKs provide a test mode that replaces the HTTP transport with an
in-memory mock, so tests run without a network connection.

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.AdminInbox(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:AdminInbox(nil):load(
  { id = "test01" }, nil
)
```

### PHP

```php
$client = RailwayStationPhotosSDK::test(null, null);
[$result, $err] = $client->AdminInbox(null)->load(
    ["id" => "test01"], null
);
```

### Python

```python
client = RailwayStationPhotosSDK.test(None, None)
result, err = client.AdminInbox(None).load(
    {"id": "test01"}, None
)
```

### Ruby

```ruby
client = RailwayStationPhotosSDK.test(nil, nil)
result, err = client.AdminInbox(nil).load(
  { "id" => "test01" }, nil
)
```

### TypeScript

```ts
const client = RailwayStationPhotosSDK.test()
const result = await client.AdminInbox().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```


## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```


## Language-specific documentation

- [Golang SDK](go/README.md)
- [Go CLI SDK](go-cli/README.md)
- [Lua SDK](lua/README.md)
- [PHP SDK](php/README.md)
- [Python SDK](py/README.md)
- [Ruby SDK](rb/README.md)
- [TypeScript SDK](ts/README.md)

