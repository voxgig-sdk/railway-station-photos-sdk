# frozen_string_literal: true

# Typed models for the RailwayStationPhotos SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# AdminInbox entity data model.
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] command
#   @return [String]
#
# @!attribute [rw] conflict_resolution
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] ds100
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] reject_reason
#   @return [String, nil]
#
# @!attribute [rw] station_id
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer]
#
# @!attribute [rw] title
#   @return [String, nil]
AdminInbox = Struct.new(
  :active,
  :command,
  :conflict_resolution,
  :country_code,
  :ds100,
  :id,
  :lat,
  :lon,
  :message,
  :reject_reason,
  :station_id,
  :status,
  :title,
  keyword_init: true
)

# Request payload for AdminInbox#create.
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] command
#   @return [String]
#
# @!attribute [rw] conflict_resolution
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] ds100
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] reject_reason
#   @return [String, nil]
#
# @!attribute [rw] station_id
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer]
#
# @!attribute [rw] title
#   @return [String, nil]
AdminInboxCreateData = Struct.new(
  :active,
  :command,
  :conflict_resolution,
  :country_code,
  :ds100,
  :id,
  :lat,
  :lon,
  :message,
  :reject_reason,
  :station_id,
  :status,
  :title,
  keyword_init: true
)

# Country entity data model.
#
# @!attribute [rw] active
#   @return [Boolean]
#
# @!attribute [rw] allow_photo_upload
#   @return [Boolean]
#
# @!attribute [rw] code
#   @return [String]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] override_license
#   @return [String, nil]
#
# @!attribute [rw] provider_app
#   @return [Array, nil]
#
# @!attribute [rw] timetable_url_template
#   @return [String, nil]
Country = Struct.new(
  :active,
  :allow_photo_upload,
  :code,
  :email,
  :message,
  :name,
  :override_license,
  :provider_app,
  :timetable_url_template,
  keyword_init: true
)

# Request payload for Country#list.
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] allow_photo_upload
#   @return [Boolean, nil]
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] message
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] override_license
#   @return [String, nil]
#
# @!attribute [rw] provider_app
#   @return [Array, nil]
#
# @!attribute [rw] timetable_url_template
#   @return [String, nil]
CountryListMatch = Struct.new(
  :active,
  :allow_photo_upload,
  :code,
  :email,
  :message,
  :name,
  :override_license,
  :provider_app,
  :timetable_url_template,
  keyword_init: true
)

# Inbox entity data model.
#
# @!attribute [rw] comment
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] crc32
#   @return [Integer, nil]
#
# @!attribute [rw] created_at
#   @return [Integer, nil]
#
# @!attribute [rw] filename
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] inbox_url
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] new_lat
#   @return [Float, nil]
#
# @!attribute [rw] new_lon
#   @return [Float, nil]
#
# @!attribute [rw] new_title
#   @return [String, nil]
#
# @!attribute [rw] problem_report_type
#   @return [String, nil]
#
# @!attribute [rw] rejected_reason
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] station_id
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Inbox = Struct.new(
  :comment,
  :country_code,
  :crc32,
  :created_at,
  :filename,
  :id,
  :inbox_url,
  :lat,
  :lon,
  :new_lat,
  :new_lon,
  :new_title,
  :problem_report_type,
  :rejected_reason,
  :state,
  :station_id,
  :title,
  keyword_init: true
)

# Request payload for Inbox#list.
#
# @!attribute [rw] comment
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] crc32
#   @return [Integer, nil]
#
# @!attribute [rw] created_at
#   @return [Integer, nil]
#
# @!attribute [rw] filename
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] inbox_url
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] new_lat
#   @return [Float, nil]
#
# @!attribute [rw] new_lon
#   @return [Float, nil]
#
# @!attribute [rw] new_title
#   @return [String, nil]
#
# @!attribute [rw] problem_report_type
#   @return [String, nil]
#
# @!attribute [rw] rejected_reason
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] station_id
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
InboxListMatch = Struct.new(
  :comment,
  :country_code,
  :crc32,
  :created_at,
  :filename,
  :id,
  :inbox_url,
  :lat,
  :lon,
  :new_lat,
  :new_lon,
  :new_title,
  :problem_report_type,
  :rejected_reason,
  :state,
  :station_id,
  :title,
  keyword_init: true
)

# Request payload for Inbox#create.
#
# @!attribute [rw] comment
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] crc32
#   @return [Integer, nil]
#
# @!attribute [rw] created_at
#   @return [Integer, nil]
#
# @!attribute [rw] filename
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] inbox_url
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] new_lat
#   @return [Float, nil]
#
# @!attribute [rw] new_lon
#   @return [Float, nil]
#
# @!attribute [rw] new_title
#   @return [String, nil]
#
# @!attribute [rw] problem_report_type
#   @return [String, nil]
#
# @!attribute [rw] rejected_reason
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] station_id
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
InboxCreateData = Struct.new(
  :comment,
  :country_code,
  :crc32,
  :created_at,
  :filename,
  :id,
  :inbox_url,
  :lat,
  :lon,
  :new_lat,
  :new_lon,
  :new_title,
  :problem_report_type,
  :rejected_reason,
  :state,
  :station_id,
  :title,
  keyword_init: true
)

