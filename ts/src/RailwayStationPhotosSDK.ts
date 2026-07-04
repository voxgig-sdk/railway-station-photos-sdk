// RailwayStationPhotos Ts SDK

import { AdminInboxEntity } from './entity/AdminInboxEntity'
import { CountryEntity } from './entity/CountryEntity'
import { InboxEntity } from './entity/InboxEntity'
import { InboxCountEntity } from './entity/InboxCountEntity'
import { InboxEntryEntity } from './entity/InboxEntryEntity'
import { InboxStateQueryEntity } from './entity/InboxStateQueryEntity'
import { OAuthTokenEntity } from './entity/OAuthTokenEntity'
import { OauthEntity } from './entity/OauthEntity'
import { PhotoEntity } from './entity/PhotoEntity'
import { PhotoDownloadEntity } from './entity/PhotoDownloadEntity'
import { PhotoStationEntity } from './entity/PhotoStationEntity'
import { PhotoUploadEntity } from './entity/PhotoUploadEntity'
import { PhotographerEntity } from './entity/PhotographerEntity'
import { ProfileEntity } from './entity/ProfileEntity'
import { PublicInboxEntity } from './entity/PublicInboxEntity'
import { StatEntity } from './entity/StatEntity'

export type * from './RailwayStationPhotosTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { RailwayStationPhotosEntityBase } from './RailwayStationPhotosEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class RailwayStationPhotosSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
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
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _admin_inbox?: AdminInboxEntity

  // Idiomatic facade: `client.admin_inbox.list()` / `client.admin_inbox.load({ id })`.
  get admin_inbox(): AdminInboxEntity {
    return (this._admin_inbox ??= new AdminInboxEntity(this, undefined))
  }

  /** @deprecated Use `client.admin_inbox` instead. */
  AdminInbox(data?: any) {
    const self = this
    return new AdminInboxEntity(self,data)
  }


  _country?: CountryEntity

  // Idiomatic facade: `client.country.list()` / `client.country.load({ id })`.
  get country(): CountryEntity {
    return (this._country ??= new CountryEntity(this, undefined))
  }

  /** @deprecated Use `client.country` instead. */
  Country(data?: any) {
    const self = this
    return new CountryEntity(self,data)
  }


  _inbox?: InboxEntity

  // Idiomatic facade: `client.inbox.list()` / `client.inbox.load({ id })`.
  get inbox(): InboxEntity {
    return (this._inbox ??= new InboxEntity(this, undefined))
  }

  /** @deprecated Use `client.inbox` instead. */
  Inbox(data?: any) {
    const self = this
    return new InboxEntity(self,data)
  }


  _inbox_count?: InboxCountEntity

  // Idiomatic facade: `client.inbox_count.list()` / `client.inbox_count.load({ id })`.
  get inbox_count(): InboxCountEntity {
    return (this._inbox_count ??= new InboxCountEntity(this, undefined))
  }

  /** @deprecated Use `client.inbox_count` instead. */
  InboxCount(data?: any) {
    const self = this
    return new InboxCountEntity(self,data)
  }


  _inbox_entry?: InboxEntryEntity

  // Idiomatic facade: `client.inbox_entry.list()` / `client.inbox_entry.load({ id })`.
  get inbox_entry(): InboxEntryEntity {
    return (this._inbox_entry ??= new InboxEntryEntity(this, undefined))
  }

  /** @deprecated Use `client.inbox_entry` instead. */
  InboxEntry(data?: any) {
    const self = this
    return new InboxEntryEntity(self,data)
  }


  _inbox_state_query?: InboxStateQueryEntity

  // Idiomatic facade: `client.inbox_state_query.list()` / `client.inbox_state_query.load({ id })`.
  get inbox_state_query(): InboxStateQueryEntity {
    return (this._inbox_state_query ??= new InboxStateQueryEntity(this, undefined))
  }

  /** @deprecated Use `client.inbox_state_query` instead. */
  InboxStateQuery(data?: any) {
    const self = this
    return new InboxStateQueryEntity(self,data)
  }


  _o_auth_token?: OAuthTokenEntity

  // Idiomatic facade: `client.o_auth_token.list()` / `client.o_auth_token.load({ id })`.
  get o_auth_token(): OAuthTokenEntity {
    return (this._o_auth_token ??= new OAuthTokenEntity(this, undefined))
  }

  /** @deprecated Use `client.o_auth_token` instead. */
  OAuthToken(data?: any) {
    const self = this
    return new OAuthTokenEntity(self,data)
  }


  _oauth?: OauthEntity

  // Idiomatic facade: `client.oauth.list()` / `client.oauth.load({ id })`.
  get oauth(): OauthEntity {
    return (this._oauth ??= new OauthEntity(this, undefined))
  }

  /** @deprecated Use `client.oauth` instead. */
  Oauth(data?: any) {
    const self = this
    return new OauthEntity(self,data)
  }


  _photo?: PhotoEntity

  // Idiomatic facade: `client.photo.list()` / `client.photo.load({ id })`.
  get photo(): PhotoEntity {
    return (this._photo ??= new PhotoEntity(this, undefined))
  }

  /** @deprecated Use `client.photo` instead. */
  Photo(data?: any) {
    const self = this
    return new PhotoEntity(self,data)
  }


  _photo_download?: PhotoDownloadEntity

  // Idiomatic facade: `client.photo_download.list()` / `client.photo_download.load({ id })`.
  get photo_download(): PhotoDownloadEntity {
    return (this._photo_download ??= new PhotoDownloadEntity(this, undefined))
  }

  /** @deprecated Use `client.photo_download` instead. */
  PhotoDownload(data?: any) {
    const self = this
    return new PhotoDownloadEntity(self,data)
  }


  _photo_station?: PhotoStationEntity

  // Idiomatic facade: `client.photo_station.list()` / `client.photo_station.load({ id })`.
  get photo_station(): PhotoStationEntity {
    return (this._photo_station ??= new PhotoStationEntity(this, undefined))
  }

  /** @deprecated Use `client.photo_station` instead. */
  PhotoStation(data?: any) {
    const self = this
    return new PhotoStationEntity(self,data)
  }


  _photo_upload?: PhotoUploadEntity

  // Idiomatic facade: `client.photo_upload.list()` / `client.photo_upload.load({ id })`.
  get photo_upload(): PhotoUploadEntity {
    return (this._photo_upload ??= new PhotoUploadEntity(this, undefined))
  }

  /** @deprecated Use `client.photo_upload` instead. */
  PhotoUpload(data?: any) {
    const self = this
    return new PhotoUploadEntity(self,data)
  }


  _photographer?: PhotographerEntity

  // Idiomatic facade: `client.photographer.list()` / `client.photographer.load({ id })`.
  get photographer(): PhotographerEntity {
    return (this._photographer ??= new PhotographerEntity(this, undefined))
  }

  /** @deprecated Use `client.photographer` instead. */
  Photographer(data?: any) {
    const self = this
    return new PhotographerEntity(self,data)
  }


  _profile?: ProfileEntity

  // Idiomatic facade: `client.profile.list()` / `client.profile.load({ id })`.
  get profile(): ProfileEntity {
    return (this._profile ??= new ProfileEntity(this, undefined))
  }

  /** @deprecated Use `client.profile` instead. */
  Profile(data?: any) {
    const self = this
    return new ProfileEntity(self,data)
  }


  _public_inbox?: PublicInboxEntity

  // Idiomatic facade: `client.public_inbox.list()` / `client.public_inbox.load({ id })`.
  get public_inbox(): PublicInboxEntity {
    return (this._public_inbox ??= new PublicInboxEntity(this, undefined))
  }

  /** @deprecated Use `client.public_inbox` instead. */
  PublicInbox(data?: any) {
    const self = this
    return new PublicInboxEntity(self,data)
  }


  _stat?: StatEntity

  // Idiomatic facade: `client.stat.list()` / `client.stat.load({ id })`.
  get stat(): StatEntity {
    return (this._stat ??= new StatEntity(this, undefined))
  }

  /** @deprecated Use `client.stat` instead. */
  Stat(data?: any) {
    const self = this
    return new StatEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new RailwayStationPhotosSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return RailwayStationPhotosSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'RailwayStationPhotos' }
  }

  toString() {
    return 'RailwayStationPhotos ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = RailwayStationPhotosSDK


export {
  stdutil,

  BaseFeature,
  RailwayStationPhotosEntityBase,

  RailwayStationPhotosSDK,
  SDK,
}


