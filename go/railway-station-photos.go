package voxgigrailwaystationphotossdk

import (
	"github.com/voxgig-sdk/railway-station-photos-sdk/go/core"
	"github.com/voxgig-sdk/railway-station-photos-sdk/go/entity"
	"github.com/voxgig-sdk/railway-station-photos-sdk/go/feature"
	_ "github.com/voxgig-sdk/railway-station-photos-sdk/go/utility"
)

// Type aliases preserve external API.
type RailwayStationPhotosSDK = core.RailwayStationPhotosSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type RailwayStationPhotosEntityBase = core.RailwayStationPhotosEntityBase

// Deprecated: use RailwayStationPhotosEntityBase.
type RailwayStationPhotosEntity = core.RailwayStationPhotosEntityBase

type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type RailwayStationPhotosError = core.RailwayStationPhotosError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewAdminInboxEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewAdminInboxEntity(client, entopts)
	}
	core.NewCountryEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewCountryEntity(client, entopts)
	}
	core.NewDoneEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewDoneEntity(client, entopts)
	}
	core.NewInboxEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewInboxEntity(client, entopts)
	}
	core.NewInboxCountEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewInboxCountEntity(client, entopts)
	}
	core.NewInboxEntryEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewInboxEntryEntity(client, entopts)
	}
	core.NewOAuthTokenEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewOAuthTokenEntity(client, entopts)
	}
	core.NewOauthEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewOauthEntity(client, entopts)
	}
	core.NewPhotoEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewPhotoEntity(client, entopts)
	}
	core.NewPhotoDownloadInboxEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewPhotoDownloadInboxEntity(client, entopts)
	}
	core.NewPhotoStationByIdEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewPhotoStationByIdEntity(client, entopts)
	}
	core.NewPhotoStationsByCountryEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewPhotoStationsByCountryEntity(client, entopts)
	}
	core.NewPhotoStationsByPhotographerEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewPhotoStationsByPhotographerEntity(client, entopts)
	}
	core.NewPhotoStationsByRecentPhotoImportEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewPhotoStationsByRecentPhotoImportEntity(client, entopts)
	}
	core.NewPhotoUploadEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewPhotoUploadEntity(client, entopts)
	}
	core.NewPhotographerEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewPhotographerEntity(client, entopts)
	}
	core.NewProcessedEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewProcessedEntity(client, entopts)
	}
	core.NewProfileEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewProfileEntity(client, entopts)
	}
	core.NewPublicInboxEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewPublicInboxEntity(client, entopts)
	}
	core.NewRejectedEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewRejectedEntity(client, entopts)
	}
	core.NewStatEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntityBase {
		return entity.NewStatEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewRailwayStationPhotosSDK = core.NewRailwayStationPhotosSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewRailwayStationPhotosSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *RailwayStationPhotosSDK  { return NewRailwayStationPhotosSDK(nil) }
func Test() *RailwayStationPhotosSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
