

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


describe('CountryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RAILWAY_STATION_PHOTOS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RailwayStationPhotosSDK.test()
    const ent = testsdk.Country()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'country.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"active":{"a":true,"h":"Active","n":"active","r":true,"sh":"Is this an active country where we collect photos?","t":"`$BOOLEAN`","key$":"active","index$":0},"allowPhotoUploads":{"a":true,"h":"Allow Photo Uploads","n":"allowPhotoUploads","r":true,"sh":"Are photo uploads allowed?","t":"`$BOOLEAN`","key$":"allowPhotoUploads","index$":1},"code":{"a":true,"h":"Code","n":"code","r":true,"sh":"a two character country code","t":"`$STRING`","key$":"code","index$":2},"email":{"a":true,"h":"Email","n":"email","r":false,"sh":"Contact email address","t":"`$STRING`","key$":"email","index$":3},"message":{"a":true,"h":"Message","n":"message","r":false,"sh":"Informational message about this country","t":"`$STRING`","key$":"message","index$":4},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"Name of the country","t":"`$STRING`","key$":"name","index$":5},"overrideLicense":{"a":true,"h":"Override License","n":"overrideLicense","r":false,"sh":"if a country needs a special license","t":"`$STRING`","key$":"overrideLicense","index$":6},"providerApps":{"a":true,"h":"Provider Apps","n":"providerApps","r":false,"sh":"array with links to provider apps","t":"`$ARRAY`","key$":"providerApps","index$":7},"timetableUrlTemplate":{"a":true,"h":"Timetable Url Template","n":"timetableUrlTemplate","r":false,"sh":"URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced","t":"`$STRING`","key$":"timetableUrlTemplate","index$":8}},"name":"country","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /countries","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"only_active","or":"only_active","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/countries","q":{"exist":["only_active"]},"r":{},"s":[{"lit":"countries"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"country","name__orig":"country","Name":"Country","name_":"country","name-":"country","NAME":"COUNTRY","index$":1}, {"active":true,"entity":"country","key$":"BasicCountryFlow","kind":"basic","name":"BasicCountryFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"country_ref01"}}],"index$":0}]}, 'Country', {"GET /countries":{"protocol":"http","operationId":"getCountries","responses":{"200":{"description":"successful operation","content":{"application/json":{"schema":{"type":"array","items":{"description":"Supported Country with its configuration","type":"object","properties":{"code":{"description":"a two character country code","type":"string","maxLength":2,"minLength":2,"x-ref":"#/components/schemas/CountryCode","key$":"code"},"name":{"type":"string","description":"Name of the country","key$":"name"},"email":{"type":"string","description":"Contact email address","key$":"email"},"timetableUrlTemplate":{"type":"string","description":"URL template for the timetable, contains {title}, {id} and\n{DS100} placeholders which need to be replaced\n","key$":"timetableUrlTemplate"},"overrideLicense":{"type":"string","description":"if a country needs a special license","key$":"overrideLicense"},"active":{"type":"boolean","description":"Is this an active country where we collect photos?","key$":"active"},"allowPhotoUploads":{"type":"boolean","description":"Are photo uploads allowed?","key$":"allowPhotoUploads"},"message":{"type":"string","description":"Informational message about this country","key$":"message"},"providerApps":{"type":"array","description":"array with links to provider apps","items":{"description":"Provider App information","type":"object","properties":{"type":{"type":"string","enum":["android","ios","web"]},"name":{"type":"string"},"url":{"type":"string"}},"required":["type","name","url"],"x-ref":"#/components/schemas/ProviderApp"},"key$":"providerApps"}},"required":["code","name","active","allowPhotoUploads"],"x-ref":"#/components/schemas/Country","index$":0}}}}},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[{"name":"onlyActive","in":"query","description":"return only active countries? Defaults to true.","schema":{"type":"boolean"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let country_ref01_data = Object.values(setup.data.existing.country)[0] as any

    // LIST
    const country_ref01_ent = client.Country()
    const country_ref01_match: any = {}

    const country_ref01_list = (await country_ref01_ent.list(country_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/country/CountryTestData.json')

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
    ['country01','country02','country03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RAILWAY_STATION_PHOTOS_TEST_COUNTRY_ENTID': idmap,
    'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
    'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RAILWAY_STATION_PHOTOS_TEST_COUNTRY_ENTID']

  const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_COUNTRY_ENTID']
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
  
