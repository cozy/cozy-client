import { isMatchingIndex, isInconsistentIndex } from './mangoIndex'

const buildDesignDoc = (fields, { partialFilter, id } = {}) => {
  return {
    _id: id,
    views: {
      123: {
        map: {
          fields,
          partial_filter_selector: partialFilter
        }
      }
    }
  }
}

describe('matching index', () => {
  it('should match index with same fields', () => {
    const matchingIndex = buildDesignDoc({
      foo: 'asc',
      bar: 'asc'
    })
    expect(isMatchingIndex(matchingIndex, ['foo', 'bar'])).toEqual(true)
  })

  it('should not match index with different fields', () => {
    const nonMatchingIndex1 = buildDesignDoc({ baz: 'asc' })
    const nonMatchingIndex2 = buildDesignDoc({
      bar: 'asc',
      foo: 'asc'
    })
    const nonMatchingIndex3 = buildDesignDoc({})
    const nonMatchingIndex4 = buildDesignDoc({ foo: 'asc' })

    expect(isMatchingIndex(nonMatchingIndex1, ['foo', 'bar'])).toEqual(false)
    expect(isMatchingIndex(nonMatchingIndex2, ['foo', 'bar'])).toEqual(false)
    expect(isMatchingIndex(nonMatchingIndex3, ['foo', 'bar'])).toEqual(false)
    expect(isMatchingIndex(nonMatchingIndex4, ['foo', 'bar'])).toEqual(false)
  })

  it('should match index with same fields and same partial filter', () => {
    const partialFilter = {
      baz: {
        $ne: 'xyz'
      }
    }
    const matchingIndex = buildDesignDoc(
      {
        foo: 'asc',
        bar: 'asc'
      },
      { partialFilter }
    )

    expect(
      isMatchingIndex(matchingIndex, ['foo', 'bar'], partialFilter)
    ).toEqual(true)
  })

  it('should not match index with same fields and different partial filter', () => {
    const partialFilter = {
      baz: {
        $ne: 'xyz',
        $exists: true
      }
    }
    const matchingIndex = buildDesignDoc(
      {
        foo: 'asc',
        bar: 'asc'
      },
      { partialFilter }
    )
    expect(
      isMatchingIndex(matchingIndex, ['foo', 'bar'], {
        baz: {
          $ne: 'xyz'
        }
      })
    ).toEqual(false)
  })
})

describe('inconsistent index', () => {
  it('should detect inconsistent index', () => {
    const index = buildDesignDoc(
      { foo: 'asc', bar: 'asc' },
      { id: '_design/by_bar_and_foo' }
    )
    expect(isInconsistentIndex(index)).toBe(true)
  })

  it('should not detect consistent index', () => {
    const index1 = buildDesignDoc(
      { bar: 'asc', foo: 'asc' },
      { id: '_design/by_bar_and_foo' }
    )
    const index2 = buildDesignDoc(
      { foo: 'asc', bar: 'asc' },
      { id: '/design/1234' }
    )
    expect(isInconsistentIndex(index1)).toBe(false)
    expect(isInconsistentIndex(index2)).toBe(false)
  })
})
