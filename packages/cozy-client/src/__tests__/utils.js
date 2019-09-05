// TODO
// Provide a better means to test with the client
// See also ./mocks.js

import { createStore, combineReducers } from 'redux'
import CozyLink from '../CozyLink'
import CozyClient from '../CozyClient'

export const queryResultFromData = (data, opts = {}) => ({
  data: data,
  meta: { count: data.length },
  skip: 0,
  next: false,
  ...opts
})

export const createTestAssets = () => {
  // TODO this requestHandler should be improved upon
  const requestHandler = () => {
    return { data: [] }
  }
  const link = new CozyLink(requestHandler)
  const client = new CozyClient({ links: [link] })
  const store = createStore(combineReducers({ cozy: client.reducer() }))
  client.setStore(store)
  return {
    client,
    store,
    link
  }
}
