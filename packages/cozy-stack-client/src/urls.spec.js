import {
  isSecureProtocol,
  getNodeCozyURL,
  getBrowserCozyURL,
  getCozyURL
} from './urls'

const cozyDomain = 'cozy.tools:8080'
const fullCozyUrlNoSSL = 'http://cozy.tools:8080'
const fullCozyUrlWithSSL = 'https://cozy.tools:8080'
const prodUrl = 'https://prod.mycozy.cloud'

describe('urls', () => {
  it('should return browser cozy url', () => {
    expect(() => getBrowserCozyURL()).toThrow(
      `cozyDomain isn't defined in index.ejs`
    )
    document.querySelector = jest
      .fn()
      .mockImplementation(() => ({ dataset: { cozyDomain } }))
    window.location.protocol = 'http:'
    expect(getBrowserCozyURL().origin).toBe(fullCozyUrlNoSSL)
    document.querySelector.mockReset()
  })

  it('should return node cozy url', () => {
    process.env.COZY_URL = undefined
    expect(() => getNodeCozyURL()).toThrow(`COZY_URL variable isn't defined`)
    process.env.COZY_URL = fullCozyUrlNoSSL
    expect(getNodeCozyURL().origin).toBe(fullCozyUrlNoSSL)
  })

  it('should return cozy url', () => {
    expect(getCozyURL().origin).toBe(fullCozyUrlNoSSL)
  })

  it('should return if secure protocol is used', () => {
    expect(isSecureProtocol()).toBe(false)
    expect(isSecureProtocol(new URL(fullCozyUrlNoSSL))).toBe(false)
    expect(isSecureProtocol(new URL(fullCozyUrlWithSSL))).toBe(true)
    expect(isSecureProtocol(new URL(prodUrl))).toBe(true)
  })
})
