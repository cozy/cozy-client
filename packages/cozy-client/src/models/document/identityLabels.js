import add from 'date-fns/add'

import { IOCozyFile } from '../../types'

const PERSONAL_SPORTING_LICENCE_PERIOD_DAYS = 365
const PERSONAL_SPORTING_LICENCE_NOTICE_PERIOD_DAYS = 15

export const national_id_card = {
  /**
   * @param {IOCozyFile} file - io.cozy.files document
   * @returns {boolean}
   */
  expirationCondition(file) {
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
   * @returns {Date}
   */
  expirationDate(file) {
    const expirationDate = file.metadata?.expirationDate
    return new Date(expirationDate)
  },

  /**
   * @param {IOCozyFile} file - io.cozy.files document
   * @returns {string}
   */
  noticeLink(file) {
    return 'https://www.service-public.fr/particuliers/vosdroits/N358'
  },

  /**
   * @param {IOCozyFile} file - io.cozy.files document
   * @returns {number}
   */
  noticePeriod(file) {
    const noticePeriodInDays = file.metadata?.noticePeriod
    return parseInt(noticePeriodInDays, 10)
  }
}

export const residence_permit = {
  /**
   * @param {IOCozyFile} file - io.cozy.files document
   * @returns {boolean}
   */
  expirationCondition(file) {
    const expirationDate = file.metadata?.expirationDate
    const noticePeriod = file.metadata?.noticePeriod
    if (expirationDate && noticePeriod) {
      return true
    }
    return false
  },

  /**
   * @param {IOCozyFile} file - io.cozy.files document
   * @returns {Date}
   */
  expirationDate(file) {
    const expirationDate = file.metadata?.expirationDate
    return new Date(expirationDate)
  },

  /**
   * @param {IOCozyFile} file - io.cozy.files document
   * @returns {string}
   */
  noticeLink(file) {
    return 'https://www.service-public.fr/particuliers/vosdroits/N110'
  },

  /**
   * @param {IOCozyFile} file - io.cozy.files document
   * @returns {number}
   */
  noticePeriod(file) {
    const noticePeriodInDays = file.metadata?.noticePeriod
    return parseInt(noticePeriodInDays, 10)
  }
}
export const personal_sporting_licence = {
  /**
   * @param {IOCozyFile} file - io.cozy.files document
   * @returns {boolean}
   */
  expirationCondition(file) {
    const referencedDate = file.metadata?.referencedDate
    const created_at = file.created_at
    if (referencedDate || created_at) {
      return true
    }
    return false
  },

  /**
   * @param {IOCozyFile} file - io.cozy.files document
   * @returns {Date}
   */
  expirationDate(file) {
    const referencedDate = file.metadata?.referencedDate
    const created_at = file.created_at
    return add(new Date(referencedDate ?? created_at), {
      days: PERSONAL_SPORTING_LICENCE_PERIOD_DAYS
    })
  },

  /**
   * @param {IOCozyFile} file - io.cozy.files document
   * @returns {number}
   */
  noticePeriod(file) {
    return PERSONAL_SPORTING_LICENCE_NOTICE_PERIOD_DAYS
  }
}
