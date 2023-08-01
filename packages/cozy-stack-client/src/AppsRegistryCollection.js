import DocumentCollection, { normalizeDoc } from './DocumentCollection'

export const normalizeAppFromRegistry = (app, doctype) => {
  return {
    ...normalizeDoc(app, doctype)
  }
}
export const APPS_REGISTRY_DOCTYPE = 'io.cozy.apps_registry'

class AppsRegistryCollection extends DocumentCollection {
  constructor(stackClient) {
    super(APPS_REGISTRY_DOCTYPE, stackClient)
    this.endpoint = '/registry/'
  }
  async get(slug) {
    const app = await this.stackClient.fetchJSON('GET', this.endpoint + slug)
    return { data: normalizeAppFromRegistry(app, APPS_REGISTRY_DOCTYPE) }
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
