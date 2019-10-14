/** Trigger states come from /jobs/triggers */
const triggerStates = {
  /** Returns when the trigger was last executed. Need a trigger */
  getLastExecution: triggerState => triggerState.last_execution,
  /** Returns whether last job failed */
  isErrored: triggerState => triggerState.current_state.status === 'errored'
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
  }
}

export { triggerStates, triggers }
