import DocumentCollection, { normalizeDoc } from './DocumentCollection'

export const APPS_REGISTRY_DOCTYPE = 'io.cozy.apps_registry'

export const normalizeAppFromRegistry = (data, doctype) => {
  // The registry don't return a id, so we use the slug as id.
  // Without id the document can't be stored in the cache.
  const id = `${
    data.type === 'webapp' ? 'io.cozy.apps' : 'io.cozy.konnectors'
  }/${data.slug}`

  const attributes = {
    ...data.attributes,
    ...data.latest_version?.manifest
  }

  return {
    ...normalizeDoc(
      {
        ...data,
        attributes,
        id,
        _id: id
      },
      doctype
    )
  }
}

const fetchKonnectorsByChannel = async (channel, doctype, stackClient) => {
  const resp = await stackClient.fetchJSON(
    'GET',
    `/registry?versionsChannel=${channel}&filter[type]=konnector&limit=500`
  )
  return {
    data: resp.data.map(data => normalizeAppFromRegistry(data, doctype))
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
    if (slug.startsWith('konnectors/')) {
      const channel = slug.split('/')[1]

      return fetchKonnectorsByChannel(channel, this.doctype, this.stackClient)
    }

    const resp = await this.stackClient.fetchJSON(
      'GET',
      `${this.endpoint}${slug}`
    )

    // The "maintenance" keyword calls a specific route in the stack
    // that returns a table of all applications under maintenance.
    // We processed it independently so that it could be stored in the cache.
    if (slug === 'maintenance') {
      return {
        data: resp.map(data => normalizeAppFromRegistry(data, this.doctype))
      }
    }
    return { data: normalizeAppFromRegistry(resp, this.doctype) }
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
