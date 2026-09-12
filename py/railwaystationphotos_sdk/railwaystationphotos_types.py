# Typed models for the RailwayStationPhotos SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
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
    message: str
    status: int


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


class InboxRequired(TypedDict):
    id: int
    state: str


class Inbox(InboxRequired, total=False):
    comment: str
    countryCode: str
    crc32: int
    createdAt: int
    filename: str
    inboxUrl: str
    lat: float
    lon: float
    newLat: float
    newLon: float
    newTitle: str
    problemReportType: str
    rejectedReason: str
    stationId: str
    title: str


class InboxListMatch(TypedDict, total=False):
    show_completed_entry: bool


class InboxCreateDataRequired(TypedDict):
    id: int
    state: str


class InboxCreateData(InboxCreateDataRequired, total=False):
    comment: str
    countryCode: str
    crc32: int
    createdAt: int
    filename: str
    inboxUrl: str
    lat: float
    lon: float
    newLat: float
    newLon: float
    newTitle: str
    problemReportType: str
    rejectedReason: str
    stationId: str
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


class InboxStateQuery(TypedDict):
    pass


class OAuthTokenRequired(TypedDict):
    access_token: str
    scope: str
    token_type: str


class OAuthToken(OAuthTokenRequired, total=False):
    expires_in: int
    refresh_token: str


class OAuthTokenCreateDataRequired(TypedDict):
    access_token: str
    scope: str
    token_type: str


class OAuthTokenCreateData(OAuthTokenCreateDataRequired, total=False):
    expires_in: int
    refresh_token: str


class Oauth(TypedDict):
    pass


class OauthLoadMatchRequired(TypedDict):
    client_id: str
    redirect_uri: str
    response_type: str
    scope: str


class OauthLoadMatch(OauthLoadMatchRequired, total=False):
    code_challenge: str
    code_challenge_method: str
    state: str


class OauthCreateData(TypedDict):
    pass


class Photo(TypedDict, total=False):
    id: str


class PhotoLoadMatchRequired(TypedDict):
    country: str
    filename: str


class PhotoLoadMatch(PhotoLoadMatchRequired, total=False):
    width: int


class PhotoDownload(TypedDict):
    pass


class PhotoDownloadLoadMatchRequired(TypedDict):
    filename: str


class PhotoDownloadLoadMatch(PhotoDownloadLoadMatchRequired, total=False):
    width: int


class PhotoStationRequired(TypedDict):
    licenses: list
    photoBaseUrl: str
    photographers: list
    stations: list


class PhotoStation(PhotoStationRequired, total=False):
    id: str


class PhotoStationLoadMatchRequired(TypedDict):
    country: str


class PhotoStationLoadMatch(PhotoStationLoadMatchRequired, total=False):
    has_photo: bool
    is_active: bool


class PhotoStationListMatch(TypedDict, total=False):
    since_hour: int


class PhotoUpload(TypedDict):
    pass


class PhotoUploadCreateData(TypedDict):
    pass


class Photographer(TypedDict):
    pass


class PhotographerLoadMatch(TypedDict, total=False):
    country: str


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
    license: str
    newPassword: str
    nickname: str
    photoOwner: bool


class ProfileCreateData(ProfileCreateDataRequired, total=False):
    admin: bool
    anonymous: bool
    email: str
    emailVerified: bool
    link: str
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


class StatRequired(TypedDict):
    photographers: int
    total: int
    withPhoto: int
    withoutPhoto: int


class Stat(StatRequired, total=False):
    countryCode: str


class StatLoadMatch(TypedDict, total=False):
    country: str
