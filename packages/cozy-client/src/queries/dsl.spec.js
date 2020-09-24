import { QueryDefinition, Q } from '../queries/dsl'

describe('QueryDefinition', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn')
  })

  afterEach(() => {
    console.warn.mockRestore()
  })

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

  it('paginates only one way', () => {
    const q = Q('io.cozy.files')
    const withSkip = q.offset(2)
    expect(withSkip.skip).toEqual(2)
    expect(withSkip.bookmark).toBeUndefined()
    expect(withSkip.cursor).toBeUndefined()

    const withCursor = withSkip.offsetCursor('cursor-id')
    expect(withCursor.cursor).toEqual('cursor-id')
    expect(withCursor.bookmark).toBeUndefined()
    expect(withCursor.skip).toBeUndefined()

    const withBookmark = withCursor.offsetBookmark('bookmark-id')
    expect(withBookmark.bookmark).toEqual('bookmark-id')
    expect(withBookmark.cursor).toBeUndefined()
    expect(withBookmark.skip).toBeUndefined()

    const withSkipAgain = withBookmark.offset(2)
    expect(withSkipAgain.skip).toEqual(2)
    expect(withSkipAgain.bookmark).toBeUndefined()
    expect(withSkipAgain.cursor).toBeUndefined()
  })

  it('should not warn for valid queries', () => {
    Q('io.cozy.files')
      .sortBy([{ type: 'asc' }, { dirID: 'asc' }])
      .where({ type: 'file', dirID: '123' })
      .indexFields(['type', 'dirID'])
    expect(console.warn).toHaveBeenCalledTimes(0)
  })
  it('should warn on sorting non-indexed fields', () => {
    Q('io.cozy.files')
      .where({ type: 'file', dirID: '123' })
      .indexFields(['type', 'dirID'])
      .sortBy([{ type: 'asc' }, { dirID: 'asc' }, { date: 'asc' }])
    expect(console.warn).toHaveBeenCalledTimes(1)
  })
  it('should warn on sort order', () => {
    Q('io.cozy.files')
      .where({ type: 'file', dirID: '123' })
      .indexFields(['type', 'dirID'])
      .sortBy([{ dirID: 'asc' }, { type: 'asc' }])
    expect(console.warn).toHaveBeenCalledTimes(1)
  })
  it('should warn on sort order through the selector', () => {
    Q('io.cozy.files')
      .where({ type: 'file', dirID: '123' })
      .sortBy([{ dirID: 'asc' }, { type: 'asc' }])
    expect(console.warn).toHaveBeenCalledTimes(1)
  })
  it('should not warn for queries with no selector', () => {
    Q('io.cozy.files').sortBy([{ dirID: 'asc' }, { type: 'asc' }])
    expect(console.warn).toHaveBeenCalledTimes(0)
  })
})
