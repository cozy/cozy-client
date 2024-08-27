import helpers from './helpers'
const {
  withoutDesignDocuments,
  isDeletedDocument,
  isDesignDocument,
  normalizeFindSelector
} = helpers

import PouchDB from 'pouchdb-browser'
import PouchDBFind from 'pouchdb-find'
import adapter from 'pouchdb-adapter-memory'
PouchDB.plugin(PouchDBFind)
PouchDB.plugin(adapter)

const insertData = async (db, number) => {
  const docs = []
  for (let i = 0; i < number; i++) {
    docs.push({ _id: `doc${i}`, status: true })
  }
  await db.bulkDocs(docs)
}

describe('Helpers', () => {
  describe('withoutDesignDocuments', () => {
    let response
    beforeEach(() => {
      response = {
        offset: 0,
        rows: [{ id: 'goodId' }, { id: '_design/wrongId' }],
        total_rows: 2
      }
      jest.setTimeout(10000)
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
    it('should not mutate response', () => {
      const responseCopy = { ...response }
      withoutDesignDocuments(response)
      expect(response).toEqual(responseCopy)
    })
  })

  for (const getDocs of ['find', 'allDocs']) {
    describe(getDocs, () => {
      let db, options, field

      beforeEach(async () => {
        db = new PouchDB('test', { adapter: 'memory' })
        if (getDocs === 'find') {
          options = { selector: { status: { $eq: true } } }
          await db.createIndex({ index: { fields: ['status'] } })
          field = 'docs'
        } else {
          options = {}
          field = 'rows'
        }
      })

      afterEach(async () => {
        await db.destroy()
      })

      it('should find 200 docs', async () => {
        await insertData(db, 200)
        const data = await helpers[getDocs](db, options)
        expect(data[field]).toHaveLength(200)
      })

      it('should find 20 docs with limit', async () => {
        await insertData(db, 200)
        const data = await helpers[getDocs](db, { ...options, limit: 20 })
        expect(data[field]).toHaveLength(20)
      })

      it('should find 2000 docs', async () => {
        jest.spyOn(helpers, 'isAdapterBugged').mockReturnValue(true)
        jest.spyOn(db, getDocs)
        await insertData(db, 2000)
        const data = await helpers[getDocs](db, options)
        expect(data[field]).toHaveLength(2000)
        expect(db[getDocs]).toHaveBeenCalledTimes(3)
      })

      it('should find 1000 docs', async () => {
        jest.spyOn(helpers, 'isAdapterBugged').mockReturnValue(true)
        jest.spyOn(db, getDocs)
        await insertData(db, 2000)
        const data = await helpers[getDocs](db, { ...options, limit: 1000 })
        expect(data[field]).toHaveLength(1000)
        expect(db[getDocs]).toHaveBeenCalledTimes(2)
      })
    })
  }

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
      const indexedFields = ['SOME_INDEXED_FIELD']

      const findSelector = normalizeFindSelector(selector, indexedFields)
      expect(findSelector).toStrictEqual({
        SOME_FIELD: { $gt: null },
        SOME_INDEXED_FIELD: { $gt: null }
      })
    })

    it('should prevent empty selector by adding a selector on _id when no selector is provided', () => {
      const selector = undefined
      const indexedFields = undefined

      const findSelector = normalizeFindSelector(selector, indexedFields)
      expect(findSelector).toStrictEqual({ _id: { $gt: null } })
    })

    it('should not add selector on _id when no selector is provided but there are some indexed fields', () => {
      const selector = undefined
      const indexedFields = ['SOME_INDEXED_FIELD']

      const findSelector = normalizeFindSelector(selector, indexedFields)
      expect(findSelector).toStrictEqual({
        SOME_INDEXED_FIELD: { $gt: null }
      })
    })
  })
})
