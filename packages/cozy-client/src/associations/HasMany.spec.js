import HasMany from './HasMany'

const TASK_DOCTYPE = 'io.cozy.tasks'

const store = {
  documents: {
    [TASK_DOCTYPE]: {
      1: { id: 1, doctype: TASK_DOCTYPE },
      2: { id: 2, doctype: TASK_DOCTYPE },
      4: { id: 4, doctype: TASK_DOCTYPE },
      5: { id: 5, doctype: TASK_DOCTYPE }
    }
  }
}

const get = (doctype, id) => store.documents[TASK_DOCTYPE][id]

describe('HasMany', () => {
  let original, hydrated, originalWithNorelation, hydratedWithNoRelation, save

  beforeEach(() => {
    original = {
      _type: 'io.cozy.todos',
      label: 'Be kind',
      relationships: {
        tasks: {
          data: [
            { _id: 1, _type: TASK_DOCTYPE },
            { _id: 2, _type: TASK_DOCTYPE },
            { _id: 3, _type: TASK_DOCTYPE }
          ]
        }
      }
    }

    originalWithNorelation = {
      _type: 'io.cozy.todos',
      label: 'Be kind'
    }

    save = jest.fn()

    hydrated = {
      ...original,
      tasks: new HasMany(original, 'tasks', TASK_DOCTYPE, { get, save })
    }

    hydratedWithNoRelation = {
      ...originalWithNorelation,
      tasks: new HasMany(originalWithNorelation, 'tasks', TASK_DOCTYPE, {
        get,
        save
      })
    }
  })

  it('adds', () => {
    hydrated.tasks.addById(4)
    expect(hydrated.tasks.data).toEqual([
      { doctype: 'io.cozy.tasks', id: 1 },
      { doctype: 'io.cozy.tasks', id: 2 },
      { doctype: 'io.cozy.tasks', id: 4 }
    ])
    expect(save).toHaveBeenCalled()
  })

  it('doesnt add if already there', () => {
    hydrated.tasks.addById(1)
    expect(hydrated.tasks.data).toEqual([
      { doctype: 'io.cozy.tasks', id: 1 },
      { doctype: 'io.cozy.tasks', id: 2 }
    ])
  })

  it('adds multiple ids', () => {
    hydrated.tasks.addById([4, 5])
    expect(hydrated.tasks.data).toEqual([
      { doctype: 'io.cozy.tasks', id: 1 },
      { doctype: 'io.cozy.tasks', id: 2 },
      { doctype: 'io.cozy.tasks', id: 4 },
      { doctype: 'io.cozy.tasks', id: 5 }
    ])
  })

  it('removes', () => {
    hydrated.tasks.removeById(2)
    expect(hydrated.tasks.data).toEqual([{ doctype: 'io.cozy.tasks', id: 1 }])
    expect(save).toHaveBeenCalled()
  })

  it('doesnt remove if not there', () => {
    hydrated.tasks.removeById(3)
    expect(hydrated.tasks.data).toEqual([
      { doctype: 'io.cozy.tasks', id: 1 },
      { doctype: 'io.cozy.tasks', id: 2 }
    ])
  })

  it('can remove multiple docs from the relationship', () => {
    hydrated.tasks.removeById([1, 2])
    expect(hydrated.tasks.data).toEqual([])
  })

  it('updates the count metadata', () => {
    // count does not account for documents that are not in the store when metadata count
    // is present in the relationship
    const initialCount = hydrated.tasks.target.relationships.tasks.data.length
    hydrated.tasks.target.relationships.tasks.meta = {
      count: initialCount
    }
    hydrated.tasks.addById(4)
    expect(hydrated.tasks.count).toBe(initialCount + 1)
    hydrated.tasks.removeById(1)
    expect(hydrated.tasks.count).toBe(initialCount)
  })

  it('checks containment', () => {
    expect(hydrated.tasks.containsById(2)).toBe(true)
  })

  it('checks non existence', () => {
    expect(hydrated.tasks.existsById(3)).toBe(false)
  })

  it('checks existence', () => {
    expect(hydrated.tasks.existsById(2)).toBe(true)
  })

  it('checks existence from document', () => {
    expect(hydrated.tasks.exists({ _id: 2 })).toBe(true)
  })

  it('adds a relation even if the relationships doesnt exist yet', () => {
    hydratedWithNoRelation.tasks.addById(1)
    expect(
      hydratedWithNoRelation.tasks.target.relationships['tasks'].data.length
    ).toEqual(1)
  })

  it('transform the relationship into  query', () => {
    const queryDef = HasMany.query(original, null, {
      name: 'tasks',
      doctype: 'io.cozy.tasks'
    })
    expect(queryDef.doctype).toEqual('io.cozy.tasks')
    expect(queryDef.ids).toEqual(
      original.relationships.tasks.data.map(task => task._id)
    )
  })
})

describe('HasMany static helpers', () => {
  it('should work with a doc that already have setted relationships', () => {
    const doc = {
      _id: 'doc-1',
      label: 'Document 1',
      relationships: {
        author: { data: { _id: 'author-1', _type: 'io.cozy.authors' } },
        books: {
          data: [
            { _id: 'book-1', _type: 'io.cozy.books' },
            { _id: 'book-2', _type: 'io.cozy.books' },
            { _id: 'book-3', _type: 'io.cozy.books' }
          ]
        }
      }
    }

    const doc2 = HasMany.updateHasManyItem(doc, 'books', 'book-2', rel => {
      return { ...rel, metadata: { read: true } }
    })

    const doc3 = HasMany.updateHasManyItem(doc2, 'books', 'book-3', rel => {
      return { ...rel, metadata: { read: true } }
    })

    expect(doc2).toMatchSnapshot()
    expect(doc3).toMatchSnapshot()
  })

  it(`should work with a doc that don't have relationships yet`, () => {
    const docWithoutRelationships = {
      _id: 'doc-1',
      label: 'Document 1'
    }

    const docWithRelationships = HasMany.setHasManyItem(
      docWithoutRelationships,
      'books',
      'book-1',
      {
        _id: 'book-1',
        _type: 'io.cozy.books'
      }
    )
    expect(docWithRelationships).toMatchSnapshot()
  })
})
