
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { RailwayStationPhotosSDK } from '../../..'

import {
  envOverride,
  liveDelay,
  maybeSkipControl,
  skipIfMissingIds,
} from '../../utility'


describe('PhotoStationDirect', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when RAILWAYSTATIONPHOTOS_TEST_LIVE=TRUE.
  afterEach(liveDelay('RAILWAYSTATIONPHOTOS_TEST_LIVE'))

  test('direct-exists', async () => {
    const sdk = new RailwayStationPhotosSDK({
      system: { fetch: async () => ({}) }
    })
    assert('function' === typeof sdk.direct)
    assert('function' === typeof sdk.prepare)
  })


  test('direct-load-photo_station', async (t: any) => {
    const setup = directSetup({ id: 'direct01' })
    if (maybeSkipControl(t, 'direct', 'direct-load-photo_station', setup.live)) return
    if (skipIfMissingIds(t, setup, ["country01"])) return
    const { client, calls } = setup

    const params: any = {}
    const query: any = {}
    if (setup.live) {
      const listResult: any = await client.direct({
        path: 'photoStationById/{country}/{id}',
        method: 'GET',
        params: {
        country: setup.idmap['country01'],
        id: setup.idmap['photo_station01'],
        },
      })
      if (!listResult.ok) {
        return // skip: list call failed (likely synthetic IDs against live API)
      }
      const listArr = unwrapListData(listResult.data)
      if (null == listArr || listArr.length === 0) {
        return // skip: no entities to load in live mode
      }
      const candidateId = listArr[0]?.country ?? listArr[0]?.id
      if (null == candidateId) {
        return // skip: list response shape does not expose load identifier
      }
      params.country = candidateId
      params.country = setup.idmap['country01']
    } else {
      params.country = 'direct01'
    }

    const result: any = await client.direct({
      path: 'photoStationsByCountry/{country}',
      method: 'GET',
      params,
      query,
    })

    if (setup.live) {
      // Live mode is lenient: synthetic IDs frequently 4xx. Skip rather
      // than fail when the load endpoint isn't reachable with the IDs we
      // can construct from setup.idmap.
      if (!result.ok || result.status < 200 || result.status >= 300) {
        return
      }
    } else {
      assert(result.ok === true)
      assert(result.status === 200)
      assert(null != result.data)
      assert(result.data.id === 'direct01')
      assert(calls.length === 1)
      assert(calls[0].init.method === 'GET')
      assert(calls[0].url.includes('direct01'))
    }
  })

  test('direct-list-photo_station', async (t: any) => {
    const setup = directSetup([{ id: 'direct01' }, { id: 'direct02' }])
    if (maybeSkipControl(t, 'direct', 'direct-list-photo_station', setup.live)) return
    if (skipIfMissingIds(t, setup, ["country01","photo_station01"])) return
    const { client, calls } = setup

    const params: any = {}
    const query: any = {}
    if (setup.live) {
      params.country = setup.idmap['country01']
      params.id = setup.idmap['photo_station01']
    } else {
      params.country = 'direct01'
      params.id = 'direct02'
    }

    const result: any = await client.direct({
      path: 'photoStationById/{country}/{id}',
      method: 'GET',
      params,
      query,
    })

    if (setup.live) {
      // Live mode is lenient: synthetic IDs frequently 4xx and the list-
      // response shape varies wildly across public APIs. Skip rather than
      // fail when the call doesn't return a usable list.
      if (!result.ok || result.status < 200 || result.status >= 300) {
        return
      }
      const listArr = unwrapListData(result.data)
      if (!Array.isArray(listArr)) {
        return
      }
    } else {
      assert(result.ok === true)
      assert(result.status === 200)
      assert(null != result.data)
      const listArr = unwrapListData(result.data)
      assert(Array.isArray(listArr))
      assert(listArr!.length === 2)
      assert(calls.length === 1)
      assert(calls[0].init.method === 'GET')
      assert(calls[0].url.includes('direct01'))
      assert(calls[0].url.includes('direct02'))
    }
  })

})



function directSetup(mockres?: any) {
  const calls: any[] = []

  const env = envOverride({
    'RAILWAYSTATIONPHOTOS_TEST_PHOTO_STATION_ENTID': {},
    'RAILWAYSTATIONPHOTOS_TEST_LIVE': 'FALSE',
    'RAILWAYSTATIONPHOTOS_APIKEY': 'NONE',
  })

  const live = 'TRUE' === env.RAILWAYSTATIONPHOTOS_TEST_LIVE

  if (live) {
    const client = new RailwayStationPhotosSDK({
      apikey: env.RAILWAYSTATIONPHOTOS_APIKEY,
    })

    let idmap: any = env['RAILWAYSTATIONPHOTOS_TEST_PHOTO_STATION_ENTID']
    if ('string' === typeof idmap && idmap.startsWith('{')) {
      idmap = JSON.parse(idmap)
    }

    return { client, calls, live, idmap }
  }

  const mockFetch = async (url: string, init: any) => {
    calls.push({ url, init })
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      json: async () => (null != mockres ? mockres : { id: 'direct01' }),
    }
  }

  const client = new RailwayStationPhotosSDK({
    base: 'http://localhost:8080',
    system: { fetch: mockFetch },
  })

  return { client, calls, live, idmap: {} as any }
}

// direct() returns the raw response body. List endpoints often wrap the
// array in an envelope (e.g. { data: [...] }, { entities: [...] },
// { pagination, data: [...] }). The test transforms the raw body to
// extract the first array — either the body itself or the first array
// property of an envelope object.
function unwrapListData(data: any): any[] | null {
  if (Array.isArray(data)) return data
  if (data && 'object' === typeof data) {
    for (const v of Object.values(data)) {
      if (Array.isArray(v)) return v as any[]
    }
  }
  return null
}
  
