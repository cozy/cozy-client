import logger from '../../logger'

// The offset between uppercase ASCII and regional indicator symbols
const UNICODE_OFFSET = 127397

/**
 * @param {string} countryCode - ISO 3166-1 alpha-2 (eg. fr, us, etc)
 * @returns {string} - Emoji of country
 */
export const getEmojiByCountry = countryCode => {
  if (!countryCode) return null

  if (!/^[a-z]{2}$/i.test(countryCode)) {
    logger.error(
      `Country argument must be an ISO 3166-1 alpha-2 string, but got '${JSON.stringify(
        countryCode
      )}' instead.`
    )
    return null
  }
  const codePoints = [...countryCode.toUpperCase()].map(
    letter => letter.codePointAt(0) + UNICODE_OFFSET
  )

  return String.fromCodePoint(...codePoints)
}
