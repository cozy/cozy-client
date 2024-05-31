import zipWith from 'lodash/zipWith'

import { MutationTypes, QueryDefinition } from './queries/dsl'
import CozyLink from './CozyLink'
import { DOCTYPE_FILES } from './const'
import { BulkEditError } from './errors'
import logger from './logger'

/**
 *
 * To know if cozy-client should use Document.find()
 * or Document.all()
 * Similar to what is done in CozyPouchLink executeQuery()
 *
 * @param {QueryDefinition} queryDefinition - QueryDefinition to check
 * @returns {boolean} If has find options
 *
 */
const hasFindOptions = queryDefinition => {
  const { selector, partialFilter, sort, fields } = queryDefinition
  if (selector || partialFilter || sort || fields) return true
  return false
}

/**
 * Returns full documents after a bulk update
 *
 * @private
 *
 * @param  {import("./types").CouchDBBulkResult[]} bulkResponse - Response from bulk docs
 * @param  {import("./types").CozyClientDocument[]} originalDocuments - Documents that were updated
 * @returns {{ data: import("./types").CozyClientDocument[] }} - Full documents with updated _id and _rev
 */
export const transformBulkDocsResponse = (bulkResponse, originalDocuments) => {
  const updatedDocs = zipWith(bulkResponse, originalDocuments, (result, od) =>
    result.ok
      ? {
          ...od,
          _id: result.id,
          _rev: result.rev
        }
      : od
  )

  if (bulkResponse.find(x => !x.ok)) {
    throw new BulkEditError(bulkResponse, updatedDocs)
  }
  return {
    data: updatedDocs
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
      logger.warn(
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

  async persistData(data, forward) {
    return forward(data)
  }
  /**
   *
   * @param {QueryDefinition} query - Query to execute
   * @returns {Promise<import("./types").ClientResponse>}
   */
  executeQuery(query) {
    const { doctype, selector, id, ids, referenced, ...options } = query
    if (!doctype) {
      logger.warn('Bad query', query)
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
    if (hasFindOptions(query)) {
      return collection.find(selector, options)
    } else {
      return collection.all(options)
    }
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
        if (doc._type === DOCTYPE_FILES) {
          return this.stackClient
            .collection(DOCTYPE_FILES)
            .addReferencedBy(doc, props.referencedDocuments)
        } else {
          throw new Error('The document type should be io.cozy.files')
        }
      case MutationTypes.REMOVE_REFERENCED_BY:
        if (doc._type === DOCTYPE_FILES) {
          return this.stackClient
            .collection(DOCTYPE_FILES)
            .removeReferencedBy(doc, props.referencedDocuments)
        } else {
          throw new Error('The document type should be io.cozy.files')
        }
      case MutationTypes.UPLOAD_FILE:
        return this.stackClient
          .collection(DOCTYPE_FILES)
          .upload(props.file, props.dirPath)
      default:
        return forward(mutation, result)
    }
  }
}
