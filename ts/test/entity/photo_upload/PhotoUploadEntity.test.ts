

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


describe('PhotoUploadEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RAILWAY_STATION_PHOTOS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RailwayStationPhotosSDK.test()
    const ent = testsdk.PhotoUpload()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'photo_upload.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"photo_upload","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"active","orig":"active","reqd":false,"type":"`$BOOLEAN`"},{"active":true,"kind":"header","name":"authorization","orig":"authorization","reqd":true,"type":"`$STRING`"},{"active":true,"kind":"header","name":"comment","orig":"comment","reqd":false,"type":"`$STRING`"},{"active":true,"kind":"header","name":"content_type","orig":"content_type","reqd":true,"type":"`$STRING`"},{"active":true,"kind":"header","name":"country","orig":"country","reqd":false,"type":"`$STRING`"},{"active":true,"kind":"header","name":"latitude","orig":"latitude","reqd":false,"type":"`$NUMBER`"},{"active":true,"kind":"header","name":"longitude","orig":"longitude","reqd":false,"type":"`$NUMBER`"},{"active":true,"kind":"header","name":"station_id","orig":"station_id","reqd":false,"type":"`$STRING`"},{"active":true,"kind":"header","name":"station_title","orig":"station_title","reqd":false,"type":"`$STRING`"}]},"contract":{"id":"POST /photoUpload","json":"{\"operationId\":\"postPhotoUpload\",\"parameters\":[{\"description\":\"JWT authorization\\n\",\"in\":\"header\",\"name\":\"Authorization\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"country code\",\"in\":\"header\",\"name\":\"Country\",\"schema\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"}},{\"description\":\"id of the railwaystation\",\"in\":\"header\",\"name\":\"Station-Id\",\"schema\":{\"type\":\"string\"}},{\"description\":\"mime type of the image, \\\"image/png\\\" or \\\"image/jpeg\\\"\",\"in\":\"header\",\"name\":\"Content-Type\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"name of the station, for upload of missing stations (needs to be URL-encoded with UTF-8 charset)\",\"in\":\"header\",\"name\":\"Station-Title\",\"schema\":{\"type\":\"string\"}},{\"description\":\"latitude, for upload of missing stations\",\"in\":\"header\",\"name\":\"Latitude\",\"schema\":{\"format\":\"double\",\"type\":\"number\"}},{\"description\":\"longitude, for upload of missing stations\",\"in\":\"header\",\"name\":\"Longitude\",\"schema\":{\"format\":\"double\",\"type\":\"number\"}},{\"description\":\"comment of the photographer to the reviewer (needs to be URL-encoded with UTF-8 charset)\",\"in\":\"header\",\"name\":\"Comment\",\"schema\":{\"type\":\"string\"}},{\"description\":\"is this station active?\",\"in\":\"header\",\"name\":\"Active\",\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/octet-stream\":{\"schema\":{\"format\":\"byte\",\"type\":\"string\"}},\"image/jpeg\":{\"schema\":{\"format\":\"byte\",\"type\":\"string\"}},\"image/png\":{\"schema\":{\"format\":\"byte\",\"type\":\"string\"}}},\"description\":\"image, required for existing station, optional for missing stations\"},\"responses\":{\"202\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response status of photo uploads and problem reports\",\"properties\":{\"crc32\":{\"description\":\"CRC32 checksum of the uploaded photo\",\"format\":\"int64\",\"type\":\"integer\"},\"filename\":{\"description\":\"filename in inbox\",\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"state\":{\"enum\":[\"REVIEW\",\"LAT_LON_OUT_OF_RANGE\",\"NOT_ENOUGH_DATA\",\"UNSUPPORTED_CONTENT_TYPE\",\"PHOTO_TOO_LARGE\",\"PHOTO_UPLOAD_NOT_ALLOWED\",\"COUNTRY_DISABLED\",\"CONFLICT\",\"UNAUTHORIZED\",\"ERROR\"],\"type\":\"string\"}},\"required\":[\"state\"],\"type\":\"object\"}}},\"description\":\"upload successful\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response status of photo uploads and problem reports\",\"properties\":{\"crc32\":{\"description\":\"CRC32 checksum of the uploaded photo\",\"format\":\"int64\",\"type\":\"integer\"},\"filename\":{\"description\":\"filename in inbox\",\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"state\":{\"enum\":[\"REVIEW\",\"LAT_LON_OUT_OF_RANGE\",\"NOT_ENOUGH_DATA\",\"UNSUPPORTED_CONTENT_TYPE\",\"PHOTO_TOO_LARGE\",\"PHOTO_UPLOAD_NOT_ALLOWED\",\"COUNTRY_DISABLED\",\"CONFLICT\",\"UNAUTHORIZED\",\"ERROR\"],\"type\":\"string\"}},\"required\":[\"state\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response status of photo uploads and problem reports\",\"properties\":{\"crc32\":{\"description\":\"CRC32 checksum of the uploaded photo\",\"format\":\"int64\",\"type\":\"integer\"},\"filename\":{\"description\":\"filename in inbox\",\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"state\":{\"enum\":[\"REVIEW\",\"LAT_LON_OUT_OF_RANGE\",\"NOT_ENOUGH_DATA\",\"UNSUPPORTED_CONTENT_TYPE\",\"PHOTO_TOO_LARGE\",\"PHOTO_UPLOAD_NOT_ALLOWED\",\"COUNTRY_DISABLED\",\"CONFLICT\",\"UNAUTHORIZED\",\"ERROR\"],\"type\":\"string\"}},\"required\":[\"state\"],\"type\":\"object\"}}},\"description\":\"authorization failed\"},\"403\":{\"content\":{},\"description\":\"forbidden\"},\"409\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response status of photo uploads and problem reports\",\"properties\":{\"crc32\":{\"description\":\"CRC32 checksum of the uploaded photo\",\"format\":\"int64\",\"type\":\"integer\"},\"filename\":{\"description\":\"filename in inbox\",\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"state\":{\"enum\":[\"REVIEW\",\"LAT_LON_OUT_OF_RANGE\",\"NOT_ENOUGH_DATA\",\"UNSUPPORTED_CONTENT_TYPE\",\"PHOTO_TOO_LARGE\",\"PHOTO_UPLOAD_NOT_ALLOWED\",\"COUNTRY_DISABLED\",\"CONFLICT\",\"UNAUTHORIZED\",\"ERROR\"],\"type\":\"string\"}},\"required\":[\"state\"],\"type\":\"object\"}}},\"description\":\"photo already exists\"},\"413\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response status of photo uploads and problem reports\",\"properties\":{\"crc32\":{\"description\":\"CRC32 checksum of the uploaded photo\",\"format\":\"int64\",\"type\":\"integer\"},\"filename\":{\"description\":\"filename in inbox\",\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"state\":{\"enum\":[\"REVIEW\",\"LAT_LON_OUT_OF_RANGE\",\"NOT_ENOUGH_DATA\",\"UNSUPPORTED_CONTENT_TYPE\",\"PHOTO_TOO_LARGE\",\"PHOTO_UPLOAD_NOT_ALLOWED\",\"COUNTRY_DISABLED\",\"CONFLICT\",\"UNAUTHORIZED\",\"ERROR\"],\"type\":\"string\"}},\"required\":[\"state\"],\"type\":\"object\"}}},\"description\":\"image too large (maximum 20 MB)\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/photoUpload","segments":[{"lit":"photoUpload"}],"select":{"exist":["active","authorization","comment","content_type","country","latitude","longitude","station_id","station_title"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"photo_upload","name__orig":"photo_upload","Name":"PhotoUpload","name_":"photo_upload","name-":"photo-upload","NAME":"PHOTO_UPLOAD","index$":11}, {"active":true,"entity":"photo_upload","key$":"BasicPhotoUploadFlow","kind":"basic","name":"BasicPhotoUploadFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"photo_upload_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'PhotoUpload')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const photo_upload_ref01_ent = client.PhotoUpload()
    let photo_upload_ref01_data = setup.data.new.photo_upload['photo_upload_ref01']

    photo_upload_ref01_data = (await photo_upload_ref01_ent.create(photo_upload_ref01_data)).data()
    assert(null != photo_upload_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/photo_upload/PhotoUploadTestData.json')

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
    ['photo_upload01','photo_upload02','photo_upload03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RAILWAY_STATION_PHOTOS_TEST_PHOTO_UPLOAD_ENTID': idmap,
    'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
    'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_UPLOAD_ENTID']

  const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_UPLOAD_ENTID']
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
  
