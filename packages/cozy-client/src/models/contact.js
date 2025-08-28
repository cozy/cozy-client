import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import logger from '../logger'

export const CONTACTS_DOCTYPE = 'io.cozy.contacts'

/**
 * @typedef {'namePrefix'|'givenName'|'additionalName'|'familyName'|'nameSuffix'} FullnameAttributes
 */

export const getPrimaryOrFirst = property => obj =>
  !obj || !obj[property] || obj[property].length === 0 || !obj[property][0]
    ? ''
    : obj[property].find(property => property.primary) || obj[property][0]

/**
 * Returns the initials of the contact.
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - the contact's initials
 */
export const getInitials = contact => {
  if (contact?.name?.givenName || contact?.name?.familyName) {
    return ['givenName', 'familyName']
      .map(part => get(contact, ['name', part, 0], ''))
      .join('')
      .toUpperCase()
  }

  const email = getPrimaryEmail(contact)
  if (email) {
    return email[0].toUpperCase()
  }

  const cozy = getPrimaryCozyDomain(contact)
  if (cozy) {
    return cozy[0].toUpperCase()
  }

  return ''
}

/**
 * Returns the contact's main email
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - The contact's main email
 */
export const getPrimaryEmail = contact =>
  Array.isArray(contact.email)
    ? getPrimaryOrFirst('email')(contact).address || ''
    : contact.email

/**
 * Returns the contact's main cozy
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - The contact's main cozy
 */
export const getPrimaryCozy = contact =>
  Array.isArray(contact.cozy)
    ? getPrimaryOrFirst('cozy')(contact).url || ''
    : contact.url

/**
 * Returns the contact's main cozy url without protocol
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - The contact's main cozy url
 */
export const getPrimaryCozyDomain = contact => {
  try {
    const url = new URL(getPrimaryCozy(contact))
    return url.hostname.replace(/^(www.)/g, '')
  } catch {
    return getPrimaryCozy(contact)
  }
}

/**
 * Returns the contact's main phone number
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - The contact's main phone number
 */
export const getPrimaryPhone = contact =>
  getPrimaryOrFirst('phone')(contact).number || ''

/**
 * Returns the contact's main address
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - The contact's main address
 */
export const getPrimaryAddress = contact =>
  getPrimaryOrFirst('address')(contact).formattedAddress || ''

/**
 * @type {FullnameAttributes[]}
 */
const defaultFullnameAttributes = [
  'namePrefix',
  'givenName',
  'additionalName',
  'familyName',
  'nameSuffix'
]

/**
 * Makes fullname from contact name
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @param {{ attributesFullname: FullnameAttributes[] }} [opts] - Options
 * @returns {string} - The contact's fullname
 */
export const makeFullname = (contact, opts) => {
  const fullnameAttributes =
    opts?.attributesFullname || defaultFullnameAttributes
  if (contact.name) {
    return fullnameAttributes
      .map(part => contact.name[part])
      .filter(part => part !== undefined)
      .join(' ')
      .trim()
  }

  return ''
}

/**
 * Returns the contact's fullname
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - The contact's fullname
 */
export const getFullname = contact => {
  if (get(contact, 'fullname')) {
    return contact.fullname
  }

  return makeFullname(contact)
}

/**
 * Makes displayName from contact data
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @param {{ attributesFullname: FullnameAttributes[] }} [opts] - Options
 * @returns {string} - The contact's displayName
 */
export const makeDisplayName = (contact, opts) => {
  const fullname = makeFullname(contact, opts)
  const primaryEmail = getPrimaryEmail(contact)
  const primaryCozyDomain = getPrimaryCozyDomain(contact)

  if (fullname && fullname.length > 0) {
    return fullname
  }
  if (primaryEmail && primaryEmail.length > 0) {
    return primaryEmail
  }
  if (primaryCozyDomain && primaryCozyDomain.length > 0) {
    return primaryCozyDomain
  }

  return ''
}

/**
 * Returns a display name for the contact
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - the contact's display name
 **/
export const getDisplayName = contact => {
  if (get(contact, 'displayName')) {
    return contact.displayName
  }

  return makeDisplayName(contact)
}

