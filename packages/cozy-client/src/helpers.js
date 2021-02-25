import { Association } from './associations'

export const dehydrate = document => {
  const dehydrated = Object.entries(document).reduce(
    (documentArg, [key, value]) => {
      let document = documentArg
      if (!(value instanceof Association)) {
        document[key] = value
      } else if (value.dehydrate) {
        document = value.dehydrate(document)
      } else {
        throw new Error(
          `Association on key ${key} should have a dehydrate method`
        )
      }
      return document
    },
    {}
  )
  return dehydrated
}

const ensureFirstSlash = path => {
  if (!path) {
    return '/'
  } else {
    return path.startsWith('/') ? path : '/' + path
  }
}

/**
 * generateWebLink - Construct a link to a web app
 *
 * This function does not get its cozy url from a CozyClient instance so it can
 * be used to build urls that point to other Cozies than the user's own Cozy.
 * This is useful when pointing to the Cozy of the owner of a shared note for
 * example.
 *
 * @param {object} options               Object of options
 * @param {string}   [options.cozyUrl]       Base URL of the cozy, eg. cozy.tools or test.mycozy.cloud
 * @param {Array}    options.searchParams  Array of search parameters as [key, value] arrays, eg. ['username', 'bob']
 * @param {string}   [options.pathname]      Path to a specific part of the app, eg. /public
 * @param {string}   [options.hash]          Path inside the app, eg. /files/test.jpg
 * @param {string}   [options.slug]          Slug of the app
 * @param {string}   [options.subDomainType] Whether the cozy is using flat or nested subdomains. Defaults to flat.
 *
 * @returns {string} Generated URL
 */
export const generateWebLink = ({
  cozyUrl,
  searchParams = [],
  pathname,
  hash,
  slug,
  subDomainType
}) => {
  const url = new URL(cozyUrl)

  url.host =
    subDomainType === 'nested'
      ? `${slug}.${url.host}`
      : url.host
          .split('.')
          .map((x, i) => (i === 0 ? x + '-' + slug : x))
          .join('.')
  url.pathname = pathname
  url.hash = ensureFirstSlash(hash)

  for (const [param, value] of searchParams) {
    url.searchParams.set(param, value)
  }

  return url.toString()
}
