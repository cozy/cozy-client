"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAppDisplayName = exports.getUrl = exports.isInstalled = exports.getStoreInstallationURL = exports.getStoreURL = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

var STORE_SLUG = 'store';
/**
 * Returns the store URL of an app/konnector
 *
 * @param {Array} [appData=[]] Apps data, as returned by endpoint /apps/ or /konnectors
 * @param {object} [app={}] AppObject
 * @returns {string} URL as string
 */

var getStoreURL = function getStoreURL() {
  var appData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var app = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!app.slug) {
    throw new Error('Expected app / konnector with the defined slug');
  }

  var storeApp = isInstalled(appData, {
    slug: STORE_SLUG
  });
  if (!storeApp) return null;
  var storeUrl = storeApp.links && storeApp.links.related;
  if (!storeUrl) return null;
  return "".concat(storeUrl, "#/discover/").concat(app.slug);
};
/**
 * Returns the store URL to install/update an app/konnector
 *
 * @param  {Array}  [appData=[]]   Apps data, as returned by endpoint /apps/ or
 * /konnectors/
 * @param  {object} [app={}] AppObject
 * @returns {string}                URL as string
 */


exports.getStoreURL = getStoreURL;

var getStoreInstallationURL = function getStoreInstallationURL() {
  var appData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var app = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var storeUrl = getStoreURL(appData, app);

  if (!storeUrl) {
    return null;
  }

  return "".concat(storeUrl, "/install");
};
/**
 *
 * @param {Array} apps Array of apps returned by /apps /konnectors
 * @param {object} wantedApp io.cozy.app with at least a slug
 * @returns {object} The io.cozy.app is installed or undefined if not
 */


exports.getStoreInstallationURL = getStoreInstallationURL;

var isInstalled = function isInstalled() {
  var apps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var wantedApp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return apps.find(function (app) {
    return app.slug === wantedApp.slug;
  });
};
/**
 *
 * @param {object} app io.cozy.apps document
 * @returns {string} url to the app
 */


exports.isInstalled = isInstalled;

var getUrl = function getUrl(app) {
  return app.links && app.links.related;
};
/**
 * getAppDisplayName - Combines the translated prefix and name of the app into a single string.
 *
 * @param {object} app io.cozy.apps or io.cozy.konnectors document
 * @param {string} lang Locale to use
 *
 * @returns {string} Name of the app suitable for display
 */


exports.getUrl = getUrl;

var getAppDisplayName = function getAppDisplayName(app, lang) {
  var basePrefix = (0, _get.default)(app, 'name_prefix');
  var baseName = (0, _get.default)(app, 'name');
  var translatedName = (0, _get.default)(app, ['locales', lang, 'name'], baseName);
  var translatedPrefix = (0, _get.default)(app, ['locales', lang, 'name_prefix'], basePrefix);
  return translatedPrefix && translatedPrefix.toLowerCase() !== 'cozy' ? "".concat(translatedPrefix, " ").concat(translatedName) : translatedName;
};

exports.getAppDisplayName = getAppDisplayName;