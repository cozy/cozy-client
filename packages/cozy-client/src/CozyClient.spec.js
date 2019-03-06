import MockDate from 'mockdate'

import {
  SCHEMA,
  TODO_1,
  TODO_2,
  TODO_3,
  DOCTYPE_VERSION,
  APP_NAME,
  APP_VERSION,
  SOURCE_ACCOUNT_ID
} from './__tests__/fixtures'

import CozyClient from './CozyClient'
import CozyLink from './CozyLink'
import { Mutations, QueryDefinition } from './queries/dsl'
import {
  initQuery,
  receiveQueryResult,
  receiveQueryError,
  initMutation,
  receiveMutationResult,
  receiveMutationError
} from './store'
import { HasManyFiles, Association, HasMany } from './associations'
import mapValues from 'lodash/mapValues'

const normalizeData = data =>
  mapValues(data, (docs, doctype) => {
    return docs.map(doc => ({
      ...doc,
      _id: doc.id || doc._id,
      id: doc.id || doc._id,
      _type: doctype
    }))
  })

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
      expect(link.registerClient).toHaveBeenCalledWith(client)
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
    await client.login()
    await client.logout()
    expect(links[0].reset).toHaveBeenCalledTimes(1)
    expect(links[2].reset).toHaveBeenCalledTimes(1)

    // test if we launch twice logout, it doesn't launch twice reset.
    await client.logout()

    expect(links[0].reset).toHaveBeenCalledTimes(1)
    expect(links[2].reset).toHaveBeenCalledTimes(1)
  })

  it('should call all reset even if a reset throws an error', async () => {
    const spy = jest.spyOn(global.console, 'warn').mockReturnValue(jest.fn())
    links[0].reset = jest.fn().mockRejectedValue(new Error('Async error'))
    links[2].reset = jest.fn()
    await client.login()
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

  it('Should call `registerClientOnLinks`', async () => {
    client.registerClientOnLinks = jest.fn()
    await client.login()

    expect(client.registerClientOnLinks).toHaveBeenCalled()
  })

  it('Should call `onLogin` on every link that implements it', async () => {
    links[0].onLogin = jest.fn()
    links[2].onLogin = jest.fn()

    await client.login()

    expect(links[0].onLogin).toHaveBeenCalledTimes(1)
    expect(links[2].onLogin).toHaveBeenCalledTimes(1)

    // test if we launch twice login, it doesn't launch twice onLogin.
    await client.login()

    expect(links[0].onLogin).toHaveBeenCalledTimes(1)
    expect(links[2].onLogin).toHaveBeenCalledTimes(1)
  })
})

