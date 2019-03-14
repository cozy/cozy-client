import { normalizeDoc } from './DocumentCollection'
import { uri } from './utils'

export const APPS_DOCTYPE = 'io.cozy.apps'

export const normalizeApp = (app, doctype) => {
  return {
    ...app,
    ...normalizeDoc(app, doctype),
    ...app.attributes
  }
}

/**
 * Implements methods specific to applications: io.cozy.apps or io.cozy.konnectors
 */
class AppCollection {
  endpoint = 'apps'

  /**
   * @param  {string} doctype App doctype (io.cozy.apps or io.cozy.konnectors)
   * @param  {CozyStackClient} stackClient The stackClient instance to use
   */
  constructor(doctype, stackClient) {
    this.doctype = doctype
    this.stackClient = stackClient
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
    const path = uri`/${this.endpoint}/`
    const resp = await this.stackClient.fetchJSON('GET', path)
    return {
      data: resp.data.map(app => normalizeApp(app, this.doctype)),
      meta: {
        count: resp.meta.count
      },
      skip: 0,
      next: false
    }
  }

  async find() {
    throw new Error('find() method is not yet implemented')
  }

  async get() {
    throw new Error('get() method is not yet implemented')
  }

  async create() {
    throw new Error('create() method is not available for applications')
  }

  async update() {
    throw new Error('update() method is not available for applications')
  }

  async destroy() {
    throw new Error('destroy() method is not available for applications')
  }
}

export default AppCollection
