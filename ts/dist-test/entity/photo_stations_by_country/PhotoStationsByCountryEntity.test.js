"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PhotoStationsByCountryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('RAILWAY_STATION_PHOTOS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.RailwayStationPhotosSDK.test();
        const ent = testsdk.PhotoStationsByCountry();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'photo_stations_by_country.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "licenses": { "a": true, "h": "Licenses", "n": "licenses", "r": true, "sh": "List of used licenses, might be empty if no photos available", "t": "`$ARRAY`", "key$": "licenses", "index$": 1 }, "photoBaseUrl": { "a": true, "h": "Photo Base Url", "n": "photoBaseUrl", "r": true, "sh": "Base URL of all photos", "t": "`$STRING`", "key$": "photoBaseUrl", "index$": 2 }, "photographers": { "a": true, "h": "Photographers", "n": "photographers", "r": true, "sh": "List of all photographers, might be empty if no photos available", "t": "`$ARRAY`", "key$": "photographers", "index$": 3 }, "stations": { "a": true, "h": "Stations", "n": "stations", "r": true, "sh": "List of the stations", "t": "`$ARRAY`", "key$": "stations", "index$": 4 } }, "id": { "field": "id", "name": "id" }, "name": "photo_stations_by_country", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /photoStationsByCountry/{country}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "country", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "has_photo", "or": "has_photo", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "k": "query", "n": "is_active", "or": "is_active", "r": false, "t": "`$BOOLEAN`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/photoStationsByCountry/{country}", "q": { "exist": ["has_photo", "id", "is_active"] }, "r": { "param": { "country": "id" } }, "s": [{ "lit": "photoStationsByCountry" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "photo_stations_by_country", "name__orig": "photo_stations_by_country", "Name": "PhotoStationsByCountry", "name_": "photo_stations_by_country", "name-": "photo-stations-by-country", "NAME": "PHOTO_STATIONS_BY_COUNTRY", "index$": 10 }, { "active": true, "entity": "photo_stations_by_country", "key$": "BasicPhotoStationsByCountryFlow", "kind": "basic", "name": "BasicPhotoStationsByCountryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "photo_stations_by_country_ref01", "srcdatavar": "photo_stations_by_country_ref01_data", "suffix": "_dt0" }, "m": { "id": "photo_stations_by_country01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-photo_stations_by_country_ref01" } }], "index$": 0 }] }, 'PhotoStationsByCountry', { "GET /photoStationsByCountry/{country}": { "protocol": "http", "operationId": "getPhotoStationByCountry", "responses": { "200": { "description": "successful operation", "content": { "application/json": { "schema": { "description": "Stations with photos", "type": "object", "properties": { "photoBaseUrl": { "description": "Base URL of all photos", "example": "https://api.railway-stations.org/photos/", "key$": "photoBaseUrl", "type": "string" }, "licenses": { "description": "List of used licenses, might be empty if no photos available", "items": { "description": "License used by a photo", "properties": { "id": { "description": "Unique id of the license", "example": "CC0", "type": "string" }, "name": { "description": "Name of the license to display at the photo", "example": "CC0 1.0 Universell (CC0 1.0)", "type": "string" }, "url": { "description": "URL of the license to link to from the photo", "example": "https://creativecommons.org/publicdomain/zero/1.0/", "format": "uri", "type": "string" } }, "required": ["id", "name", "url"], "type": "object", "x-ref": "#/components/schemas/PhotoLicense" }, "key$": "licenses", "type": "array" }, "photographers": { "description": "List of all photographers, might be empty if no photos available", "items": { "description": "The creator of a photo", "properties": { "name": { "description": "Username of the photographer", "type": "string" }, "url": { "description": "Link to the photographers social media account or homepage", "format": "uri", "type": "string" } }, "required": ["name"], "type": "object", "x-ref": "#/components/schemas/Photographer" }, "key$": "photographers", "type": "array" }, "stations": { "description": "List of the stations", "items": { "description": "A station with its photos", "properties": { "country": { "description": "a two character country code", "maxLength": 2, "minLength": 2, "type": "string", "x-ref": "#/components/schemas/CountryCode" }, "id": { "description": "Id of the station within the country", "example": "7054260", "type": "string" }, "inactive": { "default": false, "description": "Indicates if this station is inactive", "type": "boolean" }, "lat": { "description": "Latitude of the station", "format": "double", "type": "number" }, "lon": { "description": "Longitude of the station", "format": "double", "type": "number" }, "photos": { "description": "Photos of the station. If more than one photo is given, the first one is the primary photo. List might be empty or only the primary photo provided.", "items": { "description": "A photo of a station", "properties": { "createdAt": { "description": "Timestamp when the photo was created in the railway-stations\ndatabase (Epoche milliseconds since 1.1.1970)\n", "format": "int64", "type": "integer" }, "id": { "description": "Unique id of a photo", "format": "int64", "type": "integer" }, "license": { "description": "Id of the license used for this photo", "type": "string" }, "outdated": { "default": false, "description": "Indicates if this photo is outdated", "type": "boolean" }, "path": { "description": "URL path to the photo, to be used together with the photoBaseUrl", "type": "string" }, "photographer": { "description": "Name of the photographer", "type": "string" } }, "required": ["id", "photographer", "path", "createdAt", "license"], "type": "object", "x-ref": "#/components/schemas/Photo" }, "type": "array" }, "shortCode": { "description": "Provider specific short code of the station, e.g. RIL100 or DS100 for german stations", "type": "string" }, "title": { "description": "Title of the station", "example": "London Victoria", "type": "string" } }, "required": ["country", "id", "title", "lat", "lon", "photos"], "type": "object", "x-ref": "#/components/schemas/PhotoStation" }, "key$": "stations", "type": "array" } }, "required": ["photoBaseUrl", "licenses", "photographers", "stations"], "x-ref": "#/components/schemas/PhotoStations", "index$": 0 } } } }, "default": { "description": "Unexpected error", "content": { "application/json": { "schema": { "description": "General error message", "type": "object", "properties": { "timestamp": { "type": "integer", "format": "int64" }, "status": { "type": "integer", "format": "int32" }, "error": { "type": "string" }, "message": { "type": "string" }, "path": { "type": "string" } }, "required": ["status", "message"], "x-ref": "#/components/schemas/GeneralErrorMessage" } } } } }, "parameters": [{ "name": "country", "in": "path", "description": "country code", "required": true, "schema": { "description": "a two character country code", "type": "string", "maxLength": 2, "minLength": 2, "x-ref": "#/components/schemas/CountryCode" }, "index$": 0 }, { "name": "hasPhoto", "in": "query", "description": "filter by photo available/missing", "schema": { "type": "boolean" }, "index$": 1 }, { "name": "isActive", "in": "query", "description": "filter on active/inactive stations", "schema": { "type": "boolean" }, "index$": 2 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let photo_stations_by_country_ref01_data = Object.values(setup.data.existing.photo_stations_by_country)[0];
        // LOAD
        const photo_stations_by_country_ref01_ent = client.PhotoStationsByCountry();
        const photo_stations_by_country_ref01_match_dt0 = {};
        photo_stations_by_country_ref01_match_dt0.id = photo_stations_by_country_ref01_data.id;
        const photo_stations_by_country_ref01_data_dt0 = (await photo_stations_by_country_ref01_ent.load(photo_stations_by_country_ref01_match_dt0)).data();
        (0, node_assert_1.default)(photo_stations_by_country_ref01_data_dt0.id === photo_stations_by_country_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/photo_stations_by_country/PhotoStationsByCountryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.RailwayStationPhotosSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['photo_stations_by_country01', 'photo_stations_by_country02', 'photo_stations_by_country03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_COUNTRY_ENTID': idmap,
        'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
        'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_COUNTRY_ENTID'];
    const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_STATIONS_BY_COUNTRY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.RailwayStationPhotosSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PhotoStationsByCountryEntity.test.js.map