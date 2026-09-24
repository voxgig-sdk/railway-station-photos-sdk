
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { RailwayStationPhotosSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = RailwayStationPhotosSDK.test()
    equal(testsdk instanceof RailwayStationPhotosSDK, true,
      'RailwayStationPhotosSDK.test() must return a client synchronously')
  })

})
