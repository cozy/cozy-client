import StackLink from './StackLink'
import Association from './associations'
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
  getQueryFromStore,
  getDocumentFromStore
} from './store'
import { chain } from './CozyLink'
import ObservableQuery from './ObservableQuery'

export default class CozyClient {
  constructor({ link, schema = {}, ...options }) {
    this.options = options
    this.idCounter = 1
    this.link = link || new StackLink({ client: this.getOrCreateStackClient() })
    if (Array.isArray(this.link)) {
      this.link = chain(this.link)
    }
    this.schema = schema
  }

  /**
   * Forwards to a stack client instance and returns
   * a {@link DocumentCollection} instance.
   *
   * @param  {String} doctype The collection doctype.
   * @return {DocumentCollection}
   */
  collection(doctype) {
    return this.getOrCreateStackClient().collection(doctype)
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

  getDocumentSavePlan(document, relationships) {
    const newDocument = !document._id
    const saveMutation = newDocument
      ? Mutations.createDocument(document)
      : Mutations.updateDocument(document)
    if (!relationships) {
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

  async query(queryDefinition, { update, contextQueryId, ...options } = {}) {
    this.getOrCreateStore()
    const queryId = options.as || this.generateId()
    const existingQuery = getQueryFromStore(this.store.getState(), queryId)
    // Don't trigger the INIT_QUERY for fetchMore() calls
    if (existingQuery.fetchStatus !== 'loaded' || !queryDefinition.skip) {
      this.dispatch(initQuery(queryId, queryDefinition))
    }
    try {
      const response = await this.requestQuery(queryDefinition)
      this.dispatch(
        receiveQueryResult(queryId, response, {
          update,
          contextQueryId
        })
      )
      return response
    } catch (error) {
      this.dispatch(receiveQueryError(queryId, error))
      throw error
    }
  }

  watchQuery(queryDefinition, options = {}) {
    const queryId = options.as || this.generateId()
    this.query(queryDefinition, { ...options, as: queryId })
    return new ObservableQuery(queryId, queryDefinition, this)
  }

  async mutate(
    mutationDefinition,
    { update, updateQueries, contextQueryId, ...options } = {}
  ) {
    this.getOrCreateStore()
    const mutationId = options.as || this.generateId()
    this.dispatch(initMutation(mutationId, mutationDefinition))
    try {
      const response = await this.requestMutation(mutationDefinition)
      this.dispatch(
        receiveMutationResult(mutationId, response, {
          update,
          updateQueries,
          contextQueryId
        })
      )
      return response
    } catch (error) {
      this.dispatch(receiveMutationError(mutationId, error))
      throw error
    }
  }

  async requestQuery(definition) {
    const mainResponse = await this.link.request(definition)
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
    const queries = associations.map(assoc =>
      this.fetchDocumentAssociation(document, assoc)
    )
    const responses = await Promise.all(
      queries.map(query => this.link.request(query))
    )
    const relationships = associations
      .map((assoc, i) => ({
        [assoc.name]: {
          data: responses[i].data.map(d => ({ _id: d._id, _type: d._type })),
          meta: responses[i].meta,
          next: responses[i].next,
          skip: responses[i].skip
        }
      }))
      .reduce((acc, rel) => ({ ...acc, ...rel }), {})
    const included = responses
      .map(r => r.included)
      .reduce((acc, inc) => [...acc, ...inc], [])

    return {
      data: {
        ...document,
        relationships
      },
      included
    }
  }

  fetchDocumentAssociation(document, { type, doctype }) {
    switch (type) {
      case 'has-many':
        return this.find(doctype).referencedBy(document)
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
    return this.link.request(definition)
  }

  getIncludesAssociations(queryDefinition) {
    if (!queryDefinition.includes) return []
    return queryDefinition.includes.map(propName =>
      this.getModelAssociation(queryDefinition.doctype, propName)
    )
  }

  hydrateDocuments(doctype, documents, queryId) {
    if (this.options.autoHydrate === false) {
      return documents
    }
    try {
      const model = this.getDoctypeModel(doctype)
      const associations = model.associations
      return documents.map(doc => ({
        ...doc,
        ...this.hydrateRelationships(doc, associations, queryId)
      }))
    } catch (err) {
      return documents
    }
  }

  hydrateDocument(document) {
    try {
      const model = this.getDoctypeModel(document._type)
      return {
        ...document,
        ...this.hydrateRelationships(document, model.associations)
      }
    } catch (err) {
      return document
    }
  }

  hydrateRelationships(document, associations, queryId) {
    const methods = this.getAssociationStoreAccessors(queryId)
    return associations.reduce(
      (acc, assoc) => ({
        ...acc,
        [assoc.name]: Association.create(document, assoc, methods)
      }),
      {}
    )
  }

  getAssociation(document, associationName, queryId) {
    return Association.create(
      document,
      this.getModelAssociation(document._type, associationName),
      this.getAssociationStoreAccessors(queryId)
    )
  }

  getAssociationStoreAccessors(queryId) {
    return {
      get: this.getDocumentFromStore.bind(this),
      save: (document, opts) =>
        this.save.call(this, document, { contextQueryId: queryId, ...opts }),
      query: (def, opts) =>
        this.query.call(
          this,
          def,
          queryId ? { contextQueryId: queryId, ...opts } : opts
        ),
      mutate: (def, opts) =>
        this.mutate.call(
          this,
          def,
          queryId ? { contextQueryId: queryId, ...opts } : opts
        )
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
    const model = Object.keys(this.schema)
      .map(k => this.schema[k])
      .find(m => m.doctype === doctype)
    if (!model) {
      throw new Error(`No schema found for '${doctype}' doctype`)
    }
    const associations = !model.relationships
      ? []
      : Object.keys(model.relationships).map(name => {
          const { type, doctype } = model.relationships[name]
          return {
            name,
            type,
            doctype
          }
        })
    return {
      ...model,
      associations
    }
  }

  doctypeModelExists(doctype) {
    if (!this.schema) return false
    return (
      Object.keys(this.schema)
        .map(k => this.schema[k])
        .find(m => m.doctype === doctype) !== undefined
    )
  }

  getDocumentFromStore(type, id) {
    return getDocumentFromStore(this.store.getState(), type, id)
  }

  /**
   * Performs a complete OAuth flow using a Cordova webview for auth.
   * The `register` method's name has been chosen for compat reasons with the Authentication compo.
   * @param   {string} cozyURL Receives the URL of the cozy instance.
   * @returns {object}   Contains the fetched token and the client information.
   */
  register(cozyUrl) {
    const client = this.getOrCreateStackClient()
    client.setUri(cozyUrl)
    return this.startOAuthFlow(authenticateWithCordova)
  }

  /**
   * Performs a complete OAuth flow, including upating the internal token at the end.
   * @param   {function} openURLCallback Receives the URL to present to the user as a parameter, and should return a promise that resolves with the URL the user was redirected to after accepting the permissions.
   * @returns {object}   Contains the fetched token and the client information. These should be stored and used to restore the client.
   */
  async startOAuthFlow(openURLCallback) {
    const client = this.getOrCreateStackClient()
    await client.register()
    return this.authorize(openURLCallback)
  }

  async authorize(openURLCallback) {
    const client = this.getOrCreateStackClient()
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
   * @returns {object}   Contains the fetched token and the client information.
   */
  renewAuthorization() {
    return this.authorize(authenticateWithCordova)
  }

  setStore(store) {
    this.store = store
  }

  getOrCreateStore() {
    if (!this.store) {
      this.setStore(createStore())
    }
    return this.store
  }

  getOrCreateStackClient() {
    if (!this.client) {
      if (this.options.client) {
        this.client = this.options.client
      } else {
        this.client = this.options.oauth
          ? new OAuthClient(this.options)
          : new CozyStackClient(this.options)
      }
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
