import { Q } from 'cozy-client'

/**
 * Checks the value of the extension_installed attribute
 *
 * @param {import("cozy-client/types/CozyClient").default} client - The CozyClient instance
 * @returns {Promise<boolean>} - Returns the value of the extension_installed attribute
 */
export const hasExtensionInstalledAttribute = async client => {
  try {
    const {
      data: { extension_installed }
    } = await client.fetchQueryAndGetFromState({
      definition: Q('io.cozy.settings').getById('io.cozy.settings.bitwarden'),
      options: {
        as: 'io.cozy.settings/io.cozy.settings.bitwarden',
        singleDocData: true
      }
    })

    return Boolean(extension_installed)
  } catch {
    return false
  }
}
