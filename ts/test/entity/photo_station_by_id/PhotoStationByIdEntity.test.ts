

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


describe('PhotoStationByIdEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RAILWAY_STATION_PHOTOS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RailwayStationPhotosSDK.test()
    const ent = testsdk.PhotoStationById()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'photo_station_by_id.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"licenses":{"a":true,"h":"Licenses","n":"licenses","r":true,"sh":"List of used licenses, might be empty if no photos available","t":"`$ARRAY`","key$":"licenses","index$":1},"photoBaseUrl":{"a":true,"h":"Photo Base Url","n":"photoBaseUrl","r":true,"sh":"Base URL of all photos","t":"`$STRING`","key$":"photoBaseUrl","index$":2},"photographers":{"a":true,"h":"Photographers","n":"photographers","r":true,"sh":"List of all photographers, might be empty if no photos available","t":"`$ARRAY`","key$":"photographers","index$":3},"stations":{"a":true,"h":"Stations","n":"stations","r":true,"sh":"List of the stations","t":"`$ARRAY`","key$":"stations","index$":4}},"id":{"field":"id","name":"id","parts":["country","id"],"sep":"/"},"name":"photo_station_by_id","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /photoStationById/{country}/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"country","or":"country","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/photoStationById/{country}/{id}","q":{"exist":["country","id"]},"r":{},"s":[{"lit":"photoStationById"},{"var":"country"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"photo_station_by_id","name__orig":"photo_station_by_id","Name":"PhotoStationById","name_":"photo_station_by_id","name-":"photo-station-by-id","NAME":"PHOTO_STATION_BY_ID","index$":9}, {"active":true,"entity":"photo_station_by_id","key$":"BasicPhotoStationByIdFlow","kind":"basic","name":"BasicPhotoStationByIdFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"photo_station_by_id_ref01","srcdatavar":"photo_station_by_id_ref01_data","suffix":"_dt0"},"m":{"country":"country01","id":"photo_station_by_id01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-photo_station_by_id_ref01"}}],"index$":0}]}, 'PhotoStationById', {"GET /photoStationById/{country}/{id}":{"protocol":"http","operationId":"getPhotoStationById","responses":{"200":{"description":"successful operation","content":{"application/json":{"schema":{"description":"Stations with photos","type":"object","properties":{"photoBaseUrl":{"description":"Base URL of all photos","example":"https://api.railway-stations.org/photos/","key$":"photoBaseUrl","type":"string"},"licenses":{"description":"List of used licenses, might be empty if no photos available","items":{"description":"License used by a photo","properties":{"id":{"description":"Unique id of the license","example":"CC0","type":"string"},"name":{"description":"Name of the license to display at the photo","example":"CC0 1.0 Universell (CC0 1.0)","type":"string"},"url":{"description":"URL of the license to link to from the photo","example":"https://creativecommons.org/publicdomain/zero/1.0/","format":"uri","type":"string"}},"required":["id","name","url"],"type":"object","x-ref":"#/components/schemas/PhotoLicense"},"key$":"licenses","type":"array"},"photographers":{"description":"List of all photographers, might be empty if no photos available","items":{"description":"The creator of a photo","properties":{"name":{"description":"Username of the photographer","type":"string"},"url":{"description":"Link to the photographers social media account or homepage","format":"uri","type":"string"}},"required":["name"],"type":"object","x-ref":"#/components/schemas/Photographer"},"key$":"photographers","type":"array"},"stations":{"description":"List of the stations","items":{"description":"A station with its photos","properties":{"country":{"description":"a two character country code","maxLength":2,"minLength":2,"type":"string","x-ref":"#/components/schemas/CountryCode"},"id":{"description":"Id of the station within the country","example":"7054260","type":"string"},"inactive":{"default":false,"description":"Indicates if this station is inactive","type":"boolean"},"lat":{"description":"Latitude of the station","format":"double","type":"number"},"lon":{"description":"Longitude of the station","format":"double","type":"number"},"photos":{"description":"Photos of the station. If more than one photo is given, the first one is the primary photo. List might be empty or only the primary photo provided.","items":{"description":"A photo of a station","properties":{"createdAt":{"description":"Timestamp when the photo was created in the railway-stations\ndatabase (Epoche milliseconds since 1.1.1970)\n","format":"int64","type":"integer"},"id":{"description":"Unique id of a photo","format":"int64","type":"integer"},"license":{"description":"Id of the license used for this photo","type":"string"},"outdated":{"default":false,"description":"Indicates if this photo is outdated","type":"boolean"},"path":{"description":"URL path to the photo, to be used together with the photoBaseUrl","type":"string"},"photographer":{"description":"Name of the photographer","type":"string"}},"required":["id","photographer","path","createdAt","license"],"type":"object","x-ref":"#/components/schemas/Photo"},"type":"array"},"shortCode":{"description":"Provider specific short code of the station, e.g. RIL100 or DS100 for german stations","type":"string"},"title":{"description":"Title of the station","example":"London Victoria","type":"string"}},"required":["country","id","title","lat","lon","photos"],"type":"object","x-ref":"#/components/schemas/PhotoStation"},"key$":"stations","type":"array"}},"required":["photoBaseUrl","licenses","photographers","stations"],"x-ref":"#/components/schemas/PhotoStations","index$":0}}}},"404":{"description":"Station not found","content":{}},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[{"name":"country","in":"path","description":"country code","required":true,"schema":{"description":"a two character country code","type":"string","maxLength":2,"minLength":2,"x-ref":"#/components/schemas/CountryCode"},"index$":0},{"name":"id","in":"path","description":"id of the station","required":true,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let photo_station_by_id_ref01_data = Object.values(setup.data.existing.photo_station_by_id)[0] as any

    // LOAD
    const photo_station_by_id_ref01_ent = client.PhotoStationById()
    const photo_station_by_id_ref01_match_dt0: any = {}
    photo_station_by_id_ref01_match_dt0.id = photo_station_by_id_ref01_data.id
    const photo_station_by_id_ref01_data_dt0 = (await photo_station_by_id_ref01_ent.load(photo_station_by_id_ref01_match_dt0)).data()
    assert(photo_station_by_id_ref01_data_dt0.id === photo_station_by_id_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/photo_station_by_id/PhotoStationByIdTestData.json')

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
    ['photo_station_by_id01','photo_station_by_id02','photo_station_by_id03','country01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATION_BY_ID_ENTID': idmap,
    'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
    'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATION_BY_ID_ENTID']

  const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATION_BY_ID_ENTID']
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
  
