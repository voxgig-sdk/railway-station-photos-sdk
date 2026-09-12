import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { Inbox, InboxListMatch, InboxCreateData, InboxRemoveMatch } from '../RailwayStationPhotosTypes';
declare class InboxEntity extends RailwayStationPhotosEntityBase<Inbox> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: InboxEntity): InboxEntity;
    list(this: any, reqmatch?: InboxListMatch, ctrl?: Control): Promise<InboxEntity[]>;
    create(this: any, reqdata?: InboxCreateData, ctrl?: Control): Promise<InboxEntity>;
    remove(this: any, reqmatch?: InboxRemoveMatch, ctrl?: Control): Promise<InboxEntity>;
}
export { InboxEntity };
