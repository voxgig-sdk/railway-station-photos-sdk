-- Typed models for the RailwayStationPhotos SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class AdminInbox
---@field DS100? string
---@field active? boolean
---@field command string
---@field conflictResolution? string
---@field countryCode? string
---@field id number
---@field lat? number
---@field lon? number
---@field message string
---@field rejectReason? string
---@field stationId? string
---@field status number
---@field title? string

---@class AdminInboxCreateData
---@field DS100? string
---@field active? boolean
---@field command string
---@field conflictResolution? string
---@field countryCode? string
---@field id number
---@field lat? number
---@field lon? number
---@field message string
---@field rejectReason? string
---@field stationId? string
---@field status number
---@field title? string

---@class Country
---@field active boolean
---@field allowPhotoUploads boolean
---@field code string
---@field email? string
---@field message? string
---@field name string
---@field overrideLicense? string
---@field providerApps? table
---@field timetableUrlTemplate? string

---@class CountryListMatch
---@field only_active? boolean

---@class Inbox
---@field comment? string
---@field countryCode? string
---@field crc32? number
---@field createdAt? number
---@field filename? string
---@field id number
---@field inboxUrl? string
---@field lat? number
---@field lon? number
---@field newLat? number
---@field newLon? number
---@field newTitle? string
---@field problemReportType? string
---@field rejectedReason? string
---@field state string
---@field stationId? string
---@field title? string

---@class InboxListMatch
---@field show_completed_entry? boolean

---@class InboxCreateData
---@field comment? string
---@field countryCode? string
---@field crc32? number
---@field createdAt? number
---@field filename? string
---@field id number
---@field inboxUrl? string
---@field lat? number
---@field lon? number
---@field newLat? number
---@field newLon? number
---@field newTitle? string
---@field problemReportType? string
---@field rejectedReason? string
---@field state string
---@field stationId? string
---@field title? string

---@class InboxRemoveMatch
---@field id number

---@class InboxCount
---@field pendingInboxEntries number

---@class InboxCountLoadMatch
---@field pendingInboxEntries? number

---@class InboxEntry
---@field active? boolean
---@field comment string
---@field countryCode? string
---@field createdAt number
---@field done boolean
---@field filename? string
---@field hasConflict? boolean
---@field hasPhoto boolean
---@field id number
---@field inboxUrl? string
---@field isProcessed? boolean
---@field lat? number
---@field lon? number
---@field newLat? number
---@field newLon? number
---@field newTitle? string
---@field photoId? number
---@field photographerEmail? string
---@field photographerNickname string
---@field problemReportType? string
---@field stationId? string
---@field title? string

---@class InboxEntryListMatch
---@field active? boolean
---@field comment? string
---@field countryCode? string
---@field createdAt? number
---@field done? boolean
---@field filename? string
---@field hasConflict? boolean
---@field hasPhoto? boolean
---@field id? number
---@field inboxUrl? string
---@field isProcessed? boolean
---@field lat? number
---@field lon? number
---@field newLat? number
---@field newLon? number
---@field newTitle? string
---@field photoId? number
---@field photographerEmail? string
---@field photographerNickname? string
---@field problemReportType? string
---@field stationId? string
---@field title? string

---@class InboxStateQuery

---@class OAuthToken
---@field access_token string
---@field expires_in? number
---@field refresh_token? string
---@field scope string
---@field token_type string

---@class OAuthTokenCreateData
---@field access_token string
---@field expires_in? number
---@field refresh_token? string
---@field scope string
---@field token_type string

---@class Oauth

---@class OauthLoadMatch
---@field client_id string
---@field code_challenge? string
---@field code_challenge_method? string
---@field redirect_uri string
---@field response_type string
---@field scope string
---@field state? string

---@class OauthCreateData

---@class Photo

---@class PhotoLoadMatch
---@field country string
---@field filename string
---@field width? number

---@class PhotoDownload

---@class PhotoDownloadLoadMatch
---@field filename string
---@field width? number

---@class PhotoStation
---@field id? string
---@field licenses table
---@field photoBaseUrl string
---@field photographers table
---@field stations table

---@class PhotoStationLoadMatch
---@field country string
---@field has_photo? boolean
---@field is_active? boolean

---@class PhotoStationListMatch
---@field since_hour? number

---@class PhotoUpload

---@class PhotoUploadCreateData

---@class Photographer

---@class PhotographerLoadMatch
---@field country? string

---@class Profile
---@field admin? boolean
---@field anonymous? boolean
---@field email? string
---@field emailVerified? boolean
---@field license string
---@field link? string
---@field newPassword string
---@field nickname string
---@field photoOwner boolean
---@field sendNotifications? boolean

---@class ProfileLoadMatch
---@field token string

---@class ProfileCreateData
---@field admin? boolean
---@field anonymous? boolean
---@field email? string
---@field emailVerified? boolean
---@field license string
---@field link? string
---@field newPassword string
---@field nickname string
---@field photoOwner boolean
---@field sendNotifications? boolean

---@class ProfileRemoveMatch
---@field admin? boolean
---@field anonymous? boolean
---@field email? string
---@field emailVerified? boolean
---@field license? string
---@field link? string
---@field newPassword? string
---@field nickname? string
---@field photoOwner? boolean
---@field sendNotifications? boolean

---@class PublicInbox
---@field countryCode? string
---@field lat number
---@field lon number
---@field stationId? string
---@field title string

---@class PublicInboxListMatch
---@field countryCode? string
---@field lat? number
---@field lon? number
---@field stationId? string
---@field title? string

---@class Stat
---@field countryCode? string
---@field photographers number
---@field total number
---@field withPhoto number
---@field withoutPhoto number

---@class StatLoadMatch
---@field country? string

local M = {}

return M
