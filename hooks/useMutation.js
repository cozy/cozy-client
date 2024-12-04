"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMutation = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useClient = _interopRequireDefault(require("./useClient"));

/**
 * This hook manages the state during the saving of a document
 *
 * @returns {import("../types").UseMutationReturnValue}
 */
var useMutation = function useMutation() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$onSuccess = _ref.onSuccess,
      onSuccess = _ref$onSuccess === void 0 ? undefined : _ref$onSuccess,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? undefined : _ref$onError;

  var client = (0, _useClient.default)();
  /** @type {import("../types").useState<import("../types").QueryFetchStatus>} */

  var _useState = (0, _react.useState)('pending'),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      mutationStatus = _useState2[0],
      setMutationStatus = _useState2[1];

  var _useState3 = (0, _react.useState)(),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      data = _useState6[0],
      setData = _useState6[1];

  var mutate = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(doc) {
      var resp;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setError(undefined);
              setMutationStatus('loading');
              _context.prev = 2;
              _context.next = 5;
              return client.save(doc);

            case 5:
              resp = _context.sent;
              setData(resp.data);

              if (!(typeof onSuccess === 'function')) {
                _context.next = 10;
                break;
              }

              _context.next = 10;
              return onSuccess(resp.data);

            case 10:
              setMutationStatus('loaded');
              _context.next = 20;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](2);
              setMutationStatus('failed');
              setError(_context.t0);

              if (!(typeof onError === 'function')) {
                _context.next = 20;
                break;
              }

              _context.next = 20;
              return onError(_context.t0);

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 13]]);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), [client, onError, onSuccess]);
  return {
    mutate: mutate,
    mutationStatus: mutationStatus,
    error: error,
    data: data
  };
};

exports.useMutation = useMutation;
useMutation.propTypes = {
  /** This function is triggered when the save is successful */
  onSuccess: _propTypes.default.func,

  /** This function is triggered when the save has failed */
  onError: _propTypes.default.func
};