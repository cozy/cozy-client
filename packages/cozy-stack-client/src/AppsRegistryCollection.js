import { transformRegistryFormatToStackFormat } from 'cozy-client/dist/registry'

import DocumentCollection, { normalizeDoc } from './DocumentCollection'
import { FetchError } from './errors'
import { dontThrowNotFoundError } from './Collection'

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
   * Fetches many apps from the registry by ids.
   *
   * @param  {Array<string>} slugs - The slugs of the apps to fetch
   * @returns {Promise<{data, meta, skip, next}>} The JSON API conformant response.
   * @throws {FetchError}
   */
  async getAll(slugs = []) {
    try {
      /*
       * While waiting for the stack to propose a route that meets this need, we retrieve all the apps then we filter them before returning the result.
       * (The limit of 1000 seems more than sufficient for this need)
       */
      const resp = await this.stackClient.fetchJSON(
        'GET',
        `${this.endpoint}?limit=1000`
      )
      const dataFiltered = resp.data.filter(data => slugs.includes(data.slug))
      const dataNormalized = dataFiltered.map(d => {
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
    } catch (error) {
      return dontThrowNotFoundError(error)
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
    const resp = await this.stackClient.fetchJSON(
      'GET',
      `${this.endpoint}${slug}`
    )

    // The "maintenance" keyword calls a specific route in the stack
    // that returns a table of all applications under maintenance.
    // We processed it independently so that it could be stored in the cache.
    // The stack returns some app without an id, so we use the slug as id.
    if (slug === 'maintenance') {
      return {
        data: resp.map(app =>
          normalizeAppFromRegistry(
            {
              _id: app._id || app.slug,
              ...app
            },
            this.doctype
          )
        )
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
