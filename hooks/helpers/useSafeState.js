"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _useIsMounted = _interopRequireDefault(require("./useIsMounted"));

var useSafeState = function useSafeState(initialState) {
  var mounted = (0, _useIsMounted.default)();

  var _useState = (0, _react.useState)(initialState),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var setSafeState = (0, _react.useCallback)(function (newState) {
    if (mounted.current) {
      setState(newState);
    }
  }, [] // eslint-disable-line react-hooks/exhaustive-deps
  );
  return [state, setSafeState];
};

var _default = useSafeState;
exports.default = _default;