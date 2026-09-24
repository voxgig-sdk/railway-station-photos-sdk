

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"active":{"a":true,"h":"Active","n":"active","r":false,"sh":"active flag provided by the user","t":"`$BOOLEAN`","key$":"active","index$":0},"comment":{"a":true,"h":"Comment","n":"comment","r":true,"t":"`$STRING`","key$":"comment","index$":1},"countryCode":{"a":true,"h":"Country Code","n":"countryCode","r":false,"sh":"a two character country code","t":"`$STRING`","key$":"countryCode","index$":2},"createdAt":{"a":true,"fo":"int64","h":"Created At","n":"createdAt","r":true,"t":"`$INTEGER`","key$":"createdAt","index$":3},"done":{"a":true,"h":"Done","n":"done","r":true,"sh":"true if this photo was already imported or rejected","t":"`$BOOLEAN`","key$":"done","index$":4},"filename":{"a":true,"h":"Filename","n":"filename","r":false,"sh":"name of the file in inbox","t":"`$STRING`","key$":"filename","index$":5},"hasConflict":{"a":true,"h":"Has Conflict","n":"hasConflict","r":false,"sh":"conflict with another upload or existing photo","t":"`$BOOLEAN`","key$":"hasConflict","index$":6},"hasPhoto":{"a":true,"h":"Has Photo","n":"hasPhoto","r":true,"sh":"this station has already a photo (conflict)","t":"`$BOOLEAN`","key$":"hasPhoto","index$":7},"id":{"a":true,"fo":"int64","h":"Id","n":"id","r":true,"t":"`$INTEGER`","key$":"id","index$":8},"inboxUrl":{"a":true,"h":"Inbox Url","n":"inboxUrl","r":false,"sh":"url of the photo in the inbox","t":"`$STRING`","key$":"inboxUrl","index$":9},"isProcessed":{"a":true,"h":"Is Processed","n":"isProcessed","r":false,"sh":"was this image process (e.g.","t":"`$BOOLEAN`","key$":"isProcessed","index$":10},"lat":{"a":true,"fo":"double","h":"Lat","n":"lat","r":false,"t":"`$NUMBER`","key$":"lat","index$":11},"lon":{"a":true,"fo":"double","h":"Lon","n":"lon","r":false,"t":"`$NUMBER`","key$":"lon","index$":12},"newLat":{"a":true,"fo":"double","h":"New Lat","n":"newLat","r":false,"t":"`$NUMBER`","key$":"newLat","index$":13},"newLon":{"a":true,"fo":"double","h":"New Lon","n":"newLon","r":false,"t":"`$NUMBER`","key$":"newLon","index$":14},"newTitle":{"a":true,"h":"New Title","n":"newTitle","r":false,"t":"`$STRING`","key$":"newTitle","index$":15},"photoId":{"a":true,"fo":"int64","h":"Photo Id","n":"photoId","r":false,"sh":"ID of the photo","t":"`$INTEGER`","key$":"photoId","index$":16},"photographerEmail":{"a":true,"h":"Photographer Email","n":"photographerEmail","r":false,"t":"`$STRING`","key$":"photographerEmail","index$":17},"photographerNickname":{"a":true,"h":"Photographer Nickname","n":"photographerNickname","r":true,"t":"`$STRING`","key$":"photographerNickname","index$":18},"problemReportType":{"a":true,"h":"Problem Report Type","n":"problemReportType","r":false,"sh":"types of problem reports","t":"`$STRING`","key$":"problemReportType","index$":19},"stationId":{"a":true,"h":"Station Id","n":"stationId","r":false,"t":"`$STRING`","key$":"stationId","index$":20},"title":{"a":true,"h":"Title","n":"title","r":false,"t":"`$STRING`","key$":"title","index$":21}},"id":{"field":"id","name":"id"},"name":"inbox_entry","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /adminInbox","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/adminInbox","q":{"exist":["authorization"]},"r":{},"s":[{"lit":"adminInbox"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"inbox_entry","name__orig":"inbox_entry","Name":"InboxEntry","name_":"inbox_entry","name-":"inbox-entry","NAME":"INBOX_ENTRY","index$":4}, {"active":true,"entity":"inbox_entry","key$":"BasicInboxEntryFlow","kind":"basic","name":"BasicInboxEntryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"inbox_entry_ref01"}}],"index$":0}]}, 'InboxEntry', {"GET /adminInbox":{"protocol":"http","operationId":"getAdminInbox","responses":{"200":{"description":"array of inbox objects","content":{"application/json":{"schema":{"type":"array","items":{"description":"Represents an uploaded photo with processing state","type":"object","properties":{"id":{"type":"integer","format":"int64","key$":"id"},"countryCode":{"description":"a two character country code","type":"string","maxLength":2,"minLength":2,"x-ref":"#/components/schemas/CountryCode","key$":"countryCode"},"stationId":{"type":"string","key$":"stationId"},"title":{"type":"string","key$":"title"},"lat":{"type":"number","format":"double","key$":"lat"},"lon":{"type":"number","format":"double","key$":"lon"},"newTitle":{"type":"string","key$":"newTitle"},"newLat":{"type":"number","format":"double","key$":"newLat"},"newLon":{"type":"number","format":"double","key$":"newLon"},"photographerNickname":{"type":"string","key$":"photographerNickname"},"photographerEmail":{"type":"string","key$":"photographerEmail"},"photoId":{"type":"integer","description":"ID of the photo","format":"int64","key$":"photoId"},"comment":{"type":"string","key$":"comment"},"createdAt":{"type":"integer","format":"int64","key$":"createdAt"},"done":{"type":"boolean","description":"true if this photo was already imported or rejected","key$":"done"},"filename":{"type":"string","description":"name of the file in inbox","key$":"filename"},"inboxUrl":{"type":"string","description":"url of the photo in the inbox","key$":"inboxUrl"},"hasPhoto":{"type":"boolean","description":"this station has already a photo (conflict)","key$":"hasPhoto"},"hasConflict":{"type":"boolean","description":"conflict with another upload or existing photo","key$":"hasConflict"},"problemReportType":{"description":"types of problem reports","type":"string","enum":["WRONG_LOCATION","STATION_INACTIVE","STATION_ACTIVE","STATION_NONEXISTENT","WRONG_NAME","WRONG_PHOTO","PHOTO_OUTDATED","OTHER","DUPLICATE"],"x-ref":"#/components/schemas/ProblemReportType","key$":"problemReportType"},"isProcessed":{"type":"boolean","description":"was this image process (e.g. pixelated)","key$":"isProcessed"},"active":{"type":"boolean","description":"active flag provided by the user","key$":"active"}},"required":["id","photographerNickname","comment","createdAt","done","hasPhoto"],"x-ref":"#/components/schemas/InboxEntry","index$":0}}}}},"401":{"description":"not authorized","content":{}},"403":{"description":"forbidden","content":{}},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[{"name":"Authorization","in":"header","description":"JWT authorization\n","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Authorization","index$":0}],"securitySource":"unspecified"}})
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
  
