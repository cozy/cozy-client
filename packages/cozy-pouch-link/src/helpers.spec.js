import helpers from './helpers'
const { isDeletedDocument, isDesignDocument, normalizeFindSelector } = helpers

describe('Helpers', () => {
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

  describe('normalizeFindSelector', () => {
    it('should add indexed fields in the selector if they are missing', () => {
      const selector = {
        SOME_FIELD: { $gt: null }
      }
      const sort = undefined
      const indexedFields = ['SOME_INDEXED_FIELD']

      const findSelector = normalizeFindSelector({
        selector,
        sort,
        indexedFields
      })
      expect(findSelector).toStrictEqual({
        SOME_FIELD: { $gt: null },
        SOME_INDEXED_FIELD: { $gt: null }
      })
    })

    it('should add sorted fields in the selector if they are missing', () => {
      const selector = {}
      const sort = [{ SOME_SORTED_FIELD: 'asc' }]
      const indexedFields = undefined

      const findSelector = normalizeFindSelector({
        selector,
        sort,
        indexedFields
      })
      expect(findSelector).toStrictEqual({
        SOME_SORTED_FIELD: { $gt: null }
      })
    })

    it('should add indexed fields AND sorted fields in the selector if they are missing', () => {
      const selector = undefined
      const sort = [{ SOME_SORTED_FIELD: 'asc' }]
      const indexedFields = ['SOME_INDEXED_FIELD']

      const findSelector = normalizeFindSelector({
        selector,
        sort,
        indexedFields
      })
      expect(findSelector).toStrictEqual({
        SOME_INDEXED_FIELD: { $gt: null },
        SOME_SORTED_FIELD: { $gt: null }
      })
    })

    it('should prevent empty selector by adding a selector on _id when no selector is provided', () => {
      const selector = undefined
      const sort = undefined
      const indexedFields = undefined

      const findSelector = normalizeFindSelector({
        selector,
        sort,
        indexedFields
      })
      expect(findSelector).toStrictEqual({ _id: { $gt: null } })
    })

    it('should not add selector on _id when no selector is provided but there are some indexed fields', () => {
      const selector = undefined
      const sort = undefined
      const indexedFields = ['SOME_INDEXED_FIELD']

      const findSelector = normalizeFindSelector({
        selector,
        sort,
        indexedFields
      })
      expect(findSelector).toStrictEqual({
        SOME_INDEXED_FIELD: { $gt: null }
      })
    })
  })
})
