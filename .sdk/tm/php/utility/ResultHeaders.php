<?php
declare(strict_types=1);

// RailwayStationPhotos SDK utility: result_headers

class RailwayStationPhotosResultHeaders
{
    public static function call(RailwayStationPhotosContext $ctx): ?RailwayStationPhotosResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
