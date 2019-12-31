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
 * Ensures existence of `_id` and `_type` and defines a `path`
 * on file if the parent directory is provided.
 *
 * @param {object} file - object representing the file
 * @param {object} parent - object representing the parent directory
 * @returns {object} full normalized object
 */
export function normalize(file, parent) {
  const id = file._id || file.id
  const type = file.type || file._type || 'io.cozy.files'
  const path = parent && parent.path ? parent.path + '/' + file.name : undefined
  return {
    _id: id,
    id: id,
    _type: type,
    type: type,
    path: path,
    ...file
  }
}
