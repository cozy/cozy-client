import HasOne from './HasOne'
import { QueryDefinition } from '../queries/dsl'

const clientMock = {
  get: (doctype, id) => new QueryDefinition({ doctype, id })
}

const fixtures = {
  jediMaster: {
    _id: 'obiwan',
    _type: 'io.cozy.jedis',
    name: 'Obiwan Kenobi',
    relationships: {
      padawan: {
        data: { _id: 'anakin', _type: 'io.cozy.jedis' }
      }
    }
  },
  apprentice: {
    _id: 'anakin',
    _type: 'io.cozy.jedis',
    name: 'Anakin Skywalker'
  }
}

const get = jest.fn().mockReturnValue(fixtures.apprentice)

const hydrated = {
  ...fixtures.jediMaster,
  padawan: new HasOne(fixtures.jediMaster, 'padawan', 'io.cozy.jedis', { get })
}

describe('HasOne', () => {
  describe('raw', () => {
    it('returns relationship raw data', () => {
      expect(hydrated.padawan.raw).toEqual({
        _id: 'anakin',
        _type: 'io.cozy.jedis'
      })
    })
  })

  describe('data', () => {
    it('calls get method', () => {
      const jedi = hydrated.padawan.data
      expect(hydrated.padawan.get).toHaveBeenCalledWith(
        'io.cozy.jedis',
        'anakin'
      )
      expect(jedi).toEqual(fixtures.apprentice)
    })
  })

  describe('query', () => {
    it('returns the expected QueryDefinition', () => {
      const queryDef = HasOne.query(fixtures.jediMaster, clientMock, {
        name: 'padawan',
        doctype: 'io.cozy.jedis'
      })
      expect(queryDef.doctype).toEqual('io.cozy.jedis')
      expect(queryDef.id).toEqual(fixtures.apprentice._id)
    })
  })
})
