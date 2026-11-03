# Typed models for the RailwayStationPhotos SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AdminInboxRequired(TypedDict):
    command: str
    id: int
    message: str
    status: int


class AdminInbox(AdminInboxRequired, total=False):
    DS100: str
    active: bool
    conflictResolution: str
    countryCode: str
    lat: float
    lon: float
    rejectReason: str
    stationId: str
    title: str


class AdminInboxCreateDataRequired(TypedDict):
    command: str
    id: int


class AdminInboxCreateData(AdminInboxCreateDataRequired, total=False):
    DS100: str
    active: bool
    conflictResolution: str
    countryCode: str
    lat: float
    lon: float
    rejectReason: str
    stationId: str
    title: str


class CountryRequired(TypedDict):
    active: bool
    allowPhotoUploads: bool
    code: str
    name: str


class Country(CountryRequired, total=False):
    email: str
    message: str
    overrideLicense: str
    providerApps: list
    timetableUrlTemplate: str


class CountryListMatch(TypedDict, total=False):
    only_active: bool


class Done(TypedDict, total=False):
    id: str


class DoneLoadMatchRequired(TypedDict):
    id: str


class DoneLoadMatch(DoneLoadMatchRequired, total=False):
    width: int


class InboxRequired(TypedDict):
    comment: str
    countryCode: str
    state: str
    stationId: str
    type: str


class Inbox(InboxRequired, total=False):
    crc32: int
    createdAt: int
    filename: str
    id: int
    inboxUrl: str
    inbox_state_queries: list
    lat: float
    lon: float
    message: str
    newLat: float
    newLon: float
    newTitle: str
    photoId: int
    problemReportType: str
    rejectedReason: str
    title: str


class InboxListMatch(TypedDict, total=False):
    show_completed_entry: bool


class InboxCreateDataRequired(TypedDict):
    comment: str
    countryCode: str
    stationId: str
    type: str


class InboxCreateData(InboxCreateDataRequired, total=False):
    inbox_state_queries: list
    lat: float
    lon: float
    photoId: int
    title: str


class InboxRemoveMatch(TypedDict):
    id: int


class InboxCount(TypedDict):
    pendingInboxEntries: int


class InboxCountLoadMatch(TypedDict, total=False):
    pendingInboxEntries: int


class InboxEntryRequired(TypedDict):
    comment: str
    createdAt: int
    done: bool
    hasPhoto: bool
    id: int
    photographerNickname: str


class InboxEntry(InboxEntryRequired, total=False):
    active: bool
    countryCode: str
    filename: str
    hasConflict: bool
    inboxUrl: str
    isProcessed: bool
    lat: float
    lon: float
    newLat: float
    newLon: float
    newTitle: str
    photoId: int
    photographerEmail: str
    problemReportType: str
    stationId: str
    title: str


class InboxEntryListMatch(TypedDict, total=False):
    active: bool
    comment: str
    countryCode: str
    createdAt: int
    done: bool
    filename: str
    hasConflict: bool
    hasPhoto: bool
    id: int
    inboxUrl: str
    isProcessed: bool
    lat: float
    lon: float
    newLat: float
    newLon: float
    newTitle: str
    photoId: int
    photographerEmail: str
    photographerNickname: str
    problemReportType: str
    stationId: str
    title: str


class OAuthTokenRequired(TypedDict):
    access_token: str
    client_id: str
    grant_type: str
    redirect_uri: str
    scope: str
    token_type: str


class OAuthToken(OAuthTokenRequired, total=False):
    code: str
    code_verifier: str
    expires_in: int
    refresh_token: str


class OAuthTokenCreateDataRequired(TypedDict):
    access_token: str
    client_id: str
    grant_type: str
    redirect_uri: str
    scope: str
    token_type: str


class OAuthTokenCreateData(OAuthTokenCreateDataRequired, total=False):
    code: str
    code_verifier: str
    expires_in: int
    refresh_token: str


class OauthRequired(TypedDict):
    token: str


class Oauth(OauthRequired, total=False):
    token_type_hint: str


class OauthLoadMatchRequired(TypedDict):
    client_id: str
    redirect_uri: str
    response_type: str
    scope: str


class OauthLoadMatch(OauthLoadMatchRequired, total=False):
    code_challenge: str
    code_challenge_method: str
    state: str


class OauthCreateDataRequired(TypedDict):
    token: str


class OauthCreateData(OauthCreateDataRequired, total=False):
    token_type_hint: str


