import DocumentCollection, { normalizeDoc } from './DocumentCollection'
import { isFile, isDirectory } from './FileCollection'
import { uri } from './utils'

const normalizeSharing = sharing => normalizeDoc(sharing, 'io.cozy.sharings')

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
   *
   * Creates a new Sharing. See https://docs.cozy.io/en/cozy-stack/sharing/#post-sharings
   *
   * @param {object} params
   * @param {object} params.document The document to share
   * @param {string} params.description Description of the sharin
   * @param {string} params.previewPath The path (route) to see the preview
   * @param {Array} params.rules The rules defined to the sharing. See https://docs.cozy.io/en/cozy-stack/sharing-design/#description-of-a-sharing
   * @param {Array} params.recipients Recipients to add to the sharings (will have the same permissions given by the rules defined by the sharing )
   * @param {Array} params.readOnlyRecipients Recipients to add to the sharings with only read only access
   * @param {boolean} params.openSharing If someone else than the owner can add a recipient to the sharing
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
          recipients: getRecipientsPayload(recipients),
          read_only_recipients: getRecipientsPayload(readOnlyRecipients)
        }
      }
    })
    return { data: normalizeSharing(resp.data) }
  }

  /**
   * @deprecated Use create() instead
   * share - Creates a new sharing. See https://docs.cozy.io/en/cozy-stack/sharing/#post-sharings
   *
   * @param  {object} document The document to share. Should have and _id and a name.
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
   * @param {object} sharing Sharing Object
   * @param {Array} recipients Array of {id:1, type:"io.cozy.contacts"}
   * @param {string} sharingType Read and write: two-way. Other only read
   */
  async addRecipients(sharing, recipients, sharingType) {
    const recipientsPayload = {
      data: recipients.map(({ _id, _type }) => ({
        id: _id,
        type: _type
      }))
    }
    const resp = await this.stackClient.fetchJSON(
      'POST',
      uri`/sharings/${sharing._id}/recipients`,
      {
        data: {
          type: 'io.cozy.sharings',
          id: sharing._id,
          relationships:
            sharingType === 'two-way'
              ? {
                  recipients: recipientsPayload
                }
              : {
                  read_only_recipients: recipientsPayload
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
      `sharingType is deprecated and will be removed. We now set this default policy : ${
        isFile(document)
          ? getSharingRulesForFile(document)
          : getSharingRulesForPhotosAlbum(document)
      }} \n      
      If this default policy doesn't follow your need, please set custom rules 
      by using the 'rules' object of the SharingCollection.create() method`
    )
  }
  return isFile(document)
    ? [
        {
          title: document.name,
          doctype: 'io.cozy.files',
          values: [_id],
          ...getSharingPolicy(document, sharingType)
        }
      ]
    : [
        {
          title: 'collection',
          doctype: _type,
          values: [_id],
          ...getSharingPolicy(document, sharingType)
        },
        {
          title: 'items',
          doctype: 'io.cozy.files',
          values: [`${_type}/${_id}`],
          selector: 'referenced_by',
          ...(sharingType === 'two-way'
            ? { add: 'sync', update: 'sync', remove: 'sync' }
            : { add: 'push', update: 'none', remove: 'push' })
        }
      ]
}
// @deprecated sharingType is deprecated see getSharingRules for more details
const getSharingPolicy = (document, sharingType) => {
  if (isFile(document) && isDirectory(document)) {
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

const getRecipientsPayload = recipients => {
  const recipientsPayload = {
    data: recipients.map(({ _id, _type }) => ({
      id: _id,
      type: _type
    }))
  }
  return recipientsPayload
}
export default SharingCollection
