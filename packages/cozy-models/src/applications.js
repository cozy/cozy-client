import get from 'lodash/get'
const STORE_SLUG = 'store'

/**
 * Returns the store URL of an app/konnector
 *
 * @param {Array} [appData=[]] Apps data, as returned by endpoint /apps/ or /konnectors
 * @param {object} [app={}] AppObject
 * @returns {string} URL as string
 */
export const getStoreURL = (appData = [], app = {}) => {
  if (!app.slug) {
    throw new Error('Expected app / konnector with the defined slug')
  }

  const storeApp = isInstalled(appData, { slug: STORE_SLUG })
  if (!storeApp) return null

  const storeUrl = storeApp.links && storeApp.links.related

  if (!storeUrl) return null

  return `${storeUrl}#/discover/${app.slug}`
}

/**
 * Returns the store URL to install/update an app/konnector
 *
 * @param  {Array}  [appData=[]]   Apps data, as returned by endpoint /apps/ or
 * /konnectors/
 * @param  {object} [app={}] AppObject
 * @returns {string}                URL as string
 */
export const getStoreInstallationURL = (appData = [], app = {}) => {
  const storeUrl = getStoreURL(appData, app)

  if (!storeUrl) {
    return null
  }

  return `${storeUrl}/install`
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
 * @param {object} app io.cozy.apps document
 * @returns {string} url to the app
 */
export const getUrl = app => {
  return app.links && app.links.related
}

/**
 * getAppDisplayName - Combines the translated prefix and name of the app into a single string.
 *
 * @param {object} app io.cozy.apps or io.cozy.konnectors document
 * @param {string} lang Locale to use
 *
 * @returns {string} Name of the app suitable for display
 */
export const getAppDisplayName = (app, lang) => {
  const basePrefix = get(app, 'name_prefix')
  const baseName = get(app, 'name')
  const translatedName = get(app, ['locales', lang, 'name'], baseName)
  const translatedPrefix = get(
    app,
    ['locales', lang, 'name_prefix'],
    basePrefix
  )

  return translatedPrefix && translatedPrefix.toLowerCase() !== 'cozy'
    ? `${translatedPrefix} ${translatedName}`
    : translatedName
}
