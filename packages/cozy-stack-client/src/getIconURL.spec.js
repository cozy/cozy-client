import { getIconURL } from './getIconURL'

const FakeBlob = (data, options) => {
  return { data, ...options }
}

describe('get icon', () => {
  let stackClient = {},
    responses
  beforeEach(() => {
    responses = {}
    const fakeResp = (method, url) => {
      const resp = responses[url]
      return resp
        ? Promise.resolve(resp)
        : Promise.reject(`404: ${url} (not found in fake server)`)
    }
    stackClient.fetch = jest.fn().mockImplementation(fakeResp)
    stackClient.fetchJSON = jest.fn().mockImplementation(fakeResp)
    global.URL.createObjectURL = jest.fn(blob => {
      return blob
    })
  })

  afterEach(() => {
    global.URL.createObjectURL = undefined
  })

  const svgData = '<svg></svg>'
  const defaultOpts = {
    type: 'konnector',
    slug: 'caissedepargne1'
  }

  it('should build a url when app is installed', async () => {
    responses['/konnectors/caissedepargne1/icon'] = {
      ok: true,
      blob: () => FakeBlob([svgData], { type: 'image/svg+xml' })
    }
    const url = await getIconURL(stackClient, defaultOpts)
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'image/svg+xml'
      })
    )
    expect(url.data[0]).toBe('<svg></svg>')
  })

  it('should build a url when app is not installed', async () => {
    responses['/registry/caissedepargne1/icon'] = {
      ok: true,
      blob: () => FakeBlob([svgData], { type: 'image/svg+xml' })
    }
    const url = await getIconURL(stackClient, defaultOpts)
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'image/svg+xml'
      })
    )
    expect(url.data[0]).toBe('<svg></svg>')
  })

  it('should build a url when app is installed but no mime type is sent in response', async () => {
    responses['/konnectors/caissedepargne1/icon'] = {
      ok: true,
      blob: () => new FakeBlob([svgData], {})
    }
    responses['/registry/caissedepargne1'] = { data: { icon: 'icon.svg' } }
    await getIconURL(stackClient, defaultOpts)
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'image/svg+xml'
      })
    )
  })

  it('should build a url when app is not installed and no mime type is sent in response', async () => {
    responses['/konnectors/caissedepargne1/icon'] = {
      ok: true,
      blob: () => new FakeBlob([svgData], {})
    }
    responses['/registry/caissedepargne1'] = {
      data: { icon: 'icon.svg' }
    }
    await getIconURL(stackClient, defaultOpts)
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'image/svg+xml'
      })
    )
  })

  it('should return nothing for unknown file type', async () => {
    responses['/konnectors/caissedepargne1/icon'] = {
      ok: true,
      blob: () => new FakeBlob([svgData], {})
    }
    responses['/registry/caissedepargne1'] = {
      data: { name: 'caissedepargne1', icon: 'icon.mp4' }
    }
    const url = await getIconURL(stackClient, defaultOpts)
    expect(url).toEqual('')
  })

  it('should respect priority', async () => {
    responses['/konnectors/caissedepargne1/icon'] = {
      ok: true,
      blob: () => new FakeBlob([svgData], { type: 'image/svg+xml' })
    }
    responses['/registry/caissedepargne1/icon'] = {
      ok: true,
      blob: () =>
        new FakeBlob(['<svg id="2"></svg>'], { type: 'image/svg+xml' })
    }
    const url = await getIconURL(stackClient, {
      ...defaultOpts,
      priority: 'registry'
    })
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(
      expect.objectContaining({
        data: ['<svg id="2"></svg>']
      })
    )
  })
})
