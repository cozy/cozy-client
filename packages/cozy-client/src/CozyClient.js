import mapValues from 'lodash/mapValues'
import fromPairs from 'lodash/fromPairs'
import flatten from 'lodash/flatten'
import uniqBy from 'lodash/uniqBy'
import zip from 'lodash/zip'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import MicroEE from 'microee'

import CozyStackClient, { OAuthClient } from 'cozy-stack-client'

import { REGISTRATION_ABORT } from './const'

import StackLink from './StackLink'
import { create as createAssociation } from './associations'
import {
  responseToRelationship,
  attachRelationships
} from './associations/helpers'
import { dehydrate } from './helpers'
import { QueryDefinition, Mutations, Q } from './queries/dsl'
import { authFunction } from './authentication/mobile'
import optimizeQueryDefinitions from './queries/optimize'
import {
  default as reducer,
  createStore,
  initQuery,
  loadQuery,
  receiveQueryResult,
  receiveQueryError,
  initMutation,
  receiveMutationResult,
  receiveMutationError,
  getQueryFromState,
  getRawQueryFromState,
  getCollectionFromState,
  getDocumentFromState,
  resetState
} from './store'
import fetchPolicies from './policies'
import Schema from './Schema'
import { chain } from './CozyLink'
import ObservableQuery from './ObservableQuery'
import { CozyClient as SnapshotClient } from './testing/snapshots'
import logger from './logger'
import {
  AppMetadata,
  ClientCapabilities,
  ClientResponse,
  CozyClientDocument,
  DocumentCollection,
  HydratedDocument,
  Link,
  Mutation,
  NodeEnvironment,
  OldCozyClient,
  OpenURLCallback,
  PKCECodes,
  QueryOptions,
  QueryResult,
  QueryState,
  ReduxStore,
  ReferenceMap,
  SessionCode,
  Token
} from './types'
import { QueryIDGenerator } from './store/queries'
import stringify from 'json-stable-stringify'
import PromiseCache from './promise-cache'

import { certifyFlagship } from './flagship-certification/flagship-certification'

const ensureArray = arr => (Array.isArray(arr) ? arr : [arr])

const deprecatedHandler = msg => ({
  get(target, prop) {
    console.warn(msg)
    return target[prop]
  }
})

const supportsReferences = relationshipClass => {
  return (
    relationshipClass.prototype.addReferences &&
    relationshipClass.prototype.removeReferences
  )
}

const referencesUnsupportedError = relationshipClassName => {
  return new Error(
    `The "${relationshipClassName}" relationship does not support references. If you need to add references to a document, its relationship class must have the methods {add,remove}References`
  )
}

const securiseUri = uri => {
  if (
    uri &&
    typeof window !== 'undefined' &&
    window['cozy']?.isSecureProtocol
  ) {
    const secureUrl = new URL(uri)
    secureUrl.protocol = 'https:'

    return secureUrl.toString()
  }

  return uri
}

const DOC_CREATION = 'creation'
const DOC_UPDATE = 'update'

/**
 * @typedef {object} ClientOptions
 * @property {object} [client]
 * @property {object} [link]
 * @property {object} [links]
 * @property {Token} [token]
 * @property {string} [uri]
 * @property {object} [stackClient]
 * @property {boolean} [warningForCustomHandlers]
 * @property {boolean} [autoHydrate]
 * @property {object} [oauth]
 * @property {Function} [onTokenRefresh]
 * @property {Function} [onError] - Default callback if a query is errored
 * @property  {Link}         [link]   - Backward compatibility
 * @property  {Array<Link>}  [links]  - List of links
 * @property  {object}       [schema] - Schema description for each doctypes
 * @property  {AppMetadata}  [appMetadata] - Metadata about the application that will be used in ensureCozyMetadata
 * @property  {ClientCapabilities} [capabilities] - Capabilities sent by the stack
 * @property  {boolean} [store] - If set to false, the client will not instantiate a Redux store automatically. Use this if you want to merge cozy-client's store with your own redux store. See [here](https://docs.cozy.io/en/cozy-client/react-integration/#1b-use-your-own-redux-store) for more information.
 */

/**
 * Responsible for
 *
 * - Creating observable queries
 * - Hydration
 * - Creating plan for saving documents
 * - Associations
 */
class CozyClient {
  /**
   * @param  {ClientOptions} rawOptions - Options
   *
   * @example
   * ```js
   * const client = new CozyClient({
   *   schema: {
   *     todos: {
   *       doctype: 'io.cozy.todos',
   *       relationships: {
   *         authors: {
   *           type: 'has-many',
   *           doctype: 'io.cozy.persons'
   *         }
   *       }
   *     }
   *   }
   * })
   * ```
   *
   * Cozy-Client will automatically call `this.login()` if provided with a token and an uri
   */
  constructor(rawOptions = {}) {
    const {
      link,
      links,
      schema = {},
      appMetadata = {},
      capabilities,
      ...options
    } = rawOptions
    if (link) {
      console.warn('`link` is deprecated, use `links`')
    }

    this.appMetadata = appMetadata

    options.uri = securiseUri(options.uri)

    this.options = options

    this.queryIdGenerator = new QueryIDGenerator()
    this.isLogged = false
    this.instanceOptions = {}

    // Bind handlers
    this.handleRevocationChange = this.handleRevocationChange.bind(this)
    this.handleTokenRefresh = this.handleTokenRefresh.bind(this)

    this.createClient()
    const stackClient = this.getStackClient()
    stackClient.on('error', (...args) => this.emit('error', ...args))

    this.links = ensureArray(link || links || new StackLink())
    this.registerClientOnLinks()

    this.chain = chain(this.links)

    this.schema = new Schema(schema, stackClient)

    /**
     * @type {ClientCapabilities}
     */
    this.capabilities = capabilities || null

    // Instances of plugins registered with registerPlugin
    this.plugins = {}

    try {
      this.loadInstanceOptionsFromDOM()
    } catch (err) {
      // not a critical error, we may be in node or the instance options are not on the default HTML element
    }

    if (options.uri && options.token) {
      this.login()
    }

    /**
     * @type {object}
     */
    this.storeAccesors = null

    if (options.store !== false) {
      this.ensureStore()
    }

    /**
     * Holds in-flight promises for deduplication purpose
     *
     * @private
     * @type {PromiseCache}
     */
    this._promiseCache = new PromiseCache()
  }

