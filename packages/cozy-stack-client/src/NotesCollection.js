import DocumentCollection from './DocumentCollection'
import { uri } from './utils'

export const NOTES_DOCTYPE = 'io.cozy.notes'

const normalizeDoc = DocumentCollection.normalizeDoctypeJsonApi(NOTES_DOCTYPE)
const normalizeNote = note => ({
  ...normalizeDoc(note),
  ...note.attributes
})

/**
 * Implements `DocumentCollection` API to interact with the /notes endpoint of the stack
 */
class NotesCollection extends DocumentCollection {
  constructor(stackClient) {
    super(NOTES_DOCTYPE, stackClient)
  }

  /**
   * all - Fetches all notes
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
   * destroy - Destroys the note on the server
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
}

NotesCollection.normalizeDoctype = DocumentCollection.normalizeDoctypeJsonApi

export default NotesCollection
