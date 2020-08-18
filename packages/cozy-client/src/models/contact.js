import { get, capitalize } from 'lodash'
import logger from 'cozy-logger'

export const getPrimaryOrFirst = property => obj =>
  !obj[property] || obj[property].length === 0
    ? ''
    : obj[property].find(property => property.primary) || obj[property][0]

/**
 * Returns the initials of the contact.
 *
 * @param {object} contact - A contact
 * @returns {string} - the contact's initials
 */
export const getInitials = contact => {
  if (contact.name) {
    return ['givenName', 'familyName']
      .map(part => get(contact, ['name', part, 0], ''))
      .join('')
      .toUpperCase()
  }

  const email = getPrimaryEmail(contact)
  if (email) {
    return email[0].toUpperCase()
  }

  logger.warn('Contact has no name and no email.')
  return ''
}

/**
 * Returns the contact's main email
 *
 * @param {object} contact - A contact
 * @returns {string} - The contact's main email
 */
export const getPrimaryEmail = contact =>
  Array.isArray(contact.email)
    ? getPrimaryOrFirst('email')(contact).address || ''
    : contact.email

/**
 * Returns the contact's main cozy
 *
 * @param {object} contact - A contact
 * @returns {string} - The contact's main cozy
 */
export const getPrimaryCozy = contact =>
  Array.isArray(contact.cozy)
    ? getPrimaryOrFirst('cozy')(contact).url || ''
    : contact.url

/**
 * Returns the contact's main cozy url without protocol
 *
 * @param {object} contact - A contact
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
 * @param {object} contact - A contact
 * @returns {string} - The contact's main phone number
 */
export const getPrimaryPhone = contact =>
  getPrimaryOrFirst('phone')(contact).number || ''

/**
 * Returns the contact's main address
 *
 * @param {object} contact - A contact
 * @returns {string} - The contact's main address
 */
export const getPrimaryAddress = contact =>
  getPrimaryOrFirst('address')(contact).formattedAddress || ''

/**
 * Returns the contact's fullname
 *
 * @param {object} contact - A contact
 * @returns {string} - The contact's fullname
 */
export const getFullname = contact => {
  if (get(contact, 'fullname')) {
    return contact.fullname
  } else if (contact.name) {
    return [
      'namePrefix',
      'givenName',
      'additionalName',
      'familyName',
      'nameSuffix'
    ]
      .map(part => contact.name[part])
      .filter(part => part !== undefined)
      .join(' ')
      .trim()
  }
  return ''
}

/**
 * Returns a display name for the contact
 *
 * @param {object} contact - A contact
 * @returns {string} - the contact's display name
 **/
export const getDisplayName = contact =>
  get(
    contact,
    'displayName',
    getFullname(contact) ||
      getPrimaryEmail(contact) ||
      getPrimaryCozyDomain(contact)
  )

/**
 * Returns 'byFamilyNameGivenNameEmailCozyUrl' index of a contact
 *
 * @param {object} contact - A contact
 * @returns {string} - the contact's 'byFamilyNameGivenNameEmailCozyUrl' index
 */
export const getIndexByFamilyNameGivenNameEmailCozyUrl = contact => {
  const indexByFamilyNameGivenNameEmailCozyUrl = capitalize(
    [
      get(contact, 'name.familyName', ''),
      get(contact, 'name.givenName', ''),
      getPrimaryEmail(contact),
      getPrimaryCozyDomain(contact)
    ]
      .join('')
      .trim()
  )

  return get(
    contact,
    'indexes.byFamilyNameGivenNameEmailCozyUrl',
    indexByFamilyNameGivenNameEmailCozyUrl.length === 0
      ? {}
      : indexByFamilyNameGivenNameEmailCozyUrl
  )
}
