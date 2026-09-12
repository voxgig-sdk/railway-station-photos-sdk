import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { Oauth, OauthLoadMatch, OauthCreateData } from '../RailwayStationPhotosTypes';
declare class OauthEntity extends RailwayStationPhotosEntityBase<Oauth> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: OauthEntity): OauthEntity;
    load(this: any, reqmatch?: OauthLoadMatch, ctrl?: Control): Promise<OauthEntity>;
    create(this: any, reqdata?: OauthCreateData, ctrl?: Control): Promise<OauthEntity>;
}
export { OauthEntity };
