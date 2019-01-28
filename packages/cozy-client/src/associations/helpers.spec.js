import { attachRelationships } from './helpers'

describe('Attaching relationships', () => {
  const tasks = {
    data: [
      { _id: 1, _type: 'io.cozy.tasks' },
      { _id: 2, _type: 'io.cozy.tasks' }
    ]
  }
  const todos = {
    data: [
      { _id: 3, _type: 'io.cozy.todos' },
      { _id: 4, _type: 'io.cozy.todos' }
    ]
  }

  it('should attach to a single document', () => {
    const doc = {
      _id: 1
    }
    const relationships = {
      1: {
        tasks
      }
    }
    const withRelationships = attachRelationships({ data: doc }, relationships)
    expect(withRelationships.data.relationships).toEqual({
      tasks
    })
  })

  it('should attach to multiple document', () => {
    const docs = [
      {
        _id: 1
      },
      {
        _id: 2
      }
    ]
    const relationships = {
      1: {
        tasks
      },
      2: {
        todos
      }
    }
    const withRelationships = attachRelationships({ data: docs }, relationships)
    expect(withRelationships.data[0].relationships).toEqual({
      tasks
    })
    expect(withRelationships.data[1].relationships).toEqual({
      todos
    })
  })

  it('should add missing relationships', () => {
    const doc = {
      _id: 1,
      relationships: {
        tasks
      }
    }
    const relationships = {
      1: {
        tasks,
        todos
      }
    }
    const withRelationships = attachRelationships({ data: doc }, relationships)
    expect(withRelationships.data.relationships.tasks).toEqual(tasks)
    expect(withRelationships.data.relationships.todos).toEqual(todos)
  })

  it('should preserve existing relationships', () => {
    const doc = {
      _id: 1,
      relationships: {
        tasks
      }
    }
    const relationships = {
      1: {
        todos
      }
    }
    const withRelationships = attachRelationships({ data: doc }, relationships)
    expect(withRelationships.data.relationships.tasks).toEqual(tasks)
    expect(withRelationships.data.relationships.todos).toEqual(todos)
  })

  it('should work when there are no new relationships', () => {
    const doc = {
      _id: 1,
      relationships: {
        tasks
      }
    }
    const relationships = {
      2: {
        todos
      }
    }
    const withRelationships = attachRelationships({ data: doc }, relationships)
    expect(withRelationships.data.relationships.tasks).toEqual(tasks)
    expect(Object.keys(withRelationships.data.relationships).length).toEqual(1)
  })

  it('should attach relationships when the document has an empty relationship object', () => {
    const doc = {
      _id: 1,
      relationships: {}
    }
    const relationships = {
      1: {
        tasks
      }
    }
    const withRelationships = attachRelationships({ data: doc }, relationships)
    expect(withRelationships.data.relationships.tasks).toEqual(tasks)
  })
})
