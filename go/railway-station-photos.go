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
type RailwayStationPhotosEntity = core.RailwayStationPhotosEntity
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
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAdminInboxEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntity {
		return entity.NewAdminInboxEntity(client, entopts)
	}
	core.NewCountryEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntity {
		return entity.NewCountryEntity(client, entopts)
	}
	core.NewInboxEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntity {
		return entity.NewInboxEntity(client, entopts)
	}
	core.NewInboxCountEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntity {
		return entity.NewInboxCountEntity(client, entopts)
	}
	core.NewInboxEntryEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntity {
		return entity.NewInboxEntryEntity(client, entopts)
	}
	core.NewInboxStateQueryEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntity {
		return entity.NewInboxStateQueryEntity(client, entopts)
	}
	core.NewOAuthTokenEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntity {
		return entity.NewOAuthTokenEntity(client, entopts)
	}
	core.NewOauthEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntity {
		return entity.NewOauthEntity(client, entopts)
	}
	core.NewPhotoEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntity {
		return entity.NewPhotoEntity(client, entopts)
	}
	core.NewPhotoDownloadEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntity {
		return entity.NewPhotoDownloadEntity(client, entopts)
	}
	core.NewPhotoStationEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntity {
		return entity.NewPhotoStationEntity(client, entopts)
	}
	core.NewPhotoUploadEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntity {
		return entity.NewPhotoUploadEntity(client, entopts)
	}
	core.NewPhotographerEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntity {
		return entity.NewPhotographerEntity(client, entopts)
	}
	core.NewProfileEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntity {
		return entity.NewProfileEntity(client, entopts)
	}
	core.NewPublicInboxEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntity {
		return entity.NewPublicInboxEntity(client, entopts)
	}
	core.NewStatEntityFunc = func(client *core.RailwayStationPhotosSDK, entopts map[string]any) core.RailwayStationPhotosEntity {
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

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewRailwayStationPhotosSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *RailwayStationPhotosSDK  { return NewRailwayStationPhotosSDK(nil) }
func Test() *RailwayStationPhotosSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
