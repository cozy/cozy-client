import HasManyTriggers from './HasManyTriggers'

const ALL_TRIGGERS_FIXTURES = [
  {
    _id: '',
    _type: 'io.cozy.triggers',
    message: {
      konnector: 'dummy'
    }
  },
  {
    _id: '',
    _type: 'io.cozy.triggers',
    message: {
      konnector: 'dummy-test'
    }
  },
  {
    _id: '',
    _type: 'io.cozy.triggers',
    message: {
      konnector: 'dummmy-fake'
    }
  }
]

describe('HasManyTriggers', () => {
  describe('query', () => {
    it('should return triggers', async () => {
      const client = {
        all: jest.fn().mockReturnValue({
          where: jest.fn()
        }),
        query: jest.fn().mockResolvedValue(ALL_TRIGGERS_FIXTURES),
        getCollectionFromState: jest.fn().mockReturnValue(ALL_TRIGGERS_FIXTURES)
      }

      const konnector = {
        slug: 'dummy'
      }

      const triggers = await HasManyTriggers.query(konnector, client)
      expect(triggers).toEqual([
        {
          _id: '',
          _type: 'io.cozy.triggers',
          message: { konnector: 'dummy' }
        }
      ])
    })
  })
})
