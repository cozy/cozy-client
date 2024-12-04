"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggers = exports.triggerStates = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _account = require("./account");

var _logger = _interopRequireDefault(require("../logger"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var actionableErrors = ['CHALLENGE_ASKED', 'DISK_QUOTA_EXCEEDED', 'TERMS_VERSION_MISMATCH', 'USER_ACTION_NEEDED', 'USER_ACTION_NEEDED.CHANGE_PASSWORD', 'USER_ACTION_NEEDED.ACCOUNT_REMOVED', 'USER_ACTION_NEEDED.WEBAUTH_REQUIRED', 'USER_ACTION_NEEDED.SCA_REQUIRED', 'LOGIN_FAILED'];
/** Trigger states come from /jobs/triggers */

var triggerStates = {
  /**
   * Returns when the trigger was last executed
   *
   * @param {import('../types').IOCozyTrigger} trigger - trigger object
   * @returns {String} last execution date of any job related to the given trigger
   */
  getLastExecution: function getLastExecution(trigger) {
    var _trigger$current_stat;

    return trigger === null || trigger === void 0 ? void 0 : (_trigger$current_stat = trigger.current_state) === null || _trigger$current_stat === void 0 ? void 0 : _trigger$current_stat.last_execution;
  },

  /**
   * Returns when the trigger was last executed with success
   *
   * @param {import('../types').IOCozyTrigger} trigger - trigger object
   * @returns {String} last execution date of any job related to the given trigger and with success
   */
  getLastSuccess: function getLastSuccess(trigger) {
    var _trigger$current_stat2;

    return trigger === null || trigger === void 0 ? void 0 : (_trigger$current_stat2 = trigger.current_state) === null || _trigger$current_stat2 === void 0 ? void 0 : _trigger$current_stat2.last_success;
  },

  /**
   * Returns when the trigger was last executed with success
   *
   * @param {import('../types').IOCozyTrigger} trigger - trigger object
   * @returns {String} last execution date of any job related to the given trigger and with success
   */
  getLastsuccess: function getLastsuccess(trigger) {
    var _trigger$current_stat3;

    _logger.default.warn('Deprecated, please use getLastSuccess instead of getLastsuccess');

    return trigger === null || trigger === void 0 ? void 0 : (_trigger$current_stat3 = trigger.current_state) === null || _trigger$current_stat3 === void 0 ? void 0 : _trigger$current_stat3.last_success;
  },

  /**
   * Returns whether last job failed
   *
   * @param {import('../types').IOCozyTrigger} trigger - trigger object
   * @returns {Boolean}
   */
  isErrored: function isErrored(trigger) {
    var _trigger$current_stat4;

    return (trigger === null || trigger === void 0 ? void 0 : (_trigger$current_stat4 = trigger.current_state) === null || _trigger$current_stat4 === void 0 ? void 0 : _trigger$current_stat4.status) === 'errored';
  },

  /**
   * Returns the type of the last error to occur
   *
   * @param {import('../types').IOCozyTrigger} trigger - trigger object
   * @returns {String}
   */
  getLastErrorType: function getLastErrorType(trigger) {
    var _trigger$current_stat5;

    return trigger === null || trigger === void 0 ? void 0 : (_trigger$current_stat5 = trigger.current_state) === null || _trigger$current_stat5 === void 0 ? void 0 : _trigger$current_stat5.last_error;
  }
};
exports.triggerStates = triggerStates;
var DEFAULT_CRON = '0 0 0 * * 0'; // Once a week, sunday at midnight

var triggers = {
  /**
   * Returns whether the given trigger is associated to a konnector or not
   *
   * @param {import('../types').IOCozyTrigger} trigger - trigger object
   * @returns {Boolean}
   */
  isKonnectorWorker: function isKonnectorWorker(trigger) {
    return trigger.worker === 'konnector';
  },
  isKonnector: function isKonnector(trigger) {
    return trigger.worker === 'konnector' || trigger.worker === 'client';
  },

  /**
   * Returns the konnector slug that executed a trigger
   *
   * @param {import('../types').IOCozyTrigger} trigger - io.cozy.triggers
   *
   * @returns {string|void} A konnector slug
   */
  getKonnector: function getKonnector(trigger) {
    if (!triggers.isKonnector(trigger)) {
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
   * @param {import('../types').IOCozyTrigger} trigger io.cozy.triggers
   *
   * @returns {String} Id for an io.cozy.accounts
   */
  getAccountId: function getAccountId(trigger) {
    var _trigger$message;

    var legacyData = trigger === null || trigger === void 0 ? void 0 : (_trigger$message = trigger.message) === null || _trigger$message === void 0 ? void 0 : _trigger$message.Data;

    if (legacyData) {
      var message = JSON.parse(atob(legacyData));
      return message.account;
    } else {
      var _trigger$message2;

      return trigger === null || trigger === void 0 ? void 0 : (_trigger$message2 = trigger.message) === null || _trigger$message2 === void 0 ? void 0 : _trigger$message2.account;
    }
  },

  /**
   * Checks if the triggers current error has been muted in the corresponding io.cozy.accounts
   *
   * @param {import('../types').IOCozyTrigger} trigger      io.cozy.triggers
   * @param {import('../types').IOCozyAccount} account      io.cozy.accounts used by the trigger
   *
   * @returns {Boolean} Whether the error is muted or not
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
   * @param {import('../types').IOCozyTrigger} trigger      io.cozy.triggers
   *
   * @returns {Boolean} Whether the error is muted or not
   */
  hasActionableError: function hasActionableError(trigger) {
    var _trigger$current_stat6;

    return actionableErrors.includes(trigger === null || trigger === void 0 ? void 0 : (_trigger$current_stat6 = trigger.current_state) === null || _trigger$current_stat6 === void 0 ? void 0 : _trigger$current_stat6.last_error);
  },

  /**
   * Build trigger attributes given konnector and account
   *
   * @param  {Object} options - options object
   * @param  {import('../types').IOCozyKonnector} options.konnector - konnector object
   * @param  {import('../types').IOCozyAccount} options.account - account object
   * @param  {String} [options.cron] - cron string. Defaults to '0 0 0 * * 0'
   * @param  {object} [options.folder] - folder object
   * @returns {import('../types').IOCozyTrigger} created trigger
   */
  buildTriggerAttributes: function buildTriggerAttributes(_ref) {
    var account = _ref.account,
        _ref$cron = _ref.cron,
        cron = _ref$cron === void 0 ? DEFAULT_CRON : _ref$cron,
        folder = _ref.folder,
        konnector = _ref.konnector;
    var message = {
      account: account._id,
      konnector: konnector.slug
    };

    if (folder) {
      message['folder_to_save'] = folder._id;
    }

    var result = {
      worker: 'konnector',
      message: message
    };
    var options = konnector.clientSide ? {
      type: '@client'
    } : {
      type: '@cron',
      arguments: cron
    };
    return _objectSpread(_objectSpread({}, result), options);
  }
};
exports.triggers = triggers;