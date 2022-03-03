"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Typography = _interopRequireDefault(require("cozy-ui/transpiled/react/Typography"));

var _cozyFlags = _interopRequireDefault(require("cozy-flags"));

var _PanelContent = _interopRequireDefault(require("./PanelContent"));

var Flags = function Flags() {
  return /*#__PURE__*/_react.default.createElement(_PanelContent.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "subtitle1"
  }, "Flags"), /*#__PURE__*/_react.default.createElement(_cozyFlags.default.FlagSwitcher.List, null));
};

var _default = Flags;
exports.default = _default;