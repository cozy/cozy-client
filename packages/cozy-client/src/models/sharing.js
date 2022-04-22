import { DOCTYPE_FILES, DOCTYPE_PERMISSIONS } from '../const'
import CozyClient from '../CozyClient'
import { generateWebLink } from '../helpers'

/**
 * Generate Sharing link for one or many files
 *
 * @param {CozyClient} client - Instance of CozyClient
 * @param {string[]} filesIds - Array of io.cozy.files ids
 * @param {boolean} [isFlatDomain] -
 * @returns {Promise<string>} Shared link
 */
export const getSharingLink = async (client, filesIds, isFlatDomain) => {
  const PERMS = {
    _type: DOCTYPE_PERMISSIONS,
    permissions: {
      files: { type: DOCTYPE_FILES, values: filesIds, verbs: ['GET'] }
    }
  }
  const { data: sharedLink } = await client.save(PERMS)

  const webLink = generateWebLink({
    cozyUrl: client.getStackClient().uri,
    searchParams: [['sharecode', sharedLink?.attributes?.shortcodes?.code]],
    pathname: '/public',
    slug: 'drive',
    subDomainType: isFlatDomain ? 'flat' : 'nested'
  })

  return webLink
}
