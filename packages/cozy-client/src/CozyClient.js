import StackLink from './StackLink'
import Association from './associations'
import { QueryDefinition, Mutations } from './dsl'
import CozyStackClient from 'cozy-stack-client'
import {
  default as reducer,
  createStore,
  initQuery,
  receiveQueryResult,
  receiveQueryError,
  initMutation,
  receiveMutationResult,
  receiveMutationError,
  receiveDocumentUpdate,
  getQueryFromStore,
  getDocumentFromStore
} from './store'

export default class CozyClient {
  constructor({ link, schema = {}, ...options }) {
    this.options = options
    this.idCounter = 1
    this.link = link || new StackLink({ client: this.getOrCreateStackClient() })
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

  create(doctype, attributes, relationships) {
    const saveMutation = this.save({ _type: doctype, ...attributes })
    if (!relationships) {
      return saveMutation
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

  save(document) {
    const newDocument = !document._id
    return newDocument
      ? Mutations.createDocument(document)
      : Mutations.updateDocument(document)
  }

  destroy(document) {
    return Mutations.deleteDocument(document)
  }

  upload(file, dirPath) {
    return Mutations.uploadFile(file, dirPath)
  }

  async query(queryDefinition, { update, ...options } = {}) {
    this.getOrCreateStore()
    const queryId = options.as || this.generateId()
    const existingQuery = getQueryFromStore(this.store.getState(), queryId)
    if (existingQuery.fetchStatus === 'pending') {
      this.dispatch(initQuery(queryId, queryDefinition))
    }
    try {
      const response = await this.requestQuery(queryDefinition)
      this.dispatch(
        receiveQueryResult(queryId, response, {
          update
        })
      )
      return response
    } catch (error) {
      console.log(error)
      return this.dispatch(receiveQueryError(queryId, error))
    }
  }

  async mutate(mutationDefinition, { update, updateQueries, ...options } = {}) {
    this.getOrCreateStore()
    const mutationId = options.as || this.generateId()
    this.dispatch(initMutation(mutationId))
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
      return this.dispatch(receiveMutationError(mutationId, error))
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
    const doctype = isSingleDoc ? response.data._type : response.data[0]._type
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
    const methods = {
      get: this.getDocumentFromStore.bind(this),
      query: (def, opts) =>
        this.query.call(this, def, queryId ? { as: queryId, ...opts } : opts),
      mutate: this.mutate.bind(this)
    }
    return associations.reduce(
      (acc, assoc) => ({
        ...acc,
        [assoc.name]: Association.create(document, assoc, methods)
      }),
      {}
    )
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

  getDocumentFromStore(type, id) {
    return getDocumentFromStore(this.store.getState(), type, id)
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
      this.client = new CozyStackClient(this.options)
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
