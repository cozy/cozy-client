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
