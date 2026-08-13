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
# @!attribute [rw] DS100
#   @return [String, nil]
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] command
#   @return [String]
#
# @!attribute [rw] conflictResolution
#   @return [String, nil]
#
# @!attribute [rw] countryCode
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
# @!attribute [rw] rejectReason
#   @return [String, nil]
#
# @!attribute [rw] stationId
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer]
#
# @!attribute [rw] title
#   @return [String, nil]
AdminInbox = Struct.new(
  :DS100,
  :active,
  :command,
  :conflictResolution,
  :countryCode,
  :id,
  :lat,
  :lon,
  :message,
  :rejectReason,
  :stationId,
  :status,
  :title,
  keyword_init: true
)

# Request payload for AdminInbox#create.
#
# @!attribute [rw] DS100
#   @return [String, nil]
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] command
#   @return [String]
#
# @!attribute [rw] conflictResolution
#   @return [String, nil]
#
# @!attribute [rw] countryCode
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
# @!attribute [rw] rejectReason
#   @return [String, nil]
#
# @!attribute [rw] stationId
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [Integer]
#
# @!attribute [rw] title
#   @return [String, nil]
AdminInboxCreateData = Struct.new(
  :DS100,
  :active,
  :command,
  :conflictResolution,
  :countryCode,
  :id,
  :lat,
  :lon,
  :message,
  :rejectReason,
  :stationId,
  :status,
  :title,
  keyword_init: true
)

# Country entity data model.
#
# @!attribute [rw] active
#   @return [Boolean]
#
# @!attribute [rw] allowPhotoUploads
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
# @!attribute [rw] overrideLicense
#   @return [String, nil]
#
# @!attribute [rw] providerApps
#   @return [Array, nil]
#
# @!attribute [rw] timetableUrlTemplate
#   @return [String, nil]
Country = Struct.new(
  :active,
  :allowPhotoUploads,
  :code,
  :email,
  :message,
  :name,
  :overrideLicense,
  :providerApps,
  :timetableUrlTemplate,
  keyword_init: true
)

# Request payload for Country#list.
#
# @!attribute [rw] active
#   @return [Boolean, nil]
#
# @!attribute [rw] allowPhotoUploads
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
# @!attribute [rw] overrideLicense
#   @return [String, nil]
#
# @!attribute [rw] providerApps
#   @return [Array, nil]
#
# @!attribute [rw] timetableUrlTemplate
#   @return [String, nil]
CountryListMatch = Struct.new(
  :active,
  :allowPhotoUploads,
  :code,
  :email,
  :message,
  :name,
  :overrideLicense,
  :providerApps,
  :timetableUrlTemplate,
  keyword_init: true
)

# Inbox entity data model.
#
# @!attribute [rw] comment
#   @return [String, nil]
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] crc32
#   @return [Integer, nil]
#
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] filename
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] inboxUrl
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] newLat
#   @return [Float, nil]
#
# @!attribute [rw] newLon
#   @return [Float, nil]
#
# @!attribute [rw] newTitle
#   @return [String, nil]
#
# @!attribute [rw] problemReportType
#   @return [String, nil]
#
# @!attribute [rw] rejectedReason
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] stationId
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Inbox = Struct.new(
  :comment,
  :countryCode,
  :crc32,
  :createdAt,
  :filename,
  :id,
  :inboxUrl,
  :lat,
  :lon,
  :newLat,
  :newLon,
  :newTitle,
  :problemReportType,
  :rejectedReason,
  :state,
  :stationId,
  :title,
  keyword_init: true
)

# Request payload for Inbox#list.
#
# @!attribute [rw] comment
#   @return [String, nil]
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] crc32
#   @return [Integer, nil]
#
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] filename
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] inboxUrl
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] newLat
#   @return [Float, nil]
#
# @!attribute [rw] newLon
#   @return [Float, nil]
#
# @!attribute [rw] newTitle
#   @return [String, nil]
#
# @!attribute [rw] problemReportType
#   @return [String, nil]
#
# @!attribute [rw] rejectedReason
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String, nil]
#
# @!attribute [rw] stationId
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
InboxListMatch = Struct.new(
  :comment,
  :countryCode,
  :crc32,
  :createdAt,
  :filename,
  :id,
  :inboxUrl,
  :lat,
  :lon,
  :newLat,
  :newLon,
  :newTitle,
  :problemReportType,
  :rejectedReason,
  :state,
  :stationId,
  :title,
  keyword_init: true
)

