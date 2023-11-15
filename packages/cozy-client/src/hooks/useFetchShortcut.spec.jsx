import { renderHook } from '@testing-library/react-hooks'

import useFetchShortcut from './useFetchShortcut'
import { createMockClient } from '../../dist/mock'

describe('useFetchShortcut', () => {
  const mockClient = createMockClient({
    queries: {
      'io.cozy.files.shortcuts/123': {
        doctype: 'io.cozy.files.shortcuts',
        definition: {
          doctype: 'io.cozy.files.shortcuts',
          id: 'io.cozy.files.shortcuts/123'
        },
        data: [
          {
            type: 'io.cozy.files.shortcuts',
            id: 'b7470059d40c88e4bd30031d5e0109d3',
            attributes: {
              _id: '',
              name: 'cozy.url',
              dir_id: '8034db0016d0548ded99b9627e003270',
              url: 'https://cozy.io',
              metadata: { extractor_version: 2 }
            },
            meta: { rev: '1-60e1359e63fa7fa9fa000a2726d5d4c7' }
          }
        ]
      },
      'io.cozy.files.shortcuts/no-found': {
        doctype: 'io.cozy.files.shortcuts',
        queryError: new Error('not found')
      }
    },
    clientOptions: {
      uri: 'https://test.mycozy.cloud'
    }
  })

  it('should change loading status', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchShortcut(mockClient, '123')
    )
    expect(result.current.fetchStatus).toEqual('loading')
    await waitForNextUpdate()
    expect(result.current.fetchStatus).toEqual('loaded')
  })

  it('should inform when an error occurs', async () => {
    mockClient.stackClient.fetchJSON.mockRejectedValue('error')

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchShortcut(mockClient, 'no-found')
    )
    expect(result.current.fetchStatus).toEqual('loading')
    await waitForNextUpdate()
    expect(result.current.fetchStatus).toEqual('failed')
  })

  it('should return the data of a shortcut and change the display value', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchShortcut(mockClient, '123')
    )

    await waitForNextUpdate()
    expect(result.current.shortcutInfos).toEqual({
      data: {
        _id: 'b7470059d40c88e4bd30031d5e0109d3',
        _type: 'io.cozy.files.shortcuts',
        type: 'io.cozy.files.shortcuts',
        id: 'b7470059d40c88e4bd30031d5e0109d3',
        attributes: {
          _id: '',
          name: 'cozy.url',
          dir_id: '8034db0016d0548ded99b9627e003270',
          url: 'https://cozy.io',
          metadata: { extractor_version: 2 }
        },
        meta: { rev: '1-60e1359e63fa7fa9fa000a2726d5d4c7' }
      }
    })
    expect(result.current.shortcutImg).toEqual(
      `${mockClient.getStackClient().uri}/bitwarden/icons/cozy.io/icon.png`
    )
  })
})
