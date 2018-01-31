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
}