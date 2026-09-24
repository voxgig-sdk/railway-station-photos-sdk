"use strict";
// RailwayStationPhotos Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.RailwayStationPhotosSDK = exports.RailwayStationPhotosEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const AdminInboxEntity_1 = require("./entity/AdminInboxEntity");
const CountryEntity_1 = require("./entity/CountryEntity");
const InboxEntity_1 = require("./entity/InboxEntity");
const InboxCountEntity_1 = require("./entity/InboxCountEntity");
const InboxEntryEntity_1 = require("./entity/InboxEntryEntity");
const OAuthTokenEntity_1 = require("./entity/OAuthTokenEntity");
const OauthEntity_1 = require("./entity/OauthEntity");
const PhotoEntity_1 = require("./entity/PhotoEntity");
const PhotoDownloadEntity_1 = require("./entity/PhotoDownloadEntity");
const PhotoStationByIdEntity_1 = require("./entity/PhotoStationByIdEntity");
const PhotoStationsByCountryEntity_1 = require("./entity/PhotoStationsByCountryEntity");
const PhotoStationsByPhotographerEntity_1 = require("./entity/PhotoStationsByPhotographerEntity");
const PhotoStationsByRecentPhotoImportEntity_1 = require("./entity/PhotoStationsByRecentPhotoImportEntity");
const PhotoUploadEntity_1 = require("./entity/PhotoUploadEntity");
const PhotographerEntity_1 = require("./entity/PhotographerEntity");
const ProfileEntity_1 = require("./entity/ProfileEntity");
const PublicInboxEntity_1 = require("./entity/PublicInboxEntity");
const StatEntity_1 = require("./entity/StatEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const RailwayStationPhotosEntityBase_1 = require("./RailwayStationPhotosEntityBase");
Object.defineProperty(exports, "RailwayStationPhotosEntityBase", { enumerable: true, get: function () { return RailwayStationPhotosEntityBase_1.RailwayStationPhotosEntityBase; } });
const Utility_1 = require("./utility/Utility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class RailwayStationPhotosSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method: fetchargs.method || 'GET',
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!this._options.allow.op.includes('direct')) {
            return {
                ok: false,
                err: new Error('RailwayStationPhotosSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return fetchdef;
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: fetched };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            if (!noBody) {
                try {
                    json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                }
                catch (parseErr) {
                    // Body wasn't valid JSON — surface the raw response rather than
                    // throwing. data stays undefined; callers can inspect status/headers.
                    json = undefined;
                }
            }
            return {
                ok: status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
            };
        }
        catch (err) {
            return { ok: false, err };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!options.allow.op.includes('graphql')) {
            return {
                ok: false,
                err: new Error('RailwayStationPhotosSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        if (res instanceof Error) {
            return res;
        }
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('RailwayStationPhotosSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.AdminInbox().list()` / `client.AdminInbox().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AdminInbox(entopts) {
        const self = this;
        return new AdminInboxEntity_1.AdminInboxEntity(self, entopts);
    }
    // Entity access: `client.Country().list()` / `client.Country().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Country(entopts) {
        const self = this;
        return new CountryEntity_1.CountryEntity(self, entopts);
    }
    // Entity access: `client.Inbox().list()` / `client.Inbox().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Inbox(entopts) {
        const self = this;
        return new InboxEntity_1.InboxEntity(self, entopts);
    }
    // Entity access: `client.InboxCount().list()` / `client.InboxCount().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    InboxCount(entopts) {
        const self = this;
        return new InboxCountEntity_1.InboxCountEntity(self, entopts);
    }
    // Entity access: `client.InboxEntry().list()` / `client.InboxEntry().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    InboxEntry(entopts) {
        const self = this;
        return new InboxEntryEntity_1.InboxEntryEntity(self, entopts);
    }
    // Entity access: `client.OAuthToken().list()` / `client.OAuthToken().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    OAuthToken(entopts) {
        const self = this;
        return new OAuthTokenEntity_1.OAuthTokenEntity(self, entopts);
    }
    // Entity access: `client.Oauth().list()` / `client.Oauth().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Oauth(entopts) {
        const self = this;
        return new OauthEntity_1.OauthEntity(self, entopts);
    }
    // Entity access: `client.Photo().list()` / `client.Photo().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Photo(entopts) {
        const self = this;
        return new PhotoEntity_1.PhotoEntity(self, entopts);
    }
    // Entity access: `client.PhotoDownload().list()` / `client.PhotoDownload().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PhotoDownload(entopts) {
        const self = this;
        return new PhotoDownloadEntity_1.PhotoDownloadEntity(self, entopts);
    }
    // Entity access: `client.PhotoStationById().list()` / `client.PhotoStationById().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PhotoStationById(entopts) {
        const self = this;
        return new PhotoStationByIdEntity_1.PhotoStationByIdEntity(self, entopts);
    }
    // Entity access: `client.PhotoStationsByCountry().list()` / `client.PhotoStationsByCountry().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PhotoStationsByCountry(entopts) {
        const self = this;
        return new PhotoStationsByCountryEntity_1.PhotoStationsByCountryEntity(self, entopts);
    }
    // Entity access: `client.PhotoStationsByPhotographer().list()` / `client.PhotoStationsByPhotographer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PhotoStationsByPhotographer(entopts) {
        const self = this;
        return new PhotoStationsByPhotographerEntity_1.PhotoStationsByPhotographerEntity(self, entopts);
    }
    // Entity access: `client.PhotoStationsByRecentPhotoImport().list()` / `client.PhotoStationsByRecentPhotoImport().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PhotoStationsByRecentPhotoImport(entopts) {
        const self = this;
        return new PhotoStationsByRecentPhotoImportEntity_1.PhotoStationsByRecentPhotoImportEntity(self, entopts);
    }
    // Entity access: `client.PhotoUpload().list()` / `client.PhotoUpload().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PhotoUpload(entopts) {
        const self = this;
        return new PhotoUploadEntity_1.PhotoUploadEntity(self, entopts);
    }
    // Entity access: `client.Photographer().list()` / `client.Photographer().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Photographer(entopts) {
        const self = this;
        return new PhotographerEntity_1.PhotographerEntity(self, entopts);
    }
    // Entity access: `client.Profile().list()` / `client.Profile().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Profile(entopts) {
        const self = this;
        return new ProfileEntity_1.ProfileEntity(self, entopts);
    }
    // Entity access: `client.PublicInbox().list()` / `client.PublicInbox().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    PublicInbox(entopts) {
        const self = this;
        return new PublicInboxEntity_1.PublicInboxEntity(self, entopts);
    }
    // Entity access: `client.Stat().list()` / `client.Stat().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Stat(entopts) {
        const self = this;
        return new StatEntity_1.StatEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new RailwayStationPhotosSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return RailwayStationPhotosSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'RailwayStationPhotos' };
    }
    toString() {
        return 'RailwayStationPhotos ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.RailwayStationPhotosSDK = RailwayStationPhotosSDK;
const SDK = RailwayStationPhotosSDK;
exports.SDK = SDK;
//# sourceMappingURL=RailwayStationPhotosSDK.js.map