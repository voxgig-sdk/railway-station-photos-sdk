// Typed models for the RailwayStationPhotos SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AdminInbox {
  DS100?: string
  active?: boolean
  command: string
  conflictResolution?: string
  countryCode?: string
  id: number
  lat?: number
  lon?: number
  message: string
  rejectReason?: string
  stationId?: string
  status: number
  title?: string
}

export interface AdminInboxCreateData {
  DS100?: string
  active?: boolean
  command: string
  conflictResolution?: string
  countryCode?: string
  id: number
  lat?: number
  lon?: number
  message: string
  rejectReason?: string
  stationId?: string
  status: number
  title?: string
}

export interface Country {
  active: boolean
  allowPhotoUploads: boolean
  code: string
  email?: string
  message?: string
  name: string
  overrideLicense?: string
  providerApps?: any[]
  timetableUrlTemplate?: string
}

export interface CountryListMatch {
  active?: boolean
  allowPhotoUploads?: boolean
  code?: string
  email?: string
  message?: string
  name?: string
  overrideLicense?: string
  providerApps?: any[]
  timetableUrlTemplate?: string
}

export interface Inbox {
  comment?: string
  countryCode?: string
  crc32?: number
  createdAt?: number
  filename?: string
  id: number
  inboxUrl?: string
  lat?: number
  lon?: number
  newLat?: number
  newLon?: number
  newTitle?: string
  problemReportType?: string
  rejectedReason?: string
  state: string
  stationId?: string
  title?: string
}

export interface InboxListMatch {
  comment?: string
  countryCode?: string
  crc32?: number
  createdAt?: number
  filename?: string
  id?: number
  inboxUrl?: string
  lat?: number
  lon?: number
  newLat?: number
  newLon?: number
  newTitle?: string
  problemReportType?: string
  rejectedReason?: string
  state?: string
  stationId?: string
  title?: string
}

export interface InboxCreateData {
  comment?: string
  countryCode?: string
  crc32?: number
  createdAt?: number
  filename?: string
  id: number
  inboxUrl?: string
  lat?: number
  lon?: number
  newLat?: number
  newLon?: number
  newTitle?: string
  problemReportType?: string
  rejectedReason?: string
  state: string
  stationId?: string
  title?: string
}

export interface InboxRemoveMatch {
  id: number
}

export interface InboxCount {
  pendingInboxEntries: number
}

export interface InboxCountLoadMatch {
  pendingInboxEntries?: number
}

export interface InboxEntry {
  active?: boolean
  comment: string
  countryCode?: string
  createdAt: number
  done: boolean
  filename?: string
  hasConflict?: boolean
  hasPhoto: boolean
  id: number
  inboxUrl?: string
  isProcessed?: boolean
  lat?: number
  lon?: number
  newLat?: number
  newLon?: number
  newTitle?: string
  photoId?: number
  photographerEmail?: string
  photographerNickname: string
  problemReportType?: string
  stationId?: string
  title?: string
}

export interface InboxEntryListMatch {
  active?: boolean
  comment?: string
  countryCode?: string
  createdAt?: number
  done?: boolean
  filename?: string
  hasConflict?: boolean
  hasPhoto?: boolean
  id?: number
  inboxUrl?: string
  isProcessed?: boolean
  lat?: number
  lon?: number
  newLat?: number
  newLon?: number
  newTitle?: string
  photoId?: number
  photographerEmail?: string
  photographerNickname?: string
  problemReportType?: string
  stationId?: string
  title?: string
}

export interface InboxStateQuery {
}

export interface OAuthToken {
  access_token: string
  expires_in?: number
  refresh_token?: string
  scope: string
  token_type: string
}

export interface OAuthTokenCreateData {
  access_token: string
  expires_in?: number
  refresh_token?: string
  scope: string
  token_type: string
}

export interface Oauth {
}

export interface OauthLoadMatch {
}

export interface OauthCreateData {
}

export interface Photo {
}

export interface PhotoLoadMatch {
  country: string
  filename: string
}

export interface PhotoDownload {
}

export interface PhotoDownloadLoadMatch {
  filename: string
}

export interface PhotoStation {
  licenses: any[]
  photoBaseUrl: string
  photographers: any[]
  stations: any[]
}

export interface PhotoStationLoadMatch {
  country: string
}

export interface PhotoStationListMatch {
  licenses?: any[]
  photoBaseUrl?: string
  photographers?: any[]
  stations?: any[]
}

export interface PhotoUpload {
}

export interface PhotoUploadCreateData {
}

export interface Photographer {
}

export interface PhotographerLoadMatch {
}

export interface Profile {
  admin?: boolean
  anonymous?: boolean
  email?: string
  emailVerified?: boolean
  license: string
  link?: string
  newPassword: string
  nickname: string
  photoOwner: boolean
  sendNotifications?: boolean
}

export interface ProfileLoadMatch {
  token: string
}

export interface ProfileCreateData {
  admin?: boolean
  anonymous?: boolean
  email?: string
  emailVerified?: boolean
  license: string
  link?: string
  newPassword: string
  nickname: string
  photoOwner: boolean
  sendNotifications?: boolean
}

export interface ProfileRemoveMatch {
  admin?: boolean
  anonymous?: boolean
  email?: string
  emailVerified?: boolean
  license?: string
  link?: string
  newPassword?: string
  nickname?: string
  photoOwner?: boolean
  sendNotifications?: boolean
}

export interface PublicInbox {
  countryCode?: string
  lat: number
  lon: number
  stationId?: string
  title: string
}

export interface PublicInboxListMatch {
  countryCode?: string
  lat?: number
  lon?: number
  stationId?: string
  title?: string
}

export interface Stat {
  countryCode?: string
  photographers: number
  total: number
  withPhoto: number
  withoutPhoto: number
}

export interface StatLoadMatch {
  countryCode?: string
  photographers?: number
  total?: number
  withPhoto?: number
  withoutPhoto?: number
}

