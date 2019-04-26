import CozyStackClient from './CozyStackClient'
import AccessToken from './AccessToken'
import logDeprecate from './logDeprecate'
import errors from './errors'

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
  notificationDeviceToken: ''
}

/**
 * Specialized `CozyStackClient` for mobile, implementing stack registration
 * through OAuth.
 */
class OAuthClient extends CozyStackClient {
  constructor({ oauth, scope = [], onTokenRefresh, ...options }) {
    super(options)
    this.setOAuthOptions({ ...defaultoauthOptions, ...oauth })
    this.scope = scope
    this.onTokenRefresh = onTokenRefresh
  }

  /**
   * Checks if the client has his registration information from the server
   * @returns {boolean}
   * @private
   */
  isRegistered() {
    return this.oauthOptions.clientID !== ''
  }

  /**
   * Converts a camel-cased data set to snake case, suitable for sending to the OAuth server
   * @param   {object} data Initial data
   * @returns {object} Formatted data
   * @private
   */
  snakeCaseOAuthData(data) {
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
    if (
      result['redirect_uris'] &&
      result['redirect_uris'] instanceof Array === false
    )
      result['redirect_uris'] = [result['redirect_uris']]

    return result
  }

  /**
   * Converts a snake-cased data set to camel case, suitable for internal use
   * @param   {object} data Initial data
   * @returns {object} Formatted data
   * @private
   */
  camelCaseOAuthData(data) {
    const mappedFields = {
      client_id: 'clientID',
      client_name: 'clientName',
      client_secret: 'clientSecret',
      registration_access_token: 'registrationAccessToken',
      software_id: 'softwareID',
      redirect_uris: 'redirectURI'
    }

    const result = {}

    Object.keys(data).forEach(fieldName => {
      const key = mappedFields[fieldName] || fieldName
      const value = data[fieldName]
      result[key] = value
    })

    return result
  }

  /**
   * Registers the currenly configured client with the OAuth server.
   * @throws {Error} When the client is already registered
   * @returns {promise} A promise that resolves with a complete list of client information, including client ID and client secret.
   */
  async register() {
    if (this.isRegistered()) throw new Error('Client already registered')

    const mandatoryFields = ['redirectURI']
    const fields = Object.keys(this.oauthOptions)
    const missingMandatoryFields = mandatoryFields.filter(
      fieldName => fields[fieldName]
    )

    if (missingMandatoryFields.length > 0) {
      throw new Error(
        `Can't register client : missing ${missingMandatoryFields} fields`
      )
    }

    const data = await this.fetchJSON(
      'POST',
      '/auth/register',
      this.snakeCaseOAuthData({
        redirectURI: this.oauthOptions.redirectURI,
        clientName: this.oauthOptions.clientName,
        softwareID: this.oauthOptions.softwareID,
        clientKind: this.oauthOptions.clientKind,
        clientURI: this.oauthOptions.clientURI,
        logoURI: this.oauthOptions.logoURI,
        policyURI: this.oauthOptions.policyURI,
        softwareVersion: this.oauthOptions.softwareVersion,
        notificationPlatform: this.oauthOptions.notificationPlatform,
        notificationDeviceToken: this.oauthOptions.notificationDeviceToken
      })
    )

    this.setOAuthOptions({
      ...this.oauthOptions,
      client_id: data.client_id,
      client_name: data.client_name,
      client_secret: data.client_secret,
      registration_access_token: data.registration_access_token,
      software_id: data.software_id
    })

    return this.oauthOptions
  }

  /**
   * Unregisters the currenly configured client with the OAuth server.
   * @throws {NotRegisteredException} When the client doesn't have it's registration information
   * @returns {promise}
   */
  async unregister() {
    if (!this.isRegistered()) throw new NotRegisteredException()

    const clientID = this.oauthOptions.clientID
    this.oauthOptions.clientID = ''

    return this.fetchJSON('DELETE', `/auth/register/${clientID}`, null, {
      headers: {
        Authorization: this.registrationAccessTokenToAuthHeader()
      }
    })
  }

