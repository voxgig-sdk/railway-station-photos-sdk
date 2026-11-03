package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAdminInboxEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewCountryEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewDoneEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewInboxEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewInboxCountEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewInboxEntryEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewOAuthTokenEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewOauthEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewPhotoEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewPhotoDownloadInboxEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewPhotoStationByIdEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewPhotoStationsByCountryEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewPhotoStationsByPhotographerEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewPhotoStationsByRecentPhotoImportEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewPhotoUploadEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewPhotographerEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewProcessedEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewProfileEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewPublicInboxEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewRejectedEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

var NewStatEntityFunc func(client *RailwayStationPhotosSDK, entopts map[string]any) RailwayStationPhotosEntityBase

