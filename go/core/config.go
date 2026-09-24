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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
				"o_auth_token": map[string]any{},
				"oauth": map[string]any{},
				"photo": map[string]any{},
				"photo_download": map[string]any{},
				"photo_station_by_id": map[string]any{},
				"photo_stations_by_country": map[string]any{},
				"photo_stations_by_photographer": map[string]any{},
				"photo_stations_by_recent_photo_import": map[string]any{},
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
						"title": "Ds100",
						"type": "`$STRING`",
						"short": "DS100 attribute of a new station",
					},
					map[string]any{
						"name": "active",
						"title": "Active",
						"type": "`$BOOLEAN`",
						"short": "active flag of a new station (default true)",
					},
					map[string]any{
						"name": "command",
						"title": "Command",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "conflictResolution",
						"title": "Conflict Resolution",
						"type": "`$STRING`",
						"short": "how to handle conflicts",
					},
					map[string]any{
						"name": "countryCode",
						"title": "Country Code",
						"type": "`$STRING`",
						"short": "a two character country code",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int64",
					},
					map[string]any{
						"name": "lat",
						"title": "Lat",
						"type": "`$NUMBER`",
						"format": "double",
					},
					map[string]any{
						"name": "lon",
						"title": "Lon",
						"type": "`$NUMBER`",
						"format": "double",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "rejectReason",
						"title": "Reject Reason",
						"type": "`$STRING`",
						"short": "explanation of a rejection",
					},
					map[string]any{
						"name": "stationId",
						"title": "Station Id",
						"type": "`$STRING`",
						"short": "ID of a new station",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int32",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "admin_inbox",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/adminInbox",
								"segments": []any{
									map[string]any{
										"lit": "adminInbox",
									},
								},
								"parts": []any{
									"adminInbox",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
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
						"title": "Active",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Is this an active country where we collect photos?",
					},
					map[string]any{
						"name": "allowPhotoUploads",
						"title": "Allow Photo Uploads",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "Are photo uploads allowed?",
					},
					map[string]any{
						"name": "code",
						"title": "Code",
						"type": "`$STRING`",
						"req": true,
						"short": "a two character country code",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"short": "Contact email address",
					},
					map[string]any{
						"name": "message",
						"title": "Message",
						"type": "`$STRING`",
						"short": "Informational message about this country",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Name of the country",
					},
					map[string]any{
						"name": "overrideLicense",
						"title": "Override License",
						"type": "`$STRING`",
						"short": "if a country needs a special license",
					},
					map[string]any{
						"name": "providerApps",
						"title": "Provider Apps",
						"type": "`$ARRAY`",
						"short": "array with links to provider apps",
					},
					map[string]any{
						"name": "timetableUrlTemplate",
						"title": "Timetable Url Template",
						"type": "`$STRING`",
						"short": "URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced",
					},
				},
				"name": "country",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/countries",
								"segments": []any{
									map[string]any{
										"lit": "countries",
									},
								},
								"parts": []any{
									"countries",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "only_active",
											"orig": "only_active",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"only_active",
									},
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
						"title": "Comment",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "countryCode",
						"title": "Country Code",
						"type": "`$STRING`",
						"short": "a two character country code",
					},
					map[string]any{
						"name": "crc32",
						"title": "Crc32",
						"type": "`$INTEGER`",
						"short": "CRC32 checksum of the uploaded photo",
						"format": "int64",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$INTEGER`",
						"format": "int64",
					},
					map[string]any{
						"name": "filename",
						"title": "Filename",
						"type": "`$STRING`",
						"short": "filename in inbox",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int64",
					},
					map[string]any{
						"name": "inboxUrl",
						"title": "Inbox Url",
						"type": "`$STRING`",
						"short": "url of the photo in the inbox",
					},
					map[string]any{
						"name": "lat",
						"title": "Lat",
						"type": "`$NUMBER`",
						"format": "double",
					},
					map[string]any{
						"name": "lon",
						"title": "Lon",
						"type": "`$NUMBER`",
						"format": "double",
					},
					map[string]any{
						"name": "newLat",
						"title": "New Lat",
						"type": "`$NUMBER`",
						"format": "double",
					},
					map[string]any{
						"name": "newLon",
						"title": "New Lon",
						"type": "`$NUMBER`",
						"format": "double",
					},
					map[string]any{
						"name": "newTitle",
						"title": "New Title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "problemReportType",
						"title": "Problem Report Type",
						"type": "`$STRING`",
						"short": "types of problem reports",
					},
					map[string]any{
						"name": "rejectedReason",
						"title": "Rejected Reason",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "stationId",
						"title": "Station Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "inbox",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/reportProblem",
								"segments": []any{
									map[string]any{
										"lit": "reportProblem",
									},
								},
								"parts": []any{
									"reportProblem",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/userInbox",
								"segments": []any{
									map[string]any{
										"lit": "userInbox",
									},
								},
								"parts": []any{
									"userInbox",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/userInbox",
								"segments": []any{
									map[string]any{
										"lit": "userInbox",
									},
								},
								"parts": []any{
									"userInbox",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "show_completed_entry",
											"orig": "show_completed_entry",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
										"show_completed_entry",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/userInbox/{id}",
								"segments": []any{
									map[string]any{
										"lit": "userInbox",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"userInbox",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Pending Inbox Entries",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int64",
					},
				},
				"name": "inbox_count",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/adminInboxCount",
								"segments": []any{
									map[string]any{
										"lit": "adminInboxCount",
									},
								},
								"parts": []any{
									"adminInboxCount",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Active",
						"type": "`$BOOLEAN`",
						"short": "active flag provided by the user",
					},
					map[string]any{
						"name": "comment",
						"title": "Comment",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "countryCode",
						"title": "Country Code",
						"type": "`$STRING`",
						"short": "a two character country code",
					},
					map[string]any{
						"name": "createdAt",
						"title": "Created At",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int64",
					},
					map[string]any{
						"name": "done",
						"title": "Done",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "true if this photo was already imported or rejected",
					},
					map[string]any{
						"name": "filename",
						"title": "Filename",
						"type": "`$STRING`",
						"short": "name of the file in inbox",
					},
					map[string]any{
						"name": "hasConflict",
						"title": "Has Conflict",
						"type": "`$BOOLEAN`",
						"short": "conflict with another upload or existing photo",
					},
					map[string]any{
						"name": "hasPhoto",
						"title": "Has Photo",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "this station has already a photo (conflict)",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int64",
					},
					map[string]any{
						"name": "inboxUrl",
						"title": "Inbox Url",
						"type": "`$STRING`",
						"short": "url of the photo in the inbox",
					},
					map[string]any{
						"name": "isProcessed",
						"title": "Is Processed",
						"type": "`$BOOLEAN`",
						"short": "was this image process (e.g.",
					},
					map[string]any{
						"name": "lat",
						"title": "Lat",
						"type": "`$NUMBER`",
						"format": "double",
					},
					map[string]any{
						"name": "lon",
						"title": "Lon",
						"type": "`$NUMBER`",
						"format": "double",
					},
					map[string]any{
						"name": "newLat",
						"title": "New Lat",
						"type": "`$NUMBER`",
						"format": "double",
					},
					map[string]any{
						"name": "newLon",
						"title": "New Lon",
						"type": "`$NUMBER`",
						"format": "double",
					},
					map[string]any{
						"name": "newTitle",
						"title": "New Title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "photoId",
						"title": "Photo Id",
						"type": "`$INTEGER`",
						"short": "ID of the photo",
						"format": "int64",
					},
					map[string]any{
						"name": "photographerEmail",
						"title": "Photographer Email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "photographerNickname",
						"title": "Photographer Nickname",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "problemReportType",
						"title": "Problem Report Type",
						"type": "`$STRING`",
						"short": "types of problem reports",
					},
					map[string]any{
						"name": "stationId",
						"title": "Station Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "inbox_entry",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/adminInbox",
								"segments": []any{
									map[string]any{
										"lit": "adminInbox",
									},
								},
								"parts": []any{
									"adminInbox",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"o_auth_token": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "access_token",
						"title": "Access Token",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "expires_in",
						"title": "Expires In",
						"type": "`$INTEGER`",
						"format": "int64",
					},
					map[string]any{
						"name": "refresh_token",
						"title": "Refresh Token",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "scope",
						"title": "Scope",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "token_type",
						"title": "Token Type",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "o_auth_token",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/oauth2/token",
								"segments": []any{
									map[string]any{
										"lit": "oauth2",
									},
									map[string]any{
										"lit": "token",
									},
								},
								"parts": []any{
									"oauth2",
									"token",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
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
								"kind": "http",
								"method": "POST",
								"orig": "/oauth2/revoke",
								"segments": []any{
									map[string]any{
										"lit": "oauth2",
									},
									map[string]any{
										"lit": "revoke",
									},
								},
								"parts": []any{
									"oauth2",
									"revoke",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/oauth2/authorize",
								"segments": []any{
									map[string]any{
										"lit": "oauth2",
									},
									map[string]any{
										"lit": "authorize",
									},
								},
								"parts": []any{
									"oauth2",
									"authorize",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "client_id",
											"orig": "client_id",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "code_challenge",
											"orig": "code_challenge",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "code_challenge_method",
											"orig": "code_challenge_method",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "redirect_uri",
											"orig": "redirect_uri",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "response_type",
											"orig": "response_type",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "scope",
											"orig": "scope",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "state",
											"orig": "state",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"photo": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
					"parts": []any{
						"country",
						"filename",
					},
					"sep": "/",
				},
				"name": "photo",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/photos/{country}/{filename}",
								"segments": []any{
									map[string]any{
										"lit": "photos",
									},
									map[string]any{
										"var": "country",
									},
									map[string]any{
										"var": "filename",
									},
								},
								"parts": []any{
									"photos",
									"{country}",
									"{filename}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "filename",
											"orig": "filename",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"filename",
										"width",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
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
								"kind": "http",
								"method": "GET",
								"orig": "/inbox/done/{filename}",
								"segments": []any{
									map[string]any{
										"lit": "inbox",
									},
									map[string]any{
										"lit": "done",
									},
									map[string]any{
										"var": "filename",
									},
								},
								"parts": []any{
									"inbox",
									"done",
									"{filename}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "filename",
											"orig": "filename",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filename",
										"width",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/inbox/processed/{filename}",
								"segments": []any{
									map[string]any{
										"lit": "inbox",
									},
									map[string]any{
										"lit": "processed",
									},
									map[string]any{
										"var": "filename",
									},
								},
								"parts": []any{
									"inbox",
									"processed",
									"{filename}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "filename",
											"orig": "filename",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filename",
										"width",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/inbox/rejected/{filename}",
								"segments": []any{
									map[string]any{
										"lit": "inbox",
									},
									map[string]any{
										"lit": "rejected",
									},
									map[string]any{
										"var": "filename",
									},
								},
								"parts": []any{
									"inbox",
									"rejected",
									"{filename}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "filename",
											"orig": "filename",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filename",
										"width",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/inbox/{filename}",
								"segments": []any{
									map[string]any{
										"lit": "inbox",
									},
									map[string]any{
										"var": "filename",
									},
								},
								"parts": []any{
									"inbox",
									"{filename}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "filename",
											"orig": "filename",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "width",
											"orig": "width",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"filename",
										"width",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.inbox",
						},
					},
				},
			},
			"photo_station_by_id": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "licenses",
						"title": "Licenses",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of used licenses, might be empty if no photos available",
					},
					map[string]any{
						"name": "photoBaseUrl",
						"title": "Photo Base Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Base URL of all photos",
					},
					map[string]any{
						"name": "photographers",
						"title": "Photographers",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of all photographers, might be empty if no photos available",
					},
					map[string]any{
						"name": "stations",
						"title": "Stations",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of the stations",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
					"parts": []any{
						"country",
						"id",
					},
					"sep": "/",
				},
				"name": "photo_station_by_id",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/photoStationById/{country}/{id}",
								"segments": []any{
									map[string]any{
										"lit": "photoStationById",
									},
									map[string]any{
										"var": "country",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"photoStationById",
									"{country}",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"photo_stations_by_country": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "licenses",
						"title": "Licenses",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of used licenses, might be empty if no photos available",
					},
					map[string]any{
						"name": "photoBaseUrl",
						"title": "Photo Base Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Base URL of all photos",
					},
					map[string]any{
						"name": "photographers",
						"title": "Photographers",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of all photographers, might be empty if no photos available",
					},
					map[string]any{
						"name": "stations",
						"title": "Stations",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of the stations",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "photo_stations_by_country",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/photoStationsByCountry/{country}",
								"segments": []any{
									map[string]any{
										"lit": "photoStationsByCountry",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"photoStationsByCountry",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"country": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "has_photo",
											"orig": "has_photo",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "is_active",
											"orig": "is_active",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"has_photo",
										"id",
										"is_active",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"photo_stations_by_photographer": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "licenses",
						"title": "Licenses",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of used licenses, might be empty if no photos available",
					},
					map[string]any{
						"name": "photoBaseUrl",
						"title": "Photo Base Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Base URL of all photos",
					},
					map[string]any{
						"name": "photographers",
						"title": "Photographers",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of all photographers, might be empty if no photos available",
					},
					map[string]any{
						"name": "stations",
						"title": "Stations",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of the stations",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "photo_stations_by_photographer",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/photoStationsByPhotographer/{photographer}",
								"segments": []any{
									map[string]any{
										"lit": "photoStationsByPhotographer",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"photoStationsByPhotographer",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"photographer": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "photographer",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"photo_stations_by_recent_photo_import": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "licenses",
						"title": "Licenses",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of used licenses, might be empty if no photos available",
					},
					map[string]any{
						"name": "photoBaseUrl",
						"title": "Photo Base Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Base URL of all photos",
					},
					map[string]any{
						"name": "photographers",
						"title": "Photographers",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of all photographers, might be empty if no photos available",
					},
					map[string]any{
						"name": "stations",
						"title": "Stations",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of the stations",
					},
				},
				"name": "photo_stations_by_recent_photo_import",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/photoStationsByRecentPhotoImports",
								"segments": []any{
									map[string]any{
										"lit": "photoStationsByRecentPhotoImports",
									},
								},
								"parts": []any{
									"photoStationsByRecentPhotoImports",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "since_hour",
											"orig": "since_hour",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"since_hour",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
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
								"kind": "http",
								"method": "POST",
								"orig": "/photoUpload",
								"segments": []any{
									map[string]any{
										"lit": "photoUpload",
									},
								},
								"parts": []any{
									"photoUpload",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "active",
											"orig": "active",
											"type": "`$BOOLEAN`",
											"kind": "header",
										},
										map[string]any{
											"name": "authorization",
											"orig": "authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
										map[string]any{
											"name": "comment",
											"orig": "comment",
											"type": "`$STRING`",
											"kind": "header",
										},
										map[string]any{
											"name": "content_type",
											"orig": "content_type",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "header",
										},
										map[string]any{
											"name": "latitude",
											"orig": "latitude",
											"type": "`$NUMBER`",
											"kind": "header",
										},
										map[string]any{
											"name": "longitude",
											"orig": "longitude",
											"type": "`$NUMBER`",
											"kind": "header",
										},
										map[string]any{
											"name": "station_id",
											"orig": "station_id",
											"type": "`$STRING`",
											"kind": "header",
										},
										map[string]any{
											"name": "station_title",
											"orig": "station_title",
											"type": "`$STRING`",
											"kind": "header",
										},
									},
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
								"kind": "http",
								"method": "GET",
								"orig": "/photographers",
								"segments": []any{
									map[string]any{
										"lit": "photographers",
									},
								},
								"parts": []any{
									"photographers",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country",
									},
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
						"title": "Admin",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "anonymous",
						"title": "Anonymous",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"format": "email",
					},
					map[string]any{
						"name": "emailVerified",
						"title": "Email Verified",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "license",
						"title": "License",
						"type": "`$STRING`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$STRING`",
							},
						},
						"short": "the only accepted type is \"CC0 1.0 Universell (CC0 1.0)\", the others are listed for backward compatibility",
					},
					map[string]any{
						"name": "link",
						"title": "Link",
						"type": "`$STRING`",
						"format": "uri",
					},
					map[string]any{
						"name": "newPassword",
						"title": "New Password",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "nickname",
						"title": "Nickname",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "photoOwner",
						"title": "Photo Owner",
						"type": "`$BOOLEAN`",
						"req": true,
						"op": map[string]any{
							"create": map[string]any{
								"type": "`$BOOLEAN`",
							},
						},
					},
					map[string]any{
						"name": "sendNotifications",
						"title": "Send Notifications",
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
								"kind": "http",
								"method": "POST",
								"orig": "/changePassword",
								"segments": []any{
									map[string]any{
										"lit": "changePassword",
									},
								},
								"parts": []any{
									"changePassword",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/myProfile",
								"segments": []any{
									map[string]any{
										"lit": "myProfile",
									},
								},
								"parts": []any{
									"myProfile",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/resendEmailVerification",
								"segments": []any{
									map[string]any{
										"lit": "resendEmailVerification",
									},
								},
								"parts": []any{
									"resendEmailVerification",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/myProfile",
								"segments": []any{
									map[string]any{
										"lit": "myProfile",
									},
								},
								"parts": []any{
									"myProfile",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/emailVerification/{token}",
								"segments": []any{
									map[string]any{
										"lit": "emailVerification",
									},
									map[string]any{
										"var": "token",
									},
								},
								"parts": []any{
									"emailVerification",
									"{token}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "token",
											"orig": "token",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"token",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/myProfile",
								"segments": []any{
									map[string]any{
										"lit": "myProfile",
									},
								},
								"parts": []any{
									"myProfile",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "authorization",
											"orig": "authorization",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"authorization",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"public_inbox": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "countryCode",
						"title": "Country Code",
						"type": "`$STRING`",
						"short": "a two character country code",
					},
					map[string]any{
						"name": "lat",
						"title": "Lat",
						"type": "`$NUMBER`",
						"req": true,
						"format": "double",
					},
					map[string]any{
						"name": "lon",
						"title": "Lon",
						"type": "`$NUMBER`",
						"req": true,
						"format": "double",
					},
					map[string]any{
						"name": "stationId",
						"title": "Station Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "public_inbox",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/publicInbox",
								"segments": []any{
									map[string]any{
										"lit": "publicInbox",
									},
								},
								"parts": []any{
									"publicInbox",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
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
						"title": "Country Code",
						"type": "`$STRING`",
						"short": "an optional two character country code",
					},
					map[string]any{
						"name": "photographers",
						"title": "Photographers",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int64",
					},
					map[string]any{
						"name": "total",
						"title": "Total",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int64",
					},
					map[string]any{
						"name": "withPhoto",
						"title": "With Photo",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int64",
					},
					map[string]any{
						"name": "withoutPhoto",
						"title": "Without Photo",
						"type": "`$INTEGER`",
						"req": true,
						"format": "int64",
					},
				},
				"name": "stat",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/stats",
								"segments": []any{
									map[string]any{
										"lit": "stats",
									},
								},
								"parts": []any{
									"stats",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country",
									},
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
