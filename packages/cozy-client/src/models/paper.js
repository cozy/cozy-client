import sub from 'date-fns/sub'

import { IOCozyFile } from '../types'
import {
  national_id_card,
  residence_permit,
  personal_sporting_licence
} from './document/identityLabels'

const paperConfig = {
  national_id_card: {
    expiration: {
      condition: national_id_card.expirationCondition,
      date: national_id_card.expirationDate
    },
    notice: {
      link: national_id_card.noticeLink,
      period: national_id_card.noticePeriod
    }
  },
  residence_permit: {
    expiration: {
      condition: residence_permit.expirationCondition,
      date: residence_permit.expirationDate
    },
    notice: {
      link: residence_permit.noticeLink,
      period: residence_permit.noticePeriod
    }
  },
  personal_sporting_licence: {
    expiration: {
      condition: personal_sporting_licence.expirationCondition,
      date: personal_sporting_licence.expirationDate
    },
    notice: {
      period: personal_sporting_licence.noticePeriod
    }
  }
}

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 */
export const isExpiring = file => {
  const label = file.metadata?.qualification?.label
  if (label == null) {
    return false
  }
  const isExpiring = paperConfig?.[label]?.expiration?.condition
  if (isExpiring == null) {
    return false
  }
  return isExpiring(file)
}

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {Date | null} Expiration date
 */
export const computeExpirationDate = file => {
  if (!isExpiring(file)) {
    return null
  }
  const label = file.metadata?.qualification?.label
  if (label == null) {
    return null
  }
  const computeExpirationDate = paperConfig?.[label]?.expiration?.date
  if (computeExpirationDate == null) {
    return null
  }
  return computeExpirationDate(file)
}

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {number | null} Expiration notice period in days
 */
const computeExpirationNoticePeriodInDays = file => {
  if (!isExpiring(file)) {
    return null
  }
  const label = file.metadata?.qualification?.label
  if (label == null) {
    return null
  }
  const computeExpirationNoticePeriodInDays =
    paperConfig?.[label]?.notice?.period
  if (computeExpirationNoticePeriodInDays == null) {
    return null
  }
  return computeExpirationNoticePeriodInDays(file)
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
  if (!isExpiring(file)) {
    return null
  }
  const label = file.metadata?.qualification?.label
  if (label == null) {
    return null
  }
  const computeExpirationNoticeLink = paperConfig?.[label]?.notice?.link
  if (computeExpirationNoticeLink == null) {
    return null
  }
  return computeExpirationNoticeLink(file)
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