  /**
   * Gets overrided by MicroEE.mixin
   * This is here just so typescript does not scream
   *
   * TODO Find a better way to make TS understand that emit is
   * a method from cozy-client
   */
  emit(...args) {}
  on(...args) {}
  removeListener(...args) {}

  /**
   * A plugin is a class whose constructor receives the client as first argument.
   * The main mean of interaction with the client should be with events
   * like "login"/"logout".
   *
   * The plugin system is meant to encourage separation of concerns, modularity
   * and testability : instead of registering events at module level, please
   * create a plugin that subscribes to events.
   *
   * Plugin instances are stored internally in the `plugins` attribute of the client
   * and can be accessed via this mean. A plugin class must have the attribute
   * `pluginName` that will be use as the key in the `plugins` object.
   *
   * Two plugins with the same `pluginName` cannot co-exist.
   *
   * @example
   * ```js
   * class AlertPlugin {
   *   constructor(client, options) {
   *     this.client = client
   *     this.options = options
   *     this.handleLogin = this.handleLogin.bind(this)
   *     this.handleLogout = this.handleLogout.bind(this)
   *     this.client.on("login", this.handleLogin)
   *     this.client.on("logout", this.handleLogout)
   *   }
   *
   *   handleLogin() {
   *     alert(this.options.onLoginAlert)
   *   }
   *
   *   handleLogout() {
   *     alert(this.options.onLogoutAlert)
   *   }
   * }
   *
   * AlertPlugin.pluginName = 'alerts'
   *
   * client.registerPlugin(AlertPlugin, {
   *   onLoginAlert: 'client has logged in !',
   *   onLogoutAlert: 'client has logged out !'
   * })
   *
   * // the instance of the plugin is accessible via
   * client.plugins.alerts
   * ```
   */
  registerPlugin(Plugin, options) {
    if (!Plugin.pluginName) {
      throw new Error(
        'Cannot register a plugin whose class does not have `pluginName` attribute.'
      )
    }
    if (this.plugins[Plugin.pluginName]) {
      throw new Error(
        `Cannot register plugin ${Plugin.pluginName}. A plugin with the same name has already been registered.`
      )
    }
    const instance = new Plugin(this, options)
    this.plugins[Plugin.pluginName] = instance
    return instance
  }

  /**
   * To help with the transition from cozy-client-js to cozy-client, it is possible to instantiate
   * a client with a cookie-based instance of cozy-client-js.
   *
   * @param {OldCozyClient} oldClient - An instance of the deprecated cozy-client
   * @param {object} options - CozyStackClient options
   * @returns {CozyClient}
   */
  static fromOldClient(oldClient, options) {
    return new CozyClient({
      uri: oldClient._url,
      token: oldClient._token.token,
      ...options
    })
  }

  /**
   * To help with the transition from cozy-client-js to cozy-client, it is possible to instantiate
   * a client with an OAuth-based instance of cozy-client-js.
   *
   * Warning: unlike other instantiators, this one needs to be awaited.
   *
   * @param {OldCozyClient} oldClient - An OAuth instance of the deprecated cozy-client
   * @param {object} options - CozyStackClient options
   * @returns {Promise<CozyClient>} An instance of a client, configured from the old client
   */
  static async fromOldOAuthClient(oldClient, options) {
    if (oldClient._oauth) {
      const credentials = await oldClient.authorize()
      const oauthOptions = {
        oauth: credentials.client,
        token: credentials.token,
        scope: credentials.token.scope
      }
      return new CozyClient({
        uri: oldClient._url,
        ...oauthOptions,
        ...options
      })
    } else {
      throw new Error(
        'Cannot instantiate a new client: old client is not an OAuth client. CozyClient.fromOldClient might be more suitable.'
      )
    }
  }

  /**
   * In konnector/service context, CozyClient can be instantiated from
   * environment variables
   *
   * @param  {NodeEnvironment} [envArg]  - The environment
   * @param  {object} options - Options
   * @returns {CozyClient}
   */
  static fromEnv(envArg, options = {}) {
    const env = envArg || (typeof process !== 'undefined' ? process.env : {})
    const { COZY_URL, COZY_CREDENTIALS, NODE_ENV } = env
    if (!COZY_URL || !COZY_CREDENTIALS) {
      throw new Error(
        'Env used to instantiate CozyClient must have COZY_URL and COZY_CREDENTIALS'
      )
    }
    if (NODE_ENV === 'development') {
      options.oauth = JSON.parse(COZY_CREDENTIALS)
    } else {
      options.token = COZY_CREDENTIALS.trim()
    }
    options.uri = COZY_URL.trim()

    return new CozyClient({
      ...options
    })
  }

  /**
   * When used from an app, CozyClient can be instantiated from the data injected by the stack in
   * the DOM.
   *
   * @param  {object}   options  - CozyClient constructor options
   * @param  {string}   selector - Options
   * @returns {CozyClient} - CozyClient instance
   */
  static fromDOM(options = {}, selector = '[role=application]') {
    const root = document.querySelector(selector)
    if (!(root instanceof HTMLElement)) {
      throw new Error(`Cannot find an HTMLElement corresponding to ${selector}`)
    }
    if (!root || !root.dataset) {
      throw new Error(`Found no data in ${selector} to instantiate cozyClient`)
    }

    const data = root.dataset.cozy
      ? JSON.parse(root.dataset.cozy)
      : { ...root.dataset }

    let { domain, token } = data
    if (!domain || !token) {
      domain = domain || data.cozyDomain
      token = token || data.cozyToken
    }

    if (!domain || !token) {
      throw new Error(
        `Found no data in ${root.dataset} to instantiate cozyClient`
      )
    }

    return new CozyClient({
      uri: `${window.location.protocol}//${domain}`,
      token: token,
      capabilities: data.capabilities,
      ...options
    })
  }

  addSchema(schemaDefinition) {
    this.schema.add(schemaDefinition)
  }

  registerClientOnLinks() {
    for (const link of this.links) {
      if (link.registerClient) {
        try {
          link.registerClient(this)
        } catch (e) {
          console.warn(e)
        }
      }
    }
  }

