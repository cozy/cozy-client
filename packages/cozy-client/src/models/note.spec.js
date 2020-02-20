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

  describe('fetchUrlToOpenANote', () => {
    it('should build the right url from the stack response', async () => {
      const fetchURLspy = jest.fn()
      const mockedClient = {
        getStackClient: () => ({
          collection: name => ({
            fetchURL: fetchURLspy
          })
        })
      }
      fetchURLspy.mockResolvedValue({
        data: { note_id: 1, protocol: 'https', instance: 'foo.mycozy' }
      })
      const generatedUrl = await note.fetchUrlToOpenANote(mockedClient, {
        id: 1
      })

      expect(generatedUrl.toString()).toEqual(
        'https://foo-notes.mycozy/?id=1#/n/1'
      )

      fetchURLspy.mockResolvedValue({
        data: {
          note_id: 1,
          protocol: 'https',
          instance: 'foo.mycozy',
          sharecode: 'hahaha'
        }
      })
      const generatedUrl2 = await note.fetchUrlToOpenANote(mockedClient, {
        id: 1
      })

      expect(generatedUrl2.toString()).toEqual(
        'https://foo-notes.mycozy/public/?id=1&sharecode=hahaha#/n/1'
      )

      fetchURLspy.mockResolvedValue({
        data: {
          note_id: 1,
          protocol: 'https',
          instance: 'foo.mycozy',
          sharecode: 'hahaha',
          public_name: 'Crash'
        }
      })
      const generatedUrl3 = await note.fetchUrlToOpenANote(mockedClient, {
        id: 1
      })

      expect(generatedUrl3.toString()).toEqual(
        'https://foo-notes.mycozy/public/?id=1&sharecode=hahaha&username=Crash#/n/1'
      )
    })
  })

  describe('generateUrlForNoteWithReturnUrl', () => {
    it('should generate an URL with the returnkey', () => {
      const generatedUrl = note.generateUrlForNoteWithReturnUrl(
        'https://notes.cozy.foo',
        {
          id: 1,
          _id: 1
        },
        'https://drive.cozy.foo/#/folder/1'
      )

      expect(generatedUrl.toString()).toEqual(
        'https://notes.cozy.foo/?returnUrl=https%3A%2F%2Fdrive.cozy.foo%2F%23%2Ffolder%2F1#/n/1'
      )
    })
  })
})
