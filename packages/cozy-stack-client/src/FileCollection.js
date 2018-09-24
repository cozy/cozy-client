import mime from 'mime-types'
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
 * Abstracts a collection of files
 *
 * Files are a special type of documents and are handled differently by the stack:
 * special routes are to be used, and there is a notion of referenced files, aka
 * files associated to a specific document
 * @module FileCollection
 */
export default class FileCollection extends DocumentCollection {
  constructor(doctype, client) {
    super(doctype, client)
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
    const resp = await this.client.fetchJSON(
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
   * @param  {object} document     A JSON representing a document, with at least a `_type` and `_id` field.
   * @param  {number} { skip = 0   For pagination, the number of referenced files to skip
   * @param  {number} limit } For pagination, the number of results to return.
   * @returns {object}         The JSON API conformant response.
   */
  async findReferencedBy(document, { skip = 0, limit } = {}) {
    const params = {
      include: 'files',
      sort: 'datetime',
      'page[limit]': limit,
      'page[skip]': skip
    }
    const url = `/data/${document._type}/${
      document._id
    }/relationships/references`
    const path = querystring.buildURL(url, params)
    const resp = await this.client.fetchJSON('GET', path)
    return {
      data: resp.data.map(f => normalizeFile(f)),
      included: resp.included ? resp.included.map(f => normalizeFile(f)) : [],
      next: resp.meta.count > skip + resp.data.rows,
      meta: resp.meta,
      skip
    }
  }

  addReferencesTo(document, documents) {
    const refs = documents.map(d => ({ id: d._id, type: 'io.cozy.files' }))
    return this.client.fetchJSON(
      'POST',
      uri`/data/${document._type}/${document._id}/relationships/references`,
      { data: refs }
    )
  }

  removeReferencesTo(document, documents) {
    const refs = documents.map(d => ({ id: d._id, type: 'io.cozy.files' }))
    return this.client.fetchJSON(
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
    const resp = await this.client.fetchJSON(
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

  async upload(data, dirPath) {
    const dirId = await this.ensureDirectoryExists(dirPath)
    return this.createFile(data, { dirId })
  }

  createFile(data, { name, dirId = '', executable, ...options } = {}) {
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
    const path = uri`/files/${dirId}?Name=${name}&Type=file&Executable=${executable}`
    return this.doUpload(data, path, options)
  }

  getDownloadLinkById(id) {
    return this.client
      .fetchJSON('POST', uri`/files/downloads?Id=${id}`)
      .then(this.extractResponseLinkRelated)
  }

  getDownloadLinkByPath(path) {
    return this.client
      .fetchJSON('POST', uri`/files/downloads?Path=${path}`)
      .then(this.extractResponseLinkRelated)
  }

  extractResponseLinkRelated = res => {
    let href = res.links && res.links.related
    if (!href) throw new Error('No related link in server response')
    return this.client.fullpath(href)
  }

  async download(file) {
    const href = await this.getDownloadLinkById(file._id)
    forceFileDownload(`${href}?Dl=1`, file.name)
  }

  async downloadArchive(fileIds, notSecureFilename = 'files') {
    const filename = slugify(notSecureFilename)
    const href = await this.getArchiveLinkByIds(fileIds, filename)
    const fullpath = this.client.fullpath(href)
    forceFileDownload(fullpath, filename + '.zip')
  }

  async getArchiveLinkByIds(ids, name = 'files') {
    const resp = await this.client.fetchJSON('POST', '/files/archive', {
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

  async statById(id, options = {}) {
    const { limit, skip = 0 } = options
    const params = {
      limit,
      skip
    }
    const url = `/files/${id}`
    const path = querystring.buildURL(url, params)
    const resp = await this.client.fetchJSON('GET', path)
    return {
      data: normalizeFile(resp.data),
      included: resp.included && resp.included.map(f => normalizeFile(f))
    }
  }

  async statByPath(path) {
    const resp = await this.client.fetchJSON(
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

    const resp = await this.client.fetchJSON(
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
          dirID: parentDirectory && parentDirectory._id
        })
      }
      throw errors
    }
  }

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

  async doUpload(data, path, options) {
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

    const resp = await this.client.fetchJSON('POST', path, data, { headers })
    return {
      data: normalizeFile(resp.data)
    }
  }
}
