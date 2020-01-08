const { QueryDefinition, default: CozyClient } = require('../dist')
global.fetch = require('node-fetch') // in the browser we have native fetch

let client = {}

const schema = {
  contacts: {
    doctype: 'io.cozy.contacts'
  }
}

const createContactsBulk = async count => {
  const contacts = []
  for (let i = 0; i < count; i++) {
    const familyName = `Fake${i}`
    const givenName = `Faky${i}`
    const address = `${familyName}@${givenName}.com`
    const contact = {
      name: { familyName, givenName },
      email: [{ address }]
    }
    contacts.push(contact)
  }
  await client.stackClient.collection('io.cozy.contacts').updateAll(contacts)
}

const deleteAllContactsBulk = async () => {
  const contacts = await getAllContacts()
  await client.stackClient.collection('io.cozy.contacts').destroyAll(contacts)
}

const getAllContacts = async () => {
  const query = new QueryDefinition({
    doctype: 'io.cozy.contacts',
    limit: null
  })
  const resp = await client.query(query)
  return resp.data
}

const getAllContactsSkip = async () => {
  const query = new QueryDefinition({
    doctype: 'io.cozy.contacts',
    limit: 100
  })
  const contacts = []
  let resp = { next: true }

  while (resp && resp.next) {
    resp = await client.query(query.offset(contacts.length), {
      as: 'skip-query'
    })
    contacts.push(...resp.data)
  }
  return contacts
}

const getAllContactsBookmark = async () => {
  const query = new QueryDefinition({
    doctype: 'io.cozy.contacts',
    limit: 100
  })
  const contacts = await client.queryAll(query, { as: 'bookmark-query' })
  return contacts
}

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
  const uri = process.env.COZY_URL || 'http://cozy.tools:8080'
  const token = process.env.COZY_TOKEN
  if (!token) {
    throw new Error('You should provide COZY_TOKEN as an environement variable')
  }
  client = new CozyClient({ uri, token, schema })

  const count = 10000

  await deleteAllContactsBulk()
  await createContactsBulk(count)
  // reset store to avoid side effects from previous queries
  client.store = null

  console.time(count + ' contacts no pagination')
  await getAllContacts()
  console.timeEnd(count + ' contacts no pagination')

  client.store = null

  console.time(count + ' contacts skip')
  await getAllContactsSkip()
  console.timeEnd(count + ' contacts skip')

  client.store = null

  console.time(count + ' contacts bookmark')
  await getAllContactsBookmark()
  console.timeEnd(count + ' contacts bookmark')
}

main(process.argv).catch(e => console.error(e))
