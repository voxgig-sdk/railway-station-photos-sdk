// Typed models for the RailwayStationPhotos SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/railway-station-photos-sdk/go/core"
)

// AdminInbox is the typed data model for the admin_inbox entity.
type AdminInbox struct {
}

// AdminInboxCreateData is the typed request payload for AdminInbox.CreateTyped.
type AdminInboxCreateData struct {
	DS100 *string `json:"DS100,omitempty"`
	Active *bool `json:"active,omitempty"`
	Command string `json:"command"`
	ConflictResolution *string `json:"conflictResolution,omitempty"`
	CountryCode *string `json:"countryCode,omitempty"`
	Id int `json:"id"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	Message string `json:"message"`
	RejectReason *string `json:"rejectReason,omitempty"`
	StationId *string `json:"stationId,omitempty"`
	Status int `json:"status"`
	Title *string `json:"title,omitempty"`
}

// Country is the typed data model for the country entity.
type Country struct {
}

// CountryListMatch is the typed request payload for Country.ListTyped.
type CountryListMatch struct {
	OnlyActive *bool `json:"only_active,omitempty"`
}

// Inbox is the typed data model for the inbox entity.
type Inbox struct {
}

// InboxListMatch is the typed request payload for Inbox.ListTyped.
type InboxListMatch struct {
	ShowCompletedEntry *bool `json:"show_completed_entry,omitempty"`
}

// InboxCreateData is the typed request payload for Inbox.CreateTyped.
type InboxCreateData struct {
	Comment *string `json:"comment,omitempty"`
	CountryCode *string `json:"countryCode,omitempty"`
	Crc32 *int `json:"crc32,omitempty"`
	CreatedAt *int `json:"createdAt,omitempty"`
	Filename *string `json:"filename,omitempty"`
	Id int `json:"id"`
	InboxUrl *string `json:"inboxUrl,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	NewLat *float64 `json:"newLat,omitempty"`
	NewLon *float64 `json:"newLon,omitempty"`
	NewTitle *string `json:"newTitle,omitempty"`
	ProblemReportType *string `json:"problemReportType,omitempty"`
	RejectedReason *string `json:"rejectedReason,omitempty"`
	State string `json:"state"`
	StationId *string `json:"stationId,omitempty"`
	Title *string `json:"title,omitempty"`
}

// InboxRemoveMatch is the typed request payload for Inbox.RemoveTyped.
type InboxRemoveMatch struct {
	Id int `json:"id"`
}

// InboxCount is the typed data model for the inbox_count entity.
type InboxCount struct {
}

// InboxCountLoadMatch is the typed request payload for InboxCount.LoadTyped.
type InboxCountLoadMatch struct {
	PendingInboxEntries *int `json:"pendingInboxEntries,omitempty"`
}

// InboxEntry is the typed data model for the inbox_entry entity.
type InboxEntry struct {
}

