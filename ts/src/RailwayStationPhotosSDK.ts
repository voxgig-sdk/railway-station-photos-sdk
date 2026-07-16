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

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

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



  // Entity access: `client.AdminInbox().list()` / `client.AdminInbox().load({ id })`.
  AdminInbox(data?: any) {
    const self = this
    return new AdminInboxEntity(self,data)
  }


  // Entity access: `client.Country().list()` / `client.Country().load({ id })`.
  Country(data?: any) {
    const self = this
    return new CountryEntity(self,data)
  }


  // Entity access: `client.Inbox().list()` / `client.Inbox().load({ id })`.
  Inbox(data?: any) {
    const self = this
    return new InboxEntity(self,data)
  }


  // Entity access: `client.InboxCount().list()` / `client.InboxCount().load({ id })`.
  InboxCount(data?: any) {
    const self = this
    return new InboxCountEntity(self,data)
  }


  // Entity access: `client.InboxEntry().list()` / `client.InboxEntry().load({ id })`.
  InboxEntry(data?: any) {
    const self = this
    return new InboxEntryEntity(self,data)
  }


  // Entity access: `client.InboxStateQuery().list()` / `client.InboxStateQuery().load({ id })`.
  InboxStateQuery(data?: any) {
    const self = this
    return new InboxStateQueryEntity(self,data)
  }


  // Entity access: `client.OAuthToken().list()` / `client.OAuthToken().load({ id })`.
  OAuthToken(data?: any) {
    const self = this
    return new OAuthTokenEntity(self,data)
  }


  // Entity access: `client.Oauth().list()` / `client.Oauth().load({ id })`.
  Oauth(data?: any) {
    const self = this
    return new OauthEntity(self,data)
  }


  // Entity access: `client.Photo().list()` / `client.Photo().load({ id })`.
  Photo(data?: any) {
    const self = this
    return new PhotoEntity(self,data)
  }


  // Entity access: `client.PhotoDownload().list()` / `client.PhotoDownload().load({ id })`.
  PhotoDownload(data?: any) {
    const self = this
    return new PhotoDownloadEntity(self,data)
  }


  // Entity access: `client.PhotoStation().list()` / `client.PhotoStation().load({ id })`.
  PhotoStation(data?: any) {
    const self = this
    return new PhotoStationEntity(self,data)
  }


  // Entity access: `client.PhotoUpload().list()` / `client.PhotoUpload().load({ id })`.
  PhotoUpload(data?: any) {
    const self = this
    return new PhotoUploadEntity(self,data)
  }


  // Entity access: `client.Photographer().list()` / `client.Photographer().load({ id })`.
  Photographer(data?: any) {
    const self = this
    return new PhotographerEntity(self,data)
  }


  // Entity access: `client.Profile().list()` / `client.Profile().load({ id })`.
  Profile(data?: any) {
    const self = this
    return new ProfileEntity(self,data)
  }


  // Entity access: `client.PublicInbox().list()` / `client.PublicInbox().load({ id })`.
  PublicInbox(data?: any) {
    const self = this
    return new PublicInboxEntity(self,data)
  }


  // Entity access: `client.Stat().list()` / `client.Stat().load({ id })`.
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
  config,

  BaseFeature,
  RailwayStationPhotosEntityBase,

  RailwayStationPhotosSDK,
  SDK,
}


