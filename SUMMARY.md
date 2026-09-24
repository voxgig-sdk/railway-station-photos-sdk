# RSAPI

Backend Service for https://www.railway-stations.org/. Sourcecode available at: https://codeberg.org/RailwayStations/RSAPI.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 18 entities and 30 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### AdminInbox

Results: command successfully.

SDK operations: `create`.

Key fields to recognise:

- `DS100`: DS100 attribute of a new station
- `active`: active flag of a new station (default true)
- `conflictResolution`: how to handle conflicts
- `countryCode`: a two character country code
- `rejectReason`: explanation of a rejection

### Country

Results: successful operation.

SDK operations: `list`.

Key fields to recognise:

- `active`: Is this an active country where we collect photos?
- `allowPhotoUploads`: Are photo uploads allowed?
- `code`: a two character country code
- `email`: Contact email address
- `message`: Informational message about this country

### Inbox

Results: report successful; array of InboxStateQueryResponse objects; inbox entry got deleted.

SDK operations: `create`, `list`, `remove`.

Key fields to recognise:

- `countryCode`: a two character country code
- `crc32`: CRC32 checksum of the uploaded photo
- `filename`: filename in inbox
- `inboxUrl`: url of the photo in the inbox
- `problemReportType`: types of problem reports

### InboxCount

Results: count of pending inbox items.

SDK operations: `load`.

### InboxEntry

Results: array of inbox objects.

SDK operations: `list`.

Key fields to recognise:

- `active`: active flag provided by the user
- `countryCode`: a two character country code
- `done`: true if this photo was already imported or rejected
- `filename`: name of the file in inbox
- `hasConflict`: conflict with another upload or existing photo

### OAuthToken

Results: successful token request.

SDK operations: `create`.

### Oauth

Results: successfully revoked the token.

SDK operations: `create`, `load`.

### Photo

Results: ok.

SDK operations: `load`.

### PhotoDownload

Results: ok.

SDK operations: `load`.

### PhotoStationById

Results: successful operation.

SDK operations: `load`.

Key fields to recognise:

- `id`: Unique id of the license
- `licenses`: List of used licenses, might be empty if no photos available
- `photoBaseUrl`: Base URL of all photos
- `photographers`: List of all photographers, might be empty if no photos available
- `stations`: List of the stations

### PhotoStationsByCountry

Results: successful operation.

SDK operations: `load`.

Key fields to recognise:

- `id`: Unique id of the license
- `licenses`: List of used licenses, might be empty if no photos available
- `photoBaseUrl`: Base URL of all photos
- `photographers`: List of all photographers, might be empty if no photos available
- `stations`: List of the stations

### PhotoStationsByPhotographer

Results: successful operation.

SDK operations: `load`.

Key fields to recognise:

- `id`: Unique id of the license
- `licenses`: List of used licenses, might be empty if no photos available
- `photoBaseUrl`: Base URL of all photos
- `photographers`: List of all photographers, might be empty if no photos available
- `stations`: List of the stations

### PhotoStationsByRecentPhotoImport

Results: successful operation.

SDK operations: `list`.

Key fields to recognise:

- `licenses`: List of used licenses, might be empty if no photos available
- `photoBaseUrl`: Base URL of all photos
- `photographers`: List of all photographers, might be empty if no photos available
- `stations`: List of the stations

### PhotoUpload

Results: upload successful.

SDK operations: `create`.

### Photographer

Results: successful operation.

SDK operations: `load`.

### Profile

Results: password changed; ok; email successfully sent; email successfully verified; delete action has been enacted, no further information.

SDK operations: `create`, `load`, `remove`.

Key fields to recognise:

- `license`: the only accepted type is &quot;CC0 1.0 Universell (CC0 1.0)&quot;, the others are listed for backward compatibility

### PublicInbox

Results: array of public inbox objects.

SDK operations: `list`.

Key fields to recognise:

- `countryCode`: a two character country code

### Stat

Results: successful operation.

SDK operations: `load`.

Key fields to recognise:

- `countryCode`: an optional two character country code

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| AdminInbox | `create` | `POST /adminInbox` | See reference |
| Country | `list` | `GET /countries` | See reference |
| Inbox | `create` | `POST /reportProblem` | See reference |
| Inbox | `create` | `POST /userInbox` | See reference |
| Inbox | `list` | `GET /userInbox` | See reference |
| Inbox | `remove` | `DELETE /userInbox/{id}` | See reference |
| InboxCount | `load` | `GET /adminInboxCount` | See reference |
| InboxEntry | `list` | `GET /adminInbox` | See reference |
| OAuthToken | `create` | `POST /oauth2/token` | See reference |
| Oauth | `create` | `POST /oauth2/revoke` | See reference |
| Oauth | `load` | `GET /oauth2/authorize` | See reference |
| Photo | `load` | `GET /photos/{country}/{filename}` | See reference |
| PhotoDownload | `load` | `GET /inbox/done/{filename}` | See reference |
| PhotoDownload | `load` | `GET /inbox/processed/{filename}` | See reference |
| PhotoDownload | `load` | `GET /inbox/rejected/{filename}` | See reference |
| PhotoDownload | `load` | `GET /inbox/{filename}` | See reference |
| PhotoStationById | `load` | `GET /photoStationById/{country}/{id}` | See reference |
| PhotoStationsByCountry | `load` | `GET /photoStationsByCountry/{country}` | See reference |
| PhotoStationsByPhotographer | `load` | `GET /photoStationsByPhotographer/{photographer}` | See reference |
| PhotoStationsByRecentPhotoImport | `list` | `GET /photoStationsByRecentPhotoImports` | See reference |
| PhotoUpload | `create` | `POST /photoUpload` | See reference |
| Photographer | `load` | `GET /photographers` | See reference |
| Profile | `create` | `POST /changePassword` | See reference |
| Profile | `create` | `POST /myProfile` | See reference |
| Profile | `create` | `POST /resendEmailVerification` | See reference |
| Profile | `load` | `GET /myProfile` | See reference |
| Profile | `load` | `GET /emailVerification/{token}` | See reference |
| Profile | `remove` | `DELETE /myProfile` | See reference |
| PublicInbox | `list` | `GET /publicInbox` | See reference |
| Stat | `load` | `GET /stats` | See reference |

## Connect to the API

- API server: `https://api.railway-stations.org`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `railway-station-photos_list`: List records for an entity. Supported entities: `country`, `inbox`, `inbox_entry`, `photo_stations_by_recent_photo_import`, `public_inbox`.
- `railway-station-photos_load`: Load one record for an entity. Supported entities: `inbox_count`, `oauth`, `photo`, `photo_download`, `photo_station_by_id`, `photo_stations_by_country`, `photo_stations_by_photographer`, `photographer`, `profile`, `stat`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

