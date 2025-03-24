const CozyClient = require('cozy-client').default

const TOKEN =
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb3p5LmxvY2FsaG9zdDo4MDgwIiwiYXVkIjpbImNsaSJdLCJpYXQiOjE3NDIyMTk2NTQsInNjb3BlIjoiaW8uY296eS5maWxlcyJ9.9C7PvDnBJsGvansWnU9EsNOITIFHrtIe9spw_P1IDvpfLx5aSanwPDGa4wfVcH1m2MUxXJHjuBBub0xfYytgmg'

const main = async () => {
  const client = new CozyClient({
    uri: 'http://cozy.localhost:8080',
    token: TOKEN
  })

  // Create a dir
  const dummyDir = {
    _type: 'io.cozy.files',
    type: 'directory',
    name: `TestDir-${Date.now()}`, // Add timestamp to avoid conflicts on name
    contentType: 'text/plain',
    dirId: 'io.cozy.files.root-dir'
  }
  let resp = await client.save(dummyDir)
  const dirId = resp.data._id
  console.log('Directory id : ', dirId)

  // Create a file in dir
  const dummyFileContent = Buffer.from('dummy text')
  const dummyFile = {
    _type: 'io.cozy.files',
    type: 'file',
    name: `test-${Date.now()}.txt`,
    contentType: 'text/plain',
    dirId: dirId,
    data: dummyFileContent
  }
  resp = await client.save(dummyFile)
  console.log('File created: ', resp)
}

main().catch(e => console.error(e))
