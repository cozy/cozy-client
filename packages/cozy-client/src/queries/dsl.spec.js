import { QueryDefinition as Q } from '../queries/dsl'

describe('QueryDefinition', () => {
  it('should build query defs', () => {
    const q = new Q({ doctype: 'io.cozy.todos' })
    expect(q.select(['toto'])).toMatchObject({
      doctype: 'io.cozy.todos',
      fields: ['toto']
    })
  })
})
