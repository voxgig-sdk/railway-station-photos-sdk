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
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'photo_upload.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "photo_upload", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /photoUpload", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "active", "or": "active", "r": false, "t": "`$BOOLEAN`", "index$": 0 }, { "a": true, "k": "header", "n": "authorization", "or": "authorization", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "header", "n": "comment", "or": "comment", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "header", "n": "content_type", "or": "content_type", "r": true, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "header", "n": "country", "or": "country", "r": false, "t": "`$STRING`", "index$": 4 }, { "a": true, "k": "header", "n": "latitude", "or": "latitude", "r": false, "t": "`$NUMBER`", "index$": 5 }, { "a": true, "k": "header", "n": "longitude", "or": "longitude", "r": false, "t": "`$NUMBER`", "index$": 6 }, { "a": true, "k": "header", "n": "station_id", "or": "station_id", "r": false, "t": "`$STRING`", "index$": 7 }, { "a": true, "k": "header", "n": "station_title", "or": "station_title", "r": false, "t": "`$STRING`", "index$": 8 }] }, "k": "http", "m": "POST", "o": "/photoUpload", "q": { "exist": ["active", "authorization", "comment", "content_type", "country", "latitude", "longitude", "station_id", "station_title"] }, "r": {}, "s": [{ "lit": "photoUpload" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "photo_upload", "name__orig": "photo_upload", "Name": "PhotoUpload", "name_": "photo_upload", "name-": "photo-upload", "NAME": "PHOTO_UPLOAD", "index$": 13 }, { "active": true, "entity": "photo_upload", "key$": "BasicPhotoUploadFlow", "kind": "basic", "name": "BasicPhotoUploadFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "photo_upload_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'PhotoUpload', { "POST /photoUpload": { "protocol": "http", "operationId": "postPhotoUpload", "requestBody": { "description": "image, required for existing station, optional for missing stations", "content": { "image/jpeg": { "schema": { "type": "string", "format": "byte" } }, "image/png": { "schema": { "type": "string", "format": "byte" } }, "application/octet-stream": { "schema": { "type": "string", "format": "byte" } } } }, "responses": { "202": { "description": "upload successful", "content": { "application/json": { "schema": { "description": "Response status of photo uploads and problem reports", "type": "object", "required": ["state"], "properties": { "state": { "type": "string", "enum": ["REVIEW", "LAT_LON_OUT_OF_RANGE", "NOT_ENOUGH_DATA", "UNSUPPORTED_CONTENT_TYPE", "PHOTO_TOO_LARGE", "PHOTO_UPLOAD_NOT_ALLOWED", "COUNTRY_DISABLED", "CONFLICT", "UNAUTHORIZED", "ERROR"] }, "message": { "type": "string" }, "id": { "type": "integer", "format": "int64" }, "filename": { "type": "string", "description": "filename in inbox" }, "inboxUrl": { "type": "string", "description": "url of the photo in the inbox" }, "crc32": { "description": "CRC32 checksum of the uploaded photo", "type": "integer", "format": "int64" } }, "x-ref": "#/components/schemas/InboxResponse" } } } }, "400": { "description": "Bad Request", "content": { "application/json": { "schema": { "description": "Response status of photo uploads and problem reports", "type": "object", "required": ["state"], "properties": { "state": { "type": "string", "enum": ["REVIEW", "LAT_LON_OUT_OF_RANGE", "NOT_ENOUGH_DATA", "UNSUPPORTED_CONTENT_TYPE", "PHOTO_TOO_LARGE", "PHOTO_UPLOAD_NOT_ALLOWED", "COUNTRY_DISABLED", "CONFLICT", "UNAUTHORIZED", "ERROR"] }, "message": { "type": "string" }, "id": { "type": "integer", "format": "int64" }, "filename": { "type": "string", "description": "filename in inbox" }, "inboxUrl": { "type": "string", "description": "url of the photo in the inbox" }, "crc32": { "description": "CRC32 checksum of the uploaded photo", "type": "integer", "format": "int64" } }, "x-ref": "#/components/schemas/InboxResponse" } } } }, "401": { "description": "authorization failed", "content": { "application/json": { "schema": { "description": "Response status of photo uploads and problem reports", "type": "object", "required": ["state"], "properties": { "state": { "type": "string", "enum": ["REVIEW", "LAT_LON_OUT_OF_RANGE", "NOT_ENOUGH_DATA", "UNSUPPORTED_CONTENT_TYPE", "PHOTO_TOO_LARGE", "PHOTO_UPLOAD_NOT_ALLOWED", "COUNTRY_DISABLED", "CONFLICT", "UNAUTHORIZED", "ERROR"] }, "message": { "type": "string" }, "id": { "type": "integer", "format": "int64" }, "filename": { "type": "string", "description": "filename in inbox" }, "inboxUrl": { "type": "string", "description": "url of the photo in the inbox" }, "crc32": { "description": "CRC32 checksum of the uploaded photo", "type": "integer", "format": "int64" } }, "x-ref": "#/components/schemas/InboxResponse" } } } }, "403": { "description": "forbidden", "content": {} }, "409": { "description": "photo already exists", "content": { "application/json": { "schema": { "description": "Response status of photo uploads and problem reports", "type": "object", "required": ["state"], "properties": { "state": { "type": "string", "enum": ["REVIEW", "LAT_LON_OUT_OF_RANGE", "NOT_ENOUGH_DATA", "UNSUPPORTED_CONTENT_TYPE", "PHOTO_TOO_LARGE", "PHOTO_UPLOAD_NOT_ALLOWED", "COUNTRY_DISABLED", "CONFLICT", "UNAUTHORIZED", "ERROR"] }, "message": { "type": "string" }, "id": { "type": "integer", "format": "int64" }, "filename": { "type": "string", "description": "filename in inbox" }, "inboxUrl": { "type": "string", "description": "url of the photo in the inbox" }, "crc32": { "description": "CRC32 checksum of the uploaded photo", "type": "integer", "format": "int64" } }, "x-ref": "#/components/schemas/InboxResponse" } } } }, "413": { "description": "image too large (maximum 20 MB)", "content": { "application/json": { "schema": { "description": "Response status of photo uploads and problem reports", "type": "object", "required": ["state"], "properties": { "state": { "type": "string", "enum": ["REVIEW", "LAT_LON_OUT_OF_RANGE", "NOT_ENOUGH_DATA", "UNSUPPORTED_CONTENT_TYPE", "PHOTO_TOO_LARGE", "PHOTO_UPLOAD_NOT_ALLOWED", "COUNTRY_DISABLED", "CONFLICT", "UNAUTHORIZED", "ERROR"] }, "message": { "type": "string" }, "id": { "type": "integer", "format": "int64" }, "filename": { "type": "string", "description": "filename in inbox" }, "inboxUrl": { "type": "string", "description": "url of the photo in the inbox" }, "crc32": { "description": "CRC32 checksum of the uploaded photo", "type": "integer", "format": "int64" } }, "x-ref": "#/components/schemas/InboxResponse" } } } }, "default": { "description": "Unexpected error", "content": { "application/json": { "schema": { "description": "General error message", "type": "object", "properties": { "timestamp": { "type": "integer", "format": "int64" }, "status": { "type": "integer", "format": "int32" }, "error": { "type": "string" }, "message": { "type": "string" }, "path": { "type": "string" } }, "required": ["status", "message"], "x-ref": "#/components/schemas/GeneralErrorMessage" } } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "JWT authorization\n", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/Authorization", "index$": 0 }, { "name": "Country", "in": "header", "description": "country code", "schema": { "description": "a two character country code", "type": "string", "maxLength": 2, "minLength": 2, "x-ref": "#/components/schemas/CountryCode" }, "index$": 1 }, { "name": "Station-Id", "in": "header", "description": "id of the railwaystation", "schema": { "type": "string" }, "index$": 2 }, { "name": "Content-Type", "in": "header", "description": "mime type of the image, \"image/png\" or \"image/jpeg\"", "required": true, "schema": { "type": "string" }, "index$": 3 }, { "name": "Station-Title", "in": "header", "description": "name of the station, for upload of missing stations (needs to be URL-encoded with UTF-8 charset)", "schema": { "type": "string" }, "index$": 4 }, { "name": "Latitude", "in": "header", "description": "latitude, for upload of missing stations", "schema": { "type": "number", "format": "double" }, "index$": 5 }, { "name": "Longitude", "in": "header", "description": "longitude, for upload of missing stations", "schema": { "type": "number", "format": "double" }, "index$": 6 }, { "name": "Comment", "in": "header", "description": "comment of the photographer to the reviewer (needs to be URL-encoded with UTF-8 charset)", "schema": { "type": "string" }, "index$": 7 }, { "name": "Active", "in": "header", "description": "is this station active?", "schema": { "type": "boolean" }, "index$": 8 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const photo_upload_ref01_ent = client.PhotoUpload();
        let photo_upload_ref01_data = setup.data.new.photo_upload['photo_upload_ref01'];
        photo_upload_ref01_data = (await photo_upload_ref01_ent.create(photo_upload_ref01_data)).data();
        (0, node_assert_1.default)(null != photo_upload_ref01_data);
    });
});
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