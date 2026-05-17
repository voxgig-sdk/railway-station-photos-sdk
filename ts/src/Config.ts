
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://api.railway-stations.org',

    auth: {
      prefix: 'Bearer',
    },

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

      inbox_state_query: {
      },

      o_auth_token: {
      },

      oauth: {
      },

      photo: {
      },

      photo_download: {
      },

      photo_station: {
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
          "name": "active",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 0
        },
        {
          "name": "command",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "conflict_resolution",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "country_code",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "ds100",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "id",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 5
        },
        {
          "name": "lat",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 6
        },
        {
          "name": "lon",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 7
        },
        {
          "name": "message",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 8
        },
        {
          "name": "reject_reason",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 9
        },
        {
          "name": "station_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 10
        },
        {
          "name": "status",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 11
        },
        {
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 12
        }
      ],
      "name": "admin_inbox",
      "op": {
        "create": {
          "name": "create",
          "points": [
            {
              "args": {
                "header": [
                  {
                    "kind": "header",
                    "name": "authorization",
                    "orig": "authorization",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "POST",
              "orig": "/adminInbox",
              "parts": [
                "adminInbox"
              ],
              "select": {
                "exist": [
                  "authorization"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "create"
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
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 0
        },
        {
          "name": "allow_photo_upload",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 1
        },
        {
          "name": "code",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "email",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "message",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "name",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "override_license",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "provider_app",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 7
        },
        {
          "name": "timetable_url_template",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 8
        }
      ],
      "name": "country",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "only_active",
                    "orig": "only_active",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/countries",
              "parts": [
                "countries"
              ],
              "select": {
                "exist": [
                  "only_active"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
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
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "country_code",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "crc32",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "created_at",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 3
        },
        {
          "name": "filename",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "id",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 5
        },
        {
          "name": "inbox_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "lat",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 7
        },
        {
          "name": "lon",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 8
        },
        {
          "name": "new_lat",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 9
        },
        {
          "name": "new_lon",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 10
        },
        {
          "name": "new_title",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 11
        },
        {
          "name": "problem_report_type",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 12
        },
        {
          "name": "rejected_reason",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 13
        },
        {
          "name": "state",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 14
        },
        {
          "name": "station_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 15
        },
        {
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 16
        }
      ],
      "name": "inbox",
      "op": {
        "create": {
          "name": "create",
          "points": [
            {
              "args": {
                "header": [
                  {
                    "kind": "header",
                    "name": "authorization",
                    "orig": "authorization",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "POST",
              "orig": "/reportProblem",
              "parts": [
                "reportProblem"
              ],
              "select": {
                "exist": [
                  "authorization"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "header": [
                  {
                    "kind": "header",
                    "name": "authorization",
                    "orig": "authorization",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "POST",
              "orig": "/userInbox",
              "parts": [
                "userInbox"
              ],
              "select": {
                "exist": [
                  "authorization"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 1
            }
          ],
          "input": "data",
          "key$": "create"
        },
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "header": [
                  {
                    "kind": "header",
                    "name": "authorization",
                    "orig": "authorization",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "show_completed_entry",
                    "orig": "show_completed_entry",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/userInbox",
              "parts": [
                "userInbox"
              ],
              "select": {
                "exist": [
                  "authorization",
                  "show_completed_entry"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        },
        "remove": {
          "name": "remove",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "DELETE",
              "orig": "/userInbox/{id}",
              "parts": [
                "userInbox",
                "{id}"
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "remove"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "inbox_count": {
      "fields": [
        {
          "name": "pending_inbox_entry",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 0
        }
      ],
      "name": "inbox_count",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "method": "GET",
              "orig": "/adminInboxCount",
              "parts": [
                "adminInboxCount"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 0
        },
        {
          "name": "comment",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "country_code",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "created_at",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 3
        },
        {
          "name": "done",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 4
        },
        {
          "name": "filename",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "has_conflict",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 6
        },
        {
          "name": "has_photo",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 7
        },
        {
          "name": "id",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 8
        },
        {
          "name": "inbox_url",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 9
        },
        {
          "name": "is_processed",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 10
        },
        {
          "name": "lat",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 11
        },
        {
          "name": "lon",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 12
        },
        {
          "name": "new_lat",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 13
        },
        {
          "name": "new_lon",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 14
        },
        {
          "name": "new_title",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 15
        },
        {
          "name": "photo_id",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 16
        },
        {
          "name": "photographer_email",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 17
        },
        {
          "name": "photographer_nickname",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 18
        },
        {
          "name": "problem_report_type",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 19
        },
        {
          "name": "station_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 20
        },
        {
          "name": "title",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 21
        }
      ],
      "name": "inbox_entry",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "header": [
                  {
                    "kind": "header",
                    "name": "authorization",
                    "orig": "authorization",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/adminInbox",
              "parts": [
                "adminInbox"
              ],
              "select": {
                "exist": [
                  "authorization"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "inbox_state_query": {
      "fields": [],
      "name": "inbox_state_query",
      "op": {},
      "relations": {
        "ancestors": []
      }
    },
    "o_auth_token": {
      "fields": [
        {
          "name": "access_token",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "expires_in",
          "req": false,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "refresh_token",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "scope",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "token_type",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        }
      ],
      "name": "o_auth_token",
      "op": {
        "create": {
          "name": "create",
          "points": [
            {
              "args": {
                "header": [
                  {
                    "kind": "header",
                    "name": "authorization",
                    "orig": "authorization",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "POST",
              "orig": "/oauth2/token",
              "parts": [
                "oauth2",
                "token"
              ],
              "select": {
                "exist": [
                  "authorization"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "create"
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
          "name": "create",
          "points": [
            {
              "args": {
                "header": [
                  {
                    "kind": "header",
                    "name": "authorization",
                    "orig": "authorization",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "POST",
              "orig": "/oauth2/revoke",
              "parts": [
                "oauth2",
                "revoke"
              ],
              "select": {
                "exist": [
                  "authorization"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "create"
        },
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "client_id",
                    "orig": "client_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "code_challenge",
                    "orig": "code_challenge",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "code_challenge_method",
                    "orig": "code_challenge_method",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "redirect_uri",
                    "orig": "redirect_uri",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "response_type",
                    "orig": "response_type",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "scope",
                    "orig": "scope",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "state",
                    "orig": "state",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/oauth2/authorize",
              "parts": [
                "oauth2",
                "authorize"
              ],
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
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "photo": {
      "fields": [],
      "name": "photo",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "country",
                    "orig": "country",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "param",
                    "name": "filename",
                    "orig": "filename",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "width",
                    "orig": "width",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/photos/{country}/{filename}",
              "parts": [
                "photos",
                "{country}",
                "{filename}"
              ],
              "select": {
                "exist": [
                  "country",
                  "filename",
                  "width"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "photo"
          ]
        ]
      }
    },
    "photo_download": {
      "fields": [],
      "name": "photo_download",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "filename",
                    "orig": "filename",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "width",
                    "orig": "width",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/inbox/done/{filename}",
              "parts": [
                "inbox",
                "done",
                "{filename}"
              ],
              "select": {
                "exist": [
                  "filename",
                  "width"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "filename",
                    "orig": "filename",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "width",
                    "orig": "width",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/inbox/processed/{filename}",
              "parts": [
                "inbox",
                "processed",
                "{filename}"
              ],
              "select": {
                "exist": [
                  "filename",
                  "width"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 1
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "filename",
                    "orig": "filename",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "width",
                    "orig": "width",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/inbox/rejected/{filename}",
              "parts": [
                "inbox",
                "rejected",
                "{filename}"
              ],
              "select": {
                "exist": [
                  "filename",
                  "width"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 2
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "filename",
                    "orig": "filename",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "width",
                    "orig": "width",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/inbox/{filename}",
              "parts": [
                "inbox",
                "{filename}"
              ],
              "select": {
                "exist": [
                  "filename",
                  "width"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 3
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "done"
          ],
          [
            "processed"
          ],
          [
            "rejected"
          ],
          [
            "inbox"
          ]
        ]
      }
    },
    "photo_station": {
      "fields": [
        {
          "name": "license",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "photo_base_url",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "photographer",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "station",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "photo_station",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "country",
                    "orig": "country",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "param",
                    "name": "id",
                    "orig": "id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/photoStationById/{country}/{id}",
              "parts": [
                "photoStationById",
                "{country}",
                "{id}"
              ],
              "select": {
                "exist": [
                  "country",
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "query": [
                  {
                    "example": 10,
                    "kind": "query",
                    "name": "since_hour",
                    "orig": "since_hour",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/photoStationsByRecentPhotoImports",
              "parts": [
                "photoStationsByRecentPhotoImports"
              ],
              "select": {
                "exist": [
                  "since_hour"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 1
            }
          ],
          "input": "data",
          "key$": "list"
        },
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "country",
                    "orig": "country",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "has_photo",
                    "orig": "has_photo",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "kind": "query",
                    "name": "is_active",
                    "orig": "is_active",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/photoStationsByCountry/{country}",
              "parts": [
                "photoStationsByCountry",
                "{country}"
              ],
              "select": {
                "exist": [
                  "country",
                  "has_photo",
                  "is_active"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "photographer",
                    "orig": "photographer",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "country",
                    "orig": "country",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/photoStationsByPhotographer/{photographer}",
              "parts": [
                "photoStationsByPhotographer",
                "{photographer}"
              ],
              "select": {
                "exist": [
                  "country",
                  "photographer"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 1
            }
          ],
          "input": "data",
          "key$": "load"
        }
      },
      "relations": {
        "ancestors": [
          [
            "photo_station_by_id"
          ],
          [
            "photo_stations_by_country"
          ],
          [
            "photo_stations_by_photographer"
          ]
        ]
      }
    },
    "photo_upload": {
      "fields": [],
      "name": "photo_upload",
      "op": {
        "create": {
          "name": "create",
          "points": [
            {
              "args": {
                "header": [
                  {
                    "kind": "header",
                    "name": "active",
                    "orig": "active",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "kind": "header",
                    "name": "authorization",
                    "orig": "authorization",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "header",
                    "name": "comment",
                    "orig": "comment",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "header",
                    "name": "content_type",
                    "orig": "content_type",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "header",
                    "name": "country",
                    "orig": "country",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "header",
                    "name": "latitude",
                    "orig": "latitude",
                    "reqd": false,
                    "type": "`$NUMBER`",
                    "active": true
                  },
                  {
                    "kind": "header",
                    "name": "longitude",
                    "orig": "longitude",
                    "reqd": false,
                    "type": "`$NUMBER`",
                    "active": true
                  },
                  {
                    "kind": "header",
                    "name": "station_id",
                    "orig": "station_id",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "kind": "header",
                    "name": "station_title",
                    "orig": "station_title",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "POST",
              "orig": "/photoUpload",
              "parts": [
                "photoUpload"
              ],
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
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "create"
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
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "country",
                    "orig": "country",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/photographers",
              "parts": [
                "photographers"
              ],
              "select": {
                "exist": [
                  "country"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 0
        },
        {
          "name": "anonymous",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 1
        },
        {
          "name": "email",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 2
        },
        {
          "name": "email_verified",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 3
        },
        {
          "name": "license",
          "op": {
            "create": {
              "req": false,
              "type": "`$STRING`"
            }
          },
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        },
        {
          "name": "link",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 5
        },
        {
          "name": "new_password",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 6
        },
        {
          "name": "nickname",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 7
        },
        {
          "name": "photo_owner",
          "op": {
            "create": {
              "req": false,
              "type": "`$BOOLEAN`"
            }
          },
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 8
        },
        {
          "name": "send_notification",
          "req": false,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 9
        }
      ],
      "name": "profile",
      "op": {
        "create": {
          "name": "create",
          "points": [
            {
              "args": {
                "header": [
                  {
                    "kind": "header",
                    "name": "authorization",
                    "orig": "authorization",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "POST",
              "orig": "/changePassword",
              "parts": [
                "changePassword"
              ],
              "select": {
                "exist": [
                  "authorization"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "header": [
                  {
                    "kind": "header",
                    "name": "authorization",
                    "orig": "authorization",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "POST",
              "orig": "/myProfile",
              "parts": [
                "myProfile"
              ],
              "select": {
                "exist": [
                  "authorization"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 1
            },
            {
              "args": {
                "header": [
                  {
                    "kind": "header",
                    "name": "authorization",
                    "orig": "authorization",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "POST",
              "orig": "/resendEmailVerification",
              "parts": [
                "resendEmailVerification"
              ],
              "select": {
                "exist": [
                  "authorization"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 2
            }
          ],
          "input": "data",
          "key$": "create"
        },
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "header": [
                  {
                    "kind": "header",
                    "name": "authorization",
                    "orig": "authorization",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/myProfile",
              "parts": [
                "myProfile"
              ],
              "select": {
                "exist": [
                  "authorization"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "params": [
                  {
                    "kind": "param",
                    "name": "token",
                    "orig": "token",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/emailVerification/{token}",
              "parts": [
                "emailVerification",
                "{token}"
              ],
              "select": {
                "exist": [
                  "token"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 1
            }
          ],
          "input": "data",
          "key$": "load"
        },
        "remove": {
          "name": "remove",
          "points": [
            {
              "args": {
                "header": [
                  {
                    "kind": "header",
                    "name": "authorization",
                    "orig": "authorization",
                    "reqd": true,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "DELETE",
              "orig": "/myProfile",
              "parts": [
                "myProfile"
              ],
              "select": {
                "exist": [
                  "authorization"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "remove"
        }
      },
      "relations": {
        "ancestors": [
          [
            "email_verification"
          ]
        ]
      }
    },
    "public_inbox": {
      "fields": [
        {
          "name": "country_code",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "lat",
          "req": true,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "lon",
          "req": true,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "station_id",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "title",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 4
        }
      ],
      "name": "public_inbox",
      "op": {
        "list": {
          "name": "list",
          "points": [
            {
              "method": "GET",
              "orig": "/publicInbox",
              "parts": [
                "publicInbox"
              ],
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "args": {},
              "select": {},
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "stat": {
      "fields": [
        {
          "name": "country_code",
          "req": false,
          "type": "`$STRING`",
          "active": true,
          "index$": 0
        },
        {
          "name": "photographer",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 1
        },
        {
          "name": "total",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "with_photo",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 3
        },
        {
          "name": "without_photo",
          "req": true,
          "type": "`$INTEGER`",
          "active": true,
          "index$": 4
        }
      ],
      "name": "stat",
      "op": {
        "load": {
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "country",
                    "orig": "country",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/stats",
              "parts": [
                "stats"
              ],
              "select": {
                "exist": [
                  "country"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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
  config
}

