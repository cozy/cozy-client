import mime from 'mime/lite'
import has from 'lodash/has'
import DocumentCollection, { normalizeDoc } from './DocumentCollection'
import { uri, slugify, forceFileDownload, formatBytes } from './utils'
import * as querystring from './querystring'
const ROOT_DIR_ID = 'io.cozy.files.root-dir'
const CONTENT_TYPE_OCTET_STREAM = 'application/octet-stream'

const normalizeFile = file => ({
  ...normalizeDoc(file, 'io.cozy.files'),
  ...file.attributes
})

const sanitizeFileName = name => name && name.trim()

const getFileTypeFromName = name =>
  mime.getType(name) || CONTENT_TYPE_OCTET_STREAM

export const isFile = ({ _type, type }) =>
  _type === 'io.cozy.files' || type === 'directory' || type === 'file'

export const isDirectory = ({ type }) => type === 'directory'

const raceWithCondition = (promises, predicate) => {
  return new Promise(resolve => {
    promises.forEach(p =>
      p.then(res => {
        if (predicate(res)) {
          resolve(true)
        }
      })
    )
    Promise.all(promises).then(() => resolve(false))
  })
}

const dirName = path => {
  const lastIndex = path.lastIndexOf('/')
  return path.substring(0, lastIndex)
}

/**
 * Implements `DocumentCollection` API along with specific methods for
 * `io.cozy.files`.
 *
 * Files are a special type of documents and are handled differently by the stack:
 * special routes are to be used, and there is a notion of referenced files, aka
 * files associated to a specific document
 */
class FileCollection extends DocumentCollection {
  constructor(doctype, stackClient) {
    super(doctype, stackClient)
    this.specialDirectories = {}
  }

  /**
   * Fetches the file's data
   *
   * @param {string} id File id
   * @returns {{data, included}} Information about the file or folder and it's descendents
   */
  get(id) {
    return this.statById(id)
  }

  /**
   * Returns a filtered list of documents using a Mango selector.
   *
   * The returned documents are paginated by the stack.
   *
   * @param  {object} selector The Mango selector.
   * @param  {{sort, fields, limit, skip, indexId}} options The query options.
   * @returns {{data, meta, skip, next}} The JSON API conformant response.
   * @throws {FetchError}
   */
  async find(selector, options = {}) {
    const { skip = 0 } = options
    const resp = await this.stackClient.fetchJSON(
      'POST',
      '/files/_find',
      await this.toMangoOptions(selector, options)
    )
    return {
      data: resp.data.map(f => normalizeFile(f)),
      meta: resp.meta,
      next: resp.meta.count > skip + resp.data.length,
      skip
    }
  }

  /**
   * async findReferencedBy - Returns the list of files referenced by a document — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/
   *
   * @param  {object} document        A JSON representing a document, with at least a `_type` and `_id` field.
   * @param  {object} options         Additional options
   * @param  {number} options.skip    For skip-based pagination, the number of referenced files to skip.
   * @param  {number} options.limit   For pagination, the number of results to return.
   * @param  {object} options.cursor  For cursor-based pagination, the index cursor.
   * @returns {object}                The JSON API conformant response.
   */
  async findReferencedBy(document, { skip = 0, limit, cursor } = {}) {
    const params = {
      include: 'files',
      'page[limit]': limit,
      'page[cursor]': cursor,
      sort: 'datetime'
    }
    const url = uri`/data/${document._type}/${document._id}/relationships/references`
    const path = querystring.buildURL(url, params)
    const resp = await this.stackClient.fetchJSON('GET', path)
    return {
      data: resp.data.map(f => normalizeFile(f)),
      included: resp.included ? resp.included.map(f => normalizeFile(f)) : [],
      next: has(resp, 'links.next'),
      meta: resp.meta,
      skip
    }
  }

