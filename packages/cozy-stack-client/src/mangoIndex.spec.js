import {
  isMatchingIndex,
  getIndexFields,
  getIndexNameFromFields,
  getNewIndexName,
  processCondition,
  flattenObject
} from './mangoIndex'

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

  it('should not match index with same fields and index with existing partialFilter but asked for index without partialFilter', () => {
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
    expect(isMatchingIndex(matchingIndex, ['foo', 'bar'])).toEqual(false)
  })
})

describe('getIndexFields', () => {
  it('should return nothing', () => {
    expect(getIndexFields({})).toEqual([])
  })

  it('should return fields from selector', () => {
    const selector = {
      _id: {
        $gt: null
      },
      name: 'toto'
    }
    expect(getIndexFields({ selector })).toEqual(['_id', 'name'])
  })

  it('should return fields from sort', () => {
    const selector = {}
    const sort = [{ _id: 'asc' }, { name: 'asc' }]
    expect(getIndexFields({ selector, sort })).toEqual(['_id', 'name'])
  })

  it('should return fields from partial filter', () => {
    const partialFilter = {
      date: {
        $exists: false
      },
      trashed: {
        $ne: true
      }
    }
    expect(getIndexFields({ partialFilter })).toEqual(['date', 'trashed'])
  })

  it('should return all fields', () => {
    const selector = {
      _id: {
        $gt: null
      },
      name: 'toto'
    }
    const sort = [{ _id: 'asc' }, { name: 'asc' }]

    const partialFilter = {
      date: {
        $exists: false
      },
      trashed: {
        $ne: true
      }
    }
    expect(getIndexFields({ selector, sort, partialFilter })).toEqual([
      '_id',
      'name',
      'date',
      'trashed'
    ])
  })
})

describe('getIndexNameFromFields', () => {
  it('should return index fields', () => {
    const fields = ['_id', 'name']
    expect(getIndexNameFromFields(fields)).toEqual('by__id_and_name')
  })

  it('should return index fields with partial filter', () => {
    const fields = ['_id', 'name']
    const partialFilterFields = ['date', 'trashed']
    expect(getIndexNameFromFields(fields, { partialFilterFields })).toEqual(
      'by__id_and_name_filter_date_and_trashed'
    )
  })
})

describe('getNewIndexName', () => {
  it('should return index for simple selector', () => {
    const selector = {
      dir_id: 'id123',
      type: { $gt: null },
      name: { $gt: null }
    }

    expect(getNewIndexName(selector)).toEqual('by_dir_id_and_type_and_name')
  })
  it('should return index fields', () => {
    const selector = {
      $and: [
        {
          $or: [
            {
              state: {
                $eq: 'running'
              }
            },
            {
              worker: {
                $eq: 'konnector'
              }
            },
            {
              foo: { $ne: 'bar' }
            }
          ]
        },
        {
          $or: [
            {
              foo: {
                $eq: 'running'
              }
            },
            {
              bar: {
                $eq: 'konnector'
              }
            }
          ]
        }
      ]
    }

    expect(getNewIndexName(selector)).toEqual(
      'by_((state_or_worker_or_foo)_and_(foo_or_bar))'
    )
  })

  it('should return index fields with partial filter', () => {
    const selector = {
      dir_id: 'id123',
      type: { $gt: null },
      name: { $gt: null }
    }

    const partialFilter = {
      _id: {
        $nin: ['id456', 'id789']
      },
      trashed: {
        $ne: true
      }
    }

    expect(getNewIndexName(selector, { partialFilter })).toEqual(
      'by_dir_id_and_type_and_name_filter_(_id_nin_id456_id789)_and_(trashed_ne_true)'
    )
  })

  it('should return index fields with partial filter', () => {
    const selector = {
      dir_id: 'id123',
      type: { $gt: null },
      name: { $gt: null },
      $or: [
        {
          foo: {
            $eq: 'bar'
          }
        },
        {
          bar: {
            $eq: 'foo'
          }
        }
      ]
    }

    const partialFilter = {
      _id: {
        $nin: ['id456']
      },
      trashed: {
        $ne: true
      }
    }

    expect(getNewIndexName(selector, { partialFilter })).toEqual(
      'by_dir_id_and_type_and_name_and_(foo_or_bar)_filter_(_id_nin_id456)_and_(trashed_ne_true)'
    )
  })

  it('should return index name for 3 level deep selector', () => {
    const selector = {
      $and: [
        {
          $or: [
            {
              $and: [
                {
                  state: {
                    $eq: 'running'
                  }
                },
                {
                  worker: {
                    $eq: 'konnector'
                  }
                }
              ]
            },
            {
              foo: { $ne: 'bar' }
            }
          ]
        }
      ]
    }

    expect(getNewIndexName(selector)).toEqual(
      'by_(((state_and_worker)_or_foo))'
    )
  })
})

describe('processCondition', () => {
  it('should process a simple condition', () => {
    const condition = { field1: 'value1' }
    const processedCondition = processCondition(condition)
    expect(processedCondition).toEqual('field1')
  })

  it('should process a condition with $or operator', () => {
    const condition = {
      $or: [{ field1: 'value1' }, { field2: 'value2' }, { field3: 'value3' }]
    }
    const processedCondition = processCondition(condition)
    expect(processedCondition).toEqual('(field1_or_field2_or_field3)')
  })

  it('should process a condition with $and operator', () => {
    const condition = {
      $and: [{ field1: 'value1' }, { field2: 'value2' }, { field3: 'value3' }]
    }
    const processedCondition = processCondition(condition)
    expect(processedCondition).toEqual('(field1_and_field2_and_field3)')
  })

  it('should process a deeply nested condition', () => {
    const condition = {
      $and: [
        {
          $or: [
            {
              $and: [
                { field1: 'value1' },
                { $or: [{ field2: 'value2' }, { field3: 'value3' }] }
              ]
            },
            { field4: 'value4' }
          ]
        }
      ]
    }
    const processedCondition = processCondition(condition)
    expect(processedCondition).toEqual('(((field1_and_or)_or_field4))')
  })
})

describe('flattenObject', () => {
  it('should flatten an object with nested properties', () => {
    const obj = {
      foo: 'bar',
      nested1: {
        prop1: 'value1',
        prop2: 'value2'
      }
    }
    const flattenedObj = flattenObject(obj)
    expect(flattenedObj).toEqual({
      foo: 'bar',
      nested1_prop1: 'value1',
      nested1_prop2: 'value2'
    })
  })

  it('should flatten an object with arrays', () => {
    const obj = {
      arr: [1, 2, 3],
      nested: {
        arr: ['a', 'b', 'c']
      }
    }
    const flattenedObj = flattenObject(obj)
    expect(flattenedObj).toEqual({
      arr: [1, 2, 3],
      nested_arr: ['a', 'b', 'c']
    })
  })

  it('should flatten an object with null and undefined values', () => {
    const obj = {
      foo: null,
      bar: undefined,
      nested: {
        prop1: null,
        prop2: undefined
      }
    }
    const flattenedObj = flattenObject(obj)
    expect(flattenedObj).toEqual({
      foo: null,
      bar: undefined,
      nested_prop1: null,
      nested_prop2: undefined
    })
  })
})
