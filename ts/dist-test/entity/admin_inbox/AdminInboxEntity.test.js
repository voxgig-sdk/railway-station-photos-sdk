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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "DS100": { "a": true, "h": "Ds100", "n": "DS100", "r": false, "sh": "DS100 attribute of a new station", "t": "`$STRING`", "key$": "DS100", "index$": 0 }, "active": { "a": true, "h": "Active", "n": "active", "r": false, "sh": "active flag of a new station (default true)", "t": "`$BOOLEAN`", "key$": "active", "index$": 1 }, "command": { "a": true, "h": "Command", "n": "command", "r": true, "t": "`$STRING`", "key$": "command", "index$": 2 }, "conflictResolution": { "a": true, "h": "Conflict Resolution", "n": "conflictResolution", "r": false, "sh": "how to handle conflicts", "t": "`$STRING`", "key$": "conflictResolution", "index$": 3 }, "countryCode": { "a": true, "h": "Country Code", "n": "countryCode", "r": false, "sh": "a two character country code", "t": "`$STRING`", "key$": "countryCode", "index$": 4 }, "id": { "a": true, "fo": "int64", "h": "Id", "n": "id", "r": true, "t": "`$INTEGER`", "key$": "id", "index$": 5 }, "lat": { "a": true, "fo": "double", "h": "Lat", "n": "lat", "r": false, "t": "`$NUMBER`", "key$": "lat", "index$": 6 }, "lon": { "a": true, "fo": "double", "h": "Lon", "n": "lon", "r": false, "t": "`$NUMBER`", "key$": "lon", "index$": 7 }, "message": { "a": true, "h": "Message", "n": "message", "r": true, "t": "`$STRING`", "key$": "message", "index$": 8 }, "rejectReason": { "a": true, "h": "Reject Reason", "n": "rejectReason", "r": false, "sh": "explanation of a rejection", "t": "`$STRING`", "key$": "rejectReason", "index$": 9 }, "stationId": { "a": true, "h": "Station Id", "n": "stationId", "r": false, "sh": "ID of a new station", "t": "`$STRING`", "key$": "stationId", "index$": 10 }, "status": { "a": true, "fo": "int32", "h": "Status", "n": "status", "r": true, "t": "`$INTEGER`", "key$": "status", "index$": 11 }, "title": { "a": true, "h": "Title", "n": "title", "r": false, "t": "`$STRING`", "key$": "title", "index$": 12 } }, "id": { "field": "id", "name": "id" }, "name": "admin_inbox", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /adminInbox", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "authorization", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/adminInbox", "q": { "exist": ["authorization"] }, "r": {}, "s": [{ "lit": "adminInbox" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "admin_inbox", "name__orig": "admin_inbox", "Name": "AdminInbox", "name_": "admin_inbox", "name-": "admin-inbox", "NAME": "ADMIN_INBOX", "index$": 0 }, { "active": true, "entity": "admin_inbox", "key$": "BasicAdminInboxFlow", "kind": "basic", "name": "BasicAdminInboxFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "admin_inbox_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'AdminInbox', { "POST /adminInbox": { "protocol": "http", "operationId": "postAdminInbox", "requestBody": { "content": { "application/json": { "schema": { "description": "command to import or reject an inbox entry", "type": "object", "properties": { "id": { "type": "integer", "format": "int64", "key$": "id" }, "countryCode": { "description": "a two character country code", "type": "string", "maxLength": 2, "minLength": 2, "x-ref": "#/components/schemas/CountryCode", "key$": "countryCode" }, "stationId": { "type": "string", "description": "ID of a new station", "key$": "stationId" }, "title": { "type": "string", "key$": "title" }, "lat": { "type": "number", "format": "double", "key$": "lat" }, "lon": { "type": "number", "format": "double", "key$": "lon" }, "rejectReason": { "type": "string", "description": "explanation of a rejection", "key$": "rejectReason" }, "DS100": { "type": "string", "description": "DS100 attribute of a new station", "key$": "DS100" }, "active": { "type": "boolean", "description": "active flag of a new station (default true)", "key$": "active" }, "conflictResolution": { "type": "string", "description": "how to handle conflicts", "enum": ["DO_NOTHING", "OVERWRITE_EXISTING_PHOTO", "IMPORT_AS_NEW_PRIMARY_PHOTO", "IMPORT_AS_NEW_SECONDARY_PHOTO", "IGNORE_NEARBY_STATION"], "key$": "conflictResolution" }, "command": { "type": "string", "enum": ["IMPORT_PHOTO", "IMPORT_MISSING_STATION", "ACTIVATE_STATION", "DEACTIVATE_STATION", "DELETE_STATION", "DELETE_PHOTO", "MARK_SOLVED", "REJECT", "CHANGE_NAME", "UPDATE_LOCATION", "PHOTO_OUTDATED"], "key$": "command" } }, "required": ["id", "command"], "x-ref": "#/components/schemas/InboxCommand", "index$": 1 } } }, "required": true }, "responses": { "200": { "description": "command successfully", "content": { "application/json": { "schema": { "description": "Response object for an AdminInbox command", "type": "object", "properties": { "status": { "type": "integer", "format": "int32", "key$": "status" }, "message": { "type": "string", "key$": "message" } }, "required": ["status", "message"], "x-ref": "#/components/schemas/AdminInboxCommandResponse", "index$": 0 } } } }, "400": { "description": "Bad Request", "content": { "application/json": { "schema": { "description": "Response object for an AdminInbox command", "type": "object", "properties": { "status": { "type": "integer", "format": "int32", "key$": "status" }, "message": { "type": "string", "key$": "message" } }, "required": ["status", "message"], "x-ref": "#/components/schemas/AdminInboxCommandResponse" } } } }, "401": { "description": "not authorized", "content": {} }, "403": { "description": "forbidden", "content": {} }, "default": { "description": "Unexpected error", "content": { "application/json": { "schema": { "description": "General error message", "type": "object", "properties": { "timestamp": { "type": "integer", "format": "int64" }, "status": { "type": "integer", "format": "int32" }, "error": { "type": "string" }, "message": { "type": "string" }, "path": { "type": "string" } }, "required": ["status", "message"], "x-ref": "#/components/schemas/GeneralErrorMessage" } } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "JWT authorization\n", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/Authorization", "index$": 0 }], "securitySource": "unspecified" } });
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