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
