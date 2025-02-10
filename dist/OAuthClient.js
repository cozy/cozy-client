"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _CozyStackClient2 = _interopRequireDefault(require("./CozyStackClient"));

var _AccessToken = _interopRequireDefault(require("./AccessToken"));

var _logDeprecate = _interopRequireDefault(require("./logDeprecate"));

var _errors = _interopRequireDefault(require("./errors"));

var _logger = _interopRequireDefault(require("./logger"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * @typedef {string} SessionCode
 */
var defaultoauthOptions = {
  clientID: '',
  clientName: '',
  clientKind: '',
  clientSecret: '',
  clientURI: '',
  registrationAccessToken: '',
  redirectURI: '',
  softwareID: '',
  softwareVersion: '',
  logoURI: '',
  policyURI: '',
  notificationPlatform: '',
  notificationDeviceToken: ''
};
/**
 * Specialized `CozyStackClient` for mobile, implementing stack registration
 * through OAuth.
 */

var OAuthClient = /*#__PURE__*/function (_CozyStackClient) {
  (0, _inherits2.default)(OAuthClient, _CozyStackClient);

  var _super = _createSuper(OAuthClient);

  function OAuthClient(_ref) {
    var _this;

    var oauth = _ref.oauth,
        _ref$scope = _ref.scope,
        scope = _ref$scope === void 0 ? [] : _ref$scope,
        onTokenRefresh = _ref.onTokenRefresh,
        options = (0, _objectWithoutProperties2.default)(_ref, ["oauth", "scope", "onTokenRefresh"]);
    (0, _classCallCheck2.default)(this, OAuthClient);
    _this = _super.call(this, options);

    _this.setOAuthOptions(_objectSpread(_objectSpread({}, defaultoauthOptions), oauth));

    if (oauth.token) {
      _this.setToken(oauth.token);
    }

    _this.scope = scope;
    _this.onTokenRefresh = onTokenRefresh;
    return _this;
  }
  /**
   * Checks if the client has his registration information from the server
   *
   * @returns {boolean} true if registered, false otherwise
   * @private
   */


  (0, _createClass2.default)(OAuthClient, [{
    key: "isRegistered",
    value: function isRegistered() {
      return this.oauthOptions.clientID !== '';
    }
    /**
     * Converts a camel-cased data set to snake case, suitable for sending to the OAuth server
     *
     * @param   {object} data Initial data
     * @returns {object} Formatted data
     * @private
     */

  }, {
    key: "snakeCaseOAuthData",
    value: function snakeCaseOAuthData(data) {
      var mappedFields = {
        softwareID: 'software_id',
        softwareVersion: 'software_version',
        clientID: 'client_id',
        clientName: 'client_name',
        clientKind: 'client_kind',
        clientURI: 'client_uri',
        logoURI: 'logo_uri',
        policyURI: 'policy_uri',
        notificationPlatform: 'notification_platform',
        notificationDeviceToken: 'notification_device_token',
        redirectURI: 'redirect_uris'
      };
      var result = {};
      Object.keys(data).forEach(function (fieldName) {
        var key = mappedFields[fieldName] || fieldName;
        var value = data[fieldName];
        result[key] = value;
      }); // special case: turn redirect_uris into an array

      if (result['redirect_uris'] && result['redirect_uris'] instanceof Array === false) result['redirect_uris'] = [result['redirect_uris']];
      return result;
    }
    /**
     * Converts a snake-cased data set to camel case, suitable for internal use
     *
     * @param   {object} data Initial data
     * @returns {object} Formatted data
     * @private
     */

  }, {
    key: "camelCaseOAuthData",
    value: function camelCaseOAuthData(data) {
      var mappedFields = {
        client_id: 'clientID',
        client_name: 'clientName',
        client_secret: 'clientSecret',
        registration_access_token: 'registrationAccessToken',
        software_id: 'softwareID',
        redirect_uris: 'redirectURI'
      };
      var result = {};
      Object.keys(data).forEach(function (fieldName) {
        var key = mappedFields[fieldName] || fieldName;
        var value = data[fieldName];
        result[key] = value;
      });
      return result;
    }
    /** Performs the HTTP call to register the client to the server */

  }, {
    key: "doRegistration",
    value: function doRegistration() {
      return this.fetchJSON('POST', '/auth/register', this.snakeCaseOAuthData({
        redirectURI: this.oauthOptions.redirectURI,
        clientName: this.oauthOptions.clientName,
        softwareID: this.oauthOptions.softwareID,
        clientKind: this.oauthOptions.clientKind,
        clientURI: this.oauthOptions.clientURI,
        logoURI: this.oauthOptions.logoURI,
        policyURI: this.oauthOptions.policyURI,
        softwareVersion: this.oauthOptions.softwareVersion,
        notificationPlatform: this.oauthOptions.notificationPlatform,
        notificationDeviceToken: this.oauthOptions.notificationDeviceToken
      }));
    }
    /**
     * Registers the currenly configured client with the OAuth server and
     * sets internal information from the server response
     *
     * @throws {Error} When the client is already registered
     * @returns {Promise} A promise that resolves with a complete list of client information, including client ID and client secret.
     */

  }, {
    key: "register",
    value: function () {
      var _register = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var mandatoryFields, fields, missingMandatoryFields, data;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.isRegistered()) {
                  _context.next = 2;
                  break;
                }

                throw new Error('Client already registered');

              case 2:
                mandatoryFields = ['redirectURI'];
                fields = Object.keys(this.oauthOptions);
                missingMandatoryFields = mandatoryFields.filter(function (fieldName) {
                  return fields[fieldName];
                });

                if (!(missingMandatoryFields.length > 0)) {
                  _context.next = 7;
                  break;
                }

                throw new Error("Can't register client : missing ".concat(missingMandatoryFields, " fields"));

              case 7:
                _context.next = 9;
                return this.doRegistration();

              case 9:
                data = _context.sent;
                this.setOAuthOptions(_objectSpread(_objectSpread({}, this.oauthOptions), {}, {
                  client_id: data.client_id,
                  client_name: data.client_name,
                  client_secret: data.client_secret,
                  registration_access_token: data.registration_access_token,
                  software_id: data.software_id
                }));
                return _context.abrupt("return", this.oauthOptions);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function register() {
        return _register.apply(this, arguments);
      }

      return register;
    }()
    /**
     * Unregisters the currenly configured client with the OAuth server.
     *
     * @throws {NotRegisteredException} When the client doesn't have it's registration information
     * @returns {Promise}
     */

  }, {
    key: "unregister",
    value: function () {
      var _unregister = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var clientID;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.isRegistered()) {
                  _context2.next = 2;
                  break;
                }

                throw new NotRegisteredException();

              case 2:
                clientID = this.oauthOptions.clientID;
                this.oauthOptions.clientID = '';
                return _context2.abrupt("return", this.fetchJSON('DELETE', "/auth/register/".concat(clientID), null, {
                  headers: {
                    Authorization: this.registrationAccessTokenToAuthHeader()
                  }
                }));

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function unregister() {
        return _unregister.apply(this, arguments);
      }

      return unregister;
    }()
    /**
     * Fetches the complete set of client information from the server after it has been registered.
     *
     * @throws {NotRegisteredException} When the client doesn't have it's registration information
     * @returns {Promise}
     */

  }, {
    key: "fetchInformation",
    value: function () {
      var _fetchInformation = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.isRegistered()) {
                  _context3.next = 2;
                  break;
                }

                throw new NotRegisteredException();

              case 2:
                return _context3.abrupt("return", this.fetchJSON('GET', "/auth/register/".concat(this.oauthOptions.clientID), null, {
                  headers: {
                    Authorization: this.registrationAccessTokenToAuthHeader()
                  }
                }));

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchInformation() {
        return _fetchInformation.apply(this, arguments);
      }

      return fetchInformation;
    }()
    /**
     * Overwrites the client own information. This method will update both the local information and the remote information on the OAuth server.
     *
     * @throws {NotRegisteredException} When the client doesn't have it's registration information
     * @param   {object} information Set of information to update. Note that some fields such as `clientID` can't be updated.
     * @param   {boolean} resetSecret = false Optionnal, whether to reset the client secret or not
     * @returns {Promise} Resolves to a complete, updated list of client information
     */

  }, {
    key: "updateInformation",
    value: function () {
      var _updateInformation = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(information) {
        var resetSecret,
            mandatoryFields,
            data,
            result,
            _args4 = arguments;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                resetSecret = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : false;

                if (this.isRegistered()) {
                  _context4.next = 3;
                  break;
                }

                throw new NotRegisteredException();

              case 3:
                mandatoryFields = {
                  clientID: this.oauthOptions.clientID,
                  clientName: this.oauthOptions.clientName,
                  redirectURI: this.oauthOptions.redirectURI,
                  softwareID: this.oauthOptions.softwareID
                };
                data = this.snakeCaseOAuthData(_objectSpread(_objectSpread({}, mandatoryFields), information));
                if (resetSecret) data['client_secret'] = this.oauthOptions.clientSecret;
                _context4.next = 8;
                return this.fetchJSON('PUT', "/auth/register/".concat(this.oauthOptions.clientID), data, {
                  headers: {
                    Authorization: this.registrationAccessTokenToAuthHeader()
                  }
                });

              case 8:
                result = _context4.sent;
                this.setOAuthOptions(_objectSpread(_objectSpread({}, data), result));
                return _context4.abrupt("return", this.oauthOptions);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateInformation(_x) {
        return _updateInformation.apply(this, arguments);
      }

      return updateInformation;
    }()
    /**
     * Generates a random state code to be used during the OAuth process
     *
     * @returns {string}
     */

  }, {
    key: "generateStateCode",
    value: function generateStateCode() {
      var STATE_SIZE = 16;
      var hasCrypto = typeof window !== 'undefined' && typeof window.crypto !== 'undefined' && typeof window.crypto.getRandomValues === 'function';
      var buffer;

      if (hasCrypto) {
        buffer = new Uint8Array(STATE_SIZE);
        window.crypto.getRandomValues(buffer);
      } else {
        buffer = new Array(STATE_SIZE);

        for (var i = 0; i < buffer.length; i++) {
          buffer[i] = Math.floor(Math.random() * 255);
        }
      }

      return btoa(String.fromCharCode.apply(null, buffer)).replace(/=+$/, '').replace(/\//g, '_').replace(/\+/g, '-');
    }
    /**
     * Generates the URL that the user should be sent to in order to accept the app's permissions.
     *
     * @throws {NotRegisteredException} When the client doesn't have it's registration information
     * @param {object} options - URL generation options
     * @param {string} options.stateCode - A random code to be included in the URl for security. Can be generated with `client.generateStateCode()`
     * @param {Array} [options.scopes] - An array of permission scopes for the token.
     * @param {SessionCode} [options.sessionCode] - A session code that can be used to create a session.
     * @param {string} [options.codeChallenge] - A code challenge that can be used in a PKCE verification process.
     * @returns {string} The URL
     */

  }, {
    key: "getAuthCodeURL",
    value: function getAuthCodeURL(_ref2) {
      var stateCode = _ref2.stateCode,
          _ref2$scopes = _ref2.scopes,
          scopes = _ref2$scopes === void 0 ? this.scope : _ref2$scopes,
          _ref2$sessionCode = _ref2.sessionCode,
          sessionCode = _ref2$sessionCode === void 0 ? undefined : _ref2$sessionCode,
          _ref2$codeChallenge = _ref2.codeChallenge,
          codeChallenge = _ref2$codeChallenge === void 0 ? undefined : _ref2$codeChallenge;
      if (!this.isRegistered()) throw new NotRegisteredException();
      var query = {
        client_id: this.oauthOptions.clientID,
        redirect_uri: this.oauthOptions.redirectURI,
        state: stateCode,
        response_type: 'code',
        scope: scopes.join(' ')
      };

      if (this.oauthOptions.registerToken) {
        query = _objectSpread(_objectSpread({}, query), {}, {
          registerToken: this.oauthOptions.registerToken
        });
      }

      if (sessionCode) {
        query = _objectSpread(_objectSpread({}, query), {}, {
          session_code: sessionCode
        });
      }

      if (codeChallenge) {
        query = _objectSpread(_objectSpread({}, query), {}, {
          code_challenge: codeChallenge,
          code_challenge_method: 'S256'
        });
      }

      return "".concat(this.uri, "/auth/authorize?").concat(this.dataToQueryString(query));
    }
  }, {
    key: "dataToQueryString",
    value: function dataToQueryString(data) {
      return Object.keys(data).map(function (param) {
        return "".concat(param, "=").concat(encodeURIComponent(data[param]));
      }).join('&');
    }
    /**
     * Retrieves the access code contained in the URL to which the user is redirected after accepting the app's permissions (the `redirectURI`).
     *
     * @throws {Error} The URL should contain the same state code as the one generated with `client.getAuthCodeURL()`. If not, it will throw an error
     * @param   {string} pageURL The redirected page URL, containing the state code and the access code
     * @param   {string} stateCode The state code that was contained in the original URL the user was sent to (see `client.getAuthCodeURL()`)
     * @returns {string} The access code
     */

  }, {
    key: "getAccessCodeFromURL",
    value: function getAccessCodeFromURL(pageURL, stateCode) {
      if (!stateCode) throw new Error('Missing state code');
      var params = new URL(pageURL).searchParams;
      var urlStateCode = params.get('state');
      var urlAccessCode = params.get('access_code');
      if (stateCode !== urlStateCode) throw new Error('Given state does not match url query state');
      return urlAccessCode;
    }
    /**
     * Exchanges an access code for an access token. This function does **not** update the client's token.
     *
     * @throws {NotRegisteredException} When the client doesn't have it's registration information
     * @param   {string} accessCode - The access code contained in the redirection URL — see `client.getAccessCodeFromURL()`
     * @param   {object} oauthOptionsArg — To use when OAuthClient is not yet registered (during login process)
     * @param   {string} uri — To use when OAuthClient is not yet registered (during login process)
     * @param   {string} codeVerifier — The PKCE code verifier (see https://docs.cozy.io/en/cozy-stack/auth/#pkce-extension)
     * @returns {Promise} A promise that resolves with an AccessToken object.
     */

  }, {
    key: "fetchAccessToken",
    value: function () {
      var _fetchAccessToken = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(accessCode, oauthOptionsArg, uri, codeVerifier) {
        var oauthOptions, data, result;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(!this.isRegistered() && !oauthOptionsArg)) {
                  _context5.next = 2;
                  break;
                }

                throw new NotRegisteredException();

              case 2:
                oauthOptions = oauthOptionsArg || this.oauthOptions;
                data = {
                  grant_type: 'authorization_code',
                  code: accessCode,
                  client_id: oauthOptions.clientID,
                  client_secret: oauthOptions.clientSecret
                };

                if (codeVerifier) {
                  data = _objectSpread(_objectSpread({}, data), {}, {
                    code_verifier: codeVerifier
                  });
                }

                _context5.next = 7;
                return this.fetchJSON('POST', (uri || '') + '/auth/access_token', this.dataToQueryString(data), {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                });

              case 7:
                result = _context5.sent;
                return _context5.abrupt("return", new _AccessToken.default(result));

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function fetchAccessToken(_x2, _x3, _x4, _x5) {
        return _fetchAccessToken.apply(this, arguments);
      }

      return fetchAccessToken;
    }()
    /**
     * Used by the flagship application in order to create a token for the konnector with the given slug.
     * This token can then be used by the client-side konnector to make requests to cozy-stack.
     * The flagship app will need to use its own access token to request the konnector token.
     *
     * @param {string} slug - The slug of the konnector
     * @returns {Promise<string>} - A promise that resolves with a new token
     */

  }, {
    key: "fetchKonnectorToken",
    value: function () {
      var _fetchKonnectorToken = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(slug) {
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return this.fetchJSON('POST', "/auth/tokens/konnectors/".concat(slug));

              case 3:
                return _context6.abrupt("return", _context6.sent);

              case 6:
                _context6.prev = 6;
                _context6.t0 = _context6["catch"](0);
                throw new Error("oAuthClient.fetchKonnectorToken(): Could not create a token for the konnector with slug \"".concat(slug, "\". \n\n").concat(_context6.t0));

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[0, 6]]);
      }));

      function fetchKonnectorToken(_x6) {
        return _fetchKonnectorToken.apply(this, arguments);
      }

      return fetchKonnectorToken;
    }()
    /**
     * @typedef SessionCodeRes
     * @property {string} session_code The value of the session code
     */

    /**
     * Fetches a new session code. Only usable by the Flagship application
     *
     * @throws {NotRegisteredException} When the client isn't certified to be the Flagship application
     * @returns {Promise<SessionCodeRes>} A promise that resolves with a new session_code
     */

  }, {
    key: "fetchSessionCode",
    value: function () {
      var _fetchSessionCode = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7() {
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", this.fetchJSON('POST', '/auth/session_code'));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function fetchSessionCode() {
        return _fetchSessionCode.apply(this, arguments);
      }

      return fetchSessionCode;
    }()
    /**
     * Fetches a new session code. Only usable by the Flagship application
     *
     * @throws {NotRegisteredException} When the client isn't certified to be the Flagship application
     * @returns {Promise<SessionCodeRes>} A promise that resolves with a new session_code
     */

  }, {
    key: "fetchSessionCodeWithPassword",
    value: function () {
      var _fetchSessionCodeWithPassword = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(_ref3) {
        var passwordHash, _ref3$twoFactorToken, twoFactorToken, _ref3$twoFactorPassco, twoFactorPasscode;

        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                passwordHash = _ref3.passwordHash, _ref3$twoFactorToken = _ref3.twoFactorToken, twoFactorToken = _ref3$twoFactorToken === void 0 ? undefined : _ref3$twoFactorToken, _ref3$twoFactorPassco = _ref3.twoFactorPasscode, twoFactorPasscode = _ref3$twoFactorPassco === void 0 ? undefined : _ref3$twoFactorPassco;
                return _context8.abrupt("return", this.fetchJSON('POST', '/auth/session_code', {
                  passphrase: passwordHash,
                  two_factor_token: twoFactorToken,
                  two_factor_passcode: twoFactorPasscode
                }));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function fetchSessionCodeWithPassword(_x7) {
        return _fetchSessionCodeWithPassword.apply(this, arguments);
      }

      return fetchSessionCodeWithPassword;
    }()
    /**
     * @typedef AccessTokenRes
     * @property {string} email_verified_code The email verified code to skip 2FA
     * @property {string} access_token The OAuth access token
     * @property {string} refresh_token The OAuth refresh token
     * @property {string} token_type The OAuth token type
     * @property {string} scope The OAuth scope
     */

    /**
     * @typedef TwoFactorNeededRes
     * @property {string} two_factor_token The 2FA token
     */

    /**
     * Get OAuth access and register tokens without having to make OAuth dance
     *
     * This endpoint returns registration tokens only from a Flagship app,
     * otherwise it returns a session_code that should be used in an OAuth dance
     *
     * More info: https://docs.cozy.io/en/cozy-stack/flagship/
     * More info: https://docs.cozy.io/en/cozy-stack/auth/#post-authloginflagship
     *
     * @returns {Promise<AccessTokenRes|TwoFactorNeededRes|SessionCodeRes>} A promise that resolves with an access token, a session_code or a 2FA code
     */

  }, {
    key: "loginFlagship",
    value: function () {
      var _loginFlagship = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(_ref4) {
        var _ref4$emailVerifiedCo, emailVerifiedCode, passwordHash, _ref4$twoFactorToken, twoFactorToken, _ref4$twoFactorPassco, twoFactorPasscode;

        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _ref4$emailVerifiedCo = _ref4.emailVerifiedCode, emailVerifiedCode = _ref4$emailVerifiedCo === void 0 ? undefined : _ref4$emailVerifiedCo, passwordHash = _ref4.passwordHash, _ref4$twoFactorToken = _ref4.twoFactorToken, twoFactorToken = _ref4$twoFactorToken === void 0 ? undefined : _ref4$twoFactorToken, _ref4$twoFactorPassco = _ref4.twoFactorPasscode, twoFactorPasscode = _ref4$twoFactorPassco === void 0 ? undefined : _ref4$twoFactorPassco;
                return _context9.abrupt("return", this.fetchJSON('POST', '/auth/login/flagship', {
                  client_id: this.oauthOptions.clientID,
                  client_secret: this.oauthOptions.clientSecret,
                  email_verified_code: emailVerifiedCode,
                  passphrase: passwordHash,
                  two_factor_token: twoFactorToken,
                  two_factor_passcode: twoFactorPasscode
                }));

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function loginFlagship(_x8) {
        return _loginFlagship.apply(this, arguments);
      }

      return loginFlagship;
    }()
    /**
     * Retrieves a new access token by refreshing the currently used token.
     *
     * @throws {NotRegisteredException} When the client doesn't have it's registration information
     * @throws {Error} The client should already have an access token to use this function
     * @returns {Promise} A promise that resolves with a new AccessToken object
     */

  }, {
    key: "refreshToken",
    value: function () {
      var _refreshToken = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        var data, result, newToken, revoked;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (this.isRegistered()) {
                  _context10.next = 2;
                  break;
                }

                throw new NotRegisteredException();

              case 2:
                if (this.token) {
                  _context10.next = 4;
                  break;
                }

                throw new Error('No token to refresh');

              case 4:
                data = {
                  grant_type: 'refresh_token',
                  refresh_token: this.token.refreshToken,
                  client_id: this.oauthOptions.clientID,
                  client_secret: this.oauthOptions.clientSecret
                };
                _context10.prev = 5;
                _context10.next = 8;
                return this.fetchJSONWithCurrentToken('POST', '/auth/access_token', this.dataToQueryString(data), {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                });

              case 8:
                result = _context10.sent;
                newToken = new _AccessToken.default(_objectSpread({
                  refresh_token: this.token.refreshToken
                }, result));
                this.setToken(newToken);

                if (this.onTokenRefresh && typeof this.onTokenRefresh === 'function') {
                  this.onTokenRefresh(newToken);
                }

                return _context10.abrupt("return", newToken);

              case 15:
                _context10.prev = 15;
                _context10.t0 = _context10["catch"](5);

                if (!this.isRevocationError(_context10.t0)) {
                  _context10.next = 21;
                  break;
                }

                this.onRevocationChange(true);

                _logger.default.warn('Client has been revoked. Please authenticate again.');

                throw _context10.t0;

              case 21:
                if (!(_errors.default.EXPIRED_TOKEN.test(_context10.t0.message) || _errors.default.INVALID_TOKEN.test(_context10.t0.message) || _errors.default.INVALID_TOKEN_ALT.test(_context10.t0.message))) {
                  _context10.next = 28;
                  break;
                }

                _context10.next = 24;
                return this.checkForRevocation();

              case 24:
                revoked = _context10.sent;

                if (!revoked) {
                  _context10.next = 28;
                  break;
                }

                _logger.default.warn('Client has been revoked. Please authenticate again.');

                throw _context10.t0;

              case 28:
                throw _context10.t0;

              case 29:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[5, 15]]);
      }));

      function refreshToken() {
        return _refreshToken.apply(this, arguments);
      }

      return refreshToken;
    }()
  }, {
    key: "exchangeOAuthSecret",
    value: function exchangeOAuthSecret(uri, secret) {
      return this.fetchJSON('POST', uri + '/auth/secret_exchange', {
        secret: secret
      });
    }
    /**
     * Updates the client's stored token
     *
     * @param {string} token = null The new token to use — can be a string, a json object or an AccessToken instance.
     */

  }, {
    key: "setToken",
    value: function setToken(token) {
      if (token) {
        this.token = token instanceof _AccessToken.default ? token : new _AccessToken.default(token);
      } else {
        this.token = null;
      }
    }
  }, {
    key: "setCredentials",
    value: function setCredentials(token) {
      (0, _logDeprecate.default)('setCredentials is deprecated, please replace by setToken');
      return this.setToken(token);
    }
    /**
     * Updates the OAuth informations
     *
     * @param {object} options Map of OAuth options
     */

  }, {
    key: "setOAuthOptions",
    value: function setOAuthOptions(options) {
      this.oauthOptions = this.camelCaseOAuthData(options);
    }
  }, {
    key: "resetClientId",
    value: function resetClientId() {
      this.oauthOptions.clientID = '';
    }
    /**
     * Reset the current OAuth client
     */

  }, {
    key: "resetClient",
    value: function resetClient() {
      this.resetClientId();
      this.setUri(null);
      this.setToken(null);
    }
    /**
     * Turns the client's registration access token into a header suitable for HTTP requests. Used in some queries to manipulate the client on the server side.
     *
     * @returns {string}
     * @private
     */

  }, {
    key: "registrationAccessTokenToAuthHeader",
    value: function registrationAccessTokenToAuthHeader() {
      if (!this.oauthOptions.registrationAccessToken) {
        throw new Error('No registration access token');
      }

      return 'Bearer ' + this.oauthOptions.registrationAccessToken;
    }
    /**
     * This method should be used in flagship app onboarding process to finalize the
     * cozy creation by setting the user password into the cozy-stack
     *
     * More info: https://docs.cozy.io/en/cozy-stack/settings/#post-settingspassphraseflagship
     *
     * @param {object} params - parameters needed to set passphrase
     * @param {string} params.registerToken - registration token provided by the onboarding link
     * @param {string} params.passwordHash - hash of the master password
     * @param {string} params.hint - hint for the master password
     * @param {string} params.key - key (crypted) used for the vault encryption
     * @param {string} params.publicKey - public key used for sharing ciphers from the vault
     * @param {string} params.privateKey - private key (crypted) used for sharing ciphers from the vault
     * @param {string} params.iterations - number of KDF iterations applied when hashing the master password
     * @returns {object} token - The OAauth token
     */

  }, {
    key: "setPassphraseFlagship",
    value: function setPassphraseFlagship(_ref5) {
      var registerToken = _ref5.registerToken,
          passwordHash = _ref5.passwordHash,
          hint = _ref5.hint,
          key = _ref5.key,
          publicKey = _ref5.publicKey,
          privateKey = _ref5.privateKey,
          iterations = _ref5.iterations;
      return this.fetchJSON('POST', '/settings/passphrase/flagship', {
        register_token: registerToken,
        passphrase: passwordHash,
        hint: hint,
        key: key,
        public_key: publicKey,
        private_key: privateKey,
        iterations: iterations,
        client_id: this.oauthOptions.clientID,
        client_secret: this.oauthOptions.clientSecret
      }, {
        // TODO: faut il mettre le header?
        headers: {
          Authorization: this.registrationAccessTokenToAuthHeader()
        }
      });
    }
    /**
     * Check if the OAuth client's has been revoked.
     * If this is the case, call the onRevocationChange callback
     *
     * @async
     * @returns {Promise<boolean>} A Promise that resolves to `false` if client is still valid, or `true` if it has been revoked.
     */

  }, {
    key: "checkForRevocation",
    value: function () {
      var _checkForRevocation = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                _context11.next = 3;
                return this.fetchInformation();

              case 3:
                return _context11.abrupt("return", false);

              case 6:
                _context11.prev = 6;
                _context11.t0 = _context11["catch"](0);

                if (!this.isRevocationError(_context11.t0)) {
                  _context11.next = 11;
                  break;
                }

                this.onRevocationChange(true);
                return _context11.abrupt("return", true);

              case 11:
                return _context11.abrupt("return", false);

              case 12:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this, [[0, 6]]);
      }));

      function checkForRevocation() {
        return _checkForRevocation.apply(this, arguments);
      }

      return checkForRevocation;
    }()
  }]);
  return OAuthClient;
}(_CozyStackClient2.default);

var NotRegisteredException = /*#__PURE__*/function (_Error) {
  (0, _inherits2.default)(NotRegisteredException, _Error);

  var _super2 = _createSuper(NotRegisteredException);

  function NotRegisteredException() {
    var _this2;

    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Client not registered or missing OAuth information';
    (0, _classCallCheck2.default)(this, NotRegisteredException);
    _this2 = _super2.call(this, message);
    _this2.message = message;
    _this2.name = 'NotRegisteredException';
    return _this2;
  }

  return NotRegisteredException;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));

var _default = OAuthClient;
exports.default = _default;