  /**
   * Notify the links that they can start and set isLogged to true.
   *
   * On mobile, where url/token are set after instantiation, use this method
   * to set the token and uri via options.
   *
   * Emits
   *
   * - "beforeLogin" at the beginning, before links have been set up
   * - "login" when the client is fully logged in and links have been set up
   *
   * @param  {object}   [options] - Options
   * @param  {string}   options.token  - If passed, the token is set on the client
   * @param  {string}   options.uri  - If passed, the uri is set on the client
   * @returns {Promise} - Resolves when all links have been setup and client is fully logged in
   *
   */
  login(options) {
    // Keep the promise to be able to return it in future calls.
    // This allows us to autoLogin in constructor without breaking any compatibility
    // with codes that uses an explicit login.
    if (this.isLogged && !this.isRevoked) {
      console.warn(`CozyClient is already logged.`)
      return this.loginPromise
    }
    return (this.loginPromise = this._login(options))
  }

  async _login(options) {
    this.emit('beforeLogin')

    this.registerClientOnLinks()

    if (options) {
      if (options.uri) {
        this.stackClient.setUri(options.uri)
      }
      if (options.token) {
        this.stackClient.setToken(options.token)
      }
    }

    for (const link of this.links) {
      if (link.onLogin) {
        await link.onLogin()
      }
    }

    this.isLogged = true
    this.isRevoked = false

    this.emit('login')
  }

  /**
   * Logs out the client and reset all the links
   *
   * Emits
   *
   * - "beforeLogout" at the beginning, before links have been reset
   * - "login" when the client is fully logged out and links have been reset
   *
   * @returns {Promise} - Resolves when all links have been reset and client is fully logged out
   */
  async logout() {
    if (!this.isLogged) {
      logger.warn(`CozyClient isn't logged.`)
      return
    }

    this.emit('beforeLogout')
    this.isLogged = false

    if (this.stackClient instanceof OAuthClient) {
      try {
        // unregister client on stack
        if (
          this.stackClient.unregister &&
          (!this.stackClient.isRegistered || this.stackClient.isRegistered())
        ) {
          await this.stackClient.unregister()
        }
      } catch (err) {
        logger.warn(`Impossible to unregister client on stack: ${err}`)
      }
    } else {
      try {
        await this.stackClient.fetch('DELETE', '/auth/login')
      } catch (err) {
        logger.warn(`Impossible to log out: ${err}`)
      }
    }

    // clean information on links
    for (const link of this.links) {
      if (link.reset) {
        try {
          await link.reset()
        } catch (e) {
          console.warn(e)
        }
      }
    }

    if (this.store) {
      this.dispatch(resetState())
    }
    this.emit('logout')
  }

  /**
   * Forwards to a stack client instance and returns
   * a [DocumentCollection]{@link https://docs.cozy.io/en/cozy-client/api/cozy-stack-client/#DocumentCollection} instance.
   *
   * @param  {string} doctype The collection doctype.
   * @returns {DocumentCollection} Collection corresponding to the doctype
   */
  collection(doctype) {
    return this.getStackClient().collection(doctype)
  }

  fetch(method, path, body, options = {}) {
    return this.getStackClient().fetch(method, path, body, options)
  }

  all(doctype) {
    logger.warn(`
client.all is deprecated, prefer to use the Q helper to build a new QueryDefinition.

import { Q } from 'cozy-client'
client.query(Q('io.cozy.bills'))`)
    return Q(doctype)
  }

  find(doctype, selector = undefined) {
    console.warn(
      'client.find(doctype, selector) is deprecated, please use Q(doctype).where(selector) to build the same query.'
    )
    return new QueryDefinition({ doctype, selector })
  }

  get(doctype, id) {
    console.warn(
      `client.get(${doctype}, id) is deprecated, please use Q(${doctype}).getById(id) to build the same query.`
    )
    return new QueryDefinition({ doctype, id })
  }

  /**
   * Creates a document and saves it on the server
   *
   * @param  {string} type - Doctype of the document
   * @param  {object} doc - Document to save
   * @param  {ReferenceMap} [references] - References are a special kind of relationship
   * that is not stored inside the referencer document, they are used for example between a photo
   * and its album. You should not need to use it normally.
   * @param  {object} options - Mutation options
   *
   * @example
   * ```js
   * await client.create('io.cozy.todos', {
   *   label: 'My todo',
   *   relationships: {
   *     authors: {
   *       data: [{_id: 1, _type: 'io.cozy.persons'}]
   *     }
   *   }
   * })
   * ```
   *
   * @returns {Promise}
   */
  async create(type, doc, references, options = {}) {
    const { _type, ...attributes } = doc
    const normalizedDoc = { _type: type, ...attributes }
    const ret = await this.schema.validate(normalizedDoc)
    if (ret !== true) throw new Error('Validation failed')
    return this.mutate(
      this.getDocumentSavePlan(normalizedDoc, references),
      options
    )
  }

  validate(document) {
    return this.schema.validate(document)
  }

  /**
   * Create or update a document on the server
   *
   * @param  {object} doc - Document to save
   * @param  {object} mutationOptions - Mutation options
   * @returns {Promise}
   */
  async save(doc, mutationOptions = {}) {
    const { _type, ...attributes } = doc
    if (!_type) throw new Error('The document must have a `_type` property')
    const normalizedDoc = { _type, ...attributes }
    const ret = await this.schema.validate(normalizedDoc)
    if (ret !== true) throw new Error('Validation failed')
    return this.mutate(this.getDocumentSavePlan(normalizedDoc), mutationOptions)
  }

