import React from 'react'
import { createMockClient } from '../mock'
import simpsonsFixture from '../testing/simpsons.json'
import ClientProvider from '../Provider'
import { Provider as ReduxProvider } from 'react-redux'

const setupClient = ({ queries } = {}) => {
  const client = createMockClient({
    queries: {
      simpsons: {
        data: simpsonsFixture,
        doctype: 'io.cozy.simpsons'
      },
      upperSimpsons: {
        data: simpsonsFixture.map(x => ({ ...x, name: x.name.toUpperCase() })),
        doctype: 'io.cozy.simpsons-upper'
      },
      ...queries
    }
  })
  client.ensureStore()
  return client
}

const makeWrapper = client => {
  const Wrapper = ({ children }) => (
    <ReduxProvider store={client.store}>
      <ClientProvider client={client}>{children}</ClientProvider>
    </ReduxProvider>
  )
  return Wrapper
}

export { setupClient, makeWrapper }
