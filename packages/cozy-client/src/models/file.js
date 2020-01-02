const FILE_TYPE = 'file'
const DIR_TYPE = 'directory'

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
