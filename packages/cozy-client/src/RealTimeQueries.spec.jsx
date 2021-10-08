import React from 'react'
import { render, waitFor } from '@testing-library/react'
import RealTimeQueries from './RealTimeQueries'
import { createMockClient } from './mock'
import CozyProvider from './Provider'

const setup = async doctype => {
  const realtimeCallbacks = {}
  const client = new createMockClient({})
  client.plugins.realtime = {
    subscribe: jest.fn((event, doctype, callback) => {
      realtimeCallbacks[event] = callback
    }),
    unsubscribe: jest.fn()
  }
  client.dispatch = jest.fn()

  const { unmount } = render(
    <CozyProvider client={client}>
      <RealTimeQueries doctype={doctype} />
    </CozyProvider>
  )

  await waitFor(() =>
    expect(client.plugins.realtime.subscribe).toHaveBeenCalledTimes(3)
  )

  return { client, realtimeCallbacks, unmount }
}

describe('RealTimeQueries', () => {
  it('notifies the cozy-client store', async () => {
    const { client, realtimeCallbacks, unmount } = await setup('io.cozy.files')

    realtimeCallbacks['created']({ _id: 'mock-created', type: 'file' })
    expect(client.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        definition: {
          document: {
            _id: 'mock-created',
            _type: 'io.cozy.files',
            type: 'file'
          },
          mutationType: 'CREATE_DOCUMENT'
        },
        mutationId: '1',
        response: {
          data: {
            _id: 'mock-created',
            _type: 'io.cozy.files',
            type: 'file'
          }
        },
        type: 'RECEIVE_MUTATION_RESULT'
      })
    )

    realtimeCallbacks['updated']({ _id: 'mock-updated', type: 'file' })
    expect(client.dispatch).toHaveBeenCalledWith({
      definition: {
        document: {
          _id: 'mock-updated',
          _type: 'io.cozy.files',
          type: 'file'
        },
        mutationType: 'UPDATE_DOCUMENT'
      },
      mutationId: '2',
      response: {
        data: {
          _id: 'mock-updated',
          _type: 'io.cozy.files',
          type: 'file'
        }
      },
      type: 'RECEIVE_MUTATION_RESULT'
    })

    realtimeCallbacks['deleted']({ _id: 'mock-deleted', type: 'file' })
    expect(client.dispatch).toHaveBeenCalledWith({
      definition: {
        document: {
          _id: 'mock-deleted',
          _type: 'io.cozy.files',
          type: 'file',
          _deleted: true
        },
        mutationType: 'DELETE_DOCUMENT'
      },
      mutationId: '3',
      response: {
        data: {
          _id: 'mock-deleted',
          _type: 'io.cozy.files',
          type: 'file',
          _deleted: true
        }
      },
      type: 'RECEIVE_MUTATION_RESULT'
    })

    unmount()
    expect(client.plugins.realtime.unsubscribe).toHaveBeenCalledTimes(3)
  })

  it('deals with other doctypes than io.cozy.files', async () => {
    const { client, realtimeCallbacks, unmount } = await setup(
      'io.cozy.oauth.clients'
    )

    realtimeCallbacks['created']({
      _id: 'mock-created',
      client_kind: 'desktop',
      client_name: 'Cozy Drive (hostname)'
    })
    expect(client.dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        definition: {
          document: {
            _id: 'mock-created',
            _type: 'io.cozy.oauth.clients',
            client_kind: 'desktop',
            client_name: 'Cozy Drive (hostname)'
          },
          mutationType: 'CREATE_DOCUMENT'
        },
        mutationId: '1',
        response: {
          data: {
            _id: 'mock-created',
            _type: 'io.cozy.oauth.clients',
            client_kind: 'desktop',
            client_name: 'Cozy Drive (hostname)'
          }
        },
        type: 'RECEIVE_MUTATION_RESULT'
      })
    )

    unmount()
  })
})
