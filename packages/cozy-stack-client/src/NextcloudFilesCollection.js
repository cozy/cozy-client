import DocumentCollection from './DocumentCollection'
import { forceDownload } from './utils'

const NEXTCLOUD_FILES_DOCTYPE = 'io.cozy.remote.nextcloud.files'

const normalizeDoc = DocumentCollection.normalizeDoctypeJsonApi(
  NEXTCLOUD_FILES_DOCTYPE
)
const normalizeNextcloudFile = (sourceAccount, path) => file => {
  const extendedAttributes = {
    ...file.attributes,
    path: `${path}${path.endsWith('/') ? '' : '/'}${file.attributes.name}`,
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
    if (selector.sourceAccount && selector.path) {
      const resp = await this.stackClient.fetchJSON(
        'GET',
        `/remote/nextcloud/${selector.sourceAccount}/${selector.path}`
      )

      return {
        data: resp.data.map(
          normalizeNextcloudFile(selector.sourceAccount, selector.path)
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
      `/remote/nextcloud/${file.cozyMetadata.sourceAccount}/${file.path}?Dl=1`
    )
    const blob = await res.blob()
    const href = URL.createObjectURL(blob)
    const filename = file.path.split('/').pop()
    forceDownload(href, filename)
  }
}

export { NextcloudFilesCollection, NEXTCLOUD_FILES_DOCTYPE }
