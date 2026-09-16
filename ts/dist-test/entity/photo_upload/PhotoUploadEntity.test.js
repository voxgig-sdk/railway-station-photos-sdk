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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "photo_upload", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "header": [{ "active": true, "kind": "header", "name": "active", "orig": "active", "reqd": false, "type": "`$BOOLEAN`" }, { "active": true, "kind": "header", "name": "authorization", "orig": "authorization", "reqd": true, "type": "`$STRING`" }, { "active": true, "kind": "header", "name": "comment", "orig": "comment", "reqd": false, "type": "`$STRING`" }, { "active": true, "kind": "header", "name": "content_type", "orig": "content_type", "reqd": true, "type": "`$STRING`" }, { "active": true, "kind": "header", "name": "country", "orig": "country", "reqd": false, "type": "`$STRING`" }, { "active": true, "kind": "header", "name": "latitude", "orig": "latitude", "reqd": false, "type": "`$NUMBER`" }, { "active": true, "kind": "header", "name": "longitude", "orig": "longitude", "reqd": false, "type": "`$NUMBER`" }, { "active": true, "kind": "header", "name": "station_id", "orig": "station_id", "reqd": false, "type": "`$STRING`" }, { "active": true, "kind": "header", "name": "station_title", "orig": "station_title", "reqd": false, "type": "`$STRING`" }] }, "contract": { "id": "POST /photoUpload", "json": "{\"operationId\":\"postPhotoUpload\",\"parameters\":[{\"description\":\"JWT authorization\\n\",\"in\":\"header\",\"name\":\"Authorization\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"country code\",\"in\":\"header\",\"name\":\"Country\",\"schema\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"}},{\"description\":\"id of the railwaystation\",\"in\":\"header\",\"name\":\"Station-Id\",\"schema\":{\"type\":\"string\"}},{\"description\":\"mime type of the image, \\\"image/png\\\" or \\\"image/jpeg\\\"\",\"in\":\"header\",\"name\":\"Content-Type\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"name of the station, for upload of missing stations (needs to be URL-encoded with UTF-8 charset)\",\"in\":\"header\",\"name\":\"Station-Title\",\"schema\":{\"type\":\"string\"}},{\"description\":\"latitude, for upload of missing stations\",\"in\":\"header\",\"name\":\"Latitude\",\"schema\":{\"format\":\"double\",\"type\":\"number\"}},{\"description\":\"longitude, for upload of missing stations\",\"in\":\"header\",\"name\":\"Longitude\",\"schema\":{\"format\":\"double\",\"type\":\"number\"}},{\"description\":\"comment of the photographer to the reviewer (needs to be URL-encoded with UTF-8 charset)\",\"in\":\"header\",\"name\":\"Comment\",\"schema\":{\"type\":\"string\"}},{\"description\":\"is this station active?\",\"in\":\"header\",\"name\":\"Active\",\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/octet-stream\":{\"schema\":{\"format\":\"byte\",\"type\":\"string\"}},\"image/jpeg\":{\"schema\":{\"format\":\"byte\",\"type\":\"string\"}},\"image/png\":{\"schema\":{\"format\":\"byte\",\"type\":\"string\"}}},\"description\":\"image, required for existing station, optional for missing stations\"},\"responses\":{\"202\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response status of photo uploads and problem reports\",\"properties\":{\"crc32\":{\"description\":\"CRC32 checksum of the uploaded photo\",\"format\":\"int64\",\"type\":\"integer\"},\"filename\":{\"description\":\"filename in inbox\",\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"state\":{\"enum\":[\"REVIEW\",\"LAT_LON_OUT_OF_RANGE\",\"NOT_ENOUGH_DATA\",\"UNSUPPORTED_CONTENT_TYPE\",\"PHOTO_TOO_LARGE\",\"PHOTO_UPLOAD_NOT_ALLOWED\",\"COUNTRY_DISABLED\",\"CONFLICT\",\"UNAUTHORIZED\",\"ERROR\"],\"type\":\"string\"}},\"required\":[\"state\"],\"type\":\"object\"}}},\"description\":\"upload successful\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response status of photo uploads and problem reports\",\"properties\":{\"crc32\":{\"description\":\"CRC32 checksum of the uploaded photo\",\"format\":\"int64\",\"type\":\"integer\"},\"filename\":{\"description\":\"filename in inbox\",\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"state\":{\"enum\":[\"REVIEW\",\"LAT_LON_OUT_OF_RANGE\",\"NOT_ENOUGH_DATA\",\"UNSUPPORTED_CONTENT_TYPE\",\"PHOTO_TOO_LARGE\",\"PHOTO_UPLOAD_NOT_ALLOWED\",\"COUNTRY_DISABLED\",\"CONFLICT\",\"UNAUTHORIZED\",\"ERROR\"],\"type\":\"string\"}},\"required\":[\"state\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response status of photo uploads and problem reports\",\"properties\":{\"crc32\":{\"description\":\"CRC32 checksum of the uploaded photo\",\"format\":\"int64\",\"type\":\"integer\"},\"filename\":{\"description\":\"filename in inbox\",\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"state\":{\"enum\":[\"REVIEW\",\"LAT_LON_OUT_OF_RANGE\",\"NOT_ENOUGH_DATA\",\"UNSUPPORTED_CONTENT_TYPE\",\"PHOTO_TOO_LARGE\",\"PHOTO_UPLOAD_NOT_ALLOWED\",\"COUNTRY_DISABLED\",\"CONFLICT\",\"UNAUTHORIZED\",\"ERROR\"],\"type\":\"string\"}},\"required\":[\"state\"],\"type\":\"object\"}}},\"description\":\"authorization failed\"},\"403\":{\"content\":{},\"description\":\"forbidden\"},\"409\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response status of photo uploads and problem reports\",\"properties\":{\"crc32\":{\"description\":\"CRC32 checksum of the uploaded photo\",\"format\":\"int64\",\"type\":\"integer\"},\"filename\":{\"description\":\"filename in inbox\",\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"state\":{\"enum\":[\"REVIEW\",\"LAT_LON_OUT_OF_RANGE\",\"NOT_ENOUGH_DATA\",\"UNSUPPORTED_CONTENT_TYPE\",\"PHOTO_TOO_LARGE\",\"PHOTO_UPLOAD_NOT_ALLOWED\",\"COUNTRY_DISABLED\",\"CONFLICT\",\"UNAUTHORIZED\",\"ERROR\"],\"type\":\"string\"}},\"required\":[\"state\"],\"type\":\"object\"}}},\"description\":\"photo already exists\"},\"413\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response status of photo uploads and problem reports\",\"properties\":{\"crc32\":{\"description\":\"CRC32 checksum of the uploaded photo\",\"format\":\"int64\",\"type\":\"integer\"},\"filename\":{\"description\":\"filename in inbox\",\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"state\":{\"enum\":[\"REVIEW\",\"LAT_LON_OUT_OF_RANGE\",\"NOT_ENOUGH_DATA\",\"UNSUPPORTED_CONTENT_TYPE\",\"PHOTO_TOO_LARGE\",\"PHOTO_UPLOAD_NOT_ALLOWED\",\"COUNTRY_DISABLED\",\"CONFLICT\",\"UNAUTHORIZED\",\"ERROR\"],\"type\":\"string\"}},\"required\":[\"state\"],\"type\":\"object\"}}},\"description\":\"image too large (maximum 20 MB)\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/photoUpload", "segments": [{ "lit": "photoUpload" }], "select": { "exist": ["active", "authorization", "comment", "content_type", "country", "latitude", "longitude", "station_id", "station_title"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "photo_upload", "name__orig": "photo_upload", "Name": "PhotoUpload", "name_": "photo_upload", "name-": "photo-upload", "NAME": "PHOTO_UPLOAD", "index$": 11 }, { "active": true, "entity": "photo_upload", "key$": "BasicPhotoUploadFlow", "kind": "basic", "name": "BasicPhotoUploadFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "photo_upload_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'PhotoUpload');
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