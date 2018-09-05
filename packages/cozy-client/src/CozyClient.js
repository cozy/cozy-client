/**
 * Responsible for
 *
 * - Creating observable queries
 * - Hydration
 * - Creating plan for saving documents
 * - Associations
 */

import StackLink from './StackLink'
import { create as createAssociation } from './associations'
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
import { chain } from './CozyLink'
import ObservableQuery from './ObservableQuery'
import mapValues from 'lodash/mapValues'
import flatMap from 'lodash/flatMap'
import keyBy from 'lodash/keyBy'
import pickBy from 'lodash/pickBy'
import fromPairs from 'lodash/fromPairs'

const associationsFromModel = model => {
  const relationships = model.relationships || {}
  return Object.entries(relationships).map(([name, relationship]) => {
    const { type, doctype, query } = relationship
    return {
      name,
      type,
      doctype,
      query
    }
  })
}

const findModelByDoctype = (schema, doctype) => {
  return Object.values(schema).find(m => m.doctype === doctype)
}

const responseToRelationship = response => ({
  data: response.data.map(d => ({ _id: d._id, _type: d._type })),
  meta: response.meta,
  next: response.next,
  skip: response.skip
})

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

    this.schema = schema
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
    const ret = await this.validate(document)
    if (ret !== true) throw new Error('Validation failed')
    return this.mutate(
      this.getDocumentSavePlan(document, relationships),
      options
    )
  }

  async save(document, mutationOptions = {}) {
    const ret = await this.validate(document)
    if (ret !== true) throw new Error('Validation failed')
    return this.mutate(this.getDocumentSavePlan(document), mutationOptions)
  }

  async validate(document) {
    let errors = {}
    if (!this.doctypeModelExists(document._type)) {
      return true
    }
    const model = this.getDoctypeModel(document._type)
    if (!model.attributes) return true
    for (const n in model.attributes) {
      const ret = await this.validateAttribute(document, n, model.attributes[n])
      if (ret !== true) errors[n] = ret
    }
    if (Object.keys(errors).length === 0) return true
    return errors
  }

  async validateAttribute(document, attrName, attrProps) {
    if (attrProps.unique) {
      const ret = await this.collection(document._type).checkUniquenessOf(
        attrName,
        document[attrName]
      )
      if (ret !== true) return 'must be unique'
    }
    return true
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
    const saveMutation = newDocument
      ? Mutations.createDocument(document)
      : Mutations.updateDocument(document)
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
    if (existingQuery) {
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
        receiveMutationResult(mutationId, response, {
          update,
          updateQueries
        })
      )
      return response
    } catch (error) {
      this.dispatch(receiveMutationError(mutationId, error))
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
    const included = responses
      .map(r => r.included)
      .reduce((acc, inc) => [...acc, ...inc], [])

    return {
      ...response,
      data: isSingleDoc ? data[0] : data,
      included
    }
  }

  async fetchDocumentAssociations(document, associations) {
    const assocByName = keyBy(associations, x => x.name)
    const definitions = pickBy(
      mapValues(assocByName, assoc =>
        this.queryDocumentAssociation(document, assoc)
      )
    )

    const requests = mapValues(definitions, definition =>
      this.chain.request(definition)
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

  queryDocumentAssociation(document, association) {
    const { type, doctype, query } = association
    switch (type) {
      case 'has-many':
        if (query) {
          return query(this, association)(document)
        } else {
          const queryAll = this.find(doctype)
          return queryAll.referencedBy(document)
        }
      default:
        throw new Error(`Can't handle '${type}' associations`)
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

  getIncludesAssociations(queryDefinition) {
    if (!queryDefinition.includes) return []
    return queryDefinition.includes.map(propName =>
      this.getModelAssociation(queryDefinition.doctype, propName)
    )
  }

  hydrateDocuments(doctype, documents) {
    if (this.options.autoHydrate === false) {
      return documents
    }
    try {
      const model = this.getDoctypeModel(doctype)
      const associations = model.associations
      if (associations.length) {
        return documents.map(doc => this.hydrateDocument(doc, model))
      } else {
        return documents
      }
    } catch (err) {
      console.error(err)
      return documents
    }
  }

  hydrateDocument(document, model) {
    try {
      model = model || this.getDoctypeModel(document._type)
      return {
        ...document,
        ...this.hydrateRelationships(document, model.associations)
      }
    } catch (err) {
      return document
    }
  }

  hydrateRelationships(document, associations) {
    const methods = this.getAssociationStoreAccessors()
    const res = fromPairs(
      associations.map(assoc => [
        assoc.name,
        createAssociation(document, assoc, methods)
      ])
    )
    return res
  }

  getAssociation(document, associationName) {
    return createAssociation(
      document,
      this.getModelAssociation(document._type, associationName),
      this.getAssociationStoreAccessors()
    )
  }

  getAssociationStoreAccessors() {
    return {
      get: this.getDocumentFromState.bind(this),
      save: (document, opts) => this.save.call(this, document, opts),
      query: (def, opts) => this.query.call(this, def, opts),
      mutate: (def, opts) => this.mutate.call(this, def, opts)
    }
  }

  getModelAssociation(doctype, associationName) {
    const model = this.getDoctypeModel(doctype)
    const association = model.associations.find(a => a.name === associationName)
    if (!association) {
      throw new Error(
        `No association '${associationName}' found for '${doctype}' doctype`
      )
    }
    return association
  }

  getDoctypeModel(doctype) {
    if (!this.schema) {
      throw new Error('No schema defined')
    }
    const model = findModelByDoctype(this.schema, doctype)
    if (!model) {
      throw new Error(`No schema found for '${doctype}' doctype`)
    }
    const associations = associationsFromModel(model)
    return {
      ...model,
      associations
    }
  }

  doctypeModelExists(doctype) {
    if (!this.schema) return false
    return findModelByDoctype(this.schema, doctype) !== undefined
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
  }

  /**
   * Renews the token if, for instance, new permissions are required.
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
}
