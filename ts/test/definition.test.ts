import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "onlyActive"
    ],
    "queryArgs": [
      {
        "name": "only_active",
        "wire": "onlyActive"
      }
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
    "entity": "done",
    "accessor": "Done",
    "op": "load",
    "method": "GET",
    "path": "/inbox/done/{filename}",
    "args": [
      {
        "name": "id",
        "wire": "filename",
        "value": "p1"
      }
    ],
    "select": {
      "width": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "image/jpeg",
      "image/png"
    ],
    "query": [
      "width"
    ],
    "queryArgs": [
      {
        "name": "width",
        "wire": "width"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "inbox",
    "accessor": "Inbox",
    "op": "create",
    "method": "POST",
    "path": "/userInbox",
    "args": [],
    "select": {
      "authorization": "v1",
      "inbox_state_queries": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
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
    "op": "create",
    "method": "POST",
    "path": "/reportProblem",
    "args": [],
    "select": {
      "authorization": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "showCompletedEntries"
    ],
    "queryArgs": [
      {
        "name": "show_completed_entry",
        "wire": "showCompletedEntries"
      }
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
    "cookies": [],
    "query": [],
    "queryArgs": [],
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
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
    "cookies": [],
    "query": [],
    "queryArgs": [],
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
      "redirect_uri": "v1",
      "response_type": "v1",
      "scope": "v1",
      "code_challenge": "v1",
      "code_challenge_method": "v1",
      "state": "v1"
    },
    "headers": [],
    "cookies": [],
    "query": [
      "client_id",
      "scope",
      "response_type",
      "redirect_uri",
      "state",
      "code_challenge",
      "code_challenge_method"
    ],
    "queryArgs": [
      {
        "name": "client_id",
        "wire": "client_id"
      },
      {
        "name": "code_challenge",
        "wire": "code_challenge"
      },
      {
        "name": "code_challenge_method",
        "wire": "code_challenge_method"
      },
      {
        "name": "redirect_uri",
        "wire": "redirect_uri"
      },
      {
        "name": "response_type",
        "wire": "response_type"
      },
      {
        "name": "scope",
        "wire": "scope"
      },
      {
        "name": "state",
        "wire": "state"
      }
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
    "cookies": [],
    "responseMedia": [
      "image/jpeg",
      "image/png"
    ],
    "query": [
      "width"
    ],
    "queryArgs": [
      {
        "name": "width",
        "wire": "width"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": null,
    "idField": "id"
  },
  {
    "entity": "photo_download_inbox",
    "accessor": "PhotoDownloadInbox",
    "op": "load",
    "method": "GET",
    "path": "/inbox/{filename}",
    "args": [
      {
        "name": "id",
        "wire": "filename",
        "value": "p1"
      }
    ],
    "select": {
      "width": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "image/jpeg",
      "image/png"
    ],
    "query": [
      "width"
    ],
    "queryArgs": [
      {
        "name": "width",
        "wire": "width"
      }
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
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
          "title": "London Victoria",
          "lat": 1,
          "lon": 1,
          "shortCode": "x",
          "inactive": true,
          "photos": [
            {
              "id": 1,
              "photographer": "x",
              "path": "x",
              "createdAt": 1,
              "license": "x",
              "outdated": true
            }
          ]
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "hasPhoto",
      "isActive"
    ],
    "queryArgs": [
      {
        "name": "has_photo",
        "wire": "hasPhoto"
      },
      {
        "name": "is_active",
        "wire": "isActive"
      }
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
          "title": "London Victoria",
          "lat": 1,
          "lon": 1,
          "shortCode": "x",
          "inactive": true,
          "photos": [
            {
              "id": 1,
              "photographer": "x",
              "path": "x",
              "createdAt": 1,
              "license": "x",
              "outdated": true
            }
          ]
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "country"
    ],
    "queryArgs": [
      {
        "name": "country",
        "wire": "country"
      }
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
          "title": "London Victoria",
          "lat": 1,
          "lon": 1,
          "shortCode": "x",
          "inactive": true,
          "photos": [
            {
              "id": 1,
              "photographer": "x",
              "path": "x",
              "createdAt": 1,
              "license": "x",
              "outdated": true
            }
          ]
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
      "since_hour": 10
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "sinceHours"
    ],
    "queryArgs": [
      {
        "name": "since_hour",
        "wire": "sinceHours"
      }
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
          "title": "London Victoria",
          "lat": 1,
          "lon": 1,
          "shortCode": "x",
          "inactive": true,
          "photos": [
            {
              "id": 1,
              "photographer": "x",
              "path": "x",
              "createdAt": 1,
              "license": "x",
              "outdated": true
            }
          ]
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
      "authorization": "v1"
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "rawBody": {
      "media": [
        "image/jpeg",
        "image/png",
        "application/octet-stream"
      ],
      "text": false
    },
    "query": [],
    "queryArgs": [],
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "country"
    ],
    "queryArgs": [
      {
        "name": "country",
        "wire": "country"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {},
    "idField": "id"
  },
  {
    "entity": "processed",
    "accessor": "Processed",
    "op": "load",
    "method": "GET",
    "path": "/inbox/processed/{filename}",
    "args": [
      {
        "name": "id",
        "wire": "filename",
        "value": "p1"
      }
    ],
    "select": {
      "width": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "image/jpeg",
      "image/png"
    ],
    "query": [
      "width"
    ],
    "queryArgs": [
      {
        "name": "width",
        "wire": "width"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": null,
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
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
    "cookies": [],
    "responseMedia": [
      "text/plain"
    ],
    "query": [],
    "queryArgs": [],
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
    "cookies": [],
    "query": [],
    "queryArgs": [],
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
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
    "entity": "rejected",
    "accessor": "Rejected",
    "op": "load",
    "method": "GET",
    "path": "/inbox/rejected/{filename}",
    "args": [
      {
        "name": "id",
        "wire": "filename",
        "value": "p1"
      }
    ],
    "select": {
      "width": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "image/jpeg",
      "image/png"
    ],
    "query": [
      "width"
    ],
    "queryArgs": [
      {
        "name": "width",
        "wire": "width"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": null,
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
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "country"
    ],
    "queryArgs": [
      {
        "name": "country",
        "wire": "country"
      }
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
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
