"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chain = exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var CozyLink = /*#__PURE__*/function () {
  function CozyLink(requestHandler, persistHandler) {
    (0, _classCallCheck2.default)(this, CozyLink);

    if (typeof requestHandler === 'function') {
      this.request = requestHandler;
    }

    if (typeof persistHandler === 'function') {
      this.persistCozyData = persistHandler;
    }
  }
  /**
   * Request the given operation from the link
   *
   * @param {any} operation - The operation to request
   * @param {any} result - The result from the previous request of the chain
   * @param {any} forward - The next request of the chain
   * @returns {Promise<any>}
   */


  (0, _createClass2.default)(CozyLink, [{
    key: "request",
    value: function () {
      var _request = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(operation, result, forward) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new Error('request is not implemented');

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function request(_x, _x2, _x3) {
        return _request.apply(this, arguments);
      }

      return request;
    }()
    /**
     * Persist the given data into the links storage
     *
     * @param {any} data - The document to persist
     * @param {any} forward - The next persistCozyData of the chain
     * @returns {Promise<any>}
     */

  }, {
    key: "persistCozyData",
    value: function () {
      var _persistCozyData = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(data, forward) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                throw new Error('persistCozyData is not implemented');

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function persistCozyData(_x4, _x5) {
        return _persistCozyData.apply(this, arguments);
      }

      return persistCozyData;
    }()
    /**
     * Reset the link data
     *
     * @returns {Promise<any>}
     */

  }, {
    key: "reset",
    value: function () {
      var _reset = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                throw new Error('reset is not implemented');

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function reset() {
        return _reset.apply(this, arguments);
      }

      return reset;
    }()
  }]);
  return CozyLink;
}();

exports.default = CozyLink;

var toLink = function toLink(handler) {
  return typeof handler === 'function' ? new CozyLink(handler) : handler;
};

var defaultLinkRequestHandler = function defaultLinkRequestHandler(operation, result) {
  if (result) return result;else if (operation.execute) return operation.execute();else throw new Error("No link could handle operation ".concat(JSON.stringify(operation)));
};

var defaultLinkPersistHandler = function defaultLinkPersistHandler(operation, result) {// Do nothing
};

var defaultLinkHandler = new CozyLink(defaultLinkRequestHandler, defaultLinkPersistHandler);

var chain = function chain(links) {
  return [].concat((0, _toConsumableArray2.default)(links), [defaultLinkHandler]).map(toLink).reduce(concat);
};

exports.chain = chain;

var concat = function concat(firstLink, nextLink) {
  var requestHandler = function requestHandler(operation, result, forward) {
    var nextForward = function nextForward(op, res) {
      return nextLink.request(op, res, forward);
    };

    return firstLink.request(operation, result, nextForward);
  };

  var persistHandler = function persistHandler(data, forward) {
    var nextForward = function nextForward(d) {
      return nextLink.persistCozyData(d, forward);
    };

    return firstLink.persistCozyData(data, nextForward);
  };

  return new CozyLink(requestHandler, persistHandler);
};