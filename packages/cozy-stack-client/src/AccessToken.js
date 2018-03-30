export default class AccessToken {
  constructor ({ token_type, access_token, refresh_token, scope }) {
    this.tokenType = token_type
    this.accessToken = access_token
    this.refreshToken = refresh_token
    this.scope = scope
  }

  toAuthHeader () {
    return 'Bearer ' + this.accessToken
  }

  toBasicAuth () {
    return `user:${this.accessToken}@`
  }
}