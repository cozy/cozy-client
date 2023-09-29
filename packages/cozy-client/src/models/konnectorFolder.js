//@ts-check
import { ensureMagicFolder, MAGIC_FOLDERS } from './folder'

import CozyClient from '../CozyClient'
import { getAccountName } from './account'

import { getLocalizer } from './document/locales'

const FILES_DOCTYPE = 'io.cozy.files'
const PERMISSIONS_DOCTYPE = 'io.cozy.permissions'

// Default name for base directory
const DEFAULT_LOCALIZED_BASE_DIR = 'Administrative'

/**
 * Ensures the destination folder of a konnector exists and is initiated with proper permissions and references
 *
 * @param {CozyClient} client - CozyClient instance
 * @param {Object} options - options object
 * @param {import('../types').IOCozyKonnector} options.konnector - io.cozy.konnectors document
 * @param {import('../types').IOCozyAccount} options.account - io.cozy.accounts document
 * @param {String} options.lang - instance current language. ex: 'fr'
 * @returns {Promise<import('../types').IOCozyFolder>}
 */
export const ensureKonnectorFolder = async (
  client,
  { konnector, account, lang }
) => {
  const permissions = client.collection(PERMISSIONS_DOCTYPE)
  const files = client.collection(FILES_DOCTYPE)

  const t = getLocalizer(lang)
  const [adminFolder, photosFolder] = await Promise.all([
    ensureMagicFolder(
      client,
      MAGIC_FOLDERS.ADMINISTRATIVE,
      t('MagicFolders.administrative')
    ),
    ensureMagicFolder(client, MAGIC_FOLDERS.PHOTOS, t('MagicFolders.photos'))
  ])

  const path = buildFolderPath(konnector, account, {
    administrative: adminFolder.path,
    photos: photosFolder.path
  })
  const folder =
    (await statDirectoryByPath(client, path)) ||
    (await createDirectoryByPath(client, path))

  await permissions.add(konnector, buildFolderPermission(folder))
  await files.addReferencesTo(konnector, [folder])

  return folder
}

/**
 * Creates a directory from a given path
 *
 * @param  {CozyClient}  client CozyClient
 * @param  {string}  path   Directory path
 * @returns {Promise<import('../types').IOCozyFolder>}         Directory attributes
 */
export const createDirectoryByPath = async (client, path) => {
  const { data } = await client
    .collection(FILES_DOCTYPE)
    .createDirectoryByPath(path)
  return data
}

/**
 * Retrieves a directory from its path
 *
 * @param  {CozyClient}  client CozyClient
 * @param  {string}  path   Directory path
 * @returns {Promise<import('../types').IOCozyFolder|null>}        Created io.cozy.files document
 * @throws will throw an error on any error without status === 404
 */
export const statDirectoryByPath = async (client, path) => {
  try {
    const response = await client.collection(FILES_DOCTYPE).statByPath(path)
    if (response.data.trashed) {
      return null
    }
    return response.data
  } catch (error) {
    if (error && error.status === 404) return null
    throw new Error(error.message)
  }
}

/**
 * Build folder path for a given konnector and a given account.
 *
 * If konnector.folders[0].defaultDir exists, it is used as default directory.
 *
 * Occurrences of following strings in base directory are replaced by:
 * * `$administrative`: Administrative folder
 * * `$photos`: Photos folder
 *
 * Occurrences of following strings in path are replaced by:
 * * `$account: Account label (id or name)`
 * * `$konnector`: Konnector name
 *
 * If no konnectors.folders[0].defaultDir is set, the default dir used is
 * *  `$administrative/$konnector/$account`
 *
 * @param  {import('../types').IOCozyKonnector} konnector Konnector document
 * @param  {import('../types').IOCozyAccount} account   Account document
 * @param  {Object<string, string>} magicFolders   Object containing a mapping from folder
 * identifiers (ex: $administrative) to their localized values (ex:
 * Administratif).
 * @returns {String}           The result path
 */

