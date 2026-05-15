<?php
declare(strict_types=1);

// RailwayStationPhotos SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class RailwayStationPhotosFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new RailwayStationPhotosBaseFeature();
            case "test":
                return new RailwayStationPhotosTestFeature();
            default:
                return new RailwayStationPhotosBaseFeature();
        }
    }
}
