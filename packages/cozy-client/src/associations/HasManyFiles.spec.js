import HasManyFiles from './HasManyFiles'

describe('HasManyFiles', () => {
  let original, hydrated, save, mutate
  beforeEach(() => {
    original = {
      _type: 'io.cozy.todos',
      _id: '1234',
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

  it('add wrong file relations', () => {
    const refTodo = {
      _id: 456,
      _type: 'io.cozy.todos'
    }
    expect(() => hydrated.files.insertDocuments([refTodo])).toThrow(Error)
  })

  it('transform the doc-to-file relationship into query', () => {
    const queryDef = HasManyFiles.query(original, null, {
      name: 'files',
      doctype: 'io.cozy.files'
    })

    expect(queryDef.doctype).toEqual('io.cozy.files')
    expect(queryDef.referenced).toEqual(original)
  })

  it('transform the file-to-doc relationship into query', () => {
    const file = {
      _id: 1,
      _type: 'io.cozy.files',
      relationships: {
        referenced_by: { data: [{ id: '1234', type: 'io.cozy.todos' }] }
      }
    }
    const queryDef = HasManyFiles.query(file, null, {
      doctype: 'io.cozy.todos'
    })

    expect(queryDef.doctype).toEqual('io.cozy.todos')
    expect(queryDef.ids).toEqual(['1234'])
  })
})
