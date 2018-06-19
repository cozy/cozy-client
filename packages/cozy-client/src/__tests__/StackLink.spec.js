import CozyStackClient from 'cozy-stack-client'
import CozyClient from '../CozyClient'
import StackLink from '../StackLink'

import { TODO_SCHEMA } from './fixtures'

describe('StackLink', () => {
  const stackClient = new CozyStackClient()
  const link = new StackLink({ client: stackClient })
  const client = new CozyClient({ link, schema: TODO_SCHEMA })

  describe('query execution', () => {
    it('should execute queries without a selector', async () => {
      const query = client.all('io.cozy.todos')
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
  })
})
