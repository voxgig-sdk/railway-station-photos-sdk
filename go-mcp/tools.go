package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/google/jsonschema-go/jsonschema"
	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/railway-station-photos-sdk/go"
)

// ListArgs is what an agent sends to railway-station-photos_list.
type ListArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: country | inbox | inbox_entry | photo_stations_by_recent_photo_import | public_inbox"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional filter map; omit it for the first page"`
}

// LoadArgs is what an agent sends to railway-station-photos_load.
type LoadArgs struct {
	Entity string         `json:"entity" jsonschema:"one of: done | inbox_count | oauth | photo | photo_download_inbox | photo_station_by_id | photo_stations_by_country | photo_stations_by_photographer | photographer | processed | profile | rejected | stat"`
	Query  map[string]any `json:"query" jsonschema:"match map naming the record, such as {\"id\":1}"`
}

func registerTools(server *mcp.Server, client *sdk.RailwayStationPhotosSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name:        "railway-station-photos_list",
		Description: "List records from RailwayStationPhotos. Args: entity, query (optional filter map; omit it for the first page). Returns the first page of records as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[ListArgs]("country", "inbox", "inbox_entry", "photo_stations_by_recent_photo_import", "public_inbox"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args ListArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "list", args.Entity, args.Query)
	})
	mcp.AddTool(server, &mcp.Tool{
		Name:        "railway-station-photos_load",
		Description: "Load one record from RailwayStationPhotos. Args: entity, query (match map naming the record, such as {\"id\":1}). Returns the record as JSON.",
		Annotations: &mcp.ToolAnnotations{ReadOnlyHint: true},
		InputSchema: entitySchema[LoadArgs]("done", "inbox_count", "oauth", "photo", "photo_download_inbox", "photo_station_by_id", "photo_stations_by_country", "photo_stations_by_photographer", "photographer", "processed", "profile", "rejected", "stat"),
	}, func(ctx context.Context, req *mcp.CallToolRequest, args LoadArgs) (*mcp.CallToolResult, any, error) {
		return runOp(ctx, client, "load", args.Entity, args.Query)
	})
}

// entitySchema is the schema inferred from In, its entity limited to the
// entities the tool serves.
func entitySchema[In any](names ...string) *jsonschema.Schema {
	schema, err := jsonschema.For[In](nil)
	if err != nil {
		panic(err)
	}
	enum := make([]any, len(names))
	for i, name := range names {
		enum[i] = name
	}
	schema.Properties["entity"].Enum = enum
	return schema
}

func runOp(_ context.Context, client *sdk.RailwayStationPhotosSDK, op string, entity string, input map[string]any) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(input, nil)
	case "load":
		result, err = ent.Load(input, nil)
	case "create":
		result, err = ent.Create(input, nil)
	case "update":
		result, err = ent.Update(input, nil)
	case "patch":
		result, err = ent.Patch(input, nil)
	case "remove":
		result, err = ent.Remove(input, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.RailwayStationPhotosSDK, name string) (sdk.RailwayStationPhotosEntityBase, error) {
	switch strings.ToLower(name) {
	case "admin_inbox":
		return client.AdminInbox(nil), nil
	case "country":
		return client.Country(nil), nil
	case "done":
		return client.Done(nil), nil
	case "inbox":
		return client.Inbox(nil), nil
	case "inbox_count":
		return client.InboxCount(nil), nil
	case "inbox_entry":
		return client.InboxEntry(nil), nil
	case "o_auth_token":
		return client.OAuthToken(nil), nil
	case "oauth":
		return client.Oauth(nil), nil
	case "photo":
		return client.Photo(nil), nil
	case "photo_download_inbox":
		return client.PhotoDownloadInbox(nil), nil
	case "photo_station_by_id":
		return client.PhotoStationById(nil), nil
	case "photo_stations_by_country":
		return client.PhotoStationsByCountry(nil), nil
	case "photo_stations_by_photographer":
		return client.PhotoStationsByPhotographer(nil), nil
	case "photo_stations_by_recent_photo_import":
		return client.PhotoStationsByRecentPhotoImport(nil), nil
	case "photo_upload":
		return client.PhotoUpload(nil), nil
	case "photographer":
		return client.Photographer(nil), nil
	case "processed":
		return client.Processed(nil), nil
	case "profile":
		return client.Profile(nil), nil
	case "public_inbox":
		return client.PublicInbox(nil), nil
	case "rejected":
		return client.Rejected(nil), nil
	case "stat":
		return client.Stat(nil), nil
	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}

// hint is an MCP annotation that defaults to true unless stated.
func hint(b bool) *bool {
	return &b
}
