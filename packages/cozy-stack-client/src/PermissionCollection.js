import DocumentCollection, { normalizeDoc } from './DocumentCollection'
import { isFile } from './FileCollection'
import { uri } from './utils'
import logger from './logger'

const normalizePermission = perm => normalizeDoc(perm, 'io.cozy.permissions')

/**
 * Implements `DocumentCollection` API along with specific methods for `io.cozy.permissions`.
 */
class PermissionCollection extends DocumentCollection {
  async get(id) {
    const resp = await this.stackClient.fetchJSON(
      'GET',
      uri`/permissions/${id}`
    )
    return {
      data: normalizePermission(resp.data)
    }
  }
  /**
   * Create a new set of permissions
   * It can also associates one or more codes to it, via the codes parameter
   *
   * @param {object} permission - permission to create
   * @param {string} permission.codes A comma separed list of values (defaulted to code)
   * @param {string} permission.ttl Make the codes expire after a delay (bigduration format)
   * @param {boolean} permission.tiny If set to true then the generated shortcode will be 6 digits
   * Cozy-Stack has a few conditions to be able to use this tiny shortcode ATM you have to specifiy
   * a ttl < 1h, but it can change.
   * see https://docs.cozy.io/en/cozy-stack/permissions/#post-permissions for exact informations
   *
   * bigduration format: https://github.com/justincampbell/bigduration/blob/master/README.md
   * @see https://docs.cozy.io/en/cozy-stack/permissions/#post-permissions
   *
   */
  async create({ _id, _type, codes = 'code', ttl, tiny, ...attributes }) {
    const searchParams = new URLSearchParams()
    searchParams.append('codes', codes)
    if (ttl) searchParams.append('ttl', ttl)
    if (tiny) searchParams.append('tiny', true)
    const resp = await this.stackClient.fetchJSON(
      'POST',
      `/permissions?${searchParams}`,
      {
        data: {
          type: 'io.cozy.permissions',
          attributes
        }
      }
    )
    return {
      data: normalizePermission(resp.data)
    }
  }

  /**
   * Adds a permission to the given document. Document type must be
   * `io.cozy.apps`, `io.cozy.konnectors` or `io.cozy.permissions`
   *
   * @param  {object}  document - Document which receives the permission
   * @param  {object}  permission - Describes the permission
   * @returns {Promise}
   *
   * @example
   * ```
   * const permissions = await client
   *   .collection('io.cozy.permissions')
   *   .add(konnector, {
   *     folder: {
   *       type: 'io.cozy.files',
   *       verbs: ['GET', 'PUT'],
   *       values: [`io.cozy.files.bc57b60eb2954537b0dcdc6ebd8e9d23`]
   *     }
   *  })
   * ```
   */
  async add(document, permission) {
    let endpoint
    switch (document._type) {
      case 'io.cozy.apps':
        endpoint = `/permissions/apps/${document.slug}`
        break
      case 'io.cozy.konnectors':
        endpoint = `/permissions/konnectors/${document.slug}`
        break
      case 'io.cozy.permissions':
        endpoint = `/permissions/${document._id}`
        break
      default:
        throw new Error(
          'Permissions can only be added on existing permissions, apps and konnectors.'
        )
    }

    const resp = await this.stackClient.fetchJSON('PATCH', endpoint, {
      data: {
        type: 'io.cozy.permissions',
        attributes: {
          permissions: permission
        }
      }
    })

    return { data: normalizePermission(resp.data) }
  }

  destroy(permission) {
    return this.stackClient.fetchJSON(
      'DELETE',
      uri`/permissions/${permission.id}`
    )
  }

  async findLinksByDoctype(doctype) {
    const resp = await this.stackClient.fetchJSON(
      'GET',
      uri`/permissions/doctype/${doctype}/shared-by-link`
    )
    return {
      ...resp,
      data: resp.data.map(normalizePermission)
    }
  }

  async findApps() {
    const resp = await this.stackClient.fetchJSON('GET', '/apps/')
    return { ...resp, data: resp.data.map(a => ({ _id: a.id, ...a })) }
  }

