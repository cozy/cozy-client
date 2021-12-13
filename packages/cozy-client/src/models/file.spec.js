import * as fileModel from './file'
import { Qualification } from './document/qualification'
import { QueryDefinition } from '../queries/dsl'
const CozyClient = require('cozy-client/dist/CozyClient').default
const CozyStackClient = require('cozy-stack-client').default

jest.mock('cozy-stack-client')

const cozyClient = new CozyClient({
  stackClient: new CozyStackClient()
})
const destroySpy = jest.fn().mockName('destroy')
const getSpy = jest.fn().mockName('get')
const statByPathSpy = jest.fn().mockName('statByPath')
const updateFileMetadataSpy = jest.fn().mockName('updateFileMetadata')
const createFileSpy = jest.fn().mockName('createFileSpy')
const updateFileSpy = jest.fn().mockName('updateFileSpy')

beforeAll(() => {
  cozyClient.stackClient.collection.mockReturnValue({
    destroy: destroySpy,
    get: getSpy,
    statByPath: statByPathSpy,
    updateFileMetadata: updateFileMetadataSpy,
    createFile: createFileSpy,
    updateFile: updateFileSpy
  })
})

describe('File Model', () => {
  it('should test if a file is a note or not', () => {
    const fileDocument = {
      type: 'file',
      _id: 1
    }
    expect(fileModel.isNote(fileDocument)).toBe(false)
    const note = {
      type: 'file',
      name: 'test.cozy-note',
      metadata: {
        content: 'content',
        schema: [],
        title: 'title',
        version: 1
      }
    }
    expect(fileModel.isNote(note)).toBe(true)
    const note2 = {
      type: 'file',
      name: 'test.cozy-note',
      metadata: {
        content: 'content',
        schema: [],
        title: '',
        version: 0
      }
    }
    expect(fileModel.isNote(note2)).toBe(true)
  })

  it('should test if a file is a shortcut or not', () => {
    const shortcut = {
      type: 'file',
      class: 'shortcut'
    }

    const image = {
      type: 'file',
      class: 'image'
    }

    expect(fileModel.isShortcut(shortcut)).toBe(true)
    expect(fileModel.isShortcut(image)).toBe(false)
  })

  it('should test if a file is an onlyoffice file or not', () => {
    const directory = {
      type: 'directory'
    }

    const shortcut = {
      type: 'file',
      class: 'shortcut'
    }

    const image = {
      type: 'file',
      class: 'image'
    }

    const note = {
      type: 'file',
      name: 'test.cozy-note',
      metadata: {
        content: 'content',
        schema: [],
        title: 'title',
        version: 1
      }
    }

    const text = {
      type: 'file',
      class: 'text'
    }

    const slide = {
      type: 'file',
      class: 'slide'
    }

    const spreadsheet = {
      type: 'file',
      class: 'spreadsheet'
    }

    expect(fileModel.isOnlyOfficeFile(text)).toBe(true)
    expect(fileModel.isOnlyOfficeFile(slide)).toBe(true)
    expect(fileModel.isOnlyOfficeFile(spreadsheet)).toBe(true)
    expect(fileModel.isOnlyOfficeFile(directory)).toBe(false)
    expect(fileModel.isOnlyOfficeFile(shortcut)).toBe(false)
    expect(fileModel.isOnlyOfficeFile(image)).toBe(false)
    expect(fileModel.isOnlyOfficeFile(note)).toBe(false)
  })

  it('should test if a file should be opened by only office', () => {
    const docxFile = {
      type: 'file',
      class: 'text',
      name: 'test.docx'
    }

    const txtFile = { ...docxFile, name: 'test.txt' }

    const mdFile = { ...docxFile, name: 'test.md' }

    expect(fileModel.shouldBeOpenedByOnlyOffice(docxFile)).toBe(true)
    expect(fileModel.shouldBeOpenedByOnlyOffice(txtFile)).toBe(false)
    expect(fileModel.shouldBeOpenedByOnlyOffice(mdFile)).toBe(false)
  })

  it('should test if a file has a specific metadata', () => {
    const doc = {
      metadata: {
        carbonCopy: true
      }
    }

    expect(
      fileModel.hasMetadataAttribute({ file: doc, attribute: 'carbonCopy' })
    ).toBe(true)
    expect(
      fileModel.hasMetadataAttribute({ file: doc, attribute: 'electronicSafe' })
    ).toBe(false)
  })

  describe('normalizeFile', () => {
    const id = 'uuid123'
    const type = 'directory'

    it('should allow both `id` and `_id`', () => {
      const doc = { id, type }
      expect(fileModel.normalize(doc)).toHaveProperty('_id', id)

      const _doc = { _id: id, type }
      expect(fileModel.normalize(_doc)).toHaveProperty('_id', id)
    })

    it('should enforce a `_type`', () => {
      const doc = { id, type }
      expect(fileModel.normalize(doc)).toHaveProperty('_type', 'io.cozy.files')
      expect(fileModel.normalize(doc)).toHaveProperty('type', type)

      const doc2 = { id, _type: 'io.cozy.something.else' }
      expect(fileModel.normalize(doc2)).toHaveProperty(
        '_type',
        'io.cozy.something.else'
      )

      const doc3 = { id }
      expect(fileModel.normalize(doc3)).toHaveProperty('_type', 'io.cozy.files')
    })
  })

  describe('splitFilename', () => {
    const joinName = ({ filename, extension }) => filename + extension
    const mkFile = expectation => ({
      type: 'file',
      name: joinName(expectation)
    })
    const { stringify } = JSON

    const scenarios = [
      { filename: 'file', extension: '.ext' },
      { filename: 'file', extension: '' },
      { filename: 'file.html', extension: '.ejs' },
      { filename: 'file', extension: '.' },
      { filename: 'file.', extension: '.' },
      { filename: 'file.', extension: '.ext' },
      { filename: '.file', extension: '' },
      { filename: '.file', extension: '.ext' }
    ]

    for (const expectation of scenarios) {
      it(`splits ${stringify(joinName(expectation))} into ${stringify(
        expectation
      )}`, () => {
        expect(fileModel.splitFilename(mkFile(expectation))).toEqual(
          expectation
        )
      })
    }

    it('should throw an error if the file is not correct', () => {
      expect(() => fileModel.splitFilename({})).toThrow(
        'file should have a name property'
      )
      expect(() => fileModel.splitFilename({ name: null })).toThrow()
      expect(() => fileModel.splitFilename({ name: '' })).not.toThrow()
    })
    it('should return only the folder name if its a folder', () => {
      const dir = {
        name: 'foo',
        type: 'directory'
      }
      const result = fileModel.splitFilename(dir)
      expect(result).toEqual({
        filename: 'foo',
        extension: ''
      })
    })
  })

  describe('ensureFilePath', () => {
    const id = 'uuid123'
    const type = 'io.cozy.files'

    it('should define the path if parent is provided', () => {
      const doc = { id, name: 'myfile.ext' }
      const parent = { path: '/my/path' }
      expect(fileModel.ensureFilePath(doc, parent)).toHaveProperty(
        'path',
        '/my/path/myfile.ext'
      )
    })

    it('should not require a `parent` parameter if one is present', () => {
      const doc = { id, type, path: '/test/file' }
      expect(fileModel.ensureFilePath(doc)).toHaveProperty('path', '/test/file')
    })

    it('should not buid a `path` if the one is already present', () => {
      const doc = { id, type, path: '/test/file' }
      const parent = { id, type, path: '/test/parent' }
      expect(fileModel.ensureFilePath(doc, parent)).toHaveProperty(
        'path',
        '/test/file'
      )
    })
  })

  describe('Sharing shortcuts', () => {
    const id = 'abc123'
    const type = 'io.cozy.files'

    const nonSharingShortcutDocument = { id, type }
    const sharingShortcutDocument = {
      ...nonSharingShortcutDocument,
      metadata: {
        sharing: { status: 'seen' },
        target: {
          mime: 'target-mimetype',
          _type: 'io.cozy.files'
        }
      }
    }
    const newShortcutDocument = {
      ...nonSharingShortcutDocument,
      metadata: {
        sharing: { status: 'new' },
        target: {
          mime: 'target-mimetype-2',
          _type: 'io.cozy.files'
        }
      }
    }

    it('identifies a sharing shortcut', () => {
      expect(fileModel.isSharingShortcut(sharingShortcutDocument)).toBe(true)
      expect(fileModel.isSharingShortcut(nonSharingShortcutDocument)).toBe(
        false
      )
    })

    it('detects if a sharing shortcut is new', () => {
      expect(fileModel.isSharingShortcutNew(newShortcutDocument)).toBe(true)
      expect(fileModel.isSharingShortcutNew(nonSharingShortcutDocument)).toBe(
        false
      )
      expect(fileModel.isSharingShortcutNew(sharingShortcutDocument)).toBe(
        false
      )
    })

    it('returns the sharring shortcut status', () => {
      expect(fileModel.getSharingShortcutStatus(newShortcutDocument)).toBe(
        'new'
      )
      expect(fileModel.getSharingShortcutStatus(sharingShortcutDocument)).toBe(
        'seen'
      )
      expect(
        fileModel.getSharingShortcutStatus(nonSharingShortcutDocument)
      ).toBeUndefined()
    })

    it('returns the sharring shortcut target mime type', () => {
      expect(fileModel.getSharingShortcutTargetMime(newShortcutDocument)).toBe(
        'target-mimetype-2'
      )
      expect(
        fileModel.getSharingShortcutTargetMime(sharingShortcutDocument)
      ).toBe('target-mimetype')
      expect(
        fileModel.getSharingShortcutTargetMime(nonSharingShortcutDocument)
      ).toBeUndefined()
    })

    it('returns the sharring shortcut target doctype', () => {
      expect(
        fileModel.getSharingShortcutTargetDoctype(sharingShortcutDocument)
      ).toBe('io.cozy.files')
      expect(
        fileModel.getSharingShortcutTargetMime(nonSharingShortcutDocument)
      ).toBeUndefined()
    })
  })
  describe('getFullpath', () => {
    let parentDirPath

    beforeEach(() => {
      getSpy.mockImplementation(() =>
        Promise.resolve({
          data: {
            _id: '123',
            _type: 'io.cozy.files',
            path: parentDirPath
          }
        })
      )
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('should return the full path of the file', async () => {
      parentDirPath = '/GrandParent/Parent'
      const result = await fileModel.getFullpath(
        cozyClient,
        'parent',
        'mydoc.odt'
      )
      expect(cozyClient.stackClient.collection).toHaveBeenCalledWith(
        'io.cozy.files'
      )
      expect(getSpy).toHaveBeenCalledWith(
        'parent',
        new QueryDefinition({ doctype: 'io.cozy.files', id: 'parent' })
      )
      expect(result).toEqual('/GrandParent/Parent/mydoc.odt')
    })

    it('should return the full path of the file if it is in root directory', async () => {
      parentDirPath = '/'
      const result = await fileModel.getFullpath(
        cozyClient,
        'parent',
        'mydoc.odt'
      )
      expect(cozyClient.stackClient.collection).toHaveBeenCalledWith(
        'io.cozy.files'
      )
      expect(getSpy).toHaveBeenCalledWith(
        'parent',
        new QueryDefinition({ doctype: 'io.cozy.files', id: 'parent' })
      )
      expect(result).toEqual('/mydoc.odt')
    })
  })

  describe('move', () => {
    const fileId = 'file-2295478c'
    const folderId = 'dir-b1e1c256'

    afterEach(() => {
      jest.restoreAllMocks()
      jest.clearAllMocks()
    })

    it('should move a file to another destination', async () => {
      updateFileMetadataSpy.mockResolvedValue({
        data: {
          id: fileId,
          dir_id: folderId,
          _type: 'io.cozy.files'
        }
      })
      const result = await fileModel.move(cozyClient, fileId, { folderId })
      expect(updateFileMetadataSpy).toHaveBeenCalled()
      expect(result).toEqual({
        deleted: null,
        moved: {
          id: 'file-2295478c',
          dir_id: 'dir-b1e1c256',
          _type: 'io.cozy.files'
        }
      })
    })

    it('should fail with an error if there is a conflict and force is false', async () => {
      updateFileMetadataSpy.mockRejectedValueOnce({
        status: 409
      })
      try {
        await fileModel.move(cozyClient, fileId, { folderId })
      } catch (e) {
        expect(e).toEqual({ status: 409 })
      }
    })

    it('should overwrite the destination if there is a conflict and force is true', async () => {
      const DELETED_FILE_ID = 'deleted-c097ffca'

      updateFileMetadataSpy.mockRejectedValueOnce({
        status: 409
      })
      updateFileMetadataSpy.mockResolvedValue({
        data: {
          id: fileId,
          dir_id: folderId,
          _type: 'io.cozy.files'
        }
      })
      getSpy.mockResolvedValue({
        data: {
          id: fileId,
          name: 'mydoc.odt',
          _type: 'io.cozy.files'
        }
      })
      statByPathSpy.mockResolvedValue({
        data: {
          id: DELETED_FILE_ID,
          _type: 'io.cozy.files'
        }
      })
      const result = await fileModel.move(
        cozyClient,
        fileId,
        { folderId },
        true
      )
      expect(updateFileMetadataSpy).toHaveBeenCalled()
      expect(destroySpy).toHaveBeenCalled()
      expect(result).toEqual({
        deleted: DELETED_FILE_ID,
        moved: {
          id: 'file-2295478c',
          dir_id: 'dir-b1e1c256',
          _type: 'io.cozy.files'
        }
      })
    })

    it('should use destination.path if it is given', async () => {
      const DELETED_FILE_ID = 'deleted-c097ffca'

      updateFileMetadataSpy.mockRejectedValueOnce({
        status: 409
      })
      updateFileMetadataSpy.mockResolvedValue({
        data: {
          id: fileId,
          dir_id: folderId,
          _type: 'io.cozy.files'
        }
      })
      statByPathSpy.mockResolvedValue({
        data: {
          id: DELETED_FILE_ID,
          _type: 'io.cozy.files'
        }
      })
      const result = await fileModel.move(
        cozyClient,
        fileId,
        { folderId, path: '/mydir/mydoc.odt' },
        true
      )
      expect(getSpy).not.toHaveBeenCalled()
      expect(updateFileMetadataSpy).toHaveBeenCalled()
      expect(destroySpy).toHaveBeenCalled()
      expect(result).toEqual({
        deleted: DELETED_FILE_ID,
        moved: {
          id: 'file-2295478c',
          dir_id: 'dir-b1e1c256',
          _type: 'io.cozy.files'
        }
      })
    })
  })

  describe('splitFilename', () => {
    const name = ({ filename, extension }) => filename + extension
    const file = expectation => ({ type: 'file', name: name(expectation) })
    const { stringify } = JSON

    const scenarios = [
      { filename: 'file', extension: '.ext' },
      { filename: 'file', extension: '' },
      { filename: 'file.html', extension: '.ejs' },
      { filename: 'file', extension: '.' },
      { filename: 'file.', extension: '.' },
      { filename: 'file.', extension: '.ext' },
      { filename: '.file', extension: '' },
      { filename: '.file', extension: '.ext' }
    ]

    for (const expectation of scenarios) {
      it(`splits ${stringify(name(expectation))} into ${stringify(
        expectation
      )}`, () => {
        expect(fileModel.splitFilename(file(expectation))).toEqual(expectation)
      })
    }

    it('should throw an error if the file is not correct', () => {
      const file = {}

      expect(() => fileModel.splitFilename(file)).toThrow()
    })
    it('should return only the folder name if its a folder', () => {
      const file = {
        name: 'foo',
        type: 'directory'
      }
      const result = fileModel.splitFilename(file)
      expect(result).toEqual({
        filename: 'foo',
        extension: ''
      })
    })
  })

  describe('generateNewFileNameOnConflict', () => {
    it('should generate the right file name with _X', () => {
      const filename1 = fileModel.generateNewFileNameOnConflict('test')
      expect(filename1).toEqual('test_1')
      const filename2 = fileModel.generateNewFileNameOnConflict('test_1')
      expect(filename2).toEqual('test_2')
      const filename3 = fileModel.generateNewFileNameOnConflict('test_1_1_test')
      expect(filename3).toEqual('test_1_1_test_1')
      const filename4 = fileModel.generateNewFileNameOnConflict('test_')
      expect(filename4).toEqual('test__1')
    })
  })

  describe('generateFileNameForRevision', () => {
    it('should generate the right file name for a revision', () => {
      const MOCKED_DATE = '2018-01-01T12:00:00.210Z'
      const expectedFilename = 'test_01 January - 12h00.pdf'
      const date = new Date(MOCKED_DATE)
      const result = fileModel.generateFileNameForRevision(
        { name: 'test.pdf', type: 'file' },
        { updated_at: date },
        () => '01 January - 12h00'
      )
      expect(result).toEqual(expectedFilename)
    })
  })

  describe('uploadFileWithConflictStrategy', () => {
    beforeEach(() => {
      getSpy.mockImplementation(() =>
        Promise.resolve({
          data: {
            path: '/GrandParent/Parent',
            _type: 'io.cozy.files',
            _id: '123'
          }
        })
      )
    })
    afterEach(() => {
      jest.restoreAllMocks()
      jest.clearAllMocks()
    })

    it('should call the upload method if no conflict', async () => {
      statByPathSpy.mockRejectedValueOnce(new Error('Not Found'))
      createFileSpy.mockResolvedValue({
        data: {
          id: 'jj',
          dir_id: 'jj',
          _type: 'io.cozy.files'
        }
      })
      try {
        await fileModel.uploadFileWithConflictStrategy(
          cozyClient,
          {},
          { name: 'test', dirId: 'a', conflictStrategy: 'erase' }
        )
      } catch (e) {
        expect(createFileSpy).toHaveBeenCalled()
      }
    })

    it('should rename the file if there is a conflict', async () => {
      const dirId = 'toto'
      //first call we return an existing file => conflict
      //second call, we reject as not found
      statByPathSpy
        .mockReturnValueOnce({
          data: {
            _id: 'file_id',
            _type: 'io.cozy.files'
          }
        })
        .mockRejectedValueOnce(new Error('Not Found'))

      const opts = {
        name: 'filename',
        dirId,
        conflictStrategy: 'rename',
        contentType: 'image/jpeg'
      }
      await fileModel.uploadFileWithConflictStrategy(cozyClient, '', opts)
      expect(createFileSpy).toHaveBeenCalledWith('', {
        ...opts,
        name: 'filename_1'
      })
    })

    it('should erase the file if there is a conflict', async () => {
      const dirId = 'toto'
      //first call we return an existing file => conflict
      //second call, we reject as not found
      statByPathSpy.mockReturnValueOnce({
        data: {
          id: 'file_id'
        }
      })
      const opts = {
        name: 'filename',
        dirId,
        conflictStrategy: 'erase'
      }
      await fileModel.uploadFileWithConflictStrategy(cozyClient, '', opts)
      expect(updateFileSpy).toHaveBeenCalledWith('', {
        ...opts,
        fileId: 'file_id'
      })
    })
  })
})

describe('File qualification', () => {
  let mockedClient
  let updateMetadataAttribute
  beforeEach(() => {
    updateMetadataAttribute = jest.fn()
    mockedClient = {
      collection: name => ({
        updateMetadataAttribute
      })
    }
  })

  it('should save the qualification', async () => {
    updateMetadataAttribute.mockImplementation((_id, attributes) => {
      return { _id, metadata: { ...attributes } }
    })
    const fileDoc = {
      _id: '123',
      metadata: {
        datetime: '2020-01-01T20:38:04Z'
      }
    }
    const qualification = Qualification.getByLabel('health_invoice')
    const updFile = await fileModel.saveFileQualification(
      mockedClient,
      fileDoc,
      qualification
    )
    expect(updFile).toEqual({
      _id: '123',
      metadata: {
        datetime: '2020-01-01T20:38:04Z',
        qualification: {
          label: 'health_invoice',
          sourceCategory: 'health',
          purpose: 'invoice'
        }
      }
    })
  })
})
