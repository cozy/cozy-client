import DocumentCollection, { normalizeDoc } from './DocumentCollection'
import { isFile, isDirectory } from './FileCollection'
import { uri } from './utils'
export const SHARING_DOCTYPE = 'io.cozy.sharings'

const normalizeSharing = sharing => normalizeDoc(sharing, SHARING_DOCTYPE)

/**
 * @typedef {object} Rule A sharing rule
 * @property {string} title
 * @property {string} doctype
 * @property {Array} values
 * @property {string=} add
 * @property {string=} update
 * @property {string=} remove
 */
/**
 * @typedef {object} Recipient An io.cozy.contact
 */
/**
 * @typedef {object} Sharing An io.cozy.sharings document
 */

/**
 * Implements the `DocumentCollection` API along with specific methods for
 * `io.cozy.sharings`.
 */
class SharingCollection extends DocumentCollection {
  async findByDoctype(doctype) {
    const resp = await this.stackClient.fetchJSON(
      'GET',
      uri`/sharings/doctype/${doctype}`
    )
    return {
      ...resp,
      data: resp.data.map(normalizeSharing)
    }
  }
  /**
   * Fetches a sharing by id
   *
   * @param {string} id Sharing's id
   * @returns {Sharing} sharing
   */
  async get(id) {
    const path = uri`/sharings/${id}`
    const resp = await this.stackClient.fetchJSON('GET', path)
    return {
      data: normalizeSharing(resp.data)
    }
  }

  /**
   *
   * Creates a new Sharing. See https://docs.cozy.io/en/cozy-stack/sharing/#post-sharings
   *
   * @param {object} params Sharing  params
   * @param {Sharing} params.document The document to share
   * @param {string} params.description Description of the sharing
   * @param {string=} params.previewPath The preview path
   * @param {Array<Rule>=} params.rules The rules defined to the sharing. See https://docs.cozy.io/en/cozy-stack/sharing-design/#description-of-a-sharing
   * @param {Array<Recipient>=} params.recipients Recipients to add to the sharings (will have the same permissions given by the rules defined by the sharing )
   * @param {Array<Recipient>=} params.readOnlyRecipients Recipients to add to the sharings with only read only access
   * @param {boolean=} params.openSharing If someone else than the owner can add a recipient to the sharing
   */
  async create({
    document,
    description,
    previewPath,
    rules,
    recipients = [],
    readOnlyRecipients = [],
    openSharing
  }) {
    const resp = await this.stackClient.fetchJSON('POST', '/sharings/', {
      data: {
        type: 'io.cozy.sharings',
        attributes: {
          description,
          preview_path: previewPath,
          open_sharing: openSharing,
          rules: rules ? rules : getSharingRules(document)
        },
        relationships: {
          ...(recipients.length > 0 && {
            recipients: { data: recipients.map(toRelationshipItem) }
          }),
          ...(readOnlyRecipients.length > 0 && {
            read_only_recipients: {
              data: readOnlyRecipients.map(toRelationshipItem)
            }
          })
        }
      }
    })
    return { data: normalizeSharing(resp.data) }
  }

  /**
   * @deprecated Use create() instead
   * share - Creates a new sharing. See https://docs.cozy.io/en/cozy-stack/sharing/#post-sharings
   *
   * @param  {Sharing} document The document to share. Should have and _id and a name.
   * @param  {Array} recipients A list of io.cozy.contacts
   * @param  {string} sharingType - If "two-way", will set the open_sharing attribute to true
   * @param  {string} description - Describes the sharing
   * @param  {string=} previewPath Relative URL of the sharings preview page
   */
  async share(
    document,
    recipients,
    sharingType,
    description,
    previewPath = null
  ) {
    console.warn(
      'SharingCollection.share is deprecated, use SharingCollection.create instead'
    )
    const recipientsToUse =
      sharingType === 'two-way'
        ? { recipients }
        : { readOnlyRecipients: recipients }
    return this.create({
      document,
      ...recipientsToUse,
      description,
      previewPath,
      openSharing: sharingType === 'two-way',
      rules: getSharingRules(document, sharingType)
    })
  }

  /**
   * getDiscoveryLink - Returns the URL of the page that can be used to accept a sharing. See https://docs.cozy.io/en/cozy-stack/sharing/#get-sharingssharing-iddiscovery
   *
   * @param  {string} sharingId - Id of the sharing
   * @param  {string} sharecode - Code of the sharing
   * @returns {string}
   */
  getDiscoveryLink(sharingId, sharecode) {
    return this.stackClient.fullpath(
      `/sharings/${sharingId}/discovery?sharecode=${sharecode}`
    )
  }