  /**
   * Saves multiple documents in one batch
   * - Can only be called with documents from the same doctype
   * - Does not support automatic creation of references
   *
   * @param  {CozyClientDocument[]} docs - Documents from the same doctype
   * @param  {Object} mutationOptions - Mutation Options
   * @param  {string}    [mutationOptions.as] - Mutation id
   * @param  {Function}    [mutationOptions.update] - Function to update the document
   * @param  {Function}    [mutationOptions.updateQueries] - Function to update queries
   * @returns {Promise<void>}
   */
  async saveAll(docs, mutationOptions = {}) {
    const doctypes = Array.from(new Set(docs.map(x => x._type)))
    if (doctypes.length !== 1) {
      throw new Error('saveAll can only save documents with the same doctype')
    }
    const validations = await Promise.all(
      docs.map(d => this.schema.validate(d))
    )
    const errors = validations.filter(validation => validation !== true)
    if (errors.length > 0) {
      console.warn(
        'There has been some validation errors while bulk saving',
        errors
      )
      throw new Error('Validation failed for at least one doc')
    }

    const toSaveDocs = docs.map(d => this.prepareDocumentForSave(d))
    const mutation = Mutations.updateDocuments(toSaveDocs)
    return this.mutate(mutation, mutationOptions)
  }
  /**
   * @param  {CozyClientDocument} document - Document that will be saved
   * @returns {CozyClientDocument}
   */
  ensureCozyMetadata(
    document,
    options = {
      event: DOC_CREATION
    }
  ) {
    const METADATA_VERSION = 1
    if (this.appMetadata === undefined) return document
    let doctypeVersion
    if (document._type) {
      const schema = this.schema.getDoctypeSchema(document._type)
      doctypeVersion = get(schema, 'doctypeVersion')
    }

    const { slug, sourceAccount, version } = this.appMetadata

    const now = new Date().toISOString()

    let cozyMetadata = get(document, 'cozyMetadata', {})
    if (options.event === DOC_CREATION) {
      cozyMetadata = {
        metadataVersion: METADATA_VERSION,
        doctypeVersion,
        createdByApp: slug,
        sourceAccount,
        createdAt: now,
        createdByAppVersion: version,
        updatedAt: now,
        updatedByApps: slug
          ? [
              {
                date: now,
                slug,
                version
              }
            ]
          : [],
        ...cozyMetadata // custom metadata that are set by the app
      }
    } else if (options.event === DOC_UPDATE) {
      cozyMetadata = {
        ...cozyMetadata,
        updatedAt: now,
        updatedByApps: [
          { date: now, slug, version },
          ...get(document, 'cozyMetadata.updatedByApps', []).filter(
            info => info.slug !== slug
          )
        ]
      }
    }

    return {
      ...document,
      cozyMetadata
    }
  }

  /**
   * Dehydrates and adds metadata before saving a document
   *
   * @param  {CozyClientDocument} doc - Document that will be saved
   * @returns {CozyClientDocument}
   */
  prepareDocumentForSave(doc) {
    const isNewDoc = !doc._rev
    const dehydratedDoc = this.ensureCozyMetadata(dehydrate(doc), {
      event: isNewDoc ? DOC_CREATION : DOC_UPDATE
    })
    return dehydratedDoc
  }

  /**
   * Creates a list of mutations to execute to create a document and its relationships.
   *
   * ```js
   * const baseDoc = { _type: 'io.cozy.todo', label: 'Go hiking' }
   * // relations can be arrays or single objects
   * const relationships = {
   *   attachments: [{ _id: 12345, _type: 'io.cozy.files' }, { _id: 6789, _type: 'io.cozy.files' }],
   *   bills: { _id: 9999, _type: 'io.cozy.bills' }
   * }
   * client.getDocumentSavePlan(baseDoc, relationships)
   * ```
   *
   *
   * @param  {CozyClientDocument} document - Document to create
   * @param  {ReferenceMap} [referencesByName] - References to the created document. The
   * relationship class associated to each reference list should support references, otherwise this
   * method will throw.
   *
   * @returns {Mutation[]|Mutation}  One or more mutation to execute
   */
  getDocumentSavePlan(document, referencesByName) {
    const isNewDoc = !document._rev
    const docToSave = this.prepareDocumentForSave(document)

    const saveMutation = isNewDoc
      ? Mutations.createDocument(docToSave)
      : Mutations.updateDocument(docToSave)

    const hasReferences =
      referencesByName &&
      Object.values(referencesByName).filter(references => {
        return Array.isArray(references) ? references.length > 0 : references
      }).length > 0

    if (!hasReferences) {
      return saveMutation
    } else {
      for (let relName of Object.keys(referencesByName)) {
        const doctype = document._type
        const doctypeRelationship = this.schema.getRelationship(
          doctype,
          relName
        )
        const relationshipClass = doctypeRelationship.type
        if (!supportsReferences(relationshipClass)) {
          throw referencesUnsupportedError(doctypeRelationship.name)
        }
      }
    }

    if (referencesByName && !isNewDoc) {
      throw new Error(
        'Unable to save external relationships on a not-new document'
      )
    }

    return [
      saveMutation,
      response => {
        const doc = this.hydrateDocument(response.data)
        return Object.entries(referencesByName).map(([relName, references]) => {
          const relationship = doc[relName]
          return relationship.addReferences(references)
        })
      }
    ]
  }

  /**
   * Hooks are an observable system for events on documents.
   * There are at the moment only 2 hooks available.
   *
   * - before:destroy, called just before a document is destroyed via CozyClient::destroy
   * - after:destroy, called after a document is destroyed via CozyClient::destroy
   *
   * @example
   * ```
   * CozyClient.registerHook('io.cozy.bank.accounts', 'before:destroy', () => {
   *   console.log('A io.cozy.bank.accounts is being destroyed')
   * })
   * ```
   *
   * @param  {string}   doctype - Doctype on which the hook will be registered
   * @param  {string}   name    - Name of the hook
   * @param  {Function} fn      - Callback to be executed
   */
  static registerHook(doctype, name, fn) {
    const hooks = (CozyClient.hooks[doctype] = CozyClient.hooks[doctype] || {})
    hooks[name] = hooks[name] || []
    hooks[name].push(fn)
  }

  triggerHook(name, document) {
    if (!CozyClient.hooks) return
    const allHooks = CozyClient.hooks[document._type] || {}
    const hooks = allHooks[name] || []
    for (let h of hooks) {
      h(this, document)
    }
  }

  /**
   * Destroys a document. {before,after}:destroy hooks will be fired.
   *
   * @param  {CozyClientDocument} document - Document to be deleted
   * @returns {Promise<CozyClientDocument>} The document that has been deleted
   */
  async destroy(document, mutationOptions = {}) {
    await this.triggerHook('before:destroy', document)
    const res = await this.mutate(
      Mutations.deleteDocument(document),
      mutationOptions
    )
    await this.triggerHook('after:destroy', document)
    return res
  }

