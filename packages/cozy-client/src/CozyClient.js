import { REGISTRATION_ABORT } from './const'

import StackLink from './StackLink'
import { create as createAssociation } from './associations'
import {
  responseToRelationship,
  attachRelationships
} from './associations/helpers'
import { dehydrate } from './helpers'
import { QueryDefinition, Mutations } from './queries/dsl'
import CozyStackClient, { OAuthClient } from 'cozy-stack-client'
import { authenticateWithCordova } from './authentication/mobile'
import optimizeQueryDefinitions from './queries/optimize'
import {
  default as reducer,
  createStore,
  initQuery,
  receiveQueryResult,
  receiveQueryError,
  initMutation,
  receiveMutationResult,
  receiveMutationError,
  getQueryFromState,
  getDocumentFromState
} from './store'
import Schema from './Schema'
import { chain } from './CozyLink'
import ObservableQuery from './ObservableQuery'
import mapValues from 'lodash/mapValues'
import fromPairs from 'lodash/fromPairs'
import flatten from 'lodash/flatten'
import uniqBy from 'lodash/uniqBy'
import zip from 'lodash/zip'
import forEach from 'lodash/forEach'

const ensureArray = arr => (Array.isArray(arr) ? arr : [arr])

const deprecatedHandler = msg => ({
  get(target, prop) {
    console.warn(msg)
    return target[prop]
  }
})

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
   * @param  {Object}       options
   * @param  {Link}         options.link   - Backward compatibility
   * @param  {Array.Link}   options.links  - List of links
   * @param  {Object}       options.schema - Schema description for each doctypes
   */
  constructor({ link, links, schema = {}, ...options }) {
    if (link) {
      console.warn('`link` is deprecated, use `links`')
    }

    this.options = options
    this.idCounter = 1
    this.isLogged = false

    this.createClient()

    this.links = ensureArray(link || links || new StackLink())
    this.registerClientOnLinks()

    this.chain = chain(this.links)

    this.schema = new Schema(schema, this.getStackClient())
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

  async login() {
    if (this.isLogged) {
      console.warn(`CozyClient is already logged.`)
      return
    }

    this.isLogged = true
    this.registerClientOnLinks()

    for (const link of this.links) {
      if (link.onLogin) {
        try {
          await link.onLogin()
        } catch (e) {
          console.warn(e)
        }
      }
    }
  }

  async logout() {
    if (!this.isLogged) {
      console.warn(`CozyClient isn't logged.`)
      return
    }

    this.isLogged = false

    try {
      // unregister client on stack
      if (
        this.stackClient.unregister &&
        (!this.stackClient.isRegistered || this.stackClient.isRegistered())
      ) {
        await this.stackClient.unregister()
      }
    } catch (err) {
      console.warn(`Impossible to unregister client on stack: ${err}`)
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
  }

  /**
   * Forwards to a stack client instance and returns
   * a {@link DocumentCollection} instance.
   *
   * @param  {String} doctype The collection doctype.
   * @return {DocumentCollection}
   */
  collection(doctype) {
    return this.getStackClient().collection(doctype)
  }

  fetch(method, path, body, options = {}) {
    return this.getStackClient().fetch(method, path, body, options)
  }

  all(doctype) {
    return new QueryDefinition({ doctype })
  }

  find(doctype, selector = undefined) {
    return new QueryDefinition({ doctype, selector })
  }

  get(doctype, id) {
    return new QueryDefinition({ doctype, id })
  }

  async create(type, { _type, ...attributes }, relationships, options = {}) {
    const document = { _type: type, ...attributes }
    const ret = await this.schema.validate(document)
    if (ret !== true) throw new Error('Validation failed')
    return this.mutate(
      this.getDocumentSavePlan(document, relationships),
      options
    )
  }

  validate(document) {
    return this.schema.validate(document)
  }

  async save(document, mutationOptions = {}) {
    const ret = await this.schema.validate(document)
    if (ret !== true) throw new Error('Validation failed')
    return this.mutate(this.getDocumentSavePlan(document), mutationOptions)
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
   * @param  {object} document      The base document to create
   * @param  {object} relationships The list of relationships to add, as a dictionnary. Keys should be relationship names and values the documents to link.
   * @returns {Mutation[]}  One or more mutation to execute
   */
  getDocumentSavePlan(document, relationships) {
    const newDocument = !document._rev
    const dehydratedDoc = dehydrate(document)
    const saveMutation = newDocument
      ? Mutations.createDocument(dehydratedDoc)
      : Mutations.updateDocument(dehydratedDoc)
    const hasRelationships =
      relationships &&
      Object.values(relationships).filter(relations => {
        return Array.isArray(relations) ? relations.length > 0 : relations
      }).length > 0
    if (!hasRelationships) {
      return saveMutation
    }
    if (relationships && !newDocument) {
      throw new Error('Unable to save relationships on a not-new document')
    }
    return [
      saveMutation,
      response => {
        const document = this.hydrateDocument(response.data)
        return Object.keys(relationships).map(name => {
          const val = relationships[name]
          return Array.isArray(val)
            ? document[name].insertDocuments(val)
            : document[name].setDocument(val)
        })
      }
    ]
  }

  static registerHook(doctype, name, fn) {
    CozyClient.hooks = CozyClient.hooks || {}
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

  ensureQueryExists(queryId, queryDefinition) {
    this.ensureStore()
    const existingQuery = getQueryFromState(this.store.getState(), queryId)
    // Don't trigger the INIT_QUERY for fetchMore() calls
    if (existingQuery.fetchStatus !== 'loaded' || !queryDefinition.skip) {
      this.dispatch(initQuery(queryId, queryDefinition))
    }
  }

  async query(queryDefinition, { update, ...options } = {}) {
    this.ensureStore()
    const queryId = options.as || this.generateId()
    this.ensureQueryExists(queryId, queryDefinition)
    try {
      const response = await this.requestQuery(queryDefinition)
      this.dispatch(
        receiveQueryResult(queryId, response, {
          update
        })
      )
      return response
    } catch (error) {
      this.dispatch(receiveQueryError(queryId, error))
      throw error
    }
  }

  watchQuery(queryDefinition, options = {}) {
    this.ensureStore()
    const queryId = options.as || this.generateId()
    this.ensureQueryExists(queryId, queryDefinition)
    return new ObservableQuery(queryId, queryDefinition, this)
  }

  async mutate(mutationDefinition, { update, updateQueries, ...options } = {}) {
    this.ensureStore()
    const mutationId = options.as || this.generateId()
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
   * Queries are optimized before being sent.
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
        rest.map(
          def =>
            typeof def === 'function'
              ? this.requestMutation(def(firstResponse))
              : this.requestMutation(def)
        )
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
   * Instantiate relationships on a document
   *
   * The original document is kept in the target attribute of
   * the relationship
   */
  hydrateDocument(document, schema) {
    schema = schema || this.schema.getDoctypeSchema(document._type)
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

  /**
   * Creates an association that is linked to the store.
   */
  getAssociation(document, associationName) {
    return createAssociation(
      document,
      this.schema.getAssociation(document._type, associationName),
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

  getDocumentFromState(type, id) {
    return getDocumentFromState(this.store.getState(), type, id)
  }

  /**
   * Performs a complete OAuth flow using a Cordova webview for auth.
   * The `register` method's name has been chosen for compat reasons with the Authentication compo.
   * @param   {string} cozyURL Receives the URL of the cozy instance.
   * @returns {object}   Contains the fetched token and the client information.
   */
  register(cozyUrl) {
    const stackClient = this.getStackClient()
    stackClient.setUri(cozyUrl)
    return this.startOAuthFlow(authenticateWithCordova)
  }

  /**
   * Performs a complete OAuth flow, including updating the internal token at the end.
   *
   * @param   {function} openURLCallback Receives the URL to present to the user as a parameter, and should return a promise that resolves with the URL the user was redirected to after accepting the permissions.
   * @returns {object}   Contains the fetched token and the client information. These should be stored and used to restore the client.
   */
  async startOAuthFlow(openURLCallback) {
    const stackClient = this.getStackClient()
    await stackClient.register()
    return this.authorize(openURLCallback)
  }

  async authorize(openURLCallback) {
    try {
      const stackClient = this.getStackClient()
      const stateCode = stackClient.generateStateCode()
      const url = stackClient.getAuthCodeURL(stateCode)
      const redirectedURL = await openURLCallback(url)
      const code = stackClient.getAccessCodeFromURL(redirectedURL, stateCode)
      const token = await stackClient.fetchAccessToken(code)

      stackClient.setCredentials(token)
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
    return this.authorize(authenticateWithCordova)
  }

  setStore(store) {
    if (store === undefined) {
      throw new Error('Store is undefined')
    }

    this.store = store
  }

  ensureStore() {
    if (!this.store) {
      this.setStore(createStore())
    }
  }

  createClient() {
    if (this.options.client) {
      console.warn(
        'CozyClient: Using options.client is deprecated, please use options.stackClient.'
      )
    }
    const stackClient = this.options.client || this.options.stackClient
    if (stackClient) {
      this.stackClient = stackClient
    } else {
      this.stackClient = this.options.oauth
        ? new OAuthClient(this.options)
        : new CozyStackClient(this.options)
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

  generateId() {
    const id = this.idCounter
    this.idCounter++
    return id
  }

  /**
   * Directly set the data in the store, without using a query
   * This is useful for cases like Pouch replication, which wants to
   * set some data in the store.
   *
   * @param data {Object} { doctype: [data] }
   */
  setData(data) {
    this.ensureStore()
    Object.entries(data).forEach(([doctype, data]) => {
      this.dispatch(receiveQueryResult(null, { data }))
    })
  }
}

export default CozyClient
