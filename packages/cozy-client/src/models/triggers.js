import get from 'lodash/get'
import { getMutedErrors } from './accounts'

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
  getLastError: triggerState => get(triggerState, 'current_state.last_error')
}

const triggers = {
  isKonnectorWorker: trigger => trigger.worker === 'konnector',
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
   * isCurrentErrorMuted - Checks if the triggers current error has been muted in the corresponding io.cozy.accounts
   *
   * @param {object} trigger      io.cozy.triggers
   * @param {object} accountsById Object where the keys are account ids, and the values are io.cozy.accounts
   *
   * @returns {boolean} Whether the error is muted or not
   */
  isCurrentErrorMuted: (trigger, accountsById) => {
    const lastErrorType = triggerStates.getLastError(trigger)
    const lastSuccess = triggerStates.getLastsuccess(trigger)
    const lastSuccessDate = lastSuccess ? new Date(lastSuccess) : new Date()

    const accountId = triggers.getAccountId(trigger)
    const account = accountsById[accountId]
    const mutedErrors = getMutedErrors(account)

    const isErrorMuted = mutedErrors.some(mutedError => {
      return (
        mutedError.type === lastErrorType &&
        new Date(mutedError.mutedAt) > lastSuccessDate
      )
    })

    return isErrorMuted
  }
}

export { triggerStates, triggers }
