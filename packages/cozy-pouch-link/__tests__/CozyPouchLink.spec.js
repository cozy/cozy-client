import CozyPouchLink from '../src'
import CozyClient from 'cozy-client'
import { TODO_SCHEMA, TODO_1, TODO_2, TODO_3, TODO_4 } from './fixtures'
import PouchDB from 'pouchdb'
import omit from 'lodash/omit'

const mockClient = {
  uri: 'http://cozy.tools:8080',
  token: {
    toBasicAuth: () => 'user:token@'
  }
}

const TODO_DOCTYPE = TODO_SCHEMA.todos.doctype

describe('CozyPouchLink', () => {
  let link
  const client = new CozyClient({
    link,
    schema: TODO_SCHEMA
  })

  beforeEach(() => {
    link = new CozyPouchLink({
      doctypes: [TODO_DOCTYPE],
      client: mockClient
    })
  })

  afterEach(async () => {
    await link.resetAllDBs()
  })

  it('should generate replication url', async () => {
    const url = await link.getReplicationUrl(TODO_DOCTYPE)
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
      const db = link.getDB(TODO_DOCTYPE)
      db.post({
        label: 'Make PouchDB link work',
        done: false
      })
      const query = client.all(TODO_DOCTYPE)
      const docs = await link.request(query)
      expect(docs.data.length).toBe(1)
    })

    it('should be possible to select', async () => {
      const db = link.getDB(TODO_DOCTYPE)
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
})
