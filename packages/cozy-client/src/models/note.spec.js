import {
  generatePrivateUrl,
  fetchURL,
  generateReturnUrlToNotesIndex
} from './note'

// see https://remarkablemark.org/blog/2018/11/17/mock-window-location/
const { location } = window
function setLocation(url) {
  delete window.location
  window.location = url
}
function restoreLocation() {
  window.location = location
}

describe('note model', () => {
  it('should generate the right link to a note', () => {
    const noteDocument = {
      _id: 1,
      id: 1
    }
    const notesAppUrl = 'http://notes.cozy.tools/'

    expect(generatePrivateUrl(notesAppUrl, noteDocument)).toEqual(
      `http://notes.cozy.tools/#/n/${noteDocument._id}`
    )
  })

  describe('fetchURL', () => {
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
      const generatedUrl = await fetchURL(mockedClient, {
        id: 1
      })

      expect(generatedUrl.toString()).toEqual('https://foo-notes.mycozy/#/n/1')

      fetchURLspy.mockResolvedValue({
        data: {
          note_id: 1,
          protocol: 'https',
          instance: 'foo.mycozy',
          sharecode: 'hahaha'
        }
      })
      const generatedUrl2 = await fetchURL(mockedClient, {
        id: 1
      })

      expect(generatedUrl2.toString()).toEqual(
        'https://foo-notes.mycozy/public/?id=1&sharecode=hahaha#/'
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
      const generatedUrl3 = await fetchURL(mockedClient, {
        id: 1
      })

      expect(generatedUrl3.toString()).toEqual(
        'https://foo-notes.mycozy/public/?id=1&sharecode=hahaha&username=Crash#/'
      )
    })
  })

  describe('generatePrivateUrl', () => {
    it('should generate an URL with the returnkey', () => {
      const generatedUrl = generatePrivateUrl(
        'https://notes.cozy.foo',
        {
          id: 1,
          _id: 1
        },
        { returnUrl: 'https://drive.cozy.foo/#/folder/1' }
      )

      expect(generatedUrl.toString()).toEqual(
        'https://notes.cozy.foo/?returnUrl=https%3A%2F%2Fdrive.cozy.foo%2F%23%2Ffolder%2F1#/n/1'
      )
    })
  })
})

describe('generateReturnUrlToNotesIndex', () => {
  function createFetchUrl() {
    return jest.fn().mockImplementation(({ _id }) => ({
      data: {
        type: 'io.cozy.notes.url',
        id: _id,
        note_id: _id,
        subdomain: 'flat',
        protocol: 'https',
        instance: 'alice.cozy.example',
        public_name: 'Bob'
      }
    }))
  }

  function createClient() {
    return {
      getStackClient: () => ({
        collection: () => ({ fetchURL: createFetchUrl() })
      })
    }
  }

  function createNote(id = '12345') {
    return { id, type: 'io.cozy.files' }
  }

  afterEach(() => {
    restoreLocation()
  })

  it('returns an URL string', async () => {
    const client = createClient()
    const note = createNote()
    const urlString = await generateReturnUrlToNotesIndex(client, note)
    const url = new URL(urlString)
    expect(url.toString()).toEqual(urlString)
  })

  it('has a returnUrl key', async () => {
    const location = 'htt://google.com/index?param=value#hash'
    setLocation(location)
    const client = createClient()
    const note = createNote()
    const urlString = await generateReturnUrlToNotesIndex(client, note)
    const url = new URL(urlString)
    expect(url.searchParams.get('returnUrl')).toEqual(location)
  })
})
