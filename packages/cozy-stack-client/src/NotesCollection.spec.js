import NotesCollection from './NotesCollection'
import CozyStackClient from './CozyStackClient'

describe('NotesCollection', () => {
  const setup = () => {
    const stackClient = new CozyStackClient()
    const collection = new NotesCollection(stackClient)

    return { stackClient, collection }
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('all', () => {
    const { stackClient, collection } = setup()

    it('should call the appropriate route', async () => {
      jest.spyOn(stackClient, 'fetchJSON').mockResolvedValue({
        data: [],
        links: {},
        meta: { count: 0 }
      })

      await collection.all()
      expect(stackClient.fetchJSON).toHaveBeenCalledWith('GET', '/notes')
    })

    it('should normalize documents', async () => {
      jest.spyOn(stackClient, 'fetchJSON').mockResolvedValue({
        data: [{ _id: '1', attributes: { title: 'Test Note' } }],
        links: {},
        meta: { count: 0 }
      })
      const result = await collection.all()
      expect(result.data).toEqual([
        {
          _id: '1',
          _type: 'io.cozy.notes',
          id: '1',
          title: 'Test Note',
          attributes: { title: 'Test Note' }
        }
      ])
    })
  })

  describe('destroy', () => {
    const { stackClient, collection } = setup()

    const note = {
      _id: '1'
    }

    beforeEach(() => {
      jest.spyOn(stackClient, 'fetchJSON').mockResolvedValue({
        data: { ...note, trashed: true }
      })
    })

    it('should call the appropriate route', async () => {
      await collection.destroy({ _id: '1' })
      expect(stackClient.fetchJSON).toHaveBeenCalledWith('DELETE', '/files/1')
    })

    it('should add _deleted to the response', async () => {
      const result = await collection.destroy({ _id: '1' })
      expect(result.data._deleted).toBe(true)
    })
  })
})
