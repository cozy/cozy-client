// @ts-check
import _flow from 'lodash/flow'
import _cloneDeep from 'lodash/cloneDeep'
import findKey from 'lodash/findKey'

export const ROLE_IDENTIFIER = 'identifier'

const DAILY = 'daily'
const HOURLY = 'hourly'
const WEEKLY = 'weekly'
const MONTHLY = 'monthly'
const VALID_FREQUENCIES = [DAILY, HOURLY, WEEKLY, MONTHLY]

const DEFAULT_FREQUENCY = WEEKLY
// By default konnectors are run at random hour between 12:00PM and 05:00AM.
const DEFAULT_TIME_INTERVAL = [0, 5]

/**
 * Legacy login fields declared by some konnectors
 */
export const legacyLoginFields = [
  'login',
  'identifier',
  'new_identifier',
  'email'
]

const legacyEncryptedFields = [
  'secret',
  'dob',
  'code',
  'answer',
  'access_token',
  'refresh_token',
  'appSecret'
]

const APP_CATEGORIES = [
  'banking',
  'cozy',
  'energy',
  'health',
  'host_provider',
  'insurance',
  'isp',
  'mes_infos',
  'online_services',
  'others',
  'partners',
  'press',
  'productivity',
  'ptnb',
  'public_service',
  'shopping',
  'social',
  'telecom',
  'transport'
]

/**
 * Filters unauthorized categories. Defaults to ['others'] if no suitable category.
 *
 * @param {Array<Object>} categories - Array of categories
 * @returns {Array<Object>} sanitized categories
 */
export function sanitizeCategories(categories) {
  if (!categories) return ['others']
  const filteredList = categories.filter(c => APP_CATEGORIES.includes(c))
  if (!filteredList.length) return ['others']
  return filteredList
}

export function areTermsValid(terms) {
  return Boolean(terms && terms.id && terms.url && terms.version)
}

export function isPartnershipValid(partnership) {
  return Boolean(partnership && partnership.description)
}

/**
 * Normalize app manifest, retro-compatibility for old manifests
 *
 * @param  {import('../types').Manifest} manifest - app manifest to normalize
 * @returns {import('../types').SanitizedManifest}
 */
export function sanitize(manifest) {
  const sanitized = { ...manifest }

  // Make categories an array and delete category attribute if it exists
  if (
    !manifest.categories &&
    manifest.category &&
    typeof manifest.category === 'string'
  ) {
    sanitized.categories = [manifest.category]
    delete sanitized.category
  }

  sanitized.categories = sanitizeCategories(sanitized.categories)

  // manifest name is not an object
  if (typeof manifest.name === 'object') sanitized.name = manifest.name.en

  // Fix camelCase from cozy-stack
  if (manifest.available_version) {
    sanitized.availableVersion = manifest.available_version
    delete sanitized.available_version
  }

  // Fix camelCase from cozy-stack
  if (manifest.latest_version) {
    sanitized.latestVersion = manifest.latestVersion
    delete sanitized.latest_version
  }

  // Remove invalid terms
  if (sanitized.terms && !areTermsValid(sanitized.terms)) {
    delete sanitized.terms
  }

  // Remove invalid partnership
  if (sanitized.partnership && !isPartnershipValid(sanitized.partnership)) {
    delete sanitized.partnership
  }

  if (sanitized.fields) {
    sanitized.fields = sanitizeFields(manifest.fields)
  }

  return sanitized
}

/**
 * Ensures that fields has at least one field with the role 'identifier'
 *
 * @param  {import('../types').ManifestFields} fields - Manifest fields
 * @returns {import('../types').ManifestFields} - Sanitized manifest fields
 */
export const sanitizeIdentifier = fields => {
  const sanitized = _cloneDeep(fields)
  let hasIdentifier = false
  for (let fieldName in sanitized)
    if (sanitized[fieldName].role === ROLE_IDENTIFIER) {
      if (hasIdentifier) delete sanitized[fieldName].role
      else hasIdentifier = true
    }
  if (hasIdentifier) return sanitized

  for (let name of legacyLoginFields)
    if (sanitized[name]) {
      sanitized[name].role = ROLE_IDENTIFIER
      return sanitized
    }

  for (let fieldName in sanitized)
    if (sanitized[fieldName].type !== 'password') {
      sanitized[fieldName].role = ROLE_IDENTIFIER
      return sanitized
    }

  return sanitized
}

/**
 * Returns the key for the field having the role=identifier attribute
 *
 * @param  {import('../types').ManifestFields} fields Konnector fields
 * @returns {String|null}  The key for the identifier field, example 'login'
 */
export const getIdentifier = (fields = {}) =>
  findKey(
    sanitizeIdentifier(fields),
    field => field.role === ROLE_IDENTIFIER
  ) || null
/**
 * Ensures old fields are removed
 *
 * @param  {Object} fields Manifest fields
 * @returns {Object}        Sanitized manifest fields
 */
