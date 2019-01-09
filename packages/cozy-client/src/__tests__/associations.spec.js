import CozyClient from '../CozyClient'
import CozyLink from '../CozyLink'

import { createStore, getQueryFromStore } from '../store'
import { SCHEMA, TODO_1, TODO_2 } from './fixtures'
import { receiveQueryResult, initQuery } from '../store/queries'

describe('Associations', () => {
  const requestHandler = jest.fn()
  const link = new CozyLink(requestHandler)
  const client = new CozyClient({ links: [link], schema: SCHEMA })

  const getTodo = id =>
    client
      .hydrateDocuments(
        'io.cozy.todos',
        [client.getDocumentFromState('io.cozy.todos', id)],
        'allTodos'
      )
      .shift()

  beforeEach(async () => {
    const store = createStore()
    client.setStore(store)
    await store.dispatch(initQuery('allTodos', { doctype: 'io.cozy.todos' }))
    await store.dispatch(
      receiveQueryResult('allTodos', {
        data: [
          {
            ...TODO_1,
            relationships: {
              attachments: {
                data: [
                  { _id: 'abc', _type: 'io.cozy.files' },
                  { _id: 'def', _type: 'io.cozy.files' }
                ],
                next: true,
                meta: { count: 4 }
              }
            }
          },
          TODO_2
        ],
        included: [
          { _id: 'abc', _type: 'io.cozy.files', name: 'abc.pdf' },
          { _id: 'def', _type: 'io.cozy.files', name: 'def.png' }
        ]
      })
    )
  })

  describe('HasMany', () => {
    it('should return data', () => {
      expect(getTodo(TODO_1._id).attachments.data).toEqual([
        { _id: 'abc', _type: 'io.cozy.files', name: 'abc.pdf' },
        { _id: 'def', _type: 'io.cozy.files', name: 'def.png' }
      ])
    })

    it('should return count', () => {
      expect(getTodo(TODO_1._id).attachments.count).toBe(4)
    })

    it('should be able to fetchMore data', async () => {
      const FAKE_RESPONSE = {
        data: [
          { _id: 'ghi', _type: 'io.cozy.files' },
          { _id: 'jkl', _type: 'io.cozy.files' }
        ],
        included: [
          { _id: 'ghi', _type: 'io.cozy.files', name: 'ghi.pdf' },
          { _id: 'jkl', _type: 'io.cozy.files', name: 'jkl.png' }
        ],
        next: false
      }
      requestHandler.mockReturnValueOnce(Promise.resolve(FAKE_RESPONSE))

      const queryBefore = getQueryFromStore(client.store, 'allTodos')
      await getTodo(TODO_1._id).attachments.fetchMore()
      expect(getTodo(TODO_1._id).attachments.data).toEqual([
        { _id: 'abc', _type: 'io.cozy.files', name: 'abc.pdf' },
        { _id: 'def', _type: 'io.cozy.files', name: 'def.png' },
        { _id: 'ghi', _type: 'io.cozy.files', name: 'ghi.pdf' },
        { _id: 'jkl', _type: 'io.cozy.files', name: 'jkl.png' }
      ])
      const queryAfter = getQueryFromStore(client.store, 'allTodos')
      expect(queryBefore.lastUpdate).toBeLessThan(queryAfter.lastUpdate)
    })

    it('should be able to associate more docs', async () => {
      requestHandler.mockReturnValueOnce(Promise.resolve(undefined))
      await getTodo(TODO_1._id).attachments.add([
        { _id: 'xyz', _type: 'io.cozy.files', name: 'xyz.png' }
      ])
      expect(getTodo(TODO_1._id).attachments.data).toEqual([
        { _id: 'abc', _type: 'io.cozy.files', name: 'abc.pdf' },
        { _id: 'def', _type: 'io.cozy.files', name: 'def.png' },
        { _id: 'xyz', _type: 'io.cozy.files', name: 'xyz.png' }
      ])
      expect(getTodo(TODO_1._id).attachments.count).toBe(5)
    })

    it('should be able to dereference docs', async () => {
      requestHandler.mockReturnValueOnce(Promise.resolve(undefined))
      await getTodo(TODO_1._id).attachments.remove([
        { _id: 'abc', _type: 'io.cozy.files', name: 'abc.pdf' }
      ])
      expect(getTodo(TODO_1._id).attachments.data).toEqual([
        { _id: 'def', _type: 'io.cozy.files', name: 'def.png' }
      ])
      expect(getTodo(TODO_1._id).attachments.count).toBe(3)
    })
  })
})
