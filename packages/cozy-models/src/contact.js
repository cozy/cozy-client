import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import logger from './logger'

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
 * @param {import('cozy-client/types/types').IOCozyContact} contact - A contact
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
 * @param {import('cozy-client/types/types').IOCozyContact} contact - A contact
 * @returns {string} - The contact's main email
 */
export const getPrimaryEmail = contact =>
  Array.isArray(contact.email)
    ? getPrimaryOrFirst('email')(contact).address || ''
    : contact.email

/**
 * Returns the contact's main cozy
 *
 * @param {import('cozy-client/types/types').IOCozyContact} contact - A contact
 * @returns {string} - The contact's main cozy
 */
export const getPrimaryCozy = contact =>
  Array.isArray(contact.cozy)
    ? getPrimaryOrFirst('cozy')(contact).url || ''
    : contact.url

/**
 * Returns the contact's main cozy url without protocol
 *
 * @param {import('cozy-client/types/types').IOCozyContact} contact - A contact
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
 * @param {import('cozy-client/types/types').IOCozyContact} contact - A contact
 * @returns {string} - The contact's main phone number
 */
export const getPrimaryPhone = contact =>
  getPrimaryOrFirst('phone')(contact).number || ''

/**
 * Returns the contact's main address
 *
 * @param {import('cozy-client/types/types').IOCozyContact} contact - A contact
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
 * @param {import('cozy-client/types/types').IOCozyContact} contact - A contact
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
 * @param {import('cozy-client/types/types').IOCozyContact} contact - A contact
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
 * @param {import('cozy-client/types/types').IOCozyContact} contact - A contact
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
 * @param {import('cozy-client/types/types').IOCozyContact} contact - A contact
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
 * @param {import('cozy-client/types/types').IOCozyContact} contact - A contact
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
 * @param {import('cozy-client/types/types').IOCozyContact} contact - A contact
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
 * @param {import('cozy-client/types/types').IOCozyContact} contact - A contact
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
