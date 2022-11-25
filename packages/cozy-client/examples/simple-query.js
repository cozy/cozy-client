const { createClientInteractive, Q } = require('cozy-client')
const { ArgumentParser } = require('argparse')

global.fetch = require('node-fetch') //

const main = async () => {
  const parser = new ArgumentParser()
  parser.addArgument('--url', { defaultValue: 'http://cozy.localhost:8080' })
  const args = parser.parseArgs()

  const schema = {
    files: {
      doctype: 'io.cozy.files'
    }
  }
  const client = await createClientInteractive({
    scope: ['io.cozy.files'],
    uri: args.url,
    schema,
    doctype: 'io.cozy.files',
    oauth: {
      softwareID: 'io.cozy.client.cli'
    }
  })

  const query = Q('io.cozy.files').where({
    $and: [
      {
        created_at: {
          $gt: '2021-01-01'
        }
      },
      {
        type: 'file'
      }
    ]
  })
  const resp = await client.query(query)
  console.log('resp : ', resp)
}

main().catch(e => console.error(e))
