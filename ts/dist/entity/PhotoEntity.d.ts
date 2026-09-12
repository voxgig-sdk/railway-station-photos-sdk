import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { Photo, PhotoLoadMatch } from '../RailwayStationPhotosTypes';
declare class PhotoEntity extends RailwayStationPhotosEntityBase<Photo> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: PhotoEntity): PhotoEntity;
    load(this: any, reqmatch?: PhotoLoadMatch, ctrl?: Control): Promise<PhotoEntity>;
}
export { PhotoEntity };