  upload(file, dirPath, mutationOptions = {}) {
    return this.mutate(Mutations.uploadFile(file, dirPath), mutationOptions)
  }

  /**
   * Makes sure that the query exists in the store
   *
   * @param  {string} queryId - Id of the query
   * @param  {QueryDefinition} queryDefinition - Definition of the query
   * @param  {QueryOptions} [options] - Additional options
   */
  ensureQueryExists(queryId, queryDefinition, options) {
    this.ensureStore()
    const existingQuery = getQueryFromState(this.store.getState(), queryId)
    // Don't trigger the INIT_QUERY for fetchMore() calls
    if (
      existingQuery.fetchStatus !== 'loaded' ||
      (!queryDefinition.skip && !queryDefinition.bookmark)
    ) {
      this.dispatch(initQuery(queryId, queryDefinition, options))
    }
  }

  /**
   * Executes a query and returns its results.
   *
   * Results from the query will be saved internally and can be retrieved via
   * `getQueryFromState` or directly using `<Query />`. `<Query />` automatically
   * executes its query when mounted if no fetch policy has been indicated.
   *
   * @param  {QueryDefinition} queryDefinition - Definition that will be executed
   * @param  {QueryOptions} [options] - Options
   * @returns {Promise<QueryResult>}
   */
  async query(queryDefinition, { update, ...options } = {}) {
    this.ensureStore()
    const queryId =
      options.as || this.queryIdGenerator.generateId(queryDefinition)
    const existingQuery = this.getQueryFromState(queryId)

    if (options.fetchPolicy) {
      if (!options.as) {
        throw new Error(
          'Cannot use `fetchPolicy` without naming the query, please use `as` to name the query'
        )
      }
      const shouldFetch = options.fetchPolicy(existingQuery)
      if (!shouldFetch) {
        return
      }
    }
    // If we already have the same query in loading state, no
    // need to refetch it. We return the promise we already
    // have in the promiseCache
    if (existingQuery && Object.keys(existingQuery).length > 0) {
      if (existingQuery.fetchStatus === 'loading') {
        return this._promiseCache.get(() => stringify(queryDefinition))
      }
    }
    this.ensureQueryExists(queryId, queryDefinition, options)

    try {
      this.dispatch(loadQuery(queryId))

      const response = await this._promiseCache.exec(
        () => this.requestQuery(queryDefinition),
        () => stringify(queryDefinition)
      )

      this.dispatch(
        receiveQueryResult(queryId, response, {
          update
        })
      )
      return response
    } catch (error) {
      this.dispatch(receiveQueryError(queryId, error))
      // specific onError
      if (options.onError) {
        options.onError(error)
        // defaulted onError
      } else if (this.options.onError) {
        this.options.onError(error)
      } else {
        throw error
      }
    }
  }

  /**
   * Will fetch all documents for a `queryDefinition`, automatically fetching more
   * documents if the total of documents is superior to the pagination limit. Can
   * result in a lot of network requests.
   *
   * @param  {QueryDefinition} queryDefinition - Definition to be executed
   * @param {QueryOptions} [options] - Options
   * @returns {Promise<QueryResult>} All documents matching the query
   */
  async queryAll(queryDefinition, options = {}) {
    const queryId =
      options.as || this.queryIdGenerator.generateId(queryDefinition)
    const mergedOptions = { ...options, as: queryId }
    let resp = await this.query(queryDefinition, mergedOptions)
    const documents = resp.data

    while (resp && resp.next) {
      if (resp.bookmark) {
        resp = await this.query(
          queryDefinition.offsetBookmark(resp.bookmark),
          mergedOptions
        )
      } else {
        const currentResult = getRawQueryFromState(
          this.store.getState(),
          queryId
        )
        resp = await this.query(
          queryDefinition.offset(currentResult.data.length),
          mergedOptions
        )
      }
      documents.push(...resp.data)
    }
    return documents
  }

  watchQuery(...args) {
    console.warn(
      'client.watchQuery is deprecated, please use client.makeObservableQuery.'
    )
    return this.makeObservableQuery(...args)
  }

  makeObservableQuery(queryDefinition, options = {}) {
    this.ensureStore()
    const queryId =
      options.as || this.queryIdGenerator.generateId(queryDefinition)
    this.ensureQueryExists(queryId, queryDefinition)
    return new ObservableQuery(queryId, queryDefinition, this, options)
  }

  /**
   * Mutate a document
   *
   * @param  {object}    mutationDefinition - Describe the mutation
   * @param {object} [options] - Options
   * @param  {string}    [options.as] - Mutation id
   * @param  {Function}    [options.update] - Function to update the document
   * @param  {Function}    [options.updateQueries] - Function to update queries
   * @returns {Promise}
   */
  async mutate(mutationDefinition, { update, updateQueries, ...options } = {}) {
    this.ensureStore()
    const mutationId =
      options.as || this.queryIdGenerator.generateId(mutationDefinition)
    this.dispatch(initMutation(mutationId, mutationDefinition))
    try {
      const response = await this.requestMutation(mutationDefinition)
      this.dispatch(
        receiveMutationResult(
          mutationId,
          response,
          {
            update,
            updateQueries
          },
          mutationDefinition
        )
      )
      return response
    } catch (error) {
      this.dispatch(receiveMutationError(mutationId, error, mutationDefinition))
      throw error
    }
  }

  /**
   * Executes a query through links and fetches relationships
   *
   * @private
   * @param  {QueryDefinition} definition QueryDefinition to be executed
   * @returns {Promise<ClientResponse>}
   */
  async requestQuery(definition) {
    const mainResponse = await this.chain.request(definition)
    if (!definition.includes) {
      return mainResponse
    }
    const withIncluded = await this.fetchRelationships(
      mainResponse,
      this.getIncludesRelationships(definition)
    )
    return withIncluded
  }

