import {
  SCHEMA,
  TODO_1,
  TODO_2,
  APP_NAME,
  APP_VERSION,
  SOURCE_ACCOUNT_ID
} from './__tests__/fixtures'

import CozyClient from './CozyClient'
import CozyLink from './CozyLink'
import { QueryDefinition } from './queries/dsl'
import { Association, HasMany } from './associations'

describe('CozyClient', () => {
  const requestHandler = jest.fn()
  const link = new CozyLink(requestHandler)

  afterAll(() => {
    jest.restoreAllMocks()
  })

  let client
  beforeEach(() => {
    client = new CozyClient({
      links: [link],
      schema: SCHEMA,
      appMetadata: {
        slug: APP_NAME,
        sourceAccount: SOURCE_ACCOUNT_ID,
        version: APP_VERSION
      }
    })
    client.ensureStore()
    jest.spyOn(client.store, 'dispatch').mockImplementation(() => {})
  })

  afterEach(() => {
    requestHandler.mockReset()
  })

  describe('fetchRelationships', () => {
    const expectedRelationShipsData = {
      data: [
        {
          ...TODO_1,
          relationships: {
            fake: {
              data: {
                _id: 'ab794478d016457e99bd6241ff6c0d32',
                _type: 'io.cozy.fake'
              }
            }
          }
        },
        {
          ...TODO_2,
          relationships: {
            fake: {
              data: {
                _id: 'ab794478d016457e99bd6241ff6c0d32',
                _type: 'io.cozy.fake'
              }
            }
          }
        }
      ],
      included: [
        {
          _id: 'ab794478d016457e99bd6241ff6c0d32',
          _type: 'io.cozy.fake'
        }
      ]
    }

    it('should handle async queries in Associations', async () => {
      jest.spyOn(client.chain, 'request').mockResolvedValue({
        data: {
          _id: 'ab794478d016457e99bd6241ff6c0d32',
          _type: 'io.cozy.fake'
        }
      })

      class FakeHasMany extends Association {
        static async query() {
          return Promise.resolve(new QueryDefinition())
        }
      }

      const response = { data: [TODO_1, TODO_2] }

      const relationshipsByName = {
        fake: {
          type: FakeHasMany
        }
      }

      expect(
        await client.fetchRelationships(response, relationshipsByName)
      ).toEqual(expectedRelationShipsData)
    })

    it('should use same QueryDefinition from Associations', async () => {
      jest.spyOn(client.chain, 'request').mockResolvedValue({
        data: {
          _id: 'ab794478d016457e99bd6241ff6c0d32',
          _type: 'io.cozy.fake'
        }
      })

      const sameQueryDefinitionForEveryone = new QueryDefinition()

      class FakeHasMany extends Association {
        static query() {
          return sameQueryDefinitionForEveryone
        }
      }

      const response = { data: [TODO_1, TODO_2] }

      const relationshipsByName = {
        fake: {
          type: FakeHasMany
        }
      }

      expect(
        await client.fetchRelationships(response, relationshipsByName)
      ).toEqual(expectedRelationShipsData)
    })

    it('should handle query returning documents', async () => {
      class FakeHasMany extends Association {
        static query() {
          return {
            _id: 'ab794478d016457e99bd6241ff6c0d32',
            _type: 'io.cozy.fake'
          }
        }
      }

      const response = { data: [TODO_1, TODO_2] }

      const relationshipsByName = {
        fake: {
          type: FakeHasMany
        }
      }

      expect(
        await client.fetchRelationships(response, relationshipsByName)
      ).toEqual(expectedRelationShipsData)
    })

    describe('End to end examples', () => {
      const docToRelationshipData = doc => ({ id: doc._id, type: doc._type })

      describe('Photo albums', () => {
        fit('should fetch photo albums', async () => {
          const albums = [
            { _type: 'io.cozy.photos.albums', _id: '12b21c69e8a341fa' },
            { _type: 'io.cozy.photos.albums', _id: 'ba0ad3039fd307b4' },
            { _type: 'io.cozy.photos.albums', _id: '18d4d5a7f46a48d6' }
          ]

          const foos = [{ _type: 'io.cozy.foos', _id: '0009c488a62146c' }]

          const files = [
            {
              _type: 'io.cozy.files',
              _id: '647acd5a1e634279',
              relationships: {
                referenced_by: {
                  data: [albums[0], albums[2], foos[0]].map(
                    docToRelationshipData
                  )
                }
              }
            },
            {
              _type: 'io.cozy.files',
              _id: '9abb0ac09be3e203',
              relationships: {
                referenced_by: {
                  data: [albums[1]].map(docToRelationshipData)
                }
              }
            },
            {
              _type: 'io.cozy.files',
              _id: '11a7243efd3967c1'
            }
          ]

          const fixtures = albums.concat(files, foos)

          requestHandler.mockImplementation(queryDefinition => {
            const data = fixtures
              .filter(doc => doc._type === queryDefinition.doctype)
              .filter(
                doc =>
                  !queryDefinition.ids || queryDefinition.ids.includes(doc._id)
              )
              .filter(
                doc => !queryDefinition.id || doc._id === queryDefinition.id
              )

            return { data: data.length === 1 ? data[0] : data }
          })

          class HasManyReferenced extends HasMany {
            get data() {
              const refs = this.target.relationships.referenced_by.data.filter(
                ref => ref.type === this.doctype
              )
              return refs
                ? refs.map(ref => this.get(ref.type, ref.id)).filter(Boolean)
                : []
            }

            static query(doc, client, assoc) {
              if (
                !doc.relationships ||
                !doc.relationships.referenced_by ||
                !doc.relationships.referenced_by.data
              ) {
                return null
              }
              const included = doc['relationships']['referenced_by']['data']
              const ids = included
                .filter(inc => inc.type === assoc.doctype)
                .map(inc => inc.id)

              return new QueryDefinition({ doctype: assoc.doctype, ids })
            }
          }

          const schema = {
            albums: {
              doctype: 'io.cozy.photos.albums'
            },
            files: {
              doctype: 'io.cozy.files',
              relationships: {
                albums: {
                  type: HasManyReferenced,
                  doctype: 'io.cozy.photos.albums'
                },
                foos: {
                  type: HasManyReferenced,
                  doctype: 'io.cozy.foos'
                }
              }
            }
          }

          const client = new CozyClient({
            links: [link],
            schema
          })

          const query = new QueryDefinition({
            doctype: 'io.cozy.files',
            limit: 50,
            selector: {
              class: 'image',
              trashed: false
            }
          }).include(['albums', 'foos'])

          const resp = await client.query(query)

          expect(resp.data).toEqual([
            {
              _type: 'io.cozy.files',
              _id: '647acd5a1e634279',
              relationships: {
                referenced_by: {
                  data: [albums[0], albums[2], foos[0]].map(
                    docToRelationshipData
                  )
                }
              }
            },
            {
              _type: 'io.cozy.files',
              _id: '9abb0ac09be3e203',
              relationships: {
                referenced_by: { data: [albums[1]].map(docToRelationshipData) }
              }
            },
            {
              _type: 'io.cozy.files',
              _id: '11a7243efd3967c1',
              relationships: {}
            }
          ])
          // expect(resp.included).toEqual(albums.concat(foos))
          // const hydratedfiles = client.hydrateDocuments(
          //   'io.cozy.files',
          //   resp.data
          // )
          // expect(hydratedfiles[0].albums.data).toEqual([albums[0], albums[2]])
        })
      })
    })
  })
})
