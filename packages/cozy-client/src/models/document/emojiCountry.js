const emojiCountry = {
  fr: '🇫🇷'
}

/**
 * @param {string} country - fr, en, etc
 * @param {Function} t - Translation function
 * @returns {string} - Emoji of country
 */
export const getEmojiByCountry = (country, t) => {
  if (country === 'stranger') return t('country.stranger')

  return emojiCountry[country]
}
