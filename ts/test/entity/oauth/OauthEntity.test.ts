

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


describe('OauthEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RAILWAY_STATION_PHOTOS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RailwayStationPhotosSDK.test()
    const ent = testsdk.Oauth()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'oauth.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"oauth","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /oauth2/revoke","source":"openapi3","version":2},"g":{"header":[{"a":true,"k":"header","n":"authorization","or":"authorization","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/oauth2/revoke","q":{"exist":["authorization"]},"r":{},"s":[{"lit":"oauth2"},{"lit":"revoke"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /oauth2/authorize","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"client_id","or":"client_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"code_challenge","or":"code_challenge","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"code_challenge_method","or":"code_challenge_method","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"redirect_uri","or":"redirect_uri","r":true,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"response_type","or":"response_type","r":true,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"scope","or":"scope","r":true,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"state","or":"state","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/oauth2/authorize","q":{"exist":["client_id","code_challenge","code_challenge_method","redirect_uri","response_type","scope","state"]},"r":{},"s":[{"lit":"oauth2"},{"lit":"authorize"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"oauth","name__orig":"oauth","Name":"Oauth","name_":"oauth","name-":"oauth","NAME":"OAUTH","index$":6}, {"active":true,"entity":"oauth","key$":"BasicOauthFlow","kind":"basic","name":"BasicOauthFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"oauth_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"oauth_ref01","srcdatavar":"oauth_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-oauth_ref01"}}],"index$":1}]}, 'Oauth', {"POST /oauth2/revoke":{"protocol":"http","operationId":"postOAuth2Revoke","requestBody":{"required":true,"content":{"application/x-www-form-urlencoded":{"schema":{"description":"OAuth2 token revocation request","type":"object","properties":{"token":{"type":"string"},"token_type_hint":{"type":"string","enum":["access_token","refresh_token"]}},"required":["token"],"x-ref":"#/components/schemas/OAuthRevokeTokenRequest"}}}},"responses":{"200":{"description":"successfully revoked the token"},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[{"name":"Authorization","in":"header","description":"JWT authorization\n","required":true,"schema":{"type":"string"},"x-ref":"#/components/parameters/Authorization","index$":0}],"securitySource":"unspecified"},"GET /oauth2/authorize":{"protocol":"http","operationId":"getOAuth2Authorize","responses":{"302":{"description":"redirect to `redirect_uri` with `code` and `state` query parameter"},"default":{"description":"Unexpected error","content":{"application/json":{"schema":{"description":"General error message","type":"object","properties":{"timestamp":{"type":"integer","format":"int64"},"status":{"type":"integer","format":"int32"},"error":{"type":"string"},"message":{"type":"string"},"path":{"type":"string"}},"required":["status","message"],"x-ref":"#/components/schemas/GeneralErrorMessage"}}}}},"parameters":[{"name":"client_id","description":"ID of the OAuth client","in":"query","required":true,"schema":{"type":"string"},"index$":0},{"name":"scope","description":"OAuth scope","in":"query","required":true,"schema":{"type":"string","enum":["all"]},"index$":1},{"name":"response_type","description":"OAuth response type","in":"query","required":true,"schema":{"type":"string","enum":["code","token"]},"index$":2},{"name":"redirect_uri","description":"OAuth redirect URI","in":"query","required":true,"schema":{"type":"string","format":"uri"},"index$":3},{"name":"state","description":"OAuth state","in":"query","schema":{"type":"string"},"index$":4},{"name":"code_challenge","description":"BASE64URL-ENCODE(SHA256(ASCII(code_verifier)))","in":"query","schema":{"type":"string"},"index$":5},{"name":"code_challenge_method","description":"OAuth code challenge method","in":"query","schema":{"type":"string","enum":["S256"]},"index$":6}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const oauth_ref01_ent = client.Oauth()
    let oauth_ref01_data = setup.data.new.oauth['oauth_ref01']

    oauth_ref01_data = (await oauth_ref01_ent.create(oauth_ref01_data)).data()
    assert(null != oauth_ref01_data)


    // LOAD
    const oauth_ref01_match_dt0: any = {}
    const oauth_ref01_data_dt0 = (await oauth_ref01_ent.load(oauth_ref01_match_dt0)).data()
    assert(null != oauth_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/oauth/OauthTestData.json')

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
    ['oauth01','oauth02','oauth03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RAILWAY_STATION_PHOTOS_TEST_OAUTH_ENTID': idmap,
    'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
    'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RAILWAY_STATION_PHOTOS_TEST_OAUTH_ENTID']

  const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_OAUTH_ENTID']
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
  
