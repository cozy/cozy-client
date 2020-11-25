const { createClientInteractive } = require('cozy-client')
const {
  schema,
  createContactsBulk,
  deleteAllContactsBulk,
  getAllContacts,
  getAllContactsSkip,
  getAllContactsBookmark,
  getFilteredContactsBookmark
} = require('./contacts')

global.fetch = require('node-fetch') // in the browser we have native fetch

/**
 * Measure query performances
 *
 * The given performances were made on a i7-8550U CPU, with a CouchDB locally installed.
 *
 * Execution time taken for:
 *
 * - 1 000 docs:
 *   - no pagination: ~108 ms
 *   - skip pagination: ~1 429 ms
 *   - bookmark pagination: ~563 ms
 *
 * - 10 000 docs:
 *   - no pagination: ~932 ms
 *   - skip pagination: ~165 741ms
 *   - bookmark pagination: ~7 850 ms
 */
const main = async _args => {
  const client = await createClientInteractive({
    scope: ['io.cozy.contacts'],
    uri: process.env.COZY_URL || 'http://cozy.tools:8080',
    schema,
    oauth: {
      softwareID: 'io.cozy.client.cli'
    }
  })

  const count = 1000

  await deleteAllContactsBulk(client)
  await createContactsBulk(client, count)
  // reset store to avoid side effects from previous queries
  client.store = null

  console.time(count + ' contacts no pagination')
  await getAllContacts(client)
  console.timeEnd(count + ' contacts no pagination')

  client.store = null

  console.time(count + ' contacts skip')
  await getAllContactsSkip(client)
  console.timeEnd(count + ' contacts skip')

  client.store = null

  console.time(count + ' all contacts bookmark')
  await getAllContactsBookmark(client)
  console.timeEnd(count + ' all contacts bookmark')

  console.time(count + ' filtered contacts bookmark')
  await getFilteredContactsBookmark(client)
  console.timeEnd(count + ' filtered contacts bookmark')
}

main(process.argv).catch(e => console.error(e))
