import get from 'lodash/get'

/** Trigger states come from /jobs/triggers */
const triggerStates = {
  /** Returns when the trigger was last executed. Need a trigger */
  getLastExecution: triggerState =>
    get(triggerState, 'current_state.last_execution'),
  /** Returns whether last job failed */
  isErrored: triggerState =>
    get(triggerState, 'current_state.status') === 'errored'
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
  }
}

export { triggerStates, triggers }
