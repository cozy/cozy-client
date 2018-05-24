import DocumentCollection, { normalizeDoc } from './DocumentCollection'
import { uri } from './utils'

const normalizeSharing = sharing => ({
  ...normalizeDoc(sharing, 'io.cozy.sharings'),
  ...sharing.attributes
})

export default class SharingCollection extends DocumentCollection {
  async findByDoctype(doctype) {
    const resp = await this.client.fetch(
      'GET',
      uri`/sharings/doctype/${doctype}`
    )
    return {
      ...resp,
      data: resp.data.map(s => normalizeSharing(s))
    }
  }

  async share(document, recipients, sharingType, description) {
    const resp = await this.client.fetch('POST', '/sharings/', {
      data: {
        type: 'io.cozy.sharings',
        attributes: {
          description,
          rules: getRulesFor(document, sharingType)
        },
        relationships: {
          recipients: {
            data: recipients.map(({ id, _type }) => ({ id, type: _type }))
          }
        }
      }
    })
    return { data: normalizeSharing(resp.data) }
  }

  revokeRecipient(sharingId, recipientIndex) {
    return this.client.fetch(
      'DELETE',
      uri`/sharings/${sharingId}/recipients/${recipientIndex}`
    )
  }
}

const isFile = ({ _type, type }) =>
  _type === 'io.cozy.files' || type === 'directory' || type === 'file'

const isDirectory = ({ type }) => type === 'directory'

const getBehaviorsFor = (document, sharingType) => {
  if (isFile(document) && isDirectory(document)) {
    return sharingType === 'two-way'
      ? { add: 'sync', update: 'sync', remove: 'sync' }
      : { add: 'none', update: 'none', remove: 'revoke' }
  }
  return sharingType === 'two-way'
    ? { update: 'sync', remove: 'sync' }
    : { update: 'none', remove: 'revoke' }
}

const getRulesFor = (document, sharingType) => {
  const { _id, _type } = document
  return isFile(document)
    ? [
        {
          // title: isDirectory(document) ? 'directory' : 'file',
          title: document.name,
          doctype: 'io.cozy.files',
          values: [_id],
          ...getBehaviorsFor(document, sharingType)
        }
      ]
    : [
        {
          title: 'collection',
          doctype: _type,
          values: [_id],
          ...getBehaviorsFor(document, sharingType)
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
