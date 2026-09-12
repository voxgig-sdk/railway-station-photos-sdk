import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { InboxStateQuery } from '../RailwayStationPhotosTypes';
declare class InboxStateQueryEntity extends RailwayStationPhotosEntityBase<InboxStateQuery> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: InboxStateQueryEntity): InboxStateQueryEntity;
}
export { InboxStateQueryEntity };
