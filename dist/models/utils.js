"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFlagshipDownloadLink = exports.getCreatedByApp = exports.hasBeenUpdatedByApp = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

var _cozyDeviceHelper = require("cozy-device-helper");

var _cozyFlags = _interopRequireDefault(require("cozy-flags"));

/**
 * Checks if a document has been updated by a specific app
 *
 * @param {object} doc - The document to check
 * @param {string} appSlug - The slug of the app to check
 * @returns {boolean} - True if the document has been updated by the app, false otherwise
 */
var hasBeenUpdatedByApp = function hasBeenUpdatedByApp(doc, appSlug) {
  var updatedByApps = (0, _get.default)(doc, 'cozyMetadata.updatedByApps');
  return Boolean(updatedByApps && updatedByApps.find(function (x) {
    return x.slug === appSlug;
  }));
};
/**
 * Gets the app that created a document
 *
 * @param {object} doc - The document to check
 * @returns {string} - The slug of the app that created the document
 */


exports.hasBeenUpdatedByApp = hasBeenUpdatedByApp;

var getCreatedByApp = function getCreatedByApp(doc) {
  return (0, _get.default)(doc, 'cozyMetadata.createdByApp');
};
/**
 * Gets the download link for the Cozy Flagship app and his white-labels versions
 *
 * @param {string} lang - The language code for the download page
 * @returns {string} - The URL of the download page
 */


exports.getCreatedByApp = getCreatedByApp;

var getFlagshipDownloadLink = function getFlagshipDownloadLink(lang) {
  if ((0, _cozyDeviceHelper.isAndroid)()) {
    var id = (0, _cozyFlags.default)('flagship.playstore-id') || 'io.cozy.flagship.mobile';
    return "https://play.google.com/store/apps/details?id=".concat(id, "&hl=").concat(lang);
  }

  if ((0, _cozyDeviceHelper.isIOS)()) {
    var _id = (0, _cozyFlags.default)('flagship.appstore-id') || 'id1600636174';

    return "https://apps.apple.com/".concat(lang, "/app/").concat(_id);
  }

  return (0, _cozyFlags.default)('flagship.download-link') || "https://cozy.io/".concat(lang, "/download");
};

exports.getFlagshipDownloadLink = getFlagshipDownloadLink;