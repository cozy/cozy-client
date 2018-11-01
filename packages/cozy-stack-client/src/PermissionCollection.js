import DocumentCollection, { normalizeDoc } from './DocumentCollection'
import { isFile } from './FileCollection'
import { uri } from './utils'

const normalizePermission = perm => normalizeDoc(perm, 'io.cozy.permissions')

/**
 * Interact with permissions
 *
 * @module PermissionCollection
 */
export default class PermissionCollection extends DocumentCollection {
  async get(id) {
    const resp = await this.stackClient.fetchJSON('GET', uri`/permissions/${id}`)
    return {
      data: normalizePermission(resp.data)
    }
  }

  async create({ _id, _type, ...attributes }) {
    const resp = await this.stackClient.fetchJSON('POST', uri`/permissions/`, {
      data: {
        type: 'io.cozy.permissions',
        attributes
      }
    })
    return {
      data: normalizePermission(resp.data)
    }
  }

  destroy(permission) {
    return this.stackClient.fetchJSON('DELETE', uri`/permissions/${permission.id}`)
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

  async createSharingLink(document) {
    const resp = await this.stackClient.fetchJSON(
      'POST',
      `/permissions?codes=email`,
      {
        data: {
          type: 'io.cozy.permissions',
          attributes: {
            permissions: getPermissionsFor(document, true)
          }
        }
      }
    )
    return { data: normalizePermission(resp.data) }
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

const getPermissionsFor = (document, publicLink = false) => {
  const { _id, _type } = document
  const verbs = publicLink ? ['GET'] : ['ALL']
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

const isPermissionRelatedTo = (perm, document) => {
  const { _id } = document
  return isFile(document)
    ? perm.attributes.permissions.files.values.indexOf(_id) !== -1
    : perm.attributes.permissions.collection.values.indexOf(_id) !== -1
}
