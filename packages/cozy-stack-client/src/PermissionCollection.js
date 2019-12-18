import DocumentCollection, { normalizeDoc } from './DocumentCollection'
import { isFile } from './FileCollection'
import { uri } from './utils'

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

  async create({ _id, _type, ...attributes }) {
    const resp = await this.stackClient.fetchJSON('POST', uri`/permissions`, {
      data: {
        type: 'io.cozy.permissions',
        attributes
      }
    })
    return {
      data: normalizePermission(resp.data)
    }
  }

  /**
   * Adds a permission to the given document. Document type must be
   * `io.cozy.apps`, `io.cozy.konnectors` or `io.cozy.permissions`
   *
   * @param  {object}  document
   * @param  {object}  permission
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

    return resp.data
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
   * Create a new set of permission on the stack
   * @param {object} permissions - list of permissions
   * @see https://docs.cozy.io/en/cozy-stack/permissions/#post-permissions
   * @private
   */
  async createPermissions(permissions) {
    const resp = await this.stackClient.fetchJSON(
      'POST',
      `/permissions?codes=email`,
      {
        data: {
          type: 'io.cozy.permissions',
          attributes: {
            permissions: permissions
          }
        }
      }
    )
    return { data: normalizePermission(resp.data) }
  }

  /**
   * Create a share link
   *
   * @param {{_id, _type}} document - cozy document
   * @param {object} options - options
   * @param {string[]} options.verbs - explicit permissions to use
   */
  async createSharingLink(document, options = {}) {
    const permissions = getPermissionsFor(document, true, options)
    return this.createPermissions(permissions)
  }

  /**
   * Create a share link from multiple documents
   *
   * @param {object} documents - key/value
   * where each value is either a document {_id, _type}
   * or an array with a document and an option object
   */
  async createCompositeSharingLink(documents) {
    const permissions = Object.keys(documents).map(key => {
      const item = documents[key]
      const document = Array.isArray(item) ? item[0] : item
      const options = Array.isArray(item) ? item[1] : {}
      return getPermissionsFor(document, true, { name: key, ...options })
    })
    return this.createPermissions(Object.assign({}, ...permissions))
  }

  async revokeSharingLink(document) {
    const allLinks = await this.findLinksByDoctype(document._type)
    const links = allLinks.data.filter(perm =>
      isPermissionRelatedTo(perm, document)
    )
    for (let perm of links) {
      await this.destroy(perm)
    }
  }

  /**
   * async getOwnPermissions - Gets the permission for the current token
   *
   * @returns {object}
   */
  async getOwnPermissions() {
    const resp = await this.stackClient.fetchJSON('GET', '/permissions/self')
    return {
      data: normalizePermission(resp.data)
    }
  }
}

/**
 * Should we also give access to referenced_by files ?
 *
 * @param {{_type}} document - document to share
 * @returns {boolean}
 */
export const shouldReferencedFiledBeIncluded = document => {
  if (isFile(document)) return false
  if (document._type == 'io.cozy.notes') return false
  if (document._type == 'io.cozy.notes.events') return false
  return true
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
  const name = options.name || 'files'
  const collectionName = (options.name || '') + 'collection'
  // TODO: this works for albums, but it needs to be generalized and integrated
  // with cozy-client ; some sort of doctype "schema" will be needed here
  return shouldReferencedFiledBeIncluded(document)
    ? {
        [collectionName]: {
          type: _type,
          verbs,
          values: [_id]
        },
        [name]: {
          type: 'io.cozy.files',
          verbs,
          values: [`${_type}/${_id}`],
          selector: 'referenced_by'
        }
      }
    : {
        [name]: {
          type: _type,
          verbs,
          values: [_id]
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
