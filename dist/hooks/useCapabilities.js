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

var _get = _interopRequireDefault(require("lodash/get"));

var _dsl = require("../queries/dsl");

var useCapabilities = function useCapabilities(client) {
  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      capabilities = _useState2[0],
      setCapabilities = _useState2[1];

  var _useState3 = (0, _react.useState)('idle'),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      fetchStatus = _useState4[0],
      setFetchStatus = _useState4[1];

  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var capabilitiesResult;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setFetchStatus('loading');
                _context.prev = 1;
                _context.next = 4;
                return client.query((0, _dsl.Q)('io.cozy.settings').getById('io.cozy.settings.capabilities'));

              case 4:
                capabilitiesResult = _context.sent;
                setCapabilities((0, _get.default)(capabilitiesResult, 'data', {}));
                setFetchStatus('loaded');
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                setFetchStatus('failed');

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 9]]);
      }));

      return function fetchData() {
        return _ref.apply(this, arguments);
      };
    }();

    if (client.capabilities) {
      setCapabilities(client.capabilities);
      setFetchStatus('loaded');
    } else {
      fetchData();
    }
  }, [client]);
  return {
    capabilities: capabilities,
    fetchStatus: fetchStatus
  };
};

var _default = useCapabilities;
exports.default = _default;