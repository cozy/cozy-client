import add from 'date-fns/add'
import sub from 'date-fns/sub'
import get from 'lodash/get'

import { IOCozyFile } from '../types'

const DEFAULT_NOTICE_PERIOD_DAYS = 90
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
 * @param {IOCozyFile} file - An CozyFile
 * @param {string} dateLabel - Label of date
 * @returns {Date} Normalize expiration date
 */
export const computeNormalizeExpirationDate = (file, dateLabel) => {
  if (file.metadata[dateLabel]) {
    if (dateLabel === 'referencedDate') {
      return add(new Date(file.metadata[dateLabel] ?? file.created_at), {
        days: 365
      })
    }
    return new Date(file.metadata[dateLabel])
  }

  return null
}

/**
 * @param {IOCozyFile} file - An CozyFile
 * @param {string} dateLabel - Label of date
 * @returns {Date} Notice date
 */
export const computeNoticeDate = (file, dateLabel) => {
  let noticeDays
  if (file.metadata[dateLabel]) {
    if (dateLabel === 'referencedDate') {
      noticeDays = PERSONAL_SPORTING_LICENCE_NOTICE_PERIOD_DAYS
    }
    if (dateLabel === 'expirationDate') {
      noticeDays =
        parseInt(file.metadata.noticePeriod, 10) || DEFAULT_NOTICE_PERIOD_DAYS
    }
  }
  if (!noticeDays) {
    return null
  }

  const normalizeExpirationDate = computeNormalizeExpirationDate(
    file,
    dateLabel
  )
  return normalizeExpirationDate
    ? sub(normalizeExpirationDate, {
        days: noticeDays
      })
    : null
}
