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
}
