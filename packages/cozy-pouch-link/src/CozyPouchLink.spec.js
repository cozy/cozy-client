import CozyClient from 'cozy-client'
import omit from 'lodash/omit'

import CozyPouchLink from '.'
import { SCHEMA, TODO_1, TODO_2, TODO_3, TODO_4 } from './__tests__/fixtures'

const mockClient = {
  client: {
    uri: 'http://cozy.tools:8080',
    token: {
      toBasicAuth: () => 'user:token@'
    }
  }
}

const TODO_DOCTYPE = SCHEMA.todos.doctype

describe('CozyPouchLink', () => {
  let client, link

  beforeEach(() => {
    link = new CozyPouchLink({ doctypes: [TODO_DOCTYPE] })
    client = new CozyClient({
      ...mockClient,
      links: [link],
      schema: {
        todos: omit(TODO_DOCTYPE, 'relationships')
      }
    })
  })

  afterEach(async () => {
    await link.reset()
  })

  it('should generate replication url', async () => {
    const url = await link.getReplicationURL(TODO_DOCTYPE)
    expect(url).toBe('http://user:token@cozy.tools:8080/data/io.cozy.todos')
  })

  describe('request handling', () => {
    it('should check if the doctype is supported and forward if not', async () => {
      const query = client.all('io.cozy.rockets')
      link.synced = true
      await link.request(query, null, () => {
        expect(true).toBe(true)
        return Promise.resolve()
      })
    })

    it('should check if the pouch is synced and forward if not', async () => {
      const query = client.all(TODO_DOCTYPE)
      expect.assertions(1)
      await link.request(query, null, () => {
        expect(true).toBe(true)
      })
    })
  })

  describe('queries', () => {
    const docs = [TODO_1, TODO_2, TODO_3, TODO_4]
    beforeEach(() => {
      link.synced = true
    })
    it('should be able to execute a query', async () => {
      const db = link.getPouch(TODO_DOCTYPE)
      db.post({
        label: 'Make PouchDB link work',
        done: false
      })
      const query = client.all(TODO_DOCTYPE)
      const docs = await link.request(query)
      expect(docs.data.length).toBe(1)
    })

    it('should be possible to query only one doc', async () => {
      const db = link.getPouch(TODO_DOCTYPE)
      db.post({
        _id: 'deadbeef',
        label: 'Make PouchDB link work',
        done: false
      })
      const query = client.get(TODO_DOCTYPE, 'deadbeef')
      const resp = await link.request(query)
      expect(resp.data.label).toBe('Make PouchDB link work')
    })

    it('should be possible to select', async () => {
      const db = link.getPouch(TODO_DOCTYPE)
      await db.bulkDocs(docs.map(x => omit(x, '_type')))
      const query = client
        .find(TODO_DOCTYPE, { label: { $gt: null }, done: true })
        .sortBy([{ done: 'asc' }, { label: 'asc' }])
      const res = await link.request(query)
      // expect(link.hasIndex('io.cozy.todos/by_done_and_id')).toBe(true)
      expect(res).toMatchObject({
        data: [
          {
            label: 'Build stuff',
            _type: TODO_DOCTYPE
          },
          {
            label: 'Run a semi-marathon',
            _type: TODO_DOCTYPE
          }
        ],
        meta: {
          count: 2
        },
        skip: 0,
        next: false
      })
    })
  })

  describe('mutations', async () => {
    beforeEach(() => {
      link.synced = true
    })

    it('should be possible to save a new document', async () => {
      const { _id, ...NEW_TODO } = TODO_3
      const mutation = client.getDocumentSavePlan(NEW_TODO)
      const res = await link.request(mutation)
      expect(res).toMatchObject({
        data: {
          id: expect.any(String),
          _id: expect.any(String),
          rev: expect.any(String),
          label: 'Build stuff',
          _type: TODO_DOCTYPE
        }
      })
    })

    it('should be possible to update a document', async () => {
      const mutation = client.getDocumentSavePlan(TODO_3)
      const res = await link.request(mutation)
      expect(res).toMatchObject({
        data: {
          id: '3',
          label: 'Build stuff'
        }
      })
    })
  })

  describe('reset', async () => {
    let spy

    beforeEach(() => {
      spy = jest.spyOn(link.pouches, 'destroy').mockReturnValue(jest.fn())
    })

    afterEach(async () => {
      spy.mockRestore()
    })

    it('should delete all databases', async () => {
      const pouches = link.pouches
      await link.reset()
      expect(pouches.destroy).toHaveBeenCalledTimes(1)
    })

    it('should delete client', async () => {
      link.registerClient(jest.fn())
      expect(link.client).not.toBeUndefined()
      await link.reset()
      expect(link.client).toBeUndefined()
    })

    it('should set the `synced` property to false', async () => {
      await link.reset()
      expect(link.synced).toBe(false)
    })

    it('should forget the PouchManager instance', async () => {
      await link.reset()
      expect(link.pouches).toBeNull()
    })
  })

  describe('onLogin', () => {
    let spy

    beforeEach(() => {
      spy = jest
        .spyOn(link.pouches, 'startReplicationLoop')
        .mockReturnValue(jest.fn())
    })

    afterEach(() => {
      spy.mockRestore()
    })

    it('should start the replication loop if `options.initialSync` is true', () => {
      link.options.initialSync = true
      link.onLogin()

      expect(link.pouches.startReplicationLoop).toHaveBeenCalledTimes(1)
    })

    it('should not start the replication loop if `options.initialSync` is false', () => {
      link.options.initialSync = false
      link.onLogin()

      expect(link.pouches.startReplicationLoop).not.toHaveBeenCalled()
    })
  })
})
