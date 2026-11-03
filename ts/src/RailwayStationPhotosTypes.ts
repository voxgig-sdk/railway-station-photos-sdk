// Typed models for the RailwayStationPhotos SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
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
  rejectReason?: string
  stationId?: string
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
  only_active?: boolean
}

export interface Done {
  id?: string
}

export interface DoneLoadMatch {
  id: string
  width?: number
}

export interface Inbox {
  comment: string
  countryCode: string
  crc32?: number
  createdAt?: number
  filename?: string
  id?: number
  inboxUrl?: string
  inbox_state_queries?: any[]
  lat?: number
  lon?: number
  message?: string
  newLat?: number
  newLon?: number
  newTitle?: string
  photoId?: number
  problemReportType?: string
  rejectedReason?: string
  state: string
  stationId: string
  title?: string
  type: string
}

export interface InboxListMatch {
  show_completed_entry?: boolean
}

export interface InboxCreateData {
  comment: string
  countryCode: string
  inbox_state_queries?: any[]
  lat?: number
  lon?: number
  photoId?: number
  stationId: string
  title?: string
  type: string
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

export interface OAuthToken {
  access_token: string
  client_id: string
  code?: string
  code_verifier?: string
  expires_in?: number
  grant_type: string
  redirect_uri: string
  refresh_token?: string
  scope: string
  token_type: string
}

export interface OAuthTokenCreateData {
  access_token: string
  client_id: string
  code?: string
  code_verifier?: string
  expires_in?: number
  grant_type: string
  redirect_uri: string
  refresh_token?: string
  scope: string
  token_type: string
}

export interface Oauth {
  token: string
  token_type_hint?: string
}

export interface OauthLoadMatch {
  client_id: string
  code_challenge?: string
  code_challenge_method?: string
  redirect_uri: string
  response_type: string
  scope: string
  state?: string
}

export interface OauthCreateData {
  token: string
  token_type_hint?: string
}

export interface Photo {
  id?: string
}

export interface PhotoLoadMatch {
  country: string
  filename: string
  width?: number
}

export interface PhotoDownloadInbox {
  id?: string
}

export interface PhotoDownloadInboxLoadMatch {
  id: string
  width?: number
}

export interface PhotoStationById {
  id?: string
  licenses: any[]
  photoBaseUrl: string
  photographers: any[]
  stations: any[]
}

export interface PhotoStationByIdLoadMatch {
  country: string
  id: string
}

export interface PhotoStationsByCountry {
  id?: string
  licenses: any[]
  photoBaseUrl: string
  photographers: any[]
  stations: any[]
}

export interface PhotoStationsByCountryLoadMatch {
  id: string
  has_photo?: boolean
  is_active?: boolean
}

export interface PhotoStationsByPhotographer {
  id?: string
  licenses: any[]
  photoBaseUrl: string
  photographers: any[]
  stations: any[]
}

export interface PhotoStationsByPhotographerLoadMatch {
  id: string
  country?: string
}

export interface PhotoStationsByRecentPhotoImport {
  licenses: any[]
  photoBaseUrl: string
  photographers: any[]
  stations: any[]
}

export interface PhotoStationsByRecentPhotoImportListMatch {
  since_hour?: number
}

export interface PhotoUpload {
  crc32?: number
  filename?: string
  id?: number
  inboxUrl?: string
  message?: string
  state: string
}

export interface PhotoUploadCreateData {
  crc32?: number
  filename?: string
  id?: number
  inboxUrl?: string
  message?: string
  state: string
  $body?: Uint8Array | ArrayBuffer | Blob | ReadableStream | AsyncIterable<Uint8Array> | string
}

export interface Photographer {
}

export interface PhotographerLoadMatch {
  country?: string
}

export interface Processed {
  id?: string
}

export interface ProcessedLoadMatch {
  id: string
  width?: number
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
  email: string
  emailVerified?: boolean
  license?: string
  link?: string
  newPassword: string
  nickname: string
  photoOwner?: boolean
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

export interface Rejected {
  id?: string
}

export interface RejectedLoadMatch {
  id: string
  width?: number
}

export interface Stat {
  countryCode?: string
  photographers: number
  total: number
  withPhoto: number
  withoutPhoto: number
}

export interface StatLoadMatch {
  country?: string
}