  /**
   * Fetches the complete set of client information from the server after it has been registered.
   * @throws {NotRegisteredException} When the client doesn't have it's registration information
   * @returns {promise}
   */
  async fetchInformation() {
    if (!this.isRegistered()) throw new NotRegisteredException()

    return this.fetchJSON(
      'GET',
      `/auth/register/${this.oauthOptions.clientID}`,
      null,
      {
        headers: {
          Authorization: this.registrationAccessTokenToAuthHeader()
        }
      }
    )
  }

  /**
   * Overwrites the client own information. This method will update both the local information and the remote information on the OAuth server.
   * @throws {NotRegisteredException} When the client doesn't have it's registration information
   * @param   {object} information Set of information to update. Note that some fields such as `clientID` can't be updated.
   * @param   {boolean} resetSecret = false Optionnal, whether to reset the client secret or not
   * @returns {promise} A promise that resolves to a complete, updated list of client information
   */
  async updateInformation(information, resetSecret = false) {
    if (!this.isRegistered()) throw new NotRegisteredException()

    const mandatoryFields = {
      clientID: this.oauthOptions.clientID,
      clientName: this.oauthOptions.clientName,
      redirectURI: this.oauthOptions.redirectURI,
      softwareID: this.oauthOptions.softwareID
    }
    const data = this.snakeCaseOAuthData({
      ...mandatoryFields,
      ...information
    })

    if (resetSecret) data['client_secret'] = this.oauthOptions.clientSecret

    const result = await this.fetchJSON(
      'PUT',
      `/auth/register/${this.oauthOptions.clientID}`,
      data,
      {
        headers: {
          Authorization: this.registrationAccessTokenToAuthHeader()
        }
      }
    )

    this.setOAuthOptions({ ...data, ...result })

    return this.oauthOptions
  }

