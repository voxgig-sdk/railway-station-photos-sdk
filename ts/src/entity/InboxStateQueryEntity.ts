
import { inspect } from 'node:util'

import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase'

import type {
  RailwayStationPhotosSDK,
} from '../RailwayStationPhotosSDK'


import type {
  Operation,
  Context,
  Control,
} from '../types'


// TODO: needs Entity superclass
class InboxStateQueryEntity extends RailwayStationPhotosEntityBase {

  constructor(client: RailwayStationPhotosSDK, entopts: any) {
    super(client, entopts)
    this.name = 'inbox_state_query'
    this.name_ = 'inbox_state_query'
    this.Name = 'InboxStateQuery'
  }


  make(this: InboxStateQueryEntity) {
    return new InboxStateQueryEntity(this._client, this.entopts())
  }







}


export {
  InboxStateQueryEntity
}
