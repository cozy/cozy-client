"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var AppToken = /*#__PURE__*/function () {
  function AppToken(token) {
    (0, _classCallCheck2.default)(this, AppToken);
    this.token = token || '';
  }

  (0, _createClass2.default)(AppToken, [{
    key: "toAuthHeader",
    value: function toAuthHeader() {
      return 'Bearer ' + this.token;
    }
  }, {
    key: "toBasicAuth",
    value: function toBasicAuth() {
      return "user:".concat(this.token, "@");
    }
    /**
     * Get the app token string
     *
     * @see CozyStackClient.getAccessToken
     * @returns {string} token
     */

  }, {
    key: "getAccessToken",
    value: function getAccessToken() {
      return this.token;
    }
  }]);
  return AppToken;
}();

exports.default = AppToken;