package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAdminInboxEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewCountryEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewInboxEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewInboxCountEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewInboxEntryEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewInboxStateQueryEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewOAuthTokenEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewOauthEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewPhotoEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewPhotoDownloadEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewPhotoStationEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewPhotoUploadEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewPhotographerEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewProfileEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewPublicInboxEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

var NewStatEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntity

