// Queries
export class QueryDefinition {
  constructor({
    doctype,
    id,
    selector,
    fields,
    sort,
    includes,
    referenced,
    skip
  }) {
    this.doctype = doctype
    this.id = id
    this.selector = selector
    this.fields = fields
    this.sort = sort
    this.includes = includes
    this.referenced = referenced
    this.skip = skip
  }

  where(selector) {
    return new QueryDefinition({ ...this.toDefinition(), selector })
  }

  select(fields) {
    return new QueryDefinition({ ...this.toDefinition(), fields })
  }

  sortBy(sort) {
    return new QueryDefinition({ ...this.toDefinition(), sort })
  }

  include(includes) {
    return new QueryDefinition({ ...this.toDefinition(), includes })
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
      sort: this.sort,
      includes: this.includes,
      referenced: this.referenced,
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
