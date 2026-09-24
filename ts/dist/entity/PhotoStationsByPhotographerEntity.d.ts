import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { PhotoStationsByPhotographer, PhotoStationsByPhotographerLoadMatch } from '../RailwayStationPhotosTypes';
declare class PhotoStationsByPhotographerEntity extends RailwayStationPhotosEntityBase<PhotoStationsByPhotographer> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: PhotoStationsByPhotographerEntity): PhotoStationsByPhotographerEntity;
    load(this: any, reqmatch?: PhotoStationsByPhotographerLoadMatch, ctrl?: Control): Promise<PhotoStationsByPhotographerEntity>;
}
export { PhotoStationsByPhotographerEntity };
