import get from 'lodash/get'
import isString from 'lodash/isString'
import has from 'lodash/has'

import { setQualification } from './document'
import { Q } from '../queries/dsl'
import { IOCozyFile, QueryResult } from '../types'
import CozyClient from '../CozyClient'

const FILE_TYPE = 'file'
const DIR_TYPE = 'directory'
export const ALBUMS_DOCTYPE = 'io.cozy.photos.albums'

const FILENAME_WITH_EXTENSION_REGEX = /(.+)(\..*)$/

/**
 * Returns base filename and extension
 *
 * @param {IOCozyFile} file An io.cozy.files
 * @returns {object}  {filename, extension}
 */
export const splitFilename = file => {
  if (!isString(file.name)) throw new Error('file should have a name property ')

  if (file.type === 'file') {
    const match = file.name.match(FILENAME_WITH_EXTENSION_REGEX)
    if (match) {
      return { filename: match[1], extension: match[2] }
    }
  }
  return { filename: file.name, extension: '' }
}

/**
 *
 * @param {IOCozyFile} file io.cozy.files
 */
export const isFile = file => file && file.type === FILE_TYPE

/**
 *
 * @param {IOCozyFile} file io.cozy.files
 */
export const isDirectory = file => file && file.type === DIR_TYPE

/**
 *
 * @param {IOCozyFile} file io.cozy.files
 */
export const isNote = file => {
  if (
    file &&
    file.name &&
    file.name.endsWith('.cozy-note') &&
    file.type === FILE_TYPE &&
    file.metadata &&
    file.metadata.content !== undefined &&
    file.metadata.schema !== undefined &&
    file.metadata.title !== undefined &&
    file.metadata.version !== undefined
  )
    return true
  return false
}

/**
 * Whether the file is supported by Only Office
 *
 * @param {IOCozyFile} file - io.cozy.file document
 * @returns {boolean}
 */
export const isOnlyOfficeFile = file =>
  isFile(file) &&
  !isNote(file) &&
  (file.class === 'text' ||
    file.class === 'spreadsheet' ||
    file.class === 'slide')

/**
 * Whether the file should be opened by only office
 * We want to be consistent with the stack so we check the class attributes
 * But we want to exclude .txt and .md because the CozyUI Viewer can already show them
 *
 * @param {IOCozyFile} file - io.cozy.file document
 * @returns {boolean}
 */
export const shouldBeOpenedByOnlyOffice = file =>
  isOnlyOfficeFile(file) &&
  !file.name.endsWith('.txt') &&
  !file.name.endsWith('.md')

/**
 *
 * @param {IOCozyFile} file io.cozy.files
 * @returns {boolean} true if the file is a shortcut
 */
export const isShortcut = file => {
  return file && file.class === 'shortcut'
}

/**
 * Normalizes an object representing a io.cozy.files object
 *
 * Ensures existence of `_id` and `_type`
 *
 * @public
 * @param {object} file - object representing the file
 * @returns {object} full normalized object
 */
export function normalize(file) {
  const id = file._id || file.id
  const doctype = file._type || 'io.cozy.files'
  return { _id: id, id, _type: doctype, ...file }
}

/**
 * Ensure the file has a `path` attribute, or build it
 *
 * @public
 * @param {object} file - object representing the file
 * @param {object} parent - parent directory for the file
 * @returns {object} file object with path attribute
 */
export function ensureFilePath(file, parent) {
  if (file.path) return file
  if (!parent || !parent.path)
    throw new Error(`Could not define a file path for ${file._id || file.id}`)
  const path = parent.path + '/' + file.name
  return { path: path, ...file }
}

/**
 * Get the id of the parent folder (`null` for the root folder)
 *
 * @param {object} file  - io.cozy.files document
 * @returns {string|null} id of the parent folder, if any
 */
export function getParentFolderId(file) {
  const parentId = get(file, 'attributes.dir_id')
  return parentId === '' ? null : parentId
}

/**
 * Returns the status of a sharing shortcut.
 *
 * @param {IOCozyFile} file  - io.cozy.files document
 *
 * @returns {string} A description of the status
 */
export const getSharingShortcutStatus = file =>
  get(file, 'metadata.sharing.status')

