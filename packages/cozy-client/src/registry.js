import 'url-search-params-polyfill'
import termUtils from './terms'
import { APP_TYPE } from './constants'

const queryPartFromOptions = options => {
  const query = new URLSearchParams(options).toString()
  return query ? `?${query}` : ''
}

const getBaseRoute = app => {
  const { type } = app
  // TODO node is an historic type, it should be `konnector`, check with the back
  const route =
    type === APP_TYPE.KONNECTOR || type === 'node' ? 'konnectors' : 'apps'
  return `/${route}`
}

class Registry {
  constructor(options) {
    if (!options.client) {
      throw new Error('Need to pass a client to instantiate a Registry API.')
    }
    this.client = options.client
  }

  /**
   * Installs or updates an app from a source.
   *
   * Accepts the terms if the app has them.
   *
   * @param  {RegistryApp} app - App to be installed
   * @param  {string} source - String (ex: registry://drive/stable)
   * @returns {Promise}
   */
  async installApp(app, source) {
    const { slug, terms } = app
    const searchParams = {}
    const isUpdate = app.installed
    if (isUpdate) searchParams.PermissionsAcked = isUpdate
    if (source) searchParams.Source = source
    const querypart = queryPartFromOptions(searchParams)
    if (terms) {
      await termUtils.save(this.client, terms)
    }
    const verb = app.installed ? 'PUT' : 'POST'
    const baseRoute = getBaseRoute(app)
    return this.client.stackClient.fetchJSON(
      verb,
      `${baseRoute}/${slug}${querypart}`
    )
  }

  /**
   * Uninstalls an app.
   */
  async uninstallApp(app) {
    const { slug } = app
    const baseRoute = getBaseRoute(app)
    return this.client.stackClient.fetchJSON('DELETE', `${baseRoute}/${slug}`)
  }

  /**
   * Fetch at most 200 apps from the channel
   *
   * @param  {string} params.type - "webapp" or "konnector"
   * @param  {string} params.channel - "dev"/"beta"/"stable"
   *
   * @returns {Array<RegistryApp>}
   */
  async fetchApps(params) {
    const { channel, type } = params
    const searchParams = {
      limit: 200,
      versionsChannel: channel,
      latestChannelVersion: channel
    }
    let querypart = new URLSearchParams(searchParams).toString()
    if (type) {
      // Unfortunately, URLSearchParams encodes brackets so we have to do
      // the querypart handling manually
      querypart = querypart + `&filter[type]=${type}`
    }
    const { data: apps } = await this.client.stackClient.fetchJSON(
      'GET',
      `/registry?${querypart}`
    )
    return apps
  }

  /**
   * Fetch the list of apps that are in maintenance mode
   *
   * @returns {Array<RegistryApp>}
   */
  fetchAppsInMaintenance() {
    return this.client.stackClient.fetchJSON('GET', '/registry/maintenance')
  }

  /**
   * Fetch the status of a single app on the registry
   *
   * @param  {string} slug - The slug of the app to fetch
   *
   * @returns {RegistryApp}
   */
  fetchApp(slug) {
    return this.client.stackClient.fetchJSON('GET', `/registry/${slug}`)
  }
}

export default Registry
