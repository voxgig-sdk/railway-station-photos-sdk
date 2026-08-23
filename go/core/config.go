package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "RailwayStationPhotos",
			"slug": "railway-station-photos",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.railway-stations.org",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"admin_inbox": map[string]any{},
				"country": map[string]any{},
				"inbox": map[string]any{},
				"inbox_count": map[string]any{},
				"inbox_entry": map[string]any{},
				"inbox_state_query": map[string]any{},
				"o_auth_token": map[string]any{},
				"oauth": map[string]any{},
				"photo": map[string]any{},
				"photo_download": map[string]any{},
				"photo_station": map[string]any{},
				"photo_upload": map[string]any{},
				"photographer": map[string]any{},
				"profile": map[string]any{},
				"public_inbox": map[string]any{},
				"stat": map[string]any{},
			},
		},
		"entity": map[string]any{
			"admin_inbox": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "DS100",
						"short": "DS100 attribute of a new station",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "active",
						"short": "active flag of a new station (default true)",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "command",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "conflictResolution",
						"short": "how to handle conflicts",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "countryCode",
						"short": "a two character country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "lat",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lon",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "message",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rejectReason",
						"short": "explanation of a rejection",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "stationId",
						"short": "ID of a new station",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "title",
						"type": "`$STRING`",
					},
				},
				"name": "admin_inbox",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "authorization",
											"orig": "authorization",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/adminInbox",
								"parts": []any{
									"adminInbox",
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"country": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "active",
						"req": true,
						"short": "Is this an active country where we collect photos?",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "allowPhotoUploads",
						"req": true,
						"short": "Are photo uploads allowed?",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "code",
						"req": true,
						"short": "a two character country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"short": "Contact email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "message",
						"short": "Informational message about this country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"req": true,
						"short": "Name of the country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "overrideLicense",
						"short": "if a country needs a special license",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "providerApps",
						"short": "array with links to provider apps",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "timetableUrlTemplate",
						"short": "URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced",
						"type": "`$STRING`",
					},
				},
				"name": "country",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "only_active",
											"orig": "only_active",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/countries",
								"parts": []any{
									"countries",
								},
								"select": map[string]any{
									"exist": []any{
										"only_active",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"inbox": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "comment",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "countryCode",
						"short": "a two character country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "crc32",
						"short": "CRC32 checksum of the uploaded photo",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "createdAt",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "filename",
						"short": "filename in inbox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "inboxUrl",
						"short": "url of the photo in the inbox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lat",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lon",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "newLat",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "newLon",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "newTitle",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "problemReportType",
						"short": "types of problem reports",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "rejectedReason",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "stationId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"type": "`$STRING`",
					},
				},
				"name": "inbox",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "authorization",
											"orig": "authorization",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/reportProblem",
								"parts": []any{
									"reportProblem",
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "authorization",
											"orig": "authorization",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/userInbox",
								"parts": []any{
									"userInbox",
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "authorization",
											"orig": "authorization",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "show_completed_entry",
											"orig": "show_completed_entry",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/userInbox",
								"parts": []any{
									"userInbox",
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
										"show_completed_entry",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/userInbox/{id}",
								"parts": []any{
									"userInbox",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"inbox_count": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "pendingInboxEntries",
						"req": true,
						"type": "`$INTEGER`",
					},
				},
				"name": "inbox_count",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/adminInboxCount",
								"parts": []any{
									"adminInboxCount",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"inbox_entry": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "active",
						"short": "active flag provided by the user",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "comment",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "countryCode",
						"short": "a two character country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "createdAt",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "done",
						"req": true,
						"short": "true if this photo was already imported or rejected",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "filename",
						"short": "name of the file in inbox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "hasConflict",
						"short": "conflict with another upload or existing photo",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "hasPhoto",
						"req": true,
						"short": "this station has already a photo (conflict)",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "inboxUrl",
						"short": "url of the photo in the inbox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isProcessed",
						"short": "was this image process (e.g.",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "lat",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lon",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "newLat",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "newLon",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "newTitle",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "photoId",
						"short": "ID of the photo",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "photographerEmail",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "photographerNickname",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "problemReportType",
						"short": "types of problem reports",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "stationId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"type": "`$STRING`",
					},
				},
				"name": "inbox_entry",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "authorization",
											"orig": "authorization",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/adminInbox",
								"parts": []any{
									"adminInbox",
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"inbox_state_query": map[string]any{
				"fields": []any{},
				"name": "inbox_state_query",
				"op": map[string]any{},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"o_auth_token": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "access_token",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expires_in",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "refresh_token",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scope",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "token_type",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "o_auth_token",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "authorization",
											"orig": "authorization",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/oauth2/token",
								"parts": []any{
									"oauth2",
									"token",
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"oauth": map[string]any{
				"fields": []any{},
				"name": "oauth",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "authorization",
											"orig": "authorization",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/oauth2/revoke",
								"parts": []any{
									"oauth2",
									"revoke",
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "client_id",
											"orig": "client_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "code_challenge",
											"orig": "code_challenge",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "code_challenge_method",
											"orig": "code_challenge_method",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "redirect_uri",
											"orig": "redirect_uri",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "response_type",
											"orig": "response_type",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "scope",
											"orig": "scope",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/oauth2/authorize",
								"parts": []any{
									"oauth2",
									"authorize",
								},
								"select": map[string]any{
									"exist": []any{
										"client_id",
										"code_challenge",
										"code_challenge_method",
										"redirect_uri",
										"response_type",
										"scope",
										"state",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"photo": map[string]any{
				"fields": []any{},
				"name": "photo",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "country",
											"orig": "country",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "filename",
											"orig": "filename",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/photos/{country}/{filename}",
								"parts": []any{
									"photos",
									"{country}",
									"{filename}",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"filename",
										"width",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"photo",
						},
					},
				},
			},
			"photo_download": map[string]any{
				"fields": []any{},
				"name": "photo_download",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "filename",
											"orig": "filename",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/inbox/done/{filename}",
								"parts": []any{
									"inbox",
									"done",
									"{filename}",
								},
								"select": map[string]any{
									"exist": []any{
										"filename",
										"width",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "filename",
											"orig": "filename",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/inbox/processed/{filename}",
								"parts": []any{
									"inbox",
									"processed",
									"{filename}",
								},
								"select": map[string]any{
									"exist": []any{
										"filename",
										"width",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "filename",
											"orig": "filename",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/inbox/rejected/{filename}",
								"parts": []any{
									"inbox",
									"rejected",
									"{filename}",
								},
								"select": map[string]any{
									"exist": []any{
										"filename",
										"width",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "filename",
											"orig": "filename",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/inbox/{filename}",
								"parts": []any{
									"inbox",
									"{filename}",
								},
								"select": map[string]any{
									"exist": []any{
										"filename",
										"width",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"done",
						},
						[]any{
							"processed",
						},
						[]any{
							"rejected",
						},
						[]any{
							"inbox",
						},
					},
				},
			},
			"photo_station": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "licenses",
						"req": true,
						"short": "List of used licenses, might be empty if no photos available",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "photoBaseUrl",
						"req": true,
						"short": "Base URL of all photos",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "photographers",
						"req": true,
						"short": "List of all photographers, might be empty if no photos available",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "stations",
						"req": true,
						"short": "List of the stations",
						"type": "`$ARRAY`",
					},
				},
				"name": "photo_station",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "since_hour",
											"orig": "since_hour",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/photoStationsByRecentPhotoImports",
								"parts": []any{
									"photoStationsByRecentPhotoImports",
								},
								"select": map[string]any{
									"exist": []any{
										"since_hour",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "country",
											"orig": "country",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "has_photo",
											"orig": "has_photo",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "is_active",
											"orig": "is_active",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/photoStationsByCountry/{country}",
								"parts": []any{
									"photoStationsByCountry",
									"{country}",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"has_photo",
										"is_active",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "country",
											"orig": "country",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/photoStationById/{country}/{id}",
								"parts": []any{
									"photoStationById",
									"{country}",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "photographer",
											"orig": "photographer",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/photoStationsByPhotographer/{photographer}",
								"parts": []any{
									"photoStationsByPhotographer",
									"{photographer}",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"photographer",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"photo_station_by_id",
						},
						[]any{
							"photo_stations_by_country",
						},
						[]any{
							"photo_stations_by_photographer",
						},
					},
				},
			},
			"photo_upload": map[string]any{
				"fields": []any{},
				"name": "photo_upload",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "active",
											"orig": "active",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "header",
											"name": "authorization",
											"orig": "authorization",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "header",
											"name": "comment",
											"orig": "comment",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "header",
											"name": "content_type",
											"orig": "content_type",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "header",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "header",
											"name": "latitude",
											"orig": "latitude",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "header",
											"name": "longitude",
											"orig": "longitude",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "header",
											"name": "station_id",
											"orig": "station_id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "header",
											"name": "station_title",
											"orig": "station_title",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/photoUpload",
								"parts": []any{
									"photoUpload",
								},
								"select": map[string]any{
									"exist": []any{
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"photographer": map[string]any{
				"fields": []any{},
				"name": "photographer",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/photographers",
								"parts": []any{
									"photographers",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"profile": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "admin",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "anonymous",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "email",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "emailVerified",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "license",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"short": "the only accepted type is \"CC0 1.0 Universell (CC0 1.0)\", the others are listed for backward compatibility",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "link",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "newPassword",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nickname",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "photoOwner",
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "sendNotifications",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "profile",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "authorization",
											"orig": "authorization",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/changePassword",
								"parts": []any{
									"changePassword",
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "authorization",
											"orig": "authorization",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/myProfile",
								"parts": []any{
									"myProfile",
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "authorization",
											"orig": "authorization",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/resendEmailVerification",
								"parts": []any{
									"resendEmailVerification",
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "authorization",
											"orig": "authorization",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/myProfile",
								"parts": []any{
									"myProfile",
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "token",
											"orig": "token",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/emailVerification/{token}",
								"parts": []any{
									"emailVerification",
									"{token}",
								},
								"select": map[string]any{
									"exist": []any{
										"token",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"kind": "header",
											"name": "authorization",
											"orig": "authorization",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/myProfile",
								"parts": []any{
									"myProfile",
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"email_verification",
						},
					},
				},
			},
			"public_inbox": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "countryCode",
						"short": "a two character country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lat",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lon",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "stationId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "public_inbox",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/publicInbox",
								"parts": []any{
									"publicInbox",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"stat": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "countryCode",
						"short": "an optional two character country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "photographers",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "total",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "withPhoto",
						"req": true,
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "withoutPhoto",
						"req": true,
						"type": "`$INTEGER`",
					},
				},
				"name": "stat",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/stats",
								"parts": []any{
									"stats",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
