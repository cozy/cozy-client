import { uri, attempt, sleep } from './utils'
import uniq from 'lodash/uniq'
import transform from 'lodash/transform'
import head from 'lodash/head'
import omit from 'lodash/omit'
import startsWith from 'lodash/startsWith'
import qs from 'qs'
import * as querystring from './querystring'

export const normalizeDoc = (doc, doctype) => {
  const id = doc._id || doc.id
  return { id, _id: id, _type: doctype, ...doc }
}

export const dontThrowNotFoundError = error => {
  if (error.message.match(/not_found/)) {
    return { data: [], meta: { count: 0 }, skip: 0, next: false }
  }

  throw error
}

/**
 * Abstracts a collection of documents of the same doctype, providing CRUD methods and other helpers.
 */
class DocumentCollection {
  constructor(doctype, stackClient) {
    this.doctype = doctype
    this.stackClient = stackClient
    this.indexes = {}
  }

  /**
   * Lists all documents of the collection, without filters.
   *
   * The returned documents are paginated by the stack.
   *
   * @param  {{limit, skip, keys}} options The fetch options: pagination & fetch of specific docs.
   * @return {{data, meta, skip, next}} The JSON API conformant response.
   * @throws {FetchError}
   */
  async all(options = {}) {
    const { limit, skip = 0, keys } = options

    // If the limit is intentionnally null, we need to use _all_docs, since _normal_docs uses _find and have a hard limit of 100
    const isUsingAllDocsRoute = !!keys || limit === null
    const route = isUsingAllDocsRoute ? '_all_docs' : '_normal_docs'
    const url = uri`/data/${this.doctype}/${route}`
    const params = {
      include_docs: true,
      limit,
      skip,
      keys
    }
    const path = querystring.buildURL(url, params)

    // If no document of this doctype exist, this route will return a 404,
    // so we need to try/catch and return an empty response object in case of a 404
    let resp
    try {
      resp = await this.stackClient.fetchJSON('GET', path)
    } catch (error) {
      return dontThrowNotFoundError(error)
    }
    let data
    /* If using `all_docs` we need to filter our design documents and check if
    the document is not null. If we use `normal_doc` we can't have any design doc
     */
    if (isUsingAllDocsRoute) {
      data = resp.rows
        .filter(doc => {
          return (
            doc &&
            doc.doc !== null &&
            !doc.error &&
            !startsWith(doc.id, '_design')
          )
        })
        .map(row => {
          return normalizeDoc(row.doc, this.doctype)
        })
    } else {
      data = resp.rows.map(row => {
        return normalizeDoc(row, this.doctype)
      })
    }

    return {
      data,
      meta: { count: isUsingAllDocsRoute ? data.length : resp.total_rows },
      skip: skip,
      next: skip + resp.rows.length < resp.total_rows
    }
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
    let resp
    try {
      resp = await this.stackClient.fetchJSON(
        'POST',
        uri`/data/${this.doctype}/_find`,
        await this.toMangoOptions(selector, options)
      )
    } catch (error) {
      return dontThrowNotFoundError(error)
    }
    return {
      data: resp.docs.map(doc => normalizeDoc(doc, this.doctype)),
      // Mango queries don't return the total count of rows, so if next = true,
      // we return a `meta.count` greater than the count of rows we have so that
      // 'fetchMore' features would work
      meta: {
        count: resp.next ? skip + resp.docs.length + 1 : resp.docs.length
      },
      next: resp.next,
      skip
    }
  }

  async get(id) {
    let resp
    try {
      resp = await this.stackClient.fetchJSON(
        'GET',
        uri`/data/${this.doctype}/${id}`
      )
    } catch (error) {
      if (error.message.match(/not_found/)) {
        return { data: null }
      }
      throw error
    }
    return {
      data: normalizeDoc(resp, this.doctype)
    }
  }

  async getAll(ids) {
    let resp
    try {
      resp = await this.stackClient.fetchJSON(
        'POST',
        uri`/data/${this.doctype}/_all_docs?include_docs=true`,
        {
          keys: ids
        }
      )
    } catch (error) {
      return dontThrowNotFoundError(error)
    }
    const rows = resp.rows.filter(row => row.doc)
    return {
      data: rows.map(row => normalizeDoc(row.doc, this.doctype)),
      meta: {
        count: rows.length
      }
    }
  }

  async create({ _id, _type, ...document }) {
    // In case of a fixed id, let's use the dedicated creation endpoint
    // https://github.com/cozy/cozy-stack/blob/master/docs/data-system.md#create-a-document-with-a-fixed-id
    const hasFixedId = !!_id
    const method = hasFixedId ? 'PUT' : 'POST'
    const endpoint = uri`/data/${this.doctype}/${hasFixedId ? _id : ''}`
    const resp = await this.stackClient.fetchJSON(method, endpoint, document)

    return {
      data: normalizeDoc(resp.data, this.doctype)
    }
  }

  async update(document) {
    const resp = await this.stackClient.fetchJSON(
      'PUT',
      uri`/data/${this.doctype}/${document._id}`,
      document
    )
    return {
      data: normalizeDoc(resp.data, this.doctype)
    }
  }

