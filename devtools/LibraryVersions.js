"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _Typography = _interopRequireDefault(require("cozy-ui/transpiled/react/Typography"));

var _PanelContent = _interopRequireDefault(require("./PanelContent"));

/* global __VERSIONS__ */
var Versions = function Versions() {
  // @ts-ignore
  var versions = typeof __VERSIONS__ !== 'undefined' ? __VERSIONS__ : {};
  var entries = Object.entries(versions);
  return /*#__PURE__*/_react.default.createElement(_PanelContent.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "subtitle1",
    gutterBottom: true
  }, "Library versions"), entries.map(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        pkg = _ref2[0],
        version = _ref2[1];

    return /*#__PURE__*/_react.default.createElement("div", {
      key: pkg
    }, pkg, ": ", version, " -", ' ', /*#__PURE__*/_react.default.createElement("img", {
      src: "https://img.shields.io/npm/v/".concat(pkg, "?style=flat-square}")
    }));
  }), entries.length === 0 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body1"
  }, "__VERSIONS__ is not exposed to the app. For this panel to work, you must add the VersionsPlugin."), /*#__PURE__*/_react.default.createElement("pre", null, "\nconst VersionPlugin = require('cozy-scripts/plugins/VersionPlugin')\n\nnew VersionPlugin({\n    packages: ['cozy-bar', 'cozy-ui', 'cozy-harvest-lib']\n})\n          ")) : null);
};

var _default = Versions;
exports.default = _default;