import { getSharingLink } from './sharing'

describe('getSharingLink', () => {
  const mockSharecode = { attributes: { shortcodes: { code: 'shortcode' } } }
  const mockClient = ({ isFlatDomain = false } = {}) => ({
    save: jest.fn(() => ({ data: mockSharecode })),
    getStackClient: jest.fn(() => ({ uri: 'http://cozy.cloud' })),
    capabilities: { flat_subdomains: isFlatDomain }
  })
  const mockFiles = [
    { id: 'fileId01', name: 'File 01' },
    { id: 'fileId02', name: 'File 02' }
  ]

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
})
