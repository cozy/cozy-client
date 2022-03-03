"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setContractSyncStatusInAccount = exports.getContractSyncStatusFromAccount = exports.muteError = exports.getMutedErrors = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _get = _interopRequireDefault(require("lodash/get"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _HasMany = require("../associations/HasMany");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
var getMutedErrors = function getMutedErrors(account) {
  return (0, _get.default)(account, 'mutedErrors', []);
};
/**
 * muteError - Adds an error to the list of muted errors for the given account
 *
 * @param {CozyAccount} account   io.cozy.accounts
 * @param {string} errorType The type of the error to mute
 *
 * @returns {CozyAccount} An updated io.cozy.accounts
 */


exports.getMutedErrors = getMutedErrors;

var muteError = function muteError(account, errorType) {
  var mutedErrors = getMutedErrors(account);
  mutedErrors.push({
    type: errorType,
    mutedAt: new Date().toISOString()
  });
  return _objectSpread(_objectSpread({}, account), {}, {
    mutedErrors: mutedErrors
  });
};

exports.muteError = muteError;
var DEFAULT_CONTRACT_SYNC_STATUS = true;
/**
 * Returns whether a contract is synced from account relationship
 *
 * @param  {CozyAccount} account - Cozy account
 */

var getContractSyncStatusFromAccount = function getContractSyncStatusFromAccount(account, contractId) {
  var relItem = (0, _HasMany.getHasManyItem)(account, 'contracts', contractId);

  if (!relItem) {
    throw new Error("Cannot find contrat ".concat(contractId, " in account"));
  }

  return (0, _get.default)(relItem, 'metadata.imported', DEFAULT_CONTRACT_SYNC_STATUS);
};
/**
 * Sets contract sync status into account relationship
 *
 * @param  {CozyAccount} account - Cozy account
 */


exports.getContractSyncStatusFromAccount = getContractSyncStatusFromAccount;

var setContractSyncStatusInAccount = function setContractSyncStatusInAccount(account, contractId, syncStatus) {
  return (0, _HasMany.updateHasManyItem)(account, 'contracts', contractId, function (contractRel) {
    if (contractRel === undefined) {
      throw new Error("Cannot find contrat ".concat(contractId, " in account"));
    }

    return (0, _merge.default)({}, contractRel, {
      metadata: {
        imported: syncStatus
      }
    });
  });
};

exports.setContractSyncStatusInAccount = setContractSyncStatusInAccount;