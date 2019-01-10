import HasManyFiles from './HasManyFiles'

describe('HasManyFiles', () => {
  let original, hydrated, save, mutate
  beforeEach(() => {
    original = {
      _type: 'io.cozy.todos',
      label: 'Get rich',
      relationships: {
        files: {
          data: [
            { _id: 1, _type: 'io.cozy.files' },
            { _id: 2, _type: 'io.cozy.files' }
          ]
        }
      }
    }

    const get = (doctype, id) => ({
      doctype,
      id
    })

    save = jest.fn()
    mutate = jest.fn()

    hydrated = {
      ...original,
      files: new HasManyFiles(original, 'files', 'io.cozy.files', {
        get,
        save,
        mutate
      })
    }
  })

  it('adds relations', async () => {
    await hydrated.files.addById(4)
    expect(hydrated.files.data).toEqual([
      { doctype: 'io.cozy.files', id: 1 },
      { doctype: 'io.cozy.files', id: 2 },
      { doctype: 'io.cozy.files', id: 4 }
    ])
    expect(mutate).toHaveBeenCalledWith({
      document: hydrated.files.target,
      mutationType: 'ADD_REFERENCES_TO',
      referencedDocuments: [{ _type: 'io.cozy.files', _id: 4 }]
    })
    expect(save).toHaveBeenCalled()
  })

  it('adds multiple relations', async () => {
    await hydrated.files.addById([4, 5])
    expect(hydrated.files.data).toEqual([
      { doctype: 'io.cozy.files', id: 1 },
      { doctype: 'io.cozy.files', id: 2 },
      { doctype: 'io.cozy.files', id: 4 },
      { doctype: 'io.cozy.files', id: 5 }
    ])
    expect(mutate).toHaveBeenCalledWith({
      document: hydrated.files.target,
      mutationType: 'ADD_REFERENCES_TO',
      referencedDocuments: [
        { _type: 'io.cozy.files', _id: 4 },
        { _type: 'io.cozy.files', _id: 5 }
      ]
    })
    expect(save).toHaveBeenCalled()
  })

  it('removes relations', async () => {
    await hydrated.files.removeById(2)
    expect(hydrated.files.data).toEqual([{ doctype: 'io.cozy.files', id: 1 }])
    expect(mutate).toHaveBeenCalledWith({
      document: hydrated.files.target,
      mutationType: 'REMOVE_REFERENCES_TO',
      referencedDocuments: [{ _type: 'io.cozy.files', _id: 2 }]
    })
    expect(save).toHaveBeenCalled()
  })

  it('adds multiple relations', async () => {
    await hydrated.files.removeById([1, 2])
    expect(hydrated.files.data).toEqual([])
    expect(mutate).toHaveBeenCalledWith({
      document: hydrated.files.target,
      mutationType: 'REMOVE_REFERENCES_TO',
      referencedDocuments: [
        { _type: 'io.cozy.files', _id: 1 },
        { _type: 'io.cozy.files', _id: 2 }
      ]
    })
    expect(save).toHaveBeenCalled()
  })
})
