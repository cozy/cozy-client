import StackLink from './StackLink'
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
  getQueryFromStore
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

  create(doctype, document) {
    return this.save({ _type: doctype, ...document })
  }

  save(document) {
    const { relationships, attributes } = this.extractRelationshipsFrom(
      document
    )
    const newDocument = !attributes._id
    const mainMutation = newDocument
      ? Mutations.createDocument(attributes)
      : Mutations.updateDocument(attributes)

    if (Object.keys(relationships).length === 0) {
      return mainMutation
    }

    const associations = Object.keys(relationships).map(rel =>
      this.getModelAssociation(document._type, rel)
    )
    return [
      mainMutation,
      ...associations.map(
        assoc =>
          newDocument
            ? response =>
                Mutations.addReferencesTo(
                  response.data,
                  relationships[assoc.propertyName]
                )
            : Mutations.addReferencesTo(
                attributes,
                relationships[assoc.propertyName]
              )
      )
    ]
  }

  destroy(document) {
    return Mutations.deleteDocument(document)
  }

  upload(file, dirPath) {
    return Mutations.uploadFile(file, dirPath)
  }

  async query(queryDefinition, options = {}) {
    this.getOrCreateStore()
    const queryId = options.as || this.generateId()
    const existingQuery = getQueryFromStore(this.store.getState(), queryId)
    if (existingQuery.fetchStatus === 'pending') {
      this.dispatch(initQuery(queryId, queryDefinition))
    }
    try {
      const response = await this.requestQuery(queryDefinition)
      this.dispatch(receiveQueryResult(queryId, response))
      return response
    } catch (error) {
      return this.dispatch(receiveQueryError(queryId, error))
    }
  }

  async mutate(mutationDefinition, { updateQueries, ...options } = {}) {
    this.getOrCreateStore()
    const mutationId = options.as || this.generateId()
    this.dispatch(initMutation(mutationId))
    try {
      const response = await this.requestMutation(mutationDefinition)
      this.dispatch(
        receiveMutationResult(mutationId, response, {
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
    return this.fetchIncludes(mainResponse, this.expandIncludes(definition))
  }

  async fetchIncludes(response, includes) {
    const isSingleDoc = !Array.isArray(response.data)
    const doctype = isSingleDoc ? response.data._type : response.data[0]._type
    const originalData = isSingleDoc ? [response.data] : response.data

    const responses = await Promise.all(
      originalData.map(doc => this.fetchDocumentIncludes(doc, includes))
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

  async fetchDocumentIncludes(document, includes) {
    const queries = includes.map(include =>
      this.fetchDocumentInclude(document, include)
    )
    const responses = await Promise.all(
      queries.map(query => this.link.request(query))
    )
    const relationships = includes
      .map((include, i) => ({
        [include.propertyName]: {
          data: responses[i].data,
          meta: responses[i].meta,
          next: responses[i].next,
          skip: responses[i].skip,
          query: queries[i],
          relationship: includes[i]
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

  fetchDocumentInclude(document, { relationType, doctype }) {
    switch (relationType) {
      case 'has-many':
        return this.find(doctype).referencedBy(document)
      default:
        throw new Error(`Can't handle '${relationType}' associations`)
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

  expandIncludes(queryDefinition) {
    if (!queryDefinition.includes) return []
    return queryDefinition.includes.map(propName =>
      this.getModelAssociation(queryDefinition.doctype, propName)
    )
  }

  // toJSONAPI() ?
  extractRelationshipsFrom(document) {
    const model = this.getDoctypeModel(document._type)
    const assocNames = Object.keys(model.relationships)
    return {
      relationships: Object.keys(document).reduce((result, prop) => {
        if (assocNames.indexOf(prop) !== -1) {
          result[prop] = document[prop]
        }
        return result
      }, {}),
      attributes: Object.keys(document).reduce((result, prop) => {
        if (assocNames.indexOf(prop) === -1) {
          result[prop] = document[prop]
        }
        return result
      }, {})
    }
  }

  getModelAssociation(doctype, associationName) {
    const model = this.getDoctypeModel(doctype)
    if (!model) {
      throw new Error(`No schema found for '${doctype}' doctype`)
    }
    if (!model.relationships || !model.relationships[associationName]) {
      throw new Error(
        `No association '${associationName}' found for '${doctype}' doctype`
      )
    }
    return this.expandAssociation({
      associationName,
      ...model.relationships[associationName]
    })
  }

  expandAssociation({ associationName, type, doctype }) {
    switch (type) {
      case 'has-many':
        return { propertyName: associationName, doctype, relationType: type }
      default:
        throw new Error(`Can't handle '${type}' associations`)
    }
  }

  getDoctypeModel(doctype) {
    if (!this.schema) {
      throw new Error('No schema defined')
    }
    return Object.keys(this.schema)
      .map(k => this.schema[k])
      .find(m => m.doctype === doctype)
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
