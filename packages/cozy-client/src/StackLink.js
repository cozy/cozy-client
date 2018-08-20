import { MutationTypes } from './dsl'
import CozyLink from './CozyLink'

export default class StackLink extends CozyLink {
  constructor({ client }) {
    super()
    this.client = client
  }

  request(operation) {
    if (operation.mutationType) {
      return this.executeMutation(operation)
    }
    return this.executeQuery(operation)
  }

  executeQuery({ doctype, selector, id, ids, referenced, ...options }) {
    if (!doctype) {
      throw new Error('No doctype found in a query definition')
    }
    const collection = this.client.collection(doctype)
    if (id) {
      return collection.get(id)
    }
    if (ids) {
      return collection.getAll(ids)
    }
    if (referenced) {
      return collection.findReferencedBy(referenced, options)
    }
    return !selector
      ? collection.all(options)
      : collection.find(selector, options)
  }

  executeMutation({ mutationType, ...props }) {
    switch (mutationType) {
      case MutationTypes.CREATE_DOCUMENT:
        return this.client
          .collection(props.document._type)
          .create(props.document)
      case MutationTypes.UPDATE_DOCUMENT:
        return this.client
          .collection(props.document._type)
          .update(props.document)
      case MutationTypes.DELETE_DOCUMENT:
        return this.client
          .collection(props.document._type)
          .destroy(props.document)
      case MutationTypes.ADD_REFERENCES_TO:
        return this.client
          .collection(props.referencedDocuments[0]._type)
          .addReferencesTo(props.document, props.referencedDocuments)
      case MutationTypes.REMOVE_REFERENCES_TO:
        return this.client
          .collection(props.referencedDocuments[0]._type)
          .removeReferencesTo(props.document, props.referencedDocuments)
      case MutationTypes.UPLOAD_FILE:
        return this.client
          .collection('io.cozy.files')
          .upload(props.file, props.dirPath)
      default:
        throw new Error(`Unknown mutation type: ${mutationType}`)
    }
  }
}
