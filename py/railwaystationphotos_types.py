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
    active: bool
    conflict_resolution: str
    country_code: str
    ds100: str
    lat: float
    lon: float
    reject_reason: str
    station_id: str
    title: str


class AdminInboxCreateDataRequired(TypedDict):
    command: str
    id: int
    message: str
    status: int


class AdminInboxCreateData(AdminInboxCreateDataRequired, total=False):
    active: bool
    conflict_resolution: str
    country_code: str
    ds100: str
    lat: float
    lon: float
    reject_reason: str
    station_id: str
    title: str


class CountryRequired(TypedDict):
    active: bool
    allow_photo_upload: bool
    code: str
    name: str


class Country(CountryRequired, total=False):
    email: str
    message: str
    override_license: str
    provider_app: list
    timetable_url_template: str


class CountryListMatch(TypedDict, total=False):
    active: bool
    allow_photo_upload: bool
    code: str
    email: str
    message: str
    name: str
    override_license: str
    provider_app: list
    timetable_url_template: str


class InboxRequired(TypedDict):
    id: int
    state: str


class Inbox(InboxRequired, total=False):
    comment: str
    country_code: str
    crc32: int
    created_at: int
    filename: str
    inbox_url: str
    lat: float
    lon: float
    new_lat: float
    new_lon: float
    new_title: str
    problem_report_type: str
    rejected_reason: str
    station_id: str
    title: str


class InboxListMatch(TypedDict, total=False):
    comment: str
    country_code: str
    crc32: int
    created_at: int
    filename: str
    id: int
    inbox_url: str
    lat: float
    lon: float
    new_lat: float
    new_lon: float
    new_title: str
    problem_report_type: str
    rejected_reason: str
    state: str
    station_id: str
    title: str


class InboxCreateDataRequired(TypedDict):
    id: int
    state: str


class InboxCreateData(InboxCreateDataRequired, total=False):
    comment: str
    country_code: str
    crc32: int
    created_at: int
    filename: str
    inbox_url: str
    lat: float
    lon: float
    new_lat: float
    new_lon: float
    new_title: str
    problem_report_type: str
    rejected_reason: str
    station_id: str
    title: str


class InboxRemoveMatch(TypedDict):
    id: int


class InboxCount(TypedDict):
    pending_inbox_entry: int


class InboxCountLoadMatch(TypedDict, total=False):
    pending_inbox_entry: int


class InboxEntryRequired(TypedDict):
    comment: str
    created_at: int
    done: bool
    has_photo: bool
    id: int
    photographer_nickname: str


class InboxEntry(InboxEntryRequired, total=False):
    active: bool
    country_code: str
    filename: str
    has_conflict: bool
    inbox_url: str
    is_processed: bool
    lat: float
    lon: float
    new_lat: float
    new_lon: float
    new_title: str
    photo_id: int
    photographer_email: str
    problem_report_type: str
    station_id: str
    title: str


class InboxEntryListMatch(TypedDict, total=False):
    active: bool
    comment: str
    country_code: str
    created_at: int
    done: bool
    filename: str
    has_conflict: bool
    has_photo: bool
    id: int
    inbox_url: str
    is_processed: bool
    lat: float
    lon: float
    new_lat: float
    new_lon: float
    new_title: str
    photo_id: int
    photographer_email: str
    photographer_nickname: str
    problem_report_type: str
    station_id: str
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


class OauthLoadMatch(TypedDict):
    pass


class OauthCreateData(TypedDict):
    pass


class Photo(TypedDict):
    pass


class PhotoLoadMatch(TypedDict):
    country: str
    filename: str


class PhotoDownload(TypedDict):
    pass


class PhotoDownloadLoadMatch(TypedDict):
    filename: str


class PhotoStation(TypedDict):
    license: list
    photo_base_url: str
    photographer: list
    station: list


class PhotoStationLoadMatch(TypedDict):
    country: str
    photographer: str


class PhotoStationListMatch(TypedDict):
    country: str
    id: str


class PhotoUpload(TypedDict):
    pass


class PhotoUploadCreateData(TypedDict):
    pass


class Photographer(TypedDict):
    pass


class PhotographerLoadMatch(TypedDict):
    pass


class ProfileRequired(TypedDict):
    license: str
    new_password: str
    nickname: str
    photo_owner: bool


class Profile(ProfileRequired, total=False):
    admin: bool
    anonymous: bool
    email: str
    email_verified: bool
    link: str
    send_notification: bool


class ProfileLoadMatch(TypedDict):
    token: str


class ProfileCreateDataRequired(TypedDict):
    license: str
    new_password: str
    nickname: str
    photo_owner: bool


class ProfileCreateData(ProfileCreateDataRequired, total=False):
    admin: bool
    anonymous: bool
    email: str
    email_verified: bool
    link: str
    send_notification: bool


class ProfileRemoveMatch(TypedDict, total=False):
    admin: bool
    anonymous: bool
    email: str
    email_verified: bool
    license: str
    link: str
    new_password: str
    nickname: str
    photo_owner: bool
    send_notification: bool


class PublicInboxRequired(TypedDict):
    lat: float
    lon: float
    title: str


class PublicInbox(PublicInboxRequired, total=False):
    country_code: str
    station_id: str


class PublicInboxListMatch(TypedDict, total=False):
    country_code: str
    lat: float
    lon: float
    station_id: str
    title: str


class StatRequired(TypedDict):
    photographer: int
    total: int
    with_photo: int
    without_photo: int


class Stat(StatRequired, total=False):
    country_code: str


class StatLoadMatch(TypedDict, total=False):
    country_code: str
    photographer: int
    total: int
    with_photo: int
    without_photo: int
