import DocumentCollection, {
  normalizeDoctypeJsonApi
} from './DocumentCollection'
import { uri } from './utils'
import { getIllegalCharacters } from './getIllegalCharacter'

export const SHORTCUTS_DOCTYPE = 'io.cozy.files.shortcuts'

const normalizeShortcutsJsonApi = normalizeDoctypeJsonApi(SHORTCUTS_DOCTYPE)

const normalizeShortcuts = doc => {
  return {
    ...normalizeShortcutsJsonApi(doc),
    _id: doc._id // Ensures that the _id replaces by _id inside attributes
  }
}

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
      data: normalizeShortcuts(resp.data)
    }
  }

  async get(id) {
    const path = uri`/shortcuts/${id}`
    const resp = await this.stackClient.fetchJSON('GET', path)
    return {
      data: normalizeShortcuts(resp.data)
    }
  }
}

ShortcutsCollection.normalizeDoctype =
  DocumentCollection.normalizeDoctypeJsonApi

export default ShortcutsCollection