// InboxEntryListMatch is the typed request payload for InboxEntry.ListTyped.
type InboxEntryListMatch struct {
	Active *bool `json:"active,omitempty"`
	Comment *string `json:"comment,omitempty"`
	CountryCode *string `json:"countryCode,omitempty"`
	CreatedAt *int `json:"createdAt,omitempty"`
	Done *bool `json:"done,omitempty"`
	Filename *string `json:"filename,omitempty"`
	HasConflict *bool `json:"hasConflict,omitempty"`
	HasPhoto *bool `json:"hasPhoto,omitempty"`
	Id *int `json:"id,omitempty"`
	InboxUrl *string `json:"inboxUrl,omitempty"`
	IsProcessed *bool `json:"isProcessed,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	NewLat *float64 `json:"newLat,omitempty"`
	NewLon *float64 `json:"newLon,omitempty"`
	NewTitle *string `json:"newTitle,omitempty"`
	PhotoId *int `json:"photoId,omitempty"`
	PhotographerEmail *string `json:"photographerEmail,omitempty"`
	PhotographerNickname *string `json:"photographerNickname,omitempty"`
	ProblemReportType *string `json:"problemReportType,omitempty"`
	StationId *string `json:"stationId,omitempty"`
	Title *string `json:"title,omitempty"`
}

// OAuthToken is the typed data model for the o_auth_token entity.
type OAuthToken struct {
}

// OAuthTokenCreateData is the typed request payload for OAuthToken.CreateTyped.
type OAuthTokenCreateData struct {
	AccessToken string `json:"access_token"`
	ExpiresIn *int `json:"expires_in,omitempty"`
	RefreshToken *string `json:"refresh_token,omitempty"`
	Scope string `json:"scope"`
	TokenType string `json:"token_type"`
}

// Oauth is the typed data model for the oauth entity.
type Oauth struct {
}

// OauthLoadMatch is the typed request payload for Oauth.LoadTyped.
type OauthLoadMatch struct {
	ClientId string `json:"client_id"`
	CodeChallenge *string `json:"code_challenge,omitempty"`
	CodeChallengeMethod *string `json:"code_challenge_method,omitempty"`
	RedirectUri string `json:"redirect_uri"`
	ResponseType string `json:"response_type"`
	Scope string `json:"scope"`
	State *string `json:"state,omitempty"`
}

// OauthCreateData is the typed request payload for Oauth.CreateTyped.
type OauthCreateData struct {
}

// Photo is the typed data model for the photo entity.
type Photo struct {
}

// PhotoLoadMatch is the typed request payload for Photo.LoadTyped.
type PhotoLoadMatch struct {
	Country string `json:"country"`
	Filename string `json:"filename"`
	Width *int `json:"width,omitempty"`
}

// PhotoDownload is the typed data model for the photo_download entity.
type PhotoDownload struct {
}

// PhotoDownloadLoadMatch is the typed request payload for PhotoDownload.LoadTyped.
type PhotoDownloadLoadMatch struct {
	Filename string `json:"filename"`
	Width *int `json:"width,omitempty"`
}

// PhotoStationById is the typed data model for the photo_station_by_id entity.
type PhotoStationById struct {
}

// PhotoStationByIdLoadMatch is the typed request payload for PhotoStationById.LoadTyped.
type PhotoStationByIdLoadMatch struct {
	Country string `json:"country"`
	Id string `json:"id"`
}

// PhotoStationsByCountry is the typed data model for the photo_stations_by_country entity.
type PhotoStationsByCountry struct {
}

// PhotoStationsByCountryLoadMatch is the typed request payload for PhotoStationsByCountry.LoadTyped.
type PhotoStationsByCountryLoadMatch struct {
	Id string `json:"id"`
	HasPhoto *bool `json:"has_photo,omitempty"`
	IsActive *bool `json:"is_active,omitempty"`
}

// PhotoStationsByPhotographer is the typed data model for the photo_stations_by_photographer entity.
type PhotoStationsByPhotographer struct {
}

// PhotoStationsByPhotographerLoadMatch is the typed request payload for PhotoStationsByPhotographer.LoadTyped.
type PhotoStationsByPhotographerLoadMatch struct {
	Id string `json:"id"`
	Country *string `json:"country,omitempty"`
}

// PhotoStationsByRecentPhotoImport is the typed data model for the photo_stations_by_recent_photo_import entity.
type PhotoStationsByRecentPhotoImport struct {
}

// PhotoStationsByRecentPhotoImportListMatch is the typed request payload for PhotoStationsByRecentPhotoImport.ListTyped.
type PhotoStationsByRecentPhotoImportListMatch struct {
	SinceHour *int `json:"since_hour,omitempty"`
}

// PhotoUpload is the typed data model for the photo_upload entity.
type PhotoUpload struct {
}

// PhotoUploadCreateData is the typed request payload for PhotoUpload.CreateTyped.
type PhotoUploadCreateData struct {
}

// Photographer is the typed data model for the photographer entity.
type Photographer struct {
}

// PhotographerLoadMatch is the typed request payload for Photographer.LoadTyped.
type PhotographerLoadMatch struct {
	Country *string `json:"country,omitempty"`
}

// Profile is the typed data model for the profile entity.
type Profile struct {
}

// ProfileLoadMatch is the typed request payload for Profile.LoadTyped.
type ProfileLoadMatch struct {
	Token string `json:"token"`
}

// ProfileCreateData is the typed request payload for Profile.CreateTyped.
type ProfileCreateData struct {
	Admin *bool `json:"admin,omitempty"`
	Anonymous *bool `json:"anonymous,omitempty"`
	Email *string `json:"email,omitempty"`
	EmailVerified *bool `json:"emailVerified,omitempty"`
	License string `json:"license"`
	Link *string `json:"link,omitempty"`
	NewPassword string `json:"newPassword"`
	Nickname string `json:"nickname"`
	PhotoOwner bool `json:"photoOwner"`
	SendNotifications *bool `json:"sendNotifications,omitempty"`
}

// ProfileRemoveMatch is the typed request payload for Profile.RemoveTyped.
type ProfileRemoveMatch struct {
	Admin *bool `json:"admin,omitempty"`
	Anonymous *bool `json:"anonymous,omitempty"`
	Email *string `json:"email,omitempty"`
	EmailVerified *bool `json:"emailVerified,omitempty"`
	License *string `json:"license,omitempty"`
	Link *string `json:"link,omitempty"`
	NewPassword *string `json:"newPassword,omitempty"`
	Nickname *string `json:"nickname,omitempty"`
	PhotoOwner *bool `json:"photoOwner,omitempty"`
	SendNotifications *bool `json:"sendNotifications,omitempty"`
}

// PublicInbox is the typed data model for the public_inbox entity.
type PublicInbox struct {
}

// PublicInboxListMatch is the typed request payload for PublicInbox.ListTyped.
type PublicInboxListMatch struct {
	CountryCode *string `json:"countryCode,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	StationId *string `json:"stationId,omitempty"`
	Title *string `json:"title,omitempty"`
}

// Stat is the typed data model for the stat entity.
type Stat struct {
}

// StatLoadMatch is the typed request payload for Stat.LoadTyped.
type StatLoadMatch struct {
	Country *string `json:"country,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
