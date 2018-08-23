import { uri, attempt, sleep } from './utils'
import uniq from 'lodash/uniq'

export const FETCH_LIMIT = 50

export const normalizeDoc = (doc, doctype) => {
  const id = doc._id || doc.id
  return { id, _id: id, _type: doctype, ...doc }
}

/**
 * Abstracts a collection of documents of the same doctype, providing CRUD methods and other helpers.
 * @module DocumentCollection
 */
export default class DocumentCollection {
  constructor(doctype, client) {
    this.doctype = doctype
    this.client = client
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
    const { limit = FETCH_LIMIT, skip = 0, keys = undefined } = options
    const path =
      // limit: null is a (temporary ?) bypass of the limit for the search that needs all docs
      limit === null
        ? uri`/data/${this.doctype}/_all_docs?include_docs=true`
        : keys
          ? uri`/data/${
              this.doctype
            }/_all_docs?include_docs=true&keys=[${keys
              .map(k => `"${k}"`)
              .join(',')}]`
          : uri`/data/${
              this.doctype
            }/_all_docs?include_docs=true&limit=${limit}&skip=${skip}`
    // If no document of this doctype exist, this route will return a 404,
    // so we need to try/catch and return an empty response object in case of a 404
    try {
      const resp = await this.client.fetchJSON('GET', path)
      // WARN: looks like this route returns something looking like a couchDB design doc, we need to filter it:
      const rows = resp.rows.filter(
        row => row.doc && !row.doc.hasOwnProperty('views')
      )
      // WARN: the JSON response from the stack is not homogenous with other routes (offset? rows? total_rows?)
      return {
        data: rows.map(row => normalizeDoc(row.doc, this.doctype)),
        meta: { count: resp.total_rows },
        skip: resp.offset || 0,
        next: resp.offset + rows.length <= resp.total_rows
      }
    } catch (error) {
      if (error.message.match(/not_found/)) {
        return { data: [], meta: { count: 0 }, skip: 0, next: false }
      }
      throw error
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
    const resp = await this.client.fetchJSON(
      'POST',
      uri`/data/${this.doctype}/_find`,
      await this.toMangoOptions(selector, options)
    )
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
    const resp = await this.client.fetchJSON(
      'GET',
      uri`/data/${this.doctype}/${id}`
    )
    return {
      data: normalizeDoc(resp, this.doctype)
    }
  }

  async getAll(ids) {
    const resp = await this.client.fetchJSON(
      'POST',
      uri`/data/${this.doctype}/_all_docs?include_docs=true`,
      {
        keys: ids
      }
    )
    const rows = resp.rows.filter(row => row.doc)
    return {
      data: rows.map(row => normalizeDoc(row.doc, this.doctype)),
      meta: {
        count: rows.length
      }
    }
  }

  async create({ _id, _type, ...document }) {
    const resp = await this.client.fetchJSON(
      'POST',
      uri`/data/${this.doctype}/`,
      document
    )
    return {
      data: normalizeDoc(resp.data, this.doctype)
    }
  }

  async update(document) {
    const resp = await this.client.fetchJSON(
      'PUT',
      uri`/data/${this.doctype}/${document._id}`,
      document
    )
    return {
      data: normalizeDoc(resp.data, this.doctype)
    }
  }

  async destroy({ _id, _rev, ...document }) {
    const resp = await this.client.fetchJSON(
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
    const indexFields = this.getIndexFields({ ...options, selector })
    const indexId = options.indexId || (await this.getIndexId(indexFields))
    const { fields, skip = 0, limit = FETCH_LIMIT } = options
    // Mango wants an array of single-property-objects..
    const sortOrders = options.sort
      ? uniq(Object.values(options.sort))
      : ['asc']
    if (sortOrders.length > 1)
      throw new Error('Mango sort can only use a single order (asc or desc).')
    const sortOrder = sortOrders[0]
    const sort = options.sort
      ? indexFields.map(f => ({ [f]: sortOrder }))
      : undefined

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
    const resp = await this.client.fetchJSON(
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
    return `by_${fields.sort((a, b) => a.localeCompare(b)).join('_and_')}`
  }

  /**
   * Compute fields that should be indexed for a mango
   * query to work
   *
   * @param  {Object} options - Mango query options
   * @return {Array} - Fields to index
   */
  getIndexFields({ selector, sort = {} }) {
    return Array.from(new Set([...Object.keys(selector), ...Object.keys(sort)]))
  }
}
