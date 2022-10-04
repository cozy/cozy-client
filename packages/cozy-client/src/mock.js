import { normalizeDoc } from 'cozy-stack-client'

import CozyClient from './CozyClient'
import { receiveQueryResult, initQuery } from './store'
import { IOCozyFile } from './types'
import { Q, QueryDefinition } from './queries/dsl'

/**
 * @param {CozyClient} client - Instance of CozyClient
 * @param {string} queryName - Name of Query
 * @param {object} queryOptions - queryOptions
 * @param {QueryDefinition} queryOptions.definition - A query definition
 * @param {string} queryOptions.doctype - Document doctype
 * @param {IOCozyFile[]} queryOptions.data - io.cozy.files document
 */
const fillQueryInsideClient = (client, queryName, queryOptions) => {
  const { definition, doctype, data, ...queryResult } = queryOptions
  client.store.dispatch(initQuery(queryName, definition || Q(doctype)))
  client.store.dispatch(
    receiveQueryResult(queryName, {
      data: data ? data.map(doc => normalizeDoc(doc, doctype)) : data,
      ...queryResult
    })
  )
}

const mockedQueryFromMockedRemoteData = remoteData => qdef => {
  if (!remoteData) {
    return { data: null }
  }
  if (remoteData[qdef.doctype]) {
    return { data: remoteData[qdef.doctype] }
  } else {
    return { data: [] }
  }
}

/**
 * Creates a client suitable for use in tests or documentation
 *
 * If isDocumentation is false:
 *   - client.{query,save,saveAll} are mocked
 *   - client.stackClient.fetchJSON is mocked
 *
 * If isDocumentation is true:
 *   - All jest mock is bypassed
 *
 * @param {object} options Options
 * @param {object} [options.queries] Prefill queries inside the store
 * @param {object} [options.remote] Mock data from the server
 * @param {object} [options.clientOptions] Options passed to the client
 * @param {boolean} [options.isDocumentation] Define if used for documentation or test
 * @returns {CozyClient}
 */
const createMockClient = ({
  queries,
  remote,
  clientOptions,
  isDocumentation = false
}) => {
  const client = new CozyClient(clientOptions || {})
  client.ensureStore()

  for (let [queryName, queryOptions] of Object.entries(queries || {})) {
    fillQueryInsideClient(client, queryName, queryOptions)
  }

  if (!isDocumentation) {
    client.query = jest
      .fn()
      .mockImplementation(mockedQueryFromMockedRemoteData(remote))

    client.save = jest.fn()
    client.saveAll = jest.fn()
    client.stackClient.fetchJSON = jest.fn()
  }

  return client
}

export { createMockClient }
