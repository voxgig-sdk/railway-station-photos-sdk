<?php
declare(strict_types=1);

// RailwayStationPhotos SDK utility: feature_add

class RailwayStationPhotosFeatureAdd
{
    public static function call(RailwayStationPhotosContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
