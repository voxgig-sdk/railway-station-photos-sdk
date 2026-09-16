

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


describe('AdminInboxEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RAILWAY_STATION_PHOTOS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RailwayStationPhotosSDK.test()
    const ent = testsdk.AdminInbox()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'admin_inbox.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"DS100","req":false,"short":"DS100 attribute of a new station","type":"`$STRING`","index$":0},{"active":true,"name":"active","req":false,"short":"active flag of a new station (default true)","type":"`$BOOLEAN`","index$":1},{"active":true,"name":"command","req":true,"type":"`$STRING`","index$":2},{"active":true,"name":"conflictResolution","req":false,"short":"how to handle conflicts","type":"`$STRING`","index$":3},{"active":true,"name":"countryCode","req":false,"short":"a two character country code","type":"`$STRING`","index$":4},{"active":true,"format":"int64","name":"id","req":true,"type":"`$INTEGER`","index$":5},{"active":true,"format":"double","name":"lat","req":false,"type":"`$NUMBER`","index$":6},{"active":true,"format":"double","name":"lon","req":false,"type":"`$NUMBER`","index$":7},{"active":true,"name":"message","req":true,"type":"`$STRING`","index$":8},{"active":true,"name":"rejectReason","req":false,"short":"explanation of a rejection","type":"`$STRING`","index$":9},{"active":true,"name":"stationId","req":false,"short":"ID of a new station","type":"`$STRING`","index$":10},{"active":true,"format":"int32","name":"status","req":true,"type":"`$INTEGER`","index$":11},{"active":true,"name":"title","req":false,"type":"`$STRING`","index$":12}],"id":{"field":"id","name":"id"},"name":"admin_inbox","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"authorization","orig":"authorization","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"POST /adminInbox","json":"{\"operationId\":\"postAdminInbox\",\"parameters\":[{\"description\":\"JWT authorization\\n\",\"in\":\"header\",\"name\":\"Authorization\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"command to import or reject an inbox entry\",\"properties\":{\"DS100\":{\"description\":\"DS100 attribute of a new station\",\"type\":\"string\"},\"active\":{\"description\":\"active flag of a new station (default true)\",\"type\":\"boolean\"},\"command\":{\"enum\":[\"IMPORT_PHOTO\",\"IMPORT_MISSING_STATION\",\"ACTIVATE_STATION\",\"DEACTIVATE_STATION\",\"DELETE_STATION\",\"DELETE_PHOTO\",\"MARK_SOLVED\",\"REJECT\",\"CHANGE_NAME\",\"UPDATE_LOCATION\",\"PHOTO_OUTDATED\"],\"type\":\"string\"},\"conflictResolution\":{\"description\":\"how to handle conflicts\",\"enum\":[\"DO_NOTHING\",\"OVERWRITE_EXISTING_PHOTO\",\"IMPORT_AS_NEW_PRIMARY_PHOTO\",\"IMPORT_AS_NEW_SECONDARY_PHOTO\",\"IGNORE_NEARBY_STATION\"],\"type\":\"string\"},\"countryCode\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"lat\":{\"format\":\"double\",\"type\":\"number\"},\"lon\":{\"format\":\"double\",\"type\":\"number\"},\"rejectReason\":{\"description\":\"explanation of a rejection\",\"type\":\"string\"},\"stationId\":{\"description\":\"ID of a new station\",\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"required\":[\"id\",\"command\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response object for an AdminInbox command\",\"properties\":{\"message\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"command successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response object for an AdminInbox command\",\"properties\":{\"message\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{},\"description\":\"not authorized\"},\"403\":{\"content\":{},\"description\":\"forbidden\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/adminInbox","segments":[{"lit":"adminInbox"}],"select":{"exist":["authorization"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"admin_inbox","name__orig":"admin_inbox","Name":"AdminInbox","name_":"admin_inbox","name-":"admin-inbox","NAME":"ADMIN_INBOX","index$":0}, {"active":true,"entity":"admin_inbox","key$":"BasicAdminInboxFlow","kind":"basic","name":"BasicAdminInboxFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"admin_inbox_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'AdminInbox')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const admin_inbox_ref01_ent = client.AdminInbox()
    let admin_inbox_ref01_data = setup.data.new.admin_inbox['admin_inbox_ref01']

    admin_inbox_ref01_data = (await admin_inbox_ref01_ent.create(admin_inbox_ref01_data)).data()
    assert(null != admin_inbox_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/admin_inbox/AdminInboxTestData.json')

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
    ['admin_inbox01','admin_inbox02','admin_inbox03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RAILWAY_STATION_PHOTOS_TEST_ADMIN_INBOX_ENTID': idmap,
    'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
    'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RAILWAY_STATION_PHOTOS_TEST_ADMIN_INBOX_ENTID']

  const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_ADMIN_INBOX_ENTID']
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
  
