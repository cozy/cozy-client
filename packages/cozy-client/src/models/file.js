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
