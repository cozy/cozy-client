import DocumentCollection from './DocumentCollection'
import { uri } from './utils'

export const NOTES_DOCTYPE = 'io.cozy.notes'
export const NOTES_URL_DOCTYPE = 'io.cozy.notes.url'

const normalizeDoc = DocumentCollection.normalizeDoctypeJsonApi(NOTES_DOCTYPE)
const normalizeNote = note => ({
  ...normalizeDoc(note),
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
}

NotesCollection.normalizeDoctype = DocumentCollection.normalizeDoctypeJsonApi

export default NotesCollection
