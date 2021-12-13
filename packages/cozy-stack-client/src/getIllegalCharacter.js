/**
 * Get the list of illegal characters in the file name
 *
 * @public
 * @param {string} name - the file name
 * @returns {string} illegal characters separated by spaces
 */
export const getIllegalCharacters = name => {
  const FILENAME_ILLEGAL_CHARACTERS = /\/|\x00|\n|\r/g // eslint-disable-line no-control-regex
  const match = name.match(FILENAME_ILLEGAL_CHARACTERS)
  return match ? match.join(' ') : ''
}
