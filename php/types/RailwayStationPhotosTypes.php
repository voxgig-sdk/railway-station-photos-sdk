<?php
declare(strict_types=1);

// Typed models for the RailwayStationPhotos SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** AdminInbox entity data model. */
class AdminInbox
{
    public ?bool $active = null;
    public string $command;
    public ?string $conflict_resolution = null;
    public ?string $country_code = null;
    public ?string $ds100 = null;
    public int $id;
    public ?float $lat = null;
    public ?float $lon = null;
    public string $message;
    public ?string $reject_reason = null;
    public ?string $station_id = null;
    public int $status;
    public ?string $title = null;
}

/** Request payload for AdminInbox#create. */
class AdminInboxCreateData
{
    public ?bool $active = null;
    public string $command;
    public ?string $conflict_resolution = null;
    public ?string $country_code = null;
    public ?string $ds100 = null;
    public int $id;
    public ?float $lat = null;
    public ?float $lon = null;
    public string $message;
    public ?string $reject_reason = null;
    public ?string $station_id = null;
    public int $status;
    public ?string $title = null;
}

/** Country entity data model. */
class Country
{
    public bool $active;
    public bool $allow_photo_upload;
    public string $code;
    public ?string $email = null;
    public ?string $message = null;
    public string $name;
    public ?string $override_license = null;
    public ?array $provider_app = null;
    public ?string $timetable_url_template = null;
}

/** Request payload for Country#list. */
class CountryListMatch
{
    public ?bool $active = null;
    public ?bool $allow_photo_upload = null;
    public ?string $code = null;
    public ?string $email = null;
    public ?string $message = null;
    public ?string $name = null;
    public ?string $override_license = null;
    public ?array $provider_app = null;
    public ?string $timetable_url_template = null;
}

/** Inbox entity data model. */
class Inbox
{
    public ?string $comment = null;
    public ?string $country_code = null;
    public ?int $crc32 = null;
    public ?int $created_at = null;
    public ?string $filename = null;
    public int $id;
    public ?string $inbox_url = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?float $new_lat = null;
    public ?float $new_lon = null;
    public ?string $new_title = null;
    public ?string $problem_report_type = null;
    public ?string $rejected_reason = null;
    public string $state;
    public ?string $station_id = null;
    public ?string $title = null;
}

/** Request payload for Inbox#list. */
class InboxListMatch
{
    public ?string $comment = null;
    public ?string $country_code = null;
    public ?int $crc32 = null;
    public ?int $created_at = null;
    public ?string $filename = null;
    public ?int $id = null;
    public ?string $inbox_url = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?float $new_lat = null;
    public ?float $new_lon = null;
    public ?string $new_title = null;
    public ?string $problem_report_type = null;
    public ?string $rejected_reason = null;
    public ?string $state = null;
    public ?string $station_id = null;
    public ?string $title = null;
}

/** Request payload for Inbox#create. */
class InboxCreateData
{
    public ?string $comment = null;
    public ?string $country_code = null;
    public ?int $crc32 = null;
    public ?int $created_at = null;
    public ?string $filename = null;
    public int $id;
    public ?string $inbox_url = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?float $new_lat = null;
    public ?float $new_lon = null;
    public ?string $new_title = null;
    public ?string $problem_report_type = null;
    public ?string $rejected_reason = null;
    public string $state;
    public ?string $station_id = null;
    public ?string $title = null;
}

/** Request payload for Inbox#remove. */
class InboxRemoveMatch
{
    public int $id;
}

/** InboxCount entity data model. */
class InboxCount
{
    public int $pending_inbox_entry;
}

/** Request payload for InboxCount#load. */
class InboxCountLoadMatch
{
    public ?int $pending_inbox_entry = null;
}

/** InboxEntry entity data model. */
class InboxEntry
{
    public ?bool $active = null;
    public string $comment;
    public ?string $country_code = null;
    public int $created_at;
    public bool $done;
    public ?string $filename = null;
    public ?bool $has_conflict = null;
    public bool $has_photo;
    public int $id;
    public ?string $inbox_url = null;
    public ?bool $is_processed = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?float $new_lat = null;
    public ?float $new_lon = null;
    public ?string $new_title = null;
    public ?int $photo_id = null;
    public ?string $photographer_email = null;
    public string $photographer_nickname;
    public ?string $problem_report_type = null;
    public ?string $station_id = null;
    public ?string $title = null;
}

