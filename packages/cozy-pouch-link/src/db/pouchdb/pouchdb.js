import { createIndex, getIndexFields, getIndexName } from '../../mango'
import DatabaseQueryInterface from '../dbInterface'
import { default as helpers } from '../../helpers'
import { fromPouchResult } from '../../jsonapi'
import { isMissingIndexError } from '../../errors'

const { isAdapterBugged, LIMIT_BUG } = helpers

class PouchDBQuery extends DatabaseQueryInterface {
  constructor(pouchManager, client, doctype) {
    super()
    this.pouchManager = pouchManager
    this.client = client
    this.doctype = doctype
    this.db = null
  }

  openDB(dbName) {
    this.db = this.pouchManager.getPouch(dbName)
    return this.db
  }

  async allDocs(options) {
    //return getDocs(this.db, 'allDocs', { include_docs: true, ...options })
    return getDocsAndNormalize({
      client: this.client,
      db: this.db,
      doctype: this.doctype,
      queryFunc: 'allDocs',
      queryParams: { include_docs: true, ...options }
    })
  }

  async getById(id) {
    console.log('quey by pouch by id : ', id)
    return getDocsAndNormalize({
      client: this.client,
      db: this.db,
      doctype: this.doctype,
      queryFunc: 'get',
      queryParams: { id },
      withRows: false
    })
  }

  async getByIds(ids) {
    return getDocsAndNormalize({
      client: this.client,
      db: this.db,
      doctype: this.doctype,
      queryFunc: 'allDocs',
      queryParams: { include_docs: true, keys: ids }
    })
  }

  async find(options) {
    const { selector, sort, partialFilter, doctype } = options
    let { indexedFields } = options

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
      doctype,
      use_index: indexName,
      indexedFields,
      ...options
    }
    console.log('find opts : ', findOpts)

    let res
    try {
      res = await getDocsAndNormalize({
        client: this.client,
        db: this.db,
        doctype: this.doctype,
        queryFunc: 'find',
        queryParams: findOpts
      })
    } catch (err) {
      if (isMissingIndexError(err)) {
        await createIndex(this.db, indexedFields, {
          indexName,
          doctype,
          partialFilter
        })
        res = await getDocsAndNormalize({
          client: this.client,
          db: this.db,
          doctype: this.doctype,
          queryFunc: 'find',
          queryParams: findOpts
        })
      }
    }
    return res
  }
}

const getDocsAndNormalize = async ({
  client,
  doctype,
  db,
  queryFunc,
  queryParams = {},
  withRows = true
}) => {
  const results = await getDocs(db, queryFunc, queryParams)
  const jsonResult = fromPouchResult({
    res: results,
    withRows,
    doctype: doctype,
    client: client
  })
  return jsonResult
}

const getDocs = async (db, fct, queryParams = {}) => {
  // allDocs return an error when limit is null
  if (queryParams.limit === null) delete queryParams.limit

  const limit = queryParams.limit
  const field = fct === 'allDocs' ? 'rows' : 'docs'

  if (isAdapterBugged(db.adapter)) {
    if (limit === undefined || limit > LIMIT_BUG) {
      queryParams.limit = LIMIT_BUG
      queryParams.skip = queryParams.skip || 0
    }
  }

  if (fct === 'get') {
    if (!queryParams.id) {
      return null
    }
    return db.get(queryParams.id)
  }

  const data = await db[fct](queryParams)
  if (data[field].length === queryParams.limit) {
    queryParams.skip =
      (queryParams.skip ? queryParams.skip : 0) + queryParams.limit
    queryParams.limit = limit ? limit - queryParams.limit : undefined
    if (queryParams.limit > 0 || queryParams.limit === undefined) {
      // Auto pagination: should it be kept?
      const next = await getDocs(db, fct, queryParams)

      return { ...data, [field]: [...data[field], ...next[field]] }
    }
  }

  return data
}

export default PouchDBQuery