  async destroy({ _id, _rev, ...document }) {
    const resp = await this.stackClient.fetchJSON(
      'DELETE',
      uri`/data/${this.doctype}/${_id}?rev=${_rev}`
    )
    return {
      data: normalizeDoc(
        { ...document, _id, _rev: resp.rev, _deleted: true },
        this.doctype
      )
    }
  }

  async toMangoOptions(selector, options = {}) {
    let { sort, indexedFields } = options
    const { fields, skip = 0, limit } = options

    if (sort && !Array.isArray(sort)) {
      console.warn(
        'Passing an object to the "sort" is deprecated, please use an array instead.'
      )
      sort = transform(
        sort,
        (acc, order, field) => acc.push({ [field]: order }),
        []
      )
    }

    indexedFields = indexedFields
      ? indexedFields
      : this.getIndexFields({ sort, selector })

    const indexId = options.indexId || (await this.getIndexId(indexedFields))

    if (sort) {
      const sortOrders = uniq(
        sort.map(sortOption => head(Object.values(sortOption)))
      )
      if (sortOrders.length > 1)
        throw new Error('Mango sort can only use a single order (asc or desc).')
      const sortOrder = sortOrders.length > 0 ? head(sortOrders) : 'asc'

      for (const field of indexedFields) {
        if (!sort.find(sortOption => head(Object.keys(sortOption)) === field))
          sort.push({ [field]: sortOrder })
      }
    }

    return {
      selector,
      use_index: indexId,
      // TODO: type and class should not be necessary, it's just a temp fix for a stack bug
      fields: fields ? [...fields, '_id', '_type', 'class'] : undefined,
      limit,
      skip,
      sort
    }
  }

  async checkUniquenessOf(property, value) {
    const indexId = await this.getUniqueIndexId(property)
    const existingDocs = await this.find(
      { [property]: value },
      { indexId, fields: ['_id'] }
    )
    return existingDocs.data.length === 0
  }

  getUniqueIndexId(property) {
    return this.getIndexId([property], `${this.doctype}/${property}`)
  }

  async getIndexId(fields, indexName = this.getIndexNameFromFields(fields)) {
    if (!this.indexes[indexName]) {
      this.indexes[indexName] = await this.createIndex(fields)
    }
    return this.indexes[indexName].id
  }

  async createIndex(fields) {
    const indexDef = { index: { fields } }
    const resp = await this.stackClient.fetchJSON(
      'POST',
      uri`/data/${this.doctype}/_index`,
      indexDef
    )
    const indexResp = {
      id: resp.id,
      fields
    }
    if (resp.result === 'exists') return indexResp

    // indexes might not be usable right after being created; so we delay the resolving until they are
    const selector = { [fields[0]]: { $gt: null } }
    const options = { indexId: indexResp.id }

    if (await attempt(this.find(selector, options))) return indexResp
    // one retry
    await sleep(1000)
    if (await attempt(this.find(selector, options))) return indexResp
    await sleep(500)
    return indexResp
  }

  getIndexNameFromFields(fields) {
    return `by_${fields.join('_and_')}`
  }

  /**
   * Compute fields that should be indexed for a mango
   * query to work
   *
   * @param  {Object} options - Mango query options
   * @return {Array} - Fields to index
   */
  getIndexFields({ selector, sort = [] }) {
    return Array.from(
      new Set([
        ...sort.map(sortOption => head(Object.keys(sortOption))),
        ...Object.keys(selector)
      ])
    )
  }

  /**
   * Use Couch _changes API
   *
   * @param  {Object} couchOptions Couch options for changes https://kutt.it/5r7MNQ
   * @param  {Object} options      { includeDesign: false, includeDeleted: false }
   */
  async fetchChanges(couchOptions = {}, options = {}) {
    const haveDocsIds = couchOptions.doc_ids && couchOptions.doc_ids.length > 0
    let urlParams = ''
    if (typeof couchOptions !== 'object') {
      urlParams = `?include_docs=true&since=${couchOptions}`
      console.warn(
        'fetchChanges use couchOptions as Object not a string, since is deprecated, please use fetchChanges({include_docs: true, since: 0}).'
      )
    } else if (Object.keys(couchOptions).length > 0) {
      urlParams = `?${[
        qs.stringify(omit(couchOptions, 'doc_ids')),
        haveDocsIds && couchOptions.filter === undefined
          ? 'filter=_doc_ids'
          : undefined
      ]
        .filter(Boolean)
        .join('&')}`
    }

    const method = haveDocsIds ? 'POST' : 'GET'
    const endpoint = `/data/${this.doctype}/_changes${urlParams}`
    const params = haveDocsIds ? { doc_ids: couchOptions.doc_ids } : undefined
    const result = await this.stackClient.fetchJSON(method, endpoint, params)

    const newLastSeq = result.last_seq
    let docs = result.results.map(x => x.doc).filter(Boolean)

    if (!options.includeDesign) {
      docs = docs.filter(doc => doc._id.indexOf('_design') !== 0)
    }

    if (!options.includeDeleted) {
      docs = docs.filter(doc => !doc._deleted)
    }

    return { newLastSeq, documents: docs }
  }
}

export default DocumentCollection
