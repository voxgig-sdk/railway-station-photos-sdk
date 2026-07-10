// Typed models for the RailwayStationPhotos SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface AdminInbox {
  active?: boolean
  command: string
  conflict_resolution?: string
  country_code?: string
  ds100?: string
  id: number
  lat?: number
  lon?: number
  message: string
  reject_reason?: string
  station_id?: string
  status: number
  title?: string
}

export interface AdminInboxCreateData {
  active?: boolean
  command: string
  conflict_resolution?: string
  country_code?: string
  ds100?: string
  id: number
  lat?: number
  lon?: number
  message: string
  reject_reason?: string
  station_id?: string
  status: number
  title?: string
}

export interface Country {
  active: boolean
  allow_photo_upload: boolean
  code: string
  email?: string
  message?: string
  name: string
  override_license?: string
  provider_app?: any[]
  timetable_url_template?: string
}

export interface CountryListMatch {
  active?: boolean
  allow_photo_upload?: boolean
  code?: string
  email?: string
  message?: string
  name?: string
  override_license?: string
  provider_app?: any[]
  timetable_url_template?: string
}

export interface Inbox {
  comment?: string
  country_code?: string
  crc32?: number
  created_at?: number
  filename?: string
  id: number
  inbox_url?: string
  lat?: number
  lon?: number
  new_lat?: number
  new_lon?: number
  new_title?: string
  problem_report_type?: string
  rejected_reason?: string
  state: string
  station_id?: string
  title?: string
}

export interface InboxListMatch {
  comment?: string
  country_code?: string
  crc32?: number
  created_at?: number
  filename?: string
  id?: number
  inbox_url?: string
  lat?: number
  lon?: number
  new_lat?: number
  new_lon?: number
  new_title?: string
  problem_report_type?: string
  rejected_reason?: string
  state?: string
  station_id?: string
  title?: string
}

export interface InboxCreateData {
  comment?: string
  country_code?: string
  crc32?: number
  created_at?: number
  filename?: string
  id: number
  inbox_url?: string
  lat?: number
  lon?: number
  new_lat?: number
  new_lon?: number
  new_title?: string
  problem_report_type?: string
  rejected_reason?: string
  state: string
  station_id?: string
  title?: string
}

export interface InboxRemoveMatch {
  id: number
}

export interface InboxCount {
  pending_inbox_entry: number
}

export interface InboxCountLoadMatch {
  pending_inbox_entry?: number
}

export interface InboxEntry {
  active?: boolean
  comment: string
  country_code?: string
  created_at: number
  done: boolean
  filename?: string
  has_conflict?: boolean
  has_photo: boolean
  id: number
  inbox_url?: string
  is_processed?: boolean
  lat?: number
  lon?: number
  new_lat?: number
  new_lon?: number
  new_title?: string
  photo_id?: number
  photographer_email?: string
  photographer_nickname: string
  problem_report_type?: string
  station_id?: string
  title?: string
}

export interface InboxEntryListMatch {
  active?: boolean
  comment?: string
  country_code?: string
  created_at?: number
  done?: boolean
  filename?: string
  has_conflict?: boolean
  has_photo?: boolean
  id?: number
  inbox_url?: string
  is_processed?: boolean
  lat?: number
  lon?: number
  new_lat?: number
  new_lon?: number
  new_title?: string
  photo_id?: number
  photographer_email?: string
  photographer_nickname?: string
  problem_report_type?: string
  station_id?: string
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
  license: any[]
  photo_base_url: string
  photographer: any[]
  station: any[]
}

export interface PhotoStationLoadMatch {
  country?: string
  photographer?: string
}

export interface PhotoStationListMatch {
  country?: string
  id?: string
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
  email_verified?: boolean
  license: string
  link?: string
  new_password: string
  nickname: string
  photo_owner: boolean
  send_notification?: boolean
}

export interface ProfileLoadMatch {
  token?: string
}

export interface ProfileCreateData {
  admin?: boolean
  anonymous?: boolean
  email?: string
  email_verified?: boolean
  license: string
  link?: string
  new_password: string
  nickname: string
  photo_owner: boolean
  send_notification?: boolean
}

export interface ProfileRemoveMatch {
  admin?: boolean
  anonymous?: boolean
  email?: string
  email_verified?: boolean
  license?: string
  link?: string
  new_password?: string
  nickname?: string
  photo_owner?: boolean
  send_notification?: boolean
}

export interface PublicInbox {
  country_code?: string
  lat: number
  lon: number
  station_id?: string
  title: string
}

export interface PublicInboxListMatch {
  country_code?: string
  lat?: number
  lon?: number
  station_id?: string
  title?: string
}

export interface Stat {
  country_code?: string
  photographer: number
  total: number
  with_photo: number
  without_photo: number
}

export interface StatLoadMatch {
  country_code?: string
  photographer?: number
  total?: number
  with_photo?: number
  without_photo?: number
}

