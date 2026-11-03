import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { Rejected, RejectedLoadMatch } from '../RailwayStationPhotosTypes';
declare class RejectedEntity extends RailwayStationPhotosEntityBase<Rejected> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: RejectedEntity): RejectedEntity;
    load(this: any, reqmatch?: RejectedLoadMatch, ctrl?: Control): Promise<RejectedEntity>;
}
export { RejectedEntity };
