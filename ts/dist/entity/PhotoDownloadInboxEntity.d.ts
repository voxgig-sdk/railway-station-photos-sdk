import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { PhotoDownloadInbox, PhotoDownloadInboxLoadMatch } from '../RailwayStationPhotosTypes';
declare class PhotoDownloadInboxEntity extends RailwayStationPhotosEntityBase<PhotoDownloadInbox> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: PhotoDownloadInboxEntity): PhotoDownloadInboxEntity;
    load(this: any, reqmatch?: PhotoDownloadInboxLoadMatch, ctrl?: Control): Promise<PhotoDownloadInboxEntity>;
}
export { PhotoDownloadInboxEntity };
