import CozyStackClient from 'cozy-stack-client'
import { StackLink } from '../CozyLink'
import { create, all, find } from '../dsl'

import { TODO_1, TODO_2, TODO_3 } from './fixtures'

describe('StackLink', () => {
  const client = new CozyStackClient()
  const schema = {
    albums: {
      doctype: 'io.cozy.todos',
      relationships: {
        attachments: {
          type: 'has-many',
          doctype: 'io.cozy.files'
        }
      }
    }
  }
  const link = new StackLink({ client, schema })

  describe('query execution', () => {
    it('should execute queries without a selector', async () => {
      const query = all('io.cozy.todos')
      client.collection().all.mockReset()
      await link.execute(query)
      expect(client.collection().all).toHaveBeenCalled()
      expect(client.collection).toHaveBeenCalledWith('io.cozy.todos')
    })

    it('should execute queries with a selector', async () => {
      const query = find('io.cozy.todos').where({ checked: true })
      client.collection().find.mockReset()
      await link.execute(query)
      expect(client.collection().find).toHaveBeenCalledWith(
        { checked: true },
        {}
      )
    })

    describe('includes fetching', () => {
      it('should handle has-many files associations', async () => {
        const query = all('io.cozy.photos.albums').include(['attachments'])
        client.collection().all.mockReset()
        client.collection().all.mockReturnValueOnce(
          Promise.resolve({
            data: [TODO_1, TODO_2, TODO_3]
          })
        )
        client.collection().findReferencedBy.mockReset()
        client
          .collection()
          .findReferencedBy.mockReturnValueOnce(
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
        const resp = await link.execute(query)
        expect(client.collection().all).toHaveBeenCalled()
        expect(client.collection().findReferencedBy).toHaveBeenCalledTimes(3)
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
  })

  // describe('mutation execution', () => {
  //   it('should execute a mutation function by passing it the stack client instance', async () => {
  //     await link.execute(mutation)
  //     expect(mutation).toHaveBeenCalledWith(client)
  //   })
  // })
})
