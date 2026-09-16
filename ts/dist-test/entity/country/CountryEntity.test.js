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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "active", "req": true, "short": "Is this an active country where we collect photos?", "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "name": "allowPhotoUploads", "req": true, "short": "Are photo uploads allowed?", "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "name": "code", "req": true, "short": "a two character country code", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "email", "req": false, "short": "Contact email address", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "message", "req": false, "short": "Informational message about this country", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "name", "req": true, "short": "Name of the country", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "overrideLicense", "req": false, "short": "if a country needs a special license", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "providerApps", "req": false, "short": "array with links to provider apps", "type": "`$ARRAY`", "index$": 7 }, { "active": true, "name": "timetableUrlTemplate", "req": false, "short": "URL template for the timetable, contains {title}, {id} and {DS100} placeholders which need to be replaced", "type": "`$STRING`", "index$": 8 }], "name": "country", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "only_active", "orig": "only_active", "reqd": false, "type": "`$BOOLEAN`", "index$": 0 }] }, "contract": { "id": "GET /countries", "json": "{\"operationId\":\"getCountries\",\"parameters\":[{\"description\":\"return only active countries? Defaults to true.\",\"in\":\"query\",\"name\":\"onlyActive\",\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"Supported Country with its configuration\",\"properties\":{\"active\":{\"description\":\"Is this an active country where we collect photos?\",\"type\":\"boolean\"},\"allowPhotoUploads\":{\"description\":\"Are photo uploads allowed?\",\"type\":\"boolean\"},\"code\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"},\"email\":{\"description\":\"Contact email address\",\"type\":\"string\"},\"message\":{\"description\":\"Informational message about this country\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the country\",\"type\":\"string\"},\"overrideLicense\":{\"description\":\"if a country needs a special license\",\"type\":\"string\"},\"providerApps\":{\"description\":\"array with links to provider apps\",\"items\":{\"description\":\"Provider App information\",\"properties\":{\"name\":{\"type\":\"string\"},\"type\":{\"enum\":[\"android\",\"ios\",\"web\"],\"type\":\"string\"},\"url\":{\"type\":\"string\"}},\"required\":[\"type\",\"name\",\"url\"],\"type\":\"object\"},\"type\":\"array\"},\"timetableUrlTemplate\":{\"description\":\"URL template for the timetable, contains {title}, {id} and\\n{DS100} placeholders which need to be replaced\\n\",\"type\":\"string\"}},\"required\":[\"code\",\"name\",\"active\",\"allowPhotoUploads\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"successful operation\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/countries", "segments": [{ "lit": "countries" }], "select": { "exist": ["only_active"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "country", "name__orig": "country", "Name": "Country", "name_": "country", "name-": "country", "NAME": "COUNTRY", "index$": 1 }, { "active": true, "entity": "country", "key$": "BasicCountryFlow", "kind": "basic", "name": "BasicCountryFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "country_ref01" } }], "index$": 0 }] }, 'Country');
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