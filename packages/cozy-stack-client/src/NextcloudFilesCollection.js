import DocumentCollection from './DocumentCollection'
import { forceDownload, joinPath } from './utils'
import { FetchError } from './errors'

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

  /**
   * Move a file inside a Nextcloud server
   *
   * @param {object} file - The file to move
   * @param {object} to - The destination path
   */
  async move(file, to) {
    const newPath = joinPath(to.path, file.name)
    const resp = await this.stackClient.fetch(
      'POST',
      `/remote/nextcloud/${file.cozyMetadata.sourceAccount}/move${file.path}?To=${newPath}`
    )
    if (resp.status === 204) {
      return resp
    }
    throw new FetchError(resp, resp.json())
  }

  /**
   * Move a file from a Nextcloud server to a Cozy
   *
   * @param {object} file - The file to move
   * @param {object} to - The destination folder
   *
   */
  async moveToCozy(file, to) {
    const resp = await this.stackClient.fetch(
      'POST',
      `/remote/nextcloud/${file.cozyMetadata.sourceAccount}/downstream${file.path}?To=${to._id}`
    )
    if (resp.status === 201) {
      return resp
    }
    throw new FetchError(resp, resp.json())
  }

  /**
   * Move a file from a Cozy to a Nextcloud server
   *
   * @param {object} file - The destination folder
   * @param {object} from - The file to move
   * @throws {FetchError}
   */
  async moveFromCozy(file, from) {
    const newPath = joinPath(file.path, from.name)
    const resp = await this.stackClient.fetch(
      'POST',
      `/remote/nextcloud/${file.cozyMetadata.sourceAccount}/upstream${newPath}?From=${from._id}`
    )
    if (resp.status === 204) {
      return resp
    }
    throw new FetchError(resp, resp.json())
  }
}

export { NextcloudFilesCollection, NEXTCLOUD_FILES_DOCTYPE }
