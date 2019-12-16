import { note } from './'
describe('note model', () => {
  it('should generate the right link to a note', () => {
    const noteDocument = {
      _id: 1,
      id: 1
    }
    const notesAppUrl = 'http://notes.cozy.tools/'

    expect(note.generateUrlForNote(notesAppUrl, noteDocument)).toEqual(
      `http://notes.cozy.tools/#/n/${noteDocument._id}`
    )
  })
})
