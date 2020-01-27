jest.mock('./CozyStackClient')

import CozyStackClient from './CozyStackClient'
import SharingCollection from './SharingCollection'

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

const SHARING = {
  _id: 'sharing_1'
}
describe('SharingCollection', () => {
  const client = new CozyStackClient()
  const collection = new SharingCollection('io.cozy.sharings', client)

  describe('findByDoctype', () => {
    beforeAll(() => {
      client.fetchJSON.mockReturnValue(Promise.resolve({ data: [] }))
    })

    it('should call the right route', async () => {
      await collection.findByDoctype('io.cozy.files')
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'GET',
        '/sharings/doctype/io.cozy.files'
      )
    })
  })

  describe('share', () => {
    beforeAll(() => {
      client.fetch.mockReset()
      client.fetchJSON.mockReturnValue(Promise.resolve({ data: [] }))
    })

    it('should call the right route with the right payload', async () => {
      await collection.share(FOLDER, [RECIPIENT], 'one-way', 'foo')
      expect(client.fetchJSON).toMatchSnapshot()
    })

    it('should call the right route with the right payload', async () => {
      await collection.share(FOLDER, [RECIPIENT], 'one-way', 'foo', '/preview')
      expect(client.fetchJSON).toMatchSnapshot()
    })
  })

  describe('revokeAllRecipients', () => {
    beforeAll(() => {
      client.fetch.mockReset()
      client.fetchJSON.mockReturnValue(Promise.resolve({ data: [] }))
    })

    it('should call the right route', async () => {
      await collection.revokeAllRecipients(SHARING)
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'DELETE',
        `/sharings/${SHARING._id}/recipients`
      )
    })
  })
})
