"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "admin_inbox",
        "accessor": "AdminInbox",
        "op": "create",
        "method": "POST",
        "path": "/adminInbox",
        "args": [],
        "select": {
            "authorization": "v1"
        },
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "status": 1,
            "message": "x"
        },
        "idField": "id"
    },
    {
        "entity": "country",
        "accessor": "Country",
        "op": "list",
        "method": "GET",
        "path": "/countries",
        "args": [],
        "select": {
            "only_active": "v1"
        },
        "headers": [],
        "query": [
            "onlyActive"
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "code": "x",
                "name": "x",
                "email": "x",
                "timetableUrlTemplate": "x",
                "overrideLicense": "x",
                "active": true,
                "allowPhotoUploads": true,
                "message": "x",
                "providerApps": [
                    {
                        "type": "android",
                        "name": "x",
                        "url": "x"
                    }
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "inbox",
        "accessor": "Inbox",
        "op": "list",
        "method": "GET",
        "path": "/userInbox",
        "args": [],
        "select": {
            "authorization": "v1",
            "show_completed_entry": "v1"
        },
        "headers": [],
        "query": [
            "showCompletedEntries"
        ],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "countryCode": "x",
                "stationId": "x",
                "title": "x",
                "lat": 1,
                "lon": 1,
                "newTitle": "x",
                "newLat": 1,
                "newLon": 1,
                "comment": "x",
                "problemReportType": "WRONG_LOCATION",
                "rejectedReason": "x",
                "filename": "x",
                "inboxUrl": "x",
                "crc32": 1,
                "state": "UNKNOWN",
                "createdAt": 1
            }
        ],
        "idField": "id"
    },
    {
        "entity": "inbox",
        "accessor": "Inbox",
        "op": "remove",
        "method": "DELETE",
        "path": "/userInbox/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "inbox_count",
        "accessor": "InboxCount",
        "op": "load",
        "method": "GET",
        "path": "/adminInboxCount",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "pendingInboxEntries": 1
        },
        "idField": "id"
    },
    {
        "entity": "inbox_entry",
        "accessor": "InboxEntry",
        "op": "list",
        "method": "GET",
        "path": "/adminInbox",
        "args": [],
        "select": {
            "authorization": "v1"
        },
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "countryCode": "x",
                "stationId": "x",
                "title": "x",
                "lat": 1,
                "lon": 1,
                "newTitle": "x",
                "newLat": 1,
                "newLon": 1,
                "photographerNickname": "x",
                "photographerEmail": "x",
                "photoId": 1,
                "comment": "x",
                "createdAt": 1,
                "done": true,
                "filename": "x",
                "inboxUrl": "x",
                "hasPhoto": true,
                "hasConflict": true,
                "problemReportType": "WRONG_LOCATION",
                "isProcessed": true,
                "active": true
            }
        ],
        "idField": "id"
    },
    {
        "entity": "o_auth_token",
        "accessor": "OAuthToken",
        "op": "create",
        "method": "POST",
        "path": "/oauth2/token",
        "args": [],
        "select": {
            "authorization": "v1"
        },
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "access_token": "x",
            "refresh_token": "x",
            "scope": "x",
            "token_type": "Bearer",
            "expires_in": 1
        },
        "idField": "id"
    },
    {
        "entity": "oauth",
        "accessor": "Oauth",
        "op": "create",
        "method": "POST",
        "path": "/oauth2/revoke",
        "args": [],
        "select": {
            "authorization": "v1"
        },
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "oauth",
        "accessor": "Oauth",
        "op": "load",
        "method": "GET",
        "path": "/oauth2/authorize",
        "args": [],
        "select": {
            "client_id": "v1",
            "code_challenge": "v1",
            "code_challenge_method": "v1",
            "redirect_uri": "v1",
            "response_type": "v1",
            "scope": "v1",
            "state": "v1"
        },
        "headers": [],
        "query": [
            "client_id",
            "scope",
            "response_type",
            "redirect_uri",
            "state",
            "code_challenge",
            "code_challenge_method"
        ],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "photo",
        "accessor": "Photo",
        "op": "load",
        "method": "GET",
        "path": "/photos/{country}/{filename}",
        "args": [
            {
                "name": "country",
                "wire": "country",
                "value": "p1"
            },
            {
                "name": "filename",
                "wire": "filename",
                "value": "p2"
            }
        ],
        "select": {
            "width": "v1"
        },
        "headers": [],
        "query": [
            "width"
        ],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "photo_station_by_id",
        "accessor": "PhotoStationById",
        "op": "load",
        "method": "GET",
        "path": "/photoStationById/{country}/{id}",
        "args": [
            {
                "name": "country",
                "wire": "country",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "id",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "photoBaseUrl": "https://api.railway-stations.org/photos/",
            "licenses": [
                {
                    "id": "CC0",
                    "name": "CC0 1.0 Universell (CC0 1.0)",
                    "url": "https://creativecommons.org/publicdomain/zero/1.0/"
                }
            ],
            "photographers": [
                {
                    "name": "x",
                    "url": "x"
                }
            ],
            "stations": [
                {
                    "country": "x",
                    "id": "7054260",
                    "inactive": true,
                    "lat": 1,
                    "lon": 1,
                    "photos": [
                        {
                            "createdAt": 1,
                            "id": 1,
                            "license": "x",
                            "outdated": true,
                            "path": "x",
                            "photographer": "x"
                        }
                    ],
                    "shortCode": "x",
                    "title": "London Victoria"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "photo_stations_by_country",
        "accessor": "PhotoStationsByCountry",
        "op": "load",
        "method": "GET",
        "path": "/photoStationsByCountry/{country}",
        "args": [
            {
                "name": "id",
                "wire": "country",
                "value": "p1"
            }
        ],
        "select": {
            "has_photo": "v1",
            "is_active": "v1"
        },
        "headers": [],
        "query": [
            "hasPhoto",
            "isActive"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "photoBaseUrl": "https://api.railway-stations.org/photos/",
            "licenses": [
                {
                    "id": "CC0",
                    "name": "CC0 1.0 Universell (CC0 1.0)",
                    "url": "https://creativecommons.org/publicdomain/zero/1.0/"
                }
            ],
            "photographers": [
                {
                    "name": "x",
                    "url": "x"
                }
            ],
            "stations": [
                {
                    "country": "x",
                    "id": "7054260",
                    "inactive": true,
                    "lat": 1,
                    "lon": 1,
                    "photos": [
                        {
                            "createdAt": 1,
                            "id": 1,
                            "license": "x",
                            "outdated": true,
                            "path": "x",
                            "photographer": "x"
                        }
                    ],
                    "shortCode": "x",
                    "title": "London Victoria"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "photo_stations_by_photographer",
        "accessor": "PhotoStationsByPhotographer",
        "op": "load",
        "method": "GET",
        "path": "/photoStationsByPhotographer/{photographer}",
        "args": [
            {
                "name": "id",
                "wire": "photographer",
                "value": "p1"
            }
        ],
        "select": {
            "country": "v1"
        },
        "headers": [],
        "query": [
            "country"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "photoBaseUrl": "https://api.railway-stations.org/photos/",
            "licenses": [
                {
                    "id": "CC0",
                    "name": "CC0 1.0 Universell (CC0 1.0)",
                    "url": "https://creativecommons.org/publicdomain/zero/1.0/"
                }
            ],
            "photographers": [
                {
                    "name": "x",
                    "url": "x"
                }
            ],
            "stations": [
                {
                    "country": "x",
                    "id": "7054260",
                    "inactive": true,
                    "lat": 1,
                    "lon": 1,
                    "photos": [
                        {
                            "createdAt": 1,
                            "id": 1,
                            "license": "x",
                            "outdated": true,
                            "path": "x",
                            "photographer": "x"
                        }
                    ],
                    "shortCode": "x",
                    "title": "London Victoria"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "photo_stations_by_recent_photo_import",
        "accessor": "PhotoStationsByRecentPhotoImport",
        "op": "list",
        "method": "GET",
        "path": "/photoStationsByRecentPhotoImports",
        "args": [],
        "select": {
            "since_hour": "v1"
        },
        "headers": [],
        "query": [
            "sinceHours"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "photoBaseUrl": "https://api.railway-stations.org/photos/",
            "licenses": [
                {
                    "id": "CC0",
                    "name": "CC0 1.0 Universell (CC0 1.0)",
                    "url": "https://creativecommons.org/publicdomain/zero/1.0/"
                }
            ],
            "photographers": [
                {
                    "name": "x",
                    "url": "x"
                }
            ],
            "stations": [
                {
                    "country": "x",
                    "id": "7054260",
                    "inactive": true,
                    "lat": 1,
                    "lon": 1,
                    "photos": [
                        {
                            "createdAt": 1,
                            "id": 1,
                            "license": "x",
                            "outdated": true,
                            "path": "x",
                            "photographer": "x"
                        }
                    ],
                    "shortCode": "x",
                    "title": "London Victoria"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "photo_upload",
        "accessor": "PhotoUpload",
        "op": "create",
        "method": "POST",
        "path": "/photoUpload",
        "args": [],
        "select": {
            "authorization": "v1",
            "content_type": "v1"
        },
        "headers": [
            {
                "name": "active",
                "wire": "Active",
                "value": "h1"
            },
            {
                "name": "comment",
                "wire": "Comment",
                "value": "h2"
            },
            {
                "name": "country",
                "wire": "Country",
                "value": "h3"
            },
            {
                "name": "latitude",
                "wire": "Latitude",
                "value": "h4"
            },
            {
                "name": "longitude",
                "wire": "Longitude",
                "value": "h5"
            },
            {
                "name": "station_id",
                "wire": "Station-Id",
                "value": "h6"
            },
            {
                "name": "station_title",
                "wire": "Station-Title",
                "value": "h7"
            }
        ],
        "query": [],
        "auth": null,
        "status": 202,
        "sample": {
            "state": "REVIEW",
            "message": "x",
            "id": 1,
            "filename": "x",
            "inboxUrl": "x",
            "crc32": 1
        },
        "idField": "id"
    },
    {
        "entity": "photographer",
        "accessor": "Photographer",
        "op": "load",
        "method": "GET",
        "path": "/photographers",
        "args": [],
        "select": {
            "country": "v1"
        },
        "headers": [],
        "query": [
            "country"
        ],
        "auth": null,
        "status": 200,
        "sample": {},
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "load",
        "method": "GET",
        "path": "/myProfile",
        "args": [],
        "select": {
            "authorization": "v1"
        },
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "nickname": "x",
            "email": "x",
            "license": "CC0",
            "photoOwner": true,
            "link": "x",
            "anonymous": true,
            "admin": true,
            "emailVerified": true,
            "sendNotifications": true
        },
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "load",
        "method": "GET",
        "path": "/emailVerification/{token}",
        "args": [
            {
                "name": "token",
                "wire": "token",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "profile",
        "accessor": "Profile",
        "op": "remove",
        "method": "DELETE",
        "path": "/myProfile",
        "args": [],
        "select": {
            "authorization": "v1"
        },
        "headers": [],
        "query": [],
        "auth": null,
        "status": 204,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "public_inbox",
        "accessor": "PublicInbox",
        "op": "list",
        "method": "GET",
        "path": "/publicInbox",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "countryCode": "x",
                "stationId": "x",
                "title": "x",
                "lat": 1,
                "lon": 1
            }
        ],
        "idField": "id"
    },
    {
        "entity": "stat",
        "accessor": "Stat",
        "op": "load",
        "method": "GET",
        "path": "/stats",
        "args": [],
        "select": {
            "country": "v1"
        },
        "headers": [],
        "query": [
            "country"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "total": 1,
            "withPhoto": 1,
            "withoutPhoto": 1,
            "photographers": 1,
            "countryCode": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map