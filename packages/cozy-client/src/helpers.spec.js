import { dehydrate, generateWebLink } from './helpers'

import {
  HasManyInPlace,
  HasMany,
  HasManyFiles,
  HasOneInPlace,
  create as createAssociation,
  Association
} from './associations'

describe('dehydrate', () => {
  let document

  const intialDocument = {
    regularKey: 'foo',
    manyInPlace: [1, 2],
    oneInPlace: '1',
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

  class BadAssociation extends Association {}

  const relationships = [
    {
      name: 'manyInPlace',
      type: HasManyInPlace,
      doctype: 'many.in.place'
    },
    {
      name: 'oneInPlace',
      type: HasOneInPlace,
      doctype: 'one.in.place'
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

  it('should dehydrate HasOneInPlace relationships', () => {
    const dehydrated = dehydrate(document)
    expect(dehydrated.oneInPlace).toEqual(intialDocument.oneInPlace)
    expect(dehydrated.oneInPlace).not.toBeUndefined()
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

  it('should throw if a relationship is not dehydratable', () => {
    document.badAssociation = createAssociation(
      document,
      {
        name: 'BadAssociation',
        type: BadAssociation,
        doctype: 'bad.association'
      },
      {}
    )
    expect(() => {
      dehydrate(document)
    }).toThrowError(
      `Association on key badAssociation should have a dehydrate method`
    )
  })
})

describe('generateWebLink', () => {
  it('should generate the right link to a flat cozy', () => {
    const sharecode = 'sharingIsCaring'
    const username = 'alice'

    expect(
      generateWebLink({
        cozyUrl: 'http://alice.cozy.tools',
        searchParams: [['sharecode', sharecode], ['username', username]],
        pathname: 'public',
        hash: '/n/4',
        slug: 'notes',
        subDomainType: 'flat'
      })
    ).toEqual(
      `http://alice-notes.cozy.tools/public?sharecode=${sharecode}&username=${username}#/n/4`
    )
  })

  it('should generate the right link to a nested cozy', () => {
    expect(
      generateWebLink({
        cozyUrl: 'https://alice.cozy.tools',
        pathname: '/public/',
        hash: 'files/432432',
        slug: 'drive',
        subDomainType: 'nested'
      })
    ).toEqual(`https://drive.alice.cozy.tools/public/#/files/432432`)
  })
})
