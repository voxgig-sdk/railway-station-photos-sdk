import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { PhotoStationById, PhotoStationByIdLoadMatch } from '../RailwayStationPhotosTypes';
declare class PhotoStationByIdEntity extends RailwayStationPhotosEntityBase<PhotoStationById> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: PhotoStationByIdEntity): PhotoStationByIdEntity;
    load(this: any, reqmatch?: PhotoStationByIdLoadMatch, ctrl?: Control): Promise<PhotoStationByIdEntity>;
}
export { PhotoStationByIdEntity };
