

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


describe('StatEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RAILWAY_STATION_PHOTOS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RailwayStationPhotosSDK.test()
    const ent = testsdk.Stat()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'stat.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"countryCode":{"a":true,"h":"Country Code","n":"countryCode","r":false,"sh":"an optional two character country code","t":"`$STRING`","key$":"countryCode","index$":0},"photographers":{"a":true,"fo":"int64","h":"Photographers","n":"photographers","r":true,"t":"`$INTEGER`","key$":"photographers","index$":1},"total":{"a":true,"fo":"int64","h":"Total","n":"total","r":true,"t":"`$INTEGER`","key$":"total","index$":2},"withPhoto":{"a":true,"fo":"int64","h":"With Photo","n":"withPhoto","r":true,"t":"`$INTEGER`","key$":"withPhoto","index$":3},"withoutPhoto":{"a":true,"fo":"int64","h":"Without Photo","n":"withoutPhoto","r":true,"t":"`$INTEGER`","key$":"withoutPhoto","index$":4}},"name":"stat","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /stats","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"country","or":"country","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/stats","q":{"exist":["country"]},"r":{},"s":[{"lit":"stats"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"stat","name__orig":"stat","Name":"Stat","name_":"stat","name-":"stat","NAME":"STAT","index$":17}, {"active":true,"entity":"stat","key$":"BasicStatFlow","kind":"basic","name":"BasicStatFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"stat_ref01","srcdatavar":"stat_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-stat_ref01"}}],"index$":0}]}, 'Stat', {"GET /stats":{"protocol":"http","operationId":"getStats","responses":{"200":{"description":"successful operation","content":{"application/json":{"schema":{"description":"Statistic of number of stations with and without photos","type":"object","properties":{"total":{"format":"int64","key$":"total","type":"integer"},"withPhoto":{"format":"int64","key$":"withPhoto","type":"integer"},"withoutPhoto":{"format":"int64","key$":"withoutPhoto","type":"integer"},"photographers":{"format":"int64","key$":"photographers","type":"integer"},"countryCode":{"description":"an optional two character country code","key$":"countryCode","maxLength":2,"minLength":2,"nullable":true,"type":"string","x-ref":"#/components/schemas/CountryCodeOptional"}},"required":["total","withPhoto","withoutPhoto","photographers"],"x-ref":"#/components/schemas/Statistic","index$":0}}}},"404":{"description":"Country not found","content":{}},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[{"name":"country","in":"query","description":"filter by country code","schema":{"description":"a two character country code","type":"string","maxLength":2,"minLength":2,"x-ref":"#/components/schemas/CountryCode"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let stat_ref01_data = Object.values(setup.data.existing.stat)[0] as any

    // LOAD
    const stat_ref01_ent = client.Stat()
    const stat_ref01_match_dt0: any = {}
    const stat_ref01_data_dt0 = (await stat_ref01_ent.load(stat_ref01_match_dt0)).data()
    assert(null != stat_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/stat/StatTestData.json')

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
    ['stat01','stat02','stat03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RAILWAY_STATION_PHOTOS_TEST_STAT_ENTID': idmap,
    'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
    'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RAILWAY_STATION_PHOTOS_TEST_STAT_ENTID']

  const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_STAT_ENTID']
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
  
