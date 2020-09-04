import {
  extractAndMergeDocument,
  mergeDocumentsWithRelationships
} from './documents'

describe('extractAndMerge', () => {
  it('should return the right data', () => {
    const data = {
      0: {
        id: 'b6ff135b34e041ffb2d4a4865f3e0a53',
        _id: 'b6ff135b34e041ffb2d4a4865f3e0a53',
        type: 'io.cozy.files',
        _type: 'io.cozy.files'
      },
      1: {
        id: 'b6ff135b34e041ffb2d4a4865f3e235f',
        type: 'io.cozy.files',
        _type: 'io.cozy.files',
        _id: 'b6ff135b34e041ffb2d4a4865f3e235f'
      }
    }
    const updatedStateWithIncluded = {
      0: {
        attributes: {
          type: 'file',
          name: 'IMG_0016.PNG',
          dir_id: '7d2f9c24cd345ce3171bf71f401e80c6'
        },
        id: 'b6ff135b34e041ffb2d4a4865f3e0a53',
        _id: 'b6ff135b34e041ffb2d4a4865f3e0a53',
        links: { self: '/files/b6ff135b34e041ffb2d4a4865f3e0a53' },
        meta: { rev: '5-87840eceaab358e38aa8b6bb0d4577b1' },
        relationships: {
          parent: {
            links: { related: '/files/7d2f9c24cd345ce3171bf71f401e80c6' }
          }
        },
        type: 'io.cozy.files',
        _type: 'io.cozy.files'
      },
      1: {
        attributes: {
          type: 'file',
          name: 'IMG_0054.PNG',
          dir_id: '7d2f9c24cd345ce3171bf71f401e80c6'
        },
        id: 'b6ff135b34e041ffb2d4a4865f3e235f',
        _id: 'b6ff135b34e041ffb2d4a4865f3e235f',
        links: { self: '/files/b6ff135b34e041ffb2d4a4865f3e235f' },
        meta: { rev: '5-ca91c0dc02dafb38eb56070c1d80d62c' },
        relationships: {
          parent: {
            links: { related: '/files/7d2f9c24cd345ce3171bf71f401e80c6' }
          }
        },
        type: 'io.cozy.files',
        _type: 'io.cozy.files'
      }
    }
    const returnedDatas = extractAndMergeDocument(
      data,
      updatedStateWithIncluded
    )

    const manuallyMergedData = {
      '0': {
        _id: 'b6ff135b34e041ffb2d4a4865f3e0a53',
        _type: 'io.cozy.files',
        attributes: {
          dir_id: '7d2f9c24cd345ce3171bf71f401e80c6',
          name: 'IMG_0016.PNG',
          type: 'file'
        },
        id: 'b6ff135b34e041ffb2d4a4865f3e0a53',
        links: { self: '/files/b6ff135b34e041ffb2d4a4865f3e0a53' },
        meta: { rev: '5-87840eceaab358e38aa8b6bb0d4577b1' },
        relationships: {
          parent: {
            links: { related: '/files/7d2f9c24cd345ce3171bf71f401e80c6' }
          }
        },
        type: 'io.cozy.files'
      },
      '1': {
        _id: 'b6ff135b34e041ffb2d4a4865f3e235f',
        _type: 'io.cozy.files',
        attributes: {
          dir_id: '7d2f9c24cd345ce3171bf71f401e80c6',
          name: 'IMG_0054.PNG',
          type: 'file'
        },
        id: 'b6ff135b34e041ffb2d4a4865f3e235f',
        links: { self: '/files/b6ff135b34e041ffb2d4a4865f3e235f' },
        meta: { rev: '5-ca91c0dc02dafb38eb56070c1d80d62c' },
        relationships: {
          parent: {
            links: { related: '/files/7d2f9c24cd345ce3171bf71f401e80c6' }
          }
        },
        type: 'io.cozy.files'
      },
      'io.cozy.files': {
        b6ff135b34e041ffb2d4a4865f3e0a53: {
          _id: 'b6ff135b34e041ffb2d4a4865f3e0a53',
          _type: 'io.cozy.files',
          id: 'b6ff135b34e041ffb2d4a4865f3e0a53',
          type: 'io.cozy.files'
        },
        b6ff135b34e041ffb2d4a4865f3e235f: {
          _id: 'b6ff135b34e041ffb2d4a4865f3e235f',
          _type: 'io.cozy.files',
          id: 'b6ff135b34e041ffb2d4a4865f3e235f',
          type: 'io.cozy.files'
        }
      }
    }
    expect(returnedDatas).toEqual(manuallyMergedData)
  })
})

describe('mergeDocumentsWithRelationships', () => {
  it('should merge 2 documents', () => {
    const prev = {
      a: 1
    }
    const next = {
      a: 2,
      b: 3
    }
    const merged = mergeDocumentsWithRelationships(prev, next)
    expect(merged).toEqual({
      a: 2,
      b: 3
    })
    expect(merged.relationships).toBeUndefined()
  })

  it('should update relationships', () => {
    const prev = {
      relationships: {
        a: [1]
      }
    }
    const next = {
      relationships: {
        a: [2],
        b: [3]
      }
    }
    const merged = mergeDocumentsWithRelationships(prev, next)
    expect(merged).toEqual({
      relationships: {
        a: [2],
        b: [3]
      }
    })
  })

  it('should keep previously existing relationships', () => {
    // this is especially important for HasManyFiles relationships, where documents coming from the stack don't have the `relationships` property, because the relationship info is stored on the other side (on the io.cozy.files documents)
    const prev = {
      relationships: {
        a: [1]
      }
    }
    const next = {
      relationships: {}
    }
    const merged = mergeDocumentsWithRelationships(prev, next)
    expect(merged).toEqual({
      relationships: {
        a: [1]
      }
    })
  })
})
