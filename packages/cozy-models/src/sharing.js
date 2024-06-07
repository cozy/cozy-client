import CozyClient, { generateWebLink } from 'cozy-client'
import { DOCTYPE_FILES } from './file'
import { DOCTYPE_PERMISSIONS } from './permission'

/**
 * Generate Sharing link for one or many files
 *
 * @param {CozyClient} client - Instance of CozyClient
 * @param {string[]} filesIds - Array of io.cozy.files ids
 * @param {object} options - Options
 * @param {string} [options.ttl] - Time to live (bigduration format, e.g. "4Y3M2D1h30m15s")
 * @param {string} [options.password] - To generate a password-protected link
 * @returns {Promise<string>} Shared link
 */
export const getSharingLink = async (
  client,
  filesIds,
  { ttl, password } = {}
) => {
  const PERMS = {
    _type: DOCTYPE_PERMISSIONS,
    permissions: {
      files: { type: DOCTYPE_FILES, values: filesIds, verbs: ['GET'] }
    },
    ...(ttl && { ttl }),
    ...(password && { password })
  }
  const { data: sharedLink } = await client.save(PERMS)

  const webLink = generateWebLink({
    cozyUrl: client.getStackClient().uri,
    searchParams: [['sharecode', sharedLink?.attributes?.shortcodes?.code]],
    pathname: '/public',
    slug: 'drive',
    subDomainType: client.capabilities.flat_subdomains ? 'flat' : 'nested'
  })

  return webLink
}