  /**
   * Create a share link
   *
   * @param {{_id, _type}} document - cozy document
   * @param {object} options - options
   * @param {string[]} options.verbs - explicit permissions to use
   */
  async createSharingLink(document, options = {}) {
    const { verbs } = options
    const resp = await this.stackClient.fetchJSON(
      'POST',
      `/permissions?codes=email`,
      {
        data: {
          type: 'io.cozy.permissions',
          attributes: {
            permissions: getPermissionsFor(
              document,
              true,
              verbs ? { verbs } : {}
            )
          }
        }
      }
    )
    return { data: normalizePermission(resp.data) }
  }
  /**
   * Follow the next link to fetch the next permissions
   *
   * @param {object} permissions JSON-API based permissions document
   */
  async fetchPermissionsByLink(permissions) {
    if (permissions.links && permissions.links.next) {
      return await this.stackClient.fetchJSON('GET', permissions.links.next)
    }
  }

  /**
   *
   * @param {object} document Cozy doc
   * @returns {object} with all the permissions
   */
  async fetchAllLinks(document) {
    let allLinks = await this.findLinksByDoctype(document._type)
    let resp = allLinks
    while (resp.links && resp.links.next) {
      resp = await this.fetchPermissionsByLink(resp)
      allLinks.data.push(...resp.data.map(normalizePermission))
    }
    return allLinks
  }
  /**
   * Destroy a sharing link and the related permissions
   *
   * @param {object} document - document to revoke sharing link
   */
  async revokeSharingLink(document) {
    const allLinks = await this.fetchAllLinks(document)
    const links = allLinks.data.filter(perm =>
      isPermissionRelatedTo(perm, document)
    )
    for (let perm of links) {
      await this.destroy(perm)
    }
  }

  /**
   * async getOwnPermissions - deprecated: please use fetchOwnPermissions instead
   *
   * @typedef {object} Permission
   *
   * @returns {Permission} permission
   */
  async getOwnPermissions() {
    logger.warn(
      'getOwnPermissions is deprecated, please use fetchOwnPermissions instead'
    )
    return this.fetchOwnPermissions()
  }

  /**
   * async fetchOwnPermissions - Fetches permissions
   *
   * @typedef {object} Permission
   *
   * @returns {Permission} permission
   */
  async fetchOwnPermissions() {
    const resp = await this.stackClient.fetchJSON('GET', '/permissions/self')
    return {
      data: normalizePermission(resp.data),
      included: resp.included ? resp.included.map(normalizePermission) : []
    }
  }
}

/**
 * Build a permission set
 *
 * @param {{_id, _type}} document - cozy document
 * @param {boolean} publicLink - are the permissions for a public link ?
 * @param {object} options - options
 * @param {string[]} options.verbs - explicit permissions to use
 * @returns {object} permissions object that can be sent through /permissions/*
 */
export const getPermissionsFor = (
  document,
  publicLink = false,
  options = {}
) => {
  const { _id, _type } = document
  const verbs = options.verbs ? options.verbs : publicLink ? ['GET'] : ['ALL']
  // TODO: this works for albums, but it needs to be generalized and integrated
  // with cozy-client ; some sort of doctype "schema" will be needed here
  return isFile(document)
    ? {
        files: {
          type: 'io.cozy.files',
          verbs,
          values: [_id]
        }
      }
    : {
        collection: {
          type: _type,
          verbs,
          values: [_id]
        },
        files: {
          type: 'io.cozy.files',
          verbs,
          values: [`${_type}/${_id}`],
          selector: 'referenced_by'
        }
      }
}

PermissionCollection.normalizeDoctype =
  DocumentCollection.normalizeDoctypeJsonApi

const isPermissionRelatedTo = (perm, document) => {
  const { _id } = document
  return isFile(document)
    ? perm.attributes.permissions.files.values.indexOf(_id) !== -1
    : perm.attributes.permissions.collection.values.indexOf(_id) !== -1
}

export default PermissionCollection
