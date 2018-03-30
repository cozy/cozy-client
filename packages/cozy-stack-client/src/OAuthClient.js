import CozyStackClient from './CozyStackClient'
import AccessToken from './AccessToken'

const defaultOAuthOptions = {
  clientID: '',
  clientName: 'a',
  clientKind: '',
  clientSecret: '',
  clientURI: '',
  registrationAccessToken: '',
  redirectURI: 'http://localhost',
  softwareID: 'a',
  softwareVersion: '',
  logoURI: '',
  policyURI: '',
  notificationPlatform: '',
  notificationDeviceToken: '',
}

export default class OAuthClient extends CozyStackClient{
  constructor({ oauthOptions, uri = '' }) {
    super({token: null, uri})
    this.oauthOptions = {...defaultOAuthOptions, ...oauthOptions}  
  }
  
  isRegistered () {
    return this.oauthOptions.clientID !== ''
  }
  
  getRegisterOptions () {
    return {
      redirect_uris: [this.oauthOptions.redirectURI],
      software_id: this.oauthOptions.softwareID,
      software_version: this.oauthOptions.softwareVersion,
      client_name: this.oauthOptions.clientName,
      client_kind: this.oauthOptions.clientKind,
      client_uri: this.oauthOptions.clientURI,
      logo_uri: this.oauthOptions.logoURI,
      policy_uri: this.oauthOptions.policyURI,
      notification_platform: this.oauthOptions.notificationPlatform,
      notification_device_token: this.oauthOptions.notificationDeviceToken
    }
  }
  
  async register() {
    if (this.isRegistered()) throw new Error('Already registered')
    
    const data = await this.fetch('POST', '/auth/register', this.getRegisterOptions())
    const { 
      client_id: clientID, 
      client_name: clientName, 
      client_secret: clientSecret, 
      registration_access_token: registrationAccessToken, 
      software_id: softwareID } = data
    
    this.oauthOptions.clientID = clientID
    this.oauthOptions.clientName = clientName
    this.oauthOptions.clientSecret = clientSecret
    this.oauthOptions.registrationAccessToken = registrationAccessToken
    this.oauthOptions.softwareID = softwareID
    
    return this;
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
      client_id: this.oauthOptions.clientID,
      redirect_uri: this.oauthOptions.redirectURI,
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
  
  async getAccessToken(accessCode) {
    if (!this.isRegistered()) throw new Error('Not registered')
    
    const data = new URLSearchParams({
      grant_type: 'authorization_code',
      code: accessCode,
      client_id: this.oauthOptions.clientID,
      client_secret: this.oauthOptions.clientSecret,
    })
    
    const result = await this.fetch('POST', '/auth/access_token', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    
    return new AccessToken(result)
  }
  
  setAccessToken(token) {
    this.token = token
  }
}