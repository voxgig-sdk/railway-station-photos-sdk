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
(0, node_test_1.describe)('AdminInboxEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('RAILWAY_STATION_PHOTOS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.RailwayStationPhotosSDK.test();
        const ent = testsdk.AdminInbox();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'admin_inbox.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "DS100", "req": false, "short": "DS100 attribute of a new station", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "active", "req": false, "short": "active flag of a new station (default true)", "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "name": "command", "req": true, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "conflictResolution", "req": false, "short": "how to handle conflicts", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "countryCode", "req": false, "short": "a two character country code", "type": "`$STRING`", "index$": 4 }, { "active": true, "format": "int64", "name": "id", "req": true, "type": "`$INTEGER`", "index$": 5 }, { "active": true, "format": "double", "name": "lat", "req": false, "type": "`$NUMBER`", "index$": 6 }, { "active": true, "format": "double", "name": "lon", "req": false, "type": "`$NUMBER`", "index$": 7 }, { "active": true, "name": "message", "req": true, "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "rejectReason", "req": false, "short": "explanation of a rejection", "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "stationId", "req": false, "short": "ID of a new station", "type": "`$STRING`", "index$": 10 }, { "active": true, "format": "int32", "name": "status", "req": true, "type": "`$INTEGER`", "index$": 11 }, { "active": true, "name": "title", "req": false, "type": "`$STRING`", "index$": 12 }], "id": { "field": "id", "name": "id" }, "name": "admin_inbox", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "header": [{ "active": true, "kind": "header", "name": "authorization", "orig": "authorization", "reqd": true, "type": "`$STRING`" }] }, "contract": { "id": "POST /adminInbox", "json": "{\"operationId\":\"postAdminInbox\",\"parameters\":[{\"description\":\"JWT authorization\\n\",\"in\":\"header\",\"name\":\"Authorization\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"command to import or reject an inbox entry\",\"properties\":{\"DS100\":{\"description\":\"DS100 attribute of a new station\",\"type\":\"string\"},\"active\":{\"description\":\"active flag of a new station (default true)\",\"type\":\"boolean\"},\"command\":{\"enum\":[\"IMPORT_PHOTO\",\"IMPORT_MISSING_STATION\",\"ACTIVATE_STATION\",\"DEACTIVATE_STATION\",\"DELETE_STATION\",\"DELETE_PHOTO\",\"MARK_SOLVED\",\"REJECT\",\"CHANGE_NAME\",\"UPDATE_LOCATION\",\"PHOTO_OUTDATED\"],\"type\":\"string\"},\"conflictResolution\":{\"description\":\"how to handle conflicts\",\"enum\":[\"DO_NOTHING\",\"OVERWRITE_EXISTING_PHOTO\",\"IMPORT_AS_NEW_PRIMARY_PHOTO\",\"IMPORT_AS_NEW_SECONDARY_PHOTO\",\"IGNORE_NEARBY_STATION\"],\"type\":\"string\"},\"countryCode\":{\"description\":\"a two character country code\",\"maxLength\":2,\"minLength\":2,\"type\":\"string\"},\"id\":{\"format\":\"int64\",\"type\":\"integer\"},\"lat\":{\"format\":\"double\",\"type\":\"number\"},\"lon\":{\"format\":\"double\",\"type\":\"number\"},\"rejectReason\":{\"description\":\"explanation of a rejection\",\"type\":\"string\"},\"stationId\":{\"description\":\"ID of a new station\",\"type\":\"string\"},\"title\":{\"type\":\"string\"}},\"required\":[\"id\",\"command\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response object for an AdminInbox command\",\"properties\":{\"message\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"command successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Response object for an AdminInbox command\",\"properties\":{\"message\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{},\"description\":\"not authorized\"},\"403\":{\"content\":{},\"description\":\"forbidden\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/adminInbox", "segments": [{ "lit": "adminInbox" }], "select": { "exist": ["authorization"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "admin_inbox", "name__orig": "admin_inbox", "Name": "AdminInbox", "name_": "admin_inbox", "name-": "admin-inbox", "NAME": "ADMIN_INBOX", "index$": 0 }, { "active": true, "entity": "admin_inbox", "key$": "BasicAdminInboxFlow", "kind": "basic", "name": "BasicAdminInboxFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "admin_inbox_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'AdminInbox');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const admin_inbox_ref01_ent = client.AdminInbox();
        let admin_inbox_ref01_data = setup.data.new.admin_inbox['admin_inbox_ref01'];
        admin_inbox_ref01_data = (await admin_inbox_ref01_ent.create(admin_inbox_ref01_data)).data();
        (0, node_assert_1.default)(null != admin_inbox_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/admin_inbox/AdminInboxTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.RailwayStationPhotosSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['admin_inbox01', 'admin_inbox02', 'admin_inbox03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'RAILWAY_STATION_PHOTOS_TEST_ADMIN_INBOX_ENTID': idmap,
        'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
        'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['RAILWAY_STATION_PHOTOS_TEST_ADMIN_INBOX_ENTID'];
    const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_ADMIN_INBOX_ENTID'];
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
//# sourceMappingURL=AdminInboxEntity.test.js.map