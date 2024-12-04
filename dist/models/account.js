"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAccountWithTrigger = exports.buildAccount = exports.getAccountName = exports.getAccountLogin = exports.setContractSyncStatusInAccount = exports.getContractSyncStatusFromAccount = exports.muteError = exports.getMutedErrors = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _dsl = require("../queries/dsl");

var _HasMany = require("../associations/HasMany");

var _manifest = require("./manifest");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * getMutedErrors - Returns the list of errors that have been muted for the given account
 *
 * @param {import('../types').IOCozyAccount} account io.cozy.accounts
 *
 * @returns {Array} An array of errors with a `type` and `mutedAt` field
 */
var getMutedErrors = function getMutedErrors(account) {
  return (account === null || account === void 0 ? void 0 : account.mutedErrors) || [];
};
/**
 * muteError - Adds an error to the list of muted errors for the given account
 *
 * @param {import('../types').IOCozyAccount} account   io.cozy.accounts
 * @param {string} errorType The type of the error to mute
 *
 * @returns {import('../types').IOCozyAccount} An updated io.cozy.accounts
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
 * @param  {import('../types').IOCozyAccount} account - Cozy account
 * @param  {String} contractId - contract identifier
 * @returns  {Boolean} synchronisation status
 */

var getContractSyncStatusFromAccount = function getContractSyncStatusFromAccount(account, contractId) {
  var _relItem$metadata$imp, _relItem$metadata;

  var relItem = (0, _HasMany.getHasManyItem)(account, 'contracts', contractId);

  if (!relItem) {
    throw new Error("Cannot find contrat ".concat(contractId, " in account"));
  }

  return (_relItem$metadata$imp = relItem === null || relItem === void 0 ? void 0 : (_relItem$metadata = relItem.metadata) === null || _relItem$metadata === void 0 ? void 0 : _relItem$metadata.imported) !== null && _relItem$metadata$imp !== void 0 ? _relItem$metadata$imp : DEFAULT_CONTRACT_SYNC_STATUS;
};
/**
 * Sets contract sync status into account relationship
 *
 * @param  {import('../types').IOCozyAccount} account - Cozy account
 * @param  {String} contractId - contract identifier
 * @param  {String} syncStatus - synchronisation status
 * @returns {import('../types').IOCozyAccount}
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
/**
 * Get the account login field value from a given account
 *
 * @param {import('../types').IOCozyAccount} account - the given cozy account
 * @returns {String|null} - Account login
 */


exports.setContractSyncStatusInAccount = setContractSyncStatusInAccount;

var getAccountLogin = function getAccountLogin(account) {
  if (account.identifier) {
    return account.auth[account.identifier];
  }

  if (account && account.auth) {
    var _iterator = _createForOfIteratorHelper(_manifest.legacyLoginFields),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var fieldName = _step.value;
        if (account.auth[fieldName]) return account.auth[fieldName];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  return null;
};
/**
 * Get the account name from a given account
 *
 * @param {import('../types').IOCozyAccount} account - the given cozy account
 * @returns {String|null} - Account name
 */


exports.getAccountLogin = getAccountLogin;

var getAccountName = function getAccountName(account) {
  if (!account) return null;

  if (account.auth) {
    return account.auth.accountName || getAccountLogin(account) || account._id;
  } else {
    return account._id;
  }
};
/**
 * Transforms account auth data to io.cozy.accounts document
 *
 * @param  {import('../types').IOCozyKonnector} konnector Konnector related to account
 * @param  {object} authData  Authentication data
 * @returns {import('../types').IOCozyAccount}          io.cozy.accounts attributes
 */


exports.getAccountName = getAccountName;

var buildAccount = function buildAccount(konnector, authData) {
  return {
    auth: authData,
    account_type: konnector.slug,
    identifier: (0, _manifest.getIdentifier)(konnector.fields),
    state: null
  };
};
/**
 * Look if the given account has an associated trigger or not.
 *
 * @param {import('../CozyClient').default} client - CozyClient instance
 * @param {import('../types').IOCozyAccount} account - account document
 * @returns {Promise<Boolean>}
 */


exports.buildAccount = buildAccount;

var isAccountWithTrigger = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(client, account) {
    var result;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return client.query((0, _dsl.Q)('io.cozy.triggers').where({
              'message.account': account._id
            }).indexFields(['message.account']).limitBy(1));

          case 2:
            result = _context.sent;
            return _context.abrupt("return", result.data.length > 0);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isAccountWithTrigger(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.isAccountWithTrigger = isAccountWithTrigger;