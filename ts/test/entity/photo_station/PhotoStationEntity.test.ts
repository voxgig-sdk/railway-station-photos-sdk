

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { RailwayStationPhotosSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('PhotoStationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RAILWAY_STATION_PHOTOS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RailwayStationPhotosSDK.test()
    const ent = testsdk.PhotoStation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'photo_station.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"licenses","req":true,"short":"List of used licenses, might be empty if no photos available","type":"`$ARRAY`","index$":1},{"active":true,"name":"photoBaseUrl","req":true,"short":"Base URL of all photos","type":"`$STRING`","index$":2},{"active":true,"name":"photographers","req":true,"short":"List of all photographers, might be empty if no photos available","type":"`$ARRAY`","index$":3},{"active":true,"name":"stations","req":true,"short":"List of the stations","type":"`$ARRAY`","index$":4}],"id":{"field":"id","name":"id","parts":["country","id"],"sep":"/"},"name":"photo_station","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":10,"kind":"query","name":"since_hour","orig":"since_hour","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /photoStationsByRecentPhotoImports","json":"{\"operationId\":\"getPhotoStationsByRecentPhotoImports\",\"parameters\":[{\"description\":\"defines the timeframe since when to look for recent photo uploads,\\ndefault is 10h\\n\",\"in\":\"query\",\"name\":\"sinceHours\",\"schema\":{\"default\":10,\"format\":\"int32\",\"maximum\":800,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Stations with photos\",\"properties\":{\"licenses\":{\"description\":\"List of used licenses, might be empty if no photos available\",\"items\":{\"description\":\"License used by a photo\",\"properties\":{\"id\":{\"description\":\"Unique id of the license\",\"example\":\"CC0\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the license to display at the photo\",\"example\":\"CC0 1.0 Universell (CC0 1.0)\",\"type\":\"string\"},\"url\":{\"description\":\"URL of the license to link to from the photo\",\"example\":\"https://creativecommons.org/publicdomain/zero/1.0/\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"url\"],\"type\":\"object\"},\"type\":\"array\"},\"photoBaseUrl\":{\"description\":\"Base URL of all photos\",\"example\":\"https://api.railway-stations.org/photos/\",\"type\":\"string\"},\"photographers\":{\"description\":\"List of all photographers, might be empty if no photos available\",\"items\":{\"description\":\"The creator of a photo\",\"properties\":{\"name\":{\"description\":\"Username of the photographer\",\"type\":\"string\"},\"url\":{\"description\":\"Link to the photographers social media account or homepage\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"type\":\"array\"},\"stations\":{\"description\":\"List of the stations\",\"items\":{\"description\":\"A station with its photos\",\"properties\":{\"country\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"},\"id\":{\"description\":\"Id of the station within the country\",\"example\":\"7054260\",\"type\":\"string\"},\"inactive\":{\"default\":false,\"description\":\"Indicates if this station is inactive\",\"type\":\"boolean\"},\"lat\":{\"description\":\"Latitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"lon\":{\"description\":\"Longitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"photos\":{\"description\":\"Photos of the station. If more than one photo is given, the first one is the primary photo. List might be empty or only the primary photo provided.\",\"items\":{\"description\":\"A photo of a station\",\"properties\":{\"createdAt\":{\"description\":\"Timestamp when the photo was created in the railway-stations\\ndatabase (Epoche milliseconds since 1.1.1970)\\n\",\"format\":\"int64\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique id of a photo\",\"format\":\"int64\",\"type\":\"integer\"},\"license\":{\"description\":\"Id of the license used for this photo\",\"type\":\"string\"},\"outdated\":{\"default\":false,\"description\":\"Indicates if this photo is outdated\",\"type\":\"boolean\"},\"path\":{\"description\":\"URL path to the photo, to be used together with the photoBaseUrl\",\"type\":\"string\"},\"photographer\":{\"description\":\"Name of the photographer\",\"type\":\"string\"}},\"required\":[\"id\",\"photographer\",\"path\",\"createdAt\",\"license\"],\"type\":\"object\"},\"type\":\"array\"},\"shortCode\":{\"description\":\"Provider specific short code of the station, e.g. RIL100 or DS100 for german stations\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the station\",\"example\":\"London Victoria\",\"type\":\"string\"}},\"required\":[\"country\",\"id\",\"title\",\"lat\",\"lon\",\"photos\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"photoBaseUrl\",\"licenses\",\"photographers\",\"stations\"],\"type\":\"object\"}}},\"description\":\"successful operation\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/photoStationsByRecentPhotoImports","segments":[{"lit":"photoStationsByRecentPhotoImports"}],"select":{"exist":["since_hour"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"country","orig":"country","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"has_photo","orig":"has_photo","reqd":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"kind":"query","name":"is_active","orig":"is_active","reqd":false,"type":"`$BOOLEAN`","index$":1}]},"contract":{"id":"GET /photoStationsByCountry/{country}","json":"{\"operationId\":\"getPhotoStationByCountry\",\"parameters\":[{\"description\":\"country code\",\"in\":\"path\",\"name\":\"country\",\"required\":true,\"schema\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"}},{\"description\":\"filter by photo available/missing\",\"in\":\"query\",\"name\":\"hasPhoto\",\"schema\":{\"type\":\"boolean\"}},{\"description\":\"filter on active/inactive stations\",\"in\":\"query\",\"name\":\"isActive\",\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Stations with photos\",\"properties\":{\"licenses\":{\"description\":\"List of used licenses, might be empty if no photos available\",\"items\":{\"description\":\"License used by a photo\",\"properties\":{\"id\":{\"description\":\"Unique id of the license\",\"example\":\"CC0\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the license to display at the photo\",\"example\":\"CC0 1.0 Universell (CC0 1.0)\",\"type\":\"string\"},\"url\":{\"description\":\"URL of the license to link to from the photo\",\"example\":\"https://creativecommons.org/publicdomain/zero/1.0/\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"url\"],\"type\":\"object\"},\"type\":\"array\"},\"photoBaseUrl\":{\"description\":\"Base URL of all photos\",\"example\":\"https://api.railway-stations.org/photos/\",\"type\":\"string\"},\"photographers\":{\"description\":\"List of all photographers, might be empty if no photos available\",\"items\":{\"description\":\"The creator of a photo\",\"properties\":{\"name\":{\"description\":\"Username of the photographer\",\"type\":\"string\"},\"url\":{\"description\":\"Link to the photographers social media account or homepage\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"type\":\"array\"},\"stations\":{\"description\":\"List of the stations\",\"items\":{\"description\":\"A station with its photos\",\"properties\":{\"country\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"},\"id\":{\"description\":\"Id of the station within the country\",\"example\":\"7054260\",\"type\":\"string\"},\"inactive\":{\"default\":false,\"description\":\"Indicates if this station is inactive\",\"type\":\"boolean\"},\"lat\":{\"description\":\"Latitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"lon\":{\"description\":\"Longitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"photos\":{\"description\":\"Photos of the station. If more than one photo is given, the first one is the primary photo. List might be empty or only the primary photo provided.\",\"items\":{\"description\":\"A photo of a station\",\"properties\":{\"createdAt\":{\"description\":\"Timestamp when the photo was created in the railway-stations\\ndatabase (Epoche milliseconds since 1.1.1970)\\n\",\"format\":\"int64\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique id of a photo\",\"format\":\"int64\",\"type\":\"integer\"},\"license\":{\"description\":\"Id of the license used for this photo\",\"type\":\"string\"},\"outdated\":{\"default\":false,\"description\":\"Indicates if this photo is outdated\",\"type\":\"boolean\"},\"path\":{\"description\":\"URL path to the photo, to be used together with the photoBaseUrl\",\"type\":\"string\"},\"photographer\":{\"description\":\"Name of the photographer\",\"type\":\"string\"}},\"required\":[\"id\",\"photographer\",\"path\",\"createdAt\",\"license\"],\"type\":\"object\"},\"type\":\"array\"},\"shortCode\":{\"description\":\"Provider specific short code of the station, e.g. RIL100 or DS100 for german stations\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the station\",\"example\":\"London Victoria\",\"type\":\"string\"}},\"required\":[\"country\",\"id\",\"title\",\"lat\",\"lon\",\"photos\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"photoBaseUrl\",\"licenses\",\"photographers\",\"stations\"],\"type\":\"object\"}}},\"description\":\"successful operation\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/photoStationsByCountry/{country}","segments":[{"lit":"photoStationsByCountry"},{"var":"country"}],"select":{"exist":["country","has_photo","is_active"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"country","orig":"country","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /photoStationById/{country}/{id}","json":"{\"operationId\":\"getPhotoStationById\",\"parameters\":[{\"description\":\"country code\",\"in\":\"path\",\"name\":\"country\",\"required\":true,\"schema\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"}},{\"description\":\"id of the station\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Stations with photos\",\"properties\":{\"licenses\":{\"description\":\"List of used licenses, might be empty if no photos available\",\"items\":{\"description\":\"License used by a photo\",\"properties\":{\"id\":{\"description\":\"Unique id of the license\",\"example\":\"CC0\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the license to display at the photo\",\"example\":\"CC0 1.0 Universell (CC0 1.0)\",\"type\":\"string\"},\"url\":{\"description\":\"URL of the license to link to from the photo\",\"example\":\"https://creativecommons.org/publicdomain/zero/1.0/\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"url\"],\"type\":\"object\"},\"type\":\"array\"},\"photoBaseUrl\":{\"description\":\"Base URL of all photos\",\"example\":\"https://api.railway-stations.org/photos/\",\"type\":\"string\"},\"photographers\":{\"description\":\"List of all photographers, might be empty if no photos available\",\"items\":{\"description\":\"The creator of a photo\",\"properties\":{\"name\":{\"description\":\"Username of the photographer\",\"type\":\"string\"},\"url\":{\"description\":\"Link to the photographers social media account or homepage\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"type\":\"array\"},\"stations\":{\"description\":\"List of the stations\",\"items\":{\"description\":\"A station with its photos\",\"properties\":{\"country\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"},\"id\":{\"description\":\"Id of the station within the country\",\"example\":\"7054260\",\"type\":\"string\"},\"inactive\":{\"default\":false,\"description\":\"Indicates if this station is inactive\",\"type\":\"boolean\"},\"lat\":{\"description\":\"Latitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"lon\":{\"description\":\"Longitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"photos\":{\"description\":\"Photos of the station. If more than one photo is given, the first one is the primary photo. List might be empty or only the primary photo provided.\",\"items\":{\"description\":\"A photo of a station\",\"properties\":{\"createdAt\":{\"description\":\"Timestamp when the photo was created in the railway-stations\\ndatabase (Epoche milliseconds since 1.1.1970)\\n\",\"format\":\"int64\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique id of a photo\",\"format\":\"int64\",\"type\":\"integer\"},\"license\":{\"description\":\"Id of the license used for this photo\",\"type\":\"string\"},\"outdated\":{\"default\":false,\"description\":\"Indicates if this photo is outdated\",\"type\":\"boolean\"},\"path\":{\"description\":\"URL path to the photo, to be used together with the photoBaseUrl\",\"type\":\"string\"},\"photographer\":{\"description\":\"Name of the photographer\",\"type\":\"string\"}},\"required\":[\"id\",\"photographer\",\"path\",\"createdAt\",\"license\"],\"type\":\"object\"},\"type\":\"array\"},\"shortCode\":{\"description\":\"Provider specific short code of the station, e.g. RIL100 or DS100 for german stations\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the station\",\"example\":\"London Victoria\",\"type\":\"string\"}},\"required\":[\"country\",\"id\",\"title\",\"lat\",\"lon\",\"photos\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"photoBaseUrl\",\"licenses\",\"photographers\",\"stations\"],\"type\":\"object\"}}},\"description\":\"successful operation\"},\"404\":{\"content\":{},\"description\":\"Station not found\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/photoStationById/{country}/{id}","segments":[{"lit":"photoStationById"},{"var":"country"},{"var":"id"}],"select":{"exist":["country","id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"photographer","orig":"photographer","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /photoStationsByPhotographer/{photographer}","json":"{\"operationId\":\"getPhotoStationsByPhotographer\",\"parameters\":[{\"description\":\"photographer name\",\"in\":\"path\",\"name\":\"photographer\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"country code\",\"in\":\"query\",\"name\":\"country\",\"schema\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Stations with photos\",\"properties\":{\"licenses\":{\"description\":\"List of used licenses, might be empty if no photos available\",\"items\":{\"description\":\"License used by a photo\",\"properties\":{\"id\":{\"description\":\"Unique id of the license\",\"example\":\"CC0\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the license to display at the photo\",\"example\":\"CC0 1.0 Universell (CC0 1.0)\",\"type\":\"string\"},\"url\":{\"description\":\"URL of the license to link to from the photo\",\"example\":\"https://creativecommons.org/publicdomain/zero/1.0/\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"id\",\"name\",\"url\"],\"type\":\"object\"},\"type\":\"array\"},\"photoBaseUrl\":{\"description\":\"Base URL of all photos\",\"example\":\"https://api.railway-stations.org/photos/\",\"type\":\"string\"},\"photographers\":{\"description\":\"List of all photographers, might be empty if no photos available\",\"items\":{\"description\":\"The creator of a photo\",\"properties\":{\"name\":{\"description\":\"Username of the photographer\",\"type\":\"string\"},\"url\":{\"description\":\"Link to the photographers social media account or homepage\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"},\"type\":\"array\"},\"stations\":{\"description\":\"List of the stations\",\"items\":{\"description\":\"A station with its photos\",\"properties\":{\"country\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"},\"id\":{\"description\":\"Id of the station within the country\",\"example\":\"7054260\",\"type\":\"string\"},\"inactive\":{\"default\":false,\"description\":\"Indicates if this station is inactive\",\"type\":\"boolean\"},\"lat\":{\"description\":\"Latitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"lon\":{\"description\":\"Longitude of the station\",\"format\":\"double\",\"type\":\"number\"},\"photos\":{\"description\":\"Photos of the station. If more than one photo is given, the first one is the primary photo. List might be empty or only the primary photo provided.\",\"items\":{\"description\":\"A photo of a station\",\"properties\":{\"createdAt\":{\"description\":\"Timestamp when the photo was created in the railway-stations\\ndatabase (Epoche milliseconds since 1.1.1970)\\n\",\"format\":\"int64\",\"type\":\"integer\"},\"id\":{\"description\":\"Unique id of a photo\",\"format\":\"int64\",\"type\":\"integer\"},\"license\":{\"description\":\"Id of the license used for this photo\",\"type\":\"string\"},\"outdated\":{\"default\":false,\"description\":\"Indicates if this photo is outdated\",\"type\":\"boolean\"},\"path\":{\"description\":\"URL path to the photo, to be used together with the photoBaseUrl\",\"type\":\"string\"},\"photographer\":{\"description\":\"Name of the photographer\",\"type\":\"string\"}},\"required\":[\"id\",\"photographer\",\"path\",\"createdAt\",\"license\"],\"type\":\"object\"},\"type\":\"array\"},\"shortCode\":{\"description\":\"Provider specific short code of the station, e.g. RIL100 or DS100 for german stations\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the station\",\"example\":\"London Victoria\",\"type\":\"string\"}},\"required\":[\"country\",\"id\",\"title\",\"lat\",\"lon\",\"photos\"],\"type\":\"object\"},\"type\":\"array\"}},\"required\":[\"photoBaseUrl\",\"licenses\",\"photographers\",\"stations\"],\"type\":\"object\"}}},\"description\":\"successful operation\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/photoStationsByPhotographer/{photographer}","segments":[{"lit":"photoStationsByPhotographer"},{"var":"photographer"}],"select":{"exist":["country","photographer"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[["photo_station_by_id"],["photo_stations_by_country"],["photo_stations_by_photographer"]]},"key$":"photo_station","name__orig":"photo_station","Name":"PhotoStation","name_":"photo_station","name-":"photo-station","NAME":"PHOTO_STATION","index$":10}, {"active":true,"entity":"photo_station","key$":"BasicPhotoStationFlow","kind":"basic","name":"BasicPhotoStationFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"photo_station_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"photo_station_ref01","srcdatavar":"photo_station_ref01_data","suffix":"_dt0"},"match":{"id":"photo_station01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-photo_station_ref01"}}],"index$":1}]}, 'PhotoStation')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let photo_station_ref01_data = Object.values(setup.data.existing.photo_station)[0] as any

    // LIST
    const photo_station_ref01_ent = client.PhotoStation()
    const photo_station_ref01_match: any = {}

    const photo_station_ref01_list = (await photo_station_ref01_ent.list(photo_station_ref01_match)).map((e: any) => e.data())


    // LOAD
    const photo_station_ref01_match_dt0: any = {}
    photo_station_ref01_match_dt0.id = photo_station_ref01_data.id
    const photo_station_ref01_data_dt0 = (await photo_station_ref01_ent.load(photo_station_ref01_match_dt0)).data()
    assert(photo_station_ref01_data_dt0.id === photo_station_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/photo_station/PhotoStationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = RailwayStationPhotosSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['photo_station01','photo_station02','photo_station03','photo_station_by_id01','photo_station_by_id02','photo_station_by_id03','photo_stations_by_country01','photo_stations_by_country02','photo_stations_by_country03','photo_stations_by_photographer01','photo_stations_by_photographer02','photo_stations_by_photographer03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATION_ENTID': idmap,
    'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
    'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATION_ENTID']

  const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new RailwayStationPhotosSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
