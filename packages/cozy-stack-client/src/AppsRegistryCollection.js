import { transformRegistryFormatToStackFormat } from 'cozy-client/dist/registry'

import DocumentCollection, { normalizeDoc } from './DocumentCollection'
import { FetchError } from './errors'

export const APPS_REGISTRY_DOCTYPE = 'io.cozy.apps_registry'

export const normalizeAppFromRegistry = (app, doctype) => {
  return {
    ...normalizeDoc(app, doctype)
  }
}

/**
 * Extends `DocumentCollection` API along with specific methods for `io.cozy.apps_registry`.
 */
class AppsRegistryCollection extends DocumentCollection {
  constructor(stackClient) {
    super(APPS_REGISTRY_DOCTYPE, stackClient)
    this.endpoint = '/registry/'
  }

  /**
   * Fetches all apps from the registry.
   *
   * @param  {object} [option] - The fetch option
   * @param  {number} [option.limit] - Limit of apps to fetch
   * @returns {Promise<{data, meta, skip, next}>} The JSON API conformant response.
   * @throws {FetchError}
   */
  async all({ limit = 1000 } = {}) {
    const resp = await this.stackClient.fetchJSON(
      'GET',
      `${this.endpoint}?limit=${limit}`
    )
    const dataNormalized = resp.data.map(d => {
      return normalizeAppFromRegistry(
        transformRegistryFormatToStackFormat(d),
        this.doctype
      )
    })

    return {
      data: dataNormalized,
      meta: {
        count: resp.meta.count
      },
      skip: 0,
      next: false
    }
  }

  /**
   * Fetches an app from the registry.
   *
   * @param  {string} slug - Slug of the app
   * @returns {Promise<{data: object}>} JsonAPI response containing normalized document as data attribute
   * @throws {FetchError}
   */
  async get(slug) {
    const app = await this.stackClient.fetchJSON(
      'GET',
      `${this.endpoint}${slug}`
    )

    const data = transformRegistryFormatToStackFormat(app)
    return { data: normalizeAppFromRegistry(data, this.doctype) }
  }

  async create() {
    throw new Error(
      'create() method is not available for AppsRegistryCollection'
    )
  }

  async destroy() {
    throw new Error(
      'destroy() method is not available for AppsRegistryCollection'
    )
  }
}

export default AppsRegistryCollection