  /**
   *  Add referenced_by documents to a file — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/#post-filesfile-idrelationshipsreferenced_by
   *
   *  For example, to have an album referenced by a file:
   * ```
   * addReferencedBy({_id: 123, _type: "io.cozy.files", name: "cozy.jpg"}, [{_id: 456, _type: "io.cozy.photos.albums", name: "Happy Cloud"}])
   * ```
   *
   * @param  {object} document        A JSON representing the file
   * @param  {Array}  documents       An array of JSON documents having a `_type` and `_id` field.
   * @returns {object}                The JSON API conformant response.
   */
  addReferencedBy(document, documents) {
    const refs = documents.map(d => ({ id: d._id, type: d._type }))
    return this.stackClient.fetchJSON(
      'POST',
      uri`/files/${document._id}/relationships/referenced_by`,
      { data: refs }
    )
  }

  /**
   *  Remove referenced_by documents from a file — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/#delete-filesfile-idrelationshipsreferenced_by
   *
   *  For example, to remove an album reference from a file:
   * ```
   *  removeReferencedBy({_id: 123, _type: "io.cozy.files", name: "cozy.jpg"}, [{_id: 456, _type: "io.cozy.photos.albums", name: "Happy Cloud"}])
   * ```
   *
   * @param  {object} document        A JSON representing the file
   * @param  {Array}  documents       An array of JSON documents having a `_type` and `_id` field.
   * @returns {object}                The JSON API conformant response.
   */
  removeReferencedBy(document, documents) {
    const refs = documents.map(d => ({ id: d._id, type: d._type }))
    return this.stackClient.fetchJSON(
      'DELETE',
      uri`/files/${document._id}/relationships/referenced_by`,
      { data: refs }
    )
  }

  /**
   *  Add files references to a document — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/#post-datatypedoc-idrelationshipsreferences
   *
   *  For example, to add a photo to an album:
   * ```
   *  addReferencesTo({_id: 456, _type: "io.cozy.photos.albums", name: "Happy Cloud"}, [{_id: 123, _type: "io.cozy.files", name: "cozy.jpg"}])
   * ```
   *
   * @param  {object} document        A JSON representing a document, with at least a `_type` and `_id` field.
   * @param  {Array}  documents       An array of JSON files having an `_id` field.
   * @returns {object}                The JSON API conformant response.
   */
  addReferencesTo(document, documents) {
    const refs = documents.map(d => ({ id: d._id, type: 'io.cozy.files' }))
    return this.stackClient.fetchJSON(
      'POST',
      uri`/data/${document._type}/${document._id}/relationships/references`,
      { data: refs }
    )
  }

  /**
   *  Remove files references to a document — see https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/#delete-datatypedoc-idrelationshipsreferences
   *
   *  For example, to remove a photo from an album:
   * ```
   *  removeReferencesTo({_id: 456, _type: "io.cozy.photos.albums", name: "Happy Cloud"}, [{_id: 123, _type: "io.cozy.files", name: "cozy.jpg"}])
   * ```
   *
   * @param  {object} document        A JSON representing a document, with at least a `_type` and `_id` field.
   * @param  {Array}  documents       An array of JSON files having an `_id` field.
   * @returns {object}                The JSON API conformant response.
   */
  removeReferencesTo(document, documents) {
    const refs = documents.map(d => ({ id: d._id, type: 'io.cozy.files' }))
    return this.stackClient.fetchJSON(
      'DELETE',
      uri`/data/${document._type}/${document._id}/relationships/references`,
      { data: refs }
    )
  }

  async destroy({ _id, relationships }, { ifMatch = '' } = {}) {
    if (
      relationships &&
      relationships.referenced_by &&
      Array.isArray(relationships.referenced_by.data)
    ) {
      for (const ref of relationships.referenced_by.data) {
        await this.removeReferencesTo({ _id: ref.id, _type: ref.type }, [
          { _id }
        ])
      }
    }
    const resp = await this.stackClient.fetchJSON(
      'DELETE',
      uri`/files/${_id}`,
      undefined,
      {
        headers: {
          'If-Match': ifMatch
        }
      }
    )
    return {
      data: normalizeFile(resp.data)
    }
  }

