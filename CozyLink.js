"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chain = exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var CozyLink = /*#__PURE__*/function () {
  function CozyLink(requestHandler) {
    (0, _classCallCheck2.default)(this, CozyLink);

    if (typeof requestHandler === 'function') {
      this.request = requestHandler;
    }
  }

  (0, _createClass2.default)(CozyLink, [{
    key: "request",
    value: function request(operation, result, forward) {
      throw new Error('request is not implemented');
    }
  }]);
  return CozyLink;
}();

exports.default = CozyLink;

var toLink = function toLink(handler) {
  return typeof handler === 'function' ? new CozyLink(handler) : handler;
};

var defaultLinkHandler = function defaultLinkHandler(operation, result) {
  if (result) return result;else if (operation.execute) return operation.execute();else throw new Error("No link could handle operation ".concat(JSON.stringify(operation)));
};

var chain = function chain(links) {
  return [].concat((0, _toConsumableArray2.default)(links), [defaultLinkHandler]).map(toLink).reduce(concat);
};

exports.chain = chain;

var concat = function concat(firstLink, nextLink) {
  return new CozyLink(function (operation, result, forward) {
    var nextForward = function nextForward(op, res) {
      return nextLink.request(op, res, forward);
    };

    return firstLink.request(operation, result, nextForward);
  });
};