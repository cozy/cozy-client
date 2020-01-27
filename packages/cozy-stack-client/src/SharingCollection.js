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
   * share - Creates a new sharing. See https://docs.cozy.io/en/cozy-stack/sharing/#post-sharings
   *
   * @param  {object} document The document to share. Should have and _id and a name.
   * @param  {Array} recipients A list of io.cozy.contacts
   * @param  {string} sharingType
   * @param  {string} description
   * @param  {string=} previewPath Relative URL of the sharings preview page
   */
  async share(
    document,
    recipients,
    sharingType,
    description,
    previewPath = null
  ) {
    const resp = await this.stackClient.fetchJSON('POST', '/sharings/', {
      data: {
        type: 'io.cozy.sharings',
        attributes: {
          description,
          preview_path: previewPath,
          open_sharing: sharingType === 'two-way',
          rules: getSharingRules(document, sharingType)
        },
        relationships: {
          recipients: {
            data: recipients.map(({ _id, _type }) => ({ id: _id, type: _type }))
          }
        }
      }
    })
    return { data: normalizeSharing(resp.data) }
  }

  /**
   * getDiscoveryLink - Returns the URL of the page that can be used to accept a sharing. See https://docs.cozy.io/en/cozy-stack/sharing/#get-sharingssharing-iddiscovery
   *
   * @param  {string} sharingId
   * @param  {string} sharecode
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
// See https://github.com/cozy/cozy-stack/blob/master/docs/sharing-design.md#description-of-a-sharing
const getSharingRules = (document, sharingType) => {
  const { _id, _type } = document
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

const getSharingPolicy = (document, sharingType) => {
  if (isFile(document) && isDirectory(document)) {
    return sharingType === 'two-way'
      ? { add: 'sync', update: 'sync', remove: 'sync' }
      : { add: 'push', update: 'push', remove: 'push' }
  }
  return sharingType === 'two-way'
    ? { update: 'sync', remove: 'revoke' }
    : { update: 'push', remove: 'revoke' }
}

export default SharingCollection
