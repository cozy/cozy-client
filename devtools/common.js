"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListGridItem = exports.NavSecondaryAction = void 0;

var _react = _interopRequireDefault(require("react"));

var _Icon = _interopRequireDefault(require("cozy-ui/transpiled/react/Icon"));

var _Right = _interopRequireDefault(require("cozy-ui/transpiled/react/Icons/Right"));

var _ListItemSecondaryAction = _interopRequireDefault(require("@material-ui/core/ListItemSecondaryAction"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

/**
 * @type {Object.<string, React.CSSProperties>}
 * @private
 */
var styles = {
  listGridItem: {
    height: '100%',
    overflow: 'scroll',
    flexBasis: 240,
    flexShrink: 0,
    flexGrow: 0,
    boxShadow: 'var(--shadow1)'
  }
};

var NavSecondaryAction = function NavSecondaryAction() {
  return /*#__PURE__*/_react.default.createElement(_ListItemSecondaryAction.default, null, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: _Right.default,
    className: "u-mr-half",
    color: "var(--secondaryTextColor)"
  }));
};

exports.NavSecondaryAction = NavSecondaryAction;

var ListGridItem = function ListGridItem(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    style: styles.listGridItem
  }, children);
};

exports.ListGridItem = ListGridItem;