
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'RailwayStationPhotos',
        slug: "railway-station-photos",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.railway-stations.org",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        admin_inbox: {
        },
  
        country: {
        },
  
        inbox: {
        },
  
        inbox_count: {
        },
  
        inbox_entry: {
        },
  
        o_auth_token: {
        },
  
        oauth: {
        },
  
        photo: {
        },
  
        photo_download: {
        },
  
        photo_station_by_id: {
        },
  
        photo_stations_by_country: {
        },
  
        photo_stations_by_photographer: {
        },
  
        photo_stations_by_recent_photo_import: {
        },
  
        photo_upload: {
        },
  
        photographer: {
        },
  
        profile: {
        },
  
        public_inbox: {
        },
  
        stat: {
        },
  
    }
  }


  entity = {
    "admin_inbox": {
      "fields": [
        {
          "name": "DS100",
          "title": "Ds100",
          "type": "`$STRING`",
          "short": "DS100 attribute of a new station"
        },
        {
          "name": "active",
          "title": "Active",
          "type": "`$BOOLEAN`",
          "short": "active flag of a new station (default true)"
        },
        {
          "name": "command",
          "title": "Command",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "conflictResolution",
          "title": "Conflict Resolution",
          "type": "`$STRING`",
          "short": "how to handle conflicts"
        },
        {
          "name": "countryCode",
          "title": "Country Code",
          "type": "`$STRING`",
          "short": "a two character country code"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int64"
        },
        {
          "name": "lat",
          "title": "Lat",
          "type": "`$NUMBER`",
          "format": "double"
        },
        {
          "name": "lon",
          "title": "Lon",
          "type": "`$NUMBER`",
          "format": "double"
        },
        {
          "name": "message",
          "title": "Message",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "rejectReason",
          "title": "Reject Reason",
          "type": "`$STRING`",
          "short": "explanation of a rejection"
        },
        {
          "name": "stationId",
          "title": "Station Id",
          "type": "`$STRING`",
          "short": "ID of a new station"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int32"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "admin_inbox",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/adminInbox",
              "segments": [
                {
                  "lit": "adminInbox"
                }
              ],
              "parts": [
                "adminInbox"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "authorization",
                    "orig": "authorization",
                    "type": "`$STRING`",
                    "kind": "header",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "authorization"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "country": {
      "fields": [
        {
          "name": "active",
          "title": "Active",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Is this an active country where we collect photos?"
        },
        {
          "name": "allowPhotoUploads",
          "title": "Allow Photo Uploads",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "Are photo uploads allowed?"
        },
        {
          "name": "code",
          "title": "Code",
          "type": "`$STRING`",
          "req": true,
          "short": "a two character country code"
        },
        {
          "name": "email",
          "title": "Email",
          "type": "`$STRING`",
          "short": "Contact email address"
        },
        {
          "name": "message",
          "title": "Message",
          "type": "`$STRING`",
          "short": "Informational message about this country"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "req": true,
          "short": "Name of the country"
        },
        {
          "name": "overrideLicense",
          "title": "Override License",
          "type": "`$STRING`",
          "short": "if a country needs a special license"
        },
        {
          "name": "providerApps",
          "title": "Provider Apps",
          "type": "`$ARRAY`",
          "short": "array with links to provider apps"
        },
        {
          "name": "timetableUrlTemplate",
          "title": "Timetable Url Template",
          "type": "`$STRING`",
          "short": "URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced"
        }
      ],
      "name": "country",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/countries",
              "segments": [
                {
                  "lit": "countries"
                }
              ],
              "parts": [
                "countries"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "only_active",
                    "orig": "only_active",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "only_active"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "inbox": {
      "fields": [
        {
          "name": "comment",
          "title": "Comment",
          "type": "`$STRING`"
        },
        {
          "name": "countryCode",
          "title": "Country Code",
          "type": "`$STRING`",
          "short": "a two character country code"
        },
        {
          "name": "crc32",
          "title": "Crc32",
          "type": "`$INTEGER`",
          "short": "CRC32 checksum of the uploaded photo",
          "format": "int64"
        },
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$INTEGER`",
          "format": "int64"
        },
        {
          "name": "filename",
          "title": "Filename",
          "type": "`$STRING`",
          "short": "filename in inbox"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int64"
        },
        {
          "name": "inboxUrl",
          "title": "Inbox Url",
          "type": "`$STRING`",
          "short": "url of the photo in the inbox"
        },
        {
          "name": "lat",
          "title": "Lat",
          "type": "`$NUMBER`",
          "format": "double"
        },
        {
          "name": "lon",
          "title": "Lon",
          "type": "`$NUMBER`",
          "format": "double"
        },
        {
          "name": "newLat",
          "title": "New Lat",
          "type": "`$NUMBER`",
          "format": "double"
        },
        {
          "name": "newLon",
          "title": "New Lon",
          "type": "`$NUMBER`",
          "format": "double"
        },
        {
          "name": "newTitle",
          "title": "New Title",
          "type": "`$STRING`"
        },
        {
          "name": "problemReportType",
          "title": "Problem Report Type",
          "type": "`$STRING`",
          "short": "types of problem reports"
        },
        {
          "name": "rejectedReason",
          "title": "Rejected Reason",
          "type": "`$STRING`"
        },
        {
          "name": "state",
          "title": "State",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "stationId",
          "title": "Station Id",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "inbox",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/reportProblem",
              "segments": [
                {
                  "lit": "reportProblem"
                }
              ],
              "parts": [
                "reportProblem"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "authorization",
                    "orig": "authorization",
                    "type": "`$STRING`",
                    "kind": "header",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "authorization"
                ]
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/userInbox",
              "segments": [
                {
                  "lit": "userInbox"
                }
              ],
              "parts": [
                "userInbox"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "authorization",
                    "orig": "authorization",
                    "type": "`$STRING`",
                    "kind": "header",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "authorization"
                ]
              }
            }
          ]
        },
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/userInbox",
              "segments": [
                {
                  "lit": "userInbox"
                }
              ],
              "parts": [
                "userInbox"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "authorization",
                    "orig": "authorization",
                    "type": "`$STRING`",
                    "kind": "header",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "show_completed_entry",
                    "orig": "show_completed_entry",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "authorization",
                  "show_completed_entry"
                ]
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/userInbox/{id}",
              "segments": [
                {
                  "lit": "userInbox"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "userInbox",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "inbox_count": {
      "fields": [
        {
          "name": "pendingInboxEntries",
          "title": "Pending Inbox Entries",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int64"
        }
      ],
      "name": "inbox_count",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/adminInboxCount",
              "segments": [
                {
                  "lit": "adminInboxCount"
                }
              ],
              "parts": [
                "adminInboxCount"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "inbox_entry": {
      "fields": [
        {
          "name": "active",
          "title": "Active",
          "type": "`$BOOLEAN`",
          "short": "active flag provided by the user"
        },
        {
          "name": "comment",
          "title": "Comment",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "countryCode",
          "title": "Country Code",
          "type": "`$STRING`",
          "short": "a two character country code"
        },
        {
          "name": "createdAt",
          "title": "Created At",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int64"
        },
        {
          "name": "done",
          "title": "Done",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "true if this photo was already imported or rejected"
        },
        {
          "name": "filename",
          "title": "Filename",
          "type": "`$STRING`",
          "short": "name of the file in inbox"
        },
        {
          "name": "hasConflict",
          "title": "Has Conflict",
          "type": "`$BOOLEAN`",
          "short": "conflict with another upload or existing photo"
        },
        {
          "name": "hasPhoto",
          "title": "Has Photo",
          "type": "`$BOOLEAN`",
          "req": true,
          "short": "this station has already a photo (conflict)"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int64"
        },
        {
          "name": "inboxUrl",
          "title": "Inbox Url",
          "type": "`$STRING`",
          "short": "url of the photo in the inbox"
        },
        {
          "name": "isProcessed",
          "title": "Is Processed",
          "type": "`$BOOLEAN`",
          "short": "was this image process (e.g."
        },
        {
          "name": "lat",
          "title": "Lat",
          "type": "`$NUMBER`",
          "format": "double"
        },
        {
          "name": "lon",
          "title": "Lon",
          "type": "`$NUMBER`",
          "format": "double"
        },
        {
          "name": "newLat",
          "title": "New Lat",
          "type": "`$NUMBER`",
          "format": "double"
        },
        {
          "name": "newLon",
          "title": "New Lon",
          "type": "`$NUMBER`",
          "format": "double"
        },
        {
          "name": "newTitle",
          "title": "New Title",
          "type": "`$STRING`"
        },
        {
          "name": "photoId",
          "title": "Photo Id",
          "type": "`$INTEGER`",
          "short": "ID of the photo",
          "format": "int64"
        },
        {
          "name": "photographerEmail",
          "title": "Photographer Email",
          "type": "`$STRING`"
        },
        {
          "name": "photographerNickname",
          "title": "Photographer Nickname",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "problemReportType",
          "title": "Problem Report Type",
          "type": "`$STRING`",
          "short": "types of problem reports"
        },
        {
          "name": "stationId",
          "title": "Station Id",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "inbox_entry",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/adminInbox",
              "segments": [
                {
                  "lit": "adminInbox"
                }
              ],
              "parts": [
                "adminInbox"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "authorization",
                    "orig": "authorization",
                    "type": "`$STRING`",
                    "kind": "header",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "authorization"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "o_auth_token": {
      "fields": [
        {
          "name": "access_token",
          "title": "Access Token",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "expires_in",
          "title": "Expires In",
          "type": "`$INTEGER`",
          "format": "int64"
        },
        {
          "name": "refresh_token",
          "title": "Refresh Token",
          "type": "`$STRING`"
        },
        {
          "name": "scope",
          "title": "Scope",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "token_type",
          "title": "Token Type",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "name": "o_auth_token",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/oauth2/token",
              "segments": [
                {
                  "lit": "oauth2"
                },
                {
                  "lit": "token"
                }
              ],
              "parts": [
                "oauth2",
                "token"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "authorization",
                    "orig": "authorization",
                    "type": "`$STRING`",
                    "kind": "header",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "authorization"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "oauth": {
      "fields": [],
      "name": "oauth",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/oauth2/revoke",
              "segments": [
                {
                  "lit": "oauth2"
                },
                {
                  "lit": "revoke"
                }
              ],
              "parts": [
                "oauth2",
                "revoke"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "authorization",
                    "orig": "authorization",
                    "type": "`$STRING`",
                    "kind": "header",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "authorization"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/oauth2/authorize",
              "segments": [
                {
                  "lit": "oauth2"
                },
                {
                  "lit": "authorize"
                }
              ],
              "parts": [
                "oauth2",
                "authorize"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "client_id",
                    "orig": "client_id",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "code_challenge",
                    "orig": "code_challenge",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "code_challenge_method",
                    "orig": "code_challenge_method",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "redirect_uri",
                    "orig": "redirect_uri",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "response_type",
                    "orig": "response_type",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "scope",
                    "orig": "scope",
                    "type": "`$STRING`",
                    "kind": "query",
                    "reqd": true
                  },
                  {
                    "name": "state",
                    "orig": "state",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "client_id",
                  "code_challenge",
                  "code_challenge_method",
                  "redirect_uri",
                  "response_type",
                  "scope",
                  "state"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "photo": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id",
        "parts": [
          "country",
          "filename"
        ],
        "sep": "/"
      },
      "name": "photo",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/photos/{country}/{filename}",
              "segments": [
                {
                  "lit": "photos"
                },
                {
                  "var": "country"
                },
                {
                  "var": "filename"
                }
              ],
              "parts": [
                "photos",
                "{country}",
                "{filename}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "filename",
                    "orig": "filename",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "width",
                    "orig": "width",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "country",
                  "filename",
                  "width"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "photo_download": {
      "fields": [],
      "name": "photo_download",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/inbox/done/{filename}",
              "segments": [
                {
                  "lit": "inbox"
                },
                {
                  "lit": "done"
                },
                {
                  "var": "filename"
                }
              ],
              "parts": [
                "inbox",
                "done",
                "{filename}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "filename",
                    "orig": "filename",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "width",
                    "orig": "width",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "filename",
                  "width"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/inbox/processed/{filename}",
              "segments": [
                {
                  "lit": "inbox"
                },
                {
                  "lit": "processed"
                },
                {
                  "var": "filename"
                }
              ],
              "parts": [
                "inbox",
                "processed",
                "{filename}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "filename",
                    "orig": "filename",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "width",
                    "orig": "width",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "filename",
                  "width"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/inbox/rejected/{filename}",
              "segments": [
                {
                  "lit": "inbox"
                },
                {
                  "lit": "rejected"
                },
                {
                  "var": "filename"
                }
              ],
              "parts": [
                "inbox",
                "rejected",
                "{filename}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "filename",
                    "orig": "filename",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "width",
                    "orig": "width",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "filename",
                  "width"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/inbox/{filename}",
              "segments": [
                {
                  "lit": "inbox"
                },
                {
                  "var": "filename"
                }
              ],
              "parts": [
                "inbox",
                "{filename}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "filename",
                    "orig": "filename",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "width",
                    "orig": "width",
                    "type": "`$INTEGER`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "filename",
                  "width"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.inbox"
          ]
        ]
      }
    },
    "photo_station_by_id": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "licenses",
          "title": "Licenses",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of used licenses, might be empty if no photos available"
        },
        {
          "name": "photoBaseUrl",
          "title": "Photo Base Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Base URL of all photos"
        },
        {
          "name": "photographers",
          "title": "Photographers",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of all photographers, might be empty if no photos available"
        },
        {
          "name": "stations",
          "title": "Stations",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of the stations"
        }
      ],
      "id": {
        "field": "id",
        "name": "id",
        "parts": [
          "country",
          "id"
        ],
        "sep": "/"
      },
      "name": "photo_station_by_id",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/photoStationById/{country}/{id}",
              "segments": [
                {
                  "lit": "photoStationById"
                },
                {
                  "var": "country"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "photoStationById",
                "{country}",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  },
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "country",
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "photo_stations_by_country": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "licenses",
          "title": "Licenses",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of used licenses, might be empty if no photos available"
        },
        {
          "name": "photoBaseUrl",
          "title": "Photo Base Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Base URL of all photos"
        },
        {
          "name": "photographers",
          "title": "Photographers",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of all photographers, might be empty if no photos available"
        },
        {
          "name": "stations",
          "title": "Stations",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of the stations"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "photo_stations_by_country",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/photoStationsByCountry/{country}",
              "segments": [
                {
                  "lit": "photoStationsByCountry"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "photoStationsByCountry",
                "{id}"
              ],
              "rename": {
                "param": {
                  "country": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "has_photo",
                    "orig": "has_photo",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  },
                  {
                    "name": "is_active",
                    "orig": "is_active",
                    "type": "`$BOOLEAN`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "has_photo",
                  "id",
                  "is_active"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "photo_stations_by_photographer": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "licenses",
          "title": "Licenses",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of used licenses, might be empty if no photos available"
        },
        {
          "name": "photoBaseUrl",
          "title": "Photo Base Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Base URL of all photos"
        },
        {
          "name": "photographers",
          "title": "Photographers",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of all photographers, might be empty if no photos available"
        },
        {
          "name": "stations",
          "title": "Stations",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of the stations"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "photo_stations_by_photographer",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/photoStationsByPhotographer/{photographer}",
              "segments": [
                {
                  "lit": "photoStationsByPhotographer"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "photoStationsByPhotographer",
                "{id}"
              ],
              "rename": {
                "param": {
                  "photographer": "id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "photographer",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ],
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "country",
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "photo_stations_by_recent_photo_import": {
      "fields": [
        {
          "name": "licenses",
          "title": "Licenses",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of used licenses, might be empty if no photos available"
        },
        {
          "name": "photoBaseUrl",
          "title": "Photo Base Url",
          "type": "`$STRING`",
          "req": true,
          "short": "Base URL of all photos"
        },
        {
          "name": "photographers",
          "title": "Photographers",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of all photographers, might be empty if no photos available"
        },
        {
          "name": "stations",
          "title": "Stations",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of the stations"
        }
      ],
      "name": "photo_stations_by_recent_photo_import",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/photoStationsByRecentPhotoImports",
              "segments": [
                {
                  "lit": "photoStationsByRecentPhotoImports"
                }
              ],
              "parts": [
                "photoStationsByRecentPhotoImports"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "since_hour",
                    "orig": "since_hour",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 10
                  }
                ]
              },
              "select": {
                "exist": [
                  "since_hour"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "photo_upload": {
      "fields": [],
      "name": "photo_upload",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/photoUpload",
              "segments": [
                {
                  "lit": "photoUpload"
                }
              ],
              "parts": [
                "photoUpload"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "active",
                    "orig": "active",
                    "type": "`$BOOLEAN`",
                    "kind": "header"
                  },
                  {
                    "name": "authorization",
                    "orig": "authorization",
                    "type": "`$STRING`",
                    "kind": "header",
                    "reqd": true
                  },
                  {
                    "name": "comment",
                    "orig": "comment",
                    "type": "`$STRING`",
                    "kind": "header"
                  },
                  {
                    "name": "content_type",
                    "orig": "content_type",
                    "type": "`$STRING`",
                    "kind": "header",
                    "reqd": true
                  },
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "header"
                  },
                  {
                    "name": "latitude",
                    "orig": "latitude",
                    "type": "`$NUMBER`",
                    "kind": "header"
                  },
                  {
                    "name": "longitude",
                    "orig": "longitude",
                    "type": "`$NUMBER`",
                    "kind": "header"
                  },
                  {
                    "name": "station_id",
                    "orig": "station_id",
                    "type": "`$STRING`",
                    "kind": "header"
                  },
                  {
                    "name": "station_title",
                    "orig": "station_title",
                    "type": "`$STRING`",
                    "kind": "header"
                  }
                ]
              },
              "select": {
                "exist": [
                  "active",
                  "authorization",
                  "comment",
                  "content_type",
                  "country",
                  "latitude",
                  "longitude",
                  "station_id",
                  "station_title"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "photographer": {
      "fields": [],
      "name": "photographer",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/photographers",
              "segments": [
                {
                  "lit": "photographers"
                }
              ],
              "parts": [
                "photographers"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "country"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "profile": {
      "fields": [
        {
          "name": "admin",
          "title": "Admin",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "anonymous",
          "title": "Anonymous",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "email",
          "title": "Email",
          "type": "`$STRING`",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "format": "email"
        },
        {
          "name": "emailVerified",
          "title": "Email Verified",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "license",
          "title": "License",
          "type": "`$STRING`",
          "req": true,
          "op": {
            "create": {
              "type": "`$STRING`"
            }
          },
          "short": "the only accepted type is \"CC0 1.0 Universell (CC0 1.0)\", the others are listed for backward compatibility"
        },
        {
          "name": "link",
          "title": "Link",
          "type": "`$STRING`",
          "format": "uri"
        },
        {
          "name": "newPassword",
          "title": "New Password",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "nickname",
          "title": "Nickname",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "photoOwner",
          "title": "Photo Owner",
          "type": "`$BOOLEAN`",
          "req": true,
          "op": {
            "create": {
              "type": "`$BOOLEAN`"
            }
          }
        },
        {
          "name": "sendNotifications",
          "title": "Send Notifications",
          "type": "`$BOOLEAN`"
        }
      ],
      "name": "profile",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/changePassword",
              "segments": [
                {
                  "lit": "changePassword"
                }
              ],
              "parts": [
                "changePassword"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "authorization",
                    "orig": "authorization",
                    "type": "`$STRING`",
                    "kind": "header",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "authorization"
                ]
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/myProfile",
              "segments": [
                {
                  "lit": "myProfile"
                }
              ],
              "parts": [
                "myProfile"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "authorization",
                    "orig": "authorization",
                    "type": "`$STRING`",
                    "kind": "header",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "authorization"
                ]
              }
            },
            {
              "kind": "http",
              "method": "POST",
              "orig": "/resendEmailVerification",
              "segments": [
                {
                  "lit": "resendEmailVerification"
                }
              ],
              "parts": [
                "resendEmailVerification"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "authorization",
                    "orig": "authorization",
                    "type": "`$STRING`",
                    "kind": "header",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "authorization"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/myProfile",
              "segments": [
                {
                  "lit": "myProfile"
                }
              ],
              "parts": [
                "myProfile"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "authorization",
                    "orig": "authorization",
                    "type": "`$STRING`",
                    "kind": "header",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "authorization"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/emailVerification/{token}",
              "segments": [
                {
                  "lit": "emailVerification"
                },
                {
                  "var": "token"
                }
              ],
              "parts": [
                "emailVerification",
                "{token}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "token",
                    "orig": "token",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "token"
                ]
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/myProfile",
              "segments": [
                {
                  "lit": "myProfile"
                }
              ],
              "parts": [
                "myProfile"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "header": [
                  {
                    "name": "authorization",
                    "orig": "authorization",
                    "type": "`$STRING`",
                    "kind": "header",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "authorization"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "public_inbox": {
      "fields": [
        {
          "name": "countryCode",
          "title": "Country Code",
          "type": "`$STRING`",
          "short": "a two character country code"
        },
        {
          "name": "lat",
          "title": "Lat",
          "type": "`$NUMBER`",
          "req": true,
          "format": "double"
        },
        {
          "name": "lon",
          "title": "Lon",
          "type": "`$NUMBER`",
          "req": true,
          "format": "double"
        },
        {
          "name": "stationId",
          "title": "Station Id",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "req": true
        }
      ],
      "name": "public_inbox",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/publicInbox",
              "segments": [
                {
                  "lit": "publicInbox"
                }
              ],
              "parts": [
                "publicInbox"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "stat": {
      "fields": [
        {
          "name": "countryCode",
          "title": "Country Code",
          "type": "`$STRING`",
          "short": "an optional two character country code"
        },
        {
          "name": "photographers",
          "title": "Photographers",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int64"
        },
        {
          "name": "total",
          "title": "Total",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int64"
        },
        {
          "name": "withPhoto",
          "title": "With Photo",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int64"
        },
        {
          "name": "withoutPhoto",
          "title": "Without Photo",
          "type": "`$INTEGER`",
          "req": true,
          "format": "int64"
        }
      ],
      "name": "stat",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/stats",
              "segments": [
                {
                  "lit": "stats"
                }
              ],
              "parts": [
                "stats"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "country"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

