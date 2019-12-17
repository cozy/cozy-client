import get from 'lodash/get'

/**
 * getMutedErrors - Returns the list of errors that have been muted for the given account
 *
 * @param {object} account io.cozy.accounts
 *
 * @returns {Array} An array of errors with a `type` and `mutedAt` field
 */
export const getMutedErrors = account => get(account, 'mutedErrors', [])

/**
 * muteError - Adds an error to the list of muted errors for the given account
 *
 * @param {object} account   io.cozy.accounts
 * @param {string} errorType The type of the error to mute
 *
 * @returns {object} An updated io.cozy.accounts
 */
export const muteError = (account, errorType) => {
  const mutedErrors = getMutedErrors(account)
  mutedErrors.push({
    type: errorType,
    mutedAt: new Date().toISOString()
  })

  return { ...account, mutedErrors }
}
