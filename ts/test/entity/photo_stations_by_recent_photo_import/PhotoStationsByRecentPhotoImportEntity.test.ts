

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('PhotoStationsByRecentPhotoImportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RAILWAY_STATION_PHOTOS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RailwayStationPhotosSDK.test()
    const ent = testsdk.PhotoStationsByRecentPhotoImport()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'photo_stations_by_recent_photo_import.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"licenses":{"a":true,"h":"Licenses","n":"licenses","r":true,"sh":"List of used licenses, might be empty if no photos available","t":"`$ARRAY`","key$":"licenses","index$":0},"photoBaseUrl":{"a":true,"h":"Photo Base Url","n":"photoBaseUrl","r":true,"sh":"Base URL of all photos","t":"`$STRING`","key$":"photoBaseUrl","index$":1},"photographers":{"a":true,"h":"Photographers","n":"photographers","r":true,"sh":"List of all photographers, might be empty if no photos available","t":"`$ARRAY`","key$":"photographers","index$":2},"stations":{"a":true,"h":"Stations","n":"stations","r":true,"sh":"List of the stations","t":"`$ARRAY`","key$":"stations","index$":3}},"name":"photo_stations_by_recent_photo_import","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /photoStationsByRecentPhotoImports","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"since_hour","or":"since_hour","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/photoStationsByRecentPhotoImports","q":{"exist":["since_hour"]},"r":{},"s":[{"lit":"photoStationsByRecentPhotoImports"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"photo_stations_by_recent_photo_import","name__orig":"photo_stations_by_recent_photo_import","Name":"PhotoStationsByRecentPhotoImport","name_":"photo_stations_by_recent_photo_import","name-":"photo-stations-by-recent-photo-import","NAME":"PHOTO_STATIONS_BY_RECENT_PHOTO_IMPORT","index$":12}, {"active":true,"entity":"photo_stations_by_recent_photo_import","key$":"BasicPhotoStationsByRecentPhotoImportFlow","kind":"basic","name":"BasicPhotoStationsByRecentPhotoImportFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"photo_stations_by_recent_photo_import_ref01"}}],"index$":0}]}, 'PhotoStationsByRecentPhotoImport', {"GET /photoStationsByRecentPhotoImports":{"protocol":"http","operationId":"getPhotoStationsByRecentPhotoImports","responses":{"200":{"description":"successful operation","content":{"application/json":{"schema":{"description":"Stations with photos","type":"object","properties":{"photoBaseUrl":{"description":"Base URL of all photos","example":"https://api.railway-stations.org/photos/","key$":"photoBaseUrl","type":"string"},"licenses":{"description":"List of used licenses, might be empty if no photos available","items":{"description":"License used by a photo","properties":{"id":{"description":"Unique id of the license","example":"CC0","type":"string"},"name":{"description":"Name of the license to display at the photo","example":"CC0 1.0 Universell (CC0 1.0)","type":"string"},"url":{"description":"URL of the license to link to from the photo","example":"https://creativecommons.org/publicdomain/zero/1.0/","format":"uri","type":"string"}},"required":["id","name","url"],"type":"object","x-ref":"#/components/schemas/PhotoLicense"},"key$":"licenses","type":"array"},"photographers":{"description":"List of all photographers, might be empty if no photos available","items":{"description":"The creator of a photo","properties":{"name":{"description":"Username of the photographer","type":"string"},"url":{"description":"Link to the photographers social media account or homepage","format":"uri","type":"string"}},"required":["name"],"type":"object","x-ref":"#/components/schemas/Photographer"},"key$":"photographers","type":"array"},"stations":{"description":"List of the stations","items":{"description":"A station with its photos","properties":{"country":{"description":"a two character country code","maxLength":2,"minLength":2,"type":"string","x-ref":"#/components/schemas/CountryCode"},"id":{"description":"Id of the station within the country","example":"7054260","type":"string"},"inactive":{"default":false,"description":"Indicates if this station is inactive","type":"boolean"},"lat":{"description":"Latitude of the station","format":"double","type":"number"},"lon":{"description":"Longitude of the station","format":"double","type":"number"},"photos":{"description":"Photos of the station. If more than one photo is given, the first one is the primary photo. List might be empty or only the primary photo provided.","items":{"description":"A photo of a station","properties":{"createdAt":{"description":"Timestamp when the photo was created in the railway-stations\ndatabase (Epoche milliseconds since 1.1.1970)\n","format":"int64","type":"integer"},"id":{"description":"Unique id of a photo","format":"int64","type":"integer"},"license":{"description":"Id of the license used for this photo","type":"string"},"outdated":{"default":false,"description":"Indicates if this photo is outdated","type":"boolean"},"path":{"description":"URL path to the photo, to be used together with the photoBaseUrl","type":"string"},"photographer":{"description":"Name of the photographer","type":"string"}},"required":["id","photographer","path","createdAt","license"],"type":"object","x-ref":"#/components/schemas/Photo"},"type":"array"},"shortCode":{"description":"Provider specific short code of the station, e.g. RIL100 or DS100 for german stations","type":"string"},"title":{"description":"Title of the station","example":"London Victoria","type":"string"}},"required":["country","id","title","lat","lon","photos"],"type":"object","x-ref":"#/components/schemas/PhotoStation"},"key$":"stations","type":"array"}},"required":["photoBaseUrl","licenses","photographers","stations"],"x-ref":"#/components/schemas/PhotoStations","index$":0}}}},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[{"name":"sinceHours","in":"query","description":"defines the timeframe since when to look for recent photo uploads,\ndefault is 10h\n","schema":{"type":"integer","format":"int32","default":10,"minimum":1,"maximum":800},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let photo_stations_by_recent_photo_import_ref01_data = Object.values(setup.data.existing.photo_stations_by_recent_photo_import)[0] as any

    // LIST
    const photo_stations_by_recent_photo_import_ref01_ent = client.PhotoStationsByRecentPhotoImport()
    const photo_stations_by_recent_photo_import_ref01_match: any = {}

    const photo_stations_by_recent_photo_import_ref01_list = (await photo_stations_by_recent_photo_import_ref01_ent.list(photo_stations_by_recent_photo_import_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/photo_stations_by_recent_photo_import/PhotoStationsByRecentPhotoImportTestData.json')

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
    ['photo_stations_by_recent_photo_import01','photo_stations_by_recent_photo_import02','photo_stations_by_recent_photo_import03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_RECENT_PHOTO_IMPORT_ENTID': idmap,
    'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
    'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_RECENT_PHOTO_IMPORT_ENTID']

  const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_RECENT_PHOTO_IMPORT_ENTID']
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
  
