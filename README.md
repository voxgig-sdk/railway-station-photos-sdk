# RailwayStationPhotos SDK

Crowd-sourced photos of railway stations across many countries, served as open data

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About RSAPI

[RSAPI](https://api.railway-stations.org) is the backend for [railway-stations.org](https://railway-stations.org), an OpenData project that collects photographs of railway stations from many countries. The service and its community are organised on [GitHub](https://github.com/RailwayStations).

What you get from the API:
- Lists of countries participating in the project and their stations.
- Photos for a given station, addressed by country code plus station ID.
- A photographer directory and per-photographer profile data.
- An inbox workflow for submitting, reviewing and moderating new photo uploads.
- Aggregate statistics about the collection.

Public read endpoints do not require authentication and CORS is enabled. Upload, inbox and profile operations use OAuth tokens. The full machine-readable contract is published at `https://api.railway-stations.org/openapi.yaml`.

## Try it

**TypeScript**
```bash
npm install railway-station-photos
```

**Python**
```bash
pip install railway-station-photos-sdk
```

**PHP**
```bash
composer require voxgig/railway-station-photos-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/railway-station-photos-sdk/go
```

**Ruby**
```bash
gem install railway-station-photos-sdk
```

**Lua**
```bash
luarocks install railway-station-photos-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { RailwayStationPhotosSDK } from 'railway-station-photos'

const client = new RailwayStationPhotosSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o railway-station-photos-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "railway-station-photos": {
      "command": "/abs/path/to/railway-station-photos-mcp"
    }
  }
}
```

## Entities

The API exposes 16 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **AdminInbox** | Moderator-facing view of submitted photos awaiting review in the inbox workflow. | `/adminInbox` |
| **Country** | Participating country in the project, identified by an ISO country code (for example `ch` for Switzerland). | `/countries` |
| **Inbox** | Submission queue for new station photos contributed by users. | `/reportProblem` |
| **InboxCount** | Counters summarising how many entries are pending in the inbox. | `/adminInboxCount` |
| **InboxEntry** | A single pending photo submission, including the proposed station and uploader. | `/adminInbox` |
| **InboxStateQuery** | Query for the current moderation state of one or more inbox entries. | `` |
| **OAuthToken** | OAuth bearer token used to authenticate photographer and inbox operations. | `/oauth2/token` |
| **Oauth** | OAuth endpoints used to obtain and manage access tokens for authenticated calls. | `/oauth2/revoke` |
| **Photo** | A station photograph with its photographer, licence and metadata. | `/photos/{country}/{filename}` |
| **PhotoDownload** | Binary download of a photo file. | `/inbox/done/{filename}` |
| **PhotoStation** | A railway station with its associated photos, addressed by country code and station ID. | `/photoStationById/{country}/{id}` |
| **PhotoUpload** | Upload endpoint for submitting a new station photo into the inbox workflow. | `/photoUpload` |
| **Photographer** | A contributor who has uploaded one or more station photos. | `/photographers` |
| **Profile** | Authenticated photographer's own profile and account settings. | `/changePassword` |
| **PublicInbox** | Public, read-only view of pending submissions in the inbox. | `/publicInbox` |
| **Stat** | Aggregate statistics about stations, photos and photographers in the project. | `/stats` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from railwaystationphotos_sdk import RailwayStationPhotosSDK

client = RailwayStationPhotosSDK({})

```

### PHP

```php
<?php
require_once 'railwaystationphotos_sdk.php';

$client = new RailwayStationPhotosSDK([]);

```

### Golang

```go
import sdk "github.com/voxgig-sdk/railway-station-photos-sdk/go"

client := sdk.NewRailwayStationPhotosSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "RailwayStationPhotos_sdk"

client = RailwayStationPhotosSDK.new({})

```

### Lua

```lua
local sdk = require("railway-station-photos_sdk")

local client = sdk.new({})

```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = RailwayStationPhotosSDK.test()
const result = await client.AdminInbox().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = RailwayStationPhotosSDK.test(None, None)
result, err = client.AdminInbox(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = RailwayStationPhotosSDK::test(null, null);
[$result, $err] = $client->AdminInbox(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.AdminInbox(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = RailwayStationPhotosSDK.test(nil, nil)
result, err = client.AdminInbox(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:AdminInbox(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
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

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
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

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the RSAPI

- Upstream: [https://railway-stations.org](https://railway-stations.org)
- API docs: [https://api.railway-stations.org/openapi.yaml](https://api.railway-stations.org/openapi.yaml)

- API source code is published under the MIT licence.
- Most station photographs are contributed under CC0 and can be reused without restriction.
- Individual photos may carry their own licence and photographer attribution — check the photo metadata before reuse.
- Station and country data come from community contributors via the RailwayStations OpenData project.

---

Generated from the RSAPI OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
