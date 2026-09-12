import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { PhotoStation, PhotoStationLoadMatch, PhotoStationListMatch } from '../RailwayStationPhotosTypes';
declare class PhotoStationEntity extends RailwayStationPhotosEntityBase<PhotoStation> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: PhotoStationEntity): PhotoStationEntity;
    load(this: any, reqmatch?: PhotoStationLoadMatch, ctrl?: Control): Promise<PhotoStationEntity>;
    list(this: any, reqmatch?: PhotoStationListMatch, ctrl?: Control): Promise<PhotoStationEntity[]>;
}
export { PhotoStationEntity };
