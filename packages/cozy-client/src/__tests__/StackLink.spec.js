import CozyClient from '../CozyClient'
import StackLink from '../StackLink'

import { SCHEMA } from './fixtures'

import { Q } from 'cozy-client'

describe('StackLink', () => {
  let stackClient, link, client

  beforeEach(() => {
    link = new StackLink()
    client = new CozyClient({ links: [link], schema: SCHEMA })
    stackClient = client.getStackClient()
  })

  describe('query execution', () => {
    it('should execute queries without a selector', async () => {
      const query = Q('io.cozy.todos')
      stackClient.collection().all.mockReset()
      await link.request(query)
      expect(stackClient.collection().all).toHaveBeenCalled()
      expect(stackClient.collection).toHaveBeenCalledWith('io.cozy.todos')
    })

    it('should execute queries with a selector', async () => {
      const query = client.find('io.cozy.todos').where({ checked: true })
      stackClient.collection().find.mockReset()
      await link.request(query)
      expect(stackClient.collection().find).toHaveBeenCalledWith(
        { checked: true },
        {}
      )
    })

    it('should use find if a sort option is given', async () => {
      const query = Q('io.cozy.todos').sortBy([{ name: 'asc' }])
      stackClient.collection().find.mockReset()
      await link.request(query)
      expect(stackClient.collection().find).toHaveBeenCalled()
      expect(stackClient.collection).toHaveBeenCalledWith('io.cozy.todos')
    })

    it('should use all if a no sort option is given', async () => {
      const query = Q('io.cozy.todos')
      stackClient.collection().all.mockReset()
      await link.request(query)
      expect(stackClient.collection().all).toHaveBeenCalled()
      expect(stackClient.collection).toHaveBeenCalledWith('io.cozy.todos')
    })
  })

  describe('reset', () => {
    it('should delete client', async () => {
      expect(link.stackClient).not.toBeNull()
      await link.reset()
      expect(link.stackClient).toBeNull()
    })
  })
})
