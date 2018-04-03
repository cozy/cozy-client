import CozyStackClient from './CozyStackClient'
import AccessToken from './AccessToken'

const defaultOAuthOptions = {
  clientID: '',
  clientName: '',
  clientKind: '',
  clientSecret: '',
  clientURI: '',
  registrationAccessToken: '',
  redirectURI: '',
  softwareID: '',
  softwareVersion: '',
  logoURI: '',
  policyURI: '',
  notificationPlatform: '',
  notificationDeviceToken: '',
}

export default class OAuthClient extends CozyStackClient{
  constructor({ oauth, ...options }) {
    super(options)
    this.oAuthOptions = {...defaultOAuthOptions, ...oauth}  
  }
  
  isRegistered () {
    return this.oAuthOptions.clientID !== ''
  }
  
  getRegisterOptions () {
    return {
      redirect_uris: [this.oAuthOptions.redirectURI],
      software_id: this.oAuthOptions.softwareID,
      software_version: this.oAuthOptions.softwareVersion,
      client_name: this.oAuthOptions.clientName,
      client_kind: this.oAuthOptions.clientKind,
      client_uri: this.oAuthOptions.clientURI,
      logo_uri: this.oAuthOptions.logoURI,
      policy_uri: this.oAuthOptions.policyURI,
      notification_platform: this.oAuthOptions.notificationPlatform,
      notification_device_token: this.oAuthOptions.notificationDeviceToken
    }
  }
  
  async register() {
    if (this.isRegistered()) throw new Error('Already registered')
    
    const data = await this.fetch('POST', '/auth/register', this.getRegisterOptions())
    
    this.oAuthOptions.clientID = data.client_id
    this.oAuthOptions.clientName = data.client_name
    this.oAuthOptions.clientSecret = data.client_secret
    this.oAuthOptions.registrationAccessToken = data.registration_access_token
    this.oAuthOptions.softwareID = data.software_id
    
    return this.oAuthOptions;
  }
  
  unregister() {
    if (!this.isRegistered()) throw new Error('Client not registered')
    
    return this.fetch('DELETE', `/auth/register/${this.oAuthOptions.clientID}`, null, {
      credentials: 'Bearer ' + this.oAuthOptions.registrationAccessToken
    })
  }
  
  generateStateCode() {
    const STATE_SIZE = 16
    const hasCrypto = typeof window !== 'undefined' &&
                      typeof window.crypto !== 'undefined' &&
                      typeof window.crypto.getRandomValues === 'function'
    
    let buffer
    if (hasCrypto) {
      buffer = new Uint8Array(STATE_SIZE)
      window.crypto.getRandomValues(buffer)
    }
    else {
      buffer = new Array(STATE_SIZE)
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] = Math.floor((Math.random() * 255))
      }
    }
    
    return btoa(String.fromCharCode.apply(null, buffer))
      .replace(/=+$/, '')
      .replace(/\//g, '_')
      .replace(/\+/g, '-')
  }
  
  getAuthCodeURL(stateCode, scopes = []) {
    if (!this.isRegistered()) throw new Error('Not registered')
    
    const query = new URLSearchParams({
      client_id: this.oAuthOptions.clientID,
      redirect_uri: this.oAuthOptions.redirectURI,
      state: stateCode,
      response_type: 'code',
      scope: scopes.join(' ')
    })
    
    return `${this.uri}/auth/authorize?${query.toString()}`
  }
  
  getAccessCodeFromURL(pageURL, stateCode) {
    if (!stateCode) throw new Error('Missing state code')
    
    const params = new URL(pageURL).searchParams
    const urlStateCode = params.get('state')
    const urlAccessCode = params.get('access_code')
    
    if (stateCode !== urlStateCode) throw new Error('Given state does not match url query state')
    
    return urlAccessCode
  }
  
  async fetchAccessToken(accessCode) {
    if (!this.isRegistered()) throw new Error('Not registered')
    
    const data = new URLSearchParams({
      grant_type: 'authorization_code',
      code: accessCode,
      client_id: this.oAuthOptions.clientID,
      client_secret: this.oAuthOptions.clientSecret,
    })
    
    const result = await this.fetch('POST', '/auth/access_token', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    
    return new AccessToken(result)
  }
  
  setCredentials(token = null) {
    if (token) {
      this.token = (token instanceof AccessToken) ? token : new AccessToken(token)
    }
  }
}