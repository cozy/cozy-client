import { fetchWithXMLHttpRequest } from './xhrFetch'

const setup = ({ supportsOnUploadProgress, error } = {}) => {
  const send = jest.fn()
  const open = jest.fn()
  const setRequestHeader = jest.fn()
  const addEventListener = jest.fn()

  global.XMLHttpRequest = function() {
    const fakeResolve = () => {
      this.readyState = 4
      this.responseText = '{"result": true}'
      this.status = 200
      this.onload()
    }

    const fakeError = () => {
      this.readyState = 4
      this.onerror(error)
    }

    if (supportsOnUploadProgress) {
      this.upload = {
        addEventListener
      }
    }

    const methods = {
      send,
      setRequestHeader,
      getAllResponseHeaders: () =>
        'content-type: application/json;\r\ncontent-length: 16',
      open: open.mockImplementation(() => {
        if (error) {
          setTimeout(fakeError, 5)
        } else {
          setTimeout(fakeResolve, 5)
        }
      })
    }
    Object.assign(this, methods)
    return this
  }
  return {
    send,
    open,
    setRequestHeader,
    addEventListener
  }
}

describe('xhr fetch', () => {
  it('should returns the same shape as fetch', async () => {
    const { open, send } = setup()
    const result = await fetchWithXMLHttpRequest('simple-path', {
      method: 'GET',
      body: '{"body":"my-body"}',
      headers: {
        Accept: 'application/json'
      },
      onUploadProgress: jest.fn()
    })
    expect(open).toHaveBeenCalledWith('GET', 'simple-path', true)
    expect(send).toHaveBeenCalledWith('{"body":"my-body"}')
    const data = await result.json()
    expect(data).toEqual({ result: true })
  })

  it('should add event listener', async () => {
    const { open, send, addEventListener } = setup({
      supportsOnUploadProgress: true
    })
    const onUploadProgress = jest.fn()
    const result = await fetchWithXMLHttpRequest('simple-path', {
      method: 'GET',
      body: '{"body":"my-body"}',
      headers: {
        Accept: 'application/json'
      },
      onUploadProgress
    })
    expect(open).toHaveBeenCalledWith('GET', 'simple-path', true)
    expect(send).toHaveBeenCalledWith('{"body":"my-body"}')
    const data = await result.json()
    expect(data).toEqual({ result: true })
    expect(addEventListener).toHaveBeenCalledWith(
      'progress',
      onUploadProgress,
      false
    )
  })

  it('should handle errors', async () => {
    const err = new Error('Quota error')
    setup({
      supportsOnUploadProgress: true,
      error: err
    })
    await expect(
      fetchWithXMLHttpRequest('simple-path', {
        method: 'GET',
        body: '{"body":"my-body"}',
        headers: {
          Accept: 'application/json'
        },
        onUploadProgress: () => {}
      })
    ).rejects.toEqual(err)
  })
})