# Request payload for Inbox#remove.
#
# @!attribute [rw] id
#   @return [Integer]
InboxRemoveMatch = Struct.new(
  :id,
  keyword_init: true
)

# InboxCount entity data model.
#
# @!attribute [rw] pending_inbox_entry
#   @return [Integer]
InboxCount = Struct.new(
  :pending_inbox_entry,
  keyword_init: true
)

# Request payload for InboxCount#load.
#
# @!attribute [rw] pending_inbox_entry
#   @return [Integer, nil]
InboxCountLoadMatch = Struct.new(
  :pending_inbox_entry,
  keyword_init: true
)

# InboxEntry entity data model.
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] comment
#   @return [String]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [Integer]
#
# @!attribute [rw] done
#   @return [Boolean]
#
# @!attribute [rw] filename
#   @return [String, nil]
#
# @!attribute [rw] has_conflict
#   @return [Boolean, nil]
#
# @!attribute [rw] has_photo
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] inbox_url
#   @return [String, nil]
#
# @!attribute [rw] is_processed
#   @return [Boolean, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] new_lat
#   @return [Float, nil]
#
# @!attribute [rw] new_lon
#   @return [Float, nil]
#
# @!attribute [rw] new_title
#   @return [String, nil]
#
# @!attribute [rw] photo_id
#   @return [Integer, nil]
#
# @!attribute [rw] photographer_email
#   @return [String, nil]
#
# @!attribute [rw] photographer_nickname
#   @return [String]
#
# @!attribute [rw] problem_report_type
#   @return [String, nil]
#
# @!attribute [rw] station_id
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
InboxEntry = Struct.new(
  :active,
  :comment,
  :country_code,
  :created_at,
  :done,
  :filename,
  :has_conflict,
  :has_photo,
  :id,
  :inbox_url,
  :is_processed,
  :lat,
  :lon,
  :new_lat,
  :new_lon,
  :new_title,
  :photo_id,
  :photographer_email,
  :photographer_nickname,
  :problem_report_type,
  :station_id,
  :title,
  keyword_init: true
)

# Request payload for InboxEntry#list.
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] comment
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [Integer, nil]
#
# @!attribute [rw] done
#   @return [Boolean, nil]
#
# @!attribute [rw] filename
#   @return [String, nil]
#
# @!attribute [rw] has_conflict
#   @return [Boolean, nil]
#
# @!attribute [rw] has_photo
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] inbox_url
#   @return [String, nil]
#
# @!attribute [rw] is_processed
#   @return [Boolean, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] new_lat
#   @return [Float, nil]
#
# @!attribute [rw] new_lon
#   @return [Float, nil]
#
# @!attribute [rw] new_title
#   @return [String, nil]
#
# @!attribute [rw] photo_id
#   @return [Integer, nil]
#
# @!attribute [rw] photographer_email
#   @return [String, nil]
#
# @!attribute [rw] photographer_nickname
#   @return [String, nil]
#
# @!attribute [rw] problem_report_type
#   @return [String, nil]
#
# @!attribute [rw] station_id
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
InboxEntryListMatch = Struct.new(
  :active,
  :comment,
  :country_code,
  :created_at,
  :done,
  :filename,
  :has_conflict,
  :has_photo,
  :id,
  :inbox_url,
  :is_processed,
  :lat,
  :lon,
  :new_lat,
  :new_lon,
  :new_title,
  :photo_id,
  :photographer_email,
  :photographer_nickname,
  :problem_report_type,
  :station_id,
  :title,
  keyword_init: true
)

# InboxStateQuery entity data model.
class InboxStateQuery
end

# OAuthToken entity data model.
#
# @!attribute [rw] access_token
#   @return [String]
#
# @!attribute [rw] expires_in
#   @return [Integer, nil]
#
# @!attribute [rw] refresh_token
#   @return [String, nil]
#
# @!attribute [rw] scope
#   @return [String]
#
# @!attribute [rw] token_type
#   @return [String]
OAuthToken = Struct.new(
  :access_token,
  :expires_in,
  :refresh_token,
  :scope,
  :token_type,
  keyword_init: true
)

# Request payload for OAuthToken#create.
#
# @!attribute [rw] access_token
#   @return [String]
#
# @!attribute [rw] expires_in
#   @return [Integer, nil]
#
# @!attribute [rw] refresh_token
#   @return [String, nil]
#
# @!attribute [rw] scope
#   @return [String]
#
# @!attribute [rw] token_type
#   @return [String]
OAuthTokenCreateData = Struct.new(
  :access_token,
  :expires_in,
  :refresh_token,
  :scope,
  :token_type,
  keyword_init: true
)

# Oauth entity data model.
class Oauth
end

# Request payload for Oauth#load.
class OauthLoadMatch
end

# Request payload for Oauth#create.
class OauthCreateData
end

# Photo entity data model.
class Photo
end

# Request payload for Photo#load.
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] filename
#   @return [String]
PhotoLoadMatch = Struct.new(
  :country,
  :filename,
  keyword_init: true
)

