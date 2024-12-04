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

var _dsl = require("../queries/dsl");

var _useQuery = _interopRequireDefault(require("./useQuery"));

var _useSafeState3 = _interopRequireDefault(require("./helpers/useSafeState"));

/**
 * Fetches a queryDefinition and run fetchMore on the query until the query is fully loaded
 *
 * @param {QueryDefinition} queryDefinition - Definition created with Q()
 * @param {import("../types").QueryOptions} options - Options created with Q()
 * @returns {import("../types").UseQueryReturnValue}
 */
var useQueryAll = function useQueryAll(queryDefinition, options) {
  var _useSafeState = (0, _useSafeState3.default)(false),
      _useSafeState2 = (0, _slicedToArray2.default)(_useSafeState, 2),
      fetching = _useSafeState2[0],
      setFetching = _useSafeState2[1];

  var res = (0, _useQuery.default)(queryDefinition, options);
  (0, _react.useEffect)(function () {
    var checkToFetchMore = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(res.fetchStatus === 'loaded' && res.hasMore && !fetching)) {
                  _context.next = 5;
                  break;
                }

                setFetching(true);
                _context.next = 4;
                return res.fetchMore();

              case 4:
                setFetching(false);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function checkToFetchMore() {
        return _ref.apply(this, arguments);
      };
    }();

    checkToFetchMore(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [res.hasMore, res.fetchStatus, fetching]);
  return res;
};

var _default = useQueryAll;
exports.default = _default;