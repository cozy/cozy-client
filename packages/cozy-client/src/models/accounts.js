import get from 'lodash/get'

/**
 * getMutedErrors - Returns the list of erros that have been muted for tyhe given account
 *
 * @param {object} account io.cozy.accounts
 *
 * @returns {Array} AN array of errors with a `type` and `mutedAt` field
 */
export const getMutedErrors = account => get(account, 'mutedErrors', [])
