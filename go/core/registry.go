package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAdminInboxEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewCountryEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewInboxEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewInboxCountEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewInboxEntryEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewOAuthTokenEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewOauthEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewPhotoEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewPhotoDownloadEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewPhotoStationByIdEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewPhotoStationsByCountryEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewPhotoStationsByPhotographerEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewPhotoStationsByRecentPhotoImportEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewPhotoUploadEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewPhotographerEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewProfileEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewPublicInboxEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewStatEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

