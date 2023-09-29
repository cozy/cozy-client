import { ensureKonnectorFolder } from './konnectorFolder'

describe('ensureKonnectorFolder', () => {
  const mockClient = {
    collection: () => mockClient,
    findReferencedBy: jest.fn(),
    statByPath: jest.fn(),
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
    folders: [
      {
        defaultDir: '$administrative/$konnector/$account'
      }
    ]
  }

  const account = { auth: { accountName: 'testAccountName' } }
  beforeEach(() => {
    mockClient.findReferencedBy.mockResolvedValue({
      included: existingMagicFolder
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should create a folder when it does not exist and return it', async () => {
    mockClient.statByPath.mockRejectedValueOnce({ status: 404 })
    mockClient.createDirectoryByPath.mockResolvedValueOnce({
      data: {
        _id: 'createdfolderid'
      }
    })
    const result = await ensureKonnectorFolder(mockClient, {
      konnector,
      account,
      lang: 'fr'
    })
    expect(result).toStrictEqual({ _id: 'createdfolderid' })
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
      { _id: 'createdfolderid' }
    ])
  })
  it('should not create a folder if it already exist', async () => {
    const existingMagicFolder = [
      {
        path: '/Administratif',
        created_at: '2023-03-02T14:57:07.661588+01:00'
      }
    ]
    mockClient.findReferencedBy.mockResolvedValue({
      included: existingMagicFolder
    })
    mockClient.statByPath.mockResolvedValueOnce({
      data: {
        _id: 'alreadyexistingfolderid'
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
    expect(result).toStrictEqual({ _id: 'alreadyexistingfolderid' })
    expect(mockClient.statByPath).toHaveBeenCalledWith(
      '/Administratif/konnectorName/testAccountName'
    )
    expect(mockClient.createDirectoryByPath).not.toHaveBeenCalled()
  })
  it('should recreate a folder when the destination folder is in the trash', async () => {
    mockClient.statByPath.mockResolvedValueOnce({
      data: {
        _id: 'folderintrash',
        trashed: true
      }
    })
    mockClient.createDirectoryByPath.mockResolvedValueOnce({
      data: {
        _id: 'createdfolderid'
      }
    })
    const result = await ensureKonnectorFolder(mockClient, {
      konnector,
      account,
      lang: 'fr'
    })
    expect(result).toStrictEqual({ _id: 'createdfolderid' })
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
      { _id: 'createdfolderid' }
    ])
  })
})
