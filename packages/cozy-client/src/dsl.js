// Queries
export class QueryDefinition {
  constructor({ doctype, id, selector, fields, sort, includes, skip }) {
    this.doctype = doctype
    this.id = id
    this.selector = selector
    this.fields = fields
    this.sort = sort
    this.includes = includes
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

  toDefinition() {
    return {
      doctype: this.doctype,
      id: this.id,
      selector: this.selector,
      fields: this.fields,
      sort: this.sort,
      includes: this.includes,
      skip: this.skip
    }
  }
}

const get = (doctype, id) => new QueryDefinition({ doctype, id })
// Temporary exports
export const all = doctype => new QueryDefinition({ doctype })
export const find = (doctype, selector = undefined) =>
  new QueryDefinition({ doctype, selector })

// Mutations
const CREATE_DOCUMENT = 'CREATE_DOCUMENT'
const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT'
const DELETE_DOCUMENT = 'DELETE_DOCUMENT'
const UPLOAD_FILE = 'UPLOAD_FILE'

export const createDocument = (doctype, attrs) => ({
  mutationType: MutationTypes.CREATE_DOCUMENT,
  document: { _type: doctype, ...attrs }
})

export const updateDocument = document => ({
  mutationType: MutationTypes.UPDATE_DOCUMENT,
  document
})

export const deleteDocument = document => ({
  mutationType: MutationTypes.DELETE_DOCUMENT,
  document
})

export const uploadFile = (file, dirPath) => ({
  mutationType: MutationTypes.UPLOAD_FILE,
  file,
  dirPath
})

export default {
  get,
  all,
  find,
  create: createDocument,
  update: updateDocument,
  destroy: deleteDocument,
  save: document =>
    document._id
      ? updateDocument(document)
      : createDocument(document._type, document),
  upload: uploadFile
}

export const MutationTypes = {
  CREATE_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  UPLOAD_FILE
}
