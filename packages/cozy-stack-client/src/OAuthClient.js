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
  
  oauthDataToJSON (data) {
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
    
    const json = {}
    
    Object.keys(data).forEach(fieldName => {
      const key = mappedFields[fieldName] || fieldName
      const value = data[fieldName]
      json[key] = value
    })
    
    // special case: turn redirect_uris into an array
    if (json['redirect_uris'] && json['redirect_uris'] instanceof Array === false) json['redirect_uris'] = [json['redirect_uris']]
    
    return json
  }
  
  serverDataToJSON(data) {
    const mappedFields = {
      client_id: 'clientID',
      client_name: 'clientName',
      client_secret: 'clientSecret',
      registration_access_token: 'registrationAccessToken',
      software_id: 'softwareID',
    }
    
    const json = {}
    
    Object.keys(data).forEach(fieldName => {
      const key = mappedFields[fieldName] || fieldName
      const value = data[fieldName]
      json[key] = value
    })
    
    return json
  }
  
  async register() {
    if (this.isRegistered()) throw new Error('Already registered')
    
    const data = await this.fetch('POST', '/auth/register', this.oauthDataToJSON(this.oAuthOptions))
    
    this.oAuthOptions = this.serverDataToJSON(data)
    
    return this.oAuthOptions;
  }
  
  unregister() {
    if (!this.isRegistered()) throw new Error('Client not registered')
    
    return this.fetch('DELETE', `/auth/register/${this.oAuthOptions.clientID}`, null, {
      credentials: 'Bearer ' + this.oAuthOptions.registrationAccessToken
    })
  }
  
  fetchInformations(){
    if (!this.isRegistered()) throw new Error('Client not registered')
    
    return this.fetch('GET', `/auth/register/${this.oAuthOptions.clientID}`, null, {
      credentials: 'Bearer ' + this.oAuthOptions.registrationAccessToken
    })
  }
  
  async updateInformations(informations) {
    const mandatoryFields = {
      clientID: this.oAuthOptions.clientID,
      clientName: this.oAuthOptions.clientName,
      redirectURI: this.oAuthOptions.redirectURI,
      softwareID: this.oAuthOptions.softwareID,
    }
    const data = this.oauthDataToJSON({...mandatoryFields, ...informations})
    
    const result = await this.fetch('PUT', `/auth/register/${this.oAuthOptions.clientID}`, data, {
      credentials: 'Bearer ' + this.oAuthOptions.registrationAccessToken
    })
    
    this.oAuthOptions = this.serverDataToJSON(result)
    
    return this.oAuthOptions
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