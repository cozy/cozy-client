import ShortcutsCollection from './ShortcutsCollection'
import CozyStackClient from './CozyStackClient'

describe('ShortcutsCollection', () => {
  const stackClient = new CozyStackClient()
  const collection = new ShortcutsCollection(stackClient)

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('Create', () => {
    it('calls the right route', async () => {
      jest
        .spyOn(stackClient, 'fetchJSON')
        .mockReturnValue(Promise.resolve({ data: [] }))
      const data = {
        url: 'https://cozy.io',
        name: 'cozy.url',
        dir_id: '1'
      }
      await collection.create(data)
      expect(stackClient.fetchJSON).toHaveBeenCalledWith('POST', '/shortcuts', {
        data: {
          attributes: {
            ...data
          },
          type: 'io.cozy.files.shortcuts'
        }
      })
    })
    it('formats correctly the response', async () => {
      jest.spyOn(stackClient, 'fetchJSON').mockResolvedValue({
        data: {
          type: 'file',
          name: 'cozy.url',
          dir_id: '629fb233be550a21174ac8e19f003e4a',
          _id: '629fb233be550a21174ac8e19f0043af',
          class: 'shortcut'
        }
      })
      const resp = await collection.create({
        dir_id: '629fb233be550a21174ac8e19f003e4a',
        name: 'cozy.url',
        url: 'https://cozy/io'
      })
      expect(resp.data.dir_id).toBe('629fb233be550a21174ac8e19f003e4a')
    })

    it('throws an error if all required attributes are not there', async () => {
      await expect(collection.create({})).rejects.toThrow()
    })
  })

  describe('get', () => {
    it('tests if it calls the right route', async () => {
      stackClient.fetchJSON.mockReturnValue(Promise.resolve({ data: [] }))
      await collection.get('1')
      expect(stackClient.fetchJSON).toHaveBeenCalledWith('GET', '/shortcuts/1')
    })
  })
})
