import { MutationTypes } from './queries/dsl'
import CozyLink from './CozyLink'

/**
 *
 */
export default class StackLink extends CozyLink {
  /**
   * @param {object} [options] - Options
   * @param  {object} [options.stackClient] - A StackClient
   * @param  {object} [options.client] - A StackClient (deprecated)
   */
  constructor({ client, stackClient } = {}) {
    super()
    if (client) {
      console.warn(
        'Using options.client is deprecated, prefer options.stackClient'
      )
    }
    this.stackClient = stackClient || client
  }

  registerClient(client) {
    this.stackClient = client.stackClient || client.client
  }

  reset() {
    this.stackClient = null
  }

  request(operation, result, forward) {
    if (operation.mutationType) {
      return this.executeMutation(operation, result, forward)
    }
    return this.executeQuery(operation)
  }

  executeQuery(query) {
    const { doctype, selector, id, ids, referenced, ...options } = query
    if (!doctype) {
      console.warn('Bad query', query)
      throw new Error('No doctype found in a query definition')
    }
    const collection = this.stackClient.collection(doctype)
    if (id) {
      return collection.get(id, query)
    }
    if (ids) {
      return collection.getAll(ids)
    }
    if (referenced) {
      return collection.findReferencedBy(referenced, options)
    }
    return !selector && !options.sort
      ? collection.all(options)
      : collection.find(selector, options)
  }

  executeMutation(mutation, result, forward) {
    const { mutationType, ...props } = mutation
    switch (mutationType) {
      case MutationTypes.CREATE_DOCUMENT:
        return this.stackClient
          .collection(props.document._type)
          .create(props.document)
      case MutationTypes.UPDATE_DOCUMENT:
        return this.stackClient
          .collection(props.document._type)
          .update(props.document)
      case MutationTypes.DELETE_DOCUMENT:
        return this.stackClient
          .collection(props.document._type)
          .destroy(props.document)
      case MutationTypes.ADD_REFERENCES_TO:
        return this.stackClient
          .collection(props.referencedDocuments[0]._type)
          .addReferencesTo(props.document, props.referencedDocuments)
      case MutationTypes.REMOVE_REFERENCES_TO:
        return this.stackClient
          .collection(props.referencedDocuments[0]._type)
          .removeReferencesTo(props.document, props.referencedDocuments)
      case MutationTypes.ADD_REFERENCED_BY:
        if (props.document._type === 'io.cozy.files') {
          return this.stackClient
            .collection('io.cozy.files')
            .addReferencedBy(props.document, props.referencedDocuments)
        } else {
          throw new Error('The document type should be io.cozy.files')
        }
      case MutationTypes.REMOVE_REFERENCED_BY:
        if (props.document._type === 'io.cozy.files') {
          return this.stackClient
            .collection('io.cozy.files')
            .removeReferencedBy(props.document, props.referencedDocuments)
        } else {
          throw new Error('The document type should be io.cozy.files')
        }
      case MutationTypes.UPLOAD_FILE:
        return this.stackClient
          .collection('io.cozy.files')
          .upload(props.file, props.dirPath)
      default:
        return forward(mutation, result)
    }
  }
}
