import { QueryDefinition, Q, makeSorterFromDefinition } from '../queries/dsl'

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

describe('makeSorterFromDefinition', () => {
  it('should make a sort function from a definition', () => {
    const q = Q('io.cozy.files').sortBy([{ name: 'desc'}, { label: 'asc'}])

    const sorter = makeSorterFromDefinition(q)
    const files = [
      { _id: '1', name: 1, label: 'C' },
      { _id: '2', name: 2, label: 'B' },
      { _id: '3', name: 3, label: 'C' },
      { _id: '4', name: 3, label: 'A' }
    ]
    const sorted = sorter(files)
    expect(sorted.map(x => x._id)).toEqual([
      '4', '3', '2', '1'
    ])

  })
})
