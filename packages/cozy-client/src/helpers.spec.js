import { dehydrate } from './helpers'

import {
  HasManyInPlace,
  HasMany,
  HasManyFiles,
  create as createAssociation
} from './associations'

describe('dehydrate', () => {
  let document

  const intialDocument = {
    regularKey: 'foo',
    manyInPlace: [1, 2],
    relationships: {
      hasMany: {
        data: [{ _id: 1, _type: 'has.many' }, { _id: 2, _type: 'has.many' }]
      },
      hasManyFiles: {
        data: [
          { _id: 1, _type: 'has.many.files' },
          { _id: 2, _type: 'has.many.files' }
        ]
      }
    }
  }

  const relationships = [
    {
      name: 'manyInPlace',
      type: HasManyInPlace,
      doctype: 'many.in.place'
    },
    {
      name: 'hasMany',
      type: HasMany,
      doctype: 'has.many'
    },
    {
      name: 'hasManyFiles',
      type: HasManyFiles,
      doctype: 'has.many.files'
    }
  ]

  beforeEach(() => {
    document = relationships.reduce(
      (acc, relationship) => ({
        ...acc,
        [relationship.name]: createAssociation(intialDocument, relationship, {})
      }),
      intialDocument
    )
  })

  it('should not touch regular values', () => {
    expect(dehydrate(document).regularKey).toEqual(intialDocument.regularKey)
  })

  it('should dehydrate HasManyInPlace relationships', () => {
    expect(dehydrate(document).manyInPlace).toEqual(intialDocument.manyInPlace)
  })

  it('should dehydrate HasMany relationships', () => {
    const dehydrated = dehydrate(document)
    expect(dehydrated.relationships.hasMany).toEqual(
      intialDocument.relationships.hasMany
    )
    expect(dehydrated.hasMany).toBeUndefined()
  })

  it('should dehydrate HasManyFiles relationships', () => {
    const dehydrated = dehydrate(document)
    expect(dehydrated.relationships.hasManyFiles).toBeUndefined()
    expect(dehydrated.hasManyFiles).toBeUndefined()
  })
})
