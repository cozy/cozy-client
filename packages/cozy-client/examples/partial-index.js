const { createClientInteractive } = require('cozy-client')
const {
  schema,
  createContactsBulk,
  deleteAllContactsBulk,
  getContactsByIndexesAttributePartialIndex,
  getContactsByIndexesAttribute,
  getContactsTest
} = require('./contacts')

global.fetch = require('node-fetch') // in the browser we have native fetch

const main = async _args => {
  const client = await createClientInteractive({
    scope: ['io.cozy.contacts'],
    uri: process.env.COZY_URL || 'http://cozy.tools:8080',
    schema,
    oauth: {
      softwareID: 'io.cozy.client.cli'
    }
  })

  const nContacts = 1000

  await deleteAllContactsBulk(client)
  await createContactsBulk(client, nContacts, { nIndexed: nContacts })
  // reset store to avoid side effects from previous queries
  client.store = null

  // Run queries once to build indexes
  await getContactsByIndexesAttribute(client, { hasIndexes: false })
  await getContactsByIndexesAttributePartialIndex(client, {
    hasIndexes: false
  })

  // Both queries return 0 result, but the one with partial index is considerably
  // faster as it pre-filtered docs without the indexes attribute
  console.time('0 contact with no partial index')
  await getContactsByIndexesAttribute(client, { hasIndexes: false })
  console.timeEnd('0 contact with no partial index')

  console.time('0 contact with partial index')
  await getContactsByIndexesAttributePartialIndex(client, {
    hasIndexes: false
  })
  console.timeEnd('0 contact with partial index')

  const contacts = await getContactsTest(client)
  console.log(contacts.length)
}

main(process.argv).catch(e => console.error(e))
