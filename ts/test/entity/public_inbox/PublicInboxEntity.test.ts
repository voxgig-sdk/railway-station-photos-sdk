

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


describe('PublicInboxEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RAILWAY_STATION_PHOTOS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RailwayStationPhotosSDK.test()
    const ent = testsdk.PublicInbox()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'public_inbox.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"countryCode":{"a":true,"h":"Country Code","n":"countryCode","r":false,"sh":"a two character country code","t":"`$STRING`","key$":"countryCode","index$":0},"lat":{"a":true,"fo":"double","h":"Lat","n":"lat","r":true,"t":"`$NUMBER`","key$":"lat","index$":1},"lon":{"a":true,"fo":"double","h":"Lon","n":"lon","r":true,"t":"`$NUMBER`","key$":"lon","index$":2},"stationId":{"a":true,"h":"Station Id","n":"stationId","r":false,"t":"`$STRING`","key$":"stationId","index$":3},"title":{"a":true,"h":"Title","n":"title","r":true,"t":"`$STRING`","key$":"title","index$":4}},"name":"public_inbox","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /publicInbox","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/publicInbox","q":{},"r":{},"s":[{"lit":"publicInbox"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"public_inbox","name__orig":"public_inbox","Name":"PublicInbox","name_":"public_inbox","name-":"public-inbox","NAME":"PUBLIC_INBOX","index$":16}, {"active":true,"entity":"public_inbox","key$":"BasicPublicInboxFlow","kind":"basic","name":"BasicPublicInboxFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"public_inbox_ref01"}}],"index$":0}]}, 'PublicInbox', {"GET /publicInbox":{"protocol":"http","operationId":"getPublicInbox","responses":{"200":{"description":"array of public inbox objects","content":{"application/json":{"schema":{"type":"array","items":{"description":"Represents an uploaded photo under review","type":"object","properties":{"countryCode":{"description":"a two character country code","type":"string","maxLength":2,"minLength":2,"x-ref":"#/components/schemas/CountryCode","key$":"countryCode"},"stationId":{"type":"string","key$":"stationId"},"title":{"type":"string","key$":"title"},"lat":{"type":"number","format":"double","key$":"lat"},"lon":{"type":"number","format":"double","key$":"lon"}},"required":["title","lat","lon"],"x-ref":"#/components/schemas/PublicInboxEntry","index$":0}}}}},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let public_inbox_ref01_data = Object.values(setup.data.existing.public_inbox)[0] as any

    // LIST
    const public_inbox_ref01_ent = client.PublicInbox()
    const public_inbox_ref01_match: any = {}

    const public_inbox_ref01_list = (await public_inbox_ref01_ent.list(public_inbox_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/public_inbox/PublicInboxTestData.json')

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
    ['public_inbox01','public_inbox02','public_inbox03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RAILWAY_STATION_PHOTOS_TEST_PUBLIC_INBOX_ENTID': idmap,
    'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
    'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RAILWAY_STATION_PHOTOS_TEST_PUBLIC_INBOX_ENTID']

  const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_PUBLIC_INBOX_ENTID']
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
  