/**
 * Makes 'byFamilyNameGivenNameEmailCozyUrl' index of a contact
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - the contact's 'byFamilyNameGivenNameEmailCozyUrl' index
 */
export const makeDefaultSortIndexValue = contact => {
  const defaultSortIndexValue = [
    get(contact, 'name.familyName', ''),
    get(contact, 'name.givenName', ''),
    getPrimaryEmail(contact),
    getPrimaryCozyDomain(contact)
  ]
    .join('')
    .trim()
    .toLowerCase()

  if (defaultSortIndexValue.length === 0) {
    return null
  }

  return defaultSortIndexValue
}

/**
 * Returns 'byFamilyNameGivenNameEmailCozyUrl' index of a contact
 *
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - the contact's 'byFamilyNameGivenNameEmailCozyUrl' index
 */
export const getDefaultSortIndexValue = contact => {
  const defaultSortIndexValue = get(
    contact,
    'indexes.byFamilyNameGivenNameEmailCozyUrl',
    null
  )

  if (defaultSortIndexValue !== null) {
    return isEmpty(defaultSortIndexValue) ? null : defaultSortIndexValue
  }

  return makeDefaultSortIndexValue(contact)
}

/**
 * Returns 'byFamilyNameGivenNameEmailCozyUrl' index of a contact
 *
 * @deprecated Prefer to use getDefaultSortIndexValue.
 * @param {import('../types').IOCozyContact} contact - A contact
 * @returns {string} - the contact's 'byFamilyNameGivenNameEmailCozyUrl' index
 */
export const getIndexByFamilyNameGivenNameEmailCozyUrl = contact => {
  logger.warn(
    'Deprecation: `getIndexByFamilyNameGivenNameEmailCozyUrl` is deprecated, please use `getDefaultSortIndexValue` instead'
  )

  return getDefaultSortIndexValue(contact)
}

/**
 * Whether the document is a contact
 *
 * @param {object} doc - A document (from io.cozy.something, or com.bitwarden or anything else)
 * @returns {boolean}
 */
export const isContact = doc => doc._type === CONTACTS_DOCTYPE

/**
 * Removed unwanted characters on contact's formatted address
 *
 * @param {string} formattedAddress - The contact's formatted address
 * @returns {string}
 */
export const cleanFormattedAddress = formattedAddress => {
  // Replace all spaces by one space, to fix cases where there are multiple spaces
  // Replace commas that have a space before
  // And remove all spaces before & after the string
  let formattedAddressClean = formattedAddress
    .replace(/\s+/g, ' ')
    .replace(/\s,/g, '')
    .trim()

  // Case where a comma is the last character
  if (
    formattedAddressClean.lastIndexOf(',') ===
    formattedAddressClean.length - 1
  ) {
    formattedAddressClean = formattedAddressClean.slice(
      0,
      formattedAddressClean.length - 1
    )
  }

  // Case where a comma is the first character
  if (formattedAddressClean.indexOf(',') === 0) {
    formattedAddressClean = formattedAddressClean.slice(1)
  }

  return formattedAddressClean
}

/**
 * Returns the contact's formatted address
 *
 * @param {object} address - A contact address
 * @param {function} t - Translate function
 * @returns {string} - The contact's formatted address
 */
export const getFormattedAddress = (address, t) => {
  if (address && address.formattedAddress) {
    return address.formattedAddress
  }

  const unformattedAddress = {
    number: address.number || '',
    street: address.street || '',
    code: address.postcode || '',
    city: address.city || '',
    region: address.region || '',
    country: address.country || ''
  }

  return cleanFormattedAddress(t('formatted.address', unformattedAddress))
}

/**
 * Update fullname, displayName and Index values of a contact
 *
 * @param {object} contact - an io.cozy.contact document
 * @returns {object} an io.cozy.contact document
 */
export const updateIndexFullNameAndDisplayName = contact => {
  return {
    ...contact,
    fullname: makeFullname(contact),
    displayName: makeDisplayName(contact),
    indexes: {
      byFamilyNameGivenNameEmailCozyUrl: makeDefaultSortIndexValue(contact)
    }
  }
}
