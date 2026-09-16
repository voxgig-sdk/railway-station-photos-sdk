

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


describe('InboxEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RAILWAY_STATION_PHOTOS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RailwayStationPhotosSDK.test()
    const ent = testsdk.Inbox()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'inbox.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"comment","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"countryCode","req":false,"short":"a two character country code","type":"`$STRING`","index$":1},{"active":true,"format":"int64","name":"crc32","req":false,"short":"CRC32 checksum of the uploaded photo","type":"`$INTEGER`","index$":2},{"active":true,"format":"int64","name":"createdAt","req":false,"type":"`$INTEGER`","index$":3},{"active":true,"name":"filename","req":false,"short":"filename in inbox","type":"`$STRING`","index$":4},{"active":true,"format":"int64","name":"id","req":true,"type":"`$INTEGER`","index$":5},{"active":true,"name":"inboxUrl","req":false,"short":"url of the photo in the inbox","type":"`$STRING`","index$":6},{"active":true,"format":"double","name":"lat","req":false,"type":"`$NUMBER`","index$":7},{"active":true,"format":"double","name":"lon","req":false,"type":"`$NUMBER`","index$":8},{"active":true,"format":"double","name":"newLat","req":false,"type":"`$NUMBER`","index$":9},{"active":true,"format":"double","name":"newLon","req":false,"type":"`$NUMBER`","index$":10},{"active":true,"name":"newTitle","req":false,"type":"`$STRING`","index$":11},{"active":true,"name":"problemReportType","req":false,"short":"types of problem reports","type":"`$STRING`","index$":12},{"active":true,"name":"rejectedReason","req":false,"type":"`$STRING`","index$":13},{"active":true,"name":"state","req":true,"type":"`$STRING`","index$":14},{"active":true,"name":"stationId","req":false,"type":"`$STRING`","index$":15},{"active":true,"name":"title","req":false,"type":"`$STRING`","index$":16}],"id":{"field":"id","name":"id"},"name":"inbox","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"authorization","orig":"authorization","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"POST /reportProblem","json":"{\"operationId\":\"postReportProblem\",\"parameters\":[{\"description\":\"JWT authorization\\n\",\"in\":\"header\",\"name\":\"Authorization\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"*/*\":{\"schema\":{\"description\":\"Represents a report of a problem with a station\",\"properties\":{\"comment\":{\"type\":\"string\"},\"countryCode\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"},\"lat\":{\"description\":\"new latitude value for the station\",\"format\":\"double\",\"type\":\"number\"},\"lon\":{\"description\":\"new longitude value for the station\",\"format\":\"double\",\"type\":\"number\"},\"photoId\":{\"description\":\"Unique id of a photo, can be used for WRONG_PHOTO and PHOTO_OUTDATED type.\",\"format\":\"int64\",\"type\":\"integer\"},\"stationId\":{\"type\":\"string\"},\"title\":{\"description\":\"a new title for the station\",\"type\":\"string\"},\"type\":{\"description\":\"types of problem reports\",\"enum\":[\"WRONG_LOCATION\",\"STATION_INACTIVE\",\"STATION_ACTIVE\",\"STATION_NONEXISTENT\",\"WRONG_NAME\",\"WRONG_PHOTO\",\"PHOTO_OUTDATED\",\"OTHER\",\"DUPLICATE\"],\"type\":\"string\"}},\"required\":[\"countryCode\",\"stationId\",\"comment\",\"type\"],\"type\":\"object\"}}},\"description\":\"The problem report\",\"required\":true},\"responses\":{\"202\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response status of photo uploads and problem reports\",\"properties\":{\"crc32\":{\"description\":\"CRC32 checksum of the uploaded photo\",\"format\":\"int64\",\"type\":\"integer\"},\"filename\":{\"description\":\"filename in inbox\",\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"state\":{\"enum\":[\"REVIEW\",\"LAT_LON_OUT_OF_RANGE\",\"NOT_ENOUGH_DATA\",\"UNSUPPORTED_CONTENT_TYPE\",\"PHOTO_TOO_LARGE\",\"PHOTO_UPLOAD_NOT_ALLOWED\",\"COUNTRY_DISABLED\",\"CONFLICT\",\"UNAUTHORIZED\",\"ERROR\"],\"type\":\"string\"}},\"required\":[\"state\"],\"type\":\"object\"}}},\"description\":\"report successful\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response status of photo uploads and problem reports\",\"properties\":{\"crc32\":{\"description\":\"CRC32 checksum of the uploaded photo\",\"format\":\"int64\",\"type\":\"integer\"},\"filename\":{\"description\":\"filename in inbox\",\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"state\":{\"enum\":[\"REVIEW\",\"LAT_LON_OUT_OF_RANGE\",\"NOT_ENOUGH_DATA\",\"UNSUPPORTED_CONTENT_TYPE\",\"PHOTO_TOO_LARGE\",\"PHOTO_UPLOAD_NOT_ALLOWED\",\"COUNTRY_DISABLED\",\"CONFLICT\",\"UNAUTHORIZED\",\"ERROR\"],\"type\":\"string\"}},\"required\":[\"state\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response status of photo uploads and problem reports\",\"properties\":{\"crc32\":{\"description\":\"CRC32 checksum of the uploaded photo\",\"format\":\"int64\",\"type\":\"integer\"},\"filename\":{\"description\":\"filename in inbox\",\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"state\":{\"enum\":[\"REVIEW\",\"LAT_LON_OUT_OF_RANGE\",\"NOT_ENOUGH_DATA\",\"UNSUPPORTED_CONTENT_TYPE\",\"PHOTO_TOO_LARGE\",\"PHOTO_UPLOAD_NOT_ALLOWED\",\"COUNTRY_DISABLED\",\"CONFLICT\",\"UNAUTHORIZED\",\"ERROR\"],\"type\":\"string\"}},\"required\":[\"state\"],\"type\":\"object\"}}},\"description\":\"authorization failed\"},\"403\":{\"content\":{},\"description\":\"forbidden\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/reportProblem","segments":[{"lit":"reportProblem"}],"select":{"exist":["authorization"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"authorization","orig":"authorization","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"POST /userInbox","json":"{\"operationId\":\"postUserInbox\",\"parameters\":[{\"description\":\"JWT authorization\\n\",\"in\":\"header\",\"name\":\"Authorization\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"Contains an inbox entry ID to query its state\",\"properties\":{\"id\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"id\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Inbox state query request\",\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"Inbox state query\",\"properties\":{\"comment\":{\"type\":\"string\"},\"countryCode\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"},\"crc32\":{\"description\":\"CRC32 checksum of the uploaded photo\",\"format\":\"int64\",\"type\":\"integer\"},\"createdAt\":{\"format\":\"int64\",\"type\":\"integer\"},\"filename\":{\"description\":\"filename in inbox\",\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"lat\":{\"format\":\"double\",\"type\":\"number\"},\"lon\":{\"format\":\"double\",\"type\":\"number\"},\"newLat\":{\"format\":\"double\",\"type\":\"number\"},\"newLon\":{\"format\":\"double\",\"type\":\"number\"},\"newTitle\":{\"type\":\"string\"},\"problemReportType\":{\"description\":\"types of problem reports\",\"enum\":[\"WRONG_LOCATION\",\"STATION_INACTIVE\",\"STATION_ACTIVE\",\"STATION_NONEXISTENT\",\"WRONG_NAME\",\"WRONG_PHOTO\",\"PHOTO_OUTDATED\",\"OTHER\",\"DUPLICATE\"],\"type\":\"string\"},\"rejectedReason\":{\"type\":\"string\"},\"state\":{\"enum\":[\"UNKNOWN\",\"REVIEW\",\"CONFLICT\",\"ACCEPTED\",\"REJECTED\"],\"type\":\"string\"},\"stationId\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"required\":[\"id\",\"state\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"array of InboxStateQueryResponse objects\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/userInbox","segments":[{"lit":"userInbox"}],"select":{"exist":["authorization"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"authorization","orig":"authorization","reqd":true,"type":"`$STRING`"}],"query":[{"active":true,"kind":"query","name":"show_completed_entry","orig":"show_completed_entry","reqd":false,"type":"`$BOOLEAN`","index$":0}]},"contract":{"id":"GET /userInbox","json":"{\"operationId\":\"getUserInbox\",\"parameters\":[{\"description\":\"JWT authorization\\n\",\"in\":\"header\",\"name\":\"Authorization\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"show completed entries or only entries in state review\",\"in\":\"query\",\"name\":\"showCompletedEntries\",\"required\":false,\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"Inbox state query\",\"properties\":{\"comment\":{\"type\":\"string\"},\"countryCode\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"},\"crc32\":{\"description\":\"CRC32 checksum of the uploaded photo\",\"format\":\"int64\",\"type\":\"integer\"},\"createdAt\":{\"format\":\"int64\",\"type\":\"integer\"},\"filename\":{\"description\":\"filename in inbox\",\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"lat\":{\"format\":\"double\",\"type\":\"number\"},\"lon\":{\"format\":\"double\",\"type\":\"number\"},\"newLat\":{\"format\":\"double\",\"type\":\"number\"},\"newLon\":{\"format\":\"double\",\"type\":\"number\"},\"newTitle\":{\"type\":\"string\"},\"problemReportType\":{\"description\":\"types of problem reports\",\"enum\":[\"WRONG_LOCATION\",\"STATION_INACTIVE\",\"STATION_ACTIVE\",\"STATION_NONEXISTENT\",\"WRONG_NAME\",\"WRONG_PHOTO\",\"PHOTO_OUTDATED\",\"OTHER\",\"DUPLICATE\"],\"type\":\"string\"},\"rejectedReason\":{\"type\":\"string\"},\"state\":{\"enum\":[\"UNKNOWN\",\"REVIEW\",\"CONFLICT\",\"ACCEPTED\",\"REJECTED\"],\"type\":\"string\"},\"stationId\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"required\":[\"id\",\"state\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"array of InboxStateQueryResponse objects\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/userInbox","segments":[{"lit":"userInbox"}],"select":{"exist":["authorization","show_completed_entry"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"DELETE /userInbox/{id}","json":"{\"operationId\":\"deleteUserInbox\",\"parameters\":[{\"description\":\"id of the inbox entry\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"format\":\"int64\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"inbox entry got deleted\"},\"400\":{\"content\":{},\"description\":\"bad request, e.g. if the inbox entry is already done and can't be deleted anymore\"},\"401\":{\"content\":{},\"description\":\"authorization failed\"},\"403\":{\"content\":{},\"description\":\"forbidden\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/userInbox/{id}","segments":[{"lit":"userInbox"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"inbox","name__orig":"inbox","Name":"Inbox","name_":"inbox","name-":"inbox","NAME":"INBOX","index$":2}, {"active":true,"entity":"inbox","key$":"BasicInboxFlow","kind":"basic","name":"BasicInboxFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"inbox_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"inbox_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"inbox_ref01","suffix":"_rm0"},"match":{"id":"inbox01"},"op":"remove","spec":[],"valid":[],"index$":2},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"inbox_ref01"}}],"index$":3}]}, 'Inbox')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const inbox_ref01_ent = client.Inbox()
    let inbox_ref01_data = setup.data.new.inbox['inbox_ref01']

    inbox_ref01_data = (await inbox_ref01_ent.create(inbox_ref01_data)).data()
    assert(null != inbox_ref01_data.id)


    // LIST
    const inbox_ref01_match: any = {}

    const inbox_ref01_list = (await inbox_ref01_ent.list(inbox_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(inbox_ref01_list, { id: inbox_ref01_data.id })))


    // REMOVE
    const inbox_ref01_match_rm0: any = { id: inbox_ref01_data.id }
    await inbox_ref01_ent.remove(inbox_ref01_match_rm0)
  

    // LIST
    const inbox_ref01_match_rt0: any = {}

    const inbox_ref01_list_rt0 = (await inbox_ref01_ent.list(inbox_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(inbox_ref01_list_rt0, { id: inbox_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/inbox/InboxTestData.json')

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
    ['inbox01','inbox02','inbox03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTID': idmap,
    'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
    'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTID']

  const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTID']
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
  