  /**
   * Restores a trashed file.
   *
   * @param {string} id   - The file's id
   * @returns {Promise}   - A promise that returns the restored file if resolved.
   * @throws {FetchError}
   *
   */
  restore(id) {
    return this.stackClient.fetchJSON('POST', uri`/files/trash/${id}`)
  }

  /**
   * async deleteFilePermanently - Definitely delete a file
   *
   * @param  {string} id - The id of the file to delete
   * @returns {object} The deleted file object
   */
  async deleteFilePermanently(id) {
    const resp = await this.stackClient.fetchJSON('PATCH', uri`/files/${id}`, {
      data: {
        type: 'io.cozy.files',
        id,
        attributes: {
          permanent_delete: true
        }
      }
    })

    return resp.data
  }
  /**
   *
   * @param {File|Blob|Stream|string|ArrayBuffer} data file to be uploaded
   * @param {string} dirPath Path to upload the file to. ie : /Administative/XXX/
   * @returns {object} Created io.cozy.files
   */
  async upload(data, dirPath) {
    const dirId = await this.ensureDirectoryExists(dirPath)
    return this.createFile(data, { dirId })
  }

  /**
   *
   * @param {File|Blob|Stream|string|ArrayBuffer} data file to be uploaded
   * @param {object} params Additionnal parameters
   * @param {string} params.name Name of the file
   * @param {string} params.dirId Id of the directory you want to upload the file to
   * @param {boolean} params.executable If the file is an executable or not
   * @param {object} params.metadata io.cozy.files.metadata to attach to the file
   * @param  {object}  params.options     Options to pass to doUpload method (additional headers)
   */
  async createFile(
    data,
    { name, dirId = '', executable, metadata, ...options } = {}
  ) {
    // handle case where data is a file and contains the name
    if (!name && typeof data.name === 'string') {
      name = data.name
    }
    name = sanitizeFileName(name)
    if (typeof name !== 'string' || name === '') {
      throw new Error('missing name argument')
    }
    if (executable === undefined) {
      executable = false
    }
    let metadataId = ''
    if (metadata) {
      const meta = await this.createFileMetadata(metadata)
      metadataId = meta.data.id
    }
    const path = uri`/files/${dirId}?Name=${name}&Type=file&Executable=${executable}&MetadataID=${metadataId}`
    return this.doUpload(data, path, options)
  }

  /**
   * updateFile - Updates a file's data
   *
   * @param  {object}  data               Javascript File object
   * @param  {object}  params             Additional parameters
   * @param  {string}  params.fileId      The id of the file to update (required)
   * @param  {boolean} params.executable  Whether the file is executable or not
   * @param  {object}  params.metadata    Metadata to be attached to the File io.cozy.file
   * @param  {object}  params.options     Options to pass to doUpload method (additional headers)
   * @returns {object}                     Updated document
   */
  async updateFile(
    data,
    { executable = false, fileId, metadata, ...options } = {}
  ) {
    if (!fileId || typeof fileId !== 'string') {
      throw new Error('missing fileId argument')
    }

    // handle case where data is a file and contains the name
    if (typeof data.name !== 'string') {
      throw new Error('missing name in data argument')
    }

    const name = sanitizeFileName(data.name)
    if (typeof name !== 'string' || name === '') {
      throw new Error('missing name argument')
    }
    /**
     * We already use the body to send the content of the file. So we have 2 choices :
     * Use an object in a query string to send the metadata
     * create a new header http
     * In both case, we have a size limitation depending of the browser.
     *
     * So we had this current workaround where we create the metadata before
     * (no size limit since we can use the body for that) and after we use the ID.
     */
    let metadataId
    let path = uri`/files/${fileId}?Name=${name}&Type=file&Executable=${executable}`
    if (metadata) {
      const meta = await this.createFileMetadata(metadata)
      metadataId = meta.data.id
      path = path + `&MetadataID=${metadataId}`
    }

    return this.doUpload(data, path, options, 'PUT')
  }

  getDownloadLinkById(id, filename) {
    return this.stackClient
      .fetchJSON('POST', uri`/files/downloads?Id=${id}&Filename=${filename}`)
      .then(this.extractResponseLinkRelated)
  }

