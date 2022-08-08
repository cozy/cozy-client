import { Association } from './associations'

import { CozyLinkData, SubdomainType } from './types'

export const dehydrate = document => {
  const dehydrated = Object.entries(document).reduce(
    (documentArg, [key, value]) => {
      let document = documentArg
      if (!(value instanceof Association)) {
        document[key] = value
        // @ts-ignore
      } else if (value.dehydrate) {
        // @ts-ignore
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
 * @param {string}   options.cozyUrl       Base URL of the cozy, eg. cozy.tools or test.mycozy.cloud
 * @param {Array}    [options.searchParams]  Array of search parameters as [key, value] arrays, eg. ['username', 'bob']
 * @param {string}   [options.pathname]      Path to a specific part of the app, eg. /public
 * @param {string}   [options.hash]          Path inside the app, eg. /files/test.jpg
 * @param {string}   [options.slug]          Slug of the app
 * @param {string}   [options.subDomainType] Whether the cozy is using flat or nested subdomains. Defaults to flat.
 *
 * @returns {string} Generated URL
 */
export const generateWebLink = ({
  cozyUrl,
  searchParams: searchParamsOption,
  pathname,
  hash,
  slug,
  subDomainType
}) => {
  const searchParams = searchParamsOption || []
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

/**
 * Deconstruct the given link in order to retrieve useful data like Cozy's name, domain, or slug
 *
 * The given link MUST contain a slug
 *
 * @param {string} webLink - link to deconstruct. It should be a link from a Cozy and containing a slug
 * @param {SubdomainType} [subDomainType=flat] - whether the cozy is using flat or nested subdomains.
 * @returns {CozyLinkData} Deconstructed link
 */
export const deconstructCozyWebLinkWithSlug = (
  webLink,
  subDomainType = 'flat'
) => {
  const url = new URL(webLink)

  const slug =
    subDomainType === 'nested'
      ? url.host.split('.')[0]
      : url.host.split('.')[0].split('-')[1]

  const cozyName =
    subDomainType === 'nested'
      ? url.host.split('.')[1]
      : url.host.split('.')[0].split('-')[0]

  const cozyBaseDomain = url.host
    .split('.')
    .slice(subDomainType === 'nested' ? 2 : 1)
    .join('.')

  return {
    cozyBaseDomain,
    cozyName,
    pathname: url.pathname,
    hash: url.hash,
    protocol: url.protocol,
    searchParams: url.searchParams.toString(),
    slug
  }
}

export class InvalidProtocolError extends Error {
  constructor(url) {
    super(`Invalid URL protocol ${url.protocol}`)

    this.url = url
  }
}

export class InvalidCozyUrlError extends Error {
  constructor(url) {
    super(`URL ${url.toString()} does not seem to be a valid Cozy URL`)

    this.url = url
  }
}

/* uri - Returns a well formed URL origin from a protocol, a hostname and a port
 *
 * If the protocol and/or port are omitted from the argument, the function will
 * default to HTTPS and omit the port in the returned origin.
 *
 * @param {object} url          Object of URL elements
 * @param {string} url.protocol Protocol to use in the origin (e.g. http)
 * @param {string} url.hostname Hostname to use in the origin (e.g. claude.mycozy.cloud)
 * @param {string} url.port     Port to use in the origin (e.g. 8080)
 *
 * @returns {string} Generated URL origin
 */
const uri = ({ protocol, hostname, port }) => {
  return (
    (protocol !== '' ? `${protocol}//` : 'https://') +
    hostname +
    (port !== '' ? `:${port}` : '')
  )
}

/* wellKnownUrl - Returns a valid URL string to a Well Known password change page
 *
 * The built URL will point to the origin generated from the given protocol,
 * hostname and port.
 *
 * @param {object} url          Object of URL elements
 * @param {string} url.protocol Protocol to use in the origin (e.g. http)
 * @param {string} url.hostname Hostname to use in the origin (e.g. claude.mycozy.cloud)
 * @param {string} url.port     Port to use in the origin (e.g. 8080)
 *
 * @returns {string} Generated Well Known password change URL string
 */
const wellKnownUrl = url => uri(url) + '/.well-known/change-password'

/* isValidOrigin - Checks whether a given URL is a valid Cozy origin
 *
 * This method tries to fetch the Well Known change password page of the Cozy
 * supposedly at the given origin. This allows us to determine whether the given
 * origin is the root URL of a Cozy or not via the status of the response:
 * - a 200 response status means there's an actual Well Known password change
 *   page accessible from the given origin so we suppose it's a valid Cozy
 *   origin (i.e. it could be another site altogether though)
 * - a 401 response status means the pointed page requires authentication so the
 *   origin is probably pointing to a Cozy app
 * - another status means there aren't any Cozy behind to the given origin
 *
 * @param {object} url          Object of URL elements
 * @param {string} url.protocol Protocol to use in the origin (e.g. http)
 * @param {string} url.hostname Hostname to use in the origin (e.g. claude.mycozy.cloud)
 * @param {string} url.port     Port to use in the origin (e.g. 8080)
 *
 * @returns {Promise<boolean>} True if we believe there's a Cozy behind the given origin
 * @throws {InvalidCozyUrlError} Thrown when we know for sure there aren't any Cozy behind the given origin
 */
const isValidOrigin = async url => {
  const { status } = await fetch(wellKnownUrl(url))

  if (status === 404) {
    throw new InvalidCozyUrlError(url)
  }
  return status === 200
}

/**
 * rootCozyUrl - Get the root URL of a Cozy from more precise ones
 *
 * The goal is to allow users to use any URL copied from their browser as their
 * Cozy URL rather than trying to explain to them what we expect (e.g. when
 * requesting the Cozy URL to connect an app).
 * If we can't get the root URL either because there's no Cozy or the domain
 * does not exist or anything else, we'll throw an InvalidCozyUrlError.
 * Also, since we communicate only via HTTP or HTTPS, we'll throw an
 * InvalidProtocolError if any other protocol is used.
 *
 * This function expects a fully qualified URL thus with a protocol and a valid
 * hostname. If your application accepts Cozy intances as input (e.g. `claude`
 * when the Cozy can be found at `https://claude.mycozy.cloud`), it is your
 * responsibility to add the appropriate domain to the hostname before calling
 * this function.
 *
 * Examples:
 *
 * 1. getting the root URL when your user gives you its instance name
 *
 *   const userInput = 'claude'
 *   const rootUrl = await rootCozyUrl(new URL(`https://${userInput}.mycozy.cloud`))
 *   // → returns new URL('https://claude.mycozy.cloud')
 *
 * 2. getting the root URL when your user gives you a Cozy Drive URL
 *
 *   const userInput = 'https://claude-drive.mycozy.cloud/#/folder/io.cozy.files.root-dir'
 *   const rootUrl = await rootCozyUrl(new URL(userInput))
 *   // → returns new URL('https://claude.mycozy.cloud')
 *
 * 3. getting the root URL when the Cozy uses nested sub-domains
 *
 *   const userInput = 'http://photos.camille.nimbus.com:8080/#/album/1234567890'
 *   const rootCozyUrl = await rootCozyUrl(new URL(userInput))
 *   // → returns new URL('http://camille.nimbus.com:8080')
 *
 * @param {URL} url The URL from which we'll try to get the root Cozy URL
 *
 * @returns {Promise<URL>} The root Cozy URL
 */
export const rootCozyUrl = async url => {
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new InvalidProtocolError(url)
  }

  // If the entered URL is good, use it
  if (await isValidOrigin(url)) {
    return url
  }

  // If the entered URL's lowest sub-domain contains a dash, remove it and
  // what follows and try the new resulting url.
  if (/^[^.-][^.]+-[^.-]+\./.test(url.hostname)) {
    const [subDomain, ...domain] = url.hostname.split('.')
    const hostname = [subDomain.replace(/-.+/, ''), ...domain].join('.')

    if (
      await isValidOrigin({ protocol: url.protocol, hostname, port: url.port })
    ) {
      return new URL(uri({ protocol: url.protocol, hostname, port: url.port }))
    }
  }

  // Try to remove the first sub-domain in case its a nested app name
  // eslint-disable-next-line no-unused-vars
  const hostname = url.hostname
    .split('.')
    .splice(1)
    .join('.')
  if (
    await isValidOrigin({ protocol: url.protocol, hostname, port: url.port })
  ) {
    return new URL(uri({ protocol: url.protocol, hostname, port: url.port }))
  }

  // At this point, we've tried everything we could to correct the user's URL
  // without success. So bail out and let the user provide a valid one.
  throw new InvalidCozyUrlError(url)
}
