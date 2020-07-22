import CozyStackClient from './CozyStackClient'
import ContactsCollection from './ContactsCollection'

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
  const setup = () => {
    const stackClient = new CozyStackClient({})
    stackClient.fetchJSON = jest
      .fn()
      .mockImplementation(async (method, route) => {
        if (method === 'POST' && route === '/contacts/myself') {
          return stackMyselfResponse
        } else {
          return []
        }
      })
    const col = new ContactsCollection('io.cozy.contacts', stackClient)
    return { stackClient, col }
  }

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
})
