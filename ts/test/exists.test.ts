
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { RailwayStationPhotosSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await RailwayStationPhotosSDK.test()
    equal(null !== testsdk, true)
  })

})
