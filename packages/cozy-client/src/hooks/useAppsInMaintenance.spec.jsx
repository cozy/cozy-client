import { renderHook } from '@testing-library/react-hooks'
import useAppsInMaintenance from './useAppsInMaintenance'
import CozyClient from '../CozyClient'

const appsInMaintenance = [
  {
    slug: 'caissedepargne1'
  },
  { slug: 'boursorama' }
]

const mockClient = new CozyClient({
  stackClient: {
    on: jest.fn(),
    fetchJSON: jest.fn().mockResolvedValue([
      {
        slug: 'caissedepargne1'
      },
      { slug: 'boursorama' }
    ])
  }
})

describe('useAppsInMaintenance', () => {
  it('should return apps in maintenance', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useAppsInMaintenance(mockClient)
    )
    await waitForNextUpdate()
    expect(result.current).toEqual(appsInMaintenance)
  })
})
