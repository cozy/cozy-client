import {
  withoutDesignDocuments,
  isDesignDocument,
  isDeletedDocument
} from './helpers.js'

describe('Helpers', () => {
  describe('withoutDesignDocuments', () => {
    let response
    beforeEach(() => {
      response = {
        offset: 0,
        rows: [{ id: 'goodId' }, { id: '_design/wrongId' }],
        total_rows: 2
      }
    })
    it('should remove design document', () => {
      const filteredResponse = withoutDesignDocuments(response)
      expect(filteredResponse.rows.length).toEqual(1)
      expect(filteredResponse.rows[0].id).toEqual('goodId')
    })
    it('should update total rows number', () => {
      const filteredResponse = withoutDesignDocuments(response)
      expect(filteredResponse.total_rows).toEqual(1)
    })
    it('should not mute response', () => {
      const responseCopy = { ...response }
      withoutDesignDocuments(response)
      expect(response).toEqual(responseCopy)
    })
  })

  describe('isDesignDocument', () => {
    it('should return true when given a design document', () => {
      expect(isDesignDocument({ _id: '_design/something' })).toBe(true)
    })

    it('should return false when given a non design document', () => {
      expect(isDesignDocument({ _id: 'something' })).toBe(false)
    })
  })

  describe('isDeletedDocument', () => {
    it('should return true when given a deleted document', () => {
      expect(isDeletedDocument({ _deleted: true })).toBe(true)
    })

    it('should return false when given a non deleted document', () => {
      expect(isDeletedDocument({ _id: 'notdeleted' })).toBeFalsy()
    })
  })
})
