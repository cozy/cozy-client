import HasMany from './HasMany'

describe('HasMany', () => {
  let original, hydrated, originalWithNorelation, hydratedWithNoRelation, save
  beforeEach(() => {
    original = {
      _type: 'io.cozy.todos',
      label: 'Get rich',
      relationships: {
        tasks: {
          data: [
            { _id: 1, _type: 'io.cozy.tasks' },
            { _id: 2, _type: 'io.cozy.tasks' }
          ]
        }
      }
    }

    originalWithNorelation = {
      _type: 'io.cozy.todos',
      label: 'Get rich'
    }

    const get = (doctype, id) => ({
      doctype,
      id
    })

    save = jest.fn()

    hydrated = {
      ...original,
      tasks: new HasMany(original, 'tasks', 'io.cozy.tasks', { get, save })
    }

    hydratedWithNoRelation = {
      ...originalWithNorelation,
      tasks: new HasMany(originalWithNorelation, 'tasks', 'io.cozy.tasks', {
        get
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

  it('optionally saves after adding', () => {
    hydrated.tasks.addById(4)
    expect(save).not.toHaveBeenCalled()
    hydrated.tasks.addById(5, { save: true })
    expect(save).toHaveBeenCalled()
  })

  it('removes', () => {
    hydrated.tasks.removeById(2)
    expect(hydrated.tasks.data).toEqual([{ doctype: 'io.cozy.tasks', id: 1 }])
  })

  it('doesnt remove if not there', () => {
    hydrated.tasks.removeById(3)
    expect(hydrated.tasks.data).toEqual([
      { doctype: 'io.cozy.tasks', id: 1 },
      { doctype: 'io.cozy.tasks', id: 2 }
    ])
  })

  it('optionally saves after removing', () => {
    hydrated.tasks.removeById(2)
    expect(save).not.toHaveBeenCalled()
    hydrated.tasks.removeById(1, { save: true })
    expect(save).toHaveBeenCalled()
  })

  it('removes multipe', () => {
    hydrated.tasks.removeById([1, 2])
    expect(hydrated.tasks.data).toEqual([])
  })

  it('updates the count metadata', () => {
    const initialCount = hydrated.tasks.data.length
    hydrated.tasks.target.relationships.tasks.meta = {
      count: initialCount
    }
    hydrated.tasks.addById(4)
    expect(hydrated.tasks.count).toBe(initialCount + 1)
    hydrated.tasks.removeById(1)
    expect(hydrated.tasks.count).toBe(initialCount)
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
