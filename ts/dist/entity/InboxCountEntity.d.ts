import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { InboxCount, InboxCountLoadMatch } from '../RailwayStationPhotosTypes';
declare class InboxCountEntity extends RailwayStationPhotosEntityBase<InboxCount> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: InboxCountEntity): InboxCountEntity;
    load(this: any, reqmatch?: InboxCountLoadMatch, ctrl?: Control): Promise<InboxCountEntity>;
}
export { InboxCountEntity };
