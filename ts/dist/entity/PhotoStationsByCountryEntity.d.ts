import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { PhotoStationsByCountry, PhotoStationsByCountryLoadMatch } from '../RailwayStationPhotosTypes';
declare class PhotoStationsByCountryEntity extends RailwayStationPhotosEntityBase<PhotoStationsByCountry> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: PhotoStationsByCountryEntity): PhotoStationsByCountryEntity;
    load(this: any, reqmatch?: PhotoStationsByCountryLoadMatch, ctrl?: Control): Promise<PhotoStationsByCountryEntity>;
}
export { PhotoStationsByCountryEntity };
