<?php
declare(strict_types=1);

// RailwayStationPhotos SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

RailwayStationPhotosUtility::setRegistrar(function (RailwayStationPhotosUtility $u): void {
    $u->clean = [RailwayStationPhotosClean::class, 'call'];
    $u->done = [RailwayStationPhotosDone::class, 'call'];
    $u->make_error = [RailwayStationPhotosMakeError::class, 'call'];
    $u->feature_add = [RailwayStationPhotosFeatureAdd::class, 'call'];
    $u->feature_hook = [RailwayStationPhotosFeatureHook::class, 'call'];
    $u->feature_init = [RailwayStationPhotosFeatureInit::class, 'call'];
    $u->fetcher = [RailwayStationPhotosFetcher::class, 'call'];
    $u->make_fetch_def = [RailwayStationPhotosMakeFetchDef::class, 'call'];
    $u->make_context = [RailwayStationPhotosMakeContext::class, 'call'];
    $u->make_options = [RailwayStationPhotosMakeOptions::class, 'call'];
    $u->make_request = [RailwayStationPhotosMakeRequest::class, 'call'];
    $u->make_response = [RailwayStationPhotosMakeResponse::class, 'call'];
    $u->make_result = [RailwayStationPhotosMakeResult::class, 'call'];
    $u->make_point = [RailwayStationPhotosMakePoint::class, 'call'];
    $u->make_spec = [RailwayStationPhotosMakeSpec::class, 'call'];
    $u->make_url = [RailwayStationPhotosMakeUrl::class, 'call'];
    $u->param = [RailwayStationPhotosParam::class, 'call'];
    $u->prepare_auth = [RailwayStationPhotosPrepareAuth::class, 'call'];
    $u->prepare_body = [RailwayStationPhotosPrepareBody::class, 'call'];
    $u->prepare_headers = [RailwayStationPhotosPrepareHeaders::class, 'call'];
    $u->prepare_method = [RailwayStationPhotosPrepareMethod::class, 'call'];
    $u->prepare_params = [RailwayStationPhotosPrepareParams::class, 'call'];
    $u->prepare_path = [RailwayStationPhotosPreparePath::class, 'call'];
    $u->prepare_query = [RailwayStationPhotosPrepareQuery::class, 'call'];
    $u->result_basic = [RailwayStationPhotosResultBasic::class, 'call'];
    $u->result_body = [RailwayStationPhotosResultBody::class, 'call'];
    $u->result_headers = [RailwayStationPhotosResultHeaders::class, 'call'];
    $u->transform_request = [RailwayStationPhotosTransformRequest::class, 'call'];
    $u->transform_response = [RailwayStationPhotosTransformResponse::class, 'call'];
});
