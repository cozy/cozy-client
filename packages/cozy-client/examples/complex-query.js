const { createClientInteractive } = require('cozy-client')
global.fetch = require('node-fetch') // in the browser we have native fetch

const schema = {
  contacts: {
    doctype: 'io.cozy.contacts',
    attributes: {
      name: {
        type: 'string'
      }
    }
  }
}

const main = async _args => {
  const client = await createClientInteractive({
    scope: ['io.cozy.contacts'],
    uri: process.env.COZY_URL || 'http://cozy.tools:8080',
    schema,
    oauth: {
      softwareID: 'io.cozy.client.cli'
    }
  })
  const queryDef = client
    .find('io.cozy.contacts')
    .where({
      $or: [
        {
          'cozyMetadata.doctypeVersion': { $exists: false }
        },
        {
          'cozyMetadata.doctypeVersion': { $lt: 3 }
        }
      ]
    })
    .indexFields(['cozyMetadata.doctypeVersion'])
    .sortBy([{ 'cozyMetadata.doctypeVersion': 'asc' }])

  const resp = await client.query(queryDef)
  const contacts = resp.data
  console.log(contacts[0])
  console.log('Number of contacts fetched : ', contacts.length)
}

main(process.argv).catch(e => console.error(e))
