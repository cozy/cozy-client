"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Collection = exports.isDocumentUpdateConflict = exports.isTimeoutError = exports.isNoUsableIndexError = exports.isIndexNotUsedWarning = exports.isIndexConflictError = exports.isIndexNotFoundError = exports.dontThrowNotFoundError = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _types = require("./types");

/**
 * Handler for error response which return a empty value for "not found" error
 *
 * @param  {Error}         error - An error
 * @param  {Array|object|null}  data Data to return in case of "not found" error
 * @returns {object}        JsonAPI response with empty data in case of "not
 * found" error.
 */
var dontThrowNotFoundError = function dontThrowNotFoundError(error) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (error.message.match(/not_found/)) {
    var expectsCollection = Array.isArray(data); // Return expected JsonAPI attributes : collections are expecting
    // meta, skip and next attribute

    return expectsCollection ? {
      data: data,
      meta: {
        count: 0
      },
      skip: 0,
      next: false
    } : {
      data: data
    };
  }

  throw error;
};
/**
 * Helper to identify an index not found error
 *
 * @param {Error} error - An error
 * @returns {Array|null} - Whether or not the error is an index not found error
 */


exports.dontThrowNotFoundError = dontThrowNotFoundError;

var isIndexNotFoundError = function isIndexNotFoundError(error) {
  return error.message.match(/no_index/);
};
/**
 * Helper to identify an index conflict
 *
 * @param {Error} error - An error
 * @returns {Array|null} - Whether or not the error is an index conflict error
 */


exports.isIndexNotFoundError = isIndexNotFoundError;

var isIndexConflictError = function isIndexConflictError(error) {
  return error.message.match(/error_saving_ddoc/);
};
/**
 * Helper to identify a not used index
 *
 * @param {string} warning - The warning returned by CouchDB
 * @returns {Array|null} Whether or not this is a not used index warning
 */


exports.isIndexConflictError = isIndexConflictError;

var isIndexNotUsedWarning = function isIndexNotUsedWarning(warning) {
  return warning.match(/was not used because it does not contain a valid index for this query/);
};
/**
 * Helper to identify a no usable index error
 *
 * @param {Error} error - An error
 * @returns {Array|null} - Whether or not the error is a no usable index error
 */


exports.isIndexNotUsedWarning = isIndexNotUsedWarning;

var isNoUsableIndexError = function isNoUsableIndexError(error) {
  return error.message.match(/no_usable_index/);
};
/**
 * Helper to identify timeout error
 * See cozy-stack's timeout value for couchdb request: https://github.com/cozy/cozy-stack/blob/669cd694132388ef6b7d1a58cf3d1b5dfb52896a/pkg/config/config/config.go#L963
 *
 * @param {Error} error - An error
 * @returns {Array|null} Whether or not the error is a timeout error
 */


exports.isNoUsableIndexError = isNoUsableIndexError;

var isTimeoutError = function isTimeoutError(error) {
  return error.message.match(/context deadline exceeded/);
};
/**
 * Helper to identify a document conflict
 *
 * @param {Error} error - An error
 * @returns {Array|null} - Whether or not the error is a document conflict error
 */


exports.isTimeoutError = isTimeoutError;

var isDocumentUpdateConflict = function isDocumentUpdateConflict(error) {
  return error.message.match(/Document update conflict/);
};
/**
 * Utility class to abstract an regroup identical methods and logics for
 * specific collections.
 */


exports.isDocumentUpdateConflict = isDocumentUpdateConflict;

var Collection = /*#__PURE__*/function () {
  function Collection() {
    (0, _classCallCheck2.default)(this, Collection);
  }

  (0, _createClass2.default)(Collection, null, [{
    key: "get",

    /**
     * Utility method aimed to return only one document.
     *
     * @param  {CozyStackClient}  stackClient - CozyStackClient
     * @param  {string}  endpoint - Stack endpoint
     * @param  {object}  options - Options of the collection
     * @param  {Function}    options.normalize Callback to normalize response data
     * (default `data => data`)
     * @param  {string}  [options.method=GET]  -  HTTP method
     * @returns {Promise<object>}  JsonAPI response containing normalized
     * document as data attribute
     */
    value: function () {
      var _get = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(stackClient, endpoint, _ref) {
        var _ref$normalize, normalize, _ref$method, method, resp;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref$normalize = _ref.normalize, normalize = _ref$normalize === void 0 ? function (data, response) {
                  return data;
                } : _ref$normalize, _ref$method = _ref.method, method = _ref$method === void 0 ? 'GET' : _ref$method;
                _context.prev = 1;
                _context.next = 4;
                return stackClient.fetchJSON(method, endpoint);

              case 4:
                resp = _context.sent;
                return _context.abrupt("return", {
                  data: normalize(resp.data, resp)
                });

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", dontThrowNotFoundError(_context.t0, null));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }));

      function get(_x, _x2, _x3) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }]);
  return Collection;
}();

exports.Collection = Collection;
var _default = Collection;
exports.default = _default;