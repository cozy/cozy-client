import HasMany from './HasMany'

describe('HasMany', () => {
  let original, hydrated, originalWithNorelation, hydratedWithNoRelation
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

    hydrated = {
      ...original,
      tasks: new HasMany(original, 'tasks', 'io.cozy.tasks', { get })
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
})
