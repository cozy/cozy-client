import { isDocumentNotFoundPouchDBError } from '../../errors'
import { default as helpers } from '../../helpers'
import { fromPouchResult } from '../../jsonapi'
const { isAdapterBugged, LIMIT_BUG } = helpers

export const getDocsAndNormalize = async ({
  client,
  doctype,
  db,
  queryFunc,
  queryParams = {},
  withRows = true
}) => {
  let results
  try {
    results = await getDocs(db, queryFunc, queryParams)
  } catch (err) {
    if (isDocumentNotFoundPouchDBError(err)) {
      results = []
    } else {
      throw err
    }
  }
  const jsonResult = fromPouchResult({
    res: results,
    withRows,
    doctype: doctype,
    client: client
  })
  return jsonResult
}

export const getDocs = async (db, fct, queryParams = {}) => {
  // allDocs return an error when limit is null
  if (queryParams.limit === null) delete queryParams.limit

  const limit = queryParams.limit
  const field = fct === 'allDocs' ? 'rows' : 'docs'

  if (isAdapterBugged(db.adapter)) {
    // FIXME: to remove? This was used to deal with an old adapter that is probably no longer used
    // But it might be worth checking the issue does not exist anymore
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
  if (queryParams.keys) {
    // Special case for getByIds queries: Pouch returns the total number of rows in the database,
    // which will make cozy-client believes there are more results to fetch
    data.total_rows = data.rows.length
  }
  return data
}
