import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { Profile, ProfileLoadMatch, ProfileCreateData, ProfileRemoveMatch } from '../RailwayStationPhotosTypes';
declare class ProfileEntity extends RailwayStationPhotosEntityBase<Profile> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: ProfileEntity): ProfileEntity;
    load(this: any, reqmatch?: ProfileLoadMatch, ctrl?: Control): Promise<ProfileEntity>;
    create(this: any, reqdata?: ProfileCreateData, ctrl?: Control): Promise<ProfileEntity>;
    remove(this: any, reqmatch?: ProfileRemoveMatch, ctrl?: Control): Promise<ProfileEntity>;
}
export { ProfileEntity };
