import DocumentCollection, { normalizeDoc } from './DocumentCollection'

export const APPS_DOCTYPE = 'io.cozy.apps'

export const normalizeApp = (app, doctype) => {
  return { ...app, ...normalizeDoc(app, doctype), ...app.attributes }
}

/**
 * Extends `DocumentCollection` API along with specific methods for `io.cozy.apps`.
 */
class AppCollection extends DocumentCollection {
  endpoint = '/apps/'

  constructor(stackClient) {
    super(APPS_DOCTYPE, stackClient)
  }

  /**
   * Lists all apps, without filters.
   *
   * The returned documents are not paginated by the stack.
   *
   * @return {{data, meta, skip, next}} The JSON API conformant response.
   * @throws {FetchError}
   */
  async all() {
    const resp = await this.stackClient.fetchJSON('GET', this.endpoint)
    return {
      data: resp.data.map(app => normalizeApp(app, this.doctype)),
      meta: {
        count: resp.meta.count
      },
      skip: 0,
      next: false
    }
  }
}

export default AppCollection
