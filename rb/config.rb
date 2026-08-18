# RailwayStationPhotos SDK configuration

module RailwayStationPhotosConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "RailwayStationPhotos",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.railway-stations.org",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "admin_inbox" => {},
          "country" => {},
          "inbox" => {},
          "inbox_count" => {},
          "inbox_entry" => {},
          "inbox_state_query" => {},
          "o_auth_token" => {},
          "oauth" => {},
          "photo" => {},
          "photo_download" => {},
          "photo_station" => {},
          "photo_upload" => {},
          "photographer" => {},
          "profile" => {},
          "public_inbox" => {},
          "stat" => {},
        },
      },
      "entity" => {
        "admin_inbox" => {
          "fields" => [
            {
              "name" => "DS100",
              "type" => "`$STRING`",
            },
            {
              "name" => "active",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "command",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "conflictResolution",
              "type" => "`$STRING`",
            },
            {
              "name" => "countryCode",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "lat",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "lon",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "message",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "rejectReason",
              "type" => "`$STRING`",
            },
            {
              "name" => "stationId",
              "type" => "`$STRING`",
            },
            {
              "name" => "status",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "title",
              "type" => "`$STRING`",
            },
          ],
          "name" => "admin_inbox",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "authorization",
                        "orig" => "authorization",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/adminInbox",
                  "parts" => [
                    "adminInbox",
                  ],
                  "select" => {
                    "exist" => [
                      "authorization",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "country" => {
          "fields" => [
            {
              "name" => "active",
              "req" => true,
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "allowPhotoUploads",
              "req" => true,
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "code",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "email",
              "type" => "`$STRING`",
            },
            {
              "name" => "message",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "overrideLicense",
              "type" => "`$STRING`",
            },
            {
              "name" => "providerApps",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "timetableUrlTemplate",
              "type" => "`$STRING`",
            },
          ],
          "name" => "country",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "only_active",
                        "orig" => "only_active",
                        "type" => "`$BOOLEAN`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/countries",
                  "parts" => [
                    "countries",
                  ],
                  "select" => {
                    "exist" => [
                      "only_active",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "inbox" => {
          "fields" => [
            {
              "name" => "comment",
              "type" => "`$STRING`",
            },
            {
              "name" => "countryCode",
              "type" => "`$STRING`",
            },
            {
              "name" => "crc32",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "createdAt",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "filename",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "inboxUrl",
              "type" => "`$STRING`",
            },
            {
              "name" => "lat",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "lon",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "newLat",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "newLon",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "newTitle",
              "type" => "`$STRING`",
            },
            {
              "name" => "problemReportType",
              "type" => "`$STRING`",
            },
            {
              "name" => "rejectedReason",
              "type" => "`$STRING`",
            },
            {
              "name" => "state",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "stationId",
              "type" => "`$STRING`",
            },
            {
              "name" => "title",
              "type" => "`$STRING`",
            },
          ],
          "name" => "inbox",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "authorization",
                        "orig" => "authorization",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/reportProblem",
                  "parts" => [
                    "reportProblem",
                  ],
                  "select" => {
                    "exist" => [
                      "authorization",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "authorization",
                        "orig" => "authorization",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/userInbox",
                  "parts" => [
                    "userInbox",
                  ],
                  "select" => {
                    "exist" => [
                      "authorization",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "authorization",
                        "orig" => "authorization",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "show_completed_entry",
                        "orig" => "show_completed_entry",
                        "type" => "`$BOOLEAN`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/userInbox",
                  "parts" => [
                    "userInbox",
                  ],
                  "select" => {
                    "exist" => [
                      "authorization",
                      "show_completed_entry",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/userInbox/{id}",
                  "parts" => [
                    "userInbox",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "inbox_count" => {
          "fields" => [
            {
              "name" => "pendingInboxEntries",
              "req" => true,
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "inbox_count",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/adminInboxCount",
                  "parts" => [
                    "adminInboxCount",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "inbox_entry" => {
          "fields" => [
            {
              "name" => "active",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "comment",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "countryCode",
              "type" => "`$STRING`",
            },
            {
              "name" => "createdAt",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "done",
              "req" => true,
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "filename",
              "type" => "`$STRING`",
            },
            {
              "name" => "hasConflict",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "hasPhoto",
              "req" => true,
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "id",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "inboxUrl",
              "type" => "`$STRING`",
            },
            {
              "name" => "isProcessed",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "lat",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "lon",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "newLat",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "newLon",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "newTitle",
              "type" => "`$STRING`",
            },
            {
              "name" => "photoId",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "photographerEmail",
              "type" => "`$STRING`",
            },
            {
              "name" => "photographerNickname",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "problemReportType",
              "type" => "`$STRING`",
            },
            {
              "name" => "stationId",
              "type" => "`$STRING`",
            },
            {
              "name" => "title",
              "type" => "`$STRING`",
            },
          ],
          "name" => "inbox_entry",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "authorization",
                        "orig" => "authorization",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/adminInbox",
                  "parts" => [
                    "adminInbox",
                  ],
                  "select" => {
                    "exist" => [
                      "authorization",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "inbox_state_query" => {
          "fields" => [],
          "name" => "inbox_state_query",
          "op" => {},
          "relations" => {
            "ancestors" => [],
          },
        },
        "o_auth_token" => {
          "fields" => [
            {
              "name" => "access_token",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "expires_in",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "refresh_token",
              "type" => "`$STRING`",
            },
            {
              "name" => "scope",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "token_type",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "o_auth_token",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "authorization",
                        "orig" => "authorization",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/oauth2/token",
                  "parts" => [
                    "oauth2",
                    "token",
                  ],
                  "select" => {
                    "exist" => [
                      "authorization",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "oauth" => {
          "fields" => [],
          "name" => "oauth",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "authorization",
                        "orig" => "authorization",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/oauth2/revoke",
                  "parts" => [
                    "oauth2",
                    "revoke",
                  ],
                  "select" => {
                    "exist" => [
                      "authorization",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "client_id",
                        "orig" => "client_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "code_challenge",
                        "orig" => "code_challenge",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "code_challenge_method",
                        "orig" => "code_challenge_method",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "redirect_uri",
                        "orig" => "redirect_uri",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "response_type",
                        "orig" => "response_type",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "scope",
                        "orig" => "scope",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "state",
                        "orig" => "state",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/oauth2/authorize",
                  "parts" => [
                    "oauth2",
                    "authorize",
                  ],
                  "select" => {
                    "exist" => [
                      "client_id",
                      "code_challenge",
                      "code_challenge_method",
                      "redirect_uri",
                      "response_type",
                      "scope",
                      "state",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "photo" => {
          "fields" => [],
          "name" => "photo",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "country",
                        "orig" => "country",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "filename",
                        "orig" => "filename",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "width",
                        "orig" => "width",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/photos/{country}/{filename}",
                  "parts" => [
                    "photos",
                    "{country}",
                    "{filename}",
                  ],
                  "select" => {
                    "exist" => [
                      "country",
                      "filename",
                      "width",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "photo",
              ],
            ],
          },
        },
        "photo_download" => {
          "fields" => [],
          "name" => "photo_download",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "filename",
                        "orig" => "filename",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "width",
                        "orig" => "width",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/inbox/done/{filename}",
                  "parts" => [
                    "inbox",
                    "done",
                    "{filename}",
                  ],
                  "select" => {
                    "exist" => [
                      "filename",
                      "width",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "filename",
                        "orig" => "filename",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "width",
                        "orig" => "width",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/inbox/processed/{filename}",
                  "parts" => [
                    "inbox",
                    "processed",
                    "{filename}",
                  ],
                  "select" => {
                    "exist" => [
                      "filename",
                      "width",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "filename",
                        "orig" => "filename",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "width",
                        "orig" => "width",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/inbox/rejected/{filename}",
                  "parts" => [
                    "inbox",
                    "rejected",
                    "{filename}",
                  ],
                  "select" => {
                    "exist" => [
                      "filename",
                      "width",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "filename",
                        "orig" => "filename",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "width",
                        "orig" => "width",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/inbox/{filename}",
                  "parts" => [
                    "inbox",
                    "{filename}",
                  ],
                  "select" => {
                    "exist" => [
                      "filename",
                      "width",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "done",
              ],
              [
                "processed",
              ],
              [
                "rejected",
              ],
              [
                "inbox",
              ],
            ],
          },
        },
        "photo_station" => {
          "fields" => [
            {
              "name" => "licenses",
              "req" => true,
              "type" => "`$ARRAY`",
            },
            {
              "name" => "photoBaseUrl",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "photographers",
              "req" => true,
              "type" => "`$ARRAY`",
            },
            {
              "name" => "stations",
              "req" => true,
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "photo_station",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "since_hour",
                        "orig" => "since_hour",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/photoStationsByRecentPhotoImports",
                  "parts" => [
                    "photoStationsByRecentPhotoImports",
                  ],
                  "select" => {
                    "exist" => [
                      "since_hour",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "country",
                        "orig" => "country",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "has_photo",
                        "orig" => "has_photo",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "kind" => "query",
                        "name" => "is_active",
                        "orig" => "is_active",
                        "type" => "`$BOOLEAN`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/photoStationsByCountry/{country}",
                  "parts" => [
                    "photoStationsByCountry",
                    "{country}",
                  ],
                  "select" => {
                    "exist" => [
                      "country",
                      "has_photo",
                      "is_active",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "country",
                        "orig" => "country",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/photoStationById/{country}/{id}",
                  "parts" => [
                    "photoStationById",
                    "{country}",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "country",
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "photographer",
                        "orig" => "photographer",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "country",
                        "orig" => "country",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/photoStationsByPhotographer/{photographer}",
                  "parts" => [
                    "photoStationsByPhotographer",
                    "{photographer}",
                  ],
                  "select" => {
                    "exist" => [
                      "country",
                      "photographer",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "photo_station_by_id",
              ],
              [
                "photo_stations_by_country",
              ],
              [
                "photo_stations_by_photographer",
              ],
            ],
          },
        },
        "photo_upload" => {
          "fields" => [],
          "name" => "photo_upload",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "active",
                        "orig" => "active",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "kind" => "header",
                        "name" => "authorization",
                        "orig" => "authorization",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "header",
                        "name" => "comment",
                        "orig" => "comment",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "header",
                        "name" => "content_type",
                        "orig" => "content_type",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "header",
                        "name" => "country",
                        "orig" => "country",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "header",
                        "name" => "latitude",
                        "orig" => "latitude",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "kind" => "header",
                        "name" => "longitude",
                        "orig" => "longitude",
                        "type" => "`$NUMBER`",
                      },
                      {
                        "kind" => "header",
                        "name" => "station_id",
                        "orig" => "station_id",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "header",
                        "name" => "station_title",
                        "orig" => "station_title",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/photoUpload",
                  "parts" => [
                    "photoUpload",
                  ],
                  "select" => {
                    "exist" => [
                      "active",
                      "authorization",
                      "comment",
                      "content_type",
                      "country",
                      "latitude",
                      "longitude",
                      "station_id",
                      "station_title",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "photographer" => {
          "fields" => [],
          "name" => "photographer",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "country",
                        "orig" => "country",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/photographers",
                  "parts" => [
                    "photographers",
                  ],
                  "select" => {
                    "exist" => [
                      "country",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "profile" => {
          "fields" => [
            {
              "name" => "admin",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "anonymous",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "email",
              "op" => {
                "create" => {
                  "req" => true,
                  "type" => "`$STRING`",
                },
              },
              "type" => "`$STRING`",
            },
            {
              "name" => "emailVerified",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "license",
              "op" => {
                "create" => {
                  "type" => "`$STRING`",
                },
              },
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "link",
              "type" => "`$STRING`",
            },
            {
              "name" => "newPassword",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "nickname",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "photoOwner",
              "op" => {
                "create" => {
                  "type" => "`$BOOLEAN`",
                },
              },
              "req" => true,
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "sendNotifications",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "profile",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "authorization",
                        "orig" => "authorization",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/changePassword",
                  "parts" => [
                    "changePassword",
                  ],
                  "select" => {
                    "exist" => [
                      "authorization",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "authorization",
                        "orig" => "authorization",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/myProfile",
                  "parts" => [
                    "myProfile",
                  ],
                  "select" => {
                    "exist" => [
                      "authorization",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "authorization",
                        "orig" => "authorization",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/resendEmailVerification",
                  "parts" => [
                    "resendEmailVerification",
                  ],
                  "select" => {
                    "exist" => [
                      "authorization",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "authorization",
                        "orig" => "authorization",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/myProfile",
                  "parts" => [
                    "myProfile",
                  ],
                  "select" => {
                    "exist" => [
                      "authorization",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "token",
                        "orig" => "token",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/emailVerification/{token}",
                  "parts" => [
                    "emailVerification",
                    "{token}",
                  ],
                  "select" => {
                    "exist" => [
                      "token",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
            "remove" => {
              "input" => "data",
              "name" => "remove",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
                        "kind" => "header",
                        "name" => "authorization",
                        "orig" => "authorization",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "DELETE",
                  "orig" => "/myProfile",
                  "parts" => [
                    "myProfile",
                  ],
                  "select" => {
                    "exist" => [
                      "authorization",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "email_verification",
              ],
            ],
          },
        },
        "public_inbox" => {
          "fields" => [
            {
              "name" => "countryCode",
              "type" => "`$STRING`",
            },
            {
              "name" => "lat",
              "req" => true,
              "type" => "`$NUMBER`",
            },
            {
              "name" => "lon",
              "req" => true,
              "type" => "`$NUMBER`",
            },
            {
              "name" => "stationId",
              "type" => "`$STRING`",
            },
            {
              "name" => "title",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "public_inbox",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/publicInbox",
                  "parts" => [
                    "publicInbox",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "stat" => {
          "fields" => [
            {
              "name" => "countryCode",
              "type" => "`$STRING`",
            },
            {
              "name" => "photographers",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "total",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "withPhoto",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "withoutPhoto",
              "req" => true,
              "type" => "`$INTEGER`",
            },
          ],
          "name" => "stat",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "country",
                        "orig" => "country",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/stats",
                  "parts" => [
                    "stats",
                  ],
                  "select" => {
                    "exist" => [
                      "country",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    RailwayStationPhotosFeatures.make_feature(name)
  end
end
