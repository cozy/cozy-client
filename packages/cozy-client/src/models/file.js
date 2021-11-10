import get from 'lodash/get'
import isString from 'lodash/isString'
import has from 'lodash/has'
import trimEnd from 'lodash/trimEnd'

import { setQualification } from './document/qualification'
import { Q } from '../queries/dsl'
import { IOCozyFile, QueryResult } from '../types'
import { DOCTYPE_FILES } from '../const'
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
 * @param {IOCozyFile} file - io.cozy.files document
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
  const doctype = file._type || DOCTYPE_FILES
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
 * @param {IOCozyFile} file - io.cozy.files document
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
 * @param {IOCozyFile} file - io.cozy.files document
 *
 * @returns {string} A doctype
 */
export const getSharingShortcutTargetDoctype = file =>
  get(file, 'metadata.target._type')

/**
 * Returns whether the file is a shortcut to a sharing
 *
 * @param {IOCozyFile} file - io.cozy.files document
 *
 * @returns {boolean}
 */
export const isSharingShortcut = file => Boolean(getSharingShortcutStatus(file))

/**
 * Returns whether the file is a shortcut to a sharing
 *
 * @deprecated Prefer to use isSharingShortcut.
 * @param {IOCozyFile} file - io.cozy.files document
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
 * @param {IOCozyFile} file - io.cozy.files document
 *
 * @returns {boolean}
 */
export const isSharingShortcutNew = file =>
  getSharingShortcutStatus(file) === 'new'

/**
 * Returns whether the sharing shortcut is new
 *
 * @deprecated Prefer to use isSharingShortcutNew.
 * @param {object} file - io.cozy.files document
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
 * @returns {Promise<IOCozyFile>} The saved file
 */
export const saveFileQualification = async (client, file, qualification) => {
  const qualifiedFile = setQualification(file, qualification)
  return client
    .collection(DOCTYPE_FILES)
    .updateMetadataAttribute(file._id, qualifiedFile.metadata)
}

/**
 * Helper to query files based on qualification rules
 *
 * @param {object} client - The CozyClient instance
 * @param {object} docRules - the rules containing the searched qualification and the count
 * @returns {Promise<QueryResult>} The files found by the rules
 */
export const fetchFilesByQualificationRules = async (client, docRules) => {
  const { rules, count } = docRules
  const query = Q(DOCTYPE_FILES)
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

/**
 * async getFullpath - Gets a file's path
 *
 * @param {CozyClient} client - The CozyClient instance
 * @param {string} dirId  - The id of the parent directory
 * @param {string} name  - The file's name
 * @returns {Promise<string>} The full path of the file in the cozy
 **/
export const getFullpath = async (client, dirId, name) => {
  if (!dirId) {
    throw new Error('You must provide a dirId')
  }

  const { data: parentDir } = await client.query(
    Q(DOCTYPE_FILES).getById(dirId)
  )
  const parentDirectoryPath = trimEnd(parentDir.path, '/')
  return `${parentDirectoryPath}/${name}`
}

/**
 * Move file to destination.
 *
 * @param {CozyClient} client             - The CozyClient instance
 * @param   {string} fileId               - The file's id (required)
 * @param   {object} destination
 * @param   {string} destination.folderId - The destination folder's id (required)
 * @param   {string} destination.path     - The file's path after the move (optional, used to optimize performance in case of conflict)
 * @param   {boolean} force               - Whether we should overwrite, i.e. put to trash, the destination in case of conflict (defaults to false).
 * @returns {Promise}                     - A promise that returns the move action response and the deleted file id (if any) if resolved or an Error if rejected
 *
 */
export const move = async (client, fileId, destination, force = false) => {
  const { folderId, path } = destination
  try {
    const resp = await client
      .collection(DOCTYPE_FILES)
      .updateFileMetadata(fileId, {
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
        const { data: movedFile } = await client.query(
          Q(DOCTYPE_FILES).getById(fileId)
        )
        const filename = movedFile.name
        destinationPath = await getFullpath(client, folderId, filename)
      }
      const conflictResp = await client
        .collection(DOCTYPE_FILES)
        .statByPath(destinationPath)
      await client.collection(DOCTYPE_FILES).destroy(conflictResp.data)
      const resp = await client
        .collection(DOCTYPE_FILES)
        .updateFileMetadata(fileId, {
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
 *
 * Method to upload a file even if a file with the same name already exists.
 *
 * @param {CozyClient} client   - The CozyClient instance
 * @param {string} dirPath      - Fullpath of directory to upload to ex: path/to/
 * @param {object} file         - HTML Object file
 * @param {object} metadata     - An object containing the wanted metadata to attach
 * @returns {Promise<IOCozyFile>} The overrided file
 */
export const overrideFileForPath = async (client, dirPath, file, metadata) => {
  let path = dirPath
  if (!path.endsWith('/')) path = path + '/'

  const filesCollection = client.collection(DOCTYPE_FILES)
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
 * @param {string} filenameWithoutExtension - A filename without the extension
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

/**
 * Generate a file name for a revision
 *
 * @param {IOCozyFile} file - io.cozy.files document
 * @param {object} revision - The revision containing the updated_at
 * @param {function} f      - A function taking a a date and a format as arguments to generate the name.
 */
export const generateFileNameForRevision = (file, revision, f) => {
  const { filename, extension } = splitFilename(file)
  return `${filename}_${f(
    revision.updated_at,
    'DD MMMM - HH[h]mm'
  )}${extension}`
}

/**
 * @typedef FileUploadOptions
 * @property {string} [name]              - The file name to upload
 * @property {string} [dirId]             - The dirId to upload the file to
 * @property {object} [metadata]          - An object containing the metadata to attach
 * @property {string} [contentType]       - The file Content-Type
 * @property {string} [conflictStrategy]  - Erase / rename
 */

/**
 * The goal of this method is to upload a file based on a conflict strategy.
 * Be careful: We need to check if the file exists by doing a statByPath query
 * before trying to upload the file since if we post and the stack return a
 * 409 conflict, we will get a SPDY_ERROR_PROTOCOL on Chrome. This is the only
 * viable workaround
 * If there is no conflict, then we upload the file.
 * If there is a conflict, then we apply the conflict strategy : `erase` or `rename`:
 *   - The `erase` strategy means an upload with a new version
 *   - The `rename` strategy means a new upload with a new name
 *
 * @param {CozyClient} client         - The CozyClient instance
 * @param {string|ArrayBuffer} file   - Can be the file path (file://) or the binary itself
 * @param {FileUploadOptions} options - The upload options
 */
export const uploadFileWithConflictStrategy = async (client, file, options) => {
  const { name, dirId, conflictStrategy } = options

  try {
    const path = await getFullpath(client, dirId, name)
    const existingFile = await client.collection(DOCTYPE_FILES).statByPath(path)
    const { id: fileId } = existingFile.data
    if (conflictStrategy === 'erase') {
      //!TODO Bug Fix. Seems we have to pass a name attribute ?!
      const resp = await client
        .collection(DOCTYPE_FILES)
        .updateFile(file, { ...options, fileId })
      return resp
    } else {
      // @ts-ignore
      const { filename, extension } = splitFilename({
        name,
        type: 'file'
      })
      const newFileName = generateNewFileNameOnConflict(filename) + extension
      //recall itself with the newFilename.
      return uploadFileWithConflictStrategy(client, file, {
        ...options,
        name: newFileName
      })
    }
  } catch (error) {
    if (/Not Found/.test(error.message)) {
      return client.collection(DOCTYPE_FILES).createFile(file, options)
    }
    throw error
  }
}

/**
 * Read a file on a mobile
 *
 * @param {string} fileURL - The local file path (file://)
 */
export const readMobileFile = async fileURL => {
  /** Cordova plugin doesn't support promise since they are supporting Android 4.X.X
   * so we have to create manually a promise to be able to write beautiful code ;)
   */

  const p = new Promise((resolve, reject) => {
    const onResolvedLocalFS = async fileEntry => {
      fileEntry.file(
        async file => {
          const reader = new FileReader()
          reader.onloadend = async () => {
            resolve(reader.result)
          }
          // Read the file as an ArrayBuffer
          reader.readAsArrayBuffer(file)
        },
        err => {
          // Since this module is pretty recent, let's have this info in sentry if needed
          console.error('error getting fileentry file!' + err) // eslint-disable-line no-console
          reject(err)
        }
      )
    }
    const onError = error => {
      reject(error)
    }
    /**
     * file:/// can not be converted to a fileEntry without the Cordova's File plugin.
     * `resolveLocalFileSystemURL` is provided by this plugin and can resolve the native
     * path to a fileEntry readable by a `FileReader`
     *
     * When we finished to read the fileEntry as buffer, we start the upload process
     *
     */
    // @ts-ignore
    window.resolveLocalFileSystemURL(fileURL, onResolvedLocalFS, onError)
  })
  return p
}

/**
 * Upload a file on a mobile
 *
 * @param {CozyClient} client         - The CozyClient instance
 * @param {string} fileURL            - The local file path (file://)
 * @param {FileUploadOptions} options - The upload options
 */
export const doMobileUpload = async (client, fileURL, options) => {
  const file = await readMobileFile(fileURL)
  return uploadFileWithConflictStrategy(client, file, options)
}
