import configureStore from 'redux-mock-store'

import { SCHEMA, TODO_1, TODO_2, TODO_3 } from './__tests__/fixtures'

import CozyClient from './CozyClient'
import CozyLink from './CozyLink'
import { Mutations, QueryDefinition } from './dsl'
import {
  initQuery,
  receiveQueryResult,
  receiveQueryError,
  initMutation,
  receiveMutationResult,
  receiveMutationError
} from './store'
import { HasManyFilesAssociation, Association } from './associations'

describe('CozyClient initialization', () => {
  let client, links

  beforeEach(() => {
    links = [
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
    links.forEach(link => {
      link.registerClient = jest.fn()
    })

    client = new CozyClient({ links, schema: SCHEMA })
  })

  it('should have chained links', async () => {
    const res = await client.requestQuery({})
    expect(res).toBe('foobarbaz')
  })

  it('should have registered the client on all links ', () => {
    for (const link of links) {
      expect(link.registerClient).toHaveBeenCalledWith(client.client)
    }
  })

  it('should create a store when calling watch query', () => {
    client.watchQuery(new QueryDefinition({ doctype: 'io.cozy.todos' }))
    expect(client.store).not.toBe(undefined)
  })
})

describe('CozyClient logout', () => {
  let client, links

  beforeEach(() => {
    links = [
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
    links.forEach(link => {
      link.registerClient = jest.fn()
    })
    client = new CozyClient({ links, schema: SCHEMA })
  })

  it('should call reset on each link that can be reset', async () => {
    links[0].reset = jest.fn()
    links[2].reset = jest.fn()
    await client.logout()
    expect(links[0].reset).toHaveBeenCalledTimes(1)
    expect(links[2].reset).toHaveBeenCalledTimes(1)
  })

  it('should call all reset even if a reset throws an error', async () => {
    const spy = jest.spyOn(global.console, 'error').mockReturnValue(jest.fn())
    links[0].reset = jest.fn().mockRejectedValue(new Error('Async error'))
    links[2].reset = jest.fn()
    await client.logout()
    expect(links[0].reset).toHaveBeenCalledTimes(1)
    expect(links[2].reset).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })
})

describe('CozyClient login', () => {
  let client, links

  beforeEach(() => {
    links = [
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
    links.forEach(link => {
      link.registerClient = jest.fn()
    })
    client = new CozyClient({ links, schema: SCHEMA })
  })

  it('Should call `registerClientOnLinks`', () => {
    client.registerClientOnLinks = jest.fn()
    client.login()

    expect(client.registerClientOnLinks).toHaveBeenCalled()
  })

  it('Should call `onLogin` on every link that implements it', () => {
    links[0].onLogin = jest.fn()
    links[2].onLogin = jest.fn()

    client.login()

    expect(links[0].onLogin).toHaveBeenCalledTimes(1)
    expect(links[2].onLogin).toHaveBeenCalledTimes(1)
  })
})

describe('CozyClient', () => {
  const requestHandler = jest.fn()
  const store = configureStore()({})
  const link = new CozyLink(requestHandler)
  const client = new CozyClient({ links: [link], schema: SCHEMA })
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

    it('should dehydrate relationships', async () => {
      class FakeHasMany extends Association {
        constructor(data) {
          super()
          this.data = data
        }

        get raw() {
          return this.data
        }
      }
      const doc = {
        ...TODO_1,
        label: 'Buy croissants',
        authors: new FakeHasMany(['bill'])
      }
      await client.save(doc, { as: 'updateTodo' })
      expect(store.getActions()[0]).toEqual(
        initMutation('updateTodo', {
          mutationType: 'UPDATE_DOCUMENT',
          document: {
            ...doc,
            authors: ['bill']
          }
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

    it('should handle empty associations', () => {
      const NEW_TODO = {
        _type: 'io.cozy.todos',
        label: 'Buy RAM',
        attachments: [{ _id: 12345, _type: 'io.cozy.files' }]
      }
      const mutation = client.getDocumentSavePlan(NEW_TODO, {
        attachments: []
      })
      expect(Array.isArray(mutation)).toBe(false)
      expect(mutation).toEqual({
        mutationType: 'CREATE_DOCUMENT',
        document: NEW_TODO
      })
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
      } catch (e) {} // eslint-disable-line no-empty
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
      } catch (e) {} // eslint-disable-line no-empty
      expect(store.getActions()[1]).toEqual(
        receiveMutationError('updateTodo', error)
      )
    })

    it('should handle an array of mutations (including mutation creators)', async () => {
      const FAKE_MUTATION_1 = { mutationType: 'FAKE_1' }
      const FAKE_MUTATION_2 = resp => ({ mutationType: 'FAKE_2', resp })
      requestHandler.mockReturnValue(Promise.resolve(fakeResponse))
      await client.mutate([mutation, FAKE_MUTATION_1, FAKE_MUTATION_2])
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
        ...SCHEMA.todos,
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
    })
  })
})
