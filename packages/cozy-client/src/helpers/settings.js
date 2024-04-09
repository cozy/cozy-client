import CozyClient from '../CozyClient'
import fetchPolicies from '../policies'
import { Q } from '../queries/dsl'

const defaultFetchPolicy = fetchPolicies.olderThan(60 * 60 * 1000)

/**
 * Query the cozy-app settings corresponding to the given slug and
 * extract the value corresponding to the given `key`
 *
 * @param {CozyClient} client - Cozy client instance
 * @param {string} slug - the cozy-app's slug containing the setting (can be 'instance' for global settings)
 * @param {string} key - The name of the setting to retrieve
 * @returns {Promise<any>} - The value of the requested setting
 */
export const getSetting = async (client, slug, key) => {
  const query = getQuery(slug)

  const currentSettingsResult = await client.query(
    query.definition(),
    query.options
  )

  const currentSettings = normalizeSettings(currentSettingsResult.data)

  return currentSettings[key]
}

/**
 * Save the given value into the corresponding cozy-app setting
 *
 * This methods will first query the cozy-app's settings before injecting the new value and then
 * save the new resulting settings into database
 *
 * @param {CozyClient} client - Cozy client instance
 * @param {string} slug - the cozy-app's slug containing the setting (can be 'instance' for global settings)
 * @param {string} key - The new value of the setting to save
 * @param {any | ((oldValue) => any)} valueOrSetter - The new value of the setting to save. It can be the raw value, or a callback that should return a new value
 * @returns {Promise<any>} - The result of the `client.save()` call
 */
export const saveAfterFetchSetting = async (
  client,
  slug,
  key,
  valueOrSetter
) => {
  const query = getQuery(slug)

  const currentSettingsResult = await client.query(
    query.definition(),
    query.options
  )

  const currentSettings = normalizeSettings(currentSettingsResult.data)

  let value = undefined
  if (typeof valueOrSetter === 'function') {
    value = valueOrSetter(currentSettings[key])
  } else {
    value = valueOrSetter
  }

  const newSettings = editSettings(slug, currentSettings, key, value)

  return await client.save(newSettings)
}

/**
 * Convert a result from a `client.query()` or a `useQuery()` that can be
 * an object or an array of objects into a single object
 *
 * @param {Array | Object} data - Result from a client.query or a useQuery
 * @returns {Object} A single object containing the setting data
 */
export const normalizeSettings = data => {
  const settingsData = Array.isArray(data) ? data[0] : data

  return settingsData || {}
}

/**
 * Edit the given settings by injecting `value` into the `key` entry
 * This methods takes care of the kind of settings that is edited as there are
 * some exceptions in settings formats (i.e. `io.cozy.settings.instance`)
 *
 * @param {string} slug - the cozy-app's slug containing the setting (can be 'instance' for global settings)
 * @param {Object} currentSettings - the Setting object (ideally from a `client.query()` or a `useQuery()` and normalized using `normalizeSettings`)
 * @param {string} key - The name of the setting to edit
 * @param {any} value - The new value for the setting
 * @returns {Object} a new Setting object containing the new value
 */
export const editSettings = (slug, currentSettings, key, value) => {
  const type = getDoctype(slug)

  const newSettings =
    slug === 'instance'
      ? mergeInstance(currentSettings, key, value)
      : mergeSettings(currentSettings, type, key, value)

  return newSettings
}

const mergeInstance = (currentSettings, key, value) => {
  return {
    _id: currentSettings._id,
    _type: currentSettings._type,
    _rev: currentSettings.meta.rev,
    ...currentSettings,
    attributes: {
      ...currentSettings.attributes,
      [key]: value
    },
    [key]: value
  }
}

const mergeSettings = (currentSettings, type, key, value) => {
  return {
    _type: type,
    ...currentSettings,
    [key]: value
  }
}

/**
 * Create a Query that can be used to fetch the cozy-app settings for the given slug
 *
 * @param {string} slug - the cozy-app's slug containing the setting (can be 'instance' for global settings)
 * @returns {import('../types').Query} - the Query that can be used to fetch the cozy-app settings
 */
export const getQuery = slug => {
  if (slug === 'instance') {
    return getNestedSettings(slug)
  }

  if (slug === 'passwords') {
    return getNestedSettings('bitwarden')
  }

  return getRootSettings(slug)
}

const getRootSettings = slug => {
  const settingsDoctype = getDoctype(slug)
  const query = {
    definition: () => Q(settingsDoctype).limitBy(1),
    options: {
      as: settingsDoctype,
      fetchPolicy: defaultFetchPolicy,
      singleDocData: true
    }
  }

  return query
}

const getNestedSettings = slug => {
  const doctype = `io.cozy.settings`
  const subDoctype = getDoctype(slug)
  const query = {
    definition: () => Q(doctype).getById(subDoctype),
    options: {
      as: `${doctype}/${subDoctype}`,
      fetchPolicy: defaultFetchPolicy,
      singleDocData: true
    }
  }

  return query
}

const getDoctype = slug => {
  if (['instance', 'bitwarden'].includes(slug)) {
    return `io.cozy.settings.${slug}`
  }

  if (slug === 'passwords') {
    return 'io.cozy.settings.bitwarden'
  }

  return `io.cozy.${slug}.settings`
}