# Request payload for Inbox#create.
#
# @!attribute [rw] comment
#   @return [String, nil]
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] crc32
#   @return [Integer, nil]
#
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] filename
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] inboxUrl
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] newLat
#   @return [Float, nil]
#
# @!attribute [rw] newLon
#   @return [Float, nil]
#
# @!attribute [rw] newTitle
#   @return [String, nil]
#
# @!attribute [rw] problemReportType
#   @return [String, nil]
#
# @!attribute [rw] rejectedReason
#   @return [String, nil]
#
# @!attribute [rw] state
#   @return [String]
#
# @!attribute [rw] stationId
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
InboxCreateData = Struct.new(
  :comment,
  :countryCode,
  :crc32,
  :createdAt,
  :filename,
  :id,
  :inboxUrl,
  :lat,
  :lon,
  :newLat,
  :newLon,
  :newTitle,
  :problemReportType,
  :rejectedReason,
  :state,
  :stationId,
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
# @!attribute [rw] pendingInboxEntries
#   @return [Integer]
InboxCount = Struct.new(
  :pendingInboxEntries,
  keyword_init: true
)

# Request payload for InboxCount#load.
#
# @!attribute [rw] pendingInboxEntries
#   @return [Integer, nil]
InboxCountLoadMatch = Struct.new(
  :pendingInboxEntries,
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
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [Integer]
#
# @!attribute [rw] done
#   @return [Boolean]
#
# @!attribute [rw] filename
#   @return [String, nil]
#
# @!attribute [rw] hasConflict
#   @return [Boolean, nil]
#
# @!attribute [rw] hasPhoto
#   @return [Boolean]
#
# @!attribute [rw] id
#   @return [Integer]
#
# @!attribute [rw] inboxUrl
#   @return [String, nil]
#
# @!attribute [rw] isProcessed
#   @return [Boolean, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] newLat
#   @return [Float, nil]
#
# @!attribute [rw] newLon
#   @return [Float, nil]
#
# @!attribute [rw] newTitle
#   @return [String, nil]
#
# @!attribute [rw] photoId
#   @return [Integer, nil]
#
# @!attribute [rw] photographerEmail
#   @return [String, nil]
#
# @!attribute [rw] photographerNickname
#   @return [String]
#
# @!attribute [rw] problemReportType
#   @return [String, nil]
#
# @!attribute [rw] stationId
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
InboxEntry = Struct.new(
  :active,
  :comment,
  :countryCode,
  :createdAt,
  :done,
  :filename,
  :hasConflict,
  :hasPhoto,
  :id,
  :inboxUrl,
  :isProcessed,
  :lat,
  :lon,
  :newLat,
  :newLon,
  :newTitle,
  :photoId,
  :photographerEmail,
  :photographerNickname,
  :problemReportType,
  :stationId,
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
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] createdAt
#   @return [Integer, nil]
#
# @!attribute [rw] done
#   @return [Boolean, nil]
#
# @!attribute [rw] filename
#   @return [String, nil]
#
# @!attribute [rw] hasConflict
#   @return [Boolean, nil]
#
# @!attribute [rw] hasPhoto
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] inboxUrl
#   @return [String, nil]
#
# @!attribute [rw] isProcessed
#   @return [Boolean, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] newLat
#   @return [Float, nil]
#
# @!attribute [rw] newLon
#   @return [Float, nil]
#
# @!attribute [rw] newTitle
#   @return [String, nil]
#
# @!attribute [rw] photoId
#   @return [Integer, nil]
#
# @!attribute [rw] photographerEmail
#   @return [String, nil]
#
# @!attribute [rw] photographerNickname
#   @return [String, nil]
#
# @!attribute [rw] problemReportType
#   @return [String, nil]
#
# @!attribute [rw] stationId
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
InboxEntryListMatch = Struct.new(
  :active,
  :comment,
  :countryCode,
  :createdAt,
  :done,
  :filename,
  :hasConflict,
  :hasPhoto,
  :id,
  :inboxUrl,
  :isProcessed,
  :lat,
  :lon,
  :newLat,
  :newLon,
  :newTitle,
  :photoId,
  :photographerEmail,
  :photographerNickname,
  :problemReportType,
  :stationId,
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
# @!attribute [rw] licenses
#   @return [Array]
#
# @!attribute [rw] photoBaseUrl
#   @return [String]
#
# @!attribute [rw] photographers
#   @return [Array]
#
# @!attribute [rw] stations
#   @return [Array]
PhotoStation = Struct.new(
  :licenses,
  :photoBaseUrl,
  :photographers,
  :stations,
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
# @!attribute [rw] emailVerified
#   @return [Boolean, nil]
#
# @!attribute [rw] license
#   @return [String]
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] newPassword
#   @return [String]
#
# @!attribute [rw] nickname
#   @return [String]
#
# @!attribute [rw] photoOwner
#   @return [Boolean]
#
# @!attribute [rw] sendNotifications
#   @return [Boolean, nil]
Profile = Struct.new(
  :admin,
  :anonymous,
  :email,
  :emailVerified,
  :license,
  :link,
  :newPassword,
  :nickname,
  :photoOwner,
  :sendNotifications,
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
# @!attribute [rw] emailVerified
#   @return [Boolean, nil]
#
# @!attribute [rw] license
#   @return [String]
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] newPassword
#   @return [String]
#
# @!attribute [rw] nickname
#   @return [String]
#
# @!attribute [rw] photoOwner
#   @return [Boolean]
#
# @!attribute [rw] sendNotifications
#   @return [Boolean, nil]
ProfileCreateData = Struct.new(
  :admin,
  :anonymous,
  :email,
  :emailVerified,
  :license,
  :link,
  :newPassword,
  :nickname,
  :photoOwner,
  :sendNotifications,
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
# @!attribute [rw] emailVerified
#   @return [Boolean, nil]
#
# @!attribute [rw] license
#   @return [String, nil]
#
# @!attribute [rw] link
#   @return [String, nil]
#
# @!attribute [rw] newPassword
#   @return [String, nil]
#
# @!attribute [rw] nickname
#   @return [String, nil]
#
# @!attribute [rw] photoOwner
#   @return [Boolean, nil]
#
# @!attribute [rw] sendNotifications
#   @return [Boolean, nil]
ProfileRemoveMatch = Struct.new(
  :admin,
  :anonymous,
  :email,
  :emailVerified,
  :license,
  :link,
  :newPassword,
  :nickname,
  :photoOwner,
  :sendNotifications,
  keyword_init: true
)

# PublicInbox entity data model.
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float]
#
# @!attribute [rw] lon
#   @return [Float]
#
# @!attribute [rw] stationId
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String]
PublicInbox = Struct.new(
  :countryCode,
  :lat,
  :lon,
  :stationId,
  :title,
  keyword_init: true
)

# Request payload for PublicInbox#list.
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lon
#   @return [Float, nil]
#
# @!attribute [rw] stationId
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
PublicInboxListMatch = Struct.new(
  :countryCode,
  :lat,
  :lon,
  :stationId,
  :title,
  keyword_init: true
)

# Stat entity data model.
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] photographers
#   @return [Integer]
#
# @!attribute [rw] total
#   @return [Integer]
#
# @!attribute [rw] withPhoto
#   @return [Integer]
#
# @!attribute [rw] withoutPhoto
#   @return [Integer]
Stat = Struct.new(
  :countryCode,
  :photographers,
  :total,
  :withPhoto,
  :withoutPhoto,
  keyword_init: true
)

# Request payload for Stat#load.
#
# @!attribute [rw] countryCode
#   @return [String, nil]
#
# @!attribute [rw] photographers
#   @return [Integer, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
#
# @!attribute [rw] withPhoto
#   @return [Integer, nil]
#
# @!attribute [rw] withoutPhoto
#   @return [Integer, nil]
StatLoadMatch = Struct.new(
  :countryCode,
  :photographers,
  :total,
  :withPhoto,
  :withoutPhoto,
  keyword_init: true
)