const removeOldFields = fields => {
  const sanitized = _cloneDeep(fields)
  delete sanitized.advancedFields
  return sanitized
}

/**
 * Ensures every field not explicitely tagged as not required is required
 *
 * @param  {import('../types').ManifestFields} [fields={}] Manifest fields
 * @returns {import('../types').ManifestFields}            Sanitized manifest fields
 */
const sanitizeRequired = fields => {
  const sanitized = _cloneDeep(fields)
  for (let fieldName in sanitized) {
    const field = sanitized[fieldName]
    // Ensure legacy for field isRequired
    const required =
      typeof field.required === 'undefined' ? field.isRequired : field.required
    sanitized[fieldName].required =
      typeof required === 'boolean' ? required : true
  }

  return sanitized
}

/**
 * Ensures:
 * * any field flagged as encrypted keeps its flag
 * * any legacy encrypted field is tagged as encrypted
 *
 * @param  {import('../types').ManifestFields} [fields={}] Manifest fields
 * @returns {import('../types').ManifestFields}             Sanitized Manifest fields
 */
const sanitizeEncrypted = fields => {
  const sanitized = _cloneDeep(fields)
  for (let fieldName in sanitized) {
    const field = sanitized[fieldName]
    if (typeof field.encrypted !== 'boolean')
      field.encrypted =
        field.type === 'password' || legacyEncryptedFields.includes(fieldName)
  }
  return sanitized
}

/**
 * Sanitizes manifest fields with multiple rules
 *
 * @param  {import('../types').ManifestFields} [fields={}] Manifest fields
 * @returns {import('../types').ManifestFields}            Sanitized manifest fields
 */
const sanitizeFields = _flow([
  removeOldFields,
  sanitizeIdentifier,
  sanitizeRequired,
  sanitizeEncrypted
])

/**
 * Returns an hour of the day between two hours given in parameters
 *
 * @param {number} start minimal start hour
 * @param {number} end maximal end hour
 * @param {function} randomize The function used to generate random values
 * @returns {randomDayTimeResult} Object containing two atributes : hours and minutes
 */
export const randomDayTime = (
  start = 0,
  end = 1,
  randomize = (min, max) => Math.random() * (max - min) + min
) => {
  if (typeof start !== 'number')
    throw new Error('Parameter start must be a number')
  if (typeof end !== 'number') throw new Error('Parameter end must be a number')

  if (typeof randomize !== 'function')
    throw new Error('Parameter randomize must be a function')

  if (start < 0 || end > 24) throw new Error('interval must be inside [0, 24]')

  const r = randomize(start, end)
  const hours = Math.floor(r)
  const minutes = Math.floor((r - hours) * 60)

  if (hours < 0 || hours > 23)
    throw new Error('randomize function returns invalid hour value')

  return { hours, minutes }
}

/**
 * Build a cron string for given frequency with given options
 * See https://docs.cozy.io/en/cozy-stack/jobs/#cron-syntax
 *
 * @param  {'hourly'|'daily'|'weekly'|'monthly'} frequency Frequency
 * @param  {FrequencyOptions} [options] - FrequencyOptions object
 * @returns {String} - The cron definition for trigger
 */
export const getCronFromFrequency = (frequency, options = {}) => {
  const { dayOfMonth = 1, dayOfWeek = 1, hours = 0, minutes = 0 } = options
  const sanitizedFrequency = VALID_FREQUENCIES.includes(frequency)
    ? frequency
    : DEFAULT_FREQUENCY

  switch (sanitizedFrequency) {
    case DAILY:
      return `0 ${minutes} ${hours} * * *`
    case HOURLY:
      return `0 ${minutes} * * * *`
    case MONTHLY:
      return `0 ${minutes} ${hours} ${dayOfMonth} * *`
    default:
      // also WEEKLY
      return `0 ${minutes} ${hours} * * ${dayOfWeek}`
  }
}

/**
 * Build a cron string for given konnector and from a given start date
 *
 * @param {import('../types').IOCozyKonnector} konnector - io.cozy.konnectors object
 * @param {Date} startDate - start date
 * @param {function} [randomDayTimeFn] - function generating random hours and minutes
 * @returns {String} - The cron definition for trigger
 */
export const getCronFromKonnector = (
  konnector,
  startDate = new Date(),
  randomDayTimeFn = randomDayTime
) =>
  getCronFromFrequency(konnector.frequency, {
    ...randomDayTimeFn.apply(
      null,
      konnector.time_interval || DEFAULT_TIME_INTERVAL
    ),
    dayOfWeek: startDate.getDay(),
    dayOfMonth: startDate.getDate()
  })

/**
 * @typedef {object} randomDayTimeResult
 * @property {number} hours - hours
 * @property {number} minutes - minutes
 */

/**
 * @typedef {object} FrequencyOptions - frequency options object
 * @property {Number} [dayOfMonth] - day of the month
 * @property {Number} [dayOfWeek] - day of the week
 * @property {Number} [hours] - hours
 * @property {Number} [minutes] - minutes
 */
