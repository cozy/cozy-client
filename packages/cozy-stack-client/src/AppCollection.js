import { normalizeDoc } from './DocumentCollection'
import { uri } from './utils'

export const APPS_DOCTYPE = 'io.cozy.apps'

export const normalizeApp = app => {
  return { ...app, ...normalizeDoc(app, APPS_DOCTYPE), ...app.attributes }
}

export default class AppCollection {
  constructor(client) {
    this.client = client
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
    const path = uri`/apps/`
    const resp = await this.client.fetchJSON('GET', path)
    return {
      data: resp.data.map(app => normalizeApp(app)),
      meta: {
        count: resp.meta.count
      },
      skip: 0,
      next: false
    }
  }
}
