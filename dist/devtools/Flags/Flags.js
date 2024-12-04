"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _Typography = _interopRequireDefault(require("cozy-ui/transpiled/react/Typography"));

var _List = _interopRequireDefault(require("cozy-ui/transpiled/react/List"));

var _PanelContent = _interopRequireDefault(require("../PanelContent"));

var _FlagEdit = require("./FlagEdit");

var _helpers = require("./helpers");

var _FlagItem = _interopRequireDefault(require("./FlagItem"));

var Flags = function Flags() {
  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      edited = _useState2[0],
      setEdited = _useState2[1];

  var flags = (0, _helpers.computeFlags)();

  var handleEdit = function handleEdit(flag) {
    setEdited(flag);
  };

  var handleTrash = function handleTrash(flag) {
    if (localStorage.getItem(flag.key)) {
      localStorage.removeItem(flag.key);
      location.reload();
    }
  };

  return /*#__PURE__*/_react.default.createElement(_PanelContent.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "subtitle1"
  }, "Flags"), /*#__PURE__*/_react.default.createElement(_List.default, {
    dense: true,
    className: "u-maw-6"
  }, flags.map(function (flag) {
    return /*#__PURE__*/_react.default.createElement(_FlagItem.default, {
      key: flag.key,
      flag: flag,
      onEdit: handleEdit,
      onTrash: handleTrash
    });
  })), /*#__PURE__*/_react.default.createElement(_FlagEdit.FlagEdit, {
    flag: edited
  }));
};

var _default = Flags;
exports.default = _default;