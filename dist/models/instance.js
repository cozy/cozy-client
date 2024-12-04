"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeDiskInfos = exports.hasPasswordDefinedAttribute = exports.buildPremiumLink = exports.hasAnOffer = exports.shouldDisplayOffers = exports.getUuid = exports.isFreemiumUser = exports.arePremiumLinksEnabled = exports.isSelfHosted = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _get = _interopRequireDefault(require("lodash/get"));

var _dsl = require("../queries/dsl");

var FallbackQuota = 1e11;
var GB = 1000 * 1000 * 1000;
var PREMIUM_QUOTA = 50 * GB;
/**
 * @typedef {object} InstanceInfo
 * @typedef {object} ContextInfo
 * @typedef {object} DiskUsageInfo
 */

/**
 * @typedef SettingsInfo
 * @property {ContextInfo} context - Object returned by /settings/context
 * @property {InstanceInfo} instance - Object returned by /settings/instance
 * @property {DiskUsageInfo} diskUsage - Object returned by /settings/disk-usage
 */
// If manager URL is present, then the instance is not self-hosted

var isSelfHosted = function isSelfHosted(instanceInfo) {
  return (0, _get.default)(instanceInfo, 'context.data.manager_url') ? false : true;
};

exports.isSelfHosted = isSelfHosted;

var arePremiumLinksEnabled = function arePremiumLinksEnabled(instanceInfo) {
  return (0, _get.default)(instanceInfo, 'context.data.enable_premium_links') ? true : false;
};

exports.arePremiumLinksEnabled = arePremiumLinksEnabled;

var isFreemiumUser = function isFreemiumUser(instanceInfo) {
  var quota = (0, _get.default)(instanceInfo, 'diskUsage.data.quota', false);
  return parseInt(quota) <= PREMIUM_QUOTA;
};

exports.isFreemiumUser = isFreemiumUser;

var getUuid = function getUuid(instanceInfo) {
  return (0, _get.default)(instanceInfo, 'instance.data.uuid');
};
/**
 * Returns whether an instance is concerned by our offers
 *
 * @param {SettingsInfo} data Object containing all the results from /settings/*
 * @returns {boolean} Should we display offers
 */


exports.getUuid = getUuid;

var shouldDisplayOffers = function shouldDisplayOffers(data) {
  return !isSelfHosted(data) && arePremiumLinksEnabled(data) && getUuid(data) && isFreemiumUser(data);
};
/**
 * Returns if an instance has subscribed to one of our offers
 *
 * @param {SettingsInfo} data Object containing all the results from /settings/*
 * @returns {boolean} Does the cozy have offers
 */


exports.shouldDisplayOffers = shouldDisplayOffers;

var hasAnOffer = function hasAnOffer(data) {
  return !isSelfHosted(data) && arePremiumLinksEnabled(data) && getUuid(data) && !isFreemiumUser(data);
};
/**
 * Returns the link to the Premium page on the Cozy's Manager
 *
 * @param {InstanceInfo} instanceInfo - Instance information
 */


exports.hasAnOffer = hasAnOffer;

var buildPremiumLink = function buildPremiumLink(instanceInfo) {
  var managerUrl = (0, _get.default)(instanceInfo, 'context.data.manager_url', false);
  var uuid = getUuid(instanceInfo);

  if (managerUrl && uuid) {
    return "".concat(managerUrl, "/cozy/instances/").concat(uuid, "/premium");
  } else {
    return null;
  }
};
/**
 * Checks the value of the password_defined attribute
 *
 * @param {import("../CozyClient").default} client - The CozyClient instance
 * @returns {Promise<boolean>} - Returns the value of the password_defined attribute
 */


exports.buildPremiumLink = buildPremiumLink;

var hasPasswordDefinedAttribute = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(client) {
    var _yield$client$fetchQu, password_defined;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return client.fetchQueryAndGetFromState({
              definition: (0, _dsl.Q)('io.cozy.settings').getById('io.cozy.settings.instance'),
              options: {
                as: 'io.cozy.settings/io.cozy.settings.instance',
                singleDocData: true
              }
            });

          case 3:
            _yield$client$fetchQu = _context.sent;
            password_defined = _yield$client$fetchQu.data.password_defined;
            return _context.abrupt("return", Boolean(password_defined));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", false);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function hasPasswordDefinedAttribute(_x) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * @typedef DiskInfosRaw
 * @property diskQuota {number} - Space used in GB
 * @property diskUsage {number} -  Maximum space available in GB
 * @property percentUsage {number} - Usage percent of the disk
 */

/**
 * @typedef DiskInfos
 * @property humanDiskQuota {string} - Space used in GB rounded
 * @property humanDiskUsage {string} - Maximum space available in GB rounded
 * @property percentUsage {string} - Usage percent of the disk rounded
 */

/**
 * Convert input value into GB
 *
 * @param {number} bytes - Value in bytes
 * @returns {number} - Returns the value in GB
 */


exports.hasPasswordDefinedAttribute = hasPasswordDefinedAttribute;

var convertBytesToGB = function convertBytesToGB(bytes) {
  return bytes * 1e-9;
};
/**
 * Computes `value` rounded to `fractionDigits`.
 *
 * @param {number} value - Value to format
 * @param {number} fractionDigits - Number of decimal numbers
 * @returns {string} - Returns the rounded number as a string
 */


var formatDecimals = function formatDecimals(value) {
  var fractionDigits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return "".concat(value % 1 ? value.toFixed(fractionDigits) : value);
};
/**
 * Transform bytes data to GB data and compute percent usage
 *
 * @param {number} usage - Value in bytes representing the space used
 * @param {number} quota - Value in bytes representing the maximum space available
 * @returns {DiskInfosRaw} - Returns an transform data to GB and usage percent of the disk
 */


var computeDiskInfos = function computeDiskInfos(usage) {
  var quota = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FallbackQuota;
  return {
    diskQuota: convertBytesToGB(quota),
    diskUsage: convertBytesToGB(usage),
    percentUsage: usage / quota * 100
  };
};
/**
 * Make human readable information from disk information (usage, quota)
 *
 * @param {number|string} usage - Value in bytes representing the space used
 * @param {number|string} [quota] - Value in bytes representing the maximum space available
 * @returns {DiskInfos} - Return a set of human readable information about disk
 */


var makeDiskInfos = function makeDiskInfos(usage, quota) {
  var _computeDiskInfos = computeDiskInfos(+usage, quota ? +quota : undefined),
      diskQuota = _computeDiskInfos.diskQuota,
      diskUsage = _computeDiskInfos.diskUsage,
      percentUsage = _computeDiskInfos.percentUsage;

  return {
    humanDiskQuota: formatDecimals(diskQuota),
    humanDiskUsage: formatDecimals(diskUsage),
    percentUsage: Math.round(percentUsage).toString()
  };
};

exports.makeDiskInfos = makeDiskInfos;