  /**
   * Fetch relationships for a response (can be several docs).
   * Fills the `relationships` attribute of each documents.
   *
   * Can potentially result in several fetch requests.
   * Queries are optimized before being sent (multiple single documents queries can be packed into
   * one multiple document query) for example.
   *
   * @private
   */
  async fetchRelationships(response, relationshipsByName) {
    const isSingleDoc = !Array.isArray(response.data)
    if (!isSingleDoc && response.data.length === 0) {
      return response
    }
    const responseDocs = isSingleDoc ? [response.data] : response.data

    const queryDefToDocIdAndRel = new Map()
    const documents = []
    const definitions = []

    responseDocs.forEach(doc => {
      return forEach(relationshipsByName, (relationship, relName) => {
        try {
          const queryDef = relationship.type.query(doc, this, relationship)
          const docId = doc._id

          // Used to reattach responses into the relationships attribute of
          // each document
          queryDefToDocIdAndRel.set(queryDef, [docId, relName])

          // Relationships can yield "queries" that are already resolved documents.
          // These do not need to go through the usual link request mechanism.
          if (queryDef instanceof QueryDefinition) {
            definitions.push(queryDef)
          } else {
            documents.push(queryDef)
          }
        } catch {
          // eslint-disable-next-line
          // We do not crash completely if one the relationship behaves badly and
          // throws
        }
      })
    })

    // Definitions can be in optimized/regrouped in case of HasMany relationships.
    const optimizedDefinitions = optimizeQueryDefinitions(definitions)
    const responses = await Promise.all(
      optimizedDefinitions.map(req => this.chain.request(req))
    )

    // "Included" documents will be stored in the `documents` store
    const uniqueDocuments = uniqBy(flatten(documents), '_id')
    const included = flatten(responses.map(r => r.included || r.data))
      .concat(uniqueDocuments)
      .filter(Boolean)

    // Some relationships have the relationship data on the other side of the
    // relationship (ex: io.cozy.photos.albums do not have photo inclusion information,
    // it is on the io.cozy.files side).
    // Here we take the data received from the relationship queries, and group
    // it so that we can fill the `relationships` attribute of each doc before
    // storing the document. This makes the data easier to manipulate for the front-end.
    const relationshipsByDocId = {}
    for (const [def, resp] of zip(optimizedDefinitions, responses)) {
      const docIdAndRel = queryDefToDocIdAndRel.get(def)
      if (docIdAndRel) {
        const [docId, relName] = docIdAndRel
        relationshipsByDocId[docId] = relationshipsByDocId[docId] || {}
        relationshipsByDocId[docId][relName] = responseToRelationship(resp)
      }
    }

    return {
      ...attachRelationships(response, relationshipsByDocId),
      included
    }
  }

  async requestMutation(definition) {
    if (Array.isArray(definition)) {
      const [first, ...rest] = definition
      const firstResponse = await this.requestMutation(first)
      await Promise.all(
        rest.map(def => {
          const mutationDef =
            typeof def === 'function' ? def(firstResponse) : def
          return this.requestMutation(mutationDef)
        })
      )
      return firstResponse
    }
    return this.chain.request(definition)
  }

  getIncludesRelationships(queryDefinition) {
    const { includes, doctype } = queryDefinition
    if (!includes) return {}
    return fromPairs(
      includes.map(relName => [
        relName,
        this.schema.getRelationship(doctype, relName)
      ])
    )
  }

  /**
   * Returns documents with their relationships resolved according to their schema.
   * If related documents are not in the store, they will not be fetched automatically.
   * Instead, the relationships will have null documents.
   *
   * @param  {string} doctype - Doctype of the documents being hydrated
   * @param  {Array<CozyClientDocument>} documents - Documents to be hydrated
   * @returns {Array<HydratedDocument>}
   */
  hydrateDocuments(doctype, documents) {
    if (this.options.autoHydrate === false) {
      return documents
    }
    const schema = this.schema.getDoctypeSchema(doctype)
    const relationships = schema.relationships
    if (relationships) {
      return documents.map(doc => this.hydrateDocument(doc, schema))
    } else {
      return documents
    }
  }

  /**
   * Resolves relationships on a document.
   *
   * The original document is kept in the target attribute of
   * the relationship
   *
   * @param  {CozyClientDocument} document - for which relationships must be resolved
   * @param  {Schema} [schemaArg] - Optional
   * @returns {HydratedDocument}
   */
  hydrateDocument(document, schemaArg) {
    if (!document) {
      return document
    }
    const schema = schemaArg || this.schema.getDoctypeSchema(document._type)
    return {
      ...document,
      ...this.hydrateRelationships(document, schema.relationships)
    }
  }

  hydrateRelationships(document, schemaRelationships) {
    const methods = this.getRelationshipStoreAccessors()
    return mapValues(schemaRelationships, (assoc, name) =>
      createAssociation(document, assoc, methods)
    )
  }

  /**
   * Creates (locally) a new document for the given doctype.
   * This document is hydrated : its relationships are there
   * and working.
   */
  makeNewDocument(doctype) {
    const obj = {
      _type: doctype
    }
    return this.hydrateDocument(obj)
  }

  generateRandomId() {
    return this.queryIdGenerator.generateRandomId()
  }

  /**
   * Creates an association that is linked to the store.
   */
  getAssociation(document, associationName) {
    return createAssociation(
      document,
      this.schema.getRelationship(document._type, associationName),
      this.getRelationshipStoreAccessors()
    )
  }

  /**
   * Returns the accessors that are given to the relationships for them
   * to deal with the stores.
   *
   * Relationships need to have access to the store to ping it when
   * a modification (addById/removeById etc...) has been done. This wakes
   * the store up, which in turn will update the `<Query>`s and re-render the data.
   */
  getRelationshipStoreAccessors() {
    if (!this.storeAccesors) {
      this.storeAccessors = {
        get: this.getDocumentFromState.bind(this),
        save: (document, opts) => this.save.call(this, document, opts),
        dispatch: this.dispatch.bind(this),
        query: (def, opts) => this.query.call(this, def, opts),
        mutate: (def, opts) => this.mutate.call(this, def, opts)
      }
    }
    return this.storeAccessors
  }

  /**
   * Get a collection of documents from the internal store.
   *
   * @param {string} type - Doctype of the collection
   *
   * @returns {CozyClientDocument[]} Array of documents or null if the collection does not exist.
   */
  getCollectionFromState(type) {
    try {
      return getCollectionFromState(this.store.getState(), type)
    } catch (e) {
      logger.warn('Could not getCollectionFromState', type, e.message)
      return null
    }
  }

