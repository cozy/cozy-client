import get from 'lodash/get'

import DocumentCollection from './DocumentCollection'
import { uri } from './utils'
import * as querystring from './querystring'
import { dontThrowNotFoundError } from './Collection'
import { FetchError } from './errors'

export const OAUTH_CLIENTS_DOCTYPE = 'io.cozy.oauth.clients'

const normalizeDoc = DocumentCollection.normalizeDoctypeJsonApi(
  OAUTH_CLIENTS_DOCTYPE
)
const normalizeOAuthClient = client => ({
  ...normalizeDoc(client, OAUTH_CLIENTS_DOCTYPE),
  ...client.attributes
})

/**
 * Implements `DocumentCollection` API to interact with the /settings/clients endpoint of the stack
 */
class OAuthClientsCollection extends DocumentCollection {
  constructor(stackClient) {
    super(OAUTH_CLIENTS_DOCTYPE, stackClient)
  }

  /**
   * Fetches all OAuth clients
   *
   * @param  {object} options           Query options
   * @param  {number} options.limit     For pagination, the number of results to return.
   * @param  {object} options.bookmark  For cursor-based pagination, the index cursor.
   * @param  {array} options.keys       Ids of specific clients to return (within the current page),
   * @returns {object}                  The JSON API conformant response.
   */
  async all(options = {}) {
    const { limit = 100, bookmark, keys } = options

    const params = {
      'page[limit]': limit,
      'page[cursor]': bookmark
    }
    const url = uri`/settings/clients`
    const path = querystring.buildURL(url, params)
    let resp
    try {
      resp = await this.stackClient.fetchJSON('GET', path)
    } catch (error) {
      return dontThrowNotFoundError(error)
    }
    const nextLink = get(resp, 'links.next', '')
    const nextLinkURL = new URL(`${this.stackClient.uri}${nextLink}`)
    const nextBookmark =
      nextLinkURL.searchParams.get('page[cursor]') || undefined
    const hasBookmark = nextBookmark !== undefined

    if (keys) {
      const data = resp.data
        .filter(c => keys.includes(c.id))
        .map(c => normalizeOAuthClient(c))
      const meta = { ...resp.meta, count: data.length }

      return {
        data,
        meta,
        next: keys.length > data.length && hasBookmark,
        bookmark: nextBookmark
      }
    } else {
      return {
        data: resp.data.map(c => normalizeOAuthClient(c)),
        meta: resp.meta,
        next: hasBookmark,
        bookmark: nextBookmark
      }
    }
  }

  /**
   * Get an OAuth client by id
   *
   * @param  {string} id The client id.
   * @returns {object}  JsonAPI response containing normalized client as data attribute
   */
  async get(id) {
    let resp = await this.all({ keys: [id] })

    while (resp.next) {
      resp = await this.all({ keys: [id], bookmark: resp.bookmark })
    }

    if (resp.data.length) {
      return {
        data: normalizeOAuthClient(resp.data[0])
      }
    } else {
      resp.url = uri`/settings/clients/${id}`
      resp.status = '404'
      throw new FetchError(resp, 'Not Found')
    }
  }

  /**
   * Destroys the OAuth client on the server
   *
   * @param {io.cozy.oauth.clients} client     The client document to destroy
   * @param {string}                client._id The client's id
   *
   * @returns {{ data }} The deleted client
   */
  async destroy({ _id }) {
    const resp = await this.stackClient.fetchJSON(
      'DELETE',
      uri`/settings/clients/${_id}`
    )
    return {
      data: { ...normalizeOAuthClient(resp.data), _deleted: true }
    }
  }
}

OAuthClientsCollection.normalizeDoctype =
  DocumentCollection.normalizeDoctypeJsonApi

export default OAuthClientsCollection
