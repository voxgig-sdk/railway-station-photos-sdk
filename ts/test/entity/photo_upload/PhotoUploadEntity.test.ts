

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"crc32":{"a":true,"fo":"int64","h":"Crc32","n":"crc32","r":false,"sh":"CRC32 checksum of the uploaded photo","t":"`$INTEGER`","key$":"crc32","index$":0},"filename":{"a":true,"h":"Filename","n":"filename","r":false,"sh":"filename in inbox","t":"`$STRING`","key$":"filename","index$":1},"id":{"a":true,"fo":"int64","h":"Id","n":"id","r":false,"t":"`$INTEGER`","key$":"id","index$":2},"inboxUrl":{"a":true,"h":"Inbox Url","n":"inboxUrl","r":false,"sh":"url of the photo in the inbox","t":"`$STRING`","key$":"inboxUrl","index$":3},"message":{"a":true,"h":"Message","n":"message","r":false,"t":"`$STRING`","key$":"message","index$":4},"state":{"a":true,"h":"State","n":"state","r":true,"t":"`$STRING`","key$":"state","index$":5}},"id":{"field":"id","name":"id"},"name":"photo_upload","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /photoUpload","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"active","or":"Active","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":1},{"a":true,"k":"header","n":"comment","or":"Comment","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"header","n":"content_type","or":"Content-Type","r":true,"t":"`$STRING`","index$":3},{"a":true,"k":"header","n":"country","or":"Country","r":false,"t":"`$STRING`","index$":4},{"a":true,"k":"header","n":"latitude","or":"Latitude","r":false,"t":"`$NUMBER`","index$":5},{"a":true,"k":"header","n":"longitude","or":"Longitude","r":false,"t":"`$NUMBER`","index$":6},{"a":true,"k":"header","n":"station_id","or":"Station-Id","r":false,"t":"`$STRING`","index$":7},{"a":true,"k":"header","n":"station_title","or":"Station-Title","r":false,"t":"`$STRING`","index$":8}]},"k":"http","m":"POST","o":"/photoUpload","q":{"exist":["active","authorization","comment","content_type","country","latitude","longitude","station_id","station_title"]},"r":{},"s":[{"lit":"photoUpload"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"photo_upload","name__orig":"photo_upload","Name":"PhotoUpload","name_":"photo_upload","name-":"photo-upload","NAME":"PHOTO_UPLOAD","index$":13}, {"active":true,"entity":"photo_upload","key$":"BasicPhotoUploadFlow","kind":"basic","name":"BasicPhotoUploadFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"photo_upload_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'PhotoUpload', {"POST /photoUpload":{"protocol":"http","requestBody":{"description":"image, required for existing station, optional for missing stations","content":{"image/jpeg":{"schema":{"type":"string","format":"byte"}},"image/png":{"schema":{"type":"string","format":"byte"}},"application/octet-stream":{"schema":{"type":"string","format":"byte"}}}},"parameters":[{"name":"Authorization","in":"header","description":"JWT authorization\n","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Authorization","index$":0},{"name":"Country","in":"header","description":"country code","schema":{"description":"a two character country code","type":"string","maxLength":2,"minLength":2,"x-ref":"#/components/schemas/CountryCode"},"index$":1},{"name":"Station-Id","in":"header","description":"id of the railwaystation","schema":{"type":"string"},"index$":2},{"name":"Content-Type","in":"header","description":"mime type of the image, \"image/png\" or \"image/jpeg\"","required":true,"schema":{"type":"string"},"index$":3},{"name":"Station-Title","in":"header","description":"name of the station, for upload of missing stations (needs to be URL-encoded with UTF-8 charset)","schema":{"type":"string"},"index$":4},{"name":"Latitude","in":"header","description":"latitude, for upload of missing stations","schema":{"type":"number","format":"double"},"index$":5},{"name":"Longitude","in":"header","description":"longitude, for upload of missing stations","schema":{"type":"number","format":"double"},"index$":6},{"name":"Comment","in":"header","description":"comment of the photographer to the reviewer (needs to be URL-encoded with UTF-8 charset)","schema":{"type":"string"},"index$":7},{"name":"Active","in":"header","description":"is this station active?","schema":{"type":"boolean"},"index$":8}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const photo_upload_ref01_ent = client.PhotoUpload()
    let photo_upload_ref01_data = setup.data.new.photo_upload['photo_upload_ref01']

    photo_upload_ref01_data = (await photo_upload_ref01_ent.create(photo_upload_ref01_data)).data()
    assert(null != photo_upload_ref01_data.id)


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
  
