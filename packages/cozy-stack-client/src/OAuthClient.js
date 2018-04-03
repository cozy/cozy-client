import CozyStackClient from './CozyStackClient'
import AccessToken from './AccessToken'

const defaultoauthOptions = {
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
    this.oauthOptions = {...defaultoauthOptions, ...oauth}
  }
  
  isRegistered () {
    return this.oauthOptions.clientID !== ''
  }
  
  snakeCaseOAuthData (data) {
    const mappedFields = {
      softwareID: 'software_id',
      softwareVersion: 'software_version',
      clientID: 'client_id',
      clientName: 'client_name',
      clientKind: 'client_kind',
      clientURI: 'client_uri',
      logoURI: 'logo_uri',
      policyURI: 'policy_uri',
      notificationPlatform: 'notification_platform',
      notificationDeviceToken: 'notification_device_token',
      redirectURI: 'redirect_uris'
    }
    
    const result = {}
    
    Object.keys(data).forEach(fieldName => {
      const key = mappedFields[fieldName] || fieldName
      const value = data[fieldName]
      result[key] = value
    })
    
    // special case: turn redirect_uris into an array
    if (result['redirect_uris'] && result['redirect_uris'] instanceof Array === false) result['redirect_uris'] = [result['redirect_uris']]
    
    return result
  }
  
  camelCaseOAuthData(data) {
    const mappedFields = {
      client_id: 'clientID',
      client_name: 'clientName',
      client_secret: 'clientSecret',
      registration_access_token: 'registrationAccessToken',
      software_id: 'softwareID',
    }
    
    const result = {}
    
    Object.keys(data).forEach(fieldName => {
      const key = mappedFields[fieldName] || fieldName
      const value = data[fieldName]
      result[key] = value
    })
    
    return result
  }
  
  async register() {
    if (this.isRegistered()) throw new Error('Client already registered')
    
    const data = await this.fetch('POST', '/auth/register', this.snakeCaseOAuthData(this.oauthOptions))
    
    this.oauthOptions = this.camelCaseOAuthData(data)
    
    return this.oauthOptions
  }
  
  unregister() {
    if (!this.isRegistered()) throw new NotRegisteredException()
    
    return this.fetch('DELETE', `/auth/register/${this.oauthOptions.clientID}`, null, {
      credentials: this.registrationAccessTokenToAuthHeader()
    })
  }
  
  fetchInformations(){
    if (!this.isRegistered()) throw new NotRegisteredException()
    
    return this.fetch('GET', `/auth/register/${this.oauthOptions.clientID}`, null, {
      credentials: this.registrationAccessTokenToAuthHeader()
    })
  }
  
  async updateInformations(informations, resetSecret = false) {
    const mandatoryFields = {
      clientID: this.oauthOptions.clientID,
      clientName: this.oauthOptions.clientName,
      redirectURI: this.oauthOptions.redirectURI,
      softwareID: this.oauthOptions.softwareID,
    }
    const data = this.snakeCaseOAuthData({...mandatoryFields, ...informations})
    
    if (resetSecret) data['client_secret'] = this.oauthOptions.clientSecret
    
    const result = await this.fetch('PUT', `/auth/register/${this.oauthOptions.clientID}`, data, {
      credentials: this.registrationAccessTokenToAuthHeader()
    })
    
    this.oauthOptions = this.camelCaseOAuthData(result)
    
    return this.oauthOptions
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
    if (!this.isRegistered()) throw new NotRegisteredException()
    
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
  
  async fetchAccessToken(accessCode) {
    if (!this.isRegistered()) throw new NotRegisteredException()
    
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
  
  async refreshToken() {
    if (!this.isRegistered()) throw new NotRegisteredException()
    if (!this.token) throw new Error('No token to refresh')
    
    const data = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: this.token.refreshToken,
      client_id: this.oauthOptions.clientID,
      client_secret: this.oauthOptions.clientSecret,
    })
    
    const result = await this.fetch('POST', '/auth/access_token', data, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    
    return new AccessToken({refresh_token: this.token.refreshToken, ...result})
  }
  
  setCredentials(token = null) {
    if (token) {
      this.token = (token instanceof AccessToken) ? token : new AccessToken(token)
    }
    else {
      this.token = null
    }
  }
  
  registrationAccessTokenToAuthHeader() {
    return 'Bearer ' + this.oauthOptions.registrationAccessToken
  }
}

export class NotRegisteredException extends Error{
	constructor(message = 'Client not registered or missing OAuth informations') {
		super(message);
		this.message = message;
		this.name = 'NotRegisteredException';
	}
}