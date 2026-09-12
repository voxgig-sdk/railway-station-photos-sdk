import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { PhotoDownload, PhotoDownloadLoadMatch } from '../RailwayStationPhotosTypes';
declare class PhotoDownloadEntity extends RailwayStationPhotosEntityBase<PhotoDownload> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: PhotoDownloadEntity): PhotoDownloadEntity;
    load(this: any, reqmatch?: PhotoDownloadLoadMatch, ctrl?: Control): Promise<PhotoDownloadEntity>;
}
export { PhotoDownloadEntity };
