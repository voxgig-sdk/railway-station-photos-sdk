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
(0, node_test_1.describe)('CountryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('RAILWAY_STATION_PHOTOS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.RailwayStationPhotosSDK.test();
        const ent = testsdk.Country();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'country.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "active": { "a": true, "h": "Active", "n": "active", "r": true, "sh": "Is this an active country where we collect photos?", "t": "`$BOOLEAN`", "key$": "active", "index$": 0 }, "allowPhotoUploads": { "a": true, "h": "Allow Photo Uploads", "n": "allowPhotoUploads", "r": true, "sh": "Are photo uploads allowed?", "t": "`$BOOLEAN`", "key$": "allowPhotoUploads", "index$": 1 }, "code": { "a": true, "h": "Code", "n": "code", "r": true, "sh": "a two character country code", "t": "`$STRING`", "key$": "code", "index$": 2 }, "email": { "a": true, "h": "Email", "n": "email", "r": false, "sh": "Contact email address", "t": "`$STRING`", "key$": "email", "index$": 3 }, "message": { "a": true, "h": "Message", "n": "message", "r": false, "sh": "Informational message about this country", "t": "`$STRING`", "key$": "message", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "Name of the country", "t": "`$STRING`", "key$": "name", "index$": 5 }, "overrideLicense": { "a": true, "h": "Override License", "n": "overrideLicense", "r": false, "sh": "if a country needs a special license", "t": "`$STRING`", "key$": "overrideLicense", "index$": 6 }, "providerApps": { "a": true, "h": "Provider Apps", "n": "providerApps", "r": false, "sh": "array with links to provider apps", "t": "`$ARRAY`", "key$": "providerApps", "index$": 7 }, "timetableUrlTemplate": { "a": true, "h": "Timetable Url Template", "n": "timetableUrlTemplate", "r": false, "sh": "URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced", "t": "`$STRING`", "key$": "timetableUrlTemplate", "index$": 8 } }, "name": "country", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /countries", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "only_active", "or": "only_active", "r": false, "t": "`$BOOLEAN`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/countries", "q": { "exist": ["only_active"] }, "r": {}, "s": [{ "lit": "countries" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "country", "name__orig": "country", "Name": "Country", "name_": "country", "name-": "country", "NAME": "COUNTRY", "index$": 1 }, { "active": true, "entity": "country", "key$": "BasicCountryFlow", "kind": "basic", "name": "BasicCountryFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "country_ref01" } }], "index$": 0 }] }, 'Country', { "GET /countries": { "protocol": "http", "operationId": "getCountries", "responses": { "200": { "description": "successful operation", "content": { "application/json": { "schema": { "type": "array", "items": { "description": "Supported Country with its configuration", "type": "object", "properties": { "code": { "description": "a two character country code", "type": "string", "maxLength": 2, "minLength": 2, "x-ref": "#/components/schemas/CountryCode", "key$": "code" }, "name": { "type": "string", "description": "Name of the country", "key$": "name" }, "email": { "type": "string", "description": "Contact email address", "key$": "email" }, "timetableUrlTemplate": { "type": "string", "description": "URL template for the timetable, contains {title}, {id} and\n{DS100} placeholders which need to be replaced\n", "key$": "timetableUrlTemplate" }, "overrideLicense": { "type": "string", "description": "if a country needs a special license", "key$": "overrideLicense" }, "active": { "type": "boolean", "description": "Is this an active country where we collect photos?", "key$": "active" }, "allowPhotoUploads": { "type": "boolean", "description": "Are photo uploads allowed?", "key$": "allowPhotoUploads" }, "message": { "type": "string", "description": "Informational message about this country", "key$": "message" }, "providerApps": { "type": "array", "description": "array with links to provider apps", "items": { "description": "Provider App information", "type": "object", "properties": { "type": { "type": "string", "enum": ["android", "ios", "web"] }, "name": { "type": "string" }, "url": { "type": "string" } }, "required": ["type", "name", "url"], "x-ref": "#/components/schemas/ProviderApp" }, "key$": "providerApps" } }, "required": ["code", "name", "active", "allowPhotoUploads"], "x-ref": "#/components/schemas/Country", "index$": 0 } } } } }, "default": { "description": "Unexpected error", "content": { "application/json": { "schema": { "description": "General error message", "type": "object", "properties": { "timestamp": { "type": "integer", "format": "int64" }, "status": { "type": "integer", "format": "int32" }, "error": { "type": "string" }, "message": { "type": "string" }, "path": { "type": "string" } }, "required": ["status", "message"], "x-ref": "#/components/schemas/GeneralErrorMessage" } } } } }, "parameters": [{ "name": "onlyActive", "in": "query", "description": "return only active countries? Defaults to true.", "schema": { "type": "boolean" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let country_ref01_data = Object.values(setup.data.existing.country)[0];
        // LIST
        const country_ref01_ent = client.Country();
        const country_ref01_match = {};
        const country_ref01_list = (await country_ref01_ent.list(country_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/country/CountryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.RailwayStationPhotosSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['country01', 'country02', 'country03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'RAILWAY_STATION_PHOTOS_TEST_COUNTRY_ENTID': idmap,
        'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
        'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['RAILWAY_STATION_PHOTOS_TEST_COUNTRY_ENTID'];
    const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_COUNTRY_ENTID'];
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
//# sourceMappingURL=CountryEntity.test.js.map