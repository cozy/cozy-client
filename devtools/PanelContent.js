"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

var PanelContent = function PanelContent(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    p: 1,
    overflow: "scroll",
    width: "100%"
  }, children);
};

var _default = PanelContent;
exports.default = _default;