/**
 * Returns the mime type of the target of the sharing shortcut, if it is a file.
 *
 * @param {IOCozyFile} file  - io.cozy.files document
 *
 * @returns {string} The mime-type of the target file, or an empty string is the target is not a file.
 */
export const getSharingShortcutTargetMime = file =>
  get(file, 'metadata.target.mime')

/**
 * Returns the doctype of the target of the sharing shortcut.
 *
 * @param {IOCozyFile} file  - io.cozy.files document
 *
 * @returns {string} A doctype
 */
export const getSharingShortcutTargetDoctype = file =>
  get(file, 'metadata.target._type')

/**
 * Returns whether the file is a shortcut to a sharing
 *
 * @param {IOCozyFile} file  - io.cozy.files document
 *
 * @returns {boolean}
 */
export const isSharingShortcut = file => Boolean(getSharingShortcutStatus(file))

/**
 * Returns whether the file is a shortcut to a sharing
 *
 * @deprecated Prefer to use isSharingShortcut.
 * @param {IOCozyFile} file  - io.cozy.files document
 *
 * @returns {boolean}
 */
export const isSharingShorcut = file => {
  console.warn(
    'Deprecation: `isSharingShorcut` is deprecated, please use `isSharingShortcut` instead'
  )
  return isSharingShortcut(file)
}

/**
 * Returns whether the sharing shortcut is new
 *
 * @param {IOCozyFile} file  - io.cozy.files document
 *
 * @returns {boolean}
 */
export const isSharingShortcutNew = file =>
  getSharingShortcutStatus(file) === 'new'

/**
 * Returns whether the sharing shortcut is new
 *
 * @deprecated Prefer to use isSharingShortcutNew.
 * @param {object} file  - io.cozy.files document
 *
 * @returns {boolean}
 */
export const isSharingShorcutNew = file => {
  console.warn(
    'Deprecation: `isSharingShorcutNew` is deprecated, please use `isSharingShortcutNew` instead'
  )
  return isSharingShortcutNew(file)
}

/**
 * Save the file with the given qualification
 *
 * @param {CozyClient} client - The CozyClient instance
 * @param {IOCozyFile} file - The file to qualify
 * @param {object} qualification - The file qualification
 * @returns {Promise<IOCozyFile>} - The saved file
 */
export const saveFileQualification = async (client, file, qualification) => {
  const qualifiedFile = setQualification(file, qualification)
  return client
    .collection('io.cozy.files')
    .updateMetadataAttribute(file._id, qualifiedFile.metadata)
}

/**
 * Helper to query files based on qualification rules
 *
 * @param {object} client - The CozyClient instance
 * @param {object} docRules - the rules containing the searched qualification and the count
 * @returns {Promise<QueryResult>} - The files found by the rules
 */
export const fetchFilesByQualificationRules = async (client, docRules) => {
  const { rules, count } = docRules
  const query = Q('io.cozy.files')
    .where({
      ...rules
    })
    .partialIndex({
      trashed: false
    })
    .indexFields(['cozyMetadata.updatedAt', 'metadata.qualification'])
    .sortBy([{ 'cozyMetadata.updatedAt': 'desc' }])
    .limitBy(count ? count : 1)
  const result = await client.query(query)
  return result
}

/**
 * Whether the file is referenced by an album
 *
 * @param {IOCozyFile} file - An io.cozy.files document
 * @returns {boolean}
 */
export const isReferencedByAlbum = file => {
  if (
    file.relationships &&
    file.relationships.referenced_by &&
    file.relationships.referenced_by.data &&
    file.relationships.referenced_by.data.length > 0
  ) {
    const references = file.relationships.referenced_by.data
    for (const reference of references) {
      if (reference.type === ALBUMS_DOCTYPE) {
        return true
      }
    }
  }
  return false
}

/**
 * Whether the file's metadata attribute exists
 *
 * @param {object} params - Param
 * @param {IOCozyFile} params.file - An io.cozy.files document
 * @param {string} params.attribute - Metadata attribute to check
 * @returns {boolean}
 */
export const hasMetadataAttribute = ({ file, attribute }) =>
  has(file, `metadata.${attribute}`)
