

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"photo_download","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"filename","orig":"filename","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"width","orig":"width","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /inbox/done/{filename}","json":"{\"operationId\":\"getInboxDoneFile\",\"parameters\":[{\"description\":\"filename of the photo\",\"in\":\"path\",\"name\":\"filename\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"scale the image to the given width\",\"in\":\"query\",\"name\":\"width\",\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/jpeg\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}},\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"ok\"},\"404\":{\"content\":{},\"description\":\"file not found\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/inbox/done/{filename}","segments":[{"lit":"inbox"},{"lit":"done"},{"var":"filename"}],"select":{"exist":["filename","width"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"filename","orig":"filename","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"width","orig":"width","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /inbox/processed/{filename}","json":"{\"operationId\":\"getInboxProcessedFile\",\"parameters\":[{\"description\":\"filename of the photo\",\"in\":\"path\",\"name\":\"filename\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"scale the image to the given width\",\"in\":\"query\",\"name\":\"width\",\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/jpeg\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}},\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"ok\"},\"404\":{\"content\":{},\"description\":\"file not found\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/inbox/processed/{filename}","segments":[{"lit":"inbox"},{"lit":"processed"},{"var":"filename"}],"select":{"exist":["filename","width"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"filename","orig":"filename","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"width","orig":"width","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /inbox/rejected/{filename}","json":"{\"operationId\":\"getInboxRejectedFile\",\"parameters\":[{\"description\":\"filename of the photo\",\"in\":\"path\",\"name\":\"filename\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"scale the image to the given width\",\"in\":\"query\",\"name\":\"width\",\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/jpeg\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}},\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"ok\"},\"404\":{\"content\":{},\"description\":\"file not found\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/inbox/rejected/{filename}","segments":[{"lit":"inbox"},{"lit":"rejected"},{"var":"filename"}],"select":{"exist":["filename","width"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"filename","orig":"filename","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"width","orig":"width","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /inbox/{filename}","json":"{\"operationId\":\"getInboxFile\",\"parameters\":[{\"description\":\"filename of the photo\",\"in\":\"path\",\"name\":\"filename\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"scale the image to the given width\",\"in\":\"query\",\"name\":\"width\",\"schema\":{\"format\":\"int32\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/jpeg\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}},\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"ok\"},\"404\":{\"content\":{},\"description\":\"file not found\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/inbox/{filename}","segments":[{"lit":"inbox"},{"var":"filename"}],"select":{"exist":["filename","width"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"load"}},"relations":{"ancestors":[["done"],["processed"],["rejected"],["inbox"]]},"key$":"photo_download","name__orig":"photo_download","Name":"PhotoDownload","name_":"photo_download","name-":"photo-download","NAME":"PHOTO_DOWNLOAD","index$":9}, {"active":true,"entity":"photo_download","key$":"BasicPhotoDownloadFlow","kind":"basic","name":"BasicPhotoDownloadFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"photo_download_ref01","srcdatavar":"photo_download_ref01_data","suffix":"_dt0"},"match":{"id":"photo_download01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-photo_download_ref01"}}],"index$":0}]}, 'PhotoDownload')
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
    ['photo_download01','photo_download02','photo_download03','done01','done02','done03','processed01','processed02','processed03','rejected01','rejected02','rejected03','inbox01','inbox02','inbox03'],
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
  
