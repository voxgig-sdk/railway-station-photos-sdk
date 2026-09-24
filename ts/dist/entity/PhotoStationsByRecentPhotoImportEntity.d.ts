import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { PhotoStationsByRecentPhotoImport, PhotoStationsByRecentPhotoImportListMatch } from '../RailwayStationPhotosTypes';
declare class PhotoStationsByRecentPhotoImportEntity extends RailwayStationPhotosEntityBase<PhotoStationsByRecentPhotoImport> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: PhotoStationsByRecentPhotoImportEntity): PhotoStationsByRecentPhotoImportEntity;
    list(this: any, reqmatch?: PhotoStationsByRecentPhotoImportListMatch, ctrl?: Control): Promise<PhotoStationsByRecentPhotoImportEntity[]>;
}
export { PhotoStationsByRecentPhotoImportEntity };
