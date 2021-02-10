import { getMatchingIndex } from './mangoIndex'

const buildDesignDoc = (fields, partialFilter = {}) => {
  return {
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
    const nonMatchingIndex = buildDesignDoc({ baz: 'asc' })
    const matchingIndex = buildDesignDoc({
      foo: 'asc',
      bar: 'asc'
    })
    const indexes = [nonMatchingIndex, matchingIndex]

    expect(getMatchingIndex(indexes, ['foo', 'bar'])).toEqual(matchingIndex)
    expect(getMatchingIndex(indexes, ['bar', 'foo'])).toEqual(matchingIndex)
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
      partialFilter
    )
    const indexes = [matchingIndex]

    expect(getMatchingIndex(indexes, ['foo', 'bar'], partialFilter)).toEqual(
      matchingIndex
    )
  })

  it('should not match index with different fields ', () => {
    const designDoc1 = buildDesignDoc({ foo: 'asc' })
    const designDoc2 = buildDesignDoc({})
    const designDoc3 = buildDesignDoc({
      foo: 'asc',
      bar: 'asc',
      baz: 'asc'
    })
    const indexes = [designDoc1, designDoc2, designDoc3]
    const fields = ['foo', 'bar']

    expect(getMatchingIndex(indexes, fields)).toEqual(undefined)
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
      partialFilter
    )
    const indexes = [matchingIndex]

    expect(
      getMatchingIndex(indexes, ['foo', 'bar'], {
        baz: {
          $ne: 'xyz'
        }
      })
    ).toEqual(undefined)
  })
})
