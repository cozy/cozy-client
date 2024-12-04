import { DOCTYPE_FILES } from '../const'
import HasManyFiles, { getFileDatetime } from './HasManyFiles'

describe('HasManyFiles', () => {
  let originalFile, hydratedFile, originalTodo, hydratedTodo, save, mutate
  beforeEach(() => {
    originalTodo = {
      _type: 'io.cozy.todos',
      _id: '1234',
      label: 'Get rich',
      relationships: {
        files: {
          data: [
            { _id: 1, _type: DOCTYPE_FILES },
            { _id: 2, _type: DOCTYPE_FILES }
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

    hydratedTodo = {
      ...originalTodo,
      files: new HasManyFiles(originalTodo, 'files', DOCTYPE_FILES, {
        get,
        save,
        mutate
      })
    }

    originalFile = {
      _type: DOCTYPE_FILES,
      _id: '4567',
      name: 'The greatest file',
      referenced_by: [{ id: '7654', type: 'io.cozy.todos' }]
    }
    hydratedFile = {
      ...originalFile,
      todos: new HasManyFiles(originalFile, 'todos', 'io.cozy.files', {
        get,
        save,
        mutate
      })
    }
  })

  it('get data', () => {
    expect(hydratedTodo.files.data).toEqual([
      { doctype: DOCTYPE_FILES, id: 1 },
      { doctype: DOCTYPE_FILES, id: 2 }
    ])
    expect(hydratedFile.todos.data).toEqual([
      { doctype: 'io.cozy.todos', id: '7654' }
    ])
  })

  it('adds relations', async () => {
    await hydratedTodo.files.addById(4)
    expect(hydratedTodo.files.data).toEqual([
      { doctype: DOCTYPE_FILES, id: 1 },
      { doctype: DOCTYPE_FILES, id: 2 },
      { doctype: DOCTYPE_FILES, id: 4 }
    ])
    expect(mutate).toHaveBeenCalledWith({
      document: hydratedTodo.files.target,
      mutationType: 'ADD_REFERENCES_TO',
      referencedDocuments: [{ _type: DOCTYPE_FILES, _id: 4 }]
    })
  })

  it('adds multiple relations', async () => {
    await hydratedTodo.files.addById([4, 5])
    expect(hydratedTodo.files.data).toEqual([
      { doctype: DOCTYPE_FILES, id: 1 },
      { doctype: DOCTYPE_FILES, id: 2 },
      { doctype: DOCTYPE_FILES, id: 4 },
      { doctype: DOCTYPE_FILES, id: 5 }
    ])
    expect(mutate).toHaveBeenCalledWith({
      document: hydratedTodo.files.target,
      mutationType: 'ADD_REFERENCES_TO',
      referencedDocuments: [
        { _type: DOCTYPE_FILES, _id: 4 },
        { _type: DOCTYPE_FILES, _id: 5 }
      ]
    })
  })

  it('removes relations', async () => {
    await hydratedTodo.files.removeById(2)
    expect(hydratedTodo.files.data).toEqual([{ doctype: DOCTYPE_FILES, id: 1 }])
    expect(mutate).toHaveBeenCalledWith({
      document: hydratedTodo.files.target,
      mutationType: 'REMOVE_REFERENCES_TO',
      referencedDocuments: [{ _type: DOCTYPE_FILES, _id: 2 }]
    })
  })

  it('adds multiple relations', async () => {
    await hydratedTodo.files.removeById([1, 2])
    expect(hydratedTodo.files.data).toEqual([])
    expect(mutate).toHaveBeenCalledWith({
      document: hydratedTodo.files.target,
      mutationType: 'REMOVE_REFERENCES_TO',
      referencedDocuments: [
        { _type: DOCTYPE_FILES, _id: 1 },
        { _type: DOCTYPE_FILES, _id: 2 }
      ]
    })
  })

  it('add wrong file relations', () => {
    const refTodo = {
      _id: 456,
      _type: 'io.cozy.todos'
    }
    expect(() => hydratedTodo.files.insertDocuments([refTodo])).toThrow(Error)
  })

  it('transform the doc-to-file relationship into query', () => {
    const queryDef = HasManyFiles.query(originalTodo, null, {
      name: 'files',
      doctype: DOCTYPE_FILES
    })

    expect(queryDef.doctype).toEqual(DOCTYPE_FILES)
    expect(queryDef.referenced).toEqual(originalTodo)
  })

  it('transform the file-to-doc relationship into query', () => {
    const file = {
      _id: 1,
      _type: DOCTYPE_FILES,
      relationships: {
        referenced_by: {
          data: [
            { id: '1234', type: 'io.cozy.todos' },
            { id: '1234', type: 'io.cozy.todos' }
          ]
        }
      }
    }
    const queryDef = HasManyFiles.query(file, null, {
      doctype: 'io.cozy.todos'
    })

    expect(queryDef.doctype).toEqual('io.cozy.todos')
    expect(queryDef.ids).toEqual(['1234'])
  })
})

describe('getFileDatetime', () => {
  it('should get the metadata datetime when it exists', () => {
    const file = {
      created_at: '2023-01-01',
      metadata: {
        datetime: '2023-02-01'
      }
    }
    expect(getFileDatetime(file)).toEqual('2023-02-01')
  })
  it('should get the created_at when there is no datetime metadata', () => {
    const file = {
      created_at: '2023-01-01'
    }
    expect(getFileDatetime(file)).toEqual('2023-01-01')
  })
})