  /**
   * Add an array of contacts to the Sharing
   *
   * @param {object} options Object
   * @param {Sharing} options.document Sharing Object
   * @param {Array<Recipient>=} options.recipients Recipients to add to the sharing
   * @param {Array<Recipient>=} options.readOnlyRecipients Recipients to add to the sharings with only read only access
   */
  async addRecipients({ document, recipients = [], readOnlyRecipients = [] }) {
    const resp = await this.stackClient.fetchJSON(
      'POST',
      uri`/sharings/${document._id}/recipients`,
      {
        data: {
          type: 'io.cozy.sharings',
          id: document._id,
          relationships: {
            ...(recipients.length > 0 && {
              recipients: { data: recipients.map(toRelationshipItem) }
            }),
            ...(readOnlyRecipients.length > 0 && {
              read_only_recipients: {
                data: readOnlyRecipients.map(toRelationshipItem)
              }
            })
          }
        }
      }
    )
    return { data: normalizeSharing(resp.data) }
  }
  /**
   * Revoke only one recipient of the sharing.
   *
   * @param {object} sharing Sharing Object
   * @param {number} recipientIndex Index of this recipient in the members array of the sharing
   */
  revokeRecipient(sharing, recipientIndex) {
    return this.stackClient.fetchJSON(
      'DELETE',
      uri`/sharings/${sharing._id}/recipients/${recipientIndex}`
    )
  }
  /**
   * Remove self from the sharing.
   *
   * @param {object} sharing Sharing Object
   */
  revokeSelf(sharing) {
    return this.stackClient.fetchJSON(
      'DELETE',
      uri`/sharings/${sharing._id}/recipients/self`
    )
  }
  /**
   * Revoke the sharing for all the members. Must be called
   * from the owner's cozy
   *
   * @param {object} sharing Sharing Objects
   */
  revokeAllRecipients(sharing) {
    return this.stackClient.fetchJSON(
      'DELETE',
      uri`/sharings/${sharing._id}/recipients`
    )
  }
}

SharingCollection.normalizeDoctype = DocumentCollection.normalizeDoctypeJsonApi

// Rules determine the behavior of the sharing when changes are made to the shared document
// See https://docs.cozy.io/en/cozy-stack/sharing-design/#description-of-a-sharing
export const getSharingRules = (document, sharingType) => {
  if (sharingType) {
    console.warn(
      `sharingType is deprecated and will be removed. We now set this default rules: ${
        isFile(document)
          ? getSharingRulesForFile(document)
          : getSharingRulesForPhotosAlbum(document)
      }} \n      
      If this default rules do not fill your need, please set custom rules 
      by using the 'rules' object of the SharingCollection.create() method`
    )
  }
  return isFile(document)
    ? getSharingRulesForFile(document, sharingType)
    : getSharingRulesForPhotosAlbum(document, sharingType)
}

const getSharingRulesForPhotosAlbum = (document, sharingType) => {
  const { _id, _type } = document
  return [
    {
      title: 'collection',
      doctype: _type,
      values: [_id],
      ...getSharingPolicyForAlbum(sharingType)
    },
    {
      title: 'items',
      doctype: 'io.cozy.files',
      values: [`${_type}/${_id}`],
      selector: 'referenced_by',
      ...getSharingPolicyForReferencedFiles(sharingType)
    }
  ]
}

const getSharingPolicyForReferencedFiles = sharingType => {
  return sharingType === 'two-way'
    ? { add: 'sync', update: 'sync', remove: 'sync' }
    : { add: 'push', update: 'none', remove: 'push' }
}
const getSharingPolicyForAlbum = sharingType => {
  if (!sharingType) return { update: 'sync', remove: 'revoke' }
  return sharingType === 'two-way'
    ? { update: 'sync', remove: 'revoke' }
    : { update: 'push', remove: 'revoke' }
}
const getSharingRulesForFile = (document, sharingType) => {
  const { _id, name } = document
  return [
    {
      title: name,
      doctype: 'io.cozy.files',
      values: [_id],
      ...getSharingPolicyForFile(document, sharingType)
    }
  ]
}
const getSharingPolicyForFile = (document, sharingType) => {
  if (isDirectory(document)) {
    if (!sharingType) return { add: 'sync', update: 'sync', remove: 'sync' }
    return sharingType === 'two-way'
      ? { add: 'sync', update: 'sync', remove: 'sync' }
      : { add: 'push', update: 'push', remove: 'push' }
  }
  if (!sharingType) return { update: 'sync', remove: 'revoke' }
  return sharingType === 'two-way'
    ? { update: 'sync', remove: 'revoke' }
    : { update: 'push', remove: 'revoke' }
}

const toRelationshipItem = item => {
  return {
    id: item._id,
    type: item._type
  }
}

export default SharingCollection
