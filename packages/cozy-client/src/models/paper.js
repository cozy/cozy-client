import add from 'date-fns/add'
import sub from 'date-fns/sub'

import { IOCozyFile } from '../types'

const PERSONAL_SPORTING_LICENCE_PERIOD_DAYS = 365
const PERSONAL_SPORTING_LICENCE_NOTICE_PERIOD_DAYS = 15

const paperTypesThatMightExpire = Object.assign(Object.create(null), {
  national_id_card: {
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {boolean}
     */
    isExpiring(file) {
      const country = file.metadata?.country
      const expirationDate = file.metadata?.expirationDate
      const noticePeriod = file.metadata?.noticePeriod
      if ((!country || country === 'fr') && expirationDate && noticePeriod) {
        return true
      }
      return false
    },

    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {Date | null}
     */
    computeExpirationDate(file) {
      if (!paperTypesThatMightExpire.national_id_card.isExpiring(file)) {
        return null
      }
      const expirationDate = file.metadata?.expirationDate
      return new Date(expirationDate)
    },

    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {number | null}
     */
    computeExpirationNoticePeriodInDays(file) {
      if (!paperTypesThatMightExpire.national_id_card.isExpiring(file)) {
        return null
      }
      const noticePeriodInDays = file.metadata?.noticePeriod
      return parseInt(noticePeriodInDays, 10)
    },

    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {string | null}
     */
    computeExpirationNoticeLink(file) {
      if (!paperTypesThatMightExpire.national_id_card.isExpiring(file)) {
        return null
      }
      return 'https://www.service-public.fr/particuliers/vosdroits/N358'
    }
  },
  residence_permit: {
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {boolean}
     */
    isExpiring(file) {
      const expirationDate = file.metadata?.expirationDate
      const noticePeriod = file.metadata?.noticePeriod
      if (expirationDate && noticePeriod) {
        return true
      }
      return false
    },

    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {Date | null}
     */
    computeExpirationDate(file) {
      if (!paperTypesThatMightExpire.residence_permit.isExpiring(file)) {
        return null
      }
      const expirationDate = file.metadata?.expirationDate
      return new Date(expirationDate)
    },

    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {number | null}
     */
    computeExpirationNoticePeriodInDays(file) {
      if (!paperTypesThatMightExpire.residence_permit.isExpiring(file)) {
        return null
      }
      const noticePeriodInDays = file.metadata?.noticePeriod
      return parseInt(noticePeriodInDays, 10)
    },

    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {string | null}
     */
    computeExpirationNoticeLink(file) {
      if (!paperTypesThatMightExpire.residence_permit.isExpiring(file)) {
        return null
      }
      return 'https://www.service-public.fr/particuliers/vosdroits/N110'
    }
  },
  personal_sporting_licence: {
    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {boolean}
     */
    isExpiring(file) {
      const referencedDate = file.metadata?.referencedDate
      const created_at = file.created_at
      if (referencedDate || created_at) {
        return true
      }
      return false
    },

    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {Date | null}
     */
    computeExpirationDate(file) {
      if (
        !paperTypesThatMightExpire.personal_sporting_licence.isExpiring(file)
      ) {
        return null
      }
      const referencedDate = file.metadata?.referencedDate
      const created_at = file.created_at
      return add(new Date(referencedDate ?? created_at), {
        days: PERSONAL_SPORTING_LICENCE_PERIOD_DAYS
      })
    },

    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {number | null}
     */
    computeExpirationNoticePeriodInDays(file) {
      if (
        !paperTypesThatMightExpire.personal_sporting_licence.isExpiring(file)
      ) {
        return null
      }
      return PERSONAL_SPORTING_LICENCE_NOTICE_PERIOD_DAYS
    },

    /**
     * @param {IOCozyFile} file - io.cozy.files document
     * @returns {string | null}
     */
    computeExpirationNoticeLink(file) {
      return null
    }
  }
})

/**
 * @param {IOCozyFile} file - io.cozy.files document
 * @returns {boolean}
 */
export const isExpiring = file => {
  const label = file.metadata?.qualification?.label
  if (label == null) {
    return false
  }
  const isExpiring = paperTypesThatMightExpire?.[label]?.isExpiring
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
  const label = file.metadata?.qualification?.label
  if (label == null) {
    return null
  }
  const computeExpirationDate =
    paperTypesThatMightExpire?.[label]?.computeExpirationDate
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
  const label = file.metadata?.qualification?.label
  if (label == null) {
    return null
  }
  const computeExpirationNoticePeriodInDays =
    paperTypesThatMightExpire?.[label]?.computeExpirationNoticePeriodInDays
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
  const label = file.metadata?.qualification?.label
  if (label == null) {
    return null
  }
  const computeExpirationNoticeLink =
    paperTypesThatMightExpire?.[label]?.computeExpirationNoticeLink
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
