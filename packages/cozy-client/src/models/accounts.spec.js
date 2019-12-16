import { accounts } from './'
const { getMutedErrors } = accounts

describe('accounts model', () => {
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
})
