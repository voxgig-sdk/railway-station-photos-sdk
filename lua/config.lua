-- ProjectName SDK configuration

local function make_config()
  return {
    main = {
      name = "RailwayStationPhotos",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.railway-stations.org",
      auth = {
        prefix = "Bearer",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["admin_inbox"] = {},
        ["country"] = {},
        ["inbox"] = {},
        ["inbox_count"] = {},
        ["inbox_entry"] = {},
        ["inbox_state_query"] = {},
        ["o_auth_token"] = {},
        ["oauth"] = {},
        ["photo"] = {},
        ["photo_download"] = {},
        ["photo_station"] = {},
        ["photo_upload"] = {},
        ["photographer"] = {},
        ["profile"] = {},
        ["public_inbox"] = {},
        ["stat"] = {},
      },
    },
    entity = {
      ["admin_inbox"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "active",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "command",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "conflict_resolution",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "country_code",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "ds100",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "lat",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "lon",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "message",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "reject_reason",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "station_id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 10,
          },
          {
            ["active"] = true,
            ["name"] = "status",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 11,
          },
          {
            ["active"] = true,
            ["name"] = "title",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 12,
          },
        },
        ["name"] = "admin_inbox",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["header"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "authorization",
                      ["orig"] = "authorization",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "POST",
                ["orig"] = "/adminInbox",
                ["parts"] = {
                  "adminInbox",
                },
                ["select"] = {
                  ["exist"] = {
                    "authorization",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "create",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["country"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "active",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "allow_photo_upload",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "code",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "email",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "message",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "override_license",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "provider_app",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "timetable_url_template",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 8,
          },
        },
        ["name"] = "country",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "only_active",
                      ["orig"] = "only_active",
                      ["reqd"] = false,
                      ["type"] = "`$BOOLEAN`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/countries",
                ["parts"] = {
                  "countries",
                },
                ["select"] = {
                  ["exist"] = {
                    "only_active",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["inbox"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "comment",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "country_code",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "crc32",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "created_at",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "filename",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "inbox_url",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "lat",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "lon",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "new_lat",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "new_lon",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 10,
          },
          {
            ["active"] = true,
            ["name"] = "new_title",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 11,
          },
          {
            ["active"] = true,
            ["name"] = "problem_report_type",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 12,
          },
          {
            ["active"] = true,
            ["name"] = "rejected_reason",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 13,
          },
          {
            ["active"] = true,
            ["name"] = "state",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 14,
          },
          {
            ["active"] = true,
            ["name"] = "station_id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 15,
          },
          {
            ["active"] = true,
            ["name"] = "title",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 16,
          },
        },
        ["name"] = "inbox",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["header"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "authorization",
                      ["orig"] = "authorization",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "POST",
                ["orig"] = "/reportProblem",
                ["parts"] = {
                  "reportProblem",
                },
                ["select"] = {
                  ["exist"] = {
                    "authorization",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
              {
                ["active"] = true,
                ["args"] = {
                  ["header"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "authorization",
                      ["orig"] = "authorization",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "POST",
                ["orig"] = "/userInbox",
                ["parts"] = {
                  "userInbox",
                },
                ["select"] = {
                  ["exist"] = {
                    "authorization",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 1,
              },
            },
            ["key$"] = "create",
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["header"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "authorization",
                      ["orig"] = "authorization",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "show_completed_entry",
                      ["orig"] = "show_completed_entry",
                      ["reqd"] = false,
                      ["type"] = "`$BOOLEAN`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/userInbox",
                ["parts"] = {
                  "userInbox",
                },
                ["select"] = {
                  ["exist"] = {
                    "authorization",
                    "show_completed_entry",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["method"] = "DELETE",
                ["orig"] = "/userInbox/{id}",
                ["parts"] = {
                  "userInbox",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "remove",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["inbox_count"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "pending_inbox_entry",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 0,
          },
        },
        ["name"] = "inbox_count",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {},
                ["method"] = "GET",
                ["orig"] = "/adminInboxCount",
                ["parts"] = {
                  "adminInboxCount",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["inbox_entry"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "active",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "comment",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "country_code",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "created_at",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "done",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "filename",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "has_conflict",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "has_photo",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "id",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "inbox_url",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 9,
          },
          {
            ["active"] = true,
            ["name"] = "is_processed",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 10,
          },
          {
            ["active"] = true,
            ["name"] = "lat",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 11,
          },
          {
            ["active"] = true,
            ["name"] = "lon",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 12,
          },
          {
            ["active"] = true,
            ["name"] = "new_lat",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 13,
          },
          {
            ["active"] = true,
            ["name"] = "new_lon",
            ["req"] = false,
            ["type"] = "`$NUMBER`",
            ["index$"] = 14,
          },
          {
            ["active"] = true,
            ["name"] = "new_title",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 15,
          },
          {
            ["active"] = true,
            ["name"] = "photo_id",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 16,
          },
          {
            ["active"] = true,
            ["name"] = "photographer_email",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 17,
          },
          {
            ["active"] = true,
            ["name"] = "photographer_nickname",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 18,
          },
          {
            ["active"] = true,
            ["name"] = "problem_report_type",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 19,
          },
          {
            ["active"] = true,
            ["name"] = "station_id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 20,
          },
          {
            ["active"] = true,
            ["name"] = "title",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 21,
          },
        },
        ["name"] = "inbox_entry",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["header"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "authorization",
                      ["orig"] = "authorization",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/adminInbox",
                ["parts"] = {
                  "adminInbox",
                },
                ["select"] = {
                  ["exist"] = {
                    "authorization",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["inbox_state_query"] = {
        ["fields"] = {},
        ["name"] = "inbox_state_query",
        ["op"] = {},
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["o_auth_token"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "access_token",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "expires_in",
            ["req"] = false,
            ["type"] = "`$INTEGER`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "refresh_token",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "scope",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "token_type",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
        },
        ["name"] = "o_auth_token",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["header"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "authorization",
                      ["orig"] = "authorization",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "POST",
                ["orig"] = "/oauth2/token",
                ["parts"] = {
                  "oauth2",
                  "token",
                },
                ["select"] = {
                  ["exist"] = {
                    "authorization",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "create",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["oauth"] = {
        ["fields"] = {},
        ["name"] = "oauth",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["header"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "authorization",
                      ["orig"] = "authorization",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "POST",
                ["orig"] = "/oauth2/revoke",
                ["parts"] = {
                  "oauth2",
                  "revoke",
                },
                ["select"] = {
                  ["exist"] = {
                    "authorization",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "create",
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "client_id",
                      ["orig"] = "client_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "code_challenge",
                      ["orig"] = "code_challenge",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "code_challenge_method",
                      ["orig"] = "code_challenge_method",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "redirect_uri",
                      ["orig"] = "redirect_uri",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "response_type",
                      ["orig"] = "response_type",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "scope",
                      ["orig"] = "scope",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "state",
                      ["orig"] = "state",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/oauth2/authorize",
                ["parts"] = {
                  "oauth2",
                  "authorize",
                },
                ["select"] = {
                  ["exist"] = {
                    "client_id",
                    "code_challenge",
                    "code_challenge_method",
                    "redirect_uri",
                    "response_type",
                    "scope",
                    "state",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["photo"] = {
        ["fields"] = {},
        ["name"] = "photo",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "filename",
                      ["orig"] = "filename",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "width",
                      ["orig"] = "width",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/photos/{country}/{filename}",
                ["parts"] = {
                  "photos",
                  "{country}",
                  "{filename}",
                },
                ["select"] = {
                  ["exist"] = {
                    "country",
                    "filename",
                    "width",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "photo",
            },
          },
        },
      },
      ["photo_download"] = {
        ["fields"] = {},
        ["name"] = "photo_download",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "filename",
                      ["orig"] = "filename",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "width",
                      ["orig"] = "width",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/inbox/done/{filename}",
                ["parts"] = {
                  "inbox",
                  "done",
                  "{filename}",
                },
                ["select"] = {
                  ["exist"] = {
                    "filename",
                    "width",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "filename",
                      ["orig"] = "filename",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "width",
                      ["orig"] = "width",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/inbox/processed/{filename}",
                ["parts"] = {
                  "inbox",
                  "processed",
                  "{filename}",
                },
                ["select"] = {
                  ["exist"] = {
                    "filename",
                    "width",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 1,
              },
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "filename",
                      ["orig"] = "filename",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "width",
                      ["orig"] = "width",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/inbox/rejected/{filename}",
                ["parts"] = {
                  "inbox",
                  "rejected",
                  "{filename}",
                },
                ["select"] = {
                  ["exist"] = {
                    "filename",
                    "width",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 2,
              },
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "filename",
                      ["orig"] = "filename",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "width",
                      ["orig"] = "width",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/inbox/{filename}",
                ["parts"] = {
                  "inbox",
                  "{filename}",
                },
                ["select"] = {
                  ["exist"] = {
                    "filename",
                    "width",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 3,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "done",
            },
            {
              "processed",
            },
            {
              "rejected",
            },
            {
              "inbox",
            },
          },
        },
      },
      ["photo_station"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "license",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "photo_base_url",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "photographer",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "station",
            ["req"] = true,
            ["type"] = "`$ARRAY`",
            ["index$"] = 3,
          },
        },
        ["name"] = "photo_station",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/photoStationById/{country}/{id}",
                ["parts"] = {
                  "photoStationById",
                  "{country}",
                  "{id}",
                },
                ["select"] = {
                  ["exist"] = {
                    "country",
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["example"] = 10,
                      ["kind"] = "query",
                      ["name"] = "since_hour",
                      ["orig"] = "since_hour",
                      ["reqd"] = false,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/photoStationsByRecentPhotoImports",
                ["parts"] = {
                  "photoStationsByRecentPhotoImports",
                },
                ["select"] = {
                  ["exist"] = {
                    "since_hour",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 1,
              },
            },
            ["key$"] = "list",
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "has_photo",
                      ["orig"] = "has_photo",
                      ["reqd"] = false,
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "is_active",
                      ["orig"] = "is_active",
                      ["reqd"] = false,
                      ["type"] = "`$BOOLEAN`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/photoStationsByCountry/{country}",
                ["parts"] = {
                  "photoStationsByCountry",
                  "{country}",
                },
                ["select"] = {
                  ["exist"] = {
                    "country",
                    "has_photo",
                    "is_active",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "photographer",
                      ["orig"] = "photographer",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/photoStationsByPhotographer/{photographer}",
                ["parts"] = {
                  "photoStationsByPhotographer",
                  "{photographer}",
                },
                ["select"] = {
                  ["exist"] = {
                    "country",
                    "photographer",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 1,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "photo_station_by_id",
            },
            {
              "photo_stations_by_country",
            },
            {
              "photo_stations_by_photographer",
            },
          },
        },
      },
      ["photo_upload"] = {
        ["fields"] = {},
        ["name"] = "photo_upload",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["header"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "active",
                      ["orig"] = "active",
                      ["reqd"] = false,
                      ["type"] = "`$BOOLEAN`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "authorization",
                      ["orig"] = "authorization",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "comment",
                      ["orig"] = "comment",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "content_type",
                      ["orig"] = "content_type",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "latitude",
                      ["orig"] = "latitude",
                      ["reqd"] = false,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "longitude",
                      ["orig"] = "longitude",
                      ["reqd"] = false,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "station_id",
                      ["orig"] = "station_id",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "station_title",
                      ["orig"] = "station_title",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "POST",
                ["orig"] = "/photoUpload",
                ["parts"] = {
                  "photoUpload",
                },
                ["select"] = {
                  ["exist"] = {
                    "active",
                    "authorization",
                    "comment",
                    "content_type",
                    "country",
                    "latitude",
                    "longitude",
                    "station_id",
                    "station_title",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "create",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["photographer"] = {
        ["fields"] = {},
        ["name"] = "photographer",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/photographers",
                ["parts"] = {
                  "photographers",
                },
                ["select"] = {
                  ["exist"] = {
                    "country",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["profile"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "admin",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "anonymous",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "email",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "email_verified",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "license",
            ["op"] = {
              ["create"] = {
                ["req"] = false,
                ["type"] = "`$STRING`",
              },
            },
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
          {
            ["active"] = true,
            ["name"] = "link",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 5,
          },
          {
            ["active"] = true,
            ["name"] = "new_password",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 6,
          },
          {
            ["active"] = true,
            ["name"] = "nickname",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 7,
          },
          {
            ["active"] = true,
            ["name"] = "photo_owner",
            ["op"] = {
              ["create"] = {
                ["req"] = false,
                ["type"] = "`$BOOLEAN`",
              },
            },
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 8,
          },
          {
            ["active"] = true,
            ["name"] = "send_notification",
            ["req"] = false,
            ["type"] = "`$BOOLEAN`",
            ["index$"] = 9,
          },
        },
        ["name"] = "profile",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["header"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "authorization",
                      ["orig"] = "authorization",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "POST",
                ["orig"] = "/changePassword",
                ["parts"] = {
                  "changePassword",
                },
                ["select"] = {
                  ["exist"] = {
                    "authorization",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
              {
                ["active"] = true,
                ["args"] = {
                  ["header"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "authorization",
                      ["orig"] = "authorization",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "POST",
                ["orig"] = "/myProfile",
                ["parts"] = {
                  "myProfile",
                },
                ["select"] = {
                  ["exist"] = {
                    "authorization",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 1,
              },
              {
                ["active"] = true,
                ["args"] = {
                  ["header"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "authorization",
                      ["orig"] = "authorization",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "POST",
                ["orig"] = "/resendEmailVerification",
                ["parts"] = {
                  "resendEmailVerification",
                },
                ["select"] = {
                  ["exist"] = {
                    "authorization",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 2,
              },
            },
            ["key$"] = "create",
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["header"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "authorization",
                      ["orig"] = "authorization",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/myProfile",
                ["parts"] = {
                  "myProfile",
                },
                ["select"] = {
                  ["exist"] = {
                    "authorization",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "param",
                      ["name"] = "token",
                      ["orig"] = "token",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/emailVerification/{token}",
                ["parts"] = {
                  "emailVerification",
                  "{token}",
                },
                ["select"] = {
                  ["exist"] = {
                    "token",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 1,
              },
            },
            ["key$"] = "load",
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["header"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "header",
                      ["name"] = "authorization",
                      ["orig"] = "authorization",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "DELETE",
                ["orig"] = "/myProfile",
                ["parts"] = {
                  "myProfile",
                },
                ["select"] = {
                  ["exist"] = {
                    "authorization",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "remove",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "email_verification",
            },
          },
        },
      },
      ["public_inbox"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "country_code",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "lat",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "lon",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "station_id",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "title",
            ["req"] = true,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
        },
        ["name"] = "public_inbox",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {},
                ["method"] = "GET",
                ["orig"] = "/publicInbox",
                ["parts"] = {
                  "publicInbox",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["stat"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "country_code",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "photographer",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "total",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "with_photo",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "without_photo",
            ["req"] = true,
            ["type"] = "`$INTEGER`",
            ["index$"] = 4,
          },
        },
        ["name"] = "stat",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["query"] = {
                    {
                      ["active"] = true,
                      ["kind"] = "query",
                      ["name"] = "country",
                      ["orig"] = "country",
                      ["reqd"] = false,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/stats",
                ["parts"] = {
                  "stats",
                },
                ["select"] = {
                  ["exist"] = {
                    "country",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
