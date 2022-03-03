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

var _registry = _interopRequireDefault(require("../registry"));

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

var _types = require("../types");

/**
 * Returns all apps in maintenance
 *
 * @param {CozyClient} client CozyClient instance
 *
 * @returns {AppsDoctype[]} An array with all apps in maintenance
 */
var useAppsInMaintenance = function useAppsInMaintenance(client) {
  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      appsInMaintenance = _useState2[0],
      setAppsInMaintenance = _useState2[1];

  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var registry, newAppsInMaintenance;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                registry = new _registry.default({
                  client: client
                });
                _context.next = 3;
                return registry.fetchAppsInMaintenance();

              case 3:
                newAppsInMaintenance = _context.sent;
                setAppsInMaintenance(newAppsInMaintenance || []);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function fetchData() {
        return _ref.apply(this, arguments);
      };
    }();

    fetchData();
  }, [client]);
  return appsInMaintenance;
};

var _default = useAppsInMaintenance;
exports.default = _default;