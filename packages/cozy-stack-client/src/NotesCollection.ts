import DocumentCollection from './DocumentCollection'
import { uri } from './utils'
import { getDefaultSchema as modelDefaultSchema } from './NotesSchema'
export const NOTES_DOCTYPE = 'io.cozy.notes'
export const NOTES_URL_DOCTYPE = 'io.cozy.notes.url'

const normalizeDoc = DocumentCollection.normalizeDoctypeJsonApi(NOTES_DOCTYPE)
const normalizeNote = note => ({
  ...normalizeDoc(note, NOTES_DOCTYPE),
  ...note.attributes
})

const normalizeNoteUrl = noteUrl => ({
  ...DocumentCollection.normalizeDoctypeJsonApi(NOTES_URL_DOCTYPE)(noteUrl),
  ...noteUrl.attributes
})

/**
 * Implements `DocumentCollection` API to interact with the /notes endpoint of the stack
 */
class NotesCollection extends DocumentCollection {
  constructor(stackClient) {
    super(NOTES_DOCTYPE, stackClient)
  }

  /**
   * Fetches all notes
   *
   * @returns {{data, links, meta}} The JSON API conformant response.
   */
  async all() {
    //TODO: add support for pagination
    const resp = await this.stackClient.fetchJSON('GET', '/notes')

    return {
      ...resp,
      data: resp.data.map(normalizeNote)
    }
  }

  /**
   * Destroys the note on the server
   *
   * @param {io.cozy.notes} note     The note document to destroy
   * @param {string}   note._id The note's id
   *
   * @returns {{ data }} The deleted note
   */
  async destroy({ _id }) {
    // io.cozy.notes are in fact io.cozy.files, but with a special endpoint. However there is no dedicated route to delete a note, so we use the /files endpoint.
    const resp = await this.stackClient.fetchJSON('DELETE', uri`/files/${_id}`)
    return {
      data: { ...normalizeNote(resp.data), _deleted: true }
    }
  }
  /**
   * Create a note
   *
   * @param {object} option
   * @param {string} option.dir_id dir_id where to create the note
   * @returns {{data, links, meta}} The JSON API conformant response.
   */
  async create({ dir_id }) {
    const resp = await this.stackClient.fetchJSON('POST', '/notes', {
      data: {
        type: 'io.cozy.notes.documents',
        attributes: {
          title: '',
          schema: modelDefaultSchema(),
          dir_id
        }
      }
    })
    return {
      ...resp,
      data: normalizeNote(resp.data)
    }
  }

  /**
   * Returns the details to build the note's url
   *
   * @see https://github.com/cozy/cozy-stack/blob/master/docs/notes.md#get-notesidopen
   *
   * @param {io.cozy.notes} note The note document to open
   * @param {string}   note._id The note's id
   *
   * @returns {{ data }} The note's url details
   */
  async fetchURL({ _id }) {
    const resp = await this.stackClient.fetchJSON(
      'GET',
      uri`/notes/${_id}/open`
    )
    return {
      data: normalizeNoteUrl(resp.data)
    }
  }
  /**
   * Returns promise mirror schema for a note
   *
   * @returns {object} schema
   */
  getDefaultSchema() {
    return modelDefaultSchema()
  }
}

NotesCollection.normalizeDoctype = DocumentCollection.normalizeDoctypeJsonApi

export default NotesCollection
