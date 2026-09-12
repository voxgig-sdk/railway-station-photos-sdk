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
        "slug" => "railway-station-photos",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "short" => "DS100 attribute of a new station",
              "type" => "`$STRING`",
            },
            {
              "name" => "active",
              "short" => "active flag of a new station (default true)",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "command",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "conflictResolution",
              "short" => "how to handle conflicts",
              "type" => "`$STRING`",
            },
            {
              "name" => "countryCode",
              "short" => "a two character country code",
              "type" => "`$STRING`",
            },
            {
              "format" => "int64",
              "name" => "id",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "format" => "double",
              "name" => "lat",
              "type" => "`$NUMBER`",
            },
            {
              "format" => "double",
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
              "short" => "explanation of a rejection",
              "type" => "`$STRING`",
            },
            {
              "name" => "stationId",
              "short" => "ID of a new station",
              "type" => "`$STRING`",
            },
            {
              "format" => "int32",
              "name" => "status",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "title",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
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
                  "segments" => [
                    {
                      "lit" => "adminInbox",
                    },
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
                  "parts" => [
                    "adminInbox",
                  ],
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
              "short" => "Is this an active country where we collect photos?",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "allowPhotoUploads",
              "req" => true,
              "short" => "Are photo uploads allowed?",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "code",
              "req" => true,
              "short" => "a two character country code",
              "type" => "`$STRING`",
            },
            {
              "name" => "email",
              "short" => "Contact email address",
              "type" => "`$STRING`",
            },
            {
              "name" => "message",
              "short" => "Informational message about this country",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "req" => true,
              "short" => "Name of the country",
              "type" => "`$STRING`",
            },
            {
              "name" => "overrideLicense",
              "short" => "if a country needs a special license",
              "type" => "`$STRING`",
            },
            {
              "name" => "providerApps",
              "short" => "array with links to provider apps",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "timetableUrlTemplate",
              "short" => "URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced",
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
                  "segments" => [
                    {
                      "lit" => "countries",
                    },
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
                  "parts" => [
                    "countries",
                  ],
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
              "short" => "a two character country code",
              "type" => "`$STRING`",
            },
            {
              "format" => "int64",
              "name" => "crc32",
              "short" => "CRC32 checksum of the uploaded photo",
              "type" => "`$INTEGER`",
            },
            {
              "format" => "int64",
              "name" => "createdAt",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "filename",
              "short" => "filename in inbox",
              "type" => "`$STRING`",
            },
            {
              "format" => "int64",
              "name" => "id",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "inboxUrl",
              "short" => "url of the photo in the inbox",
              "type" => "`$STRING`",
            },
            {
              "format" => "double",
              "name" => "lat",
              "type" => "`$NUMBER`",
            },
            {
              "format" => "double",
              "name" => "lon",
              "type" => "`$NUMBER`",
            },
            {
              "format" => "double",
              "name" => "newLat",
              "type" => "`$NUMBER`",
            },
            {
              "format" => "double",
              "name" => "newLon",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "newTitle",
              "type" => "`$STRING`",
            },
            {
              "name" => "problemReportType",
              "short" => "types of problem reports",
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
          "id" => {
            "field" => "id",
            "name" => "id",
          },
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
                  "segments" => [
                    {
                      "lit" => "reportProblem",
                    },
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
                  "parts" => [
                    "reportProblem",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "userInbox",
                    },
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
                  "parts" => [
                    "userInbox",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "userInbox",
                    },
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
                  "parts" => [
                    "userInbox",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "userInbox",
                    },
                    {
                      "var" => "id",
                    },
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
                  "parts" => [
                    "userInbox",
                    "{id}",
                  ],
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
              "format" => "int64",
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
                  "segments" => [
                    {
                      "lit" => "adminInboxCount",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "adminInboxCount",
                  ],
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
              "short" => "active flag provided by the user",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "comment",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "countryCode",
              "short" => "a two character country code",
              "type" => "`$STRING`",
            },
            {
              "format" => "int64",
              "name" => "createdAt",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "done",
              "req" => true,
              "short" => "true if this photo was already imported or rejected",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "filename",
              "short" => "name of the file in inbox",
              "type" => "`$STRING`",
            },
            {
              "name" => "hasConflict",
              "short" => "conflict with another upload or existing photo",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "hasPhoto",
              "req" => true,
              "short" => "this station has already a photo (conflict)",
              "type" => "`$BOOLEAN`",
            },
            {
              "format" => "int64",
              "name" => "id",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "name" => "inboxUrl",
              "short" => "url of the photo in the inbox",
              "type" => "`$STRING`",
            },
            {
              "name" => "isProcessed",
              "short" => "was this image process (e.g.",
              "type" => "`$BOOLEAN`",
            },
            {
              "format" => "double",
              "name" => "lat",
              "type" => "`$NUMBER`",
            },
            {
              "format" => "double",
              "name" => "lon",
              "type" => "`$NUMBER`",
            },
            {
              "format" => "double",
              "name" => "newLat",
              "type" => "`$NUMBER`",
            },
            {
              "format" => "double",
              "name" => "newLon",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "newTitle",
              "type" => "`$STRING`",
            },
            {
              "format" => "int64",
              "name" => "photoId",
              "short" => "ID of the photo",
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
              "short" => "types of problem reports",
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
          "id" => {
            "field" => "id",
            "name" => "id",
          },
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
                  "segments" => [
                    {
                      "lit" => "adminInbox",
                    },
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
                  "parts" => [
                    "adminInbox",
                  ],
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
              "format" => "int64",
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
                  "segments" => [
                    {
                      "lit" => "oauth2",
                    },
                    {
                      "lit" => "token",
                    },
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
                  "parts" => [
                    "oauth2",
                    "token",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "oauth2",
                    },
                    {
                      "lit" => "revoke",
                    },
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
                  "parts" => [
                    "oauth2",
                    "revoke",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "oauth2",
                    },
                    {
                      "lit" => "authorize",
                    },
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
                  "parts" => [
                    "oauth2",
                    "authorize",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "photo" => {
          "fields" => [
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
            "parts" => [
              "country",
              "filename",
            ],
            "sep" => "/",
          },
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
                  "segments" => [
                    {
                      "lit" => "photos",
                    },
                    {
                      "var" => "country",
                    },
                    {
                      "var" => "filename",
                    },
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
                  "parts" => [
                    "photos",
                    "{country}",
                    "{filename}",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "inbox",
                    },
                    {
                      "lit" => "done",
                    },
                    {
                      "var" => "filename",
                    },
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
                  "parts" => [
                    "inbox",
                    "done",
                    "{filename}",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "inbox",
                    },
                    {
                      "lit" => "processed",
                    },
                    {
                      "var" => "filename",
                    },
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
                  "parts" => [
                    "inbox",
                    "processed",
                    "{filename}",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "inbox",
                    },
                    {
                      "lit" => "rejected",
                    },
                    {
                      "var" => "filename",
                    },
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
                  "parts" => [
                    "inbox",
                    "rejected",
                    "{filename}",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "inbox",
                    },
                    {
                      "var" => "filename",
                    },
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
                  "parts" => [
                    "inbox",
                    "{filename}",
                  ],
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
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "licenses",
              "req" => true,
              "short" => "List of used licenses, might be empty if no photos available",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "photoBaseUrl",
              "req" => true,
              "short" => "Base URL of all photos",
              "type" => "`$STRING`",
            },
            {
              "name" => "photographers",
              "req" => true,
              "short" => "List of all photographers, might be empty if no photos available",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "stations",
              "req" => true,
              "short" => "List of the stations",
              "type" => "`$ARRAY`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
            "parts" => [
              "country",
              "id",
            ],
            "sep" => "/",
          },
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
                  "segments" => [
                    {
                      "lit" => "photoStationsByRecentPhotoImports",
                    },
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
                  "parts" => [
                    "photoStationsByRecentPhotoImports",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "photoStationsByCountry",
                    },
                    {
                      "var" => "country",
                    },
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
                  "parts" => [
                    "photoStationsByCountry",
                    "{country}",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "photoStationById",
                    },
                    {
                      "var" => "country",
                    },
                    {
                      "var" => "id",
                    },
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
                  "parts" => [
                    "photoStationById",
                    "{country}",
                    "{id}",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "photoStationsByPhotographer",
                    },
                    {
                      "var" => "photographer",
                    },
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
                  "parts" => [
                    "photoStationsByPhotographer",
                    "{photographer}",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "photoUpload",
                    },
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
                  "parts" => [
                    "photoUpload",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "photographers",
                    },
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
                  "parts" => [
                    "photographers",
                  ],
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
              "format" => "email",
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
              "short" => "the only accepted type is \"CC0 1.0 Universell (CC0 1.0)\", the others are listed for backward compatibility",
              "type" => "`$STRING`",
            },
            {
              "format" => "uri",
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
                  "segments" => [
                    {
                      "lit" => "changePassword",
                    },
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
                  "parts" => [
                    "changePassword",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "myProfile",
                    },
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
                  "parts" => [
                    "myProfile",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "resendEmailVerification",
                    },
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
                  "parts" => [
                    "resendEmailVerification",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "myProfile",
                    },
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
                  "parts" => [
                    "myProfile",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "emailVerification",
                    },
                    {
                      "var" => "token",
                    },
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
                  "parts" => [
                    "emailVerification",
                    "{token}",
                  ],
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
                  "segments" => [
                    {
                      "lit" => "myProfile",
                    },
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
                  "parts" => [
                    "myProfile",
                  ],
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
              "short" => "a two character country code",
              "type" => "`$STRING`",
            },
            {
              "format" => "double",
              "name" => "lat",
              "req" => true,
              "type" => "`$NUMBER`",
            },
            {
              "format" => "double",
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
                  "segments" => [
                    {
                      "lit" => "publicInbox",
                    },
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "publicInbox",
                  ],
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
              "short" => "an optional two character country code",
              "type" => "`$STRING`",
            },
            {
              "format" => "int64",
              "name" => "photographers",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "format" => "int64",
              "name" => "total",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "format" => "int64",
              "name" => "withPhoto",
              "req" => true,
              "type" => "`$INTEGER`",
            },
            {
              "format" => "int64",
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
                  "segments" => [
                    {
                      "lit" => "stats",
                    },
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
                  "parts" => [
                    "stats",
                  ],
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
