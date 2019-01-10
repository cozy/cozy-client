import { dehydrate } from './helpers'

import { HasManyInPlace, create as createAssociation } from './associations'

describe('dehydrate', () => {
  let document

  const intialDocument = {
    regularKey: 'foo',
    manyInPlace: [1, 2]
  }

  beforeEach(() => {
    document = {
      ...intialDocument,
      manyInPlace: createAssociation(
        intialDocument,
        {
          name: 'manyInPlace',
          type: HasManyInPlace,
          doctype: 'many.in.place'
        },
        {}
      )
    }
  })

  it('should not touch regular values', () => {
    expect(dehydrate(document).regularKey).toEqual(intialDocument.regularKey)
  })

  it('should dehydrate HasManyInPlace relationships', () => {
    expect(dehydrate(document).manyInPlace).toEqual(intialDocument.manyInPlace)
  })
})