# PhotoDownload entity data model.
class PhotoDownload
end

# Request payload for PhotoDownload#load.
#
# @!attribute [rw] filename
#   @return [String]
PhotoDownloadLoadMatch = Struct.new(
  :filename,
  keyword_init: true
)

# PhotoStation entity data model.
#
# @!attribute [rw] license
#   @return [Array]
#
# @!attribute [rw] photo_base_url
#   @return [String]
#
# @!attribute [rw] photographer
#   @return [Array]
#
# @!attribute [rw] station
#   @return [Array]
PhotoStation = Struct.new(
  :license,
  :photo_base_url,
  :photographer,
  :station,
  keyword_init: true
)

# Request payload for PhotoStation#load.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] photographer
#   @return [String, nil]
PhotoStationLoadMatch = Struct.new(
  :country,
  :photographer,
  keyword_init: true
)

# Request payload for PhotoStation#list.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
PhotoStationListMatch = Struct.new(
  :country,
  :id,
  keyword_init: true
)

# PhotoUpload entity data model.
class PhotoUpload
end

# Request payload for PhotoUpload#create.
class PhotoUploadCreateData
end

# Photographer entity data model.
class Photographer
end

# Request payload for Photographer#load.
class PhotographerLoadMatch
end

# Profile entity data model.
#
# @!attribute [rw] admin
#   @return [Boolean, nil]
#
# @!attribute [rw] anonymous
#   @return [Boolean, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] email_verified
#   @return [Boolean, nil]
#
# @!attribute [rw] license
#   @return [String]
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] new_password
#   @return [String]
#
# @!attribute [rw] nickname
#   @return [String]
#
# @!attribute [rw] photo_owner
#   @return [Boolean]
#
# @!attribute [rw] send_notification
#   @return [Boolean, nil]
Profile = Struct.new(
  :admin,
  :anonymous,
  :email,
  :email_verified,
  :license,
  :link,
  :new_password,
  :nickname,
  :photo_owner,
  :send_notification,
  keyword_init: true
)

# Request payload for Profile#load.
#
# @!attribute [rw] token
#   @return [String, nil]
ProfileLoadMatch = Struct.new(
  :token,
  keyword_init: true
)

# Request payload for Profile#create.
#
# @!attribute [rw] admin
#   @return [Boolean, nil]
#
# @!attribute [rw] anonymous
#   @return [Boolean, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] email_verified
#   @return [Boolean, nil]
#
# @!attribute [rw] license
#   @return [String]
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] new_password
#   @return [String]
#
# @!attribute [rw] nickname
#   @return [String]
#
# @!attribute [rw] photo_owner
#   @return [Boolean]
#
# @!attribute [rw] send_notification
#   @return [Boolean, nil]
ProfileCreateData = Struct.new(
  :admin,
  :anonymous,
  :email,
  :email_verified,
  :license,
  :link,
  :new_password,
  :nickname,
  :photo_owner,
  :send_notification,
  keyword_init: true
)

# Request payload for Profile#remove.
#
# @!attribute [rw] admin
#   @return [Boolean, nil]
#
# @!attribute [rw] anonymous
#   @return [Boolean, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] email_verified
#   @return [Boolean, nil]
#
# @!attribute [rw] license
#   @return [String, nil]
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] new_password
#   @return [String, nil]
#
# @!attribute [rw] nickname
#   @return [String, nil]
#
# @!attribute [rw] photo_owner
#   @return [Boolean, nil]
#
# @!attribute [rw] send_notification
#   @return [Boolean, nil]
ProfileRemoveMatch = Struct.new(
  :admin,
  :anonymous,
  :email,
  :email_verified,
  :license,
  :link,
  :new_password,
  :nickname,
  :photo_owner,
  :send_notification,
  keyword_init: true
)

# PublicInbox entity data model.
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float]
#
# @!attribute [rw] lon
#   @return [Float]
#
# @!attribute [rw] station_id
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String]
PublicInbox = Struct.new(
  :country_code,
  :lat,
  :lon,
  :station_id,
  :title,
  keyword_init: true
)

# Request payload for PublicInbox#list.
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] station_id
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
PublicInboxListMatch = Struct.new(
  :country_code,
  :lat,
  :lon,
  :station_id,
  :title,
  keyword_init: true
)

# Stat entity data model.
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] photographer
#   @return [Integer]
#
# @!attribute [rw] total
#   @return [Integer]
#
# @!attribute [rw] with_photo
#   @return [Integer]
#
# @!attribute [rw] without_photo
#   @return [Integer]
Stat = Struct.new(
  :country_code,
  :photographer,
  :total,
  :with_photo,
  :without_photo,
  keyword_init: true
)

# Request payload for Stat#load.
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] photographer
#   @return [Integer, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
#
# @!attribute [rw] with_photo
#   @return [Integer, nil]
#
# @!attribute [rw] without_photo
#   @return [Integer, nil]
StatLoadMatch = Struct.new(
  :country_code,
  :photographer,
  :total,
  :with_photo,
  :without_photo,
  keyword_init: true
)

