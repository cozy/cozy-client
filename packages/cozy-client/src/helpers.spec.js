import { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock'

import {
  dehydrate,
  generateWebLink,
  rootCozyUrl,
  InvalidCozyUrlError,
  InvalidProtocolError
} from './helpers'

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
        data: [
          { _id: 1, _type: 'has.many' },
          { _id: 2, _type: 'has.many' }
        ]
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
        searchParams: [
          ['sharecode', sharecode],
          ['username', username]
        ],
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

describe('rootCozyUrl', () => {
  beforeAll(() => {
    enableFetchMocks()
  })

  beforeEach(() => {
    fetch.resetMocks()
  })

  afterAll(() => {
    disableFetchMocks()
  })

  it('should handle cozy-hosted https', async () => {
    fetch.mockOnceIf(
      'https://camillenimbus.mycozy.cloud/.well-known/change-password',
      {},
      { status: 200 }
    )

    await expect(
      rootCozyUrl(new URL('https://camillenimbus.mycozy.cloud'))
    ).resolves.toEqual(new URL('https://camillenimbus.mycozy.cloud'))
  })

  it('should handle cozy-hosted https trailing slash', async () => {
    fetch.mockOnceIf(
      'https://camillenimbus.mycozy.cloud/.well-known/change-password',
      {},
      { status: 200 }
    )

    await expect(
      rootCozyUrl(new URL('https://camillenimbus.mycozy.cloud/'))
    ).resolves.toEqual(new URL('https://camillenimbus.mycozy.cloud'))
  })

  it('should handle cozy-hosted https trailing path', async () => {
    fetch.mockOnceIf(
      'https://camillenimbus.mycozy.cloud/.well-known/change-password',
      {},
      { status: 200 }
    )

    await expect(
      rootCozyUrl(new URL('https://camillenimbus.mycozy.cloud/some-path'))
    ).resolves.toEqual(new URL('https://camillenimbus.mycozy.cloud'))
  })

  it('should handle cozy-hosted drive web app url', async () => {
    fetch.mockOnceIf(
      'https://camillenimbus-drive.mycozy.cloud/.well-known/change-password',
      {},
      { status: 401 }
    )
    fetch.mockOnceIf(
      'https://camillenimbus.mycozy.cloud/.well-known/change-password',
      {},
      { status: 200 }
    )

    await expect(
      rootCozyUrl(new URL('https://camillenimbus-drive.mycozy.cloud/#/folder'))
    ).resolves.toEqual(new URL('https://camillenimbus.mycozy.cloud'))
  })

  it('should handle cozy-hosted photos album url', async () => {
    fetch.mockOnceIf(
      'https://camillenimbus-photos.mycozy.cloud/.well-known/change-password',
      {},
      { status: 401 }
    )
    fetch.mockOnceIf(
      'https://camillenimbus.mycozy.cloud/.well-known/change-password',
      {},
      { status: 200 }
    )

    await expect(
      rootCozyUrl(
        new URL(
          'https://camillenimbus-photos.mycozy.cloud/#/albums/68b5cda502ae29f5fa73fd89f1be4f92'
        )
      )
    ).resolves.toEqual(new URL('https://camillenimbus.mycozy.cloud'))
  })

  it('should handle cozy-hosted app name', async () => {
    fetch.mockOnceIf(
      'https://camillenimbus-drive.mycozy.cloud/.well-known/change-password',
      {},
      { status: 401 }
    )
    fetch.mockOnceIf(
      'https://camillenimbus.mycozy.cloud/.well-known/change-password',
      {},
      { status: 200 }
    )

    await expect(
      rootCozyUrl(new URL('https://camillenimbus-drive.mycozy.cloud'))
    ).resolves.toEqual(new URL('https://camillenimbus.mycozy.cloud'))
  })

  it('should handle self-hosted https', async () => {
    fetch.mockOnceIf(
      'https://camillenimbus.com/.well-known/change-password',
      {},
      { status: 200 }
    )

    await expect(
      rootCozyUrl(new URL('https://camillenimbus.com'))
    ).resolves.toEqual(new URL('https://camillenimbus.com'))
  })

  it('should handle self-hosted with dash', async () => {
    fetch.mockOnceIf(
      'https://camille-nimbus.com/.well-known/change-password',
      {},
      {
        status: 200
      }
    )

    await expect(
      rootCozyUrl(new URL('https://camille-nimbus.com'))
    ).resolves.toEqual(new URL('https://camille-nimbus.com'))
  })

  it('should handle self-hosted http', async () => {
    fetch.mockOnceIf(
      'http://camille-nimbus.com/.well-known/change-password',
      {},
      {
        status: 200
      }
    )

    await expect(
      rootCozyUrl(new URL('http://camille-nimbus.com'))
    ).resolves.toEqual(new URL('http://camille-nimbus.com'))
  })

  it('should handle self-hosted https with port', async () => {
    fetch.mockOnceIf(
      'https://camillenimbus.com:666/.well-known/change-password',
      {},
      {
        status: 200
      }
    )

    await expect(
      rootCozyUrl(new URL('https://camillenimbus.com:666'))
    ).resolves.toEqual(new URL('https://camillenimbus.com:666'))
  })

  it('should handle self-hosted nested drive web app url', async () => {
    fetch.mockOnceIf(
      'https://drive.camillenimbus.com/.well-known/change-password',
      {},
      {
        status: 401
      }
    )
    fetch.mockOnceIf(
      'https://camillenimbus.com/.well-known/change-password',
      {},
      {
        status: 200
      }
    )

    await expect(
      rootCozyUrl(new URL('https://drive.camillenimbus.com/#/folder'))
    ).resolves.toEqual(new URL('https://camillenimbus.com'))
  })

  it('should handle self-hosted flat drive web app url', async () => {
    fetch.mockOnceIf(
      'https://camille-drive.nimbus.com/.well-known/change-password',
      {},
      {
        status: 401
      }
    )
    fetch.mockOnceIf(
      'https://camille.nimbus.com/.well-known/change-password',
      {},
      {
        status: 200
      }
    )

    await expect(
      rootCozyUrl(new URL('https://camille-drive.nimbus.com/#/folder'))
    ).resolves.toEqual(new URL('https://camille.nimbus.com'))
  })

  it('should handle cozy.localhost', async () => {
    await expect(
      rootCozyUrl(new URL('http://cozy.localhost:8080'))
    ).resolves.toEqual(new URL('http://cozy.localhost:8080'))
  })

  it('expects an http or https protocol', async () => {
    fetch.mockOnceIf(
      'ftp://camillenimbus.com/.well-known/change-password',
      {},
      {
        status: 200
      }
    )

    await expect(
      rootCozyUrl(new URL('ftp://camillenimbus.com'))
    ).rejects.toBeInstanceOf(InvalidProtocolError)
  })

  it('rejects if URL points to a valid cozy-stack but no valid Cozy instance', async () => {
    fetch.mockOnceIf(
      'https://missing.mycozy.cloud/.well-known/change-password',
      {},
      {
        status: 404
      }
    )

    await expect(
      rootCozyUrl(new URL('https://missing.mycozy.cloud'))
    ).rejects.toBeInstanceOf(InvalidCozyUrlError)
  })
})
