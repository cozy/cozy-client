const trimEnd = require('lodash/trimEnd')

const FILENAME_WITH_EXTENSION_REGEX = /(.+)(\..*)$/

/**
 * async getFullpath - Gets a file's path
 *
 * @param  {string} dirID  The id of the parent directory
 * @param  {string} name   The file's name
 * @returns {string}        The full path of the file in the cozy
 **/
export const getFullpath = async (client, dirId, name) => {
  if (!dirId) {
    throw new Error('You must provide a dirId')
  }

  const parentDir = await client.get('io.cozy.files', dirId)
  const parentDirectoryPath = trimEnd(parentDir.path, '/')
  return `${parentDirectoryPath}/${name}`
}

/**
 * Move file to destination.
 *
 * @param   {object} client               - CozyClient instance
 * @param   {string} fileId               - The file's id (required)
 * @param   {object} destination
 * @param   {string} destination.folderId - The destination folder's id (required)
 * @param   {string} destination.path     - The file's path after the move (optional, used to optimize performance in case of conflict)
 * @param   {string} force                - Whether we should overwrite the destination in case of conflict (defaults to false)
 * @returns {Promise}                     - A promise that returns the move action response and the deleted file id (if any) if resolved or an Error if rejected
 *
 */
export const move = async (client, fileId, destination, force = false) => {
  const { folderId, path } = destination
  const filesCollection = client.collection('io.cozy.files')
  try {
    const resp = await filesCollection.updateFileMetadata(fileId, {
      dir_id: folderId
    })

    return {
      moved: resp.data,
      deleted: null
    }
  } catch (e) {
    if (e.status === 409 && force) {
      let destinationPath
      if (path) {
        destinationPath = path
      } else {
        const movedFile = await this.get(fileId)
        const filename = movedFile.name
        destinationPath = await this.getFullpath(folderId, filename)
      }
      const conflictResp = await filesCollection.statByPath(destinationPath)
      await filesCollection.destroy(conflictResp.data)
      const resp = await filesCollection.updateFileMetadata(fileId, {
        dir_id: folderId
      })

      return {
        moved: resp.data,
        deleted: conflictResp.data.id
      }
    } else {
      throw e
    }
  }
}
/**
 * Method to split both the filename and the extension
 *
 * @param {object} file An io.cozy.files
 * @returns {object}  return an object with {filename: , extension: }
 */
export const splitFilename = file => {
  if (!file.name) throw new Error('file should have a name property ')

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
 * Method to upload a file even if a file with the same name already exists.
 *
 * @param {object} client CozyClient instance
 * @param {string} path Fullpath for the file ex: path/to/
 * @param {object} file HTML Object file
 * @param {Object} metadata An object containing the wanted metadata to attach
 */
export const overrideFileForPath = async (client, path, file, metadata) => {
  if (!path.endsWith('/')) path = path + '/'

  const filesCollection = client.collection('io.cozy.files')
  try {
    const existingFile = await filesCollection.statByPath(path + file.name)

    const { id: fileId, dir_id: dirId } = existingFile.data
    const resp = await filesCollection.updateFile(file, {
      dirId,
      fileId,
      metadata
    })
    return resp
  } catch (error) {
    if (/Not Found/.test(error)) {
      const dirId = await filesCollection.ensureDirectoryExists(path)
      const createdFile = await filesCollection.createFile(file, {
        dirId,
        metadata
      })
      return createdFile
    }
    throw error
  }
}
/**
 * Method to generate a new filename if there is a conflict
 *
 * @param {string} filenameWithoutExtension A filename without the extension
 * @returns {string} A filename with the right suffix
 */
export const generateNewFileNameOnConflict = filenameWithoutExtension => {
  //Check if the string ends by _1
  const regex = new RegExp('(_)([0-9]+)$')
  const matches = filenameWithoutExtension.match(regex)
  if (matches) {
    let versionNumber = parseInt(matches[2])
    //increment versionNumber
    versionNumber++
    const newFilenameWithoutExtension = filenameWithoutExtension.replace(
      new RegExp('(_)([0-9]+)$'),
      `_${versionNumber}`
    )
    return newFilenameWithoutExtension
  } else {
    return `${filenameWithoutExtension}_1`
  }
}

export const generateFileNameForRevision = (file, revision, f) => {
  const { filename, extension } = splitFilename({
    name: file.name,
    type: 'file'
  })
  return `${filename}_${f(
    revision.updated_at,
    'DD MMMM - HH[h]mm'
  )}${extension}`
}
/**
 * The goal of this method is to upload a file based on a conflict strategy.
 * Be careful: We need to check if the file exists by doing a statByPath query
 * before trying to upload the file since if we post and the stack return a
 * 409 conflict, we will get a SPDY_ERROR_PROTOCOL on Chrome. This is the only
 * viable workaround
 * If there is no conflict, then we upload the file.
 * If there is a conflict, then we apply the conflict strategy : `erase` or `rename`
 *
 * @param {string} name File Name
 * @param {ArrayBuffer} file data
 * @param {string} dirId dir id where to upload
 * @param {String} conflictStrategy Actually only 2 hardcoded strategies 'erase' or 'rename'
 */
export const uploadFileWithConflictStrategy = async (
  client,
  name,
  file,
  dirId,
  conflictStrategy
) => {
  const filesCollection = client.collection('io.cozy.files')

  try {
    const path = await getFullpath(dirId, name)

    const existingFile = await filesCollection.statByPath(path)
    const { id: fileId } = existingFile.data
    if (conflictStrategy === 'erase') {
      //!TODO Bug Fix. Seems we have to pass a name attribute ?!
      const resp = await filesCollection.updateFile(file, {
        dirId,
        fileId,
        name
      })
      return resp
    } else {
      const { filename, extension } = splitFilename({
        name,
        type: 'file'
      })
      const newFileName = generateNewFileNameOnConflict(filename) + extension
      //recall itself with the newFilename.
      return uploadFileWithConflictStrategy(
        newFileName,
        file,
        dirId,
        conflictStrategy
      )
    }
  } catch (error) {
    if (/Not Found/.test(error.message)) {
      return await upload(name, file, dirId)
    }
    throw error
  }
}

export const upload = async (client, name, file, dirId) => {
  return client
    .collection('io.cozy.files')
    .createFile(file, { name, dirId, contentType: 'image/jpeg' })
}
