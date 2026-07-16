package core

import (
	"fmt"

	vs "github.com/voxgig-sdk/railway-station-photos-sdk/go/utility/struct"
)

type RailwayStationPhotosSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewRailwayStationPhotosSDK(options map[string]any) *RailwayStationPhotosSDK {
	sdk := &RailwayStationPhotosSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := MakeConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath([]any{"feature", "test", "active"}, sdk.options) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath([]any{"__derived__", "featureorder"}, sdk.options).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *RailwayStationPhotosSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *RailwayStationPhotosSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *RailwayStationPhotosSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *RailwayStationPhotosSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

func (sdk *RailwayStationPhotosSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}


// AdminInbox returns a AdminInbox entity bound to this client.
// Idiomatic usage: client.AdminInbox(nil).List(nil, nil) or
// client.AdminInbox(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *RailwayStationPhotosSDK) AdminInbox(data map[string]any) RailwayStationPhotosEntity {
	return NewAdminInboxEntityFunc(sdk, data)
}


// Country returns a Country entity bound to this client.
// Idiomatic usage: client.Country(nil).List(nil, nil) or
// client.Country(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *RailwayStationPhotosSDK) Country(data map[string]any) RailwayStationPhotosEntity {
	return NewCountryEntityFunc(sdk, data)
}


// Inbox returns a Inbox entity bound to this client.
// Idiomatic usage: client.Inbox(nil).List(nil, nil) or
// client.Inbox(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *RailwayStationPhotosSDK) Inbox(data map[string]any) RailwayStationPhotosEntity {
	return NewInboxEntityFunc(sdk, data)
}


// InboxCount returns a InboxCount entity bound to this client.
// Idiomatic usage: client.InboxCount(nil).List(nil, nil) or
// client.InboxCount(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *RailwayStationPhotosSDK) InboxCount(data map[string]any) RailwayStationPhotosEntity {
	return NewInboxCountEntityFunc(sdk, data)
}


// InboxEntry returns a InboxEntry entity bound to this client.
// Idiomatic usage: client.InboxEntry(nil).List(nil, nil) or
// client.InboxEntry(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *RailwayStationPhotosSDK) InboxEntry(data map[string]any) RailwayStationPhotosEntity {
	return NewInboxEntryEntityFunc(sdk, data)
}


// InboxStateQuery returns a InboxStateQuery entity bound to this client.
// Idiomatic usage: client.InboxStateQuery(nil).List(nil, nil) or
// client.InboxStateQuery(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *RailwayStationPhotosSDK) InboxStateQuery(data map[string]any) RailwayStationPhotosEntity {
	return NewInboxStateQueryEntityFunc(sdk, data)
}


// OAuthToken returns a OAuthToken entity bound to this client.
// Idiomatic usage: client.OAuthToken(nil).List(nil, nil) or
// client.OAuthToken(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *RailwayStationPhotosSDK) OAuthToken(data map[string]any) RailwayStationPhotosEntity {
	return NewOAuthTokenEntityFunc(sdk, data)
}


// Oauth returns a Oauth entity bound to this client.
// Idiomatic usage: client.Oauth(nil).List(nil, nil) or
// client.Oauth(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *RailwayStationPhotosSDK) Oauth(data map[string]any) RailwayStationPhotosEntity {
	return NewOauthEntityFunc(sdk, data)
}


// Photo returns a Photo entity bound to this client.
// Idiomatic usage: client.Photo(nil).List(nil, nil) or
// client.Photo(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *RailwayStationPhotosSDK) Photo(data map[string]any) RailwayStationPhotosEntity {
	return NewPhotoEntityFunc(sdk, data)
}


// PhotoDownload returns a PhotoDownload entity bound to this client.
// Idiomatic usage: client.PhotoDownload(nil).List(nil, nil) or
// client.PhotoDownload(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *RailwayStationPhotosSDK) PhotoDownload(data map[string]any) RailwayStationPhotosEntity {
	return NewPhotoDownloadEntityFunc(sdk, data)
}


// PhotoStation returns a PhotoStation entity bound to this client.
// Idiomatic usage: client.PhotoStation(nil).List(nil, nil) or
// client.PhotoStation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *RailwayStationPhotosSDK) PhotoStation(data map[string]any) RailwayStationPhotosEntity {
	return NewPhotoStationEntityFunc(sdk, data)
}


// PhotoUpload returns a PhotoUpload entity bound to this client.
// Idiomatic usage: client.PhotoUpload(nil).List(nil, nil) or
// client.PhotoUpload(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *RailwayStationPhotosSDK) PhotoUpload(data map[string]any) RailwayStationPhotosEntity {
	return NewPhotoUploadEntityFunc(sdk, data)
}


// Photographer returns a Photographer entity bound to this client.
// Idiomatic usage: client.Photographer(nil).List(nil, nil) or
// client.Photographer(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *RailwayStationPhotosSDK) Photographer(data map[string]any) RailwayStationPhotosEntity {
	return NewPhotographerEntityFunc(sdk, data)
}


// Profile returns a Profile entity bound to this client.
// Idiomatic usage: client.Profile(nil).List(nil, nil) or
// client.Profile(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *RailwayStationPhotosSDK) Profile(data map[string]any) RailwayStationPhotosEntity {
	return NewProfileEntityFunc(sdk, data)
}


// PublicInbox returns a PublicInbox entity bound to this client.
// Idiomatic usage: client.PublicInbox(nil).List(nil, nil) or
// client.PublicInbox(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *RailwayStationPhotosSDK) PublicInbox(data map[string]any) RailwayStationPhotosEntity {
	return NewPublicInboxEntityFunc(sdk, data)
}


// Stat returns a Stat entity bound to this client.
// Idiomatic usage: client.Stat(nil).List(nil, nil) or
// client.Stat(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *RailwayStationPhotosSDK) Stat(data map[string]any) RailwayStationPhotosEntity {
	return NewStatEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *RailwayStationPhotosSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewRailwayStationPhotosSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
