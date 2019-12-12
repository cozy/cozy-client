import CozyClient from './CozyClient'
import { receiveQueryResult, initQuery } from './store'
import { normalizeDoc } from 'cozy-stack-client'

const fillQueryInsideClient = (client, queryName, queryOptions) => {
  client.store.dispatch(
    initQuery(
      queryName,
      queryOptions.definition || client.all(queryOptions.doctype)
    )
  )
  client.store.dispatch(
    receiveQueryResult(queryName, {
      data: queryOptions.data.map(doc =>
        normalizeDoc(doc, queryOptions.doctype)
      )
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
 * Creates a client suitable for use in tests
 *
 * - client.{query,save} are mocked
 * - client.stackClient.fetchJSON is mocked
 *
 * @param  {object} options.queries Prefill queries inside the store
 * @param  {object} options.remote Mock data from the server
 * @param  {object} options.clientOptions Options passed to the client
 * @returns {CozyClient}
 */
const createMockClient = ({ queries, remote, clientOptions }) => {
  const client = new CozyClient(clientOptions || {})
  client.ensureStore()

  for (let [queryName, queryOptions] of Object.entries(queries || {})) {
    fillQueryInsideClient(client, queryName, queryOptions)
  }

  client.query = jest
    .fn()
    .mockImplementation(mockedQueryFromMockedRemoteData(remote))

  client.save = jest.fn()
  client.stackClient.fetchJSON = jest.fn()

  return client
}

export { createMockClient }