  /**
   * Get a document from the internal store.
   *
   * @param {string} type - Doctype of the document
   * @param {string} id   - Id of the document
   *
   * @returns {CozyClientDocument} Document or null if the object does not exist.
   */
  getDocumentFromState(type, id) {
    try {
      return getDocumentFromState(this.store.getState(), type, id)
    } catch (e) {
      logger.warn('Could not getDocumentFromState', type, id, e.message)
      return null
    }
  }

  /**
   * Get a query from the internal store.
   *
   * @param {string} id - Id of the query (set via Query.props.as)
   * @param {object} options - Options
   * @param {boolean} [options.hydrated] - Whether documents should be returned already hydrated (default: false)
   * @param  {object} [options.singleDocData] - If true, the "data" returned will be
   * a single doc instead of an array for single doc queries. Defaults to false for backward
   * compatibility but will be set to true in the future.
   *
   * @returns {QueryState} - Query state or null if it does not exist.
   */
  getQueryFromState(id, options = {}) {
    const hydrated = options.hydrated || false
    const singleDocData = options.singleDocData || false
    try {
      const queryResults = getQueryFromState(this.store.getState(), id)
      const doctype = queryResults.definition && queryResults.definition.doctype
      const isSingleDocQuery =
        queryResults.definition && queryResults.definition.id

      if (!hydrated && !singleDocData) {
        // Early return let's us preserve reference equality in the simple case
        return queryResults
      }

      const data =
        hydrated && doctype
          ? this.hydrateDocuments(doctype, queryResults.data)
          : queryResults.data
      return {
        ...queryResults,
        data: isSingleDocQuery && singleDocData ? data[0] : data
      }
    } catch (e) {
      console.warn(
        `Could not get query from state. queryId: ${id}, error: ${e.message}`
      )
      return null
    }
  }

  /**
   * Executes a query and returns the results from internal store.
   *
   * Can be useful in pure JS context (without React)
   * Has a behavior close to <Query /> or useQuery
   *
   * @param {object} query - Query with definition and options
   * @param {QueryDefinition} query.definition - Query Definition
   * @param {QueryOptions} query.options - Query Options
   * @returns {Promise<QueryState>} Query state
   */
  fetchQueryAndGetFromState = async ({ definition, options }) => {
    try {
      await this.query(definition, options)
      return this.getQueryFromState(options.as)
    } catch (error) {
      throw error
    }
  }

  /**
   * Performs a complete OAuth flow using a Cordova webview
   * or React Native WebView for auth.
   * The `register` method's name has been chosen for compat reasons with the Authentication compo.
   *
   * @param   {string} cozyURL Receives the URL of the cozy instance.
   * @returns {object}   Contains the fetched token and the client information.
   */
  register(cozyURL) {
    const stackClient = this.getStackClient()
    stackClient.setUri(cozyURL)
    return this.startOAuthFlow(authFunction)
  }

  isReactNative() {
    return typeof navigator != 'undefined' && navigator.product == 'ReactNative'
  }

  /**
   * Performs a complete OAuth flow, including updating the internal token at the end.
   *
   * @param   {OpenURLCallback} openURLCallback Receives the URL to present to the user as a parameter, and should return a promise that resolves with the URL the user was redirected to after accepting the permissions.
   * @returns {Promise<object>} Contains the fetched token and the client information. These should be stored and used to restore the client.
   */
  async startOAuthFlow(openURLCallback) {
    const stackClient = this.getStackClient()
    await stackClient.register()

    await this.certifyFlagship()

    return this.authorize({ openURLCallback })
  }

  /**
   * Perform the Flagship certification process for verifying that the current running app is a genuine Cozy application
   *
   * This mechanism is described in https://github.com/cozy/cozy-client/blob/master/packages/cozy-client/src/flagship-certification/README.md
   */
  async certifyFlagship() {
    const stackClient = this.getStackClient()

    if (stackClient.oauthOptions.shouldRequireFlagshipPermissions) {
      await certifyFlagship(stackClient.oauthOptions.certificationConfig, this)
    }
  }

  /**
   * Creates an OAuth token with needed permissions for the current client.
   * The authorization page URL generation can be overriding by passing a function pointer as `openURLCallback` parameter
   * It is possible to skip the session creation process (when using an in-app browser) by passing a sessionCode (see https://docs.cozy.io/en/cozy-stack/auth/#post-authsession_code)
   *
   * @param {object} [options] - Authorization options
   * @param {OpenURLCallback} [options.openURLCallback] - Receives the URL to present to the user as a parameter, and should return a promise that resolves with the URL the user was redirected to after accepting the permissions.
   * @param {SessionCode} [options.sessionCode] - session code than can be added to the authorization URL to automatically create the session.
   * @param {PKCECodes} [options.pkceCodes] - code verifier and a code challenge that should be used in the PKCE verification process.
   * @returns {Promise<object>} Contains the fetched token and the client information. These should be stored and used to restore the client.
   */
  async authorize({
    openURLCallback = authFunction,
    sessionCode = undefined,
    pkceCodes = {}
  } = {}) {
    try {
      const { codeVerifier, codeChallenge } = pkceCodes
      const stackClient = this.getStackClient()
      const stateCode = stackClient.generateStateCode()
      const url = stackClient.getAuthCodeURL({
        stateCode: stateCode,
        scopes: undefined,
        sessionCode: sessionCode,
        codeChallenge: codeChallenge
      })
      const redirectedURL = await openURLCallback(url)
      const code = stackClient.getAccessCodeFromURL(redirectedURL, stateCode)
      const token = await stackClient.fetchAccessToken(
        code,
        undefined,
        undefined,
        codeVerifier
      )

      stackClient.setToken(token)
      return {
        token,
        infos: stackClient.oauthOptions,
        client: stackClient.oauthOptions // for compat with Authentication comp reasons
      }
    } catch (error) {
      /* if REGISTRATION_ABORT is emited, we have to unregister the client. */
      if (error.message === REGISTRATION_ABORT) {
        const stackClient = this.getStackClient()
        stackClient.unregister()
      }
      throw error
    }
  }

