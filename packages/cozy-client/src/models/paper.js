import add from 'date-fns/add'
import sub from 'date-fns/sub'

/**
 * @typedef {import("../types").IOCozyFile} IOCozyFile
 */

const PERSONAL_SPORTING_LICENCE_PERIOD_DAYS = 365
const PERSONAL_SPORTING_LICENCE_NOTICE_PERIOD_DAYS = 15

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 * @description Tells if a given file is a national id card, is French, has an expiration date set and has a notice period set
 */
const isExpiringFrenchNationalIdCard = file => {
  const label = file.metadata?.qualification?.label
  const country = file.metadata?.country
  const expirationDate = file.metadata?.expirationDate
  const noticePeriod = file.metadata?.noticePeriod
  if (
    label === 'national_id_card' &&
    (!country || country === 'fr') &&
    expirationDate &&
    noticePeriod
  ) {
    return true
  }
  return false
}

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 * @description Tells if a given file is a residence permit, has an expiration date set and a notice period set
 */
const isExpiringResidencePermit = file => {
  const label = file.metadata?.qualification?.label
  const expirationDate = file.metadata?.expirationDate
  const noticePeriod = file.metadata?.noticePeriod
  if (label === 'residence_permit' && expirationDate && noticePeriod) {
    return true
  }
  return false
}

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 * @description Tells if a given file is a sporting license, has a reference date set or a creation date if not
 */
const isExpiringPersonalSportingLicense = file => {
  const label = file.metadata?.qualification?.label
  const referencedDate = file.metadata?.referencedDate
  const created_at = file.created_at
  if (label === 'personal_sporting_licence' && (referencedDate || created_at)) {
    return true
  }
  return false
}

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 * @description Tells if a given file matches one of the known types of expiring papers
 */
export const isExpiring = file => {
  if (isExpiringFrenchNationalIdCard(file)) {
    return true
  }
  if (isExpiringResidencePermit(file)) {
    return true
  }
  if (isExpiringPersonalSportingLicense(file)) {
    return true
  }
  return false
}

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {Date | null} Expiration date
 * @description Computes et returns the expiration date of the given file, or null if it is not expiring
 */
export const computeExpirationDate = file => {
  if (isExpiringFrenchNationalIdCard(file) || isExpiringResidencePermit(file)) {
    const expirationDate = file.metadata?.expirationDate
    return new Date(expirationDate)
  }
  if (isExpiringPersonalSportingLicense(file)) {
    const referencedDate = file.metadata?.referencedDate
    const created_at = file.created_at
    return add(new Date(referencedDate ?? created_at), {
      days: PERSONAL_SPORTING_LICENCE_PERIOD_DAYS
    })
  }
  return null
}

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {number | null} Expiration notice period in days
 * @description Computes et returns the expiration notice period of the given file, or null if it is not expiring
 */
const computeExpirationNoticePeriodInDays = file => {
  if (isExpiringFrenchNationalIdCard(file) || isExpiringResidencePermit(file)) {
    const noticePeriodInDays = file.metadata?.noticePeriod
    return parseInt(noticePeriodInDays, 10)
  }
  if (isExpiringPersonalSportingLicense(file)) {
    return PERSONAL_SPORTING_LICENCE_NOTICE_PERIOD_DAYS
  }
  return null
}

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {Date | null} Expiration notice date
 * @description Computes et returns the expiration notice date of the given file, or null if it is not expiring
 */
export const computeExpirationNoticeDate = file => {
  const expirationDate = computeExpirationDate(file)
  if (expirationDate == null) {
    return null
  }
  const noticePeriodInDays = computeExpirationNoticePeriodInDays(file)
  if (noticePeriodInDays == null) {
    return null
  }
  return sub(expirationDate, {
    days: noticePeriodInDays
  })
}

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {string | null} Expiration notice link
 * @description Computes et returns the expiration notice link of the given file, or null if it has none or it is not expiring
 */
export const computeExpirationNoticeLink = file => {
  if (isExpiringFrenchNationalIdCard(file)) {
    return 'https://www.service-public.fr/particuliers/vosdroits/N358'
  }
  if (isExpiringResidencePermit(file)) {
    return 'https://www.service-public.fr/particuliers/vosdroits/N110'
  }
  return null
}

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 * @description Tells if the given file is expiring and if today is after its expiration date
 */
export const isExpired = file => {
  const now = new Date()
  const expirationDate = computeExpirationDate(file)
  const isExpired = expirationDate != null && expirationDate <= now
  return isExpired
}

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 * @description Tells if the given file is expiring and if today is between its expiration notice date and its expiration date
 */
export const isExpiringSoon = file => {
  const now = new Date()
  const expirationDate = computeExpirationDate(file)
  const expirationNoticeDate = computeExpirationNoticeDate(file)
  const isExpiringSoon =
    expirationDate != null &&
    expirationNoticeDate != null &&
    expirationNoticeDate <= now &&
    now < expirationDate
  return isExpiringSoon
}
