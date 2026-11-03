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
(0, node_test_1.describe)('PhotoUploadEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('RAILWAY_STATION_PHOTOS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.RailwayStationPhotosSDK.test();
        const ent = testsdk.PhotoUpload();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.RailwayStationPhotosSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PhotoUpload().create({ "crc32": "x", "state": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'photo_upload.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "crc32": { "a": true, "fo": "int64", "h": "Crc32", "n": "crc32", "r": false, "sh": "CRC32 checksum of the uploaded photo", "t": "`$INTEGER`", "key$": "crc32", "index$": 0 }, "filename": { "a": true, "h": "Filename", "n": "filename", "r": false, "sh": "filename in inbox", "t": "`$STRING`", "key$": "filename", "index$": 1 }, "id": { "a": true, "fo": "int64", "h": "Id", "n": "id", "r": false, "t": "`$INTEGER`", "key$": "id", "index$": 2 }, "inboxUrl": { "a": true, "h": "Inbox Url", "n": "inboxUrl", "r": false, "sh": "url of the photo in the inbox", "t": "`$STRING`", "key$": "inboxUrl", "index$": 3 }, "message": { "a": true, "h": "Message", "n": "message", "r": false, "t": "`$STRING`", "key$": "message", "index$": 4 }, "state": { "a": true, "h": "State", "n": "state", "r": true, "t": "`$STRING`", "key$": "state", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "photo_upload", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /photoUpload", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "active", "or": "Active", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "k": "header", "n": "authorization", "or": "Authorization", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "header", "n": "comment", "or": "Comment", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "header", "n": "country", "or": "Country", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "header", "n": "latitude", "or": "Latitude", "r": false, "t": "`$NUMBER`", "index$": 4 }, { "a": true, "k": "header", "n": "longitude", "or": "Longitude", "r": false, "t": "`$NUMBER`", "index$": 5 }, { "a": true, "k": "header", "n": "station_id", "or": "Station-Id", "r": false, "t": "`$STRING`", "index$": 6 }, { "a": true, "k": "header", "n": "station_title", "or": "Station-Title", "r": false, "t": "`$STRING`", "index$": 7 }] }, "k": "http", "m": "POST", "o": "/photoUpload", "q": { "exist": ["authorization"] }, "r": {}, "rb": { "alternatives": [{ "kind": "raw", "media": "image/jpeg" }, { "kind": "raw", "media": "image/png" }], "kind": "raw", "media": "application/octet-stream" }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "photoUpload" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "photo_upload", "name__orig": "photo_upload", "Name": "PhotoUpload", "name_": "photo_upload", "name-": "photo-upload", "NAME": "PHOTO_UPLOAD", "index$": 14 }, { "active": true, "entity": "photo_upload", "key$": "BasicPhotoUploadFlow", "kind": "basic", "name": "BasicPhotoUploadFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "photo_upload_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'PhotoUpload', { "POST /photoUpload": { "protocol": "http", "requestBody": { "description": "image, required for existing station, optional for missing stations", "content": { "image/jpeg": { "schema": { "type": "string", "format": "byte" } }, "image/png": { "schema": { "type": "string", "format": "byte" } }, "application/octet-stream": { "schema": { "type": "string", "format": "byte", "index$": 1 } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "JWT authorization\n", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/Authorization", "index$": 0 }, { "name": "Country", "in": "header", "description": "country code", "schema": { "description": "a two character country code", "type": "string", "maxLength": 2, "minLength": 2, "x-ref": "#/components/schemas/CountryCode" }, "index$": 1 }, { "name": "Station-Id", "in": "header", "description": "id of the railwaystation", "schema": { "type": "string" }, "index$": 2 }, { "name": "Station-Title", "in": "header", "description": "name of the station, for upload of missing stations (needs to be URL-encoded with UTF-8 charset)", "schema": { "type": "string" }, "index$": 3 }, { "name": "Latitude", "in": "header", "description": "latitude, for upload of missing stations", "schema": { "type": "number", "format": "double" }, "index$": 4 }, { "name": "Longitude", "in": "header", "description": "longitude, for upload of missing stations", "schema": { "type": "number", "format": "double" }, "index$": 5 }, { "name": "Comment", "in": "header", "description": "comment of the photographer to the reviewer (needs to be URL-encoded with UTF-8 charset)", "schema": { "type": "string" }, "index$": 6 }, { "name": "Active", "in": "header", "description": "is this station active?", "schema": { "type": "boolean" }, "index$": 7 }] } }, { strict: LIVE_STRICT, t }, 'TRUE' === process.env.VOXGIG_GETONLY_GUARD ? { "photo_upload.create.0": "GET-only live run: needs POST /photoUpload" } : {});
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const photo_upload_ref01_ent = client.PhotoUpload();
        let photo_upload_ref01_data = setup.data.new.photo_upload['photo_upload_ref01'];
        photo_upload_ref01_data = (await photo_upload_ref01_ent.create(photo_upload_ref01_data)).data();
        (0, node_assert_1.default)(null != photo_upload_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/photo_upload/PhotoUploadTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.RailwayStationPhotosSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['photo_upload01', 'photo_upload02', 'photo_upload03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'RAILWAY_STATION_PHOTOS_TEST_PHOTO_UPLOAD_ENTID': idmap,
        'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
        'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_UPLOAD_ENTID'];
    const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_PHOTO_UPLOAD_ENTID'];
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
//# sourceMappingURL=PhotoUploadEntity.test.js.map