class Photo(TypedDict, total=False):
    id: str


class PhotoLoadMatchRequired(TypedDict):
    country: str
    filename: str


class PhotoLoadMatch(PhotoLoadMatchRequired, total=False):
    width: int


class PhotoDownloadInbox(TypedDict, total=False):
    id: str


class PhotoDownloadInboxLoadMatchRequired(TypedDict):
    id: str


class PhotoDownloadInboxLoadMatch(PhotoDownloadInboxLoadMatchRequired, total=False):
    width: int


class PhotoStationByIdRequired(TypedDict):
    licenses: list
    photoBaseUrl: str
    photographers: list
    stations: list


class PhotoStationById(PhotoStationByIdRequired, total=False):
    id: str


class PhotoStationByIdLoadMatch(TypedDict):
    country: str
    id: str


class PhotoStationsByCountryRequired(TypedDict):
    licenses: list
    photoBaseUrl: str
    photographers: list
    stations: list


class PhotoStationsByCountry(PhotoStationsByCountryRequired, total=False):
    id: str


class PhotoStationsByCountryLoadMatchRequired(TypedDict):
    id: str


class PhotoStationsByCountryLoadMatch(PhotoStationsByCountryLoadMatchRequired, total=False):
    has_photo: bool
    is_active: bool


class PhotoStationsByPhotographerRequired(TypedDict):
    licenses: list
    photoBaseUrl: str
    photographers: list
    stations: list


class PhotoStationsByPhotographer(PhotoStationsByPhotographerRequired, total=False):
    id: str


class PhotoStationsByPhotographerLoadMatchRequired(TypedDict):
    id: str


class PhotoStationsByPhotographerLoadMatch(PhotoStationsByPhotographerLoadMatchRequired, total=False):
    country: str


class PhotoStationsByRecentPhotoImport(TypedDict):
    licenses: list
    photoBaseUrl: str
    photographers: list
    stations: list


class PhotoStationsByRecentPhotoImportListMatch(TypedDict, total=False):
    since_hour: int


class PhotoUploadRequired(TypedDict):
    state: str


class PhotoUpload(PhotoUploadRequired, total=False):
    crc32: int
    filename: str
    id: int
    inboxUrl: str
    message: str


class PhotoUploadCreateDataRequired(TypedDict):
    state: str


class PhotoUploadCreateData(PhotoUploadCreateDataRequired, total=False):
    crc32: int
    filename: str
    id: int
    inboxUrl: str
    message: str


class Photographer(TypedDict):
    pass


class PhotographerLoadMatch(TypedDict, total=False):
    country: str


class Processed(TypedDict, total=False):
    id: str


class ProcessedLoadMatchRequired(TypedDict):
    id: str


class ProcessedLoadMatch(ProcessedLoadMatchRequired, total=False):
    width: int


class ProfileRequired(TypedDict):
    license: str
    newPassword: str
    nickname: str
    photoOwner: bool


class Profile(ProfileRequired, total=False):
    admin: bool
    anonymous: bool
    email: str
    emailVerified: bool
    link: str
    sendNotifications: bool


class ProfileLoadMatch(TypedDict):
    token: str


class ProfileCreateDataRequired(TypedDict):
    email: str
    newPassword: str
    nickname: str


class ProfileCreateData(ProfileCreateDataRequired, total=False):
    admin: bool
    anonymous: bool
    emailVerified: bool
    license: str
    link: str
    photoOwner: bool
    sendNotifications: bool


class ProfileRemoveMatch(TypedDict, total=False):
    admin: bool
    anonymous: bool
    email: str
    emailVerified: bool
    license: str
    link: str
    newPassword: str
    nickname: str
    photoOwner: bool
    sendNotifications: bool


class PublicInboxRequired(TypedDict):
    lat: float
    lon: float
    title: str


class PublicInbox(PublicInboxRequired, total=False):
    countryCode: str
    stationId: str


class PublicInboxListMatch(TypedDict, total=False):
    countryCode: str
    lat: float
    lon: float
    stationId: str
    title: str


class Rejected(TypedDict, total=False):
    id: str


class RejectedLoadMatchRequired(TypedDict):
    id: str


class RejectedLoadMatch(RejectedLoadMatchRequired, total=False):
    width: int


class StatRequired(TypedDict):
    photographers: int
    total: int
    withPhoto: int
    withoutPhoto: int


class Stat(StatRequired, total=False):
    countryCode: str


class StatLoadMatch(TypedDict, total=False):
    country: str
