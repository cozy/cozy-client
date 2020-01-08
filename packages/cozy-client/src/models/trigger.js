import get from 'lodash/get'
import { getMutedErrors } from './account'

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
   * getKonnector - Returns the konnector slug that executed a trigger
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
   * isLatestErrorMuted - Checks if the triggers current error has been muted in the corresponding io.cozy.accounts
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
  }
}

export { triggerStates, triggers }
