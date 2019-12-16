import MockDate from 'mockdate'
import { accounts } from './'
const { getMutedErrors, muteError } = accounts

describe('accounts model', () => {
  const MOCKED_DATE = '2018-05-05T09:09:00.115Z'

  beforeAll(() => {
    MockDate.set(MOCKED_DATE)
  })

  afterAll(() => {
    jest.restoreAllMocks()
    MockDate.reset()
  })

  it('should return the listy of muted errors', () => {
    const accountWithMutedErrors = {
      account_type: 'example-konnector',
      auth: {
        identifier: '0000000000'
      },
      mutedErrors: [
        {
          type: 'LOGIN_FAILED',
          mutedAt: '2019-12-01T00:48:01.404911778Z'
        },
        {
          type: 'LOGIN_FAILED',
          mutedAt: '2019-14-01T00:48:01.404911778Z'
        }
      ]
    }
    expect(getMutedErrors(accountWithMutedErrors)).toEqual([
      {
        type: 'LOGIN_FAILED',
        mutedAt: '2019-12-01T00:48:01.404911778Z'
      },
      {
        type: 'LOGIN_FAILED',
        mutedAt: '2019-14-01T00:48:01.404911778Z'
      }
    ])

    const accountWithoutMutedErrors = {
      account_type: 'example-konnector',
      auth: {
        identifier: '0000000000'
      }
    }
    expect(getMutedErrors(accountWithoutMutedErrors)).toEqual([])
  })

  it('should mute the first error', () => {
    const baseAccount = {
      account_type: 'example-konnector'
    }
    expect(muteError(baseAccount, 'LOGIN_FAILED')).toEqual({
      account_type: 'example-konnector',
      mutedErrors: [
        {
          type: 'LOGIN_FAILED',
          mutedAt: MOCKED_DATE
        }
      ]
    })
  })

  it('should mute subsequent error', () => {
    const account = {
      account_type: 'example-konnector',
      mutedErrors: [
        {
          type: 'LOGIN_FAILED',
          mutedAt: '2018-04-05T09:09:00.115Z'
        },
        {
          type: 'USER_ACTION_NEEDED',
          mutedAt: '2018-04-15T09:09:00.115Z'
        }
      ]
    }
    expect(muteError(account, 'LOGIN_FAILED')).toEqual({
      account_type: 'example-konnector',
      mutedErrors: [
        {
          type: 'LOGIN_FAILED',
          mutedAt: '2018-04-05T09:09:00.115Z'
        },
        {
          type: 'USER_ACTION_NEEDED',
          mutedAt: '2018-04-15T09:09:00.115Z'
        },
        {
          type: 'LOGIN_FAILED',
          mutedAt: MOCKED_DATE
        }
      ]
    })
  })
})
