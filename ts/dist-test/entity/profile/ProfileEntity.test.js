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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "admin", "req": false, "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "name": "anonymous", "req": false, "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "format": "email", "name": "email", "op": { "create": { "req": true, "type": "`$STRING`" } }, "req": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "emailVerified", "req": false, "type": "`$BOOLEAN`", "index$": 3 }, { "active": true, "name": "license", "op": { "create": { "req": false, "type": "`$STRING`" } }, "req": true, "short": "the only accepted type is \"CC0 1.0 Universell (CC0 1.0)\", the others are listed for backward compatibility", "type": "`$STRING`", "index$": 4 }, { "active": true, "format": "uri", "name": "link", "req": false, "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "newPassword", "req": true, "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "nickname", "req": true, "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "photoOwner", "op": { "create": { "req": false, "type": "`$BOOLEAN`" } }, "req": true, "type": "`$BOOLEAN`", "index$": 8 }, { "active": true, "name": "sendNotifications", "req": false, "type": "`$BOOLEAN`", "index$": 9 }], "name": "profile", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": { "header": [{ "active": true, "kind": "header", "name": "authorization", "orig": "authorization", "reqd": true, "type": "`$STRING`" }] }, "contract": { "id": "POST /changePassword", "json": "{\"operationId\":\"postChangePassword\",\"parameters\":[{\"description\":\"JWT authorization\\n\",\"in\":\"header\",\"name\":\"Authorization\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Change password request object\",\"properties\":{\"newPassword\":{\"type\":\"string\"}},\"required\":[\"newPassword\"],\"type\":\"object\"}}},\"description\":\"ChangePassword\",\"required\":true},\"responses\":{\"200\":{\"content\":{},\"description\":\"password changed\"},\"400\":{\"content\":{\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Bad Request\"},\"404\":{\"content\":{},\"description\":\"User not found\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/changePassword", "segments": [{ "lit": "changePassword" }], "select": { "exist": ["authorization"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "header": [{ "active": true, "kind": "header", "name": "authorization", "orig": "authorization", "reqd": true, "type": "`$STRING`" }] }, "contract": { "id": "POST /myProfile", "json": "{\"operationId\":\"postMyProfile\",\"parameters\":[{\"description\":\"JWT authorization\\n\",\"in\":\"header\",\"name\":\"Authorization\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"User profile information\",\"properties\":{\"anonymous\":{\"type\":\"boolean\"},\"email\":{\"format\":\"email\",\"maxLength\":100,\"minLength\":3,\"type\":\"string\"},\"license\":{\"description\":\"the only accepted type is \\\"CC0 1.0 Universell (CC0 1.0)\\\", the others are listed for backward compatibility\",\"enum\":[\"CC0\",\"CC0 1.0 Universell (CC0 1.0)\",\"CC4\",\"CC BY-SA 4.0\",\"UNKNOWN\"],\"type\":\"string\"},\"link\":{\"format\":\"uri\",\"type\":\"string\"},\"nickname\":{\"maxLength\":50,\"minLength\":3,\"type\":\"string\"},\"photoOwner\":{\"type\":\"boolean\"},\"sendNotifications\":{\"type\":\"boolean\"}},\"required\":[\"nickname\",\"email\"],\"type\":\"object\"}}},\"description\":\"Userprofile\",\"required\":true},\"responses\":{\"200\":{\"content\":{},\"description\":\"ok\"},\"400\":{\"content\":{\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Bad Request\"},\"401\":{\"content\":{},\"description\":\"authorization failed\"},\"403\":{\"content\":{},\"description\":\"forbidden\"},\"409\":{\"content\":{\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"conflict with existing name or email\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/myProfile", "segments": [{ "lit": "myProfile" }], "select": { "exist": ["authorization"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "active": true, "args": { "header": [{ "active": true, "kind": "header", "name": "authorization", "orig": "authorization", "reqd": true, "type": "`$STRING`" }] }, "contract": { "id": "POST /resendEmailVerification", "json": "{\"operationId\":\"postResendEmailVerification\",\"parameters\":[{\"description\":\"JWT authorization\\n\",\"in\":\"header\",\"name\":\"Authorization\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{},\"description\":\"email successfully sent\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/resendEmailVerification", "segments": [{ "lit": "resendEmailVerification" }], "select": { "exist": ["authorization"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "header": [{ "active": true, "kind": "header", "name": "authorization", "orig": "authorization", "reqd": true, "type": "`$STRING`" }] }, "contract": { "id": "GET /myProfile", "json": "{\"operationId\":\"getMyProfile\",\"parameters\":[{\"description\":\"JWT authorization\\n\",\"in\":\"header\",\"name\":\"Authorization\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"User profile information\",\"properties\":{\"admin\":{\"type\":\"boolean\"},\"anonymous\":{\"type\":\"boolean\"},\"email\":{\"format\":\"email\",\"type\":\"string\"},\"emailVerified\":{\"type\":\"boolean\"},\"license\":{\"description\":\"the only accepted type is \\\"CC0 1.0 Universell (CC0 1.0)\\\", the others are listed for backward compatibility\",\"enum\":[\"CC0\",\"CC0 1.0 Universell (CC0 1.0)\",\"CC4\",\"CC BY-SA 4.0\",\"UNKNOWN\"],\"type\":\"string\"},\"link\":{\"format\":\"uri\",\"type\":\"string\"},\"nickname\":{\"type\":\"string\"},\"photoOwner\":{\"type\":\"boolean\"},\"sendNotifications\":{\"type\":\"boolean\"}},\"required\":[\"nickname\",\"license\",\"photoOwner\"],\"type\":\"object\"}}},\"description\":\"ok\"},\"401\":{\"content\":{},\"description\":\"authorization failed\"},\"403\":{\"content\":{},\"description\":\"forbidden\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/myProfile", "segments": [{ "lit": "myProfile" }], "select": { "exist": ["authorization"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "token", "orig": "token", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /emailVerification/{token}", "json": "{\"operationId\":\"getEmailVerification\",\"parameters\":[{\"description\":\"email verification token\",\"in\":\"path\",\"name\":\"token\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"text/plain\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"email successfully verified\"},\"404\":{\"content\":{},\"description\":\"token not found, verification failed\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/emailVerification/{token}", "segments": [{ "lit": "emailVerification" }, { "var": "token" }], "select": { "exist": ["token"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "active": true, "args": { "header": [{ "active": true, "kind": "header", "name": "authorization", "orig": "authorization", "reqd": true, "type": "`$STRING`" }] }, "contract": { "id": "DELETE /myProfile", "json": "{\"operationId\":\"deleteMyProfile\",\"parameters\":[{\"description\":\"JWT authorization\\n\",\"in\":\"header\",\"name\":\"Authorization\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"delete action has been enacted, no further information\"},\"401\":{\"content\":{},\"description\":\"authorization failed\"},\"403\":{\"content\":{},\"description\":\"forbidden\"},\"default\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"General error message\",\"properties\":{\"error\":{\"type\":\"string\"},\"message\":{\"type\":\"string\"},\"path\":{\"type\":\"string\"},\"status\":{\"format\":\"int32\",\"type\":\"integer\"},\"timestamp\":{\"format\":\"int64\",\"type\":\"integer\"}},\"required\":[\"status\",\"message\"],\"type\":\"object\"}}},\"description\":\"Unexpected error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "DELETE", "orig": "/myProfile", "segments": [{ "lit": "myProfile" }], "select": { "exist": ["authorization"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["email_verification"]] }, "key$": "profile", "name__orig": "profile", "Name": "Profile", "name_": "profile", "name-": "profile", "NAME": "PROFILE", "index$": 13 }, { "active": true, "entity": "profile", "key$": "BasicProfileFlow", "kind": "basic", "name": "BasicProfileFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "profile_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "profile_ref01", "srcdatavar": "profile_ref01_data", "suffix": "_dt0" }, "match": { "id": "profile01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-profile_ref01" } }], "index$": 1 }, { "active": true, "data": {}, "input": { "ref": "profile_ref01", "suffix": "_rm0" }, "match": {}, "op": "remove", "spec": [], "valid": [], "index$": 2 }] }, 'Profile');
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
    let idmap = transform(['profile01', 'profile02', 'profile03', 'email_verification01', 'email_verification02', 'email_verification03'], {
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