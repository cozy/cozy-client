import { MutationTypes } from './dsl'

export default class CozyLink {
  constructor(requestHandler) {
    this.handler = requestHandler
  }

  execute(request) {
    return this.handler(request)
  }
}

class HasManyAssociation {
  constructor({ name, doctype }) {
    this.name = name
    this.doctype = doctype
  }

  findByDocument(client, document) {
    return client.collection(this.doctype).findReferencedBy(document)
  }

  addToDocument(client, document, documents) {
    return client.collection(this.doctype).addReferencesTo(document, documents)
  }
}

export class StackLink {
  constructor({ client, schema }) {
    this.client = client
    this.schema = schema
  }

  execute(request) {
    if (request.mutationType) {
      return this.executeMutation(request)
    }
    return this.executeQuery(request)
  }

  async executeQuery({ doctype, selector, id, includes, ...options }) {
    if (!doctype) {
      throw new Error('No doctype found in a query definition')
    }
    const collection = this.client.collection(doctype)
    const mainResponse = id
      ? await collection.get(id)
      : !selector
        ? await collection.all(options)
        : await collection.find(selector, options)

    if (!includes) return mainResponse

    const respWithIncludes = await this.fetchAssociations(
      mainResponse,
      includes
    )
    return respWithIncludes
  }

  async fetchAssociations(response, associationNames) {
    const isSingleDoc = !Array.isArray(response.data)
    const doctype = isSingleDoc ? response.data._type : response.data[0]._type
    const originalData = isSingleDoc ? [response.data] : response.data

    const associations = this.getModelAssociations(doctype, associationNames)
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
    const responses = await Promise.all(
      associations.map(assoc => assoc.findByDocument(this.client, document))
    )
    const relationships = associations
      .map((assoc, i) => ({
        [assoc.name]: {
          data: responses[i].data,
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

  executeMutation({ mutationType, ...props }) {
    switch (mutationType) {
      case MutationTypes.CREATE_DOCUMENT:
        return this.create(props.document)
      case MutationTypes.UPDATE_DOCUMENT:
        return this.client
          .collection(props.document._type)
          .update(props.document)
      case MutationTypes.DELETE_DOCUMENT:
        return this.client
          .collection(props.document._type)
          .destroy(props.document)
      case MutationTypes.UPLOAD_FILE:
        return this.client
          .collection('io.cozy.files')
          .upload(props.file, props.dirPath)
      default:
        throw new Error(`Unknown mutation type: ${mutationType}`)
    }
  }

  async create(document) {
    const { relationships, attributes } = this.extractRelationshipsFrom(
      document
    )
    const response = await this.client
      .collection(document._type)
      .create(attributes)
    const created = response.data
    const associations = this.getModelAssociations(
      document._type,
      Object.keys(relationships)
    )
    await Promise.all(
      associations.map(assoc =>
        assoc.addToDocument(this.client, created, relationships[assoc.name])
      )
    )
    return {
      ...response
    }
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

  getModelAssociations(doctype, associationNames) {
    const model = this.getDoctypeModel(doctype)
    if (!model) {
      throw new Error(`No schema found for '${doctype}' doctype`)
    }
    return associationNames.map(name => {
      if (!model.relationships || !model.relationships[name]) {
        throw new Error(
          `No association '${name}' found for '${doctype}' doctype`
        )
      }
      return this.instantiateAssociation({
        name,
        ...model.relationships[name]
      })
    })
  }

  instantiateAssociation({ name, type, doctype }) {
    switch (type) {
      case 'has-many':
        return new HasManyAssociation({ name, doctype })
      default:
        throw new Error(`Can't handle '${assocType}' associations`)
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
}
