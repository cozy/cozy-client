import {
  extractFiltersFromSelector,
  evaluateSelectorInMemory,
  getSortDirection
} from './mango.js'

describe('extractFiltersFromSelector', () => {
  it('should detect no issues when only one range on first indexed field', () => {
    const selector = {
      type: { $gt: 'a' },
      status: { $eq: 'ok' }
    }
    const indexedFields = ['type', 'status']

    const result = extractFiltersFromSelector(selector, indexedFields)

    expect(result).toEqual({
      notForCursorFilters: {},
      cursorFilters: {
        type: { $gt: 'a' },
        status: { $eq: 'ok' }
      }
    })
  })

  it('should detect a second range on a non-first indexed field', () => {
    const selector = {
      type: { $gt: 'a' },
      size: { $lt: 1000 }
    }
    const indexedFields = ['type', 'size']

    const result = extractFiltersFromSelector(selector, indexedFields)

    expect(result).toEqual({
      notForCursorFilters: {
        size: { $lt: 1000 }
      },
      cursorFilters: {
        type: { $gt: 'a' }
      }
    })
  })

  it('should detect range on non-indexed field', () => {
    const selector = {
      type: { $gt: 'a' },
      date: { $lt: '2024-01-01' }
    }
    const indexedFields = ['type']

    const result = extractFiltersFromSelector(selector, indexedFields)

    expect(result).toEqual({
      notForCursorFilters: {
        date: { $lt: '2024-01-01' }
      },
      cursorFilters: {
        type: { $gt: 'a' }
      }
    })
  })

  it('should group multiple non-indexed range fields', () => {
    const selector = {
      foo: { $gt: 1 },
      bar: { $lt: 10 },
      baz: { $eq: 'test' }
    }
    const indexedFields = ['baz']

    const result = extractFiltersFromSelector(selector, indexedFields)

    expect(result).toEqual({
      notForCursorFilters: {
        foo: { $gt: 1 },
        bar: { $lt: 10 }
      },
      cursorFilters: {
        baz: { $eq: 'test' }
      }
    })
  })

  it('should detect non-indexed range field', () => {
    const selector = {
      baz: { $eq: 'test' },
      foo: { $gt: 1 },
      bar: { $lt: 10 }
    }
    const indexedFields = ['baz', 'foo']

    const result = extractFiltersFromSelector(selector, indexedFields)

    expect(result).toEqual({
      notForCursorFilters: {
        bar: { $lt: 10 }
      },
      cursorFilters: {
        baz: { $eq: 'test' },
        foo: { $gt: 1 }
      }
    })
  })

  it('should allow simple equality conditions for cursor', () => {
    const selector = {
      type: 'pdf',
      category: 'report'
    }
    const indexedFields = ['type', 'category']

    const result = extractFiltersFromSelector(selector, indexedFields)

    expect(result).toEqual({
      notForCursorFilters: {},
      cursorFilters: {
        type: 'pdf',
        category: 'report'
      }
    })
  })

  it('should allow cursor for one range and multiple equalities', () => {
    const selector = {
      type: 'pdf',
      category: 'report',
      date: { $gt: '2024-01-01' }
    }
    const indexedFields = ['type', 'category', 'date']

    const result = extractFiltersFromSelector(selector, indexedFields)

    expect(result).toEqual({
      notForCursorFilters: {},
      cursorFilters: {
        type: 'pdf',
        category: 'report',
        date: { $gt: '2024-01-01' }
      }
    })
  })

  it('should force non-cursor with forceInMemory option', () => {
    const selector = {
      type: 'pdf'
    }
    const indexedFields = ['type']
    const result = extractFiltersFromSelector(selector, indexedFields, {
      forceInMemory: true
    })

    expect(result).toEqual({
      notForCursorFilters: { type: 'pdf' },
      cursorFilters: {}
    })
  })
})

describe('evaluateSelectorInMemory', () => {
  const data = [
    {
      _id: '1',
      name: 'a',
      size: 10,
      type: 'type1'
    },
    {
      _id: '2',
      name: 'b',
      size: 500,
      type: 'type1'
    },
    {
      _id: '3',
      name: 'c',
      size: 100,
      type: 'type2'
    },
    {
      _id: '4',
      name: 'd',
      size: 200,
      type: 'type2'
    }
  ]
  it('should return all data with null selector', async () => {
    const selector = { _id: { $gt: null } }
    expect(await evaluateSelectorInMemory(null, data, selector)).toEqual(data)
  })

  it('should correctly apply range ope', async () => {
    const selector = { size: { $gt: 100, $lt: 500 } }
    expect(await evaluateSelectorInMemory(null, data, selector)).toEqual([
      data[3]
    ])
  })

  it('should correctly apply equality ope', async () => {
    const selector = { size: { $eq: 100 } }
    expect(await evaluateSelectorInMemory(null, data, selector)).toEqual([
      data[2]
    ])
  })

  it('should deal with mulitple operators', async () => {
    const selector = { type: 'type1', size: { $gt: 100 } }
    expect(await evaluateSelectorInMemory(null, data, selector)).toEqual([
      data[1]
    ])
  })
})

describe('sort direction', () => {
  it('should get ascending order', () => {
    const sort = [{ date: 'asc', name: 'asc' }]
    expect(getSortDirection(sort)).toEqual('next')
  })
  it('should get desc order', () => {
    const sort = [{ date: 'desc', name: 'desc' }]
    expect(getSortDirection(sort)).toEqual('prev')
  })
  it('should get asc order as default', () => {
    const sort = undefined
    expect(getSortDirection(sort)).toEqual('next')
  })
})
