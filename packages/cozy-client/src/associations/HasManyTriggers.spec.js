import CozyClient from '../CozyClient'
import CozyLink from '../CozyLink'
import HasManyTriggers from './HasManyTriggers'

describe('HasManyTriggers', () => {
  describe('query', () => {
    it('should return query definition', () => {
      const requestHandler = jest.fn()
      const link = new CozyLink(requestHandler)
      const client = new CozyClient({ links: [link] })
      const konnector = {
        slug: 'dummy'
      }

      const queryDef = HasManyTriggers.query(konnector, client)
      expect(queryDef).toEqual({
        doctype: 'io.cozy.triggers',
        fields: undefined,
        id: undefined,
        ids: undefined,
        includes: undefined,
        indexedFields: undefined,
        limit: undefined,
        referenced: undefined,
        selector: {
          worker: 'konnector'
        },
        skip: undefined,
        sort: undefined
      })
    })
  })
})
