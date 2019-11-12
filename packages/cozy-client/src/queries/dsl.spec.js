import { QueryDefinition, Q } from '../queries/dsl'

describe('QueryDefinition', () => {
  it('should build query defs on selected fields', () => {
    const q = new QueryDefinition({ doctype: 'io.cozy.todos' })
    expect(q.select(['toto'])).toMatchObject({
      doctype: 'io.cozy.todos',
      fields: ['toto']
    })
  })

  it('should build query def on id', () => {
    const q = new QueryDefinition({ doctype: 'io.cozy.todos' })
    expect(q.getById('id1')).toMatchObject({
      id: 'id1',
      doctype: 'io.cozy.todos'
    })
  })

  it('should build query def on ids', () => {
    const q = new QueryDefinition({ doctype: 'io.cozy.todos' })
    expect(q.getByIds(['id1', 'ids2'])).toMatchObject({
      ids: ['id1', 'ids2'],
      doctype: 'io.cozy.todos'
    })
  })

  it('should work with shorthand Q', () => {
    const q = Q('io.cozy.files')
    expect(q.getByIds(['id1', 'ids2'])).toMatchObject({
      ids: ['id1', 'ids2'],
      doctype: 'io.cozy.files'
    })
  })
})
