-- Typed models for the RailwayStationPhotos SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class AdminInbox
---@field active? boolean
---@field command string
---@field conflict_resolution? string
---@field country_code? string
---@field ds100? string
---@field id number
---@field lat? number
---@field lon? number
---@field message string
---@field reject_reason? string
---@field station_id? string
---@field status number
---@field title? string

---@class AdminInboxCreateData

---@class Country
---@field active boolean
---@field allow_photo_upload boolean
---@field code string
---@field email? string
---@field message? string
---@field name string
---@field override_license? string
---@field provider_app? table
---@field timetable_url_template? string

---@class CountryListMatch

---@class Inbox
---@field comment? string
---@field country_code? string
---@field crc32? number
---@field created_at? number
---@field filename? string
---@field id number
---@field inbox_url? string
---@field lat? number
---@field lon? number
---@field new_lat? number
---@field new_lon? number
---@field new_title? string
---@field problem_report_type? string
---@field rejected_reason? string
---@field state string
---@field station_id? string
---@field title? string

---@class InboxListMatch

---@class InboxCreateData

---@class InboxRemoveMatch
---@field id number

---@class InboxCount
---@field pending_inbox_entry number

---@class InboxCountLoadMatch

---@class InboxEntry
---@field active? boolean
---@field comment string
---@field country_code? string
---@field created_at number
---@field done boolean
---@field filename? string
---@field has_conflict? boolean
---@field has_photo boolean
---@field id number
---@field inbox_url? string
---@field is_processed? boolean
---@field lat? number
---@field lon? number
---@field new_lat? number
---@field new_lon? number
---@field new_title? string
---@field photo_id? number
---@field photographer_email? string
---@field photographer_nickname string
---@field problem_report_type? string
---@field station_id? string
---@field title? string

---@class InboxEntryListMatch

---@class InboxStateQuery

---@class OAuthToken
---@field access_token string
---@field expires_in? number
---@field refresh_token? string
---@field scope string
---@field token_type string

---@class OAuthTokenCreateData

---@class Oauth

---@class OauthLoadMatch

---@class OauthCreateData

---@class Photo

---@class PhotoLoadMatch
---@field country string
---@field filename string

---@class PhotoDownload

---@class PhotoDownloadLoadMatch
---@field filename string

---@class PhotoStation
---@field license table
---@field photo_base_url string
---@field photographer table
---@field station table

---@class PhotoStationLoadMatch
---@field country string
---@field photographer string

---@class PhotoStationListMatch
---@field country string
---@field id string

---@class PhotoUpload

---@class PhotoUploadCreateData

---@class Photographer

---@class PhotographerLoadMatch

---@class Profile
---@field admin? boolean
---@field anonymous? boolean
---@field email? string
---@field email_verified? boolean
---@field license string
---@field link? string
---@field new_password string
---@field nickname string
---@field photo_owner boolean
---@field send_notification? boolean

---@class ProfileLoadMatch
---@field token string

---@class ProfileCreateData

---@class ProfileRemoveMatch

---@class PublicInbox
---@field country_code? string
---@field lat number
---@field lon number
---@field station_id? string
---@field title string

---@class PublicInboxListMatch

---@class Stat
---@field country_code? string
---@field photographer number
---@field total number
---@field with_photo number
---@field without_photo number

---@class StatLoadMatch

local M = {}

return M
