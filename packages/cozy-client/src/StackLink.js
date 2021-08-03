import { MutationTypes } from './queries/dsl'
import CozyLink from './CozyLink'
import { CozyClientDocument } from './types'

class BulkEditError extends Error {
  constructor(docs) {
    super('Error while bulk saving')
    this.name = 'BulkEditError'
    this.docs = docs
  }
}

/**
 * Returns full documents after a bulk update
 *
 * @param  {{ ok: boolean, id: string, rev: string, error?: string, reason?: string }[]} updateAllResponse - Response from bulk docs
 * @param  {CozyClientDocument[]} originalDocuments - Documents that were updated
 * @returns {{ data: CozyClientDocument[] }} - Full documents with updated _id and _rev
 */
const transformBulkDocsResponse = (updateAllResponse, originalDocuments) => {
  const badResults = updateAllResponse.filter(x => !x.ok)
  if (badResults.length > 0) {
    console.warn('Error while bulk saving, bad results', badResults)
    throw new BulkEditError(badResults)
  }
  return {
    data: originalDocuments.map((od, i) => ({
      ...od,
      _id: updateAllResponse[i].id,
      _rev: updateAllResponse[i].rev
    }))
  }
}

/**
 * Transfers queries and mutations to a remote stack
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

  async executeMutation(mutation, result, forward) {
    const { mutationType, document: doc, documents: docs, ...props } = mutation
    switch (mutationType) {
      case MutationTypes.CREATE_DOCUMENT:
        return this.stackClient.collection(doc._type).create(doc)
      case MutationTypes.UPDATE_DOCUMENTS: {
        const updateAllResp = await this.stackClient
          .collection(docs[0]._type)
          .updateAll(docs)
        return transformBulkDocsResponse(updateAllResp, docs)
      }
      case MutationTypes.UPDATE_DOCUMENT:
        return this.stackClient.collection(doc._type).update(doc)
      case MutationTypes.DELETE_DOCUMENT:
        return this.stackClient.collection(doc._type).destroy(doc)
      case MutationTypes.ADD_REFERENCES_TO:
        return this.stackClient
          .collection(props.referencedDocuments[0]._type)
          .addReferencesTo(doc, props.referencedDocuments)
      case MutationTypes.REMOVE_REFERENCES_TO:
        return this.stackClient
          .collection(props.referencedDocuments[0]._type)
          .removeReferencesTo(doc, props.referencedDocuments)
      case MutationTypes.ADD_REFERENCED_BY:
        if (doc._type === 'io.cozy.files') {
          return this.stackClient
            .collection('io.cozy.files')
            .addReferencedBy(doc, props.referencedDocuments)
        } else {
          throw new Error('The document type should be io.cozy.files')
        }
      case MutationTypes.REMOVE_REFERENCED_BY:
        if (doc._type === 'io.cozy.files') {
          return this.stackClient
            .collection('io.cozy.files')
            .removeReferencedBy(doc, props.referencedDocuments)
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
