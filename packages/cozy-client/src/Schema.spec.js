import Schema from './Schema'

describe('Schema', () => {
  const schemaDef = {
    transactions: {
      doctype: 'io.cozy.bank.transactions',
      relationships: {
        account: {
          doctype: 'io.cozy.bank.accounts',
          type: 'has-one'
        }
      }
    },
    accounts: {
      doctype: 'io.cozy.bank.accounts',
      relationships: {}
    }
  }

  let schema

  beforeEach(() => {
    schema = new Schema(schemaDef)
  })

  it('should keep the data in good shape', () => {
    expect(schema.getDoctypeSchema('io.cozy.bank.transactions')).toEqual({
      doctype: 'io.cozy.bank.transactions',
      name: 'transactions',
      relationships: {
        account: {
          doctype: 'io.cozy.bank.accounts',
          name: 'account',
          type: 'has-one'
        }
      }
    })
  })

  it('should remove empty relationships', () => {
    expect(schema.getDoctypeSchema('io.cozy.bank.accounts').relationships).toBe(
      null
    )
  })

  it('should be possible to get a relationship', () => {
    expect(
      schema.getRelationship('io.cozy.bank.transactions', 'account')
    ).toEqual({
      doctype: 'io.cozy.bank.accounts',
      name: 'account',
      type: 'has-one'
    })
  })
})
