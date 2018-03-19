import CozyPouchLink from '../src'
import CozyClient from 'cozy-client'
import {
  TODO_SCHEMA,
  TODO_1,
  TODO_2,
  TODO_3
} from './fixtures'

const mockClient = {
  _url: 'http://cozy.tools:8080',
  authorize: async () => {
    return Promise.resolve({
      token: {
        toBasicAuth: () => 'user:token@'
      }
    })
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

  it('should be able to execute a query', async () => {
    const db = link.getDB(TODO_DOCTYPE)
    db.post({
      label: 'Make PouchDB link work',
      done: false
    })
    const query = client.all(TODO_DOCTYPE)
    link.synced = true
    const docs = await link.request(query)
    expect(docs.data.length).toBe(1)
  })

  it('should be possible to execute a mutation', async () => {
    const mutation = client.save(TODO_3)
    link.synced = true
    const res = await link.request(mutation)
    expect(res).toMatchObject({
      data: {
        id: '54321',
        label: 'Build stuff'
      }
    })
  })
})
