jest.mock('./CozyStackClient')

import CozyStackClient from './CozyStackClient'
import PermissionCollection, { getPermissionsFor } from './PermissionCollection'

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

  describe('createSharingLink', () => {
    it('Should be read-only by default', async () => {
      const document = { _type: 'io.cozy.files', _id: '1234' }
      await collection.createSharingLink(document)
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'POST',
        '/permissions?codes=email',
        {
          data: {
            type: 'io.cozy.permissions',
            attributes: {
              permissions: {
                files: {
                  type: 'io.cozy.files',
                  verbs: ['GET'],
                  values: [document._id]
                }
              }
            }
          }
        }
      )
    })

    it('Should use specific permissions when requested', async () => {
      const document = { _type: 'io.cozy.files', _id: '1234' }
      const verbs = ['GET', 'PATCH', 'PUT']
      const options = { verbs }
      await collection.createSharingLink(document, options)
      expect(client.fetchJSON).toHaveBeenCalledWith(
        'POST',
        '/permissions?codes=email',
        {
          data: {
            type: 'io.cozy.permissions',
            attributes: {
              permissions: {
                files: {
                  type: 'io.cozy.files',
                  verbs: verbs,
                  values: [document._id]
                }
              }
            }
          }
        }
      )
    })
  })
})

describe('getPermissionsFor', () => {
  it('Should give all permissions by default', () => {
    const document = { _type: 'io.cozy.files', _id: '1234' }
    const perms = getPermissionsFor(document, false)
    expect(perms.files.verbs).toEqual(expect.arrayContaining(['ALL']))
  })

  it('Should give GET permissions for a link', () => {
    const document = { _type: 'io.cozy.files', _id: '1234' }
    const perms = getPermissionsFor(document, true)
    expect(perms.files.verbs).toEqual(expect.arrayContaining(['GET']))
  })

  it('Should let one set the permissions it want', () => {
    const document = { _type: 'io.cozy.files', _id: '1234' }
    const verbs = ['GET', 'PATCH', 'PUT']
    const options = { verbs }
    const perms = getPermissionsFor(document, false, options)
    expect(perms.files.verbs).toEqual(expect.arrayContaining(verbs))
    const perms2 = getPermissionsFor(document, true, options)
    expect(perms2.files.verbs).toEqual(expect.arrayContaining(verbs))
  })
})
