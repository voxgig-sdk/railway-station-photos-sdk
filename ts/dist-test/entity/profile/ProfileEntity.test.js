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
(0, node_test_1.describe)('ProfileEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('RAILWAY_STATION_PHOTOS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.RailwayStationPhotosSDK.test();
        const ent = testsdk.Profile();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE;
        for (const op of ['create', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'profile.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "admin": { "a": true, "h": "Admin", "n": "admin", "r": false, "t": "`$BOOLEAN`", "key$": "admin", "index$": 0 }, "anonymous": { "a": true, "h": "Anonymous", "n": "anonymous", "r": false, "t": "`$BOOLEAN`", "key$": "anonymous", "index$": 1 }, "email": { "a": true, "fo": "email", "h": "Email", "n": "email", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "t": "`$STRING`", "key$": "email", "index$": 2 }, "emailVerified": { "a": true, "h": "Email Verified", "n": "emailVerified", "r": false, "t": "`$BOOLEAN`", "key$": "emailVerified", "index$": 3 }, "license": { "a": true, "h": "License", "n": "license", "op": { "create": { "req": false, "type": "`$STRING`" } }, "r": true, "sh": "the only accepted type is \"CC0 1.0 Universell (CC0 1.0)\", the others are listed for backward compatibility", "t": "`$STRING`", "key$": "license", "index$": 4 }, "link": { "a": true, "fo": "uri", "h": "Link", "n": "link", "r": false, "t": "`$STRING`", "key$": "link", "index$": 5 }, "newPassword": { "a": true, "h": "New Password", "n": "newPassword", "r": true, "t": "`$STRING`", "key$": "newPassword", "index$": 6 }, "nickname": { "a": true, "h": "Nickname", "n": "nickname", "r": true, "t": "`$STRING`", "key$": "nickname", "index$": 7 }, "photoOwner": { "a": true, "h": "Photo Owner", "n": "photoOwner", "op": { "create": { "req": false, "type": "`$BOOLEAN`" } }, "r": true, "t": "`$BOOLEAN`", "key$": "photoOwner", "index$": 8 }, "sendNotifications": { "a": true, "h": "Send Notifications", "n": "sendNotifications", "r": false, "t": "`$BOOLEAN`", "key$": "sendNotifications", "index$": 9 } }, "name": "profile", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /changePassword", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "authorization", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/changePassword", "q": { "exist": ["authorization"] }, "r": {}, "s": [{ "lit": "changePassword" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /myProfile", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "authorization", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/myProfile", "q": { "exist": ["authorization"] }, "r": {}, "s": [{ "lit": "myProfile" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "co": { "id": "POST /resendEmailVerification", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "authorization", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/resendEmailVerification", "q": { "exist": ["authorization"] }, "r": {}, "s": [{ "lit": "resendEmailVerification" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /myProfile", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "authorization", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/myProfile", "q": { "exist": ["authorization"] }, "r": {}, "s": [{ "lit": "myProfile" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /emailVerification/{token}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "token", "or": "token", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/emailVerification/{token}", "q": { "exist": ["token"] }, "r": {}, "s": [{ "lit": "emailVerification" }, { "var": "token" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /myProfile", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "authorization", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/myProfile", "q": { "exist": ["authorization"] }, "r": {}, "s": [{ "lit": "myProfile" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "profile", "name__orig": "profile", "Name": "Profile", "name_": "profile", "name-": "profile", "NAME": "PROFILE", "index$": 15 }, { "active": true, "entity": "profile", "key$": "BasicProfileFlow", "kind": "basic", "name": "BasicProfileFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "profile_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "profile_ref01", "srcdatavar": "profile_ref01_data", "suffix": "_dt0" }, "m": { "id": "profile01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-profile_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "profile_ref01", "suffix": "_rm0" }, "m": {}, "o": "remove", "s": [], "v": [], "index$": 2 }] }, 'Profile', { "POST /changePassword": { "protocol": "http", "operationId": "postChangePassword", "requestBody": { "description": "ChangePassword", "content": { "application/json": { "schema": { "description": "Change password request object", "type": "object", "properties": { "newPassword": { "type": "string", "key$": "newPassword" } }, "required": ["newPassword"], "x-ref": "#/components/schemas/ChangePassword", "index$": 1 } } }, "required": true }, "responses": { "200": { "description": "password changed", "content": {} }, "400": { "description": "Bad Request", "content": { "text/plain": { "schema": { "type": "string" } } } }, "404": { "description": "User not found", "content": {} }, "default": { "description": "Unexpected error", "content": { "application/json": { "schema": { "description": "General error message", "type": "object", "properties": { "timestamp": { "type": "integer", "format": "int64" }, "status": { "type": "integer", "format": "int32" }, "error": { "type": "string" }, "message": { "type": "string" }, "path": { "type": "string" } }, "required": ["status", "message"], "x-ref": "#/components/schemas/GeneralErrorMessage" } } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "JWT authorization\n", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/Authorization", "index$": 0 }], "securitySource": "unspecified" }, "POST /myProfile": { "protocol": "http", "operationId": "postMyProfile", "requestBody": { "description": "Userprofile", "content": { "application/json": { "schema": { "description": "User profile information", "type": "object", "properties": { "nickname": { "type": "string", "maxLength": 50, "minLength": 3, "key$": "nickname" }, "email": { "type": "string", "format": "email", "maxLength": 100, "minLength": 3, "key$": "email" }, "license": { "description": "the only accepted type is \"CC0 1.0 Universell (CC0 1.0)\", the others are listed for backward compatibility", "type": "string", "enum": ["CC0", "CC0 1.0 Universell (CC0 1.0)", "CC4", "CC BY-SA 4.0", "UNKNOWN"], "x-ref": "#/components/schemas/License", "key$": "license" }, "photoOwner": { "type": "boolean", "key$": "photoOwner" }, "link": { "type": "string", "format": "uri", "key$": "link" }, "anonymous": { "type": "boolean", "key$": "anonymous" }, "sendNotifications": { "type": "boolean", "key$": "sendNotifications" } }, "required": ["nickname", "email"], "x-ref": "#/components/schemas/UpdateProfile", "index$": 1 } } }, "required": true }, "responses": { "200": { "description": "ok", "content": {} }, "400": { "description": "Bad Request", "content": { "text/plain": { "schema": { "type": "string" } } } }, "401": { "description": "authorization failed", "content": {} }, "403": { "description": "forbidden", "content": {} }, "409": { "description": "conflict with existing name or email", "content": { "text/plain": { "schema": { "type": "string" } } } }, "default": { "description": "Unexpected error", "content": { "application/json": { "schema": { "description": "General error message", "type": "object", "properties": { "timestamp": { "type": "integer", "format": "int64" }, "status": { "type": "integer", "format": "int32" }, "error": { "type": "string" }, "message": { "type": "string" }, "path": { "type": "string" } }, "required": ["status", "message"], "x-ref": "#/components/schemas/GeneralErrorMessage" } } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "JWT authorization\n", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/Authorization", "index$": 0 }], "securitySource": "unspecified" }, "POST /resendEmailVerification": { "protocol": "http", "operationId": "postResendEmailVerification", "responses": { "200": { "description": "email successfully sent", "content": {} }, "default": { "description": "Unexpected error", "content": { "application/json": { "schema": { "description": "General error message", "type": "object", "properties": { "timestamp": { "type": "integer", "format": "int64" }, "status": { "type": "integer", "format": "int32" }, "error": { "type": "string" }, "message": { "type": "string" }, "path": { "type": "string" } }, "required": ["status", "message"], "x-ref": "#/components/schemas/GeneralErrorMessage" } } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "JWT authorization\n", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/Authorization", "index$": 0 }], "securitySource": "unspecified" }, "GET /myProfile": { "protocol": "http", "operationId": "getMyProfile", "responses": { "200": { "description": "ok", "content": { "application/json": { "schema": { "description": "User profile information", "type": "object", "properties": { "nickname": { "key$": "nickname", "type": "string" }, "email": { "format": "email", "key$": "email", "type": "string" }, "license": { "description": "the only accepted type is \"CC0 1.0 Universell (CC0 1.0)\", the others are listed for backward compatibility", "enum": ["CC0", "CC0 1.0 Universell (CC0 1.0)", "CC4", "CC BY-SA 4.0", "UNKNOWN"], "key$": "license", "type": "string", "x-ref": "#/components/schemas/License" }, "photoOwner": { "key$": "photoOwner", "type": "boolean" }, "link": { "format": "uri", "key$": "link", "type": "string" }, "anonymous": { "key$": "anonymous", "type": "boolean" }, "admin": { "key$": "admin", "type": "boolean" }, "emailVerified": { "key$": "emailVerified", "type": "boolean" }, "sendNotifications": { "key$": "sendNotifications", "type": "boolean" } }, "required": ["nickname", "license", "photoOwner"], "x-ref": "#/components/schemas/Profile", "index$": 0 } } } }, "401": { "description": "authorization failed", "content": {} }, "403": { "description": "forbidden", "content": {} }, "default": { "description": "Unexpected error", "content": { "application/json": { "schema": { "description": "General error message", "type": "object", "properties": { "timestamp": { "type": "integer", "format": "int64" }, "status": { "type": "integer", "format": "int32" }, "error": { "type": "string" }, "message": { "type": "string" }, "path": { "type": "string" } }, "required": ["status", "message"], "x-ref": "#/components/schemas/GeneralErrorMessage" } } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "JWT authorization\n", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/Authorization", "index$": 0 }], "securitySource": "unspecified" }, "GET /emailVerification/{token}": { "protocol": "http", "operationId": "getEmailVerification", "responses": { "200": { "description": "email successfully verified", "content": { "text/plain": { "schema": { "type": "string" } } } }, "404": { "description": "token not found, verification failed", "content": {} }, "default": { "description": "Unexpected error", "content": { "application/json": { "schema": { "description": "General error message", "type": "object", "properties": { "timestamp": { "type": "integer", "format": "int64" }, "status": { "type": "integer", "format": "int32" }, "error": { "type": "string" }, "message": { "type": "string" }, "path": { "type": "string" } }, "required": ["status", "message"], "x-ref": "#/components/schemas/GeneralErrorMessage" } } } } }, "parameters": [{ "name": "token", "description": "email verification token", "in": "path", "required": true, "schema": { "type": "string" }, "index$": 0 }], "securitySource": "unspecified" }, "DELETE /myProfile": { "protocol": "http", "operationId": "deleteMyProfile", "responses": { "204": { "description": "delete action has been enacted, no further information" }, "401": { "description": "authorization failed", "content": {} }, "403": { "description": "forbidden", "content": {} }, "default": { "description": "Unexpected error", "content": { "application/json": { "schema": { "description": "General error message", "type": "object", "properties": { "timestamp": { "type": "integer", "format": "int64" }, "status": { "type": "integer", "format": "int32" }, "error": { "type": "string" }, "message": { "type": "string" }, "path": { "type": "string" } }, "required": ["status", "message"], "x-ref": "#/components/schemas/GeneralErrorMessage" } } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "JWT authorization\n", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/Authorization", "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const profile_ref01_ent = client.Profile();
        let profile_ref01_data = setup.data.new.profile['profile_ref01'];
        profile_ref01_data = (await profile_ref01_ent.create(profile_ref01_data)).data();
        (0, node_assert_1.default)(null != profile_ref01_data);
        // LOAD
        const profile_ref01_match_dt0 = {};
        const profile_ref01_data_dt0 = (await profile_ref01_ent.load(profile_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != profile_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/profile/ProfileTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.RailwayStationPhotosSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['profile01', 'profile02', 'profile03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'RAILWAY_STATION_PHOTOS_TEST_PROFILE_ENTID': idmap,
        'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
        'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['RAILWAY_STATION_PHOTOS_TEST_PROFILE_ENTID'];
    const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_PROFILE_ENTID'];
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
//# sourceMappingURL=ProfileEntity.test.js.map