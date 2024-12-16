import { ensureKonnectorFolder } from './konnectorFolder'

describe('ensureKonnectorFolder', () => {
  const mockClient = {
    collection: () => mockClient,
    query: jest.fn(),
    statByPath: jest.fn(),
    statById: jest.fn(),
    add: jest.fn(),
    addReferencesTo: jest.fn(),
    createDirectoryByPath: jest.fn()
  }
  const existingMagicFolder = [
    {
      path: '/Administratif',
      created_at: '2023-03-02T14:57:07.661588+01:00'
    }
  ]
  const konnector = {
    name: 'konnectorName',
    slug: 'konnectorSlug',
    folders: [
      {
        defaultDir: '$administrative/$konnector/$account'
      }
    ]
  }

  const account = { auth: { accountName: 'testAccountName' } }
  beforeEach(() => {
    mockClient.query.mockResolvedValueOnce({
      included: existingMagicFolder
    })
    mockClient.query.mockResolvedValueOnce({
      included: existingMagicFolder
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should create a folder when it does not exist and return it', async () => {
    mockClient.query.mockResolvedValue({
      included: []
    })
    mockClient.statByPath.mockRejectedValue({ status: 404 })
    mockClient.statById.mockResolvedValueOnce({
      data: { _id: 'parentfolderid' }
    })
    mockClient.createDirectoryByPath.mockResolvedValueOnce({
      data: {
        _id: 'createdfolderid',
        dir_id: 'parentfolderid'
      }
    })
    mockClient.createDirectoryByPath.mockResolvedValueOnce({
      data: {
        _id: 'createdfolderid',
        dir_id: 'parentfolderid'
      }
    })
    const result = await ensureKonnectorFolder(mockClient, {
      konnector,
      account,
      lang: 'fr'
    })
    expect(result).toStrictEqual({
      _id: 'createdfolderid',
      dir_id: 'parentfolderid'
    })
    expect(mockClient.statByPath).toHaveBeenCalledWith(
      '/Administratif/konnectorName/testAccountName'
    )
    expect(mockClient.createDirectoryByPath).toHaveBeenCalledWith(
      '/Administratif/konnectorName/testAccountName'
    )
    expect(mockClient.add).toHaveBeenCalledWith(konnector, {
      saveFolder: {
        type: 'io.cozy.files',
        values: ['createdfolderid'],
        verbs: ['GET', 'PATCH', 'POST']
      }
    })
    expect(mockClient.addReferencesTo).toHaveBeenCalledWith(konnector, [
      { _id: 'createdfolderid', dir_id: 'parentfolderid' }
    ])
  })
  it('should not create any folder if account folder with proper references exists', async () => {
    const existingAccountFolder = {
      _id: 'acountFolderId',
      type: 'directory',
      referenced_by: [
        {
          type: 'io.cozy.konnectors',
          id: 'io.cozy.konnectors/konnectorSlug'
        },
        {
          type: 'io.cozy.accounts.sourceAccountIdentifier',
          id: 'testAccountName'
        }
      ]
    }
    mockClient.query.mockResolvedValueOnce({
      included: [existingAccountFolder]
    })
    const result = await ensureKonnectorFolder(mockClient, {
      konnector,
      account,
      lang: 'fr'
    })
    expect(result).toStrictEqual(existingAccountFolder)
    expect(mockClient.createDirectoryByPath).not.toHaveBeenCalled()
  })
  it('should create account folder as a child of folder with konnector reference if any', async () => {
    const existingKonnectorFolder = {
      _id: 'konnectorFolderId',
      type: 'directory',
      referenced_by: [
        {
          type: 'io.cozy.konnectors',
          id: 'io.cozy.konnectors/konnectorSlug'
        }
      ]
    }
    mockClient.query.mockResolvedValue({
      included: [existingKonnectorFolder]
    })
    mockClient.statByPath.mockRejectedValueOnce({
      status: 404
    })
    const accountFolder = {
      _id: 'accountFolderId',
      dir_id: 'konnectorFolderId'
    }
    mockClient.createDirectoryByPath.mockResolvedValueOnce({
      data: accountFolder
    })

    const result = await ensureKonnectorFolder(mockClient, {
      konnector,
      account,
      lang: 'fr'
    })
    expect(result).toStrictEqual(accountFolder)
    expect(mockClient.createDirectoryByPath).toHaveBeenCalledTimes(1)
    expect(mockClient.addReferencesTo).toHaveBeenCalledTimes(2)
    expect(mockClient.addReferencesTo).toHaveBeenNthCalledWith(1, konnector, [
      accountFolder
    ])
    expect(mockClient.addReferencesTo).toHaveBeenNthCalledWith(
      2,
      {
        _id: 'testAccountName',
        _type: 'io.cozy.accounts.sourceAccountIdentifier'
      },
      [accountFolder]
    )
  })
  it('should add proper references to konnector folder child with proper name if any', async () => {
    const existingKonnectorFolder = {
      _id: 'konnectorFolderId',
      type: 'directory',
      referenced_by: [
        {
          type: 'io.cozy.konnectors',
          id: 'io.cozy.konnectors/konnectorSlug'
        }
      ]
    }
    mockClient.query.mockResolvedValue({
      included: [existingKonnectorFolder]
    })
    const accountFolder = {
      _id: 'accountFolderId',
      dir_id: 'konnectorFolderId'
    }
    mockClient.statByPath.mockResolvedValueOnce({
      data: accountFolder
    })

    const result = await ensureKonnectorFolder(mockClient, {
      konnector,
      account,
      lang: 'fr'
    })
    expect(result).toStrictEqual(accountFolder)
    expect(mockClient.createDirectoryByPath).not.toHaveBeenCalled()
    expect(mockClient.addReferencesTo).toHaveBeenCalledTimes(2)
    expect(mockClient.addReferencesTo).toHaveBeenNthCalledWith(1, konnector, [
      accountFolder
    ])
    expect(mockClient.addReferencesTo).toHaveBeenNthCalledWith(
      2,
      {
        _id: 'testAccountName',
        _type: 'io.cozy.accounts.sourceAccountIdentifier'
      },
      [accountFolder]
    )
  })
  it('should not create a folder if it already exist', async () => {
    const existingMagicFolder = [
      {
        path: '/Administratif',
        created_at: '2023-03-02T14:57:07.661588+01:00'
      }
    ]
    mockClient.query.mockResolvedValueOnce({
      included: existingMagicFolder
    })
    mockClient.query.mockResolvedValueOnce({
      included: []
    })
    mockClient.query.mockResolvedValueOnce({
      included: []
    })
    mockClient.statById.mockResolvedValueOnce({
      data: {
        _id: 'parentfolderid'
      }
    })
    mockClient.statByPath.mockResolvedValueOnce({
      data: {
        _id: 'alreadyexistingfolderid',
        dir_id: 'parentfolderid'
      }
    })
    mockClient.statByPath.mockResolvedValueOnce({
      data: {
        _id: 'alreadyexistingfolderid',
        dir_id: 'parentfolderid'
      }
    })
    const result = await ensureKonnectorFolder(mockClient, {
      konnector: {
        name: 'konnectorName',
        folders: [
          {
            defaultDir: '$administrative/$konnector/$account'
          }
        ]
      },
      account: { auth: { accountName: 'testAccountName' } },
      lang: 'fr'
    })
    expect(result).toStrictEqual({
      _id: 'alreadyexistingfolderid',
      dir_id: 'parentfolderid'
    })
    expect(mockClient.statByPath).toHaveBeenCalledWith(
      '/Administratif/konnectorName/testAccountName'
    )
    expect(mockClient.createDirectoryByPath).not.toHaveBeenCalled()
  })
  it('should recreate a folder when the destination folder is in the trash', async () => {
    mockClient.query.mockResolvedValue({
      included: []
    })
    mockClient.statByPath.mockResolvedValueOnce({
      data: {
        _id: 'folderintrash',
        trashed: true
      }
    })
    mockClient.statByPath.mockResolvedValueOnce({
      data: {
        _id: 'folderintrash',
        trashed: true
      }
    })
    mockClient.statById.mockResolvedValueOnce({
      data: {
        _id: 'parentfolderid'
      }
    })
    mockClient.createDirectoryByPath.mockResolvedValueOnce({
      data: {
        _id: 'createdfolderid',
        dir_id: 'parentfolderid'
      }
    })
    mockClient.createDirectoryByPath.mockResolvedValueOnce({
      data: {
        _id: 'createdfolderid',
        dir_id: 'parentfolderid'
      }
    })
    const result = await ensureKonnectorFolder(mockClient, {
      konnector,
      account,
      lang: 'fr'
    })
    expect(result).toStrictEqual({
      _id: 'createdfolderid',
      dir_id: 'parentfolderid'
    })
    expect(mockClient.statByPath).toHaveBeenCalledWith(
      '/Administratif/konnectorName/testAccountName'
    )
    expect(mockClient.createDirectoryByPath).toHaveBeenCalledWith(
      '/Administratif/konnectorName/testAccountName'
    )
    expect(mockClient.add).toHaveBeenCalledWith(konnector, {
      saveFolder: {
        type: 'io.cozy.files',
        values: ['createdfolderid'],
        verbs: ['GET', 'PATCH', 'POST']
      }
    })
    expect(mockClient.addReferencesTo).toHaveBeenCalledWith(konnector, [
      { _id: 'createdfolderid', dir_id: 'parentfolderid' }
    ])
  })
  it('should add proper references to konnector folder with proper name if any', async () => {
    const existingKonnectorFolder = {
      _id: 'konnectorFolderId',
      path: '/Administratif/' + konnector.name,
      type: 'directory',
      referenced_by: []
    }
    const createdAccountFolder = {
      _id: 'accountfolderid',
      path: '/Administratif/' + konnector.name + '/testAccountName',
      type: 'directory',
      referenced_by: []
    }
    mockClient.query.mockResolvedValue({
      included: []
    })
    mockClient.statByPath
      .mockResolvedValueOnce({
        data: existingKonnectorFolder
      })
      .mockResolvedValueOnce({ data: false })
    mockClient.createDirectoryByPath.mockResolvedValueOnce({
      data: createdAccountFolder
    })

    await ensureKonnectorFolder(mockClient, {
      konnector,
      account,
      lang: 'fr'
    })
    expect(mockClient.addReferencesTo).toHaveBeenNthCalledWith(1, konnector, [
      existingKonnectorFolder
    ])
    expect(mockClient.addReferencesTo).toHaveBeenNthCalledWith(2, konnector, [
      createdAccountFolder
    ])
    expect(mockClient.addReferencesTo).toHaveBeenNthCalledWith(
      3,
      {
        _id: 'testAccountName',
        _type: 'io.cozy.accounts.sourceAccountIdentifier'
      },
      [createdAccountFolder]
    )
    expect(mockClient.addReferencesTo).toHaveBeenCalledTimes(3)
  })

  it('should add proper references to konnector folder even if account folder has konnector reference', async () => {
    const existingKonnectorFolder = {
      _id: 'konnectorFolderId',
      path: '/Administratif/' + konnector.name,
      type: 'directory',
      referenced_by: []
    }
    const existingAccountFolder = {
      _id: 'accountfolderid',
      path: '/Administratif/' + konnector.name + '/testAccountName',
      type: 'directory',
      referenced_by: [
        {
          type: 'io.cozy.konnectors',
          id: 'io.cozy.konnectors/konnectorSlug'
        }
      ]
    }
    mockClient.query.mockResolvedValue({
      included: []
    })
    mockClient.statByPath
      .mockResolvedValueOnce({
        data: existingKonnectorFolder
      })
      .mockResolvedValueOnce({ data: existingAccountFolder })
    await ensureKonnectorFolder(mockClient, {
      konnector,
      account,
      lang: 'fr'
    })
    expect(mockClient.addReferencesTo).toHaveBeenCalledTimes(2)
    expect(mockClient.addReferencesTo).toHaveBeenNthCalledWith(1, konnector, [
      existingKonnectorFolder
    ])
    expect(mockClient.addReferencesTo).toHaveBeenNthCalledWith(
      2,
      {
        _id: 'testAccountName',
        _type: 'io.cozy.accounts.sourceAccountIdentifier'
      },
      [existingAccountFolder]
    )
    expect(mockClient.createDirectoryByPath).not.toHaveBeenCalled()
  })
})
