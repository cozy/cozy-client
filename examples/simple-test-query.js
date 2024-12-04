const { createClientInteractive, Q } = require('../dist/index.node')
const { ArgumentParser } = require('argparse')

global.fetch = require('node-fetch')

// Change those 2 variables accordingly to your needs
const DOCTYPE = 'io.cozy.files'
const QUERY = Q(DOCTYPE)
  .where({
    'cozyMetadata.createdByApp': 'drive'
  })
  .indexFields(['cozyMetadata.createdByApp'])
  .partialIndex({
    restore_path: { $exists: false },
    type: 'directory'
  })
  .limit(100)

const main = async () => {
  const parser = new ArgumentParser()
  parser.addArgument('--url', { defaultValue: 'http://cozy.localhost:8080' })
  const args = parser.parseArgs()

  const client = await createClientInteractive({
    scope: [DOCTYPE],
    uri: args.url,
    oauth: {
      softwareID: 'io.cozy.client.cli'
    }
  })

  const resp = await client.query(QUERY)
  console.log(resp)
}

main().catch(e => console.error(e))
