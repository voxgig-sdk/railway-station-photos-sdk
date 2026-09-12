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
    public ?string $DS100 = null;
    public ?bool $active = null;
    public string $command;
    public ?string $conflictResolution = null;
    public ?string $countryCode = null;
    public int $id;
    public ?float $lat = null;
    public ?float $lon = null;
    public string $message;
    public ?string $rejectReason = null;
    public ?string $stationId = null;
    public int $status;
    public ?string $title = null;
}

/** Request payload for AdminInbox#create. */
class AdminInboxCreateData
{
    public ?string $DS100 = null;
    public ?bool $active = null;
    public string $command;
    public ?string $conflictResolution = null;
    public ?string $countryCode = null;
    public int $id;
    public ?float $lat = null;
    public ?float $lon = null;
    public string $message;
    public ?string $rejectReason = null;
    public ?string $stationId = null;
    public int $status;
    public ?string $title = null;
}

/** Country entity data model. */
class Country
{
    public bool $active;
    public bool $allowPhotoUploads;
    public string $code;
    public ?string $email = null;
    public ?string $message = null;
    public string $name;
    public ?string $overrideLicense = null;
    public ?array $providerApps = null;
    public ?string $timetableUrlTemplate = null;
}

/** Request payload for Country#list. */
class CountryListMatch
{
    public ?bool $only_active = null;
}

/** Inbox entity data model. */
class Inbox
{
    public ?string $comment = null;
    public ?string $countryCode = null;
    public ?int $crc32 = null;
    public ?int $createdAt = null;
    public ?string $filename = null;
    public int $id;
    public ?string $inboxUrl = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?float $newLat = null;
    public ?float $newLon = null;
    public ?string $newTitle = null;
    public ?string $problemReportType = null;
    public ?string $rejectedReason = null;
    public string $state;
    public ?string $stationId = null;
    public ?string $title = null;
}

/** Request payload for Inbox#list. */
class InboxListMatch
{
    public ?bool $show_completed_entry = null;
}

/** Request payload for Inbox#create. */
class InboxCreateData
{
    public ?string $comment = null;
    public ?string $countryCode = null;
    public ?int $crc32 = null;
    public ?int $createdAt = null;
    public ?string $filename = null;
    public int $id;
    public ?string $inboxUrl = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?float $newLat = null;
    public ?float $newLon = null;
    public ?string $newTitle = null;
    public ?string $problemReportType = null;
    public ?string $rejectedReason = null;
    public string $state;
    public ?string $stationId = null;
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
    public int $pendingInboxEntries;
}

/** Request payload for InboxCount#load. */
class InboxCountLoadMatch
{
    public ?int $pendingInboxEntries = null;
}

/** InboxEntry entity data model. */
class InboxEntry
{
    public ?bool $active = null;
    public string $comment;
    public ?string $countryCode = null;
    public int $createdAt;
    public bool $done;
    public ?string $filename = null;
    public ?bool $hasConflict = null;
    public bool $hasPhoto;
    public int $id;
    public ?string $inboxUrl = null;
    public ?bool $isProcessed = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?float $newLat = null;
    public ?float $newLon = null;
    public ?string $newTitle = null;
    public ?int $photoId = null;
    public ?string $photographerEmail = null;
    public string $photographerNickname;
    public ?string $problemReportType = null;
    public ?string $stationId = null;
    public ?string $title = null;
}

/** Request payload for InboxEntry#list. */
class InboxEntryListMatch
{
    public ?bool $active = null;
    public ?string $comment = null;
    public ?string $countryCode = null;
    public ?int $createdAt = null;
    public ?bool $done = null;
    public ?string $filename = null;
    public ?bool $hasConflict = null;
    public ?bool $hasPhoto = null;
    public ?int $id = null;
    public ?string $inboxUrl = null;
    public ?bool $isProcessed = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?float $newLat = null;
    public ?float $newLon = null;
    public ?string $newTitle = null;
    public ?int $photoId = null;
    public ?string $photographerEmail = null;
    public ?string $photographerNickname = null;
    public ?string $problemReportType = null;
    public ?string $stationId = null;
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
    public string $client_id;
    public ?string $code_challenge = null;
    public ?string $code_challenge_method = null;
    public string $redirect_uri;
    public string $response_type;
    public string $scope;
    public ?string $state = null;
}

/** Request payload for Oauth#create. */
class OauthCreateData
{
}

/** Photo entity data model. */
class Photo
{
    public ?string $id = null;
}

/** Request payload for Photo#load. */
class PhotoLoadMatch
{
    public string $country;
    public string $filename;
    public ?int $width = null;
}

/** PhotoDownload entity data model. */
class PhotoDownload
{
}

/** Request payload for PhotoDownload#load. */
class PhotoDownloadLoadMatch
{
    public string $filename;
    public ?int $width = null;
}

/** PhotoStation entity data model. */
class PhotoStation
{
    public ?string $id = null;
    public array $licenses;
    public string $photoBaseUrl;
    public array $photographers;
    public array $stations;
}

/** Request payload for PhotoStation#load. */
class PhotoStationLoadMatch
{
    public string $country;
    public ?bool $has_photo = null;
    public ?bool $is_active = null;
}

/** Request payload for PhotoStation#list. */
class PhotoStationListMatch
{
    public ?int $since_hour = null;
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
    public ?string $country = null;
}

/** Profile entity data model. */
class Profile
{
    public ?bool $admin = null;
    public ?bool $anonymous = null;
    public ?string $email = null;
    public ?bool $emailVerified = null;
    public string $license;
    public ?string $link = null;
    public string $newPassword;
    public string $nickname;
    public bool $photoOwner;
    public ?bool $sendNotifications = null;
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
    public ?bool $emailVerified = null;
    public string $license;
    public ?string $link = null;
    public string $newPassword;
    public string $nickname;
    public bool $photoOwner;
    public ?bool $sendNotifications = null;
}

/** Request payload for Profile#remove. */
class ProfileRemoveMatch
{
    public ?bool $admin = null;
    public ?bool $anonymous = null;
    public ?string $email = null;
    public ?bool $emailVerified = null;
    public ?string $license = null;
    public ?string $link = null;
    public ?string $newPassword = null;
    public ?string $nickname = null;
    public ?bool $photoOwner = null;
    public ?bool $sendNotifications = null;
}

/** PublicInbox entity data model. */
class PublicInbox
{
    public ?string $countryCode = null;
    public float $lat;
    public float $lon;
    public ?string $stationId = null;
    public string $title;
}

/** Request payload for PublicInbox#list. */
class PublicInboxListMatch
{
    public ?string $countryCode = null;
    public ?float $lat = null;
    public ?float $lon = null;
    public ?string $stationId = null;
    public ?string $title = null;
}

/** Stat entity data model. */
class Stat
{
    public ?string $countryCode = null;
    public int $photographers;
    public int $total;
    public int $withPhoto;
    public int $withoutPhoto;
}

/** Request payload for Stat#load. */
class StatLoadMatch
{
    public ?string $country = null;
}

