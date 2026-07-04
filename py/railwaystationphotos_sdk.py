# RailwayStationPhotos SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import RailwayStationPhotosUtility
from core.spec import RailwayStationPhotosSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import RailwayStationPhotosBaseFeature
from features import _make_feature


class RailwayStationPhotosSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = RailwayStationPhotosUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return RailwayStationPhotosUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = RailwayStationPhotosSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def admin_inbox(self):
        """Idiomatic facade: client.admin_inbox.list() / client.admin_inbox.load({"id": ...})."""
        from entity.admin_inbox_entity import AdminInboxEntity
        cached = getattr(self, "_admin_inbox", None)
        if cached is None:
            cached = AdminInboxEntity(self, None)
            self._admin_inbox = cached
        return cached

    def AdminInbox(self, data=None):
        # Deprecated: use client.admin_inbox instead.
        from entity.admin_inbox_entity import AdminInboxEntity
        return AdminInboxEntity(self, data)


    @property
    def country(self):
        """Idiomatic facade: client.country.list() / client.country.load({"id": ...})."""
        from entity.country_entity import CountryEntity
        cached = getattr(self, "_country", None)
        if cached is None:
            cached = CountryEntity(self, None)
            self._country = cached
        return cached

    def Country(self, data=None):
        # Deprecated: use client.country instead.
        from entity.country_entity import CountryEntity
        return CountryEntity(self, data)


    @property
    def inbox(self):
        """Idiomatic facade: client.inbox.list() / client.inbox.load({"id": ...})."""
        from entity.inbox_entity import InboxEntity
        cached = getattr(self, "_inbox", None)
        if cached is None:
            cached = InboxEntity(self, None)
            self._inbox = cached
        return cached

    def Inbox(self, data=None):
        # Deprecated: use client.inbox instead.
        from entity.inbox_entity import InboxEntity
        return InboxEntity(self, data)


    @property
    def inbox_count(self):
        """Idiomatic facade: client.inbox_count.list() / client.inbox_count.load({"id": ...})."""
        from entity.inbox_count_entity import InboxCountEntity
        cached = getattr(self, "_inbox_count", None)
        if cached is None:
            cached = InboxCountEntity(self, None)
            self._inbox_count = cached
        return cached

    def InboxCount(self, data=None):
        # Deprecated: use client.inbox_count instead.
        from entity.inbox_count_entity import InboxCountEntity
        return InboxCountEntity(self, data)


    @property
    def inbox_entry(self):
        """Idiomatic facade: client.inbox_entry.list() / client.inbox_entry.load({"id": ...})."""
        from entity.inbox_entry_entity import InboxEntryEntity
        cached = getattr(self, "_inbox_entry", None)
        if cached is None:
            cached = InboxEntryEntity(self, None)
            self._inbox_entry = cached
        return cached

    def InboxEntry(self, data=None):
        # Deprecated: use client.inbox_entry instead.
        from entity.inbox_entry_entity import InboxEntryEntity
        return InboxEntryEntity(self, data)


    @property
    def inbox_state_query(self):
        """Idiomatic facade: client.inbox_state_query.list() / client.inbox_state_query.load({"id": ...})."""
        from entity.inbox_state_query_entity import InboxStateQueryEntity
        cached = getattr(self, "_inbox_state_query", None)
        if cached is None:
            cached = InboxStateQueryEntity(self, None)
            self._inbox_state_query = cached
        return cached

    def InboxStateQuery(self, data=None):
        # Deprecated: use client.inbox_state_query instead.
        from entity.inbox_state_query_entity import InboxStateQueryEntity
        return InboxStateQueryEntity(self, data)


    @property
    def o_auth_token(self):
        """Idiomatic facade: client.o_auth_token.list() / client.o_auth_token.load({"id": ...})."""
        from entity.o_auth_token_entity import OAuthTokenEntity
        cached = getattr(self, "_o_auth_token", None)
        if cached is None:
            cached = OAuthTokenEntity(self, None)
            self._o_auth_token = cached
        return cached

    def OAuthToken(self, data=None):
        # Deprecated: use client.o_auth_token instead.
        from entity.o_auth_token_entity import OAuthTokenEntity
        return OAuthTokenEntity(self, data)


    @property
    def oauth(self):
        """Idiomatic facade: client.oauth.list() / client.oauth.load({"id": ...})."""
        from entity.oauth_entity import OauthEntity
        cached = getattr(self, "_oauth", None)
        if cached is None:
            cached = OauthEntity(self, None)
            self._oauth = cached
        return cached

    def Oauth(self, data=None):
        # Deprecated: use client.oauth instead.
        from entity.oauth_entity import OauthEntity
        return OauthEntity(self, data)


    @property
    def photo(self):
        """Idiomatic facade: client.photo.list() / client.photo.load({"id": ...})."""
        from entity.photo_entity import PhotoEntity
        cached = getattr(self, "_photo", None)
        if cached is None:
            cached = PhotoEntity(self, None)
            self._photo = cached
        return cached

    def Photo(self, data=None):
        # Deprecated: use client.photo instead.
        from entity.photo_entity import PhotoEntity
        return PhotoEntity(self, data)


    @property
    def photo_download(self):
        """Idiomatic facade: client.photo_download.list() / client.photo_download.load({"id": ...})."""
        from entity.photo_download_entity import PhotoDownloadEntity
        cached = getattr(self, "_photo_download", None)
        if cached is None:
            cached = PhotoDownloadEntity(self, None)
            self._photo_download = cached
        return cached

    def PhotoDownload(self, data=None):
        # Deprecated: use client.photo_download instead.
        from entity.photo_download_entity import PhotoDownloadEntity
        return PhotoDownloadEntity(self, data)


    @property
    def photo_station(self):
        """Idiomatic facade: client.photo_station.list() / client.photo_station.load({"id": ...})."""
        from entity.photo_station_entity import PhotoStationEntity
        cached = getattr(self, "_photo_station", None)
        if cached is None:
            cached = PhotoStationEntity(self, None)
            self._photo_station = cached
        return cached

    def PhotoStation(self, data=None):
        # Deprecated: use client.photo_station instead.
        from entity.photo_station_entity import PhotoStationEntity
        return PhotoStationEntity(self, data)


    @property
    def photo_upload(self):
        """Idiomatic facade: client.photo_upload.list() / client.photo_upload.load({"id": ...})."""
        from entity.photo_upload_entity import PhotoUploadEntity
        cached = getattr(self, "_photo_upload", None)
        if cached is None:
            cached = PhotoUploadEntity(self, None)
            self._photo_upload = cached
        return cached

    def PhotoUpload(self, data=None):
        # Deprecated: use client.photo_upload instead.
        from entity.photo_upload_entity import PhotoUploadEntity
        return PhotoUploadEntity(self, data)


    @property
    def photographer(self):
        """Idiomatic facade: client.photographer.list() / client.photographer.load({"id": ...})."""
        from entity.photographer_entity import PhotographerEntity
        cached = getattr(self, "_photographer", None)
        if cached is None:
            cached = PhotographerEntity(self, None)
            self._photographer = cached
        return cached

    def Photographer(self, data=None):
        # Deprecated: use client.photographer instead.
        from entity.photographer_entity import PhotographerEntity
        return PhotographerEntity(self, data)


    @property
    def profile(self):
        """Idiomatic facade: client.profile.list() / client.profile.load({"id": ...})."""
        from entity.profile_entity import ProfileEntity
        cached = getattr(self, "_profile", None)
        if cached is None:
            cached = ProfileEntity(self, None)
            self._profile = cached
        return cached

    def Profile(self, data=None):
        # Deprecated: use client.profile instead.
        from entity.profile_entity import ProfileEntity
        return ProfileEntity(self, data)


    @property
    def public_inbox(self):
        """Idiomatic facade: client.public_inbox.list() / client.public_inbox.load({"id": ...})."""
        from entity.public_inbox_entity import PublicInboxEntity
        cached = getattr(self, "_public_inbox", None)
        if cached is None:
            cached = PublicInboxEntity(self, None)
            self._public_inbox = cached
        return cached

    def PublicInbox(self, data=None):
        # Deprecated: use client.public_inbox instead.
        from entity.public_inbox_entity import PublicInboxEntity
        return PublicInboxEntity(self, data)


    @property
    def stat(self):
        """Idiomatic facade: client.stat.list() / client.stat.load({"id": ...})."""
        from entity.stat_entity import StatEntity
        cached = getattr(self, "_stat", None)
        if cached is None:
            cached = StatEntity(self, None)
            self._stat = cached
        return cached

    def Stat(self, data=None):
        # Deprecated: use client.stat instead.
        from entity.stat_entity import StatEntity
        return StatEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
