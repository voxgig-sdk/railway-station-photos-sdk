<?php
declare(strict_types=1);

// RailwayStationPhotos SDK base feature

class RailwayStationPhotosBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(RailwayStationPhotosContext $ctx, array $options): void {}
    public function PostConstruct(RailwayStationPhotosContext $ctx): void {}
    public function PostConstructEntity(RailwayStationPhotosContext $ctx): void {}
    public function SetData(RailwayStationPhotosContext $ctx): void {}
    public function GetData(RailwayStationPhotosContext $ctx): void {}
    public function GetMatch(RailwayStationPhotosContext $ctx): void {}
    public function SetMatch(RailwayStationPhotosContext $ctx): void {}
    public function PrePoint(RailwayStationPhotosContext $ctx): void {}
    public function PreSpec(RailwayStationPhotosContext $ctx): void {}
    public function PreRequest(RailwayStationPhotosContext $ctx): void {}
    public function PreResponse(RailwayStationPhotosContext $ctx): void {}
    public function PreResult(RailwayStationPhotosContext $ctx): void {}
    public function PreDone(RailwayStationPhotosContext $ctx): void {}
    public function PreUnexpected(RailwayStationPhotosContext $ctx): void {}
}
