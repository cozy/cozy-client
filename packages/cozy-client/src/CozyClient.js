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
                  relationships[assoc.name]
                )
            : Mutations.addReferencesTo(attributes, relationships[assoc.name])
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
    return this.fetchIncludes(
      mainResponse,
      this.getIncludesAssociations(definition)
    )
  }

  async fetchIncludes(response, associations) {
    const isSingleDoc = !Array.isArray(response.data)
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

  fetchDocumentAssociation(document, { relationType, doctype }) {
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

  getIncludesAssociations(queryDefinition) {
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

  async queryRelationship(queryDefinition, { document, update }) {
    this.getOrCreateStore()
    // try {
    const response = await this.requestQuery(queryDefinition)
    this.dispatch(receiveDocumentUpdate(document, update, response))
    return response
    // } catch (error) {}
  }

  hydrateDocuments(state, doctype, documents) {
    try {
      const model = this.getDoctypeModel(doctype)
      const associations = model.associations
      return documents.map(doc => ({
        ...doc,
        ...this.hydrateRelationships(state, doc, associations)
      }))
    } catch (err) {
      return documents
    }
  }

  hydrateRelationships(state, document, associations) {
    return associations.reduce((acc, assoc) => {
      const relationship = this.hydrateRelationship(state, document, assoc)
      return relationship ? { ...acc, [assoc.name]: relationship } : acc
    }, {})
  }

  hydrateRelationship(state, document, association) {
    const name = association.name
    if (!document.relationships[name]) {
      return null
    }
    const relationship = document.relationships[name]
    switch (association.relationType) {
      case 'has-many':
        return {
          ...relationship,
          data: relationship.data.map(({ _id, _type }) =>
            getDocumentFromStore(state, _type, _id)
          ),
          fetchMore: () => {
            const skip = relationship.data.length
            return this.queryRelationship(
              this.find(association.doctype)
                .referencedBy(document)
                .offset(skip),
              {
                document,
                update: (doc, response) => ({
                  ...doc,
                  relationships: {
                    ...doc.relationships,
                    [name]: {
                      ...doc.relationships[name],
                      data: [...doc.relationships[name].data, ...response.data],
                      next: response.next,
                      skip
                    }
                  }
                })
              }
            )
          }
        }
      default:
        throw new Error(`Can't handle ${association.relationType} associations`)
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
            relationType: type,
            doctype
          }
        })
    return {
      ...model,
      associations
    }
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
