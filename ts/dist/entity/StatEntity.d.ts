import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { Stat, StatLoadMatch } from '../RailwayStationPhotosTypes';
declare class StatEntity extends RailwayStationPhotosEntityBase<Stat> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: StatEntity): StatEntity;
    load(this: any, reqmatch?: StatLoadMatch, ctrl?: Control): Promise<StatEntity>;
}
export { StatEntity };
