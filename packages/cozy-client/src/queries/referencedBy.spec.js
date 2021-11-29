import {
  isReferencedBy,
  isReferencedById,
  getReferencedBy,
  getReferencedById
} from './referencedBy'

const mockFile = {
  _id: '123',
  name: 'fakeFile',
  relationships: {
    referenced_by: {
      data: [
        {
          id: '123',
          type: 'io.cozy.contacts'
        },
        {
          id: '456',
          type: 'io.cozy.contacts'
        }
      ]
    }
  }
}
describe('referencedBy helpers', () => {
  describe('isReferencedBy', () => {
    it('should return "true"', () => {
      const result = isReferencedBy(mockFile, 'io.cozy.contacts')

      expect(result).toBe(true)
    })
    it('should return "false"', () => {
      const result = isReferencedBy(mockFile, 'io.cozy.xxx')

      expect(result).toBe(false)
    })
  })

  describe('isReferencedById', () => {
    it('should return "true"', () => {
      const result = isReferencedById(mockFile, 'io.cozy.contacts', '123')

      expect(result).toBe(true)
    })
    it('should return "false"', () => {
      const result = isReferencedById(mockFile, 'io.cozy.contacts', '789')

      expect(result).toBe(false)
    })
  })

  describe('getReferencedBy', () => {
    it('should return correct array of reference', () => {
      const result = getReferencedBy(mockFile, 'io.cozy.contacts')

      expect(result).toEqual([
        {
          id: '123',
          type: 'io.cozy.contacts'
        },
        {
          id: '456',
          type: 'io.cozy.contacts'
        }
      ])
    })
    it('should return empty array', () => {
      const result = getReferencedBy(mockFile, 'io.cozy.xxx')

      expect(result).toEqual([])
    })
  })

  describe('getReferencedById', () => {
    it('should return array of reference with only the reference with id "123"', () => {
      const result = getReferencedById(mockFile, 'io.cozy.contacts', '123')

      expect(result).toEqual([
        {
          id: '123',
          type: 'io.cozy.contacts'
        }
      ])
    })
    it('should return empty array', () => {
      const result = getReferencedById(mockFile, 'io.cozy.contacts', '789')

      expect(result).toEqual([])
    })
  })
})