/** Request payload for InboxEntry#list. */
class InboxEntryListMatch
{
    public ?bool $active = null;
    public ?string $comment = null;
    public ?string $country_code = null;
    public ?int $created_at = null;
    public ?bool $done = null;
    public ?string $filename = null;
    public ?bool $has_conflict = null;
    public ?bool $has_photo = null;
    public ?int $id = null;
    public ?string $inbox_url = null;
    public ?bool $is_processed = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?float $new_lat = null;
    public ?float $new_lon = null;
    public ?string $new_title = null;
    public ?int $photo_id = null;
    public ?string $photographer_email = null;
    public ?string $photographer_nickname = null;
    public ?string $problem_report_type = null;
    public ?string $station_id = null;
    public ?string $title = null;
}

/** InboxStateQuery entity data model. */
class InboxStateQuery
{
}

/** OAuthToken entity data model. */
class OAuthToken
{
    public string $access_token;
    public ?int $expires_in = null;
    public ?string $refresh_token = null;
    public string $scope;
    public string $token_type;
}

/** Request payload for OAuthToken#create. */
class OAuthTokenCreateData
{
    public string $access_token;
    public ?int $expires_in = null;
    public ?string $refresh_token = null;
    public string $scope;
    public string $token_type;
}

/** Oauth entity data model. */
class Oauth
{
}

/** Request payload for Oauth#load. */
class OauthLoadMatch
{
}

/** Request payload for Oauth#create. */
class OauthCreateData
{
}

/** Photo entity data model. */
class Photo
{
}

/** Request payload for Photo#load. */
class PhotoLoadMatch
{
    public string $country;
    public string $filename;
}

/** PhotoDownload entity data model. */
class PhotoDownload
{
}

/** Request payload for PhotoDownload#load. */
class PhotoDownloadLoadMatch
{
    public string $filename;
}

/** PhotoStation entity data model. */
class PhotoStation
{
    public array $license;
    public string $photo_base_url;
    public array $photographer;
    public array $station;
}

/** Request payload for PhotoStation#load. */
class PhotoStationLoadMatch
{
    public string $country;
    public string $photographer;
}

/** Request payload for PhotoStation#list. */
class PhotoStationListMatch
{
    public string $country;
    public string $id;
}

/** PhotoUpload entity data model. */
class PhotoUpload
{
}

/** Request payload for PhotoUpload#create. */
class PhotoUploadCreateData
{
}

/** Photographer entity data model. */
class Photographer
{
}

/** Request payload for Photographer#load. */
class PhotographerLoadMatch
{
}

/** Profile entity data model. */
class Profile
{
    public ?bool $admin = null;
    public ?bool $anonymous = null;
    public ?string $email = null;
    public ?bool $email_verified = null;
    public string $license;
    public ?string $link = null;
    public string $new_password;
    public string $nickname;
    public bool $photo_owner;
    public ?bool $send_notification = null;
}

/** Request payload for Profile#load. */
class ProfileLoadMatch
{
    public string $token;
}

/** Request payload for Profile#create. */
class ProfileCreateData
{
    public ?bool $admin = null;
    public ?bool $anonymous = null;
    public ?string $email = null;
    public ?bool $email_verified = null;
    public string $license;
    public ?string $link = null;
    public string $new_password;
    public string $nickname;
    public bool $photo_owner;
    public ?bool $send_notification = null;
}

/** Request payload for Profile#remove. */
class ProfileRemoveMatch
{
    public ?bool $admin = null;
    public ?bool $anonymous = null;
    public ?string $email = null;
    public ?bool $email_verified = null;
    public ?string $license = null;
    public ?string $link = null;
    public ?string $new_password = null;
    public ?string $nickname = null;
    public ?bool $photo_owner = null;
    public ?bool $send_notification = null;
}

/** PublicInbox entity data model. */
class PublicInbox
{
    public ?string $country_code = null;
    public float $lat;
    public float $lon;
    public ?string $station_id = null;
    public string $title;
}

/** Request payload for PublicInbox#list. */
class PublicInboxListMatch
{
    public ?string $country_code = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?string $station_id = null;
    public ?string $title = null;
}

/** Stat entity data model. */
class Stat
{
    public ?string $country_code = null;
    public int $photographer;
    public int $total;
    public int $with_photo;
    public int $without_photo;
}

/** Request payload for Stat#load. */
class StatLoadMatch
{
    public ?string $country_code = null;
    public ?int $photographer = null;
    public ?int $total = null;
    public ?int $with_photo = null;
    public ?int $without_photo = null;
}

