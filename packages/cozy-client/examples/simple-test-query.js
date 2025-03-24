//const CozyClient = require('../dist/index.node')
const { ArgumentParser } = require('argparse')
//const { createClientInteractive, Q } = require('../dist/index.node')
const cozyClientModule = require('../dist/index.node');
const CozyClient = cozyClientModule.default;
const { createClientInteractive, Q } = cozyClientModule;


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
  .limitBy(100)

const main = async () => {
  const parser = new ArgumentParser()
  parser.addArgument('--url', { defaultValue: 'http://cozy.localhost:8080' })
  const args = parser.parseArgs()

  // const client = await createClientInteractive({
  //   scope: [DOCTYPE],
  //   uri: args.url,
  //   oauth: {
  //     softwareID: 'io.cozy.client.cli'
  //   }
  // })

  const client = new CozyClient({
    uri: 'http://cozy.localhost:8080',
    token:
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb3p5LmxvY2FsaG9zdDo4MDgwIiwiYXVkIjpbImNsaSJdLCJpYXQiOjE3NDIyMTc4MTcsInNjb3BlIjoiaW8uY296eS5maWxlcyJ9.Jef1_ay_VFgtdJT8auF0XjG_qplCn84yHw36hXu5F-iTQCWlYsRvz64N8gKxCpMTl39IAEvYLQ_mvuFersgGGA'
  })

  const resp = await client.query(QUERY)
  console.log(resp)
}

main().catch(e => console.error(e))
