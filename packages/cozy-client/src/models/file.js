import get from 'lodash/get'
import isString from 'lodash/isString'

const FILE_TYPE = 'file'
const DIR_TYPE = 'directory'

const FILENAME_WITH_EXTENSION_REGEX = /(.+)(\..*)$/

/**
 * Returns base filename and extension
 *
 * @param {object} file An io.cozy.files
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
 * @param {File} file io.cozy.files
 */
export const isFile = file => file && file.type === FILE_TYPE
/**
 *
 * @param {File} file io.cozy.files
 */
export const isDirectory = file => file && file.type === DIR_TYPE
/**
 *
 * @param {File} file io.cozy.files
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
 *
 * @param {File} file io.cozy.files
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
  const type = file.type || file._type || 'io.cozy.files'
  return { _id: id, id, _type: type, type, ...file }
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
