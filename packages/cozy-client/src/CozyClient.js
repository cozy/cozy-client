/**
 * Responsible for
 *
 * - Creating observable queries
 * - Hydration
 * - Creating plan for saving documents
 * - Associations
 */
import { REGISTRATION_ABORT } from './const'

import StackLink from './StackLink'
import {
  create as createAssociation,
  responseToRelationship
} from './associations'
import { dehydrate } from './helpers'
import { QueryDefinition, Mutations } from './dsl'
import CozyStackClient, { OAuthClient } from 'cozy-stack-client'
import { authenticateWithCordova } from './authentication/mobile'
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
import flatMap from 'lodash/flatMap'
import pickBy from 'lodash/pickBy'
import fromPairs from 'lodash/fromPairs'

const allValues = async x => {
  const res = {}
  await Promise.all(
    Object.entries(x).map(([k, prom]) =>
      prom.then(value => {
        res[k] = value
      })
    )
  )
  return res
}

const ensureArray = arr => (Array.isArray(arr) ? arr : [arr])

/**
 * @module CozyClient
 */
export default class CozyClient {
  // `link` exist for retrocompatibility
  constructor({ link, links, schema = {}, ...options }) {
    if (link) {
      console.warn('`link` is deprecated, use `links`')
    }

    this.options = options
    this.idCounter = 1

    this.createClient()

    this.links = ensureArray(link || links || new StackLink())
    this.registerClientOnLinks()

    this.chain = chain(this.links)

    this.schema = new Schema(schema, this.getClient())
  }

  registerClientOnLinks() {
    for (const link of this.links) {
      if (!link.client && link.registerClient) {
        try {
          link.registerClient(this.client)
        } catch (e) {
          console.warn(e)
        }
      }
    }
  }

  login() {
    this.registerClientOnLinks()

    for (const link of this.links) {
      if (link.onLogin) {
        try {
          link.onLogin()
        } catch (e) {
          console.warn(e)
        }
      }
    }
  }

  async logout() {
    // unregister client on stack
    if (
      this.client.unregister &&
      (!this.client.isRegistered || this.client.isRegistered())
    ) {
      await this.client.unregister()
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
    return this.getClient().collection(doctype)
  }

  fetch(method, path, body, options = {}) {
    return this.getClient().fetch(method, path, body, options)
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
   * getDocumentSavePlan - Creates a list of mutations to execute to create a document and its relationships.
   *
   * @param  {object} document      The base document to create
   * @param  {object} relationships The list of relationships to add, as a dictionnary. Keys should be relationship names and values the documents to link.
   * @returns {object[]}  One or more mutation to execute
   * @example
   * const baseDoc = { _type: 'io.cozy.todo', label: 'Go hiking' }
   * // relations can be arrays or single objects
   * const relationships = {
   *   attachments: [{ _id: 12345, _type: 'io.cozy.files' }, { _id: 6789, _type: 'io.cozy.files' }],
   *   bills: { _id: 9999, _type: 'io.cozy.bills' }
   * }
   * client.getDocumentSavePlan(baseDoc, relationships)
   */
  getDocumentSavePlan(document, relationships) {
    const newDocument = !document._id
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
    return this.fetchIncludes(
      mainResponse,
      this.getIncludesAssociations(definition)
    )
  }

  async fetchIncludes(response, associations) {
    const isSingleDoc = !Array.isArray(response.data)
    if (!isSingleDoc && response.data.length === 0) {
      return response
    }
    const originalData = isSingleDoc ? [response.data] : response.data

    const responses = await Promise.all(
      originalData.map(doc => this.fetchDocumentAssociations(doc, associations))
    )
    const data = responses.map(r => r.data)
    const included = flatMap(responses, resp => resp.included)
    return {
      ...response,
      data: isSingleDoc ? data[0] : data,
      included
    }
  }

  async fetchDocumentAssociations(document, associations) {
    const definitions = pickBy(
      mapValues(associations, assoc =>
        this.queryDocumentAssociation(document, assoc)
      )
    )

    const requests = mapValues(
      definitions,
      definitionOrData =>
        definitionOrData instanceof QueryDefinition
          ? this.chain.request(definitionOrData)
          : Promise.resolve({ data: definitionOrData })
    )
    const responses = await allValues(requests)
    const relationships = mapValues(responses, responseToRelationship)
    const included = flatMap(Object.values(responses), r => [
      ...(r.included || r.data || [])
    ])

    return {
      data: {
        ...document,
        relationships
      },
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

  queryDocumentAssociation(document, schemaAssociation) {
    const { type } = schemaAssociation
    return type.query(document, this, schemaAssociation)
  }

  getIncludesAssociations(queryDefinition) {
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

  makeNewDocument(doctype) {
    const obj = {
      _type: doctype
    }
    return this.hydrateDocument(obj)
  }

  getAssociation(document, associationName) {
    return createAssociation(
      document,
      this.schema.getAssociation(document._type, associationName),
      this.getRelationshipStoreAccessors()
    )
  }

  getRelationshipStoreAccessors() {
    if (!this.storeAccesors) {
      this.storeAccessors = {
        get: this.getDocumentFromState.bind(this),
        save: (document, opts) => this.save.call(this, document, opts),
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
    const client = this.getClient()
    client.setUri(cozyUrl)
    return this.startOAuthFlow(authenticateWithCordova)
  }

  /**
   * Performs a complete OAuth flow, including upating the internal token at the end.
   * @param   {function} openURLCallback Receives the URL to present to the user as a parameter, and should return a promise that resolves with the URL the user was redirected to after accepting the permissions.
   * @returns {object}   Contains the fetched token and the client information. These should be stored and used to restore the client.
   */
  async startOAuthFlow(openURLCallback) {
    const client = this.getClient()
    await client.register()
    return this.authorize(openURLCallback)
  }

  async authorize(openURLCallback) {
    try {
      const client = this.getClient()
      const stateCode = client.generateStateCode()
      const url = client.getAuthCodeURL(stateCode)
      const redirectedURL = await openURLCallback(url)
      const code = client.getAccessCodeFromURL(redirectedURL, stateCode)
      const token = await client.fetchAccessToken(code)

      client.setCredentials(token)
      return {
        token,
        infos: client.oauthOptions,
        client: client.oauthOptions // for compat with Authentication comp reasons
      }
    } catch (error) {
      /* if REGISTRATION_ABORT is emited, we have to unregister the client. */
      if (error.message === REGISTRATION_ABORT) {
        const client = this.getClient()
        client.unregister()
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
      this.client = this.options.client
    } else {
      this.client = this.options.oauth
        ? new OAuthClient(this.options)
        : new CozyStackClient(this.options)
    }
  }

  getOrCreateStackClient() {
    console.warn(
      `getOrCreateStackClient is deprecated, you can used getClient function.`
    )
    return this.getClient()
  }

  getClient() {
    if (!this.client) {
      this.createClient()
    }
    return this.client
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
