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
    const resp = await this.stackClient.fetchJSON(
      'GET',
      `${this.endpoint}${slug}`
    )

    // The "maintenance" keyword calls a specific route in the stack
    // that returns a table of all applications under maintenance.
    // We processed it independently so that it could be stored in the cache.
    if (slug === 'maintenance') {
      return {
        data: resp.map(app => ({
          _type: APPS_REGISTRY_DOCTYPE,
          ...app
        }))
      }
    }

    const data = transformRegistryFormatToStackFormat(resp)
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
