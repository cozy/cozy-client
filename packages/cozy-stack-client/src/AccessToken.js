export default class AccessToken {
  constructor(data) {
    if (typeof data === 'string') data = JSON.parse(data)

    this.tokenType = data.token_type || data.tokenType
    this.accessToken = data.access_token || data.accessToken
    this.refreshToken = data.refresh_token || data.refreshToken
    this.scope = data.scope
  }

  toAuthHeader() {
    return 'Bearer ' + this.accessToken
  }

  toBasicAuth() {
    return `user:${this.accessToken}@`
  }

  toJSON() {
    return {
      tokenType: this.tokenType,
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      scope: this.scope
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }

  /**
   * Get the access token string
   *
   * @see CozyStackClient.getAccessToken
   * @returns {string} token
   */
  getAccessToken() {
    return this.accessToken
  }
}
