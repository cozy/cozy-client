// @ts-check
import merge from 'lodash/merge'

import { getHasManyItem, updateHasManyItem } from '../associations/HasMany'
import { legacyLoginFields, getIdentifier } from './manifest'
/**
 * @typedef {object} CozyAccount
 */

/**
 * getMutedErrors - Returns the list of errors that have been muted for the given account
 *
 * @param {object} account io.cozy.accounts
 *
 * @returns {Array} An array of errors with a `type` and `mutedAt` field
 */
export const getMutedErrors = account => account?.mutedErrors ?? []

/**
 * muteError - Adds an error to the list of muted errors for the given account
 *
 * @param {CozyAccount} account   io.cozy.accounts
 * @param {string} errorType The type of the error to mute
 *
 * @returns {CozyAccount} An updated io.cozy.accounts
 */
export const muteError = (account, errorType) => {
  const mutedErrors = getMutedErrors(account)
  mutedErrors.push({
    type: errorType,
    mutedAt: new Date().toISOString()
  })

  return { ...account, mutedErrors }
}

const DEFAULT_CONTRACT_SYNC_STATUS = true

/**
 * Returns whether a contract is synced from account relationship
 *
 * @param  {CozyAccount} account - Cozy account
 */
export const getContractSyncStatusFromAccount = (account, contractId) => {
  const relItem = getHasManyItem(account, 'contracts', contractId)
  if (!relItem) {
    throw new Error(`Cannot find contrat ${contractId} in account`)
  }
  return relItem?.metadata?.imported ?? DEFAULT_CONTRACT_SYNC_STATUS
}

/**
 * Sets contract sync status into account relationship
 *
 * @param  {CozyAccount} account - Cozy account
 */
export const setContractSyncStatusInAccount = (
  account,
  contractId,
  syncStatus
) => {
  return updateHasManyItem(account, 'contracts', contractId, contractRel => {
    if (contractRel === undefined) {
      throw new Error(`Cannot find contrat ${contractId} in account`)
    }
    return merge({}, contractRel, { metadata: { imported: syncStatus } })
  })
}

export const getAccountLogin = account => {
  if (account && account.auth) {
    for (const fieldName of legacyLoginFields) {
      if (account.auth[fieldName]) return account.auth[fieldName]
    }
  }
  return null
}

export const getAccountName = account => {
  if (!account) return null
  if (account.auth) {
    return account.auth.accountName || getAccountLogin(account) || account._id
  } else {
    return account._id
  }
}

export const buildAccount = (konnector, authData) => {
  return {
    auth: authData,
    account_type: konnector.slug,
    identifier: getIdentifier(konnector.fields),
    state: null
  }
}
