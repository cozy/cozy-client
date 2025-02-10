"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var AccessToken = /*#__PURE__*/function () {
  function AccessToken(dataArg) {
    (0, _classCallCheck2.default)(this, AccessToken);
    var data = dataArg;
    if (typeof data === 'string') data = JSON.parse(data);
    this.tokenType = data.token_type || data.tokenType;
    this.accessToken = data.access_token || data.accessToken;
    this.refreshToken = data.refresh_token || data.refreshToken;
    this.scope = data.scope;
  }

  (0, _createClass2.default)(AccessToken, [{
    key: "toAuthHeader",
    value: function toAuthHeader() {
      return 'Bearer ' + this.accessToken;
    }
  }, {
    key: "toBasicAuth",
    value: function toBasicAuth() {
      return "user:".concat(this.accessToken, "@");
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        tokenType: this.tokenType,
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
        scope: this.scope
      };
    }
  }, {
    key: "toString",
    value: function toString() {
      return JSON.stringify(this.toJSON());
    }
    /**
     * Get the access token string
     *
     * @see CozyStackClient.getAccessToken
     * @returns {string} token
     */

  }, {
    key: "getAccessToken",
    value: function getAccessToken() {
      return this.accessToken;
    }
  }]);
  return AccessToken;
}();

exports.default = AccessToken;