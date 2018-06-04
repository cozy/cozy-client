import configureStore from 'redux-mock-store'

import { TODO_SCHEMA, TODO_1, TODO_2, TODO_3 } from './fixtures'

import CozyClient from '../CozyClient'
import CozyLink from '../CozyLink'
import { Mutations } from '../dsl'
import reducer, {
  initQuery,
  receiveQueryResult,
  receiveQueryError,
  initMutation,
  receiveMutationResult,
  receiveMutationError
} from '../store'
import { getQueryFromStore } from '../store/queries'
import HasManyFilesAssociation from '../associations/HasManyFilesAssociation'

describe('CozyClient initialization', () => {
  const links = [
    new CozyLink((operation, result = '', forward) => {
      return forward(operation, result + 'foo')
    }),
    new CozyLink((operation, result, forward) => {
      return forward(operation, result + 'bar')
    }),
    (operation, result) => {
      return result + 'baz'
    }
  ]
  const client = new CozyClient({ link: links })
  it('should have chained links', async () => {
    const res = await client.requestQuery({})
    expect(res).toBe('foobarbaz')
  })
})

describe('CozyClient', () => {
  const requestHandler = jest.fn()
  const store = configureStore()({})
  const link = new CozyLink(requestHandler)
  const client = new CozyClient({ link, schema: TODO_SCHEMA })
  client.setStore(store)

  afterEach(() => {
    store.clearActions()
    requestHandler.mockReset()
  })

  describe('all', () => {
    it('should return a QueryDefinition', () => {
      expect(client.all('io.cozy.todos')).toEqual({ doctype: 'io.cozy.todos' })
    })
  })

  describe('find', () => {
    it('should return a QueryDefinition', () => {
      expect(
        client.find('io.cozy.todos').where({ done: { $eq: true } })
      ).toEqual({ doctype: 'io.cozy.todos', selector: { done: { $eq: true } } })
    })
  })

  describe('save', () => {
    it('should mutate the store', async () => {
      const doc = { ...TODO_1, label: 'Buy croissants' }
      await client.save(doc, { as: 'updateTodo' })
      expect(store.getActions()[0]).toEqual(
        initMutation('updateTodo', {
          mutationType: 'UPDATE_DOCUMENT',
          document: doc
        })
      )
    })
  })

  describe('getDocumentSavePlan', () => {
    it('should handle associations for a new document with mutation creators', () => {
      const NEW_TODO = {
        _type: 'io.cozy.todos',
        label: 'Buy RAM',
        attachments: [{ _id: 12345, _type: 'io.cozy.files' }]
      }
      const EXPECTED_CREATED_TODO = { _id: 67890, ...NEW_TODO }
      const mutation = client.getDocumentSavePlan(NEW_TODO, {
        attachments: [{ _id: 12345, _type: 'io.cozy.files' }]
      })
      expect(Array.isArray(mutation)).toBe(true)
      expect(typeof mutation[1] === 'function').toBe(true)
      expect(mutation[1]({ data: EXPECTED_CREATED_TODO })).toEqual([
        Mutations.addReferencesTo(EXPECTED_CREATED_TODO, [
          { _id: 12345, _type: 'io.cozy.files' }
        ])
      ])
    })
  })

  describe('query', () => {
    const query = client.all('io.cozy.todos')
    const fakeResponse = { data: 'FAKE!!!' }

    it('should first dispatch a INIT_QUERY action', async () => {
      await client.query(query, { as: 'allTodos' })
      expect(store.getActions()[0]).toEqual(
        initQuery('allTodos', { doctype: 'io.cozy.todos' })
      )
    })

    it('should then dispatch a RECEIVE_QUERY_RESULT action', async () => {
      requestHandler.mockReturnValueOnce(Promise.resolve(fakeResponse))
      await client.query(query, { as: 'allTodos' })
      expect(store.getActions()[1]).toEqual(
        receiveQueryResult('allTodos', fakeResponse)
      )
    })

    it('should dispatch a RECEIVE_QUERY_ERROR action if an error occurs', async () => {
      const error = new Error('Fake error')
      requestHandler.mockReturnValueOnce(Promise.reject(error))
      try {
        await client.query(query, { as: 'allTodos' })
      } catch (e) {}
      expect(store.getActions()[1]).toEqual(
        receiveQueryError('allTodos', error)
      )
    })

    it('should resolve to the query response', async () => {
      requestHandler.mockReturnValueOnce(Promise.resolve(fakeResponse))
      const resp = await client.query(query)
      expect(resp).toEqual(fakeResponse)
    })

    it('should call the link with the query', async () => {
      await client.query(query)
      expect(requestHandler).toHaveBeenCalledTimes(1)
      expect(requestHandler).toHaveBeenCalledWith(query)
    })

    it('should handle queries with includes', async () => {
      requestHandler.mockReturnValueOnce(
        Promise.resolve({
          data: [TODO_1, TODO_2, TODO_3]
        })
      )
      requestHandler
        .mockReturnValueOnce(
          Promise.resolve({
            data: [
              { _id: 'abc', _type: 'io.cozy.files' },
              { _id: 'def', _type: 'io.cozy.files' }
            ],
            included: [
              { _id: 'abc', _type: 'io.cozy.files', name: 'abc.png' },
              { _id: 'def', _type: 'io.cozy.files', name: 'def.png' }
            ]
          })
        )
        .mockReturnValueOnce(Promise.resolve({ data: [], included: [] }))
        .mockReturnValueOnce(Promise.resolve({ data: [], included: [] }))

      const resp = await client.query(
        client.all('io.cozy.todos').include(['attachments'])
      )

      expect(requestHandler).toHaveBeenCalledTimes(4)
      expect(resp).toEqual({
        data: [
          {
            ...TODO_1,
            relationships: {
              attachments: {
                data: [
                  { _id: 'abc', _type: 'io.cozy.files' },
                  { _id: 'def', _type: 'io.cozy.files' }
                ]
              }
            }
          },
          {
            ...TODO_2,
            relationships: {
              attachments: {
                data: []
              }
            }
          },
          {
            ...TODO_3,
            relationships: {
              attachments: {
                data: []
              }
            }
          }
        ],
        included: [
          { _id: 'abc', _type: 'io.cozy.files', name: 'abc.png' },
          { _id: 'def', _type: 'io.cozy.files', name: 'def.png' }
        ]
      })
    })
  })

  describe('mutate', () => {
    const mutation = { mutationType: 'FAKE' }
    const fakeResponse = {
      data: [{ ...TODO_1, label: 'Buy croissants', rev: 2 }]
    }

    it('should first dispatch a INIT_MUTATION action', async () => {
      await client.mutate(mutation, { as: 'updateTodo' })
      expect(store.getActions()[0]).toEqual(
        initMutation('updateTodo', mutation)
      )
    })

    it('should call the link with the mutation', async () => {
      await client.mutate(mutation)
      expect(requestHandler).toHaveBeenCalledWith(mutation)
    })

    it('should then dispatch a RECEIVE_MUTATION_RESULT action', async () => {
      requestHandler.mockReturnValueOnce(Promise.resolve(fakeResponse))
      await client.mutate(mutation, { as: 'updateTodo' })
      expect(store.getActions()[1]).toEqual(
        receiveMutationResult('updateTodo', fakeResponse)
      )
    })

    it('should resolve to the mutation response', async () => {
      requestHandler.mockReturnValueOnce(Promise.resolve(fakeResponse))
      const resp = await client.mutate(mutation)
      expect(resp).toEqual(fakeResponse)
    })

    it('should dispatch a RECEIVE_MUTATION_ERROR action if an error occurs', async () => {
      const error = new Error('Fake error')
      requestHandler.mockReturnValueOnce(Promise.reject(error))
      try {
        await client.mutate(mutation, { as: 'updateTodo' })
      } catch (e) {}
      expect(store.getActions()[1]).toEqual(
        receiveMutationError('updateTodo', error)
      )
    })

    it('should handle an array of mutations (including mutation creators)', async () => {
      const FAKE_MUTATION_1 = { mutationType: 'FAKE_1' }
      const FAKE_MUTATION_2 = resp => ({ mutationType: 'FAKE_2', resp })
      requestHandler.mockReturnValue(Promise.resolve(fakeResponse))
      const resp = await client.mutate([
        mutation,
        FAKE_MUTATION_1,
        FAKE_MUTATION_2
      ])
      expect(requestHandler).toHaveBeenCalledTimes(3)
      expect(requestHandler.mock.calls[0][0]).toBe(mutation)
      expect(requestHandler.mock.calls[1][0]).toBe(FAKE_MUTATION_1)
      expect(requestHandler.mock.calls[2][0]).toEqual({
        mutationType: 'FAKE_2',
        resp: fakeResponse
      })
    })
  })

  describe('schema handling', () => {
    it("should be possible to get a doctype's model", () => {
      expect(client.getDoctypeModel('io.cozy.todos')).toEqual({
        ...TODO_SCHEMA.todos,
        associations: [
          {
            doctype: 'io.cozy.files',
            name: 'attachments',
            type: 'has-many'
          }
        ]
      })
    })

    it('should hydrate relationships into associations with helper methods in the context of a query', async () => {
      store.getState = () => ({
        cozy: {
          queries: {
            allTodos: {
              data: [TODO_1._id],
              fetchStatus: 'loaded',
              definition: {
                doctype: 'io.cozy.todos'
              }
            }
          }
        }
      })
      const doc = client
        .hydrateDocuments(
          'io.cozy.todos',
          [
            {
              ...TODO_1,
              relationships: {
                attachments: {
                  data: [
                    { _id: 'abc', _type: 'io.cozy.files' },
                    { _id: 'def', _type: 'io.cozy.files' }
                  ]
                }
              }
            }
          ],
          'allTodos'
        )
        .shift()
      expect(doc.attachments).toBeInstanceOf(HasManyFilesAssociation)
      await doc.attachments.fetchMore()
      const action = store.getActions()[1]
      expect(action.contextQueryId).toBe('allTodos')
    })
  })
})
