import PouchDB from 'pouchdb-browser'

const getNewIndexedDBDatabaseName = dbName => {
  return `${dbName}_indexeddb`
}

/**
 * Migrate a PouchDB database to a new adapter.
 *
 * @param {object} oldPouch - The pouch to migrate
 * @param {string} toAdapter - The target adapter name
 * @returns {object} - The migrated pouch
 */
export const migratePouch = async (oldPouch, toAdapter) => {
  const newdbName = getNewIndexedDBDatabaseName(oldPouch.name)
  const newPouch = new PouchDB(newdbName, {
    adapter: toAdapter,
    location: 'default'
  })
  await oldPouch.replicate.to(newPouch, { batch_size: 1000 })

  await oldPouch.destroy()
  oldPouch = null // See https://web.dev/detached-window-memory-leaks/

  return newPouch
}
