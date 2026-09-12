import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { PhotoUpload, PhotoUploadCreateData } from '../RailwayStationPhotosTypes';
declare class PhotoUploadEntity extends RailwayStationPhotosEntityBase<PhotoUpload> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: PhotoUploadEntity): PhotoUploadEntity;
    create(this: any, reqdata?: PhotoUploadCreateData, ctrl?: Control): Promise<PhotoUploadEntity>;
}
export { PhotoUploadEntity };
