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
      jest.spyOn(stackClient, 'fetchJSON').mockResolvedValue({ data: [] })
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

    it('should throw error when file name is incorrect', async () => {
      try {
        await collection.create({
          dir_id: '629fb233be550a21174ac8e19f003e4a',
          name: 'cozy/url',
          url: 'https://cozy/io'
        })
      } catch (error) {
        expect(error.message).toEqual(
          'Invalid filename containing illegal character(s): /'
        )
      }
    })
    it('should throw error when file name is incorrect', async () => {
      try {
        await collection.create({
          dir_id: '629fb233be550a21174ac8e19f003e4a',
          name: '..',
          url: 'https://cozy/io'
        })
      } catch (error) {
        expect(error.message).toEqual('Invalid filename: ..')
      }
    })
    it('should throw error when name is space', async () => {
      try {
        await collection.create({
          dir_id: '629fb233be550a21174ac8e19f003e4a',
          name: '   ',
          url: 'https://cozy/io'
        })
      } catch (error) {
        expect(error.message).toEqual(
          'you need at least a name, an url and a dir_id attributes to create a shortcut'
        )
      }
    })
    it('should throw error when name is undefined', async () => {
      try {
        await collection.create({
          dir_id: '629fb233be550a21174ac8e19f003e4a',
          name: undefined,
          url: 'https://cozy/io'
        })
      } catch (error) {
        expect(error.message).toEqual(
          'you need at least a name, an url and a dir_id attributes to create a shortcut'
        )
      }
    })
  })

  describe('get', () => {
    it('tests if it calls the right route', async () => {
      stackClient.fetchJSON.mockResolvedValue({ data: [] })
      await collection.get('1')
      expect(stackClient.fetchJSON).toHaveBeenCalledWith('GET', '/shortcuts/1')
    })
  })
})
