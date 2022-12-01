import add from 'date-fns/add'
import sub from 'date-fns/sub'
import get from 'lodash/get'

import { IOCozyFile } from '../types'

const DEFAULT_NOTICE_PERIOD_DAYS = 90
const PERSONAL_SPORTING_LICENCE_PERIOD_DAYS = 365
const PERSONAL_SPORTING_LICENCE_NOTICE_PERIOD_DAYS = 15

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 */
const isExpiringFrenchNationalIdCard = file => {
  const label = get(file, 'metadata.qualification.label', null)
  const country = get(file, 'metadata.country', null)
  const expirationDate = get(file, 'metadata.expirationDate', null)
  if (
    label === 'national_id_card' &&
    (!country || country === 'fr') &&
    expirationDate
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
  const label = get(file, 'metadata.qualification.label', null)
  const expirationDate = get(file, 'metadata.expirationDate', null)
  if (label === 'residence_permit' && expirationDate) {
    return true
  }
  return false
}

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 */
const isExpiringPersonalSportingLicense = file => {
  const label = get(file, 'metadata.qualification.label', null)
  const referencedDate = get(file, 'metadata.referencedDate', null)
  const created_at = get(file, 'created_at', null)
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
    const expirationDate = get(file, 'metadata.expirationDate', null)
    return new Date(expirationDate)
  }
  if (isExpiringPersonalSportingLicense(file)) {
    const referencedDate = get(file, 'metadata.referencedDate', null)
    const created_at = get(file, 'created_at', null)
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
    const noticePeriodInDays = get(file, 'metadata.noticePeriod', null)
    return noticePeriodInDays
      ? parseInt(noticePeriodInDays, 10)
      : DEFAULT_NOTICE_PERIOD_DAYS
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
