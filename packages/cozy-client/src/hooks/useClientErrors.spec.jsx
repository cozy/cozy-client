import React from 'react'
import useClientErrors from './useClientErrors'
import { renderHook, act } from '@testing-library/react-hooks'
import CozyProvider from '../Provider'
import { shallow } from 'enzyme'
import { FetchError } from 'cozy-stack-client'

function createCozyClient() {
  return {
    on: jest.fn(),
    removeListener: jest.fn()
  }
}

function createWrapper(client = createCozyClient()) {
  function Wrapper({ children }) {
    return <CozyProvider client={client}>{children}</CozyProvider>
  }
  return Wrapper
}

function renderWrappedHook(client) {
  const wrapper = createWrapper(client)
  return renderHook(() => useClientErrors(), { wrapper })
}

function wrappedShallow(tree, client) {
  return shallow(tree, { wrappingComponent: createWrapper(client) })
}

describe('useClientErrors', () => {
  it('registers an `error` handler in client', done => {
    const client = createCozyClient()
    client.on.mockImplementation(name => name === 'error' && done())
    renderWrappedHook(client)
  })

  describe('renderErrors', () => {
    it('returns a function', () => {
      const { result } = renderWrappedHook()
      const { ClientErrors } = result.current
      expect(ClientErrors).toBeInstanceOf(Function)
    })

    it('displays nothing by default', () => {
      const { result } = renderWrappedHook()
      const { ClientErrors } = result.current
      const node = wrappedShallow(<ClientErrors />)
      expect(node).toHaveLength(0)
    })

    describe('for quota errors', () => {
      it('displays a a QuotaAlert', async () => {
        const client = createCozyClient()
        const { result, waitForNextUpdate } = renderWrappedHook(client)
        const nextUpdate = waitForNextUpdate()

        const response = new Response(null, {
          status: 413,
          statusText: 'Quota exceeded'
        })
        const error = new FetchError(
          response,
          `${response.status} ${response.statusText}`
        )
        act(() => {
          const handler = client.on.mock.calls[0][1]
          handler(error)
        })

        await nextUpdate
        const { ClientErrors } = result.current
        const node = wrappedShallow(<ClientErrors />, client)
        expect(node).toHaveLength(1)
        expect(
          node
            .at(0)
            .dive()
            .type().name
        ).toEqual('QuotaAlert')
      })
    })
  })
})