describe('CozyClient', () => {
  const requestHandler = jest.fn()
  const link = new CozyLink(requestHandler)

  const MOCKED_DATE = '2018-05-05T09:09:00.115Z'

  beforeAll(() => {
    MockDate.set(MOCKED_DATE)
  })

  afterAll(() => {
    jest.restoreAllMocks()
    MockDate.reset()
  })

  let client
  beforeEach(() => {
    client = new CozyClient({ links: [link], schema: SCHEMA })
    client.ensureStore()
    jest.spyOn(client.store, 'dispatch').mockImplementation(() => {})
  })

  afterEach(() => {
    requestHandler.mockReset()
  })

  describe('all', () => {
    it('should return a QueryDefinition', () => {
      expect(client.all('io.cozy.todos')).toEqual({ doctype: 'io.cozy.todos' })
    })
  })

  describe('setData', () => {
    it('should fill the store with data', () => {
      client.store.dispatch.mockRestore()
      jest.spyOn(client.store, 'dispatch')
      client.setData(
        normalizeData({
          'io.cozy.todos': [{ id: 1, done: true }, { id: 2, done: false }],
          'io.cozy.people': [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
        })
      )
      expect(client.getDocumentFromState('io.cozy.todos', 1)).toMatchObject({
        id: 1,
        done: true
      })
      expect(client.getDocumentFromState('io.cozy.people', 1)).toMatchObject({
        id: 1,
        name: 'Alice'
      })
    })
  })

  describe('getDocumentFromState', () => {
    it('should return null in case of error', () => {
      jest.spyOn(client.store, 'getState').mockImplementation(() => {
        throw new Error('Problem with store')
      })
      expect(client.getDocumentFromState('io.cozy.people', 1)).toBe(null)
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
    it('should mutate the document', async () => {
      client.setData(
        normalizeData({
          'io.cozy.todos': [TODO_1]
        })
      )
      const doc = { ...TODO_1, label: 'Buy croissants' }
      client.store.dispatch.mockReset()
      await client.save(doc)
      const dispatchCalls = client.store.dispatch.mock.calls
      expect(dispatchCalls.slice(-2)[0][0].definition.document).toMatchObject({
        label: 'Buy croissants'
      })
    })

    it('should dehydrate relationships', async () => {
      class FakeHasMany extends Association {
        dehydrate(doc) {
          return {
            ...doc,
            [this.name]: this.target[this.name]
          }
        }
      }
      const rawDoc = {
        ...TODO_1,
        authors: ['author1', 'author2']
      }
      const hydratedDoc = {
        ...TODO_1,
        authors: new FakeHasMany(rawDoc, 'authors', 'io.cozy.authors', {})
      }
      await client.save(hydratedDoc, { as: 'updateTodo' })
      expect(client.store.dispatch.mock.calls[0][0]).toEqual(
        initMutation('updateTodo', {
          mutationType: 'UPDATE_DOCUMENT',
          document: {
            ...rawDoc,
            cozyMetadata: {
              updatedAt: '2018-05-05T09:09:00.115Z',
              updatedByApps: ['cozy-client-test']
            }
          }
        })
      )
    })
  })

  describe('getDocumentSavePlan', () => {
    it('should handle missing _rev and _id', () => {
      const NEW_FOO = {
        attributes: {
          bar: 'Zap'
        }
      }
      const mutation = client.getDocumentSavePlan(NEW_FOO)
      expect(mutation.mutationType).toBe('CREATE_DOCUMENT')
    })

    it('should handle fixed _id', () => {
      const NEW_FOO = {
        _id: '29328139a6ed4320bdd75d28141e8fb2',
        attributes: {
          bar: 'Zap'
        }
      }
      const mutation = client.getDocumentSavePlan(NEW_FOO)
      expect(mutation.mutationType).toBe('CREATE_DOCUMENT')
    })

    it('should handle _rev for update', () => {
      const OLD_FOO = {
        _id: '29328139a6ed4320bdd75d28141e8fb2',
        _rev: '1-5e3e3c68250747589266c23ce507b1a4'
      }
      const mutation = client.getDocumentSavePlan(OLD_FOO)
      expect(mutation.mutationType).toBe('UPDATE_DOCUMENT')
    })

    it('should add cozy metadata when creating a document', () => {
      const doc = {
        _type: 'io.cozy.todos',
        cozyMetadata: {
          customField: 'foo'
        }
      }
      const {
        document: { cozyMetadata }
      } = client.getDocumentSavePlan(doc)
      expect(cozyMetadata.createdByApp).toEqual(APP_NAME)
      expect(cozyMetadata.customField).toEqual('foo')
    })

    it('should add cozy metadata when updating a document', () => {
      const doc = {
        _id: '29328139a6ed4320bdd75d28141e8fb2',
        _rev: '1-5e3e3c68250747589266c23ce507b1a4',
        _type: 'io.cozy.todos',
        cozyMetadata: {
          createdByApp: 'other-app',
          updatedByApps: ['other-app']
        }
      }
      const {
        document: { cozyMetadata }
      } = client.getDocumentSavePlan(doc)
      expect(cozyMetadata.createdByApp).toEqual('other-app')
      expect(cozyMetadata.updatedByApps).toEqual(['other-app', APP_NAME])
    })

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
        document: {
          ...NEW_TODO,
          cozyMetadata: {
            createdAt: MOCKED_DATE,
            createdByApp: APP_NAME,
            createdByAppVersion: APP_VERSION,
            doctypeVersion: DOCTYPE_VERSION,
            updatedAt: MOCKED_DATE,
            updatedByApps: [APP_NAME],
            sourceAccount: SOURCE_ACCOUNT_ID
          }
        }
      })
    })
  })

  describe('cozy metadata', () => {
    it('should create all metadata with a creation trigger', () => {
      const doc = {
        _type: 'io.cozy.todos'
      }
      const { cozyMetadata } = client.ensureCozyMetadata(doc, {
        event: 'creation'
      })
      expect(cozyMetadata).toEqual({
        doctypeVersion: DOCTYPE_VERSION,
        createdByApp: APP_NAME,
        sourceAccount: SOURCE_ACCOUNT_ID,
        createdByAppVersion: APP_VERSION,
        updatedByApps: [APP_NAME],
        createdAt: MOCKED_DATE,
        updatedAt: MOCKED_DATE
      })
    })

    it('should update only some metadata with a update trigger', () => {
      const doc = {
        _type: 'io.cozy.todos',
        cozyMetadata: {
          doctypeVersion: 4,
          createdByApp: 'previous-app',
          importedFrom: 'previous-app',
          updatedByApps: ['previous-app'],
          updatedAt: '2017-03-08T09:14:00.185Z'
        }
      }
      const { cozyMetadata } = client.ensureCozyMetadata(doc, {
        event: 'update'
      })
      expect(cozyMetadata).toEqual({
        doctypeVersion: 4,
        createdByApp: 'previous-app',
        importedFrom: 'previous-app',
        updatedByApps: ['previous-app', APP_NAME],
        updatedAt: MOCKED_DATE
      })
    })

    it('keep existing metadata', () => {
      const doc = {
        _type: 'io.cozy.todos',
        cozyMetadata: {
          customField: 'foo',
          doctypeVersion: 3
        }
      }
      const { cozyMetadata } = client.ensureCozyMetadata(doc)
      expect(cozyMetadata.customField).toEqual('foo')
      expect(cozyMetadata.doctypeVersion).toEqual(3)
      expect(cozyMetadata.createdByApp).toEqual(APP_NAME)
    })

    it('update a multiple-value metadata', () => {
      const doc = {
        _type: 'io.cozy.todos',
        cozyMetadata: {
          updatedByApps: ['previous-app']
        }
      }
      const { cozyMetadata } = client.ensureCozyMetadata(doc, {
        event: 'update'
      })
      expect(cozyMetadata.updatedByApps).toEqual(['previous-app', APP_NAME])
    })

    it('shoud not have duplicated multiple-value metadata', () => {
      const doc = {
        _type: 'io.cozy.todos',
        cozyMetadata: {
          updatedByApps: ['previous-app', APP_NAME]
        }
      }
      const { cozyMetadata } = client.ensureCozyMetadata(doc)
      expect(cozyMetadata.updatedByApps).toEqual(['previous-app', APP_NAME])
    })

    it('should do nothing if the schema has no cozyMetadata', () => {
      const clientWithoutMetadata = new CozyClient({
        schema: {
          todos: {
            doctype: 'io.cozy.todos'
          }
        }
      })
      const doc = {
        _type: 'io.cozy.todos'
      }
      const result = clientWithoutMetadata.ensureCozyMetadata(doc)
      expect(result).toEqual(doc)
    })
  })

  describe('query', () => {
    let query, fakeResponse
    beforeEach(() => {
      query = client.all('io.cozy.todos')
      fakeResponse = { data: 'FAKE!!!' }
    })

    it('should first dispatch a INIT_QUERY action', async () => {
      await client.query(query, { as: 'allTodos' })
      expect(client.store.dispatch.mock.calls[0][0]).toEqual(
        initQuery('allTodos', { doctype: 'io.cozy.todos' })
      )
    })

    it('should then dispatch a RECEIVE_QUERY_RESULT action', async () => {
      requestHandler.mockReturnValueOnce(Promise.resolve(fakeResponse))
      await client.query(query, { as: 'allTodos' })
      expect(client.store.dispatch.mock.calls[1][0]).toEqual(
        receiveQueryResult('allTodos', fakeResponse)
      )
    })

    it('should dispatch a RECEIVE_QUERY_ERROR action if an error occurs', async () => {
      const error = new Error('Fake error')
      requestHandler.mockReturnValueOnce(Promise.reject(error))
      try {
        await client.query(query, { as: 'allTodos' })
      } catch (e) {} // eslint-disable-line no-empty
      expect(client.store.dispatch.mock.calls[1][0]).toEqual(
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
      expect(requestHandler.mock.calls[0][0]).toBe(query)
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
      expect(client.store.dispatch.mock.calls[0][0]).toEqual(
        initMutation('updateTodo', mutation)
      )
    })

    it('should call the link with the mutation', async () => {
      await client.mutate(mutation)
      expect(requestHandler.mock.calls[0][0]).toBe(mutation)
    })

    it('should then dispatch a RECEIVE_MUTATION_RESULT action', async () => {
      requestHandler.mockReturnValueOnce(Promise.resolve(fakeResponse))
      await client.mutate(mutation, { as: 'updateTodo' })
      expect(client.store.dispatch.mock.calls[1][0]).toEqual(
        receiveMutationResult('updateTodo', fakeResponse, {}, mutation)
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
      expect(client.store.dispatch.mock.calls[1][0]).toEqual(
        receiveMutationError('updateTodo', error, mutation)
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

  describe('hydratation', () => {
    it('should hydrate relationships into associations with helper methods in the context of a query', () => {
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
      expect(doc.attachments).toBeInstanceOf(HasManyFiles)
      expect(doc.authors).toBeInstanceOf(HasMany)
    })

    it('makes new documents', () => {
      const newTodo = client.makeNewDocument('io.cozy.todos')
      expect(newTodo._type).toBe('io.cozy.todos')
      expect(newTodo.attachments).not.toBe(undefined)
      expect(newTodo.attachments instanceof HasManyFiles).toBe(true)
    })

    it('should not fail on null (when getting absent documents from the store)', () => {
      const doc = client
        .hydrateDocuments('io.cozy.todos', [null], 'allTodos')
        .shift()
      expect(doc).toBe(null)
    })
  })
})
