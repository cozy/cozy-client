import { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock'

import {
  deconstructCozyWebLinkWithSlug,
  deconstructRedirectLink,
  generateWebLink,
  rootCozyUrl,
  InvalidCozyUrlError,
  InvalidProtocolError
} from './urlHelper'

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

describe('deconstructWebLink', () => {
  it.each([
    [
      'https://claude-notes.mycozy.cloud',
      'flat',
      {
        protocol: 'https:',
        cozyName: 'claude',
        cozyBaseDomain: 'mycozy.cloud',
        pathname: '/',
        hash: '',
        searchParams: '',
        slug: 'notes'
      }
    ],
    [
      'http://alice-drive.cozy.tools:8080',
      'flat',
      {
        protocol: 'http:',
        cozyName: 'alice',
        cozyBaseDomain: 'cozy.tools:8080',
        pathname: '/',
        hash: '',
        searchParams: '',
        slug: 'drive'
      }
    ],
    [
      'https://photo.claude.custome-domain.fr',
      'nested',
      {
        protocol: 'https:',
        cozyName: 'claude',
        cozyBaseDomain: 'custome-domain.fr',
        pathname: '/',
        hash: '',
        searchParams: '',
        slug: 'photo'
      }
    ],
    [
      'http://drive.cozy.tools:8080/#/folder/SOME_FOLDER_ID',
      'nested',
      {
        protocol: 'http:',
        cozyName: 'cozy',
        cozyBaseDomain: 'tools:8080',
        pathname: '/',
        hash: '#/folder/SOME_FOLDER_ID',
        searchParams: '',
        slug: 'drive'
      }
    ],
    [
      'http://notes.cozy.tools:8080/public/?id=SOME_FOLDER_ID&sharecode=SOME_SHARECODE',
      'nested',
      {
        protocol: 'http:',
        cozyName: 'cozy',
        cozyBaseDomain: 'tools:8080',
        pathname: '/public/',
        hash: '',
        searchParams: 'id=SOME_FOLDER_ID&sharecode=SOME_SHARECODE',
        slug: 'notes'
      }
    ]
  ])(
    'should deconstruct %p link with %p subdomain type',
    (link, subdomainType, result) => {
      expect(deconstructCozyWebLinkWithSlug(link, subdomainType)).toEqual(
        result
      )
    }
  )
})

describe('deconstructRedirectLink', () => {
  it.each([
    [
      'contacts/#/',
      {
        slug: 'contacts',
        pathname: '',
        hash: '/'
      }
    ],
    [
      'contacts/#/hash',
      {
        slug: 'contacts',
        pathname: '',
        hash: '/hash'
      }
    ],
    [
      'contacts/#/long/hash',
      {
        slug: 'contacts',
        pathname: '',
        hash: '/long/hash'
      }
    ],
    [
      'contacts/pathname/#/long/hash',
      {
        slug: 'contacts',
        pathname: 'pathname/',
        hash: '/long/hash'
      }
    ],
    [
      'contacts/long/pathname/#/long/hash',
      {
        slug: 'contacts',
        pathname: 'long/pathname/',
        hash: '/long/hash'
      }
    ]
  ])('should deconstruct %p redirect link', (link, result) => {
    expect(deconstructRedirectLink(link)).toEqual(result)
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
