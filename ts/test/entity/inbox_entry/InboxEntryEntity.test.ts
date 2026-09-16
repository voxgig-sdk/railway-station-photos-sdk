

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


describe('InboxEntryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RAILWAY_STATION_PHOTOS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RailwayStationPhotosSDK.test()
    const ent = testsdk.InboxEntry()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'inbox_entry.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"active","req":false,"short":"active flag provided by the user","type":"`$BOOLEAN`","index$":0},{"active":true,"name":"comment","req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"countryCode","req":false,"short":"a two character country code","type":"`$STRING`","index$":2},{"active":true,"format":"int64","name":"createdAt","req":true,"type":"`$INTEGER`","index$":3},{"active":true,"name":"done","req":true,"short":"true if this photo was already imported or rejected","type":"`$BOOLEAN`","index$":4},{"active":true,"name":"filename","req":false,"short":"name of the file in inbox","type":"`$STRING`","index$":5},{"active":true,"name":"hasConflict","req":false,"short":"conflict with another upload or existing photo","type":"`$BOOLEAN`","index$":6},{"active":true,"name":"hasPhoto","req":true,"short":"this station has already a photo (conflict)","type":"`$BOOLEAN`","index$":7},{"active":true,"format":"int64","name":"id","req":true,"type":"`$INTEGER`","index$":8},{"active":true,"name":"inboxUrl","req":false,"short":"url of the photo in the inbox","type":"`$STRING`","index$":9},{"active":true,"name":"isProcessed","req":false,"short":"was this image process (e.g.","type":"`$BOOLEAN`","index$":10},{"active":true,"format":"double","name":"lat","req":false,"type":"`$NUMBER`","index$":11},{"active":true,"format":"double","name":"lon","req":false,"type":"`$NUMBER`","index$":12},{"active":true,"format":"double","name":"newLat","req":false,"type":"`$NUMBER`","index$":13},{"active":true,"format":"double","name":"newLon","req":false,"type":"`$NUMBER`","index$":14},{"active":true,"name":"newTitle","req":false,"type":"`$STRING`","index$":15},{"active":true,"format":"int64","name":"photoId","req":false,"short":"ID of the photo","type":"`$INTEGER`","index$":16},{"active":true,"name":"photographerEmail","req":false,"type":"`$STRING`","index$":17},{"active":true,"name":"photographerNickname","req":true,"type":"`$STRING`","index$":18},{"active":true,"name":"problemReportType","req":false,"short":"types of problem reports","type":"`$STRING`","index$":19},{"active":true,"name":"stationId","req":false,"type":"`$STRING`","index$":20},{"active":true,"name":"title","req":false,"type":"`$STRING`","index$":21}],"id":{"field":"id","name":"id"},"name":"inbox_entry","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"authorization","orig":"authorization","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"GET /adminInbox","json":"{\"operationId\":\"getAdminInbox\",\"parameters\":[{\"description\":\"JWT authorization\\n\",\"in\":\"header\",\"name\":\"Authorization\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"Represents an uploaded photo with processing state\",\"properties\":{\"active\":{\"description\":\"active flag provided by the user\",\"type\":\"boolean\"},\"comment\":{\"type\":\"string\"},\"countryCode\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"},\"createdAt\":{\"format\":\"int64\",\"type\":\"integer\"},\"done\":{\"description\":\"true if this photo was already imported or rejected\",\"type\":\"boolean\"},\"filename\":{\"description\":\"name of the file in inbox\",\"type\":\"string\"},\"hasConflict\":{\"description\":\"conflict with another upload or existing photo\",\"type\":\"boolean\"},\"hasPhoto\":{\"description\":\"this station has already a photo (conflict)\",\"type\":\"boolean\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"isProcessed\":{\"description\":\"was this image process (e.g. pixelated)\",\"type\":\"boolean\"},\"lat\":{\"format\":\"double\",\"type\":\"number\"},\"lon\":{\"format\":\"double\",\"type\":\"number\"},\"newLat\":{\"format\":\"double\",\"type\":\"number\"},\"newLon\":{\"format\":\"double\",\"type\":\"number\"},\"newTitle\":{\"type\":\"string\"},\"photoId\":{\"description\":\"ID of the photo\",\"format\":\"int64\",\"type\":\"integer\"},\"photographerEmail\":{\"type\":\"string\"},\"photographerNickname\":{\"type\":\"string\"},\"problemReportType\":{\"description\":\"types of problem reports\",\"enum\":[\"WRONG_LOCATION\",\"STATION_INACTIVE\",\"STATION_ACTIVE\",\"STATION_NONEXISTENT\",\"WRONG_NAME\",\"WRONG_PHOTO\",\"PHOTO_OUTDATED\",\"OTHER\",\"DUPLICATE\"],\"type\":\"string\"},\"stationId\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"required\":[\"id\",\"photographerNickname\",\"comment\",\"createdAt\",\"done\",\"hasPhoto\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"array of inbox objects\"},\"401\":{\"content\":{},\"description\":\"not authorized\"},\"403\":{\"content\":{},\"description\":\"forbidden\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/adminInbox","segments":[{"lit":"adminInbox"}],"select":{"exist":["authorization"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"inbox_entry","name__orig":"inbox_entry","Name":"InboxEntry","name_":"inbox_entry","name-":"inbox-entry","NAME":"INBOX_ENTRY","index$":4}, {"active":true,"entity":"inbox_entry","key$":"BasicInboxEntryFlow","kind":"basic","name":"BasicInboxEntryFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"inbox_entry_ref01"}}],"index$":0}]}, 'InboxEntry')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let inbox_entry_ref01_data = Object.values(setup.data.existing.inbox_entry)[0] as any

    // LIST
    const inbox_entry_ref01_ent = client.InboxEntry()
    const inbox_entry_ref01_match: any = {}

    const inbox_entry_ref01_list = (await inbox_entry_ref01_ent.list(inbox_entry_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/inbox_entry/InboxEntryTestData.json')

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
    ['inbox_entry01','inbox_entry02','inbox_entry03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTRY_ENTID': idmap,
    'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
    'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTRY_ENTID']

  const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTRY_ENTID']
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
  
