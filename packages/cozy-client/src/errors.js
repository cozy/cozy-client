import zipWith from 'lodash/zipWith'
import { CozyClientDocument, CouchDBBulkResult } from './types'

export class BulkEditError extends Error {
  /**
   * Indicates that a bulk edit has (potentially partially) failed
   *
   * @param  {CouchDBBulkResult[]} bulkResponse - CouchDB Bulk response
   * @param  {CozyClientDocument[]} updatedDocs - Docs with updated _id and _rev
   */
  constructor(bulkResponse, updatedDocs) {
    super('Error while bulk saving')
    this.name = 'BulkEditError'
    this.results = zipWith(bulkResponse, updatedDocs, (result, doc) => {
      return { ...result, doc }
    })
  }

  /**
   * Get documents that have been correctly updated
   *
   * @returns {CozyClientDocument[]}
   */
  getUpdatedDocuments() {
    return this.results.filter(r => r.ok).map(r => r.doc)
  }

  /**
   * Get bulk errors results
   *
   * @returns {Array<CouchDBBulkResult & { doc: CozyClientDocument }>}
   */
  getErrors() {
    return this.results.filter(r => !r.ok)
  }
}
