"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactInspector = require("react-inspector");

var _IconButton = _interopRequireDefault(require("cozy-ui/transpiled/react/IconButton"));

var _Icon = _interopRequireDefault(require("cozy-ui/transpiled/react/Icon"));

var _Pen = _interopRequireDefault(require("cozy-ui/transpiled/react/Icons/Pen"));

var _Trash = _interopRequireDefault(require("cozy-ui/transpiled/react/Icons/Trash"));

var _ListItem = _interopRequireDefault(require("cozy-ui/transpiled/react/ListItem"));

var _ListItemText = _interopRequireDefault(require("cozy-ui/transpiled/react/ListItemText"));

var _ListItemSecondaryAction = _interopRequireDefault(require("cozy-ui/transpiled/react/ListItemSecondaryAction"));

var _Checkbox = _interopRequireDefault(require("cozy-ui/transpiled/react/Checkbox"));

var _ListItemIcon = _interopRequireDefault(require("cozy-ui/transpiled/react/ListItemIcon"));

var _cozyFlags = _interopRequireDefault(require("cozy-flags"));

var FlagItem = function FlagItem(_ref) {
  var flag = _ref.flag,
      onEdit = _ref.onEdit,
      onTrash = _ref.onTrash;

  var handleCheckboxChange = function handleCheckboxChange(e) {
    (0, _cozyFlags.default)(flag.name, e.target.checked);
    location.reload();
  };

  return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    size: "small"
  }, /*#__PURE__*/_react.default.createElement(_ListItemIcon.default, null, flag.type === 'boolean' ? /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
    size: "small",
    checked: flag.value,
    onChange: handleCheckboxChange
  }) : null), /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: flag.humanName,
    secondary: flag.type === 'object' ? /*#__PURE__*/_react.default.createElement(_reactInspector.ObjectInspector, {
      data: flag.value
    }) : flag.type !== 'boolean' ? flag.humanValue : null
  }), /*#__PURE__*/_react.default.createElement(_ListItemSecondaryAction.default, null, /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    onClick: function onClick() {
      return onEdit(flag);
    }
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: _Pen.default
  })), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    onClick: function onClick() {
      return onTrash(flag);
    }
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: _Trash.default
  }))));
};

var _default = FlagItem;
exports.default = _default;