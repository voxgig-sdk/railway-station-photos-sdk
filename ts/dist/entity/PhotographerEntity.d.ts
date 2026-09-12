import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { Photographer, PhotographerLoadMatch } from '../RailwayStationPhotosTypes';
declare class PhotographerEntity extends RailwayStationPhotosEntityBase<Photographer> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: PhotographerEntity): PhotographerEntity;
    load(this: any, reqmatch?: PhotographerLoadMatch, ctrl?: Control): Promise<PhotographerEntity>;
}
export { PhotographerEntity };
