import add from 'date-fns/add'
import sub from 'date-fns/sub'

import { IOCozyFile } from '../types'

const DEFAULT_NOTICE_PERIOD_DAYS = 90
const PERSONAL_SPORTING_LICENCE_NOTICE_PERIOD_DAYS = 15

const papersDefinitions = {
  notifications: {
    papersToNotify: [
      {
        label: 'national_id_card',
        country: 'fr',
        expirationDateAttribute: 'expirationDate'
      },
      {
        label: 'residence_permit',
        expirationDateAttribute: 'expirationDate'
      },
      {
        label: 'personal_sporting_licence',
        expirationDateAttribute: 'referencedDate'
      }
    ]
  }
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

/**
 * @param {IOCozyFile} file - An CozyFile
 * @returns {{ label: string, country?: string, expirationDateAttribute: string }} papersToNotify - Rule in the paperDefinitions file
 */
export const getPaperToNotify = file => {
  const { papersToNotify } = papersDefinitions.notifications

  return papersToNotify.find(({ label, expirationDateAttribute, country }) => {
    let validCountry = true
    if (country && country !== 'fr') {
      validCountry = file.metadata.country === country
    }

    return (
      validCountry &&
      label === file.metadata.qualification.label &&
      file.metadata[expirationDateAttribute]
    )
  })
}
