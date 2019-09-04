import memoize from './memoize'

const mimeTypes = {
  gif: 'image/gif',
  ico: 'image/vnd.microsoft.icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml'
}

const getIconExtensionFromApp = app => {
  if (!app.icon) {
    throw new Error(
      `${app.name}: Cannot detect icon mime type since app has no icon`
    )
  }

  const extension = app.icon.split('.').pop()

  if (!extension) {
    throw new Error(
      `${app.name}: Unable to detect icon mime type from extension (${app.icon})`
    )
  }

  return extension
}

const fallbacks = async (tries, check) => {
  let err
  for (let _try of tries) {
    try {
      const res = await _try()
      check && check(res)
      return res
    } catch (e) {
      err = e
    }
  }
  throw err
}

/**
 * Fetch application/konnector that is installed
 *
 * @private
 */
const fetchAppOrKonnector = (stackClient, type, slug) =>
  stackClient.fetchJSON('GET', `/${type}s/${slug}`).then(x => x.data.attributes)

/**
 * Fetch application/konnector from the registry
 *
 * @private
 */
const fetchAppOrKonnectorViaRegistry = (stackClient, type, slug) =>
  stackClient
    .fetchJSON('GET', `/registry/${slug}`)
    .then(x => x.latest_version.manifest)

const _getIconURL = async (stackClient, opts) => {
  const { type, slug, appData, priority = 'stack' } = opts
  const iconDataFetchers = [
    () => stackClient.fetch('GET', `/${type}s/${slug}/icon`),
    () => stackClient.fetch('GET', `/registry/${slug}/icon`)
  ]
  if (priority === 'registry') {
    iconDataFetchers.reverse()
  }
  const resp = await fallbacks(iconDataFetchers, resp => {
    if (!resp.ok) {
      throw new Error(`Error while fetching icon ${resp.statusText}`)
    }
  })

  let icon = await resp.blob()
  let app
  if (!icon.type) {
    // iOS10 does not set correctly mime type for images, so we assume
    // that an empty mime type could mean that the app is running on iOS10.
    // For regular images like jpeg, png or gif it still works well in the
    // Safari browser but not for SVG.
    // So let's set a mime type manually. We cannot always set it to
    // image/svg+xml and must guess the mime type based on the icon attribute
    // from app/manifest
    // See https://stackoverflow.com/questions/38318411/uiwebview-on-ios-10-beta-not-loading-any-svg-images
    const appDataFetchers = [
      () => fetchAppOrKonnector(stackClient, type, slug),
      () => fetchAppOrKonnectorViaRegistry(stackClient, type, slug)
    ]
    if (priority === 'registry') {
      appDataFetchers.reverse()
    }
    app = appData || (await fallbacks(appDataFetchers)) || {}
    const ext = getIconExtensionFromApp(app)
    if (!mimeTypes[ext]) {
      throw new Error(`Unknown image extension "${ext}" for app ${app.name}`)
    }
    icon = new Blob([icon], { type: mimeTypes[ext] })
  }

  return URL.createObjectURL(icon)
}

const getIconURL = function() {
  return _getIconURL.apply(this, arguments).catch(e => {
    console.warn(e)
    return ''
  })
}

export default memoize(getIconURL, {
  maxDuration: 300 * 1000,
  key: (stackClient, opts) => {
    const { type, slug, priority } = opts
    return (
      stackClient.uri +
      +':' +
      type +
      ':' +
      slug +
      ':' +
      priority +
      ':' +
      window.navigator.onLine
    )
  }
})

export { getIconURL }
