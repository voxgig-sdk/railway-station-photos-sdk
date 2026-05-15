<?php
declare(strict_types=1);

// RailwayStationPhotos SDK utility: result_body

class RailwayStationPhotosResultBody
{
    public static function call(RailwayStationPhotosContext $ctx): ?RailwayStationPhotosResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
