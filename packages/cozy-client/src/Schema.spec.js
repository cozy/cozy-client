import Schema from './Schema'
import HasOneInPlace from './associations/HasOneInPlace'
import HasMany from './associations/HasMany'

describe('Schema', () => {
  const schemaDef = {
    transactions: {
      doctype: 'io.cozy.bank.transactions',
      relationships: {
        account: {
          doctype: 'io.cozy.bank.accounts',
          type: 'belongs-to-in-place'
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

  it('keeps the data in good shape', () => {
    expect(schema.getDoctypeSchema('io.cozy.bank.transactions')).toEqual({
      doctype: 'io.cozy.bank.transactions',
      name: 'transactions',
      relationships: {
        account: {
          doctype: 'io.cozy.bank.accounts',
          name: 'account',
          type: HasOneInPlace
        }
      }
    })
  })

  it('removes empty relationships', () => {
    expect(schema.getDoctypeSchema('io.cozy.bank.accounts').relationships).toBe(
      null
    )
  })

  it('gives access to relationships', () => {
    expect(
      schema.getRelationship('io.cozy.bank.transactions', 'account')
    ).toEqual({
      doctype: 'io.cozy.bank.accounts',
      name: 'account',
      type: HasOneInPlace
    })
  })

  describe('add', () => {
    it('adds a schema definition', () => {
      schema.add({
        todos: {
          doctype: 'io.cozy.todos',
          attributes: {},
          relationships: {
            items: {
              doctype: 'io.cozy.todo.items',
              type: 'has-many'
            }
          }
        }
      })

      expect(schema.getDoctypeSchema('io.cozy.todos')).toEqual({
        doctype: 'io.cozy.todos',
        name: 'todos',
        attributes: {},
        relationships: {
          items: {
            doctype: 'io.cozy.todo.items',
            name: 'items',
            type: HasMany
          }
        }
      })

      expect(schema.getRelationship('io.cozy.todos', 'items')).toEqual({
        doctype: 'io.cozy.todo.items',
        name: 'items',
        type: HasMany
      })
    })

    it('keeps the previous', () => {
      expect(schema.getDoctypeSchema('io.cozy.bank.transactions')).toEqual({
        doctype: 'io.cozy.bank.transactions',
        name: 'transactions',
        relationships: {
          account: {
            doctype: 'io.cozy.bank.accounts',
            name: 'account',
            type: HasOneInPlace
          }
        }
      })

      expect(
        schema.getRelationship('io.cozy.bank.transactions', 'account')
      ).toEqual({
        doctype: 'io.cozy.bank.accounts',
        name: 'account',
        type: HasOneInPlace
      })
    })
  })
})
