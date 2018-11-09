const isString = require('lodash/isString')

// Queries
export class QueryDefinition {
  constructor({
    doctype,
    id,
    ids,
    selector,
    fields,
    indexedFields,
    sort,
    includes,
    referenced,
    limit,
    skip
  } = {}) {
    this.doctype = doctype
    this.id = id
    this.ids = ids
    this.selector = selector
    this.fields = fields
    this.indexedFields = indexedFields
    this.sort = sort
    this.includes = includes
    this.referenced = referenced
    this.limit = limit
    this.skip = skip
  }

  where(selector) {
    return new QueryDefinition({ ...this.toDefinition(), selector })
  }

  select(fields) {
    return new QueryDefinition({ ...this.toDefinition(), fields })
  }

  index(indexedFields) {
    return new QueryDefinition({ ...this.toDefinition(), indexedFields })
  }

  sortBy(sort) {
    if (isString(sort)) {
      throw new Error(
        'Invalid sort, should be an object (`{ label: "desc"}`), you passed a string.'
      )
    }
    return new QueryDefinition({ ...this.toDefinition(), sort })
  }

  include(includes) {
    if (!Array.isArray(includes)) {
      throw new Error('include() takes an array of relationship names')
    }
    return new QueryDefinition({ ...this.toDefinition(), includes })
  }

  limitBy(limit) {
    return new QueryDefinition({ ...this.toDefinition(), limit })
  }

  UNSAFE_noLimit() {
    return new QueryDefinition({ ...this.toDefinition(), limit: null })
  }

  offset(skip) {
    return new QueryDefinition({ ...this.toDefinition(), skip })
  }

  referencedBy(document) {
    return new QueryDefinition({ ...this.toDefinition(), referenced: document })
  }

  toDefinition() {
    return {
      doctype: this.doctype,
      id: this.id,
      selector: this.selector,
      fields: this.fields,
      indexedFields: this.indexedFields,
      sort: this.sort,
      includes: this.includes,
      referenced: this.referenced,
      limit: this.limit,
      skip: this.skip
    }
  }
}

// Mutations
const CREATE_DOCUMENT = 'CREATE_DOCUMENT'
const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT'
const DELETE_DOCUMENT = 'DELETE_DOCUMENT'
const ADD_REFERENCES_TO = 'ADD_REFERENCES_TO'
const REMOVE_REFERENCES_TO = 'REMOVE_REFERENCES_TO'
const UPLOAD_FILE = 'UPLOAD_FILE'

export const createDocument = document => ({
  mutationType: MutationTypes.CREATE_DOCUMENT,
  document
})

export const updateDocument = document => ({
  mutationType: MutationTypes.UPDATE_DOCUMENT,
  document
})

export const deleteDocument = document => ({
  mutationType: MutationTypes.DELETE_DOCUMENT,
  document
})

export const addReferencesTo = (document, referencedDocuments) => ({
  mutationType: MutationTypes.ADD_REFERENCES_TO,
  referencedDocuments,
  document
})

export const removeReferencesTo = (document, referencedDocuments) => ({
  mutationType: MutationTypes.REMOVE_REFERENCES_TO,
  referencedDocuments,
  document
})

export const uploadFile = (file, dirPath) => ({
  mutationType: MutationTypes.UPLOAD_FILE,
  file,
  dirPath
})

export const getDoctypeFromOperation = operation => {
  if (operation.mutationType) {
    const type = operation.mutationType
    switch (type) {
      case CREATE_DOCUMENT:
        return operation.document._type
      case UPDATE_DOCUMENT:
        return operation.document._type
      case DELETE_DOCUMENT:
        return operation.document._type
      case ADD_REFERENCES_TO:
        throw new Error('Not implemented')
      case UPLOAD_FILE:
        throw new Error('Not implemented')
      default:
        throw new Error(`Unknown mutationType ${type}`)
    }
  } else {
    return operation.doctype
  }
}

export const Mutations = {
  createDocument,
  updateDocument,
  deleteDocument,
  addReferencesTo,
  removeReferencesTo,
  uploadFile
}

export const MutationTypes = {
  CREATE_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  ADD_REFERENCES_TO,
  REMOVE_REFERENCES_TO,
  UPLOAD_FILE
}
