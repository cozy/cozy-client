jest.mock('../CozyStackClient')

import CozyStackClient from '../CozyStackClient'
import SharingCollection from '../SharingCollection'

const FOLDER = {
  _type: 'io.cozy.files',
  _id: 'folder_1',
  type: 'directory',
  name: 'bills'
}

const RECIPIENT = {
  _type: 'io.cozy.contacts',
  _id: 'contact_1',
  attributes: {
    email: [{ address: 'jdoe@doe.com', primary: true }]
  }
}

describe('SharingCollection', () => {
  const client = new CozyStackClient()
  const collection = new SharingCollection('io.cozy.sharings', client)

  describe('findByDoctype', () => {
    beforeAll(() => {
      client.fetch.mockReturnValue(Promise.resolve({ data: [] }))
    })

    it('should call the right route', async () => {
      await collection.findByDoctype('io.cozy.files')
      expect(client.fetch).toHaveBeenCalledWith(
        'GET',
        '/sharings/doctype/io.cozy.files'
      )
    })
  })

  describe('share', () => {
    beforeAll(() => {
      client.fetch.mockReset()
      client.fetch.mockReturnValue(Promise.resolve({ data: [] }))
    })

    it('should call the right route with the right payload', async () => {
      await collection.share(FOLDER, [RECIPIENT], 'one-way', 'foo')
      expect(client.fetch).toHaveBeenCalledWith('POST', '/sharings/', {
        data: {
          attributes: {
            description: 'foo',
            rules: [
              {
                doctype: 'io.cozy.files',
                title: 'bills',
                add: 'push',
                update: 'push',
                remove: 'push',
                values: ['folder_1']
              }
            ]
          },
          relationships: {
            recipients: {
              data: [{ id: 'contact_1', type: 'io.cozy.contacts' }]
            }
          },
          type: 'io.cozy.sharings'
        }
      })
    })
  })
})
