"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

// @ts-nocheck
var useIsMounted = function useIsMounted() {
  var mounted = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    mounted.current = true;
    return function () {
      mounted.current = false;
    };
  }, []);
  return mounted;
};

var _default = useIsMounted;
exports.default = _default;