// Typed models for the RailwayStationPhotos SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// AdminInbox is the typed data model for the admin_inbox entity.
type AdminInbox struct {
	Active *bool `json:"active,omitempty"`
	Command string `json:"command"`
	ConflictResolution *string `json:"conflict_resolution,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	Ds100 *string `json:"ds100,omitempty"`
	Id int `json:"id"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	Message string `json:"message"`
	RejectReason *string `json:"reject_reason,omitempty"`
	StationId *string `json:"station_id,omitempty"`
	Status int `json:"status"`
	Title *string `json:"title,omitempty"`
}

// AdminInboxCreateData mirrors the admin_inbox fields as an all-optional match
// filter (Go analog of Partial<AdminInbox>).
type AdminInboxCreateData struct {
	Active *bool `json:"active,omitempty"`
	Command *string `json:"command,omitempty"`
	ConflictResolution *string `json:"conflict_resolution,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	Ds100 *string `json:"ds100,omitempty"`
	Id *int `json:"id,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	Message *string `json:"message,omitempty"`
	RejectReason *string `json:"reject_reason,omitempty"`
	StationId *string `json:"station_id,omitempty"`
	Status *int `json:"status,omitempty"`
	Title *string `json:"title,omitempty"`
}

// Country is the typed data model for the country entity.
type Country struct {
	Active bool `json:"active"`
	AllowPhotoUpload bool `json:"allow_photo_upload"`
	Code string `json:"code"`
	Email *string `json:"email,omitempty"`
	Message *string `json:"message,omitempty"`
	Name string `json:"name"`
	OverrideLicense *string `json:"override_license,omitempty"`
	ProviderApp *[]any `json:"provider_app,omitempty"`
	TimetableUrlTemplate *string `json:"timetable_url_template,omitempty"`
}

// CountryListMatch mirrors the country fields as an all-optional match
// filter (Go analog of Partial<Country>).
type CountryListMatch struct {
	Active *bool `json:"active,omitempty"`
	AllowPhotoUpload *bool `json:"allow_photo_upload,omitempty"`
	Code *string `json:"code,omitempty"`
	Email *string `json:"email,omitempty"`
	Message *string `json:"message,omitempty"`
	Name *string `json:"name,omitempty"`
	OverrideLicense *string `json:"override_license,omitempty"`
	ProviderApp *[]any `json:"provider_app,omitempty"`
	TimetableUrlTemplate *string `json:"timetable_url_template,omitempty"`
}

// Inbox is the typed data model for the inbox entity.
type Inbox struct {
	Comment *string `json:"comment,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	Crc32 *int `json:"crc32,omitempty"`
	CreatedAt *int `json:"created_at,omitempty"`
	Filename *string `json:"filename,omitempty"`
	Id int `json:"id"`
	InboxUrl *string `json:"inbox_url,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	NewLat *float64 `json:"new_lat,omitempty"`
	NewLon *float64 `json:"new_lon,omitempty"`
	NewTitle *string `json:"new_title,omitempty"`
	ProblemReportType *string `json:"problem_report_type,omitempty"`
	RejectedReason *string `json:"rejected_reason,omitempty"`
	State string `json:"state"`
	StationId *string `json:"station_id,omitempty"`
	Title *string `json:"title,omitempty"`
}

// InboxListMatch mirrors the inbox fields as an all-optional match
// filter (Go analog of Partial<Inbox>).
type InboxListMatch struct {
	Comment *string `json:"comment,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	Crc32 *int `json:"crc32,omitempty"`
	CreatedAt *int `json:"created_at,omitempty"`
	Filename *string `json:"filename,omitempty"`
	Id *int `json:"id,omitempty"`
	InboxUrl *string `json:"inbox_url,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	NewLat *float64 `json:"new_lat,omitempty"`
	NewLon *float64 `json:"new_lon,omitempty"`
	NewTitle *string `json:"new_title,omitempty"`
	ProblemReportType *string `json:"problem_report_type,omitempty"`
	RejectedReason *string `json:"rejected_reason,omitempty"`
	State *string `json:"state,omitempty"`
	StationId *string `json:"station_id,omitempty"`
	Title *string `json:"title,omitempty"`
}

// InboxCreateData mirrors the inbox fields as an all-optional match
// filter (Go analog of Partial<Inbox>).
type InboxCreateData struct {
	Comment *string `json:"comment,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	Crc32 *int `json:"crc32,omitempty"`
	CreatedAt *int `json:"created_at,omitempty"`
	Filename *string `json:"filename,omitempty"`
	Id *int `json:"id,omitempty"`
	InboxUrl *string `json:"inbox_url,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	NewLat *float64 `json:"new_lat,omitempty"`
	NewLon *float64 `json:"new_lon,omitempty"`
	NewTitle *string `json:"new_title,omitempty"`
	ProblemReportType *string `json:"problem_report_type,omitempty"`
	RejectedReason *string `json:"rejected_reason,omitempty"`
	State *string `json:"state,omitempty"`
	StationId *string `json:"station_id,omitempty"`
	Title *string `json:"title,omitempty"`
}

// InboxRemoveMatch is the typed request payload for Inbox.RemoveTyped.
type InboxRemoveMatch struct {
	Id int `json:"id"`
}

// InboxCount is the typed data model for the inbox_count entity.
type InboxCount struct {
	PendingInboxEntry int `json:"pending_inbox_entry"`
}

// InboxCountLoadMatch mirrors the inbox_count fields as an all-optional match
// filter (Go analog of Partial<InboxCount>).
type InboxCountLoadMatch struct {
	PendingInboxEntry *int `json:"pending_inbox_entry,omitempty"`
}

// InboxEntry is the typed data model for the inbox_entry entity.
type InboxEntry struct {
	Active *bool `json:"active,omitempty"`
	Comment string `json:"comment"`
	CountryCode *string `json:"country_code,omitempty"`
	CreatedAt int `json:"created_at"`
	Done bool `json:"done"`
	Filename *string `json:"filename,omitempty"`
	HasConflict *bool `json:"has_conflict,omitempty"`
	HasPhoto bool `json:"has_photo"`
	Id int `json:"id"`
	InboxUrl *string `json:"inbox_url,omitempty"`
	IsProcessed *bool `json:"is_processed,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	NewLat *float64 `json:"new_lat,omitempty"`
	NewLon *float64 `json:"new_lon,omitempty"`
	NewTitle *string `json:"new_title,omitempty"`
	PhotoId *int `json:"photo_id,omitempty"`
	PhotographerEmail *string `json:"photographer_email,omitempty"`
	PhotographerNickname string `json:"photographer_nickname"`
	ProblemReportType *string `json:"problem_report_type,omitempty"`
	StationId *string `json:"station_id,omitempty"`
	Title *string `json:"title,omitempty"`
}

// InboxEntryListMatch mirrors the inbox_entry fields as an all-optional match
// filter (Go analog of Partial<InboxEntry>).
type InboxEntryListMatch struct {
	Active *bool `json:"active,omitempty"`
	Comment *string `json:"comment,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	CreatedAt *int `json:"created_at,omitempty"`
	Done *bool `json:"done,omitempty"`
	Filename *string `json:"filename,omitempty"`
	HasConflict *bool `json:"has_conflict,omitempty"`
	HasPhoto *bool `json:"has_photo,omitempty"`
	Id *int `json:"id,omitempty"`
	InboxUrl *string `json:"inbox_url,omitempty"`
	IsProcessed *bool `json:"is_processed,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	NewLat *float64 `json:"new_lat,omitempty"`
	NewLon *float64 `json:"new_lon,omitempty"`
	NewTitle *string `json:"new_title,omitempty"`
	PhotoId *int `json:"photo_id,omitempty"`
	PhotographerEmail *string `json:"photographer_email,omitempty"`
	PhotographerNickname *string `json:"photographer_nickname,omitempty"`
	ProblemReportType *string `json:"problem_report_type,omitempty"`
	StationId *string `json:"station_id,omitempty"`
	Title *string `json:"title,omitempty"`
}

// InboxStateQuery is the typed data model for the inbox_state_query entity.
type InboxStateQuery struct {
}

// OAuthToken is the typed data model for the o_auth_token entity.
type OAuthToken struct {
	AccessToken string `json:"access_token"`
	ExpiresIn *int `json:"expires_in,omitempty"`
	RefreshToken *string `json:"refresh_token,omitempty"`
	Scope string `json:"scope"`
	TokenType string `json:"token_type"`
}

// OAuthTokenCreateData mirrors the o_auth_token fields as an all-optional match
// filter (Go analog of Partial<OAuthToken>).
type OAuthTokenCreateData struct {
	AccessToken *string `json:"access_token,omitempty"`
	ExpiresIn *int `json:"expires_in,omitempty"`
	RefreshToken *string `json:"refresh_token,omitempty"`
	Scope *string `json:"scope,omitempty"`
	TokenType *string `json:"token_type,omitempty"`
}

// Oauth is the typed data model for the oauth entity.
type Oauth struct {
}

// OauthLoadMatch mirrors the oauth fields as an all-optional match
// filter (Go analog of Partial<Oauth>).
type OauthLoadMatch struct {
}

// OauthCreateData mirrors the oauth fields as an all-optional match
// filter (Go analog of Partial<Oauth>).
type OauthCreateData struct {
}

// Photo is the typed data model for the photo entity.
type Photo struct {
}

// PhotoLoadMatch is the typed request payload for Photo.LoadTyped.
type PhotoLoadMatch struct {
	Country string `json:"country"`
	Filename string `json:"filename"`
}

// PhotoDownload is the typed data model for the photo_download entity.
type PhotoDownload struct {
}

// PhotoDownloadLoadMatch is the typed request payload for PhotoDownload.LoadTyped.
type PhotoDownloadLoadMatch struct {
	Filename string `json:"filename"`
}

// PhotoStation is the typed data model for the photo_station entity.
type PhotoStation struct {
	License []any `json:"license"`
	PhotoBaseUrl string `json:"photo_base_url"`
	Photographer []any `json:"photographer"`
	Station []any `json:"station"`
}

// PhotoStationLoadMatch is the typed request payload for PhotoStation.LoadTyped.
type PhotoStationLoadMatch struct {
	Country string `json:"country"`
	Photographer string `json:"photographer"`
}

// PhotoStationListMatch is the typed request payload for PhotoStation.ListTyped.
type PhotoStationListMatch struct {
	Country string `json:"country"`
	Id string `json:"id"`
}

// PhotoUpload is the typed data model for the photo_upload entity.
type PhotoUpload struct {
}

// PhotoUploadCreateData mirrors the photo_upload fields as an all-optional match
// filter (Go analog of Partial<PhotoUpload>).
type PhotoUploadCreateData struct {
}

// Photographer is the typed data model for the photographer entity.
type Photographer struct {
}

// PhotographerLoadMatch mirrors the photographer fields as an all-optional match
// filter (Go analog of Partial<Photographer>).
type PhotographerLoadMatch struct {
}

// Profile is the typed data model for the profile entity.
type Profile struct {
	Admin *bool `json:"admin,omitempty"`
	Anonymous *bool `json:"anonymous,omitempty"`
	Email *string `json:"email,omitempty"`
	EmailVerified *bool `json:"email_verified,omitempty"`
	License string `json:"license"`
	Link *string `json:"link,omitempty"`
	NewPassword string `json:"new_password"`
	Nickname string `json:"nickname"`
	PhotoOwner bool `json:"photo_owner"`
	SendNotification *bool `json:"send_notification,omitempty"`
}

// ProfileLoadMatch is the typed request payload for Profile.LoadTyped.
type ProfileLoadMatch struct {
	Token string `json:"token"`
}

// ProfileCreateData mirrors the profile fields as an all-optional match
// filter (Go analog of Partial<Profile>).
type ProfileCreateData struct {
	Admin *bool `json:"admin,omitempty"`
	Anonymous *bool `json:"anonymous,omitempty"`
	Email *string `json:"email,omitempty"`
	EmailVerified *bool `json:"email_verified,omitempty"`
	License *string `json:"license,omitempty"`
	Link *string `json:"link,omitempty"`
	NewPassword *string `json:"new_password,omitempty"`
	Nickname *string `json:"nickname,omitempty"`
	PhotoOwner *bool `json:"photo_owner,omitempty"`
	SendNotification *bool `json:"send_notification,omitempty"`
}

// ProfileRemoveMatch mirrors the profile fields as an all-optional match
// filter (Go analog of Partial<Profile>).
type ProfileRemoveMatch struct {
	Admin *bool `json:"admin,omitempty"`
	Anonymous *bool `json:"anonymous,omitempty"`
	Email *string `json:"email,omitempty"`
	EmailVerified *bool `json:"email_verified,omitempty"`
	License *string `json:"license,omitempty"`
	Link *string `json:"link,omitempty"`
	NewPassword *string `json:"new_password,omitempty"`
	Nickname *string `json:"nickname,omitempty"`
	PhotoOwner *bool `json:"photo_owner,omitempty"`
	SendNotification *bool `json:"send_notification,omitempty"`
}

// PublicInbox is the typed data model for the public_inbox entity.
type PublicInbox struct {
	CountryCode *string `json:"country_code,omitempty"`
	Lat float64 `json:"lat"`
	Lon float64 `json:"lon"`
	StationId *string `json:"station_id,omitempty"`
	Title string `json:"title"`
}

// PublicInboxListMatch mirrors the public_inbox fields as an all-optional match
// filter (Go analog of Partial<PublicInbox>).
type PublicInboxListMatch struct {
	CountryCode *string `json:"country_code,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lon *float64 `json:"lon,omitempty"`
	StationId *string `json:"station_id,omitempty"`
	Title *string `json:"title,omitempty"`
}

// Stat is the typed data model for the stat entity.
type Stat struct {
	CountryCode *string `json:"country_code,omitempty"`
	Photographer int `json:"photographer"`
	Total int `json:"total"`
	WithPhoto int `json:"with_photo"`
	WithoutPhoto int `json:"without_photo"`
}

// StatLoadMatch mirrors the stat fields as an all-optional match
// filter (Go analog of Partial<Stat>).
type StatLoadMatch struct {
	CountryCode *string `json:"country_code,omitempty"`
	Photographer *int `json:"photographer,omitempty"`
	Total *int `json:"total,omitempty"`
	WithPhoto *int `json:"with_photo,omitempty"`
	WithoutPhoto *int `json:"without_photo,omitempty"`
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

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
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

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
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
