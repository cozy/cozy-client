import DocumentCollection from './DocumentCollection'
import { uri } from './utils'
import { getIllegalCharacters } from './getIllegalCharacter'

export const SHORTCUTS_DOCTYPE = 'io.cozy.files.shortcuts'

class ShortcutsCollection extends DocumentCollection {
  constructor(stackClient) {
    super(SHORTCUTS_DOCTYPE, stackClient)
  }
  /**
   * Create a shortcut
   *
   * @param {object} attributes shortcut's attributes
   * @param {string} attributes.name Filename
   * @param {string} attributes.url Shortcut's URL
   * @param {string} attributes.dir_id dir_id where to create the shortcut
   * @param {string} attributes.type TODO
   * @throws {Error} - explaining reason why creation failed
   */
  async create(attributes) {
    if (!attributes.type) {
      attributes.type = SHORTCUTS_DOCTYPE
    }
    if (
      !attributes.name ||
      !attributes.name.trim() ||
      !attributes.url ||
      !attributes.dir_id
    ) {
      throw new Error(
        'you need at least a name, an url and a dir_id attributes to create a shortcut'
      )
    }
    const name = attributes.name.trim()
    if (name === '.' || name === '..') {
      throw new Error(`Invalid filename: ${name}`)
    }
    const illegalCharacters = getIllegalCharacters(name)
    if (illegalCharacters.length) {
      throw new Error(
        `Invalid filename containing illegal character(s): ${illegalCharacters}`
      )
    }
    const path = uri`/shortcuts`
    const resp = await this.stackClient.fetchJSON('POST', path, {
      data: {
        attributes,
        type: 'io.cozy.files.shortcuts'
      }
    })
    return {
      data: DocumentCollection.normalizeDoctypeJsonApi(SHORTCUTS_DOCTYPE)(
        resp.data,
        resp
      )
    }
  }

  async get(id) {
    const path = uri`/shortcuts/${id}`
    const resp = await this.stackClient.fetchJSON('GET', path)
    return {
      data: DocumentCollection.normalizeDoctypeJsonApi(SHORTCUTS_DOCTYPE)(
        resp.data,
        resp
      )
    }
  }
}

ShortcutsCollection.normalizeDoctype =
  DocumentCollection.normalizeDoctypeJsonApi

export default ShortcutsCollection
