import 'fake-indexeddb/auto'
import { findData } from './getDocs'

let db
let store

global.structuredClone = val => JSON.parse(JSON.stringify(val))

const openDB = async (dbName, version) => {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(dbName, version)
    req.onsuccess = event => {
      const db = req.result
      resolve(db)
    }
    // This event is only implemented in recent browsers
    req.onupgradeneeded = event => {
      // Save the IDBDatabase interface
      const db = event.target.result

      // Create an objectStore for this database
      const store = db.createObjectStore('files', { keyPath: 'id' })
      store.createIndex('by_type', 'type')
      store.createIndex('by_size', 'size')
      store.createIndex('by_tags', 'tags')
      store.createIndex('by_type_and_size', ['type', 'size'])
      store.createIndex('by_type_and_size_and_name', ['type', 'size', 'name'])
    }
  })
}

describe('mangoToIDB', () => {
  beforeEach(async () => {
    db = await openDB('TestDB', '1')

    const docs = [
      { id: '1', type: 'pdf', size: 5000, name: 'docA', tags: ['work'] },
      { id: '2', type: 'pdf', size: 2000, name: 'docB' },
      { id: '3', type: 'doc', size: 7000, name: 'docC', tags: ['home'] },
      { id: '4', type: 'xls', size: 300, name: 'docD' },
      { id: '5', type: 'pdf', size: 1200, name: 'docE', tags: null }
    ]

    const tx = db.transaction('files', 'readwrite')
    store = tx.objectStore('files')
    for (const doc of docs) {
      store.put(doc)
    }
    await tx.done
  })

  afterEach(async () => {
    db.close()
    await indexedDB.deleteDatabase('TestDB')
  })

  it('should handle empty selector', async () => {
    const docs = await findData(store, {
      selector: {},
      indexedFields: null
    })
    expect(docs.map(d => d.id).sort()).toEqual(['1', '2', '3', '4', '5'])
  })

  it('should handle explicit $eq', async () => {
    const index = store.index('by_type')
    const docs = await findData(index, {
      selector: { type: { $eq: 'pdf' } },
      indexedFields: ['type']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['1', '2', '5'])
  })

  it('should handle implicit $eq', async () => {
    const index = store.index('by_type')
    const docs = await findData(index, {
      selector: { type: 'pdf' },
      indexedFields: ['type']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['1', '2', '5'])
  })

  it('should handle $gt', async () => {
    const index = store.index('by_size')
    const docs = await findData(index, {
      selector: { size: { $gt: 2000 } },
      indexedFields: ['size']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['1', '3'])
  })

  it('should handle $gt null', async () => {
    const index = store.index('by_size')
    const docs = await findData(index, {
      selector: { size: { $gt: null } },
      indexedFields: ['size']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['1', '2', '3', '4', '5'])
  })

  it('should handle $gt null on multiple attributes', async () => {
    const index = store.index('by_type_and_size')
    const docs = await findData(index, {
      selector: { type: { $gt: null }, size: { $gt: null } },
      indexedFields: ['type', 'size']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['1', '2', '3', '4', '5'])
  })

  it('should handle $gt null among multiple attributes', async () => {
    const index = store.index('by_type_and_size')
    const docs = await findData(index, {
      selector: { type: { $gt: null }, size: { $eq: 2000 } },
      indexedFields: ['type', 'size']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['2'])
  })

  it('should handle $lt', async () => {
    const index = store.index('by_size')
    const docs = await findData(index, {
      selector: { size: { $lt: 2000 } },
      indexedFields: ['size']
    })
    expect(docs.map(d => d.id)).toEqual(['4', '5'])
  })

  it('should handle $and explicit', async () => {
    const index = store.index('by_size')
    const docs = await findData(index, {
      selector: {
        $and: [{ size: { $lte: 5000 } }, { size: { $gt: 1000 } }]
      },
      indexedFields: ['size']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['1', '2', '5'])
  })

  it('should handle $and implicit', async () => {
    const index = store.index('by_size')
    const docs = await findData(index, {
      selector: {
        size: { $gt: 1000, $lte: 5000 }
      },
      indexedFields: ['size']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['1', '2', '5'])
  })

  it('should handle multiple range conditions on same attribute', async () => {
    const index = store.index('by_size')
    let docs = await findData(index, {
      selector: {
        size: { $gt: 300, $lt: 2000 }
      },
      indexedFields: ['size']
    })
    expect(docs.map(d => d.id)).toEqual(['5'])

    docs = await findData(index, {
      selector: {
        size: { $gt: 300, $lte: 2000 }
      },
      indexedFields: ['size']
    })
    expect(docs.map(d => d.id)).toEqual(['5', '2'])

    docs = await findData(index, {
      selector: {
        size: { $gte: 300, $lte: 2000 }
      },
      indexedFields: ['size']
    })
    expect(docs.map(d => d.id)).toEqual(['4', '5', '2'])

    docs = await findData(index, {
      selector: {
        size: { $gte: 300, $lt: 2000 }
      },
      indexedFields: ['size']
    })
    expect(docs.map(d => d.id)).toEqual(['4', '5'])
  })

  it('should handle multiple range conditions on several attributes', async () => {
    const index = store.index('by_type_and_size_and_name')
    const docs = await findData(index, {
      selector: {
        type: { $gt: 'pdf' },
        size: { $gt: 300 },
        name: { $gt: 'docB' }
      },
      indexedFields: ['size', 'name', 'type']
    })
    expect(docs.map(d => d.id)).toEqual(['4'])
  })

  it('should support compound queries with 1 equality and 1 range', async () => {
    let index = store.index('by_type_and_size')
    let docs = await findData(index, {
      selector: {
        type: 'pdf',
        size: { $gte: 2000, $lte: 5000 }
      },
      indexedFields: ['type', 'size']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['1', '2'])
  })

  it('should support compound queries with 1 equality and multiple range', async () => {
    let index = store.index('by_type_and_size')
    let docs = await findData(index, {
      selector: {
        type: 'pdf',
        size: { $gte: 2000, $lte: 5000 },
        name: { $gte: 'docB' }
      },
      indexedFields: ['type', 'size']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['2'])
  })

  it('should support compound queries with multiple equalities', async () => {
    const index = store.index('by_type_and_size_and_name')

    const docs = await findData(index, {
      selector: {
        type: 'pdf',
        size: 2000,
        name: 'docB'
      },
      indexedFields: ['type', 'size', 'name']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['2'])
  })

  it('should support compound queries with several ranges', async () => {
    const index = store.index('by_type_and_size')
    const docs = await findData(index, {
      selector: {
        type: { $gt: 'pdf', $lt: 'zzzz' },
        size: { $gte: 300, $lte: 1200 }
      },
      indexedFields: ['type', 'size']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['4', '5'])
  })

  it('should support compound queries with missing field in selector', async () => {
    const index = store.index('by_type_and_size')
    const docs = await findData(index, {
      selector: {
        type: { $gt: 'pdf' }
      },
      indexedFields: ['type', 'size']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['1', '2', '4', '5'])
  })

  it('should not return docs for malformed compound queries', async () => {
    const index = store.index('by_type_and_size')
    let docs = await findData(index, {
      selector: {
        type: 'pdf',
        size: { $gte: 2000, $lte: 5000 }
      },
      indexedFields: ['size', 'type'], // reversed indexed fields
      index
    })
    expect(docs.map(d => d.id).sort()).toEqual([])
  })

  it('should handle $or on indexed attributes', async () => {
    const index = store.index('by_type_and_size')
    const docs = await findData(index, {
      selector: {
        $or: [{ type: 'xls' }, { size: 2000 }]
      },
      index,
      indexedFields: ['type', 'size']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['2', '4'])
  })

  it('should handle $or on non-indexed attributes', async () => {
    const index = store.index('by_type')
    const docs = await findData(index, {
      selector: {
        $or: [{ type: 'xls' }, { name: 'docC' }]
      },
      index,
      indexedFields: ['type']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['3', '4'])
  })

  it('should handle $in', async () => {
    const index = store.index('by_type')
    const docs = await findData(index, {
      selector: { type: { $in: ['pdf', 'xls'] } },
      indexedFields: ['type']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['1', '2', '4', '5'])
  })

  it('should handle $exists: true', async () => {
    const index = store.index('by_tags')
    const docs = await findData(index, {
      selector: { tags: { $exists: true } },
      indexedFields: ['tags']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['1', '3'])
  })

  it('should handle $exists: false', async () => {
    const docs = await findData(store, {
      selector: { tags: { $exists: false } },
      indexedFields: ['tags'],
      index: store
    })
    expect(docs.map(d => d.id).sort()).toEqual(['2', '4'])
  })

  it('should handle $ne', async () => {
    const index = store.index('by_type')
    const docs = await findData(index, {
      selector: { type: { $ne: 'pdf' } },
      indexedFields: ['type']
    })
    expect(docs.map(d => d.id).sort()).toEqual(['3', '4'])
  })

  it('should correctly sort asc', async () => {
    const index = store.index('by_size')
    const docs = await findData(index, {
      selector: { size: { $gte: 300, $lte: 2000 } },
      indexedFields: ['size'],
      sort: [{ size: 'asc' }]
    })
    expect(docs.map(d => d.id)).toEqual(['4', '5', '2'])
  })

  it('should correctly sort desc', async () => {
    const index = store.index('by_size')
    const docs = await findData(index, {
      selector: { size: { $gte: 300, $lte: 2000 } },
      indexedFields: ['size'],
      sort: [{ size: 'desc' }]
    })
    expect(docs.map(d => d.id)).toEqual(['2', '5', '4'])
  })

  it('should correctly sort non-indexed fields asc', async () => {
    const index = store.index('by_type')
    const docs = await findData(index, {
      selector: { size: { $gte: 2000, $lte: 7000 } },
      indexedFields: ['type'],
      sort: [{ size: 'asc' }]
    })
    expect(docs.map(d => d.id)).toEqual(['2', '1', '3'])
  })

  it('should correctly sort non-indexed fields desc', async () => {
    const index = store.index('by_type')
    const docs = await findData(index, {
      selector: { size: { $gte: 2000, $lte: 7000 } },
      indexedFields: ['type'],
      sort: [{ size: 'desc' }]
    })
    expect(docs.map(d => d.id)).toEqual(['3', '1', '2'])
  })

  it('should throw on unsupported operators', async () => {
    const index = store.index('by_type')
    await expect(
      findData(index, {
        selector: { type: { $wrongOpe: 'test' } },
        indexedFields: ['type'],
        index
      })
    ).rejects.toThrow('Unsupported operation: $wrongOpe')
  })

  it('should handle limit', async () => {
    const index = store.index('by_type')
    const docs = await findData(index, {
      selector: { type: 'pdf' },
      indexedFields: ['type'],
      limit: 2
    })
    expect(docs.map(d => d.id)).toEqual(['1', '2'])
  })

  it('should handle offset', async () => {
    const index = store.index('by_type')
    const docs = await findData(index, {
      selector: { type: 'pdf' },
      indexedFields: ['type'],
      offset: 2
    })
    expect(docs.map(d => d.id)).toEqual(['5'])
  })

  it('should handle limit + offset', async () => {
    const index = store.index('by_type')
    const docs = await findData(index, {
      selector: { type: 'pdf' },
      indexedFields: ['type'],
      offset: 1,
      limit: 1
    })
    expect(docs.map(d => d.id)).toEqual(['2'])
  })
})
