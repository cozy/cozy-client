import add from 'date-fns/add'
import sub from 'date-fns/sub'

import { IOCozyFile } from '../types'

const PERSONAL_SPORTING_LICENCE_PERIOD_DAYS = 365
const PERSONAL_SPORTING_LICENCE_NOTICE_PERIOD_DAYS = 15

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
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