  getDownloadLinkByRevision(versionId, filename) {
    return this.stackClient
      .fetchJSON(
        'POST',
        uri`/files/downloads?VersionId=${versionId}&Filename=${filename}`
      )
      .then(this.extractResponseLinkRelated)
  }
  getDownloadLinkByPath(path) {
    return this.stackClient
      .fetchJSON('POST', uri`/files/downloads?Path=${path}`)
      .then(this.extractResponseLinkRelated)
  }

  extractResponseLinkRelated = res => {
    let href = res.links && res.links.related
    if (!href) throw new Error('No related link in server response')
    return this.stackClient.fullpath(href)
  }

  /**
   * Download a file or a specific version of the file
   *
   * @param {object} file io.cozy.files object
   * @param {string} versionId Id of the io.cozy.files.version
   * @param {string} filename The name you want for the downloaded file
   *                            (by default the same as the file)
   */
  async download(file, versionId = null, filename = undefined) {
    let href
    const filenameToUse = filename ? filename : file.name
    /**
     * Passing a filename to forceFileDownload is not enough
     * for a few browsers since the stack's response header will
     * not contain that name. Passing the filename to
     * getDownloadLinkBy{Id,Revision} will ask the stack to
     * return this filename in its content-disposition
     * header response
     */
    if (!versionId) {
      href = await this.getDownloadLinkById(file._id, filenameToUse)
    } else {
      href = await this.getDownloadLinkByRevision(versionId, filenameToUse)
    }
    forceFileDownload(`${href}?Dl=1`, filenameToUse)
  }

  /**
   * Fetch the binary of a file or a specific version of a file
   * Useful for instance when you can't download the file directly
   * (via a content-disposition attachement header) and need to store
   * it before doing an operation.
   *
   * @param {string} id Id of the io.cozy.files or io.cozy.files.version
   *
   */
  async fetchFileContent(id) {
    return this.stackClient.fetch('GET', `/files/download/${id}`)
  }
  /**
   * Get a beautified size for a given file
   * 1024B => 1KB
   * 102404500404B => 95.37 GB
   *
   * @param {object} file io.cozy.files object
   * @param {int} decimal number of decimal
   */
  getBeautifulSize(file, decimal) {
    return formatBytes(parseInt(file.size), decimal)
  }

  async downloadArchive(fileIds, notSecureFilename = 'files') {
    const filename = slugify(notSecureFilename)
    const href = await this.getArchiveLinkByIds(fileIds, filename)
    const fullpath = this.stackClient.fullpath(href)
    forceFileDownload(fullpath, filename + '.zip')
  }

  async getArchiveLinkByIds(ids, name = 'files') {
    const resp = await this.stackClient.fetchJSON('POST', '/files/archive', {
      data: {
        type: 'io.cozy.archives',
        attributes: {
          name,
          ids
        }
      }
    })
    return resp.links.related
  }

  /**
   * Checks if the file belongs to the parent's hierarchy.
   *
   * @param  {string|object}  child    The file which can either be an id or an object
   * @param  {string|object}  parent   The parent target which can either be an id or an object
   * @returns {boolean}                 Whether the file is a parent's child
   */
  async isChildOf(child, parent) {
    let { _id: childID, dirID: childDirID, path: childPath } =
      typeof child === 'object' ? child : { _id: child }
    let { _id: parentID } =
      typeof parent === 'object' ? parent : { _id: parent }
    if (childID === parentID || childDirID === parentID) {
      return true
    }
    if (!childPath) {
      const childDoc = await this.statById(childID)
      childPath = childDoc.data.path
      childDirID = childDoc.data.dirID
    }

    // Build hierarchy paths
    let currPath = childPath
    const targetsPath = [childPath]
    while (currPath != '') {
      const newPath = dirName(currPath)
      if (newPath != '') {
        targetsPath.push(newPath)
      }
      currPath = newPath
    }
    targetsPath.reverse()

    // Look for all hierarchy in parallel and return true as soon as a dir is the searched parent
    return raceWithCondition(
      targetsPath.map(path => this.statByPath(path)),
      stat => stat.data._id == parentID
    )
  }

