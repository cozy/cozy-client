"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var useLocalState = function useLocalState(key, initialState) {
  var _useState = (0, _react.useState)(function () {
    var item = localStorage.getItem(key);

    try {
      return item !== null ? JSON.parse(item) : initialState;
    } catch (e) {
      return initialState;
    }
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var setLocalState = (0, _react.useCallback)(function (newState) {
    setState(newState);
  }, [setState]);
  (0, _react.useEffect)(function () {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setLocalState];
};

var _default = useLocalState;
exports.default = _default;