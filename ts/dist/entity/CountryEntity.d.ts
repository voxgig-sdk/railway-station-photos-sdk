import { RailwayStationPhotosEntityBase } from '../RailwayStationPhotosEntityBase';
import type { RailwayStationPhotosSDK } from '../RailwayStationPhotosSDK';
import type { Control } from '../types';
import type { Country, CountryListMatch } from '../RailwayStationPhotosTypes';
declare class CountryEntity extends RailwayStationPhotosEntityBase<Country> {
    constructor(client: RailwayStationPhotosSDK, entopts: any);
    make(this: CountryEntity): CountryEntity;
    list(this: any, reqmatch?: CountryListMatch, ctrl?: Control): Promise<CountryEntity[]>;
}
export { CountryEntity };
