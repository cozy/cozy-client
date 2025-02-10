import CozyStackClient from './CozyStackClient'
import ContactsCollection from './ContactsCollection'
import DocumentCollection from './DocumentCollection'

const stackMyselfResponse = {
  data: {
    type: 'io.cozy.contacts',
    id: 'bf91cce0-ef48-0137-2638-543d7eb8149c',
    attributes: {
      fullname: 'Alice',
      email: [{ address: 'alice@example.com', primary: true }]
    },
    meta: {
      rev: '1-6516671ec'
    }
  }
}

describe('ContactsCollection', () => {
  describe('find', () => {
    const setup = () => {
      const stackClient = new CozyStackClient({})
      stackClient.fetchJSON = jest
        .fn()
        .mockImplementation(async (method, route) => {
          if (method === 'POST' && route === '/contacts/myself') {
            return stackMyselfResponse
          } else if (route.includes('_index')) {
            return { result: 'exists' }
          } else {
            return { docs: [] }
          }
        })
      const col = new ContactsCollection('io.cozy.contacts', stackClient)
      return { stackClient, col }
    }

    beforeEach(() => {
      jest.spyOn(console, 'warn').mockImplementation(() => {})
    })

    it('call find route if there is no selector', async () => {
      const { col, stackClient } = setup()
      await col.find()
      expect(stackClient.fetchJSON).toHaveBeenCalledWith(
        'POST',
        '/data/io.cozy.contacts/_find',
        expect.any(Object)
      )
    })

    it('should use a special route for the myself contact', async () => {
      const { col, stackClient } = setup()
      const resp = await col.find({
        me: true
      })
      expect(stackClient.fetchJSON).toHaveBeenCalledWith(
        'POST',
        '/contacts/myself'
      )
      expect(resp.data).toEqual([
        expect.objectContaining({
          _id: 'bf91cce0-ef48-0137-2638-543d7eb8149c',
          id: 'bf91cce0-ef48-0137-2638-543d7eb8149c',
          fullname: 'Alice'
        })
      ])
    })

    it('should not use a special route for other types of find', async () => {
      const { col, stackClient } = setup()
      await col.find({
        name: 'Alice'
      })
      expect(stackClient.fetchJSON).toHaveBeenCalledWith(
        'POST',
        '/data/io.cozy.contacts/_find',
        expect.objectContaining({ selector: { name: 'Alice' } })
      )
    })
  })

  describe('destroy', () => {
    const setup = () => {
      const stackClient = new CozyStackClient({})
      const col = new ContactsCollection('io.cozy.contacts', stackClient)
      return { col }
    }

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should delete a contact with no sources', async () => {
      const { col } = setup()

      const documentCollectionDestroySpy = jest
        .spyOn(DocumentCollection.prototype, 'destroy')
        .mockImplementation()

      const contact = {
        _id: '123',
        _rev: '1',
        cozyMetadata: {
          sync: {}
        }
      }

      await col.destroy(contact)
      expect(documentCollectionDestroySpy).toHaveBeenCalledWith(contact)

      const contactWithoutMetadata = {
        _id: '456',
        _rev: '1'
      }
      await col.destroy(contactWithoutMetadata)
      expect(documentCollectionDestroySpy).toHaveBeenCalledWith(
        contactWithoutMetadata
      )
    })

    it('should flag a contact with sources as trashed', async () => {
      const { col } = setup()

      const documentCollectionDestroySpy = jest
        .spyOn(DocumentCollection.prototype, 'destroy')
        .mockImplementation()
      const documentCollectionUpdateSpy = jest
        .spyOn(DocumentCollection.prototype, 'update')
        .mockImplementation()

      const contact = {
        _id: '123',
        cozyMetadata: {
          sync: {
            456: {
              id: 'people/657623'
            }
          }
        }
      }

      await col.destroy(contact)
      expect(documentCollectionDestroySpy).not.toHaveBeenCalled()
      expect(documentCollectionUpdateSpy).toHaveBeenCalledWith({
        ...contact,
        trashed: true
      })
    })
  })
})
