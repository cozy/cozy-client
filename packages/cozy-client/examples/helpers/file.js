const { default: CozyClient, QueryDefinition } = require('cozy-client')
const { FileDocument } = require('cozy-client/dist/types')

const schema = {
  files: {
    doctype: 'io.cozy.files'
  }
}

const generateFakeFolder = () => ({
  name: 'folder-name' + Math.random(),
  type: 'directory',
  dirId: 'io.cozy.files.root-dir'
})

const generateFakeFile = (folder, i, file) => ({
  name: `${folder.name}-${i}.txt`,
  contentType: 'text/plain',
  path: `/${folder.name}/name${i}.txt`,
  type: 'file',
  dirId: folder._id,
  data: file
})

const createFolder = async client => {
  const { data: folder } = await client.stackClient
    .collection('io.cozy.files')
    .create(generateFakeFolder())
  return folder
}

const createFilesInsideFolder = async (client, count, folder) => {
  const generatedFile = Buffer.from('generated files')
  for (let index = 0; index < count; index++) {
    let file = generateFakeFile(folder, index, generatedFile)
    await client.stackClient.collection('io.cozy.files').create(file)
  }
}
/**
 * Create a folder and add files inside
 *
 * @param {CozyClient} client - Cozy client instance
 * @param {number} count - Number of files to create
 * @returns {Promise<FileDocument>} Folder created
 */
const createFolderWithFilesBulk = async (client, count) => {
  const folder = await createFolder(client)
  await createFilesInsideFolder(client, count, folder)
  return folder
}

/**
 * Delete a file
 *
 * @param {CozyClient} client - Cozy client instance
 * @param {FileDocument} file - File to delete
 * @param {string} file._id - Id of the file
 * @returns {Promise<void>}
 */
const deleteFile = async (client, file) => {
  await client.stackClient
    .collection('io.cozy.files')
    .destroy({ _id: file._id })
}

/**
 * Delete all the files inside a Cozy does not have path field
 * Useful to remove orphans
 *
 * @param {CozyClient} client - Cozy client instance
 * @returns {Promise<void>}
 */
const deleteAllFilesWithoutPath = async client => {
  const result = await getAllFiles(client)
  console.log(result.length, 'files found inside this Drive')
  const undefinedPathFiles = result.filter(({ path }) => !path)
  console.log(
    undefinedPathFiles.length,
    'files without path found inside this Drive'
  )

  for (let file of undefinedPathFiles) {
    if (!file.trashed) {
      await deleteFile(client, file)
    }
  }
}

/**
 * Get all files
 *
 * @param {CozyClient} client - Cozy client instance
 * @returns {Promise<FileDocument>}
 */
const getAllFiles = async client => {
  const query = new QueryDefinition({
    doctype: 'io.cozy.files',
    limit: null
  })
  const resp = await client.queryAll(query)
  return resp.data
}

module.exports = {
  schema,
  createFolderWithFilesBulk,
  deleteFile,
  deleteAllFilesWithoutPath,
  getAllFiles
}
