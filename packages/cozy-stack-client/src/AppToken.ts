export default class AppToken {
  constructor(token) {
    this.token = token || ''
  }

  toAuthHeader() {
    return 'Bearer ' + this.token
  }

  toBasicAuth() {
    return `user:${this.token}@`
  }

  /**
   * Get the app token string
   *
   * @see CozyStackClient.getAccessToken
   * @returns {string} token
   */
  getAccessToken() {
    return this.token
  }
}
