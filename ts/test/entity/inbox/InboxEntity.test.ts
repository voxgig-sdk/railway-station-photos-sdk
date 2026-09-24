

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"comment":{"a":true,"h":"Comment","n":"comment","r":false,"t":"`$STRING`","key$":"comment","index$":0},"countryCode":{"a":true,"h":"Country Code","n":"countryCode","r":false,"sh":"a two character country code","t":"`$STRING`","key$":"countryCode","index$":1},"crc32":{"a":true,"fo":"int64","h":"Crc32","n":"crc32","r":false,"sh":"CRC32 checksum of the uploaded photo","t":"`$INTEGER`","key$":"crc32","index$":2},"createdAt":{"a":true,"fo":"int64","h":"Created At","n":"createdAt","r":false,"t":"`$INTEGER`","key$":"createdAt","index$":3},"filename":{"a":true,"h":"Filename","n":"filename","r":false,"sh":"filename in inbox","t":"`$STRING`","key$":"filename","index$":4},"id":{"a":true,"fo":"int64","h":"Id","n":"id","r":true,"t":"`$INTEGER`","key$":"id","index$":5},"inboxUrl":{"a":true,"h":"Inbox Url","n":"inboxUrl","r":false,"sh":"url of the photo in the inbox","t":"`$STRING`","key$":"inboxUrl","index$":6},"lat":{"a":true,"fo":"double","h":"Lat","n":"lat","r":false,"t":"`$NUMBER`","key$":"lat","index$":7},"lon":{"a":true,"fo":"double","h":"Lon","n":"lon","r":false,"t":"`$NUMBER`","key$":"lon","index$":8},"newLat":{"a":true,"fo":"double","h":"New Lat","n":"newLat","r":false,"t":"`$NUMBER`","key$":"newLat","index$":9},"newLon":{"a":true,"fo":"double","h":"New Lon","n":"newLon","r":false,"t":"`$NUMBER`","key$":"newLon","index$":10},"newTitle":{"a":true,"h":"New Title","n":"newTitle","r":false,"t":"`$STRING`","key$":"newTitle","index$":11},"problemReportType":{"a":true,"h":"Problem Report Type","n":"problemReportType","r":false,"sh":"types of problem reports","t":"`$STRING`","key$":"problemReportType","index$":12},"rejectedReason":{"a":true,"h":"Rejected Reason","n":"rejectedReason","r":false,"t":"`$STRING`","key$":"rejectedReason","index$":13},"state":{"a":true,"h":"State","n":"state","r":true,"t":"`$STRING`","key$":"state","index$":14},"stationId":{"a":true,"h":"Station Id","n":"stationId","r":false,"t":"`$STRING`","key$":"stationId","index$":15},"title":{"a":true,"h":"Title","n":"title","r":false,"t":"`$STRING`","key$":"title","index$":16}},"id":{"field":"id","name":"id"},"name":"inbox","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /reportProblem","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/reportProblem","q":{"exist":["authorization"]},"r":{},"s":[{"lit":"reportProblem"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /userInbox","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/userInbox","q":{"exist":["authorization"]},"r":{},"s":[{"lit":"userInbox"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /userInbox","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"authorization","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"show_completed_entry","or":"show_completed_entry","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/userInbox","q":{"exist":["authorization","show_completed_entry"]},"r":{},"s":[{"lit":"userInbox"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /userInbox/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"DELETE","o":"/userInbox/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"userInbox"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"inbox","name__orig":"inbox","Name":"Inbox","name_":"inbox","name-":"inbox","NAME":"INBOX","index$":2}, {"active":true,"entity":"inbox","key$":"BasicInboxFlow","kind":"basic","name":"BasicInboxFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"inbox_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"inbox_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"inbox_ref01","suffix":"_rm0"},"m":{"id":"inbox01"},"o":"remove","s":[],"v":[],"index$":2},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"inbox_ref01"}}],"index$":3}]}, 'Inbox', {"POST /reportProblem":{"protocol":"http","operationId":"postReportProblem","requestBody":{"description":"The problem report","content":{"*/*":{"schema":{"description":"Represents a report of a problem with a station","type":"object","properties":{"countryCode":{"description":"a two character country code","type":"string","maxLength":2,"minLength":2,"x-ref":"#/components/schemas/CountryCode"},"stationId":{"type":"string"},"title":{"type":"string","description":"a new title for the station"},"photoId":{"type":"integer","format":"int64","description":"Unique id of a photo, can be used for WRONG_PHOTO and PHOTO_OUTDATED type."},"comment":{"type":"string"},"type":{"description":"types of problem reports","type":"string","enum":["WRONG_LOCATION","STATION_INACTIVE","STATION_ACTIVE","STATION_NONEXISTENT","WRONG_NAME","WRONG_PHOTO","PHOTO_OUTDATED","OTHER","DUPLICATE"],"x-ref":"#/components/schemas/ProblemReportType"},"lat":{"type":"number","format":"double","description":"new latitude value for the station"},"lon":{"type":"number","format":"double","description":"new longitude value for the station"}},"required":["countryCode","stationId","comment","type"],"x-ref":"#/components/schemas/ProblemReport"}}},"required":true},"responses":{"202":{"description":"report successful","content":{"application/json":{"schema":{"description":"Response status of photo uploads and problem reports","type":"object","required":["state"],"properties":{"state":{"type":"string","enum":["REVIEW","LAT_LON_OUT_OF_RANGE","NOT_ENOUGH_DATA","UNSUPPORTED_CONTENT_TYPE","PHOTO_TOO_LARGE","PHOTO_UPLOAD_NOT_ALLOWED","COUNTRY_DISABLED","CONFLICT","UNAUTHORIZED","ERROR"]},"message":{"type":"string"},"id":{"type":"integer","format":"int64"},"filename":{"type":"string","description":"filename in inbox"},"inboxUrl":{"type":"string","description":"url of the photo in the inbox"},"crc32":{"description":"CRC32 checksum of the uploaded photo","type":"integer","format":"int64"}},"x-ref":"#/components/schemas/InboxResponse"}}}},"400":{"description":"Bad Request","content":{"application/json":{"schema":{"description":"Response status of photo uploads and problem reports","type":"object","required":["state"],"properties":{"state":{"type":"string","enum":["REVIEW","LAT_LON_OUT_OF_RANGE","NOT_ENOUGH_DATA","UNSUPPORTED_CONTENT_TYPE","PHOTO_TOO_LARGE","PHOTO_UPLOAD_NOT_ALLOWED","COUNTRY_DISABLED","CONFLICT","UNAUTHORIZED","ERROR"]},"message":{"type":"string"},"id":{"type":"integer","format":"int64"},"filename":{"type":"string","description":"filename in inbox"},"inboxUrl":{"type":"string","description":"url of the photo in the inbox"},"crc32":{"description":"CRC32 checksum of the uploaded photo","type":"integer","format":"int64"}},"x-ref":"#/components/schemas/InboxResponse"}}}},"401":{"description":"authorization failed","content":{"application/json":{"schema":{"description":"Response status of photo uploads and problem reports","type":"object","required":["state"],"properties":{"state":{"type":"string","enum":["REVIEW","LAT_LON_OUT_OF_RANGE","NOT_ENOUGH_DATA","UNSUPPORTED_CONTENT_TYPE","PHOTO_TOO_LARGE","PHOTO_UPLOAD_NOT_ALLOWED","COUNTRY_DISABLED","CONFLICT","UNAUTHORIZED","ERROR"]},"message":{"type":"string"},"id":{"type":"integer","format":"int64"},"filename":{"type":"string","description":"filename in inbox"},"inboxUrl":{"type":"string","description":"url of the photo in the inbox"},"crc32":{"description":"CRC32 checksum of the uploaded photo","type":"integer","format":"int64"}},"x-ref":"#/components/schemas/InboxResponse"}}}},"403":{"description":"forbidden","content":{}},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[{"name":"Authorization","in":"header","description":"JWT authorization\n","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Authorization","index$":0}],"securitySource":"unspecified"},"POST /userInbox":{"protocol":"http","operationId":"postUserInbox","requestBody":{"description":"Inbox state query request","content":{"application/json":{"schema":{"type":"array","items":{"description":"Contains an inbox entry ID to query its state","type":"object","properties":{"id":{"type":"integer","format":"int64"}},"required":["id"],"x-ref":"#/components/schemas/InboxStateQueryRequest"},"index$":1}}},"required":true},"responses":{"200":{"description":"array of InboxStateQueryResponse objects","content":{"application/json":{"schema":{"type":"array","items":{"description":"Inbox state query","type":"object","properties":{"id":{"type":"integer","format":"int64","key$":"id"},"countryCode":{"description":"a two character country code","type":"string","maxLength":2,"minLength":2,"x-ref":"#/components/schemas/CountryCode","key$":"countryCode"},"stationId":{"type":"string","key$":"stationId"},"title":{"type":"string","key$":"title"},"lat":{"type":"number","format":"double","key$":"lat"},"lon":{"type":"number","format":"double","key$":"lon"},"newTitle":{"type":"string","key$":"newTitle"},"newLat":{"type":"number","format":"double","key$":"newLat"},"newLon":{"type":"number","format":"double","key$":"newLon"},"comment":{"type":"string","key$":"comment"},"problemReportType":{"description":"types of problem reports","type":"string","enum":["WRONG_LOCATION","STATION_INACTIVE","STATION_ACTIVE","STATION_NONEXISTENT","WRONG_NAME","WRONG_PHOTO","PHOTO_OUTDATED","OTHER","DUPLICATE"],"x-ref":"#/components/schemas/ProblemReportType","key$":"problemReportType"},"rejectedReason":{"type":"string","key$":"rejectedReason"},"filename":{"type":"string","description":"filename in inbox","key$":"filename"},"inboxUrl":{"type":"string","description":"url of the photo in the inbox","key$":"inboxUrl"},"crc32":{"description":"CRC32 checksum of the uploaded photo","type":"integer","format":"int64","key$":"crc32"},"state":{"type":"string","enum":["UNKNOWN","REVIEW","CONFLICT","ACCEPTED","REJECTED"],"key$":"state"},"createdAt":{"type":"integer","format":"int64","key$":"createdAt"}},"required":["id","state"],"x-ref":"#/components/schemas/InboxStateQueryResponse"},"index$":0}}}},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[{"name":"Authorization","in":"header","description":"JWT authorization\n","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Authorization","index$":0}],"securitySource":"unspecified"},"GET /userInbox":{"protocol":"http","operationId":"getUserInbox","responses":{"200":{"description":"array of InboxStateQueryResponse objects","content":{"application/json":{"schema":{"type":"array","items":{"description":"Inbox state query","type":"object","properties":{"id":{"type":"integer","format":"int64","key$":"id"},"countryCode":{"description":"a two character country code","type":"string","maxLength":2,"minLength":2,"x-ref":"#/components/schemas/CountryCode","key$":"countryCode"},"stationId":{"type":"string","key$":"stationId"},"title":{"type":"string","key$":"title"},"lat":{"type":"number","format":"double","key$":"lat"},"lon":{"type":"number","format":"double","key$":"lon"},"newTitle":{"type":"string","key$":"newTitle"},"newLat":{"type":"number","format":"double","key$":"newLat"},"newLon":{"type":"number","format":"double","key$":"newLon"},"comment":{"type":"string","key$":"comment"},"problemReportType":{"description":"types of problem reports","type":"string","enum":["WRONG_LOCATION","STATION_INACTIVE","STATION_ACTIVE","STATION_NONEXISTENT","WRONG_NAME","WRONG_PHOTO","PHOTO_OUTDATED","OTHER","DUPLICATE"],"x-ref":"#/components/schemas/ProblemReportType","key$":"problemReportType"},"rejectedReason":{"type":"string","key$":"rejectedReason"},"filename":{"type":"string","description":"filename in inbox","key$":"filename"},"inboxUrl":{"type":"string","description":"url of the photo in the inbox","key$":"inboxUrl"},"crc32":{"description":"CRC32 checksum of the uploaded photo","type":"integer","format":"int64","key$":"crc32"},"state":{"type":"string","enum":["UNKNOWN","REVIEW","CONFLICT","ACCEPTED","REJECTED"],"key$":"state"},"createdAt":{"type":"integer","format":"int64","key$":"createdAt"}},"required":["id","state"],"x-ref":"#/components/schemas/InboxStateQueryResponse","index$":0}}}}},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[{"name":"Authorization","in":"header","description":"JWT authorization\n","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Authorization","index$":0},{"name":"showCompletedEntries","in":"query","description":"show completed entries or only entries in state review","required":false,"schema":{"type":"boolean"},"index$":1}],"securitySource":"unspecified"},"DELETE /userInbox/{id}":{"protocol":"http","operationId":"deleteUserInbox","responses":{"204":{"description":"inbox entry got deleted"},"400":{"description":"bad request, e.g. if the inbox entry is already done and can't be deleted anymore","content":{}},"401":{"description":"authorization failed","content":{}},"403":{"description":"forbidden","content":{}},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[{"name":"id","in":"path","required":true,"description":"id of the inbox entry","schema":{"type":"integer","format":"int64"},"index$":0}],"securitySource":"unspecified"}})
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
  