export const buildFolderPath = (konnector, account, magicFolders = {}) => {
  const fullPath =
    konnector?.folders?.[0]?.defaultDir || '$administrative/$konnector/$account'
  // Trim `/` and avoid multiple `/` characters with regexp
  let sanitizedPath = trim(fullPath.replace(/(\/+)/g, '/'), '/')
  // If the konnector doesn't have any of our base dir, we set it to $administrative
  if (!hasBaseDir(sanitizedPath)) {
    sanitizedPath = '$administrative/' + sanitizedPath
  }
  /**
   * Now that we have our sanitizedPath, we can split it in two strings
   * * `baseDir` containing the baseDir path
   * * `buildedSubDir` containing the rest of the path (ie the path without baseDir)
   */
  const baseDir = sanitizedPath.split('/', 1)
  const buildedSubDir = buildSubDir(sanitizedPath, baseDir[0])

  const renderedBaseDir = renderBaseDir(baseDir[0], magicFolders)
  const renderedPath = renderSubDir(buildedSubDir, {
    // When adding a new allowed variable here, please keep documentation
    // of `renderSubDir` function up to date.
    konnector: konnector.name,
    account: getAccountName(account).replace(sanitizeAccountIdentifierRx, '-')
  })
  return `/${renderedBaseDir}/${renderedPath}`
}

/**
 * Check if the provided Path start withs our allowedBaseDirPath to see
 *
 * @param {String} path - path to test
 * @returns {Boolean}
 */
const hasBaseDir = path => {
  return allowedBaseDirVariables.some(baseDirVar => {
    return path.startsWith(baseDirVar)
  })
}
/**
 * Base directories are directory where konnector may copy their data.
 * They are expressed as variables which then need to be localized.
 * Default is `$administrative`.
 */
const allowedBaseDirVariables = ['$administrative', '$photos']

/**
 * This method creates the subDir. We can't have an empty subDir, so we set
 * it to our default '$konnector/$account'
 *
 * @param {String} fullPath String containing potentially the defaultDir
 * @param {String} defaultDir String to remove from the fullPath
 * @returns {String}
 */
const buildSubDir = (fullPath, defaultDir) => {
  let buildedSubDir = fullPath.substring(defaultDir.length)
  if (buildedSubDir === '') {
    buildedSubDir = '$konnector/$account'
  }
  return buildedSubDir
}

/**
 * Render base directory, based on given magicFolders object.
 * For example, it will render `$administrative` with the given value passed in
 * folders object. We expect to find in folders a localized value.
 *
 * @param  {String} baseDir base directory variable, expects `$administrative`
 * or `$photos`
 * @param  {Object<string, string>} magicFolders Object indexing base directory variable with
 * corresponding localized name.
 * @returns {String}         Localized directory
 */
const renderBaseDir = (baseDir, magicFolders = {}) => {
  // Look for variable name into folders but without $ prefix
  const renderedBaseDir =
    magicFolders[baseDir.slice(1)] || DEFAULT_LOCALIZED_BASE_DIR
  // Trim `/` and avoid multiple `/` characters with regexp
  return trim(renderedBaseDir.replace(/(\/+)/g, '/'), '/')
}

/**
 * Render the given folder path using the given `variables` object.
 * Available variable are `$konnector` (konnector name) and `$account`
 * (account label, i.e. id or name)
 *
 * @param  {String} path      Path to render : ex '/Administratif/$konnector/$account'
 * @param  {Object} variables Object mapping variable to actual values
 * @param  {import('../types').IOCozyKonnector['name']} variables.konnector - konnector name
 * @param  {String} variables.account - account name
 * @returns {String}           Rendered path
 */
const renderSubDir = (path, variables) => {
  // Trim `/` and avoid multiple `/` characters with regexp
  const sanitizedPath = trim(path.replace(/(\/+)/g, '/'), '/')

  // Let's get only full variable name limited by '/'. We want to avoid false
  // positive like parsing `$variableInString` to `valueInString`
  const segments = sanitizedPath.split('/')
  return segments
    .map(segment => variables?.[segment.slice(1)] || segment)
    .join('/')
}

const sanitizeAccountIdentifierRx = /\//g

/**
 * Returns a permission ready to be passed to
 * client.collection('io.cozy.permissions').add().
 *
 * @param  {import('../types').IOCozyFolder} folder    The folder which the konnector should have access
 * @returns {Object}           Permission object
 */
export const buildFolderPermission = folder => {
  return {
    // Legacy name
    saveFolder: {
      type: 'io.cozy.files',
      values: [folder._id],
      verbs: ['GET', 'PATCH', 'POST']
    }
  }
}

/**
 * Replacer of the lodash/trim function
 *
 * @param {String} str - Input string
 * @param {String} c - String to trim from the input string
 * @returns {String}
 */
const trim = (str, c = '\\s') =>
  str.replace(new RegExp(`^([${c}]*)(.*?)([${c}]*)$`), '$2')
