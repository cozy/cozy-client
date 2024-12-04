"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Qualification", {
  enumerable: true,
  get: function get() {
    return _qualification.Qualification;
  }
});
Object.defineProperty(exports, "setQualification", {
  enumerable: true,
  get: function get() {
    return _qualification.setQualification;
  }
});
Object.defineProperty(exports, "getQualification", {
  enumerable: true,
  get: function get() {
    return _qualification.getQualification;
  }
});
exports.helpers = exports.themes = exports.locales = void 0;

var _qualification = require("./qualification");

var locales = _interopRequireWildcard(require("./locales"));

exports.locales = locales;

var themes = _interopRequireWildcard(require("./documentTypeData"));

exports.themes = themes;

var helpers = _interopRequireWildcard(require("./documentTypeDataHelpers"));

exports.helpers = helpers;