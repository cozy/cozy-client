"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCreatedByApp = exports.hasBeenUpdatedByApp = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

var hasBeenUpdatedByApp = function hasBeenUpdatedByApp(doc, appSlug) {
  var updatedByApps = (0, _get.default)(doc, 'cozyMetadata.updatedByApps');
  return Boolean(updatedByApps && updatedByApps.find(function (x) {
    return x.slug === appSlug;
  }));
};

exports.hasBeenUpdatedByApp = hasBeenUpdatedByApp;

var getCreatedByApp = function getCreatedByApp(doc) {
  return (0, _get.default)(doc, 'cozyMetadata.createdByApp');
};

exports.getCreatedByApp = getCreatedByApp;