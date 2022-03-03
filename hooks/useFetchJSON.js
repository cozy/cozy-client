"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _useClient = _interopRequireDefault(require("./useClient"));

/**
 * Hook to use the generic fetchJSON method
 *
 * Takes the same arguments as fetchJSON
 *
 * Returns an object with the same keys { data, fetchStatus, error } as useQuery
 */
var useFetchJSON = function useFetchJSON(method, path, body, options, dependencies) {
  var client = (0, _useClient.default)();

  var _useState = (0, _react.useState)('pending'),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      fetchStatus = _useState2[0],
      setFetchStatus = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      data = _useState6[0],
      setData = _useState6[1];

  (0, _react.useEffect)(function () {
    var fetch = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var doc;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setFetchStatus('loading');
                _context.prev = 1;
                _context.next = 4;
                return client.stackClient.fetchJSON(method, path, body, options);

              case 4:
                doc = _context.sent;
                setData(doc);
                setError(null);
                setFetchStatus('loaded');
                _context.next = 14;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](1);
                setError(_context.t0);
                setFetchStatus('error');

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 10]]);
      }));

      return function fetch() {
        return _ref.apply(this, arguments);
      };
    }();

    fetch();
  }, [client.stackClient, method, path, body, options, dependencies]);
  return {
    fetchStatus: fetchStatus,
    error: error,
    data: data
  };
};

var _default = useFetchJSON;
exports.default = _default;