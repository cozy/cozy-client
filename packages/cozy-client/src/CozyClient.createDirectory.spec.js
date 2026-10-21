import CozyStackClient from '../../cozy-stack-client/src/CozyStackClient'
import CozyClient from './CozyClient'
import { HasManyFiles } from './associations'
import { Q } from './queries/dsl'
import { dispatchCreate } from './store/realtime'

const doctype = 'io.cozy.files'
const folder = {
  id: 'folder-id',
  type: doctype,
  attributes: {
    name: 'New folder',
    type: 'directory',
    dir_id: 'parent-id'
  },
  meta: { rev: '1-created' }
}

const setup = async (schema = {}) => {
  const stackClient = new CozyStackClient({ uri: 'https://recipient.example' })
  const client = new CozyClient({ stackClient, schema })
  const fetchJSON = jest.spyOn(stackClient, 'fetchJSON')
  fetchJSON.mockResolvedValue({ data: [], meta: { count: 0 } })
  await client.query(Q(doctype).where({ dir_id: 'parent-id' }), {
    as: 'children'
  })
  fetchJSON.mockClear()
  fetchJSON.mockResolvedValue({ data: folder })
  return { client, fetchJSON }
}

const createDirectory = (client, driveId) =>
  client.create(
    doctype,
    { type: 'directory', name: 'New folder', dirId: 'parent-id' },
    null,
    { driveId, forceLink: 'stack', as: 'create-directory' }
  )

describe('CozyClient directory creation through StackLink', () => {
  it.each([
    [null, '/files'],
    ['shared-drive', '/sharings/drives/shared-drive']
  ])(
    'creates a directory in scope %s and updates the cache',
    async (driveId, prefix) => {
      const { client, fetchJSON } = await setup()
      const response = await createDirectory(client, driveId)

      expect(fetchJSON).toHaveBeenCalledWith(
        'POST',
        `${prefix}/parent-id?Name=New%20folder&Type=directory&MetadataID=`,
        undefined,
        { headers: { Date: '' } }
      )
      expect(response.data).toMatchObject({
        _id: 'folder-id',
        _type: doctype,
        name: 'New folder',
        dir_id: 'parent-id'
      })
      expect(client.getQueryFromState('children').data).toEqual([response.data])

      // Realtime echoes the sender's creation back into the same cache.
      await dispatchCreate(client, doctype, response.data)
      expect(client.getQueryFromState('children').data).toEqual([response.data])
      expect(fetchJSON).toHaveBeenCalledTimes(1)
    }
  )

  it('keeps shared-drive scope out of a subsequent local creation on the same client', async () => {
    const { client, fetchJSON } = await setup()
    const sharedResponse = await createDirectory(client, 'shared-drive')
    fetchJSON.mockResolvedValue({ data: { ...folder, id: 'local-folder-id' } })

    const localResponse = await createDirectory(client)

    expect(fetchJSON.mock.calls.map(call => call[1])).toEqual([
      '/sharings/drives/shared-drive/parent-id?Name=New%20folder&Type=directory&MetadataID=',
      '/files/parent-id?Name=New%20folder&Type=directory&MetadataID='
    ])
    expect(sharedResponse.data._id).toBe('folder-id')
    expect(localResponse.data).toMatchObject({
      _id: 'local-folder-id',
      _type: doctype,
      type: 'directory',
      dir_id: 'parent-id'
    })
    expect(client.getQueryFromState('children').data).toEqual([
      sharedResponse.data,
      localResponse.data
    ])
  })

  it('keeps the ordinary data endpoint for non-files created with a drive scope', async () => {
    const { client, fetchJSON } = await setup()
    const todoDoctype = 'io.cozy.todos'
    fetchJSON.mockResolvedValue({ rows: [], total_rows: 0 })
    await client.query(Q(todoDoctype), { as: 'todos' })
    fetchJSON.mockClear()
    fetchJSON.mockResolvedValue({
      data: { _id: 'todo-id', _rev: '1-created', title: 'A task' }
    })

    const response = await client.create(
      todoDoctype,
      { title: 'A task' },
      null,
      {
        driveId: 'shared-drive',
        forceLink: 'stack'
      }
    )

    expect(fetchJSON).toHaveBeenCalledWith('POST', '/data/io.cozy.todos/', {
      title: 'A task',
      cozyMetadata: expect.objectContaining({
        metadataVersion: 1,
        createdAt: expect.any(String)
      })
    })
    expect(response.data).toMatchObject({
      _id: 'todo-id',
      _type: todoDoctype,
      title: 'A task'
    })
    expect(client.getQueryFromState('todos').data).toEqual([response.data])
    expect(client.getQueryFromState('children').data).toEqual([])
  })

  it.each(['directory', 'file'])(
    'rejects shared-drive %s creation with references before writing',
    async type => {
      const { client, fetchJSON } = await setup({
        files: {
          doctype,
          relationships: {
            icons: { type: HasManyFiles, doctype }
          }
        }
      })
      fetchJSON
        .mockResolvedValueOnce({ data: folder })
        .mockResolvedValueOnce({ data: [{ id: 'icon-id', type: doctype }] })

      await expect(
        client.create(
          doctype,
          { type, name: 'New folder', dirId: 'parent-id', data: 'content' },
          { icons: [{ _id: 'icon-id', _type: doctype }] },
          { driveId: 'shared-drive', forceLink: 'stack' }
        )
      ).rejects.toThrow(
        'References are not supported when creating files in a shared drive'
      )
      expect(fetchJSON).not.toHaveBeenCalled()
      expect(client.getQueryFromState('children').data).toEqual([])
    }
  )

  it.each([{}, { icons: [] }])(
    'allows shared-drive creation with empty references %j',
    async references => {
      const { client, fetchJSON } = await setup()
      const response = await client.create(
        doctype,
        { type: 'directory', name: 'New folder', dirId: 'parent-id' },
        references,
        { driveId: 'shared-drive', forceLink: 'stack' }
      )

      expect(fetchJSON.mock.calls[0][1]).toBe(
        '/sharings/drives/shared-drive/parent-id?Name=New%20folder&Type=directory&MetadataID='
      )
      expect(client.getQueryFromState('children').data).toEqual([response.data])
    }
  )

  it('deduplicates a realtime echo arriving before the mutation response', async () => {
    const { client, fetchJSON } = await setup()
    fetchJSON.mockImplementation(async () => {
      await dispatchCreate(client, doctype, {
        _id: folder.id,
        _rev: folder.meta.rev,
        ...folder.attributes
      })
      return { data: folder }
    })

    const response = await createDirectory(client, 'shared-drive')
    expect(client.getQueryFromState('children').data).toEqual([response.data])
  })

  it('rejects a failed shared-drive creation without inserting a directory', async () => {
    const { client, fetchJSON } = await setup()
    const error = new Error('Forbidden')
    fetchJSON.mockRejectedValue(error)

    await expect(createDirectory(client, 'shared-drive')).rejects.toBe(error)
    expect(client.getQueryFromState('children').data).toEqual([])
  })
})
