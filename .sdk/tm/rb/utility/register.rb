# RailwayStationPhotos SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

RailwayStationPhotosUtility.registrar = ->(u) {
  u.clean = RailwayStationPhotosUtilities::Clean
  u.done = RailwayStationPhotosUtilities::Done
  u.make_error = RailwayStationPhotosUtilities::MakeError
  u.feature_add = RailwayStationPhotosUtilities::FeatureAdd
  u.feature_hook = RailwayStationPhotosUtilities::FeatureHook
  u.feature_init = RailwayStationPhotosUtilities::FeatureInit
  u.fetcher = RailwayStationPhotosUtilities::Fetcher
  u.make_fetch_def = RailwayStationPhotosUtilities::MakeFetchDef
  u.make_context = RailwayStationPhotosUtilities::MakeContext
  u.make_options = RailwayStationPhotosUtilities::MakeOptions
  u.make_request = RailwayStationPhotosUtilities::MakeRequest
  u.make_response = RailwayStationPhotosUtilities::MakeResponse
  u.make_result = RailwayStationPhotosUtilities::MakeResult
  u.make_point = RailwayStationPhotosUtilities::MakePoint
  u.make_spec = RailwayStationPhotosUtilities::MakeSpec
  u.make_url = RailwayStationPhotosUtilities::MakeUrl
  u.param = RailwayStationPhotosUtilities::Param
  u.prepare_auth = RailwayStationPhotosUtilities::PrepareAuth
  u.prepare_body = RailwayStationPhotosUtilities::PrepareBody
  u.prepare_headers = RailwayStationPhotosUtilities::PrepareHeaders
  u.prepare_method = RailwayStationPhotosUtilities::PrepareMethod
  u.prepare_params = RailwayStationPhotosUtilities::PrepareParams
  u.prepare_path = RailwayStationPhotosUtilities::PreparePath
  u.prepare_query = RailwayStationPhotosUtilities::PrepareQuery
  u.result_basic = RailwayStationPhotosUtilities::ResultBasic
  u.result_body = RailwayStationPhotosUtilities::ResultBody
  u.result_headers = RailwayStationPhotosUtilities::ResultHeaders
  u.transform_request = RailwayStationPhotosUtilities::TransformRequest
  u.transform_response = RailwayStationPhotosUtilities::TransformResponse
}