  /**
   * Generates a random state code to be used during the OAuth process
   * @returns {string}
   */
  generateStateCode() {
    const STATE_SIZE = 16
    const hasCrypto =
      typeof window !== 'undefined' &&
      typeof window.crypto !== 'undefined' &&
      typeof window.crypto.getRandomValues === 'function'

    let buffer
    if (hasCrypto) {
      buffer = new Uint8Array(STATE_SIZE)
      window.crypto.getRandomValues(buffer)
    } else {
      buffer = new Array(STATE_SIZE)
      for (let i = 0; i < buffer.length; i++) {
        buffer[i] = Math.floor(Math.random() * 255)
      }
    }

    return btoa(String.fromCharCode.apply(null, buffer))
      .replace(/=+$/, '')
      .replace(/\//g, '_')
      .replace(/\+/g, '-')
  }

  /**
   * Generates the URL that the user should be sent to in order to accept the app's permissions.
   * @throws {NotRegisteredException} When the client doesn't have it's registration information
   * @param   {string} stateCode   A random code to be included in the URl for security. Can be generated with `client.generateStateCode()`
   * @param   {Array} scopes = [] An array of permission scopes for the token.
   * @returns {string} The URL
   */
  getAuthCodeURL(stateCode, scopes = this.scope) {
    if (!this.isRegistered()) throw new NotRegisteredException()

    const query = {
      client_id: this.oauthOptions.clientID,
      redirect_uri: this.oauthOptions.redirectURI,
      state: stateCode,
      response_type: 'code',
      scope: scopes.join(' ')
    }

    return `${this.uri}/auth/authorize?${this.dataToQueryString(query)}`
  }

  dataToQueryString(data) {
    return Object.keys(data)
      .map(param => `${param}=${encodeURIComponent(data[param])}`)
      .join('&')
  }

  /**
   * Retrieves the access code contained in the URL to which the user is redirected after accepting the app's permissions (the `redirectURI`).
   * @throws {Error} The URL should contain the same state code as the one generated with `client.getAuthCodeURL()`. If not, it will throw an error
   * @param   {string} pageURL The redirected page URL, containing the state code and the access code
   * @param   {string} stateCode The state code that was contained in the original URL the user was sent to (see `client.getAuthCodeURL()`)
   * @returns {string} The access code
   */
  getAccessCodeFromURL(pageURL, stateCode) {
    if (!stateCode) throw new Error('Missing state code')

    const params = new URL(pageURL).searchParams
    const urlStateCode = params.get('state')
    const urlAccessCode = params.get('access_code')

    if (stateCode !== urlStateCode)
      throw new Error('Given state does not match url query state')

    return urlAccessCode
  }

  /**
   * Exchanges an access code for an access token. This function does **not** update the client's token.
   * @throws {NotRegisteredException} When the client doesn't have it's registration information
   * @param   {string} accessCode - The access code contained in the redirection URL — see `client.getAccessCodeFromURL()`
   * @param   {object} oauthOptions — To use when OAuthClient is not yet registered (during login process)
   * @param   {string} uri — To use when OAuthClient is not yet registered (during login process)
   * @returns {Promise} A promise that resolves with an AccessToken object.
   */
  async fetchAccessToken(accessCode, oauthOptions, uri) {
    if (!this.isRegistered() && !oauthOptions)
      throw new NotRegisteredException()

    oauthOptions = oauthOptions || this.oauthOptions
    const data = {
      grant_type: 'authorization_code',
      code: accessCode,
      client_id: oauthOptions.clientID,
      client_secret: oauthOptions.clientSecret
    }

    const result = await this.fetchJSON(
      'POST',
      (uri || '') + '/auth/access_token',
      this.dataToQueryString(data),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    )

    return new AccessToken(result)
  }

  /**
   * Retrieves a new access token by refreshing the currently used token.
   * @throws {NotRegisteredException} When the client doesn't have it's registration information
   * @throws {Error} The client should already have an access token to use this function
   * @returns {Promise} A promise that resolves with a new AccessToken object
   */
  async refreshToken() {
    if (!this.isRegistered()) throw new NotRegisteredException()
    if (!this.token) throw new Error('No token to refresh')

    const data = {
      grant_type: 'refresh_token',
      refresh_token: this.token.refreshToken,
      client_id: this.oauthOptions.clientID,
      client_secret: this.oauthOptions.clientSecret
    }

    const result = await super.fetchJSON(
      'POST',
      '/auth/access_token',
      this.dataToQueryString(data),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    )

    const newToken = new AccessToken({
      refresh_token: this.token.refreshToken,
      ...result
    })

    if (this.onTokenRefresh && typeof this.onTokenRefresh === 'function') {
      this.onTokenRefresh(newToken)
    }

    return newToken
  }

  exchangeOAuthSecret(uri, secret) {
    return this.fetchJSON('POST', uri + '/auth/secret_exchange', {
      secret
    })
  }

  /**
   * Updates the client's stored token
   * @param {string} token = null The new token to use — can be a string, a json object or an AccessToken instance.
   */
  setToken(token) {
    if (token) {
      this.token = token instanceof AccessToken ? token : new AccessToken(token)
    } else {
      this.token = null
    }
  }

  setCredentials(token) {
    logDeprecate('setCredentials is deprecated, please replace by setToken')
    return this.setToken(token)
  }

  /**
   * Updates the OAuth informations
   * @param {object} options Map of OAuth options
   */
  setOAuthOptions(options) {
    this.oauthOptions = this.camelCaseOAuthData(options)
  }

  resetClientId() {
    this.oauthOptions.clientID = ''
  }

  /**
   * Reset the current OAuth client
   */
  resetClient() {
    this.resetClientId()
    this.setUri(null)
    this.setToken(null)
  }

  async fetchJSON(method, path, body, options) {
    try {
      return await super.fetchJSON(method, path, body, options)
    } catch (e) {
      if (errors.EXPIRED_TOKEN.test(e.message)) {
        const token = await this.refreshToken()
        this.setToken(token)
        return await super.fetchJSON(method, path, body, options)
      } else {
        throw e
      }
    }
  }

  /**
   * Turns the client's registration access token into a header suitable for HTTP requests. Used in some queries to manipulate the client on the server side.
   * @returns {string}
   * @private
   */
  registrationAccessTokenToAuthHeader() {
    if (!this.oauthOptions.registrationAccessToken) {
      throw new Error('No registration access token')
    }
    return 'Bearer ' + this.oauthOptions.registrationAccessToken
  }
}

class NotRegisteredException extends Error {
  constructor(message = 'Client not registered or missing OAuth information') {
    super(message)
    this.message = message
    this.name = 'NotRegisteredException'
  }
}

export default OAuthClient
