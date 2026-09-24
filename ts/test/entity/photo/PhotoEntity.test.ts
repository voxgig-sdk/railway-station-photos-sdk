

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


describe('PhotoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RAILWAY_STATION_PHOTOS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RailwayStationPhotosSDK.test()
    const ent = testsdk.Photo()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'photo.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id","parts":["country","filename"],"sep":"/"},"name":"photo","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /photos/{country}/{filename}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"country","or":"country","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"filename","or":"filename","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"width","or":"width","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/photos/{country}/{filename}","q":{"exist":["country","filename","width"]},"r":{},"s":[{"lit":"photos"},{"var":"country"},{"var":"filename"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"photo","name__orig":"photo","Name":"Photo","name_":"photo","name-":"photo","NAME":"PHOTO","index$":7}, {"active":true,"entity":"photo","key$":"BasicPhotoFlow","kind":"basic","name":"BasicPhotoFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"photo_ref01","srcdatavar":"photo_ref01_data","suffix":"_dt0"},"m":{"country":"country01","id":"photo01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-photo_ref01"}}],"index$":0}]}, 'Photo', {"GET /photos/{country}/{filename}":{"protocol":"http","operationId":"getPhotos","responses":{"200":{"description":"ok","content":{"image/jpeg":{"schema":{"type":"string","format":"binary"}},"image/png":{"schema":{"type":"string","format":"binary"}}}},"404":{"description":"file not found","content":{}},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[{"name":"country","in":"path","description":"country code","required":true,"schema":{"description":"a two character country code","type":"string","maxLength":2,"minLength":2,"x-ref":"#/components/schemas/CountryCode"},"index$":0},{"name":"filename","in":"path","description":"filename of the photo","required":true,"schema":{"type":"string"},"index$":1},{"name":"width","in":"query","description":"scale the image to the given width","schema":{"type":"integer","format":"int32"},"index$":2}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let photo_ref01_data = Object.values(setup.data.existing.photo)[0] as any

    // LOAD
    const photo_ref01_ent = client.Photo()
    const photo_ref01_match_dt0: any = {}
    photo_ref01_match_dt0.id = photo_ref01_data.id
    const photo_ref01_data_dt0 = (await photo_ref01_ent.load(photo_ref01_match_dt0)).data()
    assert(photo_ref01_data_dt0.id === photo_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/photo/PhotoTestData.json')

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
    ['photo01','photo02','photo03','country01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RAILWAY_STATION_PHOTOS_TEST_PHOTO_ENTID': idmap,
    'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
    'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_ENTID']

  const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_ENTID']
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
  
