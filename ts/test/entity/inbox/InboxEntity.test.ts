

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { RailwayStationPhotosSDK, BaseFeature, config, stdutil } from '../../..'

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


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('inbox hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of RailwayStationPhotosSDK.test(offline).Inbox().stream('list')) { }
    }, /offline/)

    for await (const _item of RailwayStationPhotosSDK.test(offline).Inbox()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = RailwayStationPhotosSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Inbox().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of RailwayStationPhotosSDK.test().Inbox().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new RailwayStationPhotosSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Inbox().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Inbox().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = RailwayStationPhotosSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Inbox().list({"show_completed_entry":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE
    for (const op of ['create', 'list', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'inbox.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"comment":{"a":true,"h":"Comment","n":"comment","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"comment","index$":0},"countryCode":{"a":true,"h":"Country Code","n":"countryCode","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"sh":"a two character country code","t":"`$STRING`","key$":"countryCode","index$":1},"crc32":{"a":true,"fo":"int64","h":"Crc32","n":"crc32","r":false,"sh":"CRC32 checksum of the uploaded photo","t":"`$INTEGER`","key$":"crc32","index$":2},"createdAt":{"a":true,"fo":"int64","h":"Created At","n":"createdAt","r":false,"t":"`$INTEGER`","key$":"createdAt","index$":3},"filename":{"a":true,"h":"Filename","n":"filename","r":false,"sh":"filename in inbox","t":"`$STRING`","key$":"filename","index$":4},"id":{"a":true,"fo":"int64","h":"Id","n":"id","op":{"list":{"req":true,"type":"`$INTEGER`"}},"r":false,"t":"`$INTEGER`","key$":"id","index$":5},"inboxUrl":{"a":true,"h":"Inbox Url","n":"inboxUrl","r":false,"sh":"url of the photo in the inbox","t":"`$STRING`","key$":"inboxUrl","index$":6},"inbox_state_queries":{"a":true,"h":"Inbox State Queries","n":"inbox_state_queries","r":false,"sh":"Inbox state query request","t":"`$ARRAY`","key$":"inbox_state_queries","index$":7},"lat":{"a":true,"fo":"double","h":"Lat","n":"lat","r":false,"sh":"new latitude value for the station","t":"`$NUMBER`","key$":"lat","index$":8},"lon":{"a":true,"fo":"double","h":"Lon","n":"lon","r":false,"sh":"new longitude value for the station","t":"`$NUMBER`","key$":"lon","index$":9},"message":{"a":true,"h":"Message","n":"message","r":false,"t":"`$STRING`","key$":"message","index$":10},"newLat":{"a":true,"fo":"double","h":"New Lat","n":"newLat","r":false,"t":"`$NUMBER`","key$":"newLat","index$":11},"newLon":{"a":true,"fo":"double","h":"New Lon","n":"newLon","r":false,"t":"`$NUMBER`","key$":"newLon","index$":12},"newTitle":{"a":true,"h":"New Title","n":"newTitle","r":false,"t":"`$STRING`","key$":"newTitle","index$":13},"photoId":{"a":true,"fo":"int64","h":"Photo Id","n":"photoId","r":false,"sh":"Unique id of a photo, can be used for WRONG_PHOTO and PHOTO_OUTDATED type.","t":"`$INTEGER`","key$":"photoId","index$":14},"problemReportType":{"a":true,"h":"Problem Report Type","n":"problemReportType","r":false,"sh":"types of problem reports","t":"`$STRING`","key$":"problemReportType","index$":15},"rejectedReason":{"a":true,"h":"Rejected Reason","n":"rejectedReason","r":false,"t":"`$STRING`","key$":"rejectedReason","index$":16},"state":{"a":true,"h":"State","n":"state","r":true,"t":"`$STRING`","key$":"state","index$":17},"stationId":{"a":true,"h":"Station Id","n":"stationId","op":{"list":{"req":false,"type":"`$STRING`"}},"r":true,"t":"`$STRING`","key$":"stationId","index$":18},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"a new title for the station","t":"`$STRING`","key$":"title","index$":19},"type":{"a":true,"h":"Type","n":"type","r":true,"sh":"types of problem reports","t":"`$STRING`","key$":"type","index$":20}},"id":{"field":"id","name":"id"},"name":"inbox","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["inbox_state_queries"],"co":{"id":"POST /userInbox","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/userInbox","q":{"exist":["authorization","inbox_state_queries"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"userInbox"}],"t":{"req":"`reqdata.inbox_state_queries`","res":"`body`"},"index$":0},{"a":true,"bf":["comment","countryCode","lat","lon","photoId","stationId","title","type"],"co":{"id":"POST /reportProblem","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/reportProblem","q":{"exist":["authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"reportProblem"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /userInbox","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"Authorization","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"show_completed_entry","or":"showCompletedEntries","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/userInbox","q":{"exist":["authorization"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"userInbox"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /userInbox/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"DELETE","o":"/userInbox/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"userInbox"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[]},"key$":"inbox","name__orig":"inbox","Name":"Inbox","name_":"inbox","name-":"inbox","NAME":"INBOX","index$":3}, {"active":true,"entity":"inbox","key$":"BasicInboxFlow","kind":"basic","name":"BasicInboxFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"inbox_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"inbox_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"inbox_ref01","suffix":"_rm0"},"m":{"id":"inbox01"},"o":"remove","s":[],"v":[],"index$":2},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"inbox_ref01"}}],"index$":3}]}, 'Inbox', {"POST /userInbox":{"protocol":"http","requestBody":{"description":"Inbox state query request","content":{"application/json":{"schema":{"type":"array","items":{"description":"Contains an inbox entry ID to query its state","type":"object","properties":{"id":{"type":"integer","format":"int64"}},"required":["id"],"x-ref":"#/components/schemas/InboxStateQueryRequest"},"index$":1}}},"required":true},"parameters":[{"name":"Authorization","in":"header","description":"JWT authorization\n","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Authorization","index$":0}]},"POST /reportProblem":{"protocol":"http","requestBody":{"description":"The problem report","content":{"*/*":{"schema":{"description":"Represents a report of a problem with a station","type":"object","properties":{"countryCode":{"description":"a two character country code","type":"string","maxLength":2,"minLength":2,"x-ref":"#/components/schemas/CountryCode","key$":"countryCode"},"stationId":{"type":"string","key$":"stationId"},"title":{"type":"string","description":"a new title for the station","key$":"title"},"photoId":{"type":"integer","format":"int64","description":"Unique id of a photo, can be used for WRONG_PHOTO and PHOTO_OUTDATED type.","key$":"photoId"},"comment":{"type":"string","key$":"comment"},"type":{"description":"types of problem reports","type":"string","enum":["WRONG_LOCATION","STATION_INACTIVE","STATION_ACTIVE","STATION_NONEXISTENT","WRONG_NAME","WRONG_PHOTO","PHOTO_OUTDATED","OTHER","DUPLICATE"],"x-ref":"#/components/schemas/ProblemReportType","key$":"type"},"lat":{"type":"number","format":"double","description":"new latitude value for the station","key$":"lat"},"lon":{"type":"number","format":"double","description":"new longitude value for the station","key$":"lon"}},"required":["countryCode","stationId","comment","type"],"x-ref":"#/components/schemas/ProblemReport","index$":1}}},"required":true},"parameters":[{"name":"Authorization","in":"header","description":"JWT authorization\n","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Authorization","index$":0}]},"GET /userInbox":{"protocol":"http","parameters":[{"name":"Authorization","in":"header","description":"JWT authorization\n","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Authorization","index$":0},{"name":"showCompletedEntries","in":"query","description":"show completed entries or only entries in state review","required":false,"schema":{"type":"boolean"},"index$":1}]},"DELETE /userInbox/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"id of the inbox entry","schema":{"type":"integer","format":"int64"},"index$":0}]}}, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? {"inbox.create.0":"GET-only live run: needs POST /userInbox","inbox.remove.2":"GET-only live run: needs DELETE /userInbox/{id}","inbox.list.3":"GET-only live run: checks a removal this run does not make"} : {})
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



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
