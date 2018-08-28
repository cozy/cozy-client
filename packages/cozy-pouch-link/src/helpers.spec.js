import { withoutDesignDocuments } from './helpers.js'

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
})
