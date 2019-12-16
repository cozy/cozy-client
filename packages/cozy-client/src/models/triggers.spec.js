import { triggers as triggersModel } from './'

const { triggerStates, triggers } = triggersModel

describe('trigger states', () => {
  it('should get execution date', () => {
    expect(
      triggerStates.getLastExecution({
        current_state: {
          last_execution: '2010-09-10T00:00'
        }
      })
    ).toBe('2010-09-10T00:00')
  })

  it('shouldnt fail for unexecuted konnectors', () => {
    expect(triggerStates.getLastExecution({})).toBe(undefined)
  })

  it('should return whether or not the konnector is errored', () => {
    expect(
      triggerStates.isErrored({
        current_state: { status: 'errored' }
      })
    ).toBe(true)
    expect(
      triggerStates.isErrored({
        current_state: { status: 'ok' }
      })
    ).toBe(false)
    expect(triggerStates.isErrored({})).toBe(false)
  })
})

describe('triggers model', () => {
  const normalTrigger = {
    _rev: '1-31eb8f0da1db0f3196ccf0d4329ea554',
    prefix: 'toto.mycozy.cloud',
    arguments: '0 35 0 * * 3',
    message: {
      account: '4cbfe8f3d89edf60542d5fe9cdcac7b1',
      konnector: 'orangemobile'
    },
    _id: 'fa4c076914ce46a92fa3e7e5f0672ca5',
    domain: 'claire.mycozy.cloud',
    worker: 'konnector',
    debounce: '',
    options: null,
    type: '@cron'
  }

  const legacyTrigger = {
    arguments: '37 42 0 * * 3',
    domain: 'claire.mycozy.cloud',
    _rev: '2-a9f7f0eb5ccc0871e10721797ef5dcf0',
    worker: 'konnector',
    _id: '3a7c363eea2ddb4d73bd11afa9bb4691',
    type: '@cron',
    options: null,
    message: {
      Data:
        'eyJrb25uZWN0b3IiOiJhbWVsaSIsImFjY291bnQiOiIzYTdjMzYzZWVhMmRkYjRkNzNiZDExYWZhOWJiM2ViNiJ9',
      Type: 'json'
    }
  }

  describe('getKonnectorFromTrigger', () => {
    it('should work with normal triggers', () => {
      expect(triggers.getKonnector(normalTrigger)).toBe('orangemobile')
    })

    it('should work with legacy triggers', () => {
      expect(triggers.getKonnector(legacyTrigger)).toBe('ameli')
    })
  })

  describe('getAccountId', () => {
    it('should return the account id', () => {
      expect(triggers.getAccountId(normalTrigger)).toBe(
        '4cbfe8f3d89edf60542d5fe9cdcac7b1'
      )
      expect(triggers.getAccountId(legacyTrigger)).toBe(
        '3a7c363eea2ddb4d73bd11afa9bb3eb6'
      )
    })
  })
})
