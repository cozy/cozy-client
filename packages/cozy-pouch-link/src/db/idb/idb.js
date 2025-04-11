import DatabaseQueryEngine from '../dbInterface'
import { getIndexFields, getIndexName } from '../../mango'
import logger from '../../logger'
import {
  createIDBIndex,
  findData,
  getAllData,
  getSingleDoc,
  MAX_LIMIT,
  parseResults
} from './getDocs'
import { isMissingIDBIndexError } from '../../errors'

export default class IndexedDBQueryEngine extends DatabaseQueryEngine {
  constructor(pouchManager, doctype) {
    super()
    this.db = null
    this.client = pouchManager?.client
    this.doctype = doctype
    this.storeName = `docs`
    this.openRequest
  }

  openDB(dbName, version = undefined, { forceName = false } = {}) {
    const indexedDB =
      typeof window == 'object' ? window.indexedDB : self.indexedDB
    const fullDbName = forceName ? dbName : `_pouch_${dbName}`
    const request = version
      ? indexedDB.open(fullDbName, version)
      : indexedDB.open(fullDbName)

    request.onsuccess = event => {
      const db = request.result
      this.db = db
      this.openRequest = request
    }
    request.onerror = event => {
      logger.error(`Database error: ${event.target.error}`)
    }
  }

  async allDocs({ limit = MAX_LIMIT, skip = 0 } = {}) {
    try {
      const tx = this.db.transaction(this.storeName, 'readonly')
      const store = tx.objectStore(this.storeName)
      const docs = await getAllData(store, { limit, skip })
      const resp = parseResults(this.client, docs, this.doctype, {
        limit,
        skip
      })
      return resp
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  async getById(id) {
    try {
      if (!id) {
        return { data: null }
      }
      const tx = this.db.transaction(this.storeName, 'readonly')
      const store = tx.objectStore(this.storeName)
      const doc = await getSingleDoc(store, id)
      const resp = parseResults(this.client, [doc], this.doctype)
      return resp
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  async getByIds(ids) {
    try {
      const tx = this.db.transaction(this.storeName, 'readonly')
      const store = tx.objectStore(this.storeName)
      const docs = await Promise.all(ids.map(id => store.get(id)))
      const resp = parseResults(
        this.client,
        docs.filter(doc => doc !== undefined),
        this.doctype
      )
      return resp
    } catch (err) {
      logger.error(err)
      return null
    }
  }

  async find(options) {
    const {
      selector,
      sort,
      limit,
      partialFilter,
      skip = 0,
      shouldRecreateIndex = false
    } = options
    let { indexedFields, recreateIndex } = options

    indexedFields = getIndexFields({
      indexedFields,
      selector,
      sort,
      partialFilter
    })
    const indexName = getIndexName({
      selector,
      sort,
      partialFilter,
      indexedFields
    })
    const findOpts = {
      selector,
      sort,
      partialFilter,
      offset: skip,
      limit,
      doctype: this.doctype,
      use_index: indexName,
      ...options
    }
    findOpts.indexedFields = indexedFields

    try {
      const tx = this.db.transaction(this.storeName, 'readonly')
      const store = tx.objectStore(this.storeName)

      if (recreateIndex === true) {
        throw new Error('The specified index was not found')
      }

      const index = store.index(indexName)
      if (index && shouldRecreateIndex) {
        // Useful for testing
        throw new Error('The specified index was not found')
      }

      const docs = await findData(index, findOpts)
      const resp = parseResults(this.client, docs, this.doctype, {
        limit,
        skip
      })

      return resp
    } catch (err) {
      if (isMissingIDBIndexError(err)) {
        logger.info('Missing index, create it...')

        const newIndex = await createIDBIndex(this, {
          indexName,
          indexedFields,
          shouldRecreateIndex
        })
        const docs = await findData(newIndex, findOpts)
        const resp = parseResults(this.client, docs, this.doctype, {
          limit,
          skip
        })
        return resp
      }
      logger.error(err)
      return null
    }
  }
}
