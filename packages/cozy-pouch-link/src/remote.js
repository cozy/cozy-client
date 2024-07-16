import AccessToken from './AccessToken'

/**
 * Fetch remote instance
 *
 * @param {URL} url - The remote instance URL, including the credentials
 * @param {object} params - The params to query the remote instance
 * @returns {Promise<object>} The instance response
 */
export const fetchRemoteInstance = async (url, params = {}) => {
  const access = new AccessToken({ accessToken: url.password })

  Object.keys(params).forEach(key => {
    url.searchParams.set(key, params[key])
  })
  const fetchUrl = `${url.protocol}//${url.href.substring(
    url.href.indexOf('@') + 1
  )}`
  const headers = new Headers()
  headers.append('Accept', 'application/json')
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', access.toAuthHeader())
  const resp = await fetch(fetchUrl, { headers })
  const data = await resp.json()
  if (resp.ok) {
    return data
  }
  return null
}

/**
 * Fetch last sequence from remote instance
 *
 * @param {string} baseUrl - The base URL of the remote instance
 * @returns {Promise<string>} The last sequence
 */
export const fetchRemoteLastSequence = async baseUrl => {
  const remoteUrl = new URL(`${baseUrl}/_changes`)
  const res = await fetchRemoteInstance(remoteUrl, {
    limit: 1,
    descending: true
  })
  return res.last_seq
}
