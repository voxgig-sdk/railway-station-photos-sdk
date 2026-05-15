
import { Context } from './Context'


class RailwayStationPhotosError extends Error {

  isRailwayStationPhotosError = true

  sdk = 'RailwayStationPhotos'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  RailwayStationPhotosError
}

