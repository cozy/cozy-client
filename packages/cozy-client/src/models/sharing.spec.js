import { getSharingLink } from './sharing'

describe('getSharingLink', () => {
  const mockSharecode = { attributes: { shortcodes: { code: 'shortcode' } } }
  const mockClient = ({ isFlatDomain = false } = {}) => ({
    save: jest.fn(() => ({ data: mockSharecode })),
    getStackClient: jest.fn(() => ({ uri: 'http://cozy.cloud' })),
    capabilities: { flat_subdomains: isFlatDomain }
  })
  const mockFiles = ['fileId01', 'fileId02']

  it('should generate the right share link if "isFlatDomain" param is not defined', async () => {
    const sharingLink = await getSharingLink(mockClient(), mockFiles)

    expect(sharingLink).toBe(
      'http://drive.cozy.cloud/public?sharecode=shortcode#/'
    )
  })

  it('should generate the right share link to a nested cozy', async () => {
    const sharingLink = await getSharingLink(
      mockClient({ isFlatDomain: false }),
      mockFiles
    )

    expect(sharingLink).toBe(
      'http://drive.cozy.cloud/public?sharecode=shortcode#/'
    )
  })

  it('should generate the right share link to a flat cozy', async () => {
    const sharingLink = await getSharingLink(
      mockClient({ isFlatDomain: true }),
      mockFiles
    )

    expect(sharingLink).toBe(
      'http://cozy-drive.cloud/public?sharecode=shortcode#/'
    )
  })

  it('should generate the right share link with an correct sharecode', async () => {
    const sharingLink = await getSharingLink(mockClient(), mockFiles)

    expect(sharingLink).toContain('sharecode=shortcode')
  })
  it('should save called with the "ttl" param', async () => {
    const mockSave = jest.fn().mockReturnValue({ data: mockSharecode })
    const client = { ...mockClient(), save: mockSave }
    await getSharingLink(client, mockFiles, {
      ttl: '1d'
    })

    expect(mockSave).toBeCalledWith({
      _type: 'io.cozy.permissions',
      permissions: {
        files: {
          type: 'io.cozy.files',
          values: ['fileId01', 'fileId02'],
          verbs: ['GET']
        }
      },
      ttl: '1d'
    })
  })

  it('should save called with the "password" param', async () => {
    const mockSave = jest.fn().mockReturnValue({ data: mockSharecode })
    const client = { ...mockClient(), save: mockSave }
    await getSharingLink(client, mockFiles, {
      password: 'password'
    })

    expect(mockSave).toBeCalledWith({
      _type: 'io.cozy.permissions',
      permissions: {
        files: {
          type: 'io.cozy.files',
          values: ['fileId01', 'fileId02'],
          verbs: ['GET']
        }
      },
      password: 'password'
    })
  })

  it('should save called with the "verbs" param', async () => {
    const mockSave = jest.fn().mockReturnValue({ data: mockSharecode })
    const client = { ...mockClient(), save: mockSave }
    await getSharingLink(client, mockFiles, {
      verbs: ['GET', 'POST']
    })

    expect(mockSave).toBeCalledWith({
      _type: 'io.cozy.permissions',
      permissions: {
        files: {
          type: 'io.cozy.files',
          values: ['fileId01', 'fileId02'],
          verbs: ['GET', 'POST']
        }
      }
    })
  })

  it('should save called without the "ttl" or "password" params', async () => {
    const mockSave = jest.fn().mockReturnValue({ data: mockSharecode })
    const client = { ...mockClient(), save: mockSave }
    await getSharingLink(client, mockFiles)

    expect(mockSave).toBeCalledWith({
      _type: 'io.cozy.permissions',
      permissions: {
        files: {
          type: 'io.cozy.files',
          values: ['fileId01', 'fileId02'],
          verbs: ['GET']
        }
      }
    })
  })
})
