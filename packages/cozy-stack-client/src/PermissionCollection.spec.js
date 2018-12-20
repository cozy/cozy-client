jest.mock('./CozyStackClient')

import CozyStackClient from './CozyStackClient'
import PermissionCollection from './PermissionCollection'

const fixtures = {
  permission: {
    test: {
      type: 'io.cozy.todos',
      verbs: ['GET', 'PUT', 'DELETE']
    }
  }
}

describe('PermissionCollection', () => {
  const client = new CozyStackClient()
  const collection = new PermissionCollection('io.cozy.permissions', client)

  describe('Permissions', () => {
    beforeAll(() => {
      client.fetch.mockReset()
      client.fetchJSON.mockReturnValue(Promise.resolve({ data: [] }))
    })

    it('should get its own permissions', async () => {
      await collection.getOwnPermissions()
      expect(client.fetchJSON).toHaveBeenCalledWith('GET', '/permissions/self')
    })

    describe('add', () => {
      it('uses expected permissions endpoint', async () => {
        await collection.add(
          {
            _type: 'io.cozy.permissions',
            _id: 'a340d5e0d64711e6b66c5fc9ce1e17c6'
          },
          fixtures.permission
        )

        expect(client.fetchJSON).toHaveBeenCalledWith(
          'PATCH',
          '/permissions/a340d5e0d64711e6b66c5fc9ce1e17c6',
          {
            data: {
              type: 'io.cozy.permissions',
              attributes: {
                permissions: fixtures.permission
              }
            }
          }
        )
      })

      it('uses expected apps endpoint', async () => {
        await collection.add(
          {
            _type: 'io.cozy.apps',
            slug: 'test-app'
          },
          fixtures.permission
        )

        expect(client.fetchJSON).toHaveBeenCalledWith(
          'PATCH',
          '/permissions/apps/test-app',
          {
            data: {
              type: 'io.cozy.permissions',
              attributes: {
                permissions: fixtures.permission
              }
            }
          }
        )
      })

      it('uses expected konnectors endpoint', async () => {
        await collection.add(
          {
            _type: 'io.cozy.konnectors',
            slug: 'test-konnector'
          },
          fixtures.permission
        )

        expect(client.fetchJSON).toHaveBeenCalledWith(
          'PATCH',
          '/permissions/konnectors/test-konnector',
          {
            data: {
              type: 'io.cozy.permissions',
              attributes: {
                permissions: fixtures.permission
              }
            }
          }
        )
      })

      it('throws an error if document does not have expected doctype', () => {
        expect(collection.add({ _type: 'io.cozy.todos' })).rejects.toEqual(
          new Error(
            'Permissions can only be added on existing permissions, apps and konnectors.'
          )
        )
      })
    })
  })
})
