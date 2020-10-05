import DocumentCollection, { normalizeDoc } from './DocumentCollection'
import { FetchError } from './errors'
import Collection from './Collection'

export const APPS_DOCTYPE = 'io.cozy.apps'

export const normalizeApp = (app, doctype) => {
  return { ...app, ...normalizeDoc(app, doctype), ...app.attributes }
}

/**
 * Extends `DocumentCollection` API along with specific methods for `io.cozy.apps`.
 */
class AppCollection extends DocumentCollection {
  constructor(stackClient) {
    super(APPS_DOCTYPE, stackClient)
    this.endpoint = '/apps/'
  }

  get(idArg) {
    let id
    if (idArg.indexOf('/') > -1) {
      id = idArg.split('/')[1]
    } else {
      console.warn(
        `Deprecated: in next versions of cozy-client, it will not be possible to query apps/konnectors only with id, please use the form ${this.doctype}/${idArg}

- Q('io.cozy.apps').getById('banks')
+ Q('io.cozy.apps').getById('io.cozy.apps/banks')`
      )
      id = idArg
    }
    return Collection.get(
      this.stackClient,
      `${this.endpoint}${encodeURIComponent(id)}`,
      {
        normalize: this.constructor.normalizeDoctype(this.doctype)
      }
    )
  }

  /**
   * Lists all apps, without filters.
   *
   * The returned documents are not paginated by the stack.
   *
   * @returns {{data, meta, skip, next}} The JSON API conformant response.
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

AppCollection.normalizeDoctype = DocumentCollection.normalizeDoctypeJsonApi

export default AppCollection
