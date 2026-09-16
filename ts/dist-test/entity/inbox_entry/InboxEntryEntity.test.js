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
(0, node_test_1.describe)('InboxEntryEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('RAILWAY_STATION_PHOTOS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.RailwayStationPhotosSDK.test();
        const ent = testsdk.InboxEntry();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'inbox_entry.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "active", "req": false, "short": "active flag provided by the user", "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "name": "comment", "req": true, "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "countryCode", "req": false, "short": "a two character country code", "type": "`$STRING`", "index$": 2 }, { "active": true, "format": "int64", "name": "createdAt", "req": true, "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "done", "req": true, "short": "true if this photo was already imported or rejected", "type": "`$BOOLEAN`", "index$": 4 }, { "active": true, "name": "filename", "req": false, "short": "name of the file in inbox", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "hasConflict", "req": false, "short": "conflict with another upload or existing photo", "type": "`$BOOLEAN`", "index$": 6 }, { "active": true, "name": "hasPhoto", "req": true, "short": "this station has already a photo (conflict)", "type": "`$BOOLEAN`", "index$": 7 }, { "active": true, "format": "int64", "name": "id", "req": true, "type": "`$INTEGER`", "index$": 8 }, { "active": true, "name": "inboxUrl", "req": false, "short": "url of the photo in the inbox", "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "isProcessed", "req": false, "short": "was this image process (e.g.", "type": "`$BOOLEAN`", "index$": 10 }, { "active": true, "format": "double", "name": "lat", "req": false, "type": "`$NUMBER`", "index$": 11 }, { "active": true, "format": "double", "name": "lon", "req": false, "type": "`$NUMBER`", "index$": 12 }, { "active": true, "format": "double", "name": "newLat", "req": false, "type": "`$NUMBER`", "index$": 13 }, { "active": true, "format": "double", "name": "newLon", "req": false, "type": "`$NUMBER`", "index$": 14 }, { "active": true, "name": "newTitle", "req": false, "type": "`$STRING`", "index$": 15 }, { "active": true, "format": "int64", "name": "photoId", "req": false, "short": "ID of the photo", "type": "`$INTEGER`", "index$": 16 }, { "active": true, "name": "photographerEmail", "req": false, "type": "`$STRING`", "index$": 17 }, { "active": true, "name": "photographerNickname", "req": true, "type": "`$STRING`", "index$": 18 }, { "active": true, "name": "problemReportType", "req": false, "short": "types of problem reports", "type": "`$STRING`", "index$": 19 }, { "active": true, "name": "stationId", "req": false, "type": "`$STRING`", "index$": 20 }, { "active": true, "name": "title", "req": false, "type": "`$STRING`", "index$": 21 }], "id": { "field": "id", "name": "id" }, "name": "inbox_entry", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "header": [{ "active": true, "kind": "header", "name": "authorization", "orig": "authorization", "reqd": true, "type": "`$STRING`" }] }, "contract": { "id": "GET /adminInbox", "json": "{\"operationId\":\"getAdminInbox\",\"parameters\":[{\"description\":\"JWT authorization\\n\",\"in\":\"header\",\"name\":\"Authorization\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"description\":\"Represents an uploaded photo with processing state\",\"properties\":{\"active\":{\"description\":\"active flag provided by the user\",\"type\":\"boolean\"},\"comment\":{\"type\":\"string\"},\"countryCode\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"},\"createdAt\":{\"format\":\"int64\",\"type\":\"integer\"},\"done\":{\"description\":\"true if this photo was already imported or rejected\",\"type\":\"boolean\"},\"filename\":{\"description\":\"name of the file in inbox\",\"type\":\"string\"},\"hasConflict\":{\"description\":\"conflict with another upload or existing photo\",\"type\":\"boolean\"},\"hasPhoto\":{\"description\":\"this station has already a photo (conflict)\",\"type\":\"boolean\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"inboxUrl\":{\"description\":\"url of the photo in the inbox\",\"type\":\"string\"},\"isProcessed\":{\"description\":\"was this image process (e.g. pixelated)\",\"type\":\"boolean\"},\"lat\":{\"format\":\"double\",\"type\":\"number\"},\"lon\":{\"format\":\"double\",\"type\":\"number\"},\"newLat\":{\"format\":\"double\",\"type\":\"number\"},\"newLon\":{\"format\":\"double\",\"type\":\"number\"},\"newTitle\":{\"type\":\"string\"},\"photoId\":{\"description\":\"ID of the photo\",\"format\":\"int64\",\"type\":\"integer\"},\"photographerEmail\":{\"type\":\"string\"},\"photographerNickname\":{\"type\":\"string\"},\"problemReportType\":{\"description\":\"types of problem reports\",\"enum\":[\"WRONG_LOCATION\",\"STATION_INACTIVE\",\"STATION_ACTIVE\",\"STATION_NONEXISTENT\",\"WRONG_NAME\",\"WRONG_PHOTO\",\"PHOTO_OUTDATED\",\"OTHER\",\"DUPLICATE\"],\"type\":\"string\"},\"stationId\":{\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"required\":[\"id\",\"photographerNickname\",\"comment\",\"createdAt\",\"done\",\"hasPhoto\"],\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"array of inbox objects\"},\"401\":{\"content\":{},\"description\":\"not authorized\"},\"403\":{\"content\":{},\"description\":\"forbidden\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/adminInbox", "segments": [{ "lit": "adminInbox" }], "select": { "exist": ["authorization"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "inbox_entry", "name__orig": "inbox_entry", "Name": "InboxEntry", "name_": "inbox_entry", "name-": "inbox-entry", "NAME": "INBOX_ENTRY", "index$": 4 }, { "active": true, "entity": "inbox_entry", "key$": "BasicInboxEntryFlow", "kind": "basic", "name": "BasicInboxEntryFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "inbox_entry_ref01" } }], "index$": 0 }] }, 'InboxEntry');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let inbox_entry_ref01_data = Object.values(setup.data.existing.inbox_entry)[0];
        // LIST
        const inbox_entry_ref01_ent = client.InboxEntry();
        const inbox_entry_ref01_match = {};
        const inbox_entry_ref01_list = (await inbox_entry_ref01_ent.list(inbox_entry_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/inbox_entry/InboxEntryTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.RailwayStationPhotosSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['inbox_entry01', 'inbox_entry02', 'inbox_entry03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTRY_ENTID': idmap,
        'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
        'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTRY_ENTID'];
    const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_INBOX_ENTRY_ENTID'];
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
//# sourceMappingURL=InboxEntryEntity.test.js.map