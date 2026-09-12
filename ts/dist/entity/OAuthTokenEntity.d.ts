import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { OAuthToken, OAuthTokenCreateData } from '../RailwayStationPhotosTypes';
declare class OAuthTokenEntity extends RailwayStationPhotosEntityBase<OAuthToken> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: OAuthTokenEntity): OAuthTokenEntity;
    create(this: any, reqdata?: OAuthTokenCreateData, ctrl?: Control): Promise<OAuthTokenEntity>;
}
export { OAuthTokenEntity };
