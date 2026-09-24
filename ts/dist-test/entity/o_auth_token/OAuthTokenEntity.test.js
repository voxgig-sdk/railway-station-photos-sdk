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
(0, node_test_1.describe)('OAuthTokenEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when RAILWAY_STATION_PHOTOS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('RAILWAY_STATION_PHOTOS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.RailwayStationPhotosSDK.test();
        const ent = testsdk.OAuthToken();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.RAILWAY_STATION_PHOTOS_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'o_auth_token.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "access_token": { "a": true, "h": "Access Token", "n": "access_token", "r": true, "t": "`$STRING`", "key$": "access_token", "index$": 0 }, "expires_in": { "a": true, "fo": "int64", "h": "Expires In", "n": "expires_in", "r": false, "t": "`$INTEGER`", "key$": "expires_in", "index$": 1 }, "refresh_token": { "a": true, "h": "Refresh Token", "n": "refresh_token", "r": false, "t": "`$STRING`", "key$": "refresh_token", "index$": 2 }, "scope": { "a": true, "h": "Scope", "n": "scope", "r": true, "t": "`$STRING`", "key$": "scope", "index$": 3 }, "token_type": { "a": true, "h": "Token Type", "n": "token_type", "r": true, "t": "`$STRING`", "key$": "token_type", "index$": 4 } }, "name": "o_auth_token", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /oauth2/token", "source": "openapi3", "version": 2 }, "g": { "header": [{ "a": true, "k": "header", "n": "authorization", "or": "authorization", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/oauth2/token", "q": { "exist": ["authorization"] }, "r": {}, "s": [{ "lit": "oauth2" }, { "lit": "token" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "o_auth_token", "name__orig": "o_auth_token", "Name": "OAuthToken", "name_": "o_auth_token", "name-": "o-auth-token", "NAME": "O_AUTH_TOKEN", "index$": 5 }, { "active": true, "entity": "o_auth_token", "key$": "BasicOAuthTokenFlow", "kind": "basic", "name": "BasicOAuthTokenFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "o_auth_token_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'OAuthToken', { "POST /oauth2/token": { "protocol": "http", "operationId": "postOAuth2Token", "requestBody": { "required": true, "description": "OAuth token request body", "content": { "application/x-www-form-urlencoded": { "schema": { "description": "OAuth2 token request", "type": "object", "properties": { "grant_type": { "type": "string", "enum": ["authorization_code", "refresh_token"] }, "refresh_token": { "type": "string" }, "code": { "type": "string" }, "client_id": { "type": "string" }, "redirect_uri": { "type": "string", "format": "uri" }, "code_verifier": { "type": "string" } }, "required": ["grant_type", "client_id", "redirect_uri"], "x-ref": "#/components/schemas/OAuthTokenRequest" } } } }, "responses": { "200": { "description": "successful token request", "content": { "application/json": { "schema": { "description": "OAuth2 token response", "type": "object", "properties": { "access_token": { "type": "string", "key$": "access_token" }, "refresh_token": { "type": "string", "key$": "refresh_token" }, "scope": { "type": "string", "key$": "scope" }, "token_type": { "type": "string", "enum": ["Bearer"], "key$": "token_type" }, "expires_in": { "type": "integer", "format": "int64", "key$": "expires_in" } }, "required": ["access_token", "scope", "token_type"], "x-ref": "#/components/schemas/OAuthTokenResponse", "index$": 0 } } } }, "default": { "description": "Unexpected error", "content": { "application/json": { "schema": { "description": "General error message", "type": "object", "properties": { "timestamp": { "type": "integer", "format": "int64" }, "status": { "type": "integer", "format": "int32" }, "error": { "type": "string" }, "message": { "type": "string" }, "path": { "type": "string" } }, "required": ["status", "message"], "x-ref": "#/components/schemas/GeneralErrorMessage" } } } } }, "parameters": [{ "name": "Authorization", "in": "header", "description": "JWT authorization\n", "required": true, "schema": { "type": "string" }, "x-ref": "#/components/parameters/Authorization", "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const o_auth_token_ref01_ent = client.OAuthToken();
        let o_auth_token_ref01_data = setup.data.new.o_auth_token['o_auth_token_ref01'];
        o_auth_token_ref01_data = (await o_auth_token_ref01_ent.create(o_auth_token_ref01_data)).data();
        (0, node_assert_1.default)(null != o_auth_token_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/o_auth_token/OAuthTokenTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.RailwayStationPhotosSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['o_auth_token01', 'o_auth_token02', 'o_auth_token03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'RAILWAY_STATION_PHOTOS_TEST_O_AUTH_TOKEN_ENTID': idmap,
        'RAILWAY_STATION_PHOTOS_TEST_LIVE': 'FALSE',
        'RAILWAY_STATION_PHOTOS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['RAILWAY_STATION_PHOTOS_TEST_O_AUTH_TOKEN_ENTID'];
    const live = 'TRUE' === env.RAILWAY_STATION_PHOTOS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['RAILWAY_STATION_PHOTOS_TEST_O_AUTH_TOKEN_ENTID'];
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
//# sourceMappingURL=OAuthTokenEntity.test.js.map