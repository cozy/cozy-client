import { uri } from './utils'
import { normalizeDoc } from './DocumentCollection'

export const APP_DOCTYPE = 'io.cozy.apps'

/**
 * Abstracts a collection of documents of the same doctype, providing
 * CRUD methods and other helpers.
 */
export default class AppCollection {
  constructor(client) {
    this.client = client
  }

  /**
   * Lists all documents of the collection, without filters.
   *
   * The returned documents are not paginated by the stack.
   *
   * @return {{data, meta, skip, next}} The JSON API conformant response.
   * @throws {FetchError}
   */
  async all() {
    const path = uri`/apps/`
    const resp = await this.client.fetch('GET', path)
    return {
      data: resp.rows.map(row => normalizeDoc(row.doc, APP_DOCTYPE)),
      meta: { count: resp.total_rows },
      skip: 0,
      next: false
    }
  }
}
