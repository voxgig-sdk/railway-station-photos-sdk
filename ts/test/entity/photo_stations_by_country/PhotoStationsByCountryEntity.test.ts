

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


describe('PhotoStationsByCountryEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RAILWAY_STATION_PHOTOS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RailwayStationPhotosSDK.test()
    const ent = testsdk.PhotoStationsByCountry()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = RailwayStationPhotosSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PhotoStationsByCountry().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'photo_stations_by_country.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"licenses":{"a":true,"h":"Licenses","n":"licenses","r":true,"sh":"List of used licenses, might be empty if no photos available","t":"`$ARRAY`","key$":"licenses","index$":1},"photoBaseUrl":{"a":true,"h":"Photo Base Url","n":"photoBaseUrl","r":true,"sh":"Base URL of all photos","t":"`$STRING`","key$":"photoBaseUrl","index$":2},"photographers":{"a":true,"h":"Photographers","n":"photographers","r":true,"sh":"List of all photographers, might be empty if no photos available","t":"`$ARRAY`","key$":"photographers","index$":3},"stations":{"a":true,"h":"Stations","n":"stations","r":true,"sh":"List of the stations","t":"`$ARRAY`","key$":"stations","index$":4}},"id":{"field":"id","name":"id"},"name":"photo_stations_by_country","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /photoStationsByCountry/{country}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"country","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"has_photo","or":"hasPhoto","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"k":"query","n":"is_active","or":"isActive","r":false,"t":"`$BOOLEAN`","index$":1}]},"k":"http","m":"GET","o":"/photoStationsByCountry/{country}","q":{"exist":["id"]},"r":{"param":{"country":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"photoStationsByCountry"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"photo_stations_by_country","name__orig":"photo_stations_by_country","Name":"PhotoStationsByCountry","name_":"photo_stations_by_country","name-":"photo-stations-by-country","NAME":"PHOTO_STATIONS_BY_COUNTRY","index$":11}, {"active":true,"entity":"photo_stations_by_country","key$":"BasicPhotoStationsByCountryFlow","kind":"basic","name":"BasicPhotoStationsByCountryFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"photo_stations_by_country_ref01","srcdatavar":"photo_stations_by_country_ref01_data","suffix":"_dt0"},"m":{"id":"photo_stations_by_country01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-photo_stations_by_country_ref01"}}],"index$":0,"route":"GET /photoStationsByCountry/{country}","record":{}}]}, 'PhotoStationsByCountry', {"GET /photoStationsByCountry/{country}":{"protocol":"http","parameters":[{"name":"country","in":"path","description":"country code","required":true,"schema":{"description":"a two character country code","type":"string","maxLength":2,"minLength":2,"x-ref":"#/components/schemas/CountryCode"},"index$":0},{"name":"hasPhoto","in":"query","description":"filter by photo available/missing","schema":{"type":"boolean"},"index$":1},{"name":"isActive","in":"query","description":"filter on active/inactive stations","schema":{"type":"boolean"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let photo_stations_by_country_ref01_data = Object.values(setup.data.existing.photo_stations_by_country)[0] as any

    // LOAD
    const photo_stations_by_country_ref01_ent = client.PhotoStationsByCountry()
    const photo_stations_by_country_ref01_match_dt0: any = {}
    photo_stations_by_country_ref01_match_dt0.id = photo_stations_by_country_ref01_data.id
    const photo_stations_by_country_ref01_data_dt0 = (await photo_stations_by_country_ref01_ent.load(photo_stations_by_country_ref01_match_dt0)).data()
    assert(photo_stations_by_country_ref01_data_dt0.id === photo_stations_by_country_ref01_data.id)


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
      '../../../../.sdk/test/entity/photo_stations_by_country/PhotoStationsByCountryTestData.json')

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
    ['photo_stations_by_country01','photo_stations_by_country02','photo_stations_by_country03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_COUNTRY_ENTID': idmap,
    'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
    'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_COUNTRY_ENTID']

  const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_COUNTRY_ENTID']
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
  
