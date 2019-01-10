import helpers from './helpers'
const { find, isDeletedDocument, isDesignDocument } = helpers

import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'
import adapter from 'pouchdb-adapter-memory'
PouchDB.plugin(PouchDBFind)
PouchDB.plugin(adapter)

const insertData = async (db, number) => {
  const docs = []
  for (let i = 0; i < number; i++) {
    docs.push({ _id: `doc${i}` })
  }
  await db.bulkDocs(docs)
}

describe('Helpers', () => {
  describe('find', () => {
    let db

    beforeEach(async () => {
      db = new PouchDB('test', { adapter: 'memory' })
    })

    afterEach(async () => {
      await db.destroy()
    })

    it('should find 200 docs', async () => {
      await insertData(db, 200)
      const data = await find(db)
      expect(data.docs).toHaveLength(200)
    })

    it('should find 20 docs with limit', async () => {
      await insertData(db, 200)
      const data = await find(db, { limit: 20 })
      expect(data.docs).toHaveLength(20)
    })

    it('should find 2000 docs', async () => {
      jest.spyOn(helpers, 'isTheCurrentAdapterIsBugged').mockReturnValue(true)
      jest.spyOn(db, 'find')
      await insertData(db, 2000)
      const data = await find(db)
      expect(data.docs).toHaveLength(2000)
      expect(db.find).toHaveBeenCalledTimes(3)
    })

    it('should find 1000 docs', async () => {
      jest.spyOn(helpers, 'isTheCurrentAdapterIsBugged').mockReturnValue(true)
      jest.spyOn(db, 'find')
      await insertData(db, 2000)
      const data = await helpers.find(db, { limit: 1000 })
      expect(data.docs).toHaveLength(1000)
      expect(db.find).toHaveBeenCalledTimes(2)
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
