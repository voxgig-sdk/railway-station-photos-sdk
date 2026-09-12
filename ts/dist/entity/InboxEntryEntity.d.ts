import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { InboxEntry, InboxEntryListMatch } from '../RailwayStationPhotosTypes';
declare class InboxEntryEntity extends RailwayStationPhotosEntityBase<InboxEntry> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: InboxEntryEntity): InboxEntryEntity;
    list(this: any, reqmatch?: InboxEntryListMatch, ctrl?: Control): Promise<InboxEntryEntity[]>;
}
export { InboxEntryEntity };
