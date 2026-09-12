import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { AdminInbox, AdminInboxCreateData } from '../RailwayStationPhotosTypes';
declare class AdminInboxEntity extends RailwayStationPhotosEntityBase<AdminInbox> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: AdminInboxEntity): AdminInboxEntity;
    create(this: any, reqdata?: AdminInboxCreateData, ctrl?: Control): Promise<AdminInboxEntity>;
}
export { AdminInboxEntity };
