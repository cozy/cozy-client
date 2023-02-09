import get from 'lodash/get'
import { getMutedErrors } from './account'
import logger from '../logger'

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
  /**
   * Returns when the trigger was last executed
   *
   * @param {import('../types').TriggersDoctype} triggerState - trigger object
   * @returns {String} last execution date of any job related to the given trigger
   */
  getLastExecution: triggerState =>
    get(triggerState, 'current_state.last_execution'),

  /**
   * Returns when the trigger was last executed with success
   *
   * @param {import('../types').TriggersDoctype} triggerState - trigger object
   * @returns {String} last execution date of any job related to the given trigger and with success
   */
  getLastSuccess: triggerState =>
    get(triggerState, 'current_state.last_success'),

  /**
   * Returns when the trigger was last executed with success
   *
   * @param {import('../types').TriggersDoctype} triggerState - trigger object
   * @returns {String} last execution date of any job related to the given trigger and with success
   */
  getLastsuccess: triggerState => {
    logger.warn(
      'Deprecated, please use getLastSuccess instead of getLastsuccess'
    )
    return get(triggerState, 'current_state.last_success')
  },

  /**
   * Returns whether last job failed
   *
   * @param {import('../types').TriggersDoctype} triggerState - trigger object
   * @returns {Boolean}
   */
  isErrored: triggerState =>
    get(triggerState, 'current_state.status') === 'errored',

  /**
   * Returns the type of the last error to occur
   *
   * @param {import('../types').TriggersDoctype} triggerState - trigger object
   * @returns {String}
   */
  getLastErrorType: triggerState =>
    get(triggerState, 'current_state.last_error')
}

const DEFAULT_CRON = '0 0 0 * * 0' // Once a week, sunday at midnight

const triggers = {
  /**
   * Returns whether the given trigger is associated to a konnector or not
   *
   * @param {import('../types').TriggersDoctype} trigger - trigger object
   * @returns {Boolean}
   */
  isKonnectorWorker: trigger => trigger.worker === 'konnector',

  /**
   * Returns the konnector slug that executed a trigger
   *
   * @param {import('../types').TriggersDoctype} trigger - io.cozy.triggers
   *
   * @returns {string|void} A konnector slug
   */
  getKonnector: trigger => {
    if (!triggers.isKonnectorWorker(trigger)) {
      return null
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
   * @param {import('../types').TriggersDoctype} trigger io.cozy.triggers
   *
   * @returns {String} Id for an io.cozy.accounts
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
   * @param {import('../types').TriggersDoctype} trigger      io.cozy.triggers
   * @param {import('../types').AccountsDoctype} account      io.cozy.accounts used by the trigger
   *
   * @returns {Boolean} Whether the error is muted or not
   */
  isLatestErrorMuted: (trigger, account) => {
    const lastErrorType = triggerStates.getLastErrorType(trigger)
    const lastSuccess = triggerStates.getLastSuccess(trigger)
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
   * @param {import('../types').TriggersDoctype} trigger      io.cozy.triggers
   *
   * @returns {Boolean} Whether the error is muted or not
   */
  hasActionableError: trigger => {
    return actionableErrors.includes(get(trigger, 'current_state.last_error'))
  },

  /**
   * Build trigger attributes given konnector and account
   *
   * @param  {Object} options - options object
   * @param  {import('../types').KonnectorsDoctype} options.konnector - konnector object
   * @param  {import('../types').AccountsDoctype} options.account - account object
   * @param  {String} [options.cron] - cron string. Defaults to '0 0 0 * * 0'
   * @param  {object} [options.folder] - folder object
   * @returns {import('../types').TriggersDoctype} created trigger
   */
  buildTriggerAttributes: ({
    account,
    cron = DEFAULT_CRON,
    folder,
    konnector
  }) => {
    const message = {
      account: account._id,
      konnector: konnector.slug
    }

    if (folder) {
      message['folder_to_save'] = folder._id
    }

    const result = {
      worker: 'konnector',
      message
    }

    const options = konnector.clientSide
      ? { type: '@client' }
      : { type: '@cron', arguments: cron }

    return { ...result, ...options }
  }
}

export { triggerStates, triggers }
