import { renderHook } from '@testing-library/react-hooks'
import useCapabilities from './useCapabilities'
describe('useCapabilities', () => {
  const mockClient = { query: jest.fn(), get: jest.fn() }

  it('should change loading status', async () => {
    mockClient.query.mockResolvedValue({ data: [] })
    const { result, waitForNextUpdate } = renderHook(() =>
      useCapabilities(mockClient)
    )
    expect(result.current.fetchStatus).toEqual('loading')
    await waitForNextUpdate()
    expect(result.current.fetchStatus).toEqual('loaded')
  })

  it('should inform when an error occurs', async () => {
    mockClient.query.mockRejectedValue('error')

    const { result, waitForNextUpdate } = renderHook(() =>
      useCapabilities(mockClient)
    )
    expect(result.current.fetchStatus).toEqual('loading')
    await waitForNextUpdate()
    expect(result.current.fetchStatus).toEqual('failed')
  })

  it('should return capabilities for a cozy', async () => {
    mockClient.query.mockResolvedValue({
      data: {
        type: 'io.cozy.settings',
        id: 'io.cozy.settings.capabilities',
        attributes: { file_versioning: true, flat_subdomains: true },
        meta: {},
        links: { self: '/settings/capabilities' }
      }
    })
    const { result, waitForNextUpdate } = renderHook(() =>
      useCapabilities(mockClient)
    )

    await waitForNextUpdate()
    expect(result.current.capabilities).toEqual({
      data: {
        type: 'io.cozy.settings',
        id: 'io.cozy.settings.capabilities',
        attributes: { file_versioning: true, flat_subdomains: true },
        meta: {},
        links: { self: '/settings/capabilities' }
      }
    })
  })
})
