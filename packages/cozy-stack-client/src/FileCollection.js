import mime from 'mime-types'
import has from 'lodash/has'
import DocumentCollection, { normalizeDoc } from './DocumentCollection'
import { uri, slugify, forceFileDownload } from './utils'
import * as querystring from './querystring'
const ROOT_DIR_ID = 'io.cozy.files.root-dir'
const CONTENT_TYPE_OCTET_STREAM = 'application/octet-stream'

const normalizeFile = file => ({
  ...normalizeDoc(file, 'io.cozy.files'),
  ...file.attributes
})

const sanitizeFileName = name => name && name.trim()

const getFileTypeFromName = name =>
  mime.lookup(name) || CONTENT_TYPE_OCTET_STREAM

export const isFile = ({ _type, type }) =>
  _type === 'io.cozy.files' || type === 'directory' || type === 'file'

export const isDirectory = ({ type }) => type === 'directory'

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

  get(id) {
    return this.statById(id)
  }

  /**
   * Returns a filtered list of documents using a Mango selector.
   *
   * The returned documents are paginated by the stack.
   *
   * @param  {Object} selector The Mango selector.
   * @param  {{sort, fields, limit, skip, indexId}} options The query options.
   * @return {{data, meta, skip, next}} The JSON API conformant response.
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
    const url = uri`/data/${document._type}/${
      document._id
    }/relationships/references`
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

  addReferencesTo(document, documents) {
    const refs = documents.map(d => ({ id: d._id, type: 'io.cozy.files' }))
    return this.stackClient.fetchJSON(
      'POST',
      uri`/data/${document._type}/${document._id}/relationships/references`,
      { data: refs }
    )
  }

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

  async upload(data, dirPath) {
    const dirId = await this.ensureDirectoryExists(dirPath)
    return this.createFile(data, { dirId })
  }

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
   * @param  {object}  params.options     Options to pass to doUpload method (additional headers)
   * @return {object}                     Updated document
   */
  updateFile(data, { executable = false, fileId, ...options } = {}) {
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

    const path = uri`/files/${fileId}?Name=${name}&Type=file&Executable=${executable}`
    return this.doUpload(data, path, options, 'PUT')
  }

  getDownloadLinkById(id) {
    return this.stackClient
      .fetchJSON('POST', uri`/files/downloads?Id=${id}`)
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

  async download(file) {
    const href = await this.getDownloadLinkById(file._id)
    forceFileDownload(`${href}?Dl=1`, file.name)
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
   * @param  {string}  childFileID  The file ID of the child
   * @param  {string}  childDirID   The dirID of the child
   * @param  {string}  childPath    The child path
   * @param  {string}  parentID     The parent's document id
   * @return {boolean}              Whether the file is a parent's child
   */
  async isChild(childFileID, childDirID, childPath, parentID) {
    if (childFileID === parentID || childDirID === parentID) {
      return true
    }
    const paths = childPath.split('/')
    paths.shift() // The path starts with '/'

    const targetsPath = ['/' + paths[0]]
    for (let i = 1; i < paths.length; i++) {
      const newPath = targetsPath[i - 1] + '/' + paths[i]
      targetsPath.push(newPath)
    }

    // Look for all hierarchy in parallel
    const results = await Promise.all(
      targetsPath.map(path => this.statByPath(path))
    )
    return results.some(dir => {
      return dir.data._id === parentID
    })
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
   * async updateFileMetadata - Updates a file's metadata
   *
   * @param  {string} id         File id
   * @param  {object} attributes New file meta data
   * @returns {object}            Updated document
   */
  async updateFileMetadata(id, attributes) {
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
      headers
    })
    return {
      data: normalizeFile(resp.data)
    }
  }
}

export default FileCollection
