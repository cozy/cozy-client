import DocumentCollection from './DocumentCollection'
import { forceDownload, joinPath } from './utils'

const NEXTCLOUD_FILES_DOCTYPE = 'io.cozy.remote.nextcloud.files'

const normalizeDoc = DocumentCollection.normalizeDoctypeJsonApi(
  NEXTCLOUD_FILES_DOCTYPE
)
const normalizeNextcloudFile = (sourceAccount, parentPath) => file => {
  const extendedAttributes = {
    ...file.attributes,
    parentPath,
    path: joinPath(parentPath, file.attributes.name),
    cozyMetadata: {
      ...file.attributes.cozyMetadata,
      sourceAccount
    }
  }

  return {
    ...normalizeDoc(file, NEXTCLOUD_FILES_DOCTYPE),
    ...extendedAttributes
  }
}

class NextcloudFilesCollection extends DocumentCollection {
  constructor(stackClient) {
    super(NEXTCLOUD_FILES_DOCTYPE, stackClient)
  }

  async find(selector) {
    if (selector['cozyMetadata.sourceAccount'] && selector.parentPath) {
      const resp = await this.stackClient.fetchJSON(
        'GET',
        `/remote/nextcloud/${selector['cozyMetadata.sourceAccount']}${
          selector.parentPath
        }`
      )

      return {
        data: resp.data.map(
          normalizeNextcloudFile(
            selector['cozyMetadata.sourceAccount'],
            selector.parentPath
          )
        )
      }
    }
    throw new Error('Not implemented')
  }

  /**
   * Download a file from a Nextcloud server
   *
   */
  async download(file) {
    const res = await this.stackClient.fetch(
      'GET',
      `/remote/nextcloud/${file.cozyMetadata.sourceAccount}${file.path}?Dl=1`
    )
    const blob = await res.blob()
    const href = URL.createObjectURL(blob)
    const filename = file.path.split('/').pop()
    forceDownload(href, filename)
  }
}

export { NextcloudFilesCollection, NEXTCLOUD_FILES_DOCTYPE }
