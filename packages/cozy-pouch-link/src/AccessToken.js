export default class AccessToken {
  constructor(opts) {
    this.tokenType = opts.tokenType || opts.token_type
    this.accessToken = opts.accessToken || opts.access_token
    this.refreshToken = opts.refreshToken || opts.refresh_token
    this.scope = opts.scope
  }

  toAuthHeader() {
    return 'Bearer ' + this.accessToken
  }

  toBasicAuth() {
    return `user:${this.accessToken}@`
  }

  static fromJSON(data) {
    return new AccessToken({
      tokenType: data.tokenType,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      scope: data.scope
    })
  }

  toJSON() {
    return {
      tokenType: this.tokenType,
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      scope: this.scope
    }
  }
}
