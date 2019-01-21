import get from 'lodash/get'
import { attachRelationship } from './helpers'

describe('attaching relationships', () => {
  const doc = {
    _id: 1
  }

  const relationships = {
    tasks: {
      data: [{ _id: 2 }]
    }
  }

  it('should attach new relationships', () => {
    const docWithRelationships = attachRelationship(doc, relationships)
    expect(docWithRelationships.relationships).toEqual(relationships)
  })

  it('should not override existing relationships', () => {
    const existingRelationships = {
      tasks: {
        data: [{ _id: 3 }]
      }
    }
    const docWithRelationships = attachRelationship(
      {
        ...doc,
        relationships: existingRelationships
      },
      relationships
    )
    expect(docWithRelationships.relationships).toEqual(existingRelationships)
  })

  it('should attach relationships on an existing, empty relationships object', () => {
    const docWithRelationships = attachRelationship(
      {
        ...doc,
        relationships: {}
      },
      relationships
    )
    expect(docWithRelationships.relationships).toEqual(relationships)
  })
})
