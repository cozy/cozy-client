"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildPremiumLink = exports.hasAnOffer = exports.shouldDisplayOffers = exports.getUuid = exports.isFreemiumUser = exports.arePremiumLinksEnabled = exports.isSelfHosted = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

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
  return (0, _get.default)(instanceInfo, 'context.data.attributes.manager_url') ? false : true;
};

exports.isSelfHosted = isSelfHosted;

var arePremiumLinksEnabled = function arePremiumLinksEnabled(instanceInfo) {
  return (0, _get.default)(instanceInfo, 'context.data.attributes.enable_premium_links') ? true : false;
};

exports.arePremiumLinksEnabled = arePremiumLinksEnabled;

var isFreemiumUser = function isFreemiumUser(instanceInfo) {
  var quota = (0, _get.default)(instanceInfo, 'diskUsage.data.attributes.quota', false);
  return parseInt(quota) <= PREMIUM_QUOTA;
};

exports.isFreemiumUser = isFreemiumUser;

var getUuid = function getUuid(instanceInfo) {
  return (0, _get.default)(instanceInfo, 'instance.data.attributes.uuid');
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
  var managerUrl = (0, _get.default)(instanceInfo, 'context.data.attributes.manager_url', false);
  var uuid = getUuid(instanceInfo);

  if (managerUrl && uuid) {
    return "".concat(managerUrl, "/cozy/instances/").concat(uuid, "/premium");
  } else {
    return null;
  }
};

exports.buildPremiumLink = buildPremiumLink;