  async statById(id, options = {}) {
    const { limit, skip = 0 } = options
    const params = {
      limit,
      skip
    }
    const url = uri`/files/${id}`
    const path = querystring.buildURL(url, params)
    const resp = await this.stackClient.fetchJSON('GET', path)
    return {
      data: normalizeFile(resp.data),
      included: resp.included && resp.included.map(f => normalizeFile(f))
    }
  }

  async statByPath(path) {
    const resp = await this.stackClient.fetchJSON(
      'GET',
      uri`/files/metadata?Path=${path}`
    )
    return {
      data: normalizeFile(resp.data),
      included: resp.included && resp.included.map(f => normalizeFile(f))
    }
  }

  async createDirectory(attributes = {}) {
    const { name, dirId, lastModifiedDate } = attributes
    const safeName = sanitizeFileName(name)
    if (typeof name !== 'string' || safeName === '') {
      throw new Error('missing name argument')
    }
    const lastModified =
      lastModifiedDate &&
      (typeof lastModifiedDate === 'string'
        ? new Date(lastModifiedDate)
        : lastModifiedDate)

    const resp = await this.stackClient.fetchJSON(
      'POST',
      uri`/files/${dirId}?Name=${safeName}&Type=directory`,
      undefined,
      {
        headers: {
          Date: lastModified ? lastModified.toGMTString() : ''
        }
      }
    )
    return {
      data: normalizeFile(resp.data)
    }
  }

  async ensureDirectoryExists(path) {
    if (!this.specialDirectories[path]) {
      const resp = await this.createDirectoryByPath(path)
      this.specialDirectories[path] = resp.data._id
    }
    return this.specialDirectories[path]
  }

  async getDirectoryOrCreate(name, parentDirectory) {
    if (parentDirectory && !parentDirectory.attributes)
      throw new Error('Malformed parent directory')

    const safeName = sanitizeFileName(name)
    const path = `${
      parentDirectory._id === ROOT_DIR_ID ? '' : parentDirectory.attributes.path
    }/${safeName}`

    try {
      const stat = await this.statByPath(path || '/')
      return stat
    } catch (error) {
      const parsedError = JSON.parse(error.message)
      const errors = parsedError.errors
      if (errors && errors.length && errors[0].status === '404') {
        return this.createDirectory({
          name: safeName,
          dirId: parentDirectory && parentDirectory._id
        })
      }
      throw errors
    }
  }

  /**
   * async createDirectoryByPath - Creates one or more folders until the given path exists
   *
   * @param  {string} path
   * @returns {object} The document corresponding to the last segment of the path
   */
  async createDirectoryByPath(path) {
    const parts = path.split('/').filter(part => part !== '')
    const root = await this.statById(ROOT_DIR_ID)
    if (!parts.length) return root
    let parentDir = root
    for (const part of parts) {
      parentDir = await this.getDirectoryOrCreate(part, parentDir.data)
    }
    return parentDir
  }

  /**
   * async updateAttributes - Updates a file / folder's attributes except
   * the metadata attribute. If you want to update its metadata attribute,
   * then use `updateFileMetadataAttribute` since `metadata` is a specific
   * doctype.
   *
   * For instance, if you want to update the name of a file, you can pass
   * attributes = { name: 'newName'}
   *
   * You can see the attributes for both Folder and File (as they share the
   * same doctype they have a few in common) here :
   * https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.files/#iocozyfiles
   *
   * @param  {string} id         File id
   * @param  {object} attributes New file attributes
   * @returns {object}            Updated document
   */
  async updateAttributes(id, attributes) {
    const resp = await this.stackClient.fetchJSON('PATCH', uri`/files/${id}`, {
      data: {
        type: 'io.cozy.files',
        id,
        attributes
      }
    })
    return {
      data: normalizeFile(resp.data)
    }
  }

  async updateFileMetadata(id, attributes) {
    console.warn(
      'CozyClient FileCollection updateFileMetadata method is deprecated. Use updateAttributes instead'
    )
    return this.updateAttributes(id, attributes)
  }

  /**
   * Send a metadata object that can be associated to a file uploaded after that,
   * via the MetadataID query parameter.
   * See https://github.com/cozy/cozy-stack/blob/master/docs/files.md#post-filesuploadmetadata
   *
   * @param {object} attributes The file's metadata
   * @returns {object}          The Metadata object
   */
  async createFileMetadata(attributes) {
    const resp = await this.stackClient.fetchJSON(
      'POST',
      uri`/files/upload/metadata`,
      {
        data: {
          type: 'io.cozy.files.metadata',
          attributes
        }
      }
    )
    return {
      data: resp.data
    }
  }

  /**
   *
   * Updates the metadata attribute of a io.cozy.files
   * Creates a new version of the file without having
   * to upload again the file's content
   *
   * To see available content of the metadata attribute
   * see : https://docs.cozy.io/en/cozy-doctypes/docs/io.cozy.files_metadata/
   *
   * @param {string} id File id
   * @param {object} metadata io.cozy.files.metadata attributes
   * @returns {object} io.cozy.files updated
   */
  async updateMetadataAttribute(id, metadata) {
    const resp = await this.stackClient.fetchJSON(
      'POST',
      uri`/files/${id}/versions`,
      {
        data: {
          type: 'io.cozy.files.metadata',
          attributes: metadata
        }
      }
    )
    return {
      data: resp.data
    }
  }
  /**
   *
   * This method should not be called directly to upload a file.
   * You should use `createFile`
   *
   * @param {File|Blob|Stream|string|ArrayBuffer} data file to be uploaded
   * @param {string} path Uri to call the stack from. Something like
   * `/files/${dirId}?Name=${name}&Type=file&Executable=${executable}&MetadataID=${metadataId}`
   * @param {object} options Additional headers
   * @param {string} method POST / PUT / PATCH
   */
  async doUpload(data, path, options, method = 'POST') {
    if (!data) {
      throw new Error('missing data argument')
    }
    // transform any ArrayBufferView to ArrayBuffer
    if (data.buffer && data.buffer instanceof ArrayBuffer) {
      data = data.buffer
    }

    const isBuffer =
      typeof ArrayBuffer !== 'undefined' && data instanceof ArrayBuffer
    const isFile = typeof File !== 'undefined' && data instanceof File
    const isBlob = typeof Blob !== 'undefined' && data instanceof Blob
    const isStream = data.readable === true && typeof data.pipe === 'function'
    const isString = typeof data === 'string'

    if (!isBuffer && !isFile && !isBlob && !isStream && !isString) {
      throw new Error('invalid data type')
    }

    let { contentType, contentLength, checksum, lastModifiedDate, ifMatch } =
      options || {}
    if (!contentType) {
      if (isBuffer) {
        contentType = CONTENT_TYPE_OCTET_STREAM
      } else if (isFile) {
        contentType =
          data.type ||
          getFileTypeFromName(data.name.toLowerCase()) ||
          CONTENT_TYPE_OCTET_STREAM
        if (!lastModifiedDate) {
          lastModifiedDate = data.lastModifiedDate
        }
      } else if (isBlob) {
        contentType = data.type || CONTENT_TYPE_OCTET_STREAM
      } else if (isStream) {
        contentType = CONTENT_TYPE_OCTET_STREAM
      } else if (typeof data === 'string') {
        contentType = 'text/plain'
      }
    }

    if (lastModifiedDate && typeof lastModifiedDate === 'string') {
      lastModifiedDate = new Date(lastModifiedDate)
    }

    const headers = {
      'Content-Type': contentType
    }
    if (contentLength) headers['Content-Length'] = String(contentLength)
    if (checksum) headers['Content-MD5'] = checksum
    if (lastModifiedDate) headers['Date'] = lastModifiedDate.toGMTString()
    if (ifMatch) headers['If-Match'] = ifMatch

    const resp = await this.stackClient.fetchJSON(method, path, data, {
      headers,
      onUploadProgress: options.onUploadProgress
    })
    return {
      data: normalizeFile(resp.data)
    }
  }
}

export default FileCollection
