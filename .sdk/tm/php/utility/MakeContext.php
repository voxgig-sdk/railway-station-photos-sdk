<?php
declare(strict_types=1);

// RailwayStationPhotos SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class RailwayStationPhotosMakeContext
{
    public static function call(array $ctxmap, ?RailwayStationPhotosContext $basectx): RailwayStationPhotosContext
    {
        return new RailwayStationPhotosContext($ctxmap, $basectx);
    }
}
