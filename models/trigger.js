"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggers = exports.triggerStates = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

var _account = require("./account");

var actionableErrors = ['CHALLENGE_ASKED', 'DISK_QUOTA_EXCEEDED', 'TERMS_VERSION_MISMATCH', 'USER_ACTION_NEEDED', 'USER_ACTION_NEEDED.CHANGE_PASSWORD', 'USER_ACTION_NEEDED.ACCOUNT_REMOVED', 'USER_ACTION_NEEDED.WEBAUTH_REQUIRED', 'USER_ACTION_NEEDED.SCA_REQUIRED', 'LOGIN_FAILED'];
/** Trigger states come from /jobs/triggers */

var triggerStates = {
  /** Returns when the trigger was last executed. Need a trigger */
  getLastExecution: function getLastExecution(triggerState) {
    return (0, _get.default)(triggerState, 'current_state.last_execution');
  },
  getLastsuccess: function getLastsuccess(triggerState) {
    console.warn('Deprecated, please use getLastSuccess instead of getLastsuccess');
    return (0, _get.default)(triggerState, 'current_state.last_success');
  },

  /** Returns when the trigger was last successfully executed. */
  getLastSuccess: function getLastSuccess(triggerState) {
    return (0, _get.default)(triggerState, 'current_state.last_success');
  },

  /** Returns whether last job failed */
  isErrored: function isErrored(triggerState) {
    return (0, _get.default)(triggerState, 'current_state.status') === 'errored';
  },

  /** Returns the type of the last error to occur */
  getLastErrorType: function getLastErrorType(triggerState) {
    return (0, _get.default)(triggerState, 'current_state.last_error');
  }
};
exports.triggerStates = triggerStates;
var triggers = {
  isKonnectorWorker: function isKonnectorWorker(trigger) {
    return trigger.worker === 'konnector';
  },

  /**
   * Returns the konnector slug that executed a trigger
   *
   * @param {object} trigger io.cozy.triggers
   *
   * @returns {string|void} A konnector slug
   */
  getKonnector: function getKonnector(trigger) {
    if (!triggers.isKonnectorWorker(trigger)) {
      return null;
    }

    if (trigger.message && trigger.message.konnector) {
      return trigger.message.konnector;
    } else if (trigger.message && trigger.message.Data) {
      // Legacy triggers
      var message = JSON.parse(atob(trigger.message.Data));
      return message.konnector;
    }
  },

  /**
   * getAccountId - Returns the account id for a trigger
   *
   * @param {object} trigger io.cozy.triggers
   *
   * @returns {string} Id for an io.cozy.accounts
   */
  getAccountId: function getAccountId(trigger) {
    var legacyData = (0, _get.default)(trigger, 'message.Data');

    if (legacyData) {
      var message = JSON.parse(atob(legacyData));
      return message.account;
    } else {
      return (0, _get.default)(trigger, 'message.account');
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
  isLatestErrorMuted: function isLatestErrorMuted(trigger, account) {
    var lastErrorType = triggerStates.getLastErrorType(trigger);
    var lastSuccess = triggerStates.getLastSuccess(trigger);
    var lastSuccessDate = lastSuccess ? new Date(lastSuccess) : new Date();
    var mutedErrors = (0, _account.getMutedErrors)(account);
    var isErrorMuted = mutedErrors.some(function (mutedError) {
      return mutedError.type === lastErrorType && (!lastSuccess || new Date(mutedError.mutedAt) > lastSuccessDate);
    });
    return isErrorMuted;
  },

  /**
   * Returns whether the error in trigger can be solved by the user
   *
   * @param {object} trigger      io.cozy.triggers
   *
   * @returns {boolean} Whether the error is muted or not
   */
  hasActionableError: function hasActionableError(trigger) {
    return actionableErrors.includes(trigger.current_state.last_error);
  }
};
exports.triggers = triggers;