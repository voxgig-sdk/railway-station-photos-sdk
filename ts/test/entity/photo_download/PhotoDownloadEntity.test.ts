

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


describe('PhotoDownloadEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RAILWAY_STATION_PHOTOS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RailwayStationPhotosSDK.test()
    const ent = testsdk.PhotoDownload()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'photo_download.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"photo_download","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /inbox/done/{filename}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"filename","or":"filename","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"width","or":"width","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/inbox/done/{filename}","q":{"exist":["filename","width"]},"r":{},"s":[{"lit":"inbox"},{"lit":"done"},{"var":"filename"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /inbox/processed/{filename}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"filename","or":"filename","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"width","or":"width","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/inbox/processed/{filename}","q":{"exist":["filename","width"]},"r":{},"s":[{"lit":"inbox"},{"lit":"processed"},{"var":"filename"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /inbox/rejected/{filename}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"filename","or":"filename","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"width","or":"width","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/inbox/rejected/{filename}","q":{"exist":["filename","width"]},"r":{},"s":[{"lit":"inbox"},{"lit":"rejected"},{"var":"filename"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /inbox/{filename}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"filename","or":"filename","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"width","or":"width","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/inbox/{filename}","q":{"exist":["filename","width"]},"r":{},"s":[{"lit":"inbox"},{"var":"filename"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.inbox"]]},"key$":"photo_download","name__orig":"photo_download","Name":"PhotoDownload","name_":"photo_download","name-":"photo-download","NAME":"PHOTO_DOWNLOAD","index$":8}, {"active":true,"entity":"photo_download","key$":"BasicPhotoDownloadFlow","kind":"basic","name":"BasicPhotoDownloadFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"photo_download_ref01","srcdatavar":"photo_download_ref01_data","suffix":"_dt0"},"m":{"id":"photo_download01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-photo_download_ref01"}}],"index$":0}]}, 'PhotoDownload', {"GET /inbox/done/{filename}":{"protocol":"http","operationId":"getInboxDoneFile","responses":{"200":{"description":"ok","content":{"image/jpeg":{"schema":{"type":"string","format":"binary"}},"image/png":{"schema":{"type":"string","format":"binary"}}}},"404":{"description":"file not found","content":{}},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[{"name":"filename","in":"path","description":"filename of the photo","required":true,"schema":{"type":"string"},"index$":0},{"name":"width","in":"query","description":"scale the image to the given width","schema":{"type":"integer","format":"int32"},"index$":1}],"securitySource":"unspecified"},"GET /inbox/processed/{filename}":{"protocol":"http","operationId":"getInboxProcessedFile","responses":{"200":{"description":"ok","content":{"image/jpeg":{"schema":{"type":"string","format":"binary"}},"image/png":{"schema":{"type":"string","format":"binary"}}}},"404":{"description":"file not found","content":{}},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[{"name":"filename","in":"path","description":"filename of the photo","required":true,"schema":{"type":"string"},"index$":0},{"name":"width","in":"query","description":"scale the image to the given width","schema":{"type":"integer","format":"int32"},"index$":1}],"securitySource":"unspecified"},"GET /inbox/rejected/{filename}":{"protocol":"http","operationId":"getInboxRejectedFile","responses":{"200":{"description":"ok","content":{"image/jpeg":{"schema":{"type":"string","format":"binary"}},"image/png":{"schema":{"type":"string","format":"binary"}}}},"404":{"description":"file not found","content":{}},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[{"name":"filename","in":"path","description":"filename of the photo","required":true,"schema":{"type":"string"},"index$":0},{"name":"width","in":"query","description":"scale the image to the given width","schema":{"type":"integer","format":"int32"},"index$":1}],"securitySource":"unspecified"},"GET /inbox/{filename}":{"protocol":"http","operationId":"getInboxFile","responses":{"200":{"description":"ok","content":{"image/jpeg":{"schema":{"type":"string","format":"binary"}},"image/png":{"schema":{"type":"string","format":"binary"}}}},"404":{"description":"file not found","content":{}},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[{"name":"filename","in":"path","description":"filename of the photo","required":true,"schema":{"type":"string"},"index$":0},{"name":"width","in":"query","description":"scale the image to the given width","schema":{"type":"integer","format":"int32"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let photo_download_ref01_data = Object.values(setup.data.existing.photo_download)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const photo_download_ref01_ent = client.PhotoDownload()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/photo_download/PhotoDownloadTestData.json')

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
    ['photo_download01','photo_download02','photo_download03','inbox01','inbox02','inbox03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RAILWAY_STATION_PHOTOS_TEST_PHOTO_DOWNLOAD_ENTID': idmap,
    'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
    'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_DOWNLOAD_ENTID']

  const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_DOWNLOAD_ENTID']
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
  
