const STORE_SLUG = 'store'

/**
 * Return Store URL where an app/konnector can be installed / updated
 *
 * @param  {Array}  [appData=[]]   Apps data, as returned by endpoint /apps/ or
 * /konnectors/
 * @param  {object} [app={}] AppObject
 * @returns {string}                URL as string
 */
export const getStoreInstallationURL = (appData = [], app = {}) => {
  if (!app.slug) {
    throw new Error('Expected app / konnector with the defined slug')
  }

  const storeApp = isInstalled(appData, { slug: STORE_SLUG })
  if (!storeApp) return null

  const storeUrl = storeApp.links && storeApp.links.related

  if (!storeUrl) return null

  return `${storeUrl}#/discover/${app.slug}/install`
}

/**
 *
 * @param {Array} apps Array of apps returned by /apps /konnectors
 * @param {object} wantedApp io.cozy.app with at least a slug
 * @returns {object} The io.cozy.app is installed or undefined if not
 */
export const isInstalled = (apps = [], wantedApp = {}) => {
  return apps.find(
    app => app.attributes && app.attributes.slug === wantedApp.slug
  )
}

/**
 *
 * @param {object} app io.cozy.app object
 * @returns {string} url to the app
 */
export const getUrl = app => {
  return app.links && app.links.related
}
