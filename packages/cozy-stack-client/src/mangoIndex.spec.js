import {
  isMatchingIndex,
  getIndexFields,
  getIndexNameFromFields
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
  const fields = ['dir_id', 'type', 'name']

  it('should return index fields', () => {
    expect(getIndexNameFromFields(fields)).toEqual(
      'by_dir_id_and_type_and_name'
    )
  })

  it('should return index fields with partial filter', () => {
    const partialFilter = {
      trashed: false
    }

    expect(getIndexNameFromFields(fields, partialFilter)).toEqual(
      'by_dir_id_and_type_and_name_filter_(trashed_false)'
    )
  })

  it('should return index fields with partial filter with multiple conditions', () => {
    const partialFilter = {
      type: 'file',
      classe: 'image',
      trashed: true
    }

    expect(getIndexNameFromFields(fields, partialFilter)).toEqual(
      'by_dir_id_and_type_and_name_filter_(type_file)_and_(classe_image)_and_(trashed_true)'
    )
  })

  it('should return index fields with partial filter with nested conditions', () => {
    const partialFilter = {
      type: 'file',
      trashed: true,
      'metadata.notifiedAt': {
        $exists: false
      }
    }

    expect(getIndexNameFromFields(fields, partialFilter)).toEqual(
      'by_dir_id_and_type_and_name_filter_(type_file)_and_(trashed_true)_and_(metadata.notifiedAt_$exists_false)'
    )
  })

  it('should return index fields with partial filter with $or and $and at root', () => {
    const partialFilter = {
      type: 'file',
      $or: [
        {
          trashed: {
            $exists: false
          }
        },
        {
          trashed: false
        },
        {
          class: 'image'
        }
      ]
    }

    expect(getIndexNameFromFields(fields, partialFilter)).toEqual(
      'by_dir_id_and_type_and_name_filter_(type_file)_and_((trashed_$exists_false)_$or_(trashed_false)_$or_(class_image))'
    )
  })

  it('should return index fields with partial filter with $or inside sub condition', () => {
    const partialFilter = {
      worker: { $or: ['konnector', 'client'] },
      state: 'running'
    }

    expect(getIndexNameFromFields(fields, partialFilter)).toEqual(
      'by_dir_id_and_type_and_name_filter_(worker_$or_(konnector_client))_and_(state_running)'
    )
  })

  it('should return index fields with partial filter with $nor inside sub condition', () => {
    const partialFilter = {
      $nor: [
        {
          type: {
            $eq: 'directory'
          }
        },
        { dir_id: 'id1234' },
        {
          'metadata.notifiedAt': {
            $exists: false
          }
        }
      ]
    }

    expect(getIndexNameFromFields(fields, partialFilter)).toEqual(
      'by_dir_id_and_type_and_name_filter_((type_$eq_directory)_$nor_(dir_id_id1234)_$nor_(metadata.notifiedAt_$exists_false))'
    )
  })
})
