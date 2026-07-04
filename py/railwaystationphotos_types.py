# Typed models for the RailwayStationPhotos SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class AdminInbox:
    command: str
    id: int
    message: str
    status: int
    active: Optional[bool] = None
    conflict_resolution: Optional[str] = None
    country_code: Optional[str] = None
    ds100: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    reject_reason: Optional[str] = None
    station_id: Optional[str] = None
    title: Optional[str] = None


@dataclass
class AdminInboxCreateData:
    active: Optional[bool] = None
    command: Optional[str] = None
    conflict_resolution: Optional[str] = None
    country_code: Optional[str] = None
    ds100: Optional[str] = None
    id: Optional[int] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    message: Optional[str] = None
    reject_reason: Optional[str] = None
    station_id: Optional[str] = None
    status: Optional[int] = None
    title: Optional[str] = None


@dataclass
class Country:
    active: bool
    allow_photo_upload: bool
    code: str
    name: str
    email: Optional[str] = None
    message: Optional[str] = None
    override_license: Optional[str] = None
    provider_app: Optional[list] = None
    timetable_url_template: Optional[str] = None


@dataclass
class CountryListMatch:
    active: Optional[bool] = None
    allow_photo_upload: Optional[bool] = None
    code: Optional[str] = None
    email: Optional[str] = None
    message: Optional[str] = None
    name: Optional[str] = None
    override_license: Optional[str] = None
    provider_app: Optional[list] = None
    timetable_url_template: Optional[str] = None


@dataclass
class Inbox:
    id: int
    state: str
    comment: Optional[str] = None
    country_code: Optional[str] = None
    crc32: Optional[int] = None
    created_at: Optional[int] = None
    filename: Optional[str] = None
    inbox_url: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    new_lat: Optional[float] = None
    new_lon: Optional[float] = None
    new_title: Optional[str] = None
    problem_report_type: Optional[str] = None
    rejected_reason: Optional[str] = None
    station_id: Optional[str] = None
    title: Optional[str] = None


@dataclass
class InboxListMatch:
    comment: Optional[str] = None
    country_code: Optional[str] = None
    crc32: Optional[int] = None
    created_at: Optional[int] = None
    filename: Optional[str] = None
    id: Optional[int] = None
    inbox_url: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    new_lat: Optional[float] = None
    new_lon: Optional[float] = None
    new_title: Optional[str] = None
    problem_report_type: Optional[str] = None
    rejected_reason: Optional[str] = None
    state: Optional[str] = None
    station_id: Optional[str] = None
    title: Optional[str] = None


@dataclass
class InboxCreateData:
    comment: Optional[str] = None
    country_code: Optional[str] = None
    crc32: Optional[int] = None
    created_at: Optional[int] = None
    filename: Optional[str] = None
    id: Optional[int] = None
    inbox_url: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    new_lat: Optional[float] = None
    new_lon: Optional[float] = None
    new_title: Optional[str] = None
    problem_report_type: Optional[str] = None
    rejected_reason: Optional[str] = None
    state: Optional[str] = None
    station_id: Optional[str] = None
    title: Optional[str] = None


@dataclass
class InboxRemoveMatch:
    id: int


@dataclass
class InboxCount:
    pending_inbox_entry: int


@dataclass
class InboxCountLoadMatch:
    pending_inbox_entry: Optional[int] = None


@dataclass
class InboxEntry:
    comment: str
    created_at: int
    done: bool
    has_photo: bool
    id: int
    photographer_nickname: str
    active: Optional[bool] = None
    country_code: Optional[str] = None
    filename: Optional[str] = None
    has_conflict: Optional[bool] = None
    inbox_url: Optional[str] = None
    is_processed: Optional[bool] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    new_lat: Optional[float] = None
    new_lon: Optional[float] = None
    new_title: Optional[str] = None
    photo_id: Optional[int] = None
    photographer_email: Optional[str] = None
    problem_report_type: Optional[str] = None
    station_id: Optional[str] = None
    title: Optional[str] = None