  /**
   * Renews the token if, for instance, new permissions are required or token
   * has expired.
   *
   * @returns {object}   Contains the fetched token and the client information.
   */
  renewAuthorization() {
    return this.authorize({ openURLCallback: authFunction })
  }

  /**
   * Sets the internal store of the client. Use this when you want to have cozy-client's
   * internal store colocated with your existing Redux store.
   *
   * Typically, you would need to do this only once in your application, this is why
   * setStore throws if you do it twice. If you really need to set the store again,
   * use options.force = true.
   *
   * @example
   * ```
   * const client = new CozyClient()
   * const store = createStore(combineReducers({
   *   todos: todoReducer,
   *   cozy: client.reducer()
   * })
   * client.setStore(store)
   * ```
   *
   * @param {ReduxStore} store - A redux store
   * @param {object} [options] - Options
   * @param {boolean} [options.force] - Will deactivate throwing when client's store already exists
   */
  setStore(store, { force = false } = {}) {
    if (store === undefined) {
      throw new Error('Store is undefined')
    } else if (this.store && !force) {
      throw new Error(
        `Client already has a store, it is forbidden to change store.
setStore must be called before any query is executed. Try to
call setStore earlier in your code, preferably just after the
instantiation of the client.`
      )
    }

    this.store = store
  }

  ensureStore() {
    if (!this.store) {
      this.setStore(createStore())
    }
  }

  /**
   * Returns whether the client has been revoked on the server
   */
  async checkForRevocation() {
    return this.stackClient.checkForRevocation()
  }

  /** Sets public attribute and emits event related to revocation */
  handleRevocationChange(state) {
    if (state) {
      this.isRevoked = true
      this.emit('revoked')
    } else {
      this.isRevoked = false
      this.emit('unrevoked')
    }
  }

  /** Emits event when token is refreshed */
  handleTokenRefresh(token) {
    this.emit('tokenRefreshed')
    if (this.options.onTokenRefresh) {
      deprecatedHandler(
        `Using onTokenRefresh is deprecated, please use events like this: cozyClient.on('tokenRefreshed', token => console.log('Token has been refreshed', token)). https://git.io/fj3M3`
      )
      this.options.onTokenRefresh(token)
    }
  }

  /**
   * If no stack client has been passed in options, creates a default stack
   * client and attaches handlers for revocation and token refresh.
   * If a stackClient has been passed in options, ensure it has handlers for
   * revocation and token refresh.
   *
   * If `oauth` options are passed, stackClient is an OAuthStackClient.
   */
  createClient() {
    if (this.options.client) {
      console.warn(
        'CozyClient: Using options.client is deprecated, please use options.stackClient.'
      )
    }

    const warningForCustomHandlers =
      this.options.warningForCustomHandlers !== undefined
        ? this.options.warningForCustomHandlers
        : true

    const stackClient = this.options.client || this.options.stackClient

    const handlers = {
      onRevocationChange: this.handleRevocationChange,
      onTokenRefresh: this.handleTokenRefresh
    }

    if (stackClient) {
      this.stackClient = stackClient
      if (!stackClient.options) {
        stackClient.options = {}
      }
      for (let handlerName of Object.keys(handlers)) {
        if (!stackClient.options[handlerName]) {
          stackClient.options[handlerName] = handlers[handlerName]
        } else {
          if (warningForCustomHandlers) {
            console.warn(
              `You passed a stackClient with its own ${handlerName}. It is not supported, unexpected things might happen.`
            )
          }
        }
      }
    } else {
      const options = {
        ...this.options,
        ...handlers
      }
      this.stackClient = this.options.oauth
        ? new OAuthClient(options)
        : new CozyStackClient(options)
    }

    this.client = new Proxy(
      this.stackClient,
      deprecatedHandler(
        'Using cozyClient.client is deprecated, please use cozyClient.stackClient.'
      )
    )
  }

  getClient() {
    console.warn(
      'CozyClient: getClient() is deprecated, please use getStackClient().'
    )
    return this.getStackClient()
  }

  getStackClient() {
    if (!this.stackClient) {
      this.createClient()
    }
    return this.stackClient
  }

  reducer() {
    return reducer
  }

  dispatch(action) {
    return this.store.dispatch(action)
  }

  /**
   * getInstanceOptions - Returns current instance options, such as domain or app slug
   *
   * @returns {object}
   */
  getInstanceOptions() {
    return this.instanceOptions
  }

  /**
   * loadInstanceOptionsFromDOM - Loads the dataset injected by the Stack in web pages and exposes it through getInstanceOptions
   *
   * @param {string} [selector=[role=application]] A selector for the node that holds the dataset to load
   *
   * @returns {void}
   */
  loadInstanceOptionsFromDOM(selector = '[role=application]') {
    const root = document.querySelector(selector)
    if (!(root instanceof HTMLElement)) {
      throw new Error(
        'The selector that is passed does not return an HTMLElement'
      )
    }

    const { cozy = '{}', ...dataset } = root.dataset
    this.instanceOptions = { ...JSON.parse(cozy), ...dataset }

    this.capabilities = this.instanceOptions.capabilities || null
  }

  /**
   * Directly set the data in the store, without using a query
   * This is useful for cases like Pouch replication, which wants to
   * set some data in the store.
   *
   * @param {object} data - Data that is inserted in the store. Shape: { doctype: [data] }
   */
  setData(data) {
    this.ensureStore()
    Object.entries(data).forEach(([doctype, data]) => {
      this.dispatch(receiveQueryResult(null, { data }))
    })
  }

  /**
   * At any time put an error function
   *
   * @param {Function} [onError] - Set a callback for queries which are errored
   * @throws {Error} onError should not have been defined yet
   */
  setOnError(onError) {
    if (this.options && this.options.onError) {
      throw new Error('On Error is already defined')
    }
    this.options.onError = onError
  }

  toJSON() {
    return new SnapshotClient({ uri: this.options.uri })
  }
}

CozyClient.hooks = CozyClient.hooks || {}

CozyClient.fetchPolicies = fetchPolicies
//COZY_CLIENT_VERSION_PACKAGE in replaced by babel. See babel config
CozyClient.version = 'COZY_CLIENT_VERSION_PACKAGE'

MicroEE.mixin(CozyClient)

export default CozyClient
