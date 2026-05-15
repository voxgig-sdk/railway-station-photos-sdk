<?php
declare(strict_types=1);

// RailwayStationPhotos SDK utility: prepare_body

class RailwayStationPhotosPrepareBody
{
    public static function call(RailwayStationPhotosContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
