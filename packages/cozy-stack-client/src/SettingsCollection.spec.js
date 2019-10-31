import SettingsCollection from './SettingsCollection'
import CozyStackClient from './CozyStackClient'

describe('SettingsCollection', () => {
  const stackClient = new CozyStackClient()
  const collection = new SettingsCollection(stackClient)

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('should call the appropriate route', async () => {
    jest.spyOn(stackClient, 'fetchJSON').mockResolvedValue({
      data: {}
    })

    await collection.get('instance')
    expect(stackClient.fetchJSON).toHaveBeenCalledWith(
      'GET',
      '/settings/instance'
    )

    await collection.get('disk-usage')
    expect(stackClient.fetchJSON).toHaveBeenCalledWith(
      'GET',
      '/settings/disk-usage'
    )
  })

  it('should throw server error', async () => {
    jest
      .spyOn(stackClient, 'fetchJSON')
      .mockRejectedValue(new Error('Some problem'))

    await expect(collection.get('whatever')).rejects.toThrow()
  })
})
