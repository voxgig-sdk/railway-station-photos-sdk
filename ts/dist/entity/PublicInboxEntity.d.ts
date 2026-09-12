import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { PublicInbox, PublicInboxListMatch } from '../RailwayStationPhotosTypes';
declare class PublicInboxEntity extends RailwayStationPhotosEntityBase<PublicInbox> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: PublicInboxEntity): PublicInboxEntity;
    list(this: any, reqmatch?: PublicInboxListMatch, ctrl?: Control): Promise<PublicInboxEntity[]>;
}
export { PublicInboxEntity };
