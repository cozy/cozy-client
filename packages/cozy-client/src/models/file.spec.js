import { file } from './'
describe('File Model', () => {
  it('should test if a file is a note or not', () => {
    const fileDocument = {
      type: 'file',
      _id: 1
    }
    expect(file.isNote(fileDocument)).toBe(false)
    const note = {
      type: 'file',
      name: 'test.cozy-note',
      metadata: {
        content: 'content',
        schema: [],
        title: 'title',
        version: 1
      }
    }
    expect(file.isNote(note)).toBe(true)
    const note2 = {
      type: 'file',
      name: 'test.cozy-note',
      metadata: {
        content: 'content',
        schema: [],
        title: '',
        version: 0
      }
    }
    expect(file.isNote(note2)).toBe(true)
  })

  describe('normalizeFile', () => {
    const id = 'uuid123'
    const type = 'io.cozy.files'

    it('should allow both `id` and `_id`', () => {
      const doc = { id, type }
      expect(file.normalize(doc)._id).toBe(id)

      const _doc = { _id: id, type }
      expect(file.normalize(_doc)._id).toBe(id)
    })

    it('should allow both `type` and `_type`', () => {
      const doc = { id, type }
      expect(file.normalize(doc)._type).toBe(type)

      const _doc = { id, _type: type }
      expect(file.normalize(_doc)._type).toBe(type)
    })

    it('should default to "io.cozy.files"', () => {
      const doc = { id }
      expect(file.normalize(doc)._type).toBe('io.cozy.files')
    })

    it('should define the path if parent is provided', () => {
      const doc = { id, name: 'myfile.ext' }
      const parent = { path: '/my/path' }
      expect(file.normalize(doc, parent).path).toBe('/my/path/myfile.ext')
    })

    it('should not require a `parent` parameter', () => {
      const doc = { id, type }
      expect(file.normalize(doc)._id).toBe(id)
    })

    it('should not buid a `path` if the `parent`lacks one', () => {
      const doc = { id, type }
      expect(file.normalize(doc, doc).path).toBeUndefined()
    })
  })
})