@dataclass
class InboxEntryListMatch:
    active: Optional[bool] = None
    comment: Optional[str] = None
    country_code: Optional[str] = None
    created_at: Optional[int] = None
    done: Optional[bool] = None
    filename: Optional[str] = None
    has_conflict: Optional[bool] = None
    has_photo: Optional[bool] = None
    id: Optional[int] = None
    inbox_url: Optional[str] = None
    is_processed: Optional[bool] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    new_lat: Optional[float] = None
    new_lon: Optional[float] = None
    new_title: Optional[str] = None
    photo_id: Optional[int] = None
    photographer_email: Optional[str] = None
    photographer_nickname: Optional[str] = None
    problem_report_type: Optional[str] = None
    station_id: Optional[str] = None
    title: Optional[str] = None


@dataclass
class InboxStateQuery:
    pass


@dataclass
class OAuthToken:
    access_token: str
    scope: str
    token_type: str
    expires_in: Optional[int] = None
    refresh_token: Optional[str] = None


@dataclass
class OAuthTokenCreateData:
    access_token: Optional[str] = None
    expires_in: Optional[int] = None
    refresh_token: Optional[str] = None
    scope: Optional[str] = None
    token_type: Optional[str] = None


@dataclass
class Oauth:
    pass


@dataclass
class OauthLoadMatch:
    pass


@dataclass
class OauthCreateData:
    pass


@dataclass
class Photo:
    pass


@dataclass
class PhotoLoadMatch:
    country: str
    filename: str


@dataclass
class PhotoDownload:
    pass


@dataclass
class PhotoDownloadLoadMatch:
    filename: str


@dataclass
class PhotoStation:
    license: list
    photo_base_url: str
    photographer: list
    station: list


@dataclass
class PhotoStationLoadMatch:
    country: str
    photographer: str


@dataclass
class PhotoStationListMatch:
    country: str
    id: str


@dataclass
class PhotoUpload:
    pass


@dataclass
class PhotoUploadCreateData:
    pass


@dataclass
class Photographer:
    pass


@dataclass
class PhotographerLoadMatch:
    pass


@dataclass
class Profile:
    license: str
    new_password: str
    nickname: str
    photo_owner: bool
    admin: Optional[bool] = None
    anonymous: Optional[bool] = None
    email: Optional[str] = None
    email_verified: Optional[bool] = None
    link: Optional[str] = None
    send_notification: Optional[bool] = None


@dataclass
class ProfileLoadMatch:
    token: str


@dataclass
class ProfileCreateData:
    admin: Optional[bool] = None
    anonymous: Optional[bool] = None
    email: Optional[str] = None
    email_verified: Optional[bool] = None
    license: Optional[str] = None
    link: Optional[str] = None
    new_password: Optional[str] = None
    nickname: Optional[str] = None
    photo_owner: Optional[bool] = None
    send_notification: Optional[bool] = None


@dataclass
class ProfileRemoveMatch:
    admin: Optional[bool] = None
    anonymous: Optional[bool] = None
    email: Optional[str] = None
    email_verified: Optional[bool] = None
    license: Optional[str] = None
    link: Optional[str] = None
    new_password: Optional[str] = None
    nickname: Optional[str] = None
    photo_owner: Optional[bool] = None
    send_notification: Optional[bool] = None


@dataclass
class PublicInbox:
    lat: float
    lon: float
    title: str
    country_code: Optional[str] = None
    station_id: Optional[str] = None


@dataclass
class PublicInboxListMatch:
    country_code: Optional[str] = None
    lat: Optional[float] = None
    lon: Optional[float] = None
    station_id: Optional[str] = None
    title: Optional[str] = None


@dataclass
class Stat:
    photographer: int
    total: int
    with_photo: int
    without_photo: int
    country_code: Optional[str] = None


@dataclass
class StatLoadMatch:
    country_code: Optional[str] = None
    photographer: Optional[int] = None
    total: Optional[int] = None
    with_photo: Optional[int] = None
    without_photo: Optional[int] = None

