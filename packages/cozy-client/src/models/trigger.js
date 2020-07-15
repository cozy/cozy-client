import get from 'lodash/get'
import { getMutedErrors } from './account'


const actionableErrors = [
  'CHALLENGE_ASKED',
  'DISK_QUOTA_EXCEEDED',
  'TERMS_VERSION_MISMATCH',
  'USER_ACTION_NEEDED',
  'USER_ACTION_NEEDED.CHANGE_PASSWORD',
  'USER_ACTION_NEEDED.ACCOUNT_REMOVED',
  'USER_ACTION_NEEDED.WEBAUTH_REQUIRED',
  'USER_ACTION_NEEDED.SCA_REQUIRED',
  'LOGIN_FAILED'
]

/** Trigger states come from /jobs/triggers */
const triggerStates = {
  /** Returns when the trigger was last executed. Need a trigger */
  getLastExecution: triggerState =>
    get(triggerState, 'current_state.last_execution'),
  /** Returns when the trigger was last successfully executed. */
  getLastsuccess: triggerState =>
    get(triggerState, 'current_state.last_success'),
  /** Returns whether last job failed */
  isErrored: triggerState =>
    get(triggerState, 'current_state.status') === 'errored',
  /** Returns the type of the last error to occur */
  getLastErrorType: triggerState =>
    get(triggerState, 'current_state.last_error')
}

const triggers = {
  isKonnectorWorker: trigger => trigger.worker === 'konnector',

  /**
   * Returns the konnector slug that executed a trigger
   *
   * @param {object} trigger io.cozy.triggers
   *
   * @returns {string} A konnector slug
   */
  getKonnector: trigger => {
    if (!triggers.isKonnectorWorker(trigger)) {
      return
    }
    if (trigger.message && trigger.message.konnector) {
      return trigger.message.konnector
    } else if (trigger.message && trigger.message.Data) {
      // Legacy triggers
      const message = JSON.parse(atob(trigger.message.Data))
      return message.konnector
    }
  },

  /**
   * getAccountId - Returns the account id for a trigger
   *
   * @param {object} trigger io.cozy.triggers
   *
   * @returns {string} Id for an io.cozy.accounts
   */
  getAccountId: trigger => {
    const legacyData = get(trigger, 'message.Data')

    if (legacyData) {
      const message = JSON.parse(atob(legacyData))
      return message.account
    } else {
      return get(trigger, 'message.account')
    }
  },

  /**
   * Checks if the triggers current error has been muted in the corresponding io.cozy.accounts
   *
   * @param {object} trigger      io.cozy.triggers
   * @param {object} account      io.cozy.accounts used by the trigger
   *
   * @returns {boolean} Whether the error is muted or not
   */
  isLatestErrorMuted: (trigger, account) => {
    const lastErrorType = triggerStates.getLastErrorType(trigger)
    const lastSuccess = triggerStates.getLastsuccess(trigger)
    const lastSuccessDate = lastSuccess ? new Date(lastSuccess) : new Date()

    const mutedErrors = getMutedErrors(account)

    const isErrorMuted = mutedErrors.some(mutedError => {
      return (
        mutedError.type === lastErrorType &&
        (!lastSuccess || new Date(mutedError.mutedAt) > lastSuccessDate)
      )
    })

    return isErrorMuted
  },

  /**
   * Returns whether the error in trigger can be solved by the user
   *
   * @param {object} trigger      io.cozy.triggers
   *
   * @returns {boolean} Whether the error is muted or not
   */
  hasActionableError: trigger => {
    return actionableErrors.includes(trigger.current_state.last_error)
  }
}

export { triggerStates, triggers }
