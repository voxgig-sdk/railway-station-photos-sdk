import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { Done, DoneLoadMatch } from '../RailwayStationPhotosTypes';
declare class DoneEntity extends RailwayStationPhotosEntityBase<Done> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: DoneEntity): DoneEntity;
    load(this: any, reqmatch?: DoneLoadMatch, ctrl?: Control): Promise<DoneEntity>;
}
export { DoneEntity };
