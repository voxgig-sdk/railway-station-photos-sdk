

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


describe('OAuthTokenEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RAILWAY_STATION_PHOTOS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RailwayStationPhotosSDK.test()
    const ent = testsdk.OAuthToken()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'o_auth_token.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"access_token","req":true,"type":"`$STRING`","index$":0},{"active":true,"format":"int64","name":"expires_in","req":false,"type":"`$INTEGER`","index$":1},{"active":true,"name":"refresh_token","req":false,"type":"`$STRING`","index$":2},{"active":true,"name":"scope","req":true,"type":"`$STRING`","index$":3},{"active":true,"name":"token_type","req":true,"type":"`$STRING`","index$":4}],"name":"o_auth_token","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"header":[{"active":true,"kind":"header","name":"authorization","orig":"authorization","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"POST /oauth2/token","json":"{\"operationId\":\"postOAuth2Token\",\"parameters\":[{\"description\":\"JWT authorization\\n\",\"in\":\"header\",\"name\":\"Authorization\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"description\":\"OAuth2 token request\",\"properties\":{\"client_id\":{\"type\":\"string\"},\"code\":{\"type\":\"string\"},\"code_verifier\":{\"type\":\"string\"},\"grant_type\":{\"enum\":[\"authorization_code\",\"refresh_token\"],\"type\":\"string\"},\"redirect_uri\":{\"format\":\"uri\",\"type\":\"string\"},\"refresh_token\":{\"type\":\"string\"}},\"required\":[\"grant_type\",\"client_id\",\"redirect_uri\"],\"type\":\"object\"}}},\"description\":\"OAuth token request body\",\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"OAuth2 token response\",\"properties\":{\"access_token\":{\"type\":\"string\"},\"expires_in\":{\"format\":\"int64\",\"type\":\"integer\"},\"refresh_token\":{\"type\":\"string\"},\"scope\":{\"type\":\"string\"},\"token_type\":{\"enum\":[\"Bearer\"],\"type\":\"string\"}},\"required\":[\"access_token\",\"scope\",\"token_type\"],\"type\":\"object\"}}},\"description\":\"successful token request\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/oauth2/token","segments":[{"lit":"oauth2"},{"lit":"token"}],"select":{"exist":["authorization"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"o_auth_token","name__orig":"o_auth_token","Name":"OAuthToken","name_":"o_auth_token","name-":"o-auth-token","NAME":"O_AUTH_TOKEN","index$":6}, {"active":true,"entity":"o_auth_token","key$":"BasicOAuthTokenFlow","kind":"basic","name":"BasicOAuthTokenFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"o_auth_token_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'OAuthToken')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const o_auth_token_ref01_ent = client.OAuthToken()
    let o_auth_token_ref01_data = setup.data.new.o_auth_token['o_auth_token_ref01']

    o_auth_token_ref01_data = (await o_auth_token_ref01_ent.create(o_auth_token_ref01_data)).data()
    assert(null != o_auth_token_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/o_auth_token/OAuthTokenTestData.json')

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
    ['o_auth_token01','o_auth_token02','o_auth_token03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'RAILWAY_STATION_PHOTOS_TEST_O_AUTH_TOKEN_ENTID': idmap,
    'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
    'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['RAILWAY_STATION_PHOTOS_TEST_O_AUTH_TOKEN_ENTID']

  const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_O_AUTH_TOKEN_ENTID']
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
  
