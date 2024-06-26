import DocumentCollection from './DocumentCollection'
import { forceDownload, joinPath, encodePath } from './utils'
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
        `/remote/nextcloud/${
          selector['cozyMetadata.sourceAccount']
        }${encodePath(selector.parentPath)}`
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
   *  Move a file to the trash
   *
   * @param {object} file - The `io.cozy.remote.nextcloud.files` file to move to the trash
   * @returns {Promise<object>}
   * @throws {FetchError}
   */
  async destroy(file) {
    const resp = await this.stackClient.fetch(
      'DELETE',
      `/remote/nextcloud/${file.cozyMetadata.sourceAccount}${encodePath(
        file.path
      )}`
    )
    if (resp.status === 204) {
      return resp
    }
    throw new FetchError(resp, resp.json())
  }

  /**
   * Move to the trash multiple files
   *
   * @param {object[]} files - `io.cozy.remote.nextcloud.files` files to move to the trash
   * @returns {Promise<any>}
   * @throws {FetchError}
   */
  async destroyAll(files) {
    for (const file of files) {
      await this.destroy(file)
    }
  }

  /**
   * Download a file from a Nextcloud server
   *
   * @param {object} file - The `io.cozy.remote.nextcloud.files` file to download
   */
  async download(file) {
    const res = await this.stackClient.fetch(
      'GET',
      `/remote/nextcloud/${file.cozyMetadata.sourceAccount}${encodePath(
        file.path
      )}?Dl=1`
    )
    const blob = await res.blob()
    const href = URL.createObjectURL(blob)
    const filename = file.path.split('/').pop()
    forceDownload(href, filename)
  }

  /**
   * Move a file inside a Nextcloud server
   *
   * @param {object} file - The `io.cozy.remote.nextcloud.files` file to move
   * @param {object} to - The `io.cozy.remote.nextcloud.files` folder to move the file to
   */
  async move(file, to) {
    const newPath = joinPath(to.path, file.name)
    const resp = await this.stackClient.fetch(
      'POST',
      `/remote/nextcloud/${file.cozyMetadata.sourceAccount}/move${encodePath(
        file.path
      )}?To=${encodePath(newPath)}`
    )
    if (resp.status === 204) {
      return resp
    }
    throw new FetchError(resp, resp.json())
  }

  /**
   * Move a file from a Nextcloud server to a Cozy
   *
   * @param {object} file - The `io.cozy.remote.nextcloud.files` file to move
   * @param {object} to - The `io.cozy.files` folder to move the file to
   *
   */
  async moveToCozy(file, to) {
    const resp = await this.stackClient.fetch(
      'POST',
      `/remote/nextcloud/${
        file.cozyMetadata.sourceAccount
      }/downstream${encodePath(file.path)}?To=${to._id}`
    )
    if (resp.status === 201) {
      return resp
    }
    throw new FetchError(resp, resp.json())
  }

  /**
   * Move a file from a Cozy to a Nextcloud server
   *
   * @param {object} file - The `io.cozy.remote.nextcloud.files` folder to move the file to
   * @param {object} from - The `io.cozy.files` file to move
   * @throws {FetchError}
   */
  async moveFromCozy(file, from) {
    const newPath = joinPath(file.path, from.name)
    const resp = await this.stackClient.fetch(
      'POST',
      `/remote/nextcloud/${
        file.cozyMetadata.sourceAccount
      }/upstream${encodePath(newPath)}?From=${from._id}`
    )
    if (resp.status === 204) {
      return resp
    }
    throw new FetchError(resp, resp.json())
  }
}

export { NextcloudFilesCollection, NEXTCLOUD_FILES_DOCTYPE }
