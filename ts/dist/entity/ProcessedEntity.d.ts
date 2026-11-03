import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { Processed, ProcessedLoadMatch } from '../RailwayStationPhotosTypes';
declare class ProcessedEntity extends RailwayStationPhotosEntityBase<Processed> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: ProcessedEntity): ProcessedEntity;
    load(this: any, reqmatch?: ProcessedLoadMatch, ctrl?: Control): Promise<ProcessedEntity>;
}
export { ProcessedEntity };
