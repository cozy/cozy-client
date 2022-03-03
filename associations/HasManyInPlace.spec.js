import HasManyInPlace from './HasManyInPlace'

describe('HasManyInPlace', () => {
  let original, hydrated
  beforeEach(() => {
    original = {
      _type: 'io.cozy.todos',
      label: 'Save the world',
      tasks: [1, 2, 3]
    }
    const get = (doctype, id) => ({
      doctype,
      id
    })

    hydrated = {
      ...original,
      tasks: new HasManyInPlace(original, 'tasks', 'io.cozy.tasks', { get })
    }
  })

  it('adds', () => {
    hydrated.tasks.addById(4)
    expect(hydrated.tasks.data).toEqual([
      { doctype: 'io.cozy.tasks', id: 1 },
      { doctype: 'io.cozy.tasks', id: 2 },
      { doctype: 'io.cozy.tasks', id: 3 },
      { doctype: 'io.cozy.tasks', id: 4 }
    ])
  })

  it('removes', () => {
    hydrated.tasks.removeById(2)
    expect(hydrated.tasks.data).toEqual([
      { doctype: 'io.cozy.tasks', id: 1 },
      { doctype: 'io.cozy.tasks', id: 3 }
    ])
  })

  it('checks existence', () => {
    expect(hydrated.tasks.existsById(3)).toBe(true)
  })
})
