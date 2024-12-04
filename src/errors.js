import zipWith from 'lodash/zipWith'

export class BulkEditError extends Error {
  /**
   * Indicates that a bulk edit has (potentially partially) failed
   *
   * @param  {import("./types").CouchDBBulkResult[]} bulkResponse - CouchDB Bulk response
   * @param  {import("./types").CozyClientDocument[]} updatedDocs - Docs with updated _id and _rev
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
   * @returns {import("./types").CozyClientDocument[]}
   */
  getUpdatedDocuments() {
    return this.results.filter(r => r.ok).map(r => r.doc)
  }

  /**
   * Get bulk errors results
   *
   * @returns {Array<import("./types").CouchDBBulkResult & { doc: import("./types").CozyClientDocument }>}
   */
  getErrors() {
    return this.results.filter(r => !r.ok)
  }
}
