"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _jsdom = require("jsdom");

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _AppCollection = _interopRequireWildcard(require("./AppCollection"));

var _AppToken = _interopRequireDefault(require("./AppToken"));

var _AccessToken = _interopRequireDefault(require("./AccessToken"));

var _DocumentCollection = _interopRequireDefault(require("./DocumentCollection"));

var _FileCollection = _interopRequireDefault(require("./FileCollection"));

var _JobCollection = _interopRequireWildcard(require("./JobCollection"));

var _KonnectorCollection = _interopRequireWildcard(require("./KonnectorCollection"));

var _SharingCollection = _interopRequireDefault(require("./SharingCollection"));

var _PermissionCollection = _interopRequireDefault(require("./PermissionCollection"));

var _TriggerCollection = _interopRequireWildcard(require("./TriggerCollection"));

var _SettingsCollection = _interopRequireWildcard(require("./SettingsCollection"));

var _NotesCollection = _interopRequireWildcard(require("./NotesCollection"));

var _OAuthClientsCollection = _interopRequireWildcard(require("./OAuthClientsCollection"));

var _ShortcutsCollection = _interopRequireWildcard(require("./ShortcutsCollection"));

var _ContactsCollection = _interopRequireWildcard(require("./ContactsCollection"));

var _AppsRegistryCollection = _interopRequireWildcard(require("./AppsRegistryCollection"));

var _getIconURL2 = _interopRequireDefault(require("./getIconURL"));

var _logDeprecate = _interopRequireDefault(require("./logDeprecate"));

var _xhrFetch = require("./xhrFetch");

var _microee = _interopRequireDefault(require("microee"));

var _errors = _interopRequireWildcard(require("./errors"));

var _logger = _interopRequireDefault(require("./logger"));

var _promiseCache = _interopRequireDefault(require("./promise-cache"));

var _NextcloudFilesCollection = require("./NextcloudFilesCollection");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var normalizeUri = function normalizeUri(uriArg) {
  var uri = uriArg;
  if (uri === null) return null;

  while (uri[uri.length - 1] === '/') {
    uri = uri.slice(0, -1);
  }

  return uri;
};
/**
 * Main API against the `cozy-stack` server.
 */


var CozyStackClient = /*#__PURE__*/function () {
  function CozyStackClient(options) {
    (0, _classCallCheck2.default)(this, CozyStackClient);

    var opts = _objectSpread({}, options);

    var token = opts.token,
        _opts$uri = opts.uri,
        uri = _opts$uri === void 0 ? '' : _opts$uri;
    this.options = opts;
    this.setUri(uri);
    this.setToken(token);
    this.konnectors = new _KonnectorCollection.default(this);
    this.jobs = new _JobCollection.default(this);
    this._promiseCache = new _promiseCache.default();
  }

  (0, _createClass2.default)(CozyStackClient, [{
    key: "isRevocationError",
    value: function isRevocationError(err) {
      var message = err === null || err === void 0 ? void 0 : err.message;
      if (!message) return false;
      if (_errors.default.CLIENT_NOT_FOUND.test(err.message) || _errors.default.UNREGISTERED_CLIENT.test(err.message)) return true;
    }
    /**
     * Creates a {@link DocumentCollection} instance.
     *
     * @param  {string} doctype The collection doctype.
     * @returns {DocumentCollection}
     */

  }, {
    key: "collection",
    value: function collection(doctype) {
      if (!doctype) {
        throw new Error('CozyStackClient.collection() called without a doctype');
      }

      switch (doctype) {
        case _AppCollection.APPS_DOCTYPE:
          return new _AppCollection.default(this);

        case _KonnectorCollection.KONNECTORS_DOCTYPE:
          return new _KonnectorCollection.default(this);

        case 'io.cozy.files':
          return new _FileCollection.default(doctype, this);

        case 'io.cozy.sharings':
          return new _SharingCollection.default(doctype, this);

        case 'io.cozy.permissions':
          return new _PermissionCollection.default(doctype, this);

        case _ContactsCollection.CONTACTS_DOCTYPE:
          return new _ContactsCollection.default(doctype, this);

        case _TriggerCollection.TRIGGERS_DOCTYPE:
          return new _TriggerCollection.default(this);

        case _JobCollection.JOBS_DOCTYPE:
          return new _JobCollection.default(this);

        case _SettingsCollection.SETTINGS_DOCTYPE:
          return new _SettingsCollection.default(this);

        case _NotesCollection.NOTES_DOCTYPE:
          return new _NotesCollection.default(this);

        case _OAuthClientsCollection.OAUTH_CLIENTS_DOCTYPE:
          return new _OAuthClientsCollection.default(this);

        case _ShortcutsCollection.SHORTCUTS_DOCTYPE:
          return new _ShortcutsCollection.default(this);

        case _AppsRegistryCollection.APPS_REGISTRY_DOCTYPE:
          return new _AppsRegistryCollection.default(this);

        case _NextcloudFilesCollection.NEXTCLOUD_FILES_DOCTYPE:
          return new _NextcloudFilesCollection.NextcloudFilesCollection(this);

        default:
          return new _DocumentCollection.default(doctype, this);
      }
    }
    /**
     * Fetches an endpoint in an authorized way.
     *
     * @param  {string} method The HTTP method.
     * @param  {string} path The URI.
     * @param  {object} [body] The payload.
     * @param  {object} [opts={}] Options for fetch
     * @returns {object}
     * @throws {FetchError}
     */

  }, {
    key: "fetch",
    value: function (_fetch) {
      function fetch(_x, _x2, _x3) {
        return _fetch.apply(this, arguments);
      }

      fetch.toString = function () {
        return _fetch.toString();
      };

      return fetch;
    }( /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(method, path, body) {
        var opts,
            options,
            headers,
            fullPath,
            fetcher,
            response,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                opts = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
                options = _objectSpread({}, opts);
                options.method = method;
                headers = options.headers = _objectSpread({}, opts.headers);

                if (method !== 'GET' && method !== 'HEAD' && body !== undefined) {
                  if (headers['Content-Type']) {
                    options.body = body;
                  }
                }

                if (!headers.Authorization) {
                  headers.Authorization = this.getAuthorizationHeader();
                } // the option credentials:include tells fetch to include the cookies in the
                // request even for cross-origin requests
                // it is still prossible to enforce `credentials` value by providing one in the `opts` prop


                options.credentials = options.credentials || 'include';
                fullPath = this.fullpath(path);
                fetcher = (0, _xhrFetch.shouldXMLHTTPRequestBeUsed)(method, path, options) ? _xhrFetch.fetchWithXMLHttpRequest : fetch;
                _context.prev = 9;
                _context.next = 12;
                return fetcher(fullPath, options);

              case 12:
                response = _context.sent;

                if (!response.ok) {
                  this.emit('error', new _errors.FetchError(response, "".concat(response.status, " ").concat(response.statusText)));
                }

                return _context.abrupt("return", response);

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](9);

                if (this.isRevocationError(_context.t0)) {
                  this.onRevocationChange(true);
                }

                throw _context.t0;

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[9, 17]]);
      }));

      return function (_x4, _x5, _x6) {
        return _ref.apply(this, arguments);
      };
    }())
  }, {
    key: "onTokenRefresh",
    value: function onTokenRefresh(token) {
      if (this.options && this.options.onTokenRefresh) {
        this.options.onTokenRefresh(token);
      }
    }
  }, {
    key: "onRevocationChange",
    value: function onRevocationChange(state) {
      if (this.options && this.options.onRevocationChange) {
        this.options.onRevocationChange(state);
      }
    }
    /**
     * Retrieves a new app token by refreshing the currently used token.
     *
     * @throws {Error} The client should already have an access token to use this function
     * @throws {Error} The client couldn't fetch a new token
     * @returns {Promise} A promise that resolves with a new AccessToken object
     */

  }, {
    key: "refreshToken",
    value: function () {
      var _refreshToken = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var options, isWorkerEnv, response, html, document, appNode, data, token, newToken;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.token) {
                  _context2.next = 2;
                  break;
                }

                throw new Error('Cannot refresh an empty token');

              case 2:
                options = {
                  method: 'GET',
                  credentials: 'include'
                };
                isWorkerEnv = // @ts-ignore
                typeof WorkerGlobalScope !== 'undefined' && // @ts-ignore
                // eslint-disable-next-line no-undef
                self instanceof WorkerGlobalScope;

                if (!(!global.document && !isWorkerEnv)) {
                  _context2.next = 6;
                  break;
                }

                throw new Error('Not in a web context, cannot refresh token');

              case 6:
                _context2.next = 8;
                return fetch('/?refreshToken', options);

              case 8:
                response = _context2.sent;

                if (response.ok) {
                  _context2.next = 11;
                  break;
                }

                throw new Error("couldn't fetch a new token - response " + response.statusCode);

              case 11:
                _context2.next = 13;
                return response.text();

              case 13:
                html = _context2.sent;
                document = new _jsdom.JSDOM(html).window.document;

                if (document) {
                  _context2.next = 17;
                  break;
                }

                throw Error("couldn't fetch a new token - doc is not html");

              case 17:
                appNode = document.querySelector('div[role="application"]');

                if (appNode) {
                  _context2.next = 20;
                  break;
                }

                throw Error("couldn't fetch a new token - no div[role=application]");

              case 20:
                data = appNode.dataset.cozy ? JSON.parse(appNode.dataset.cozy) : _objectSpread({}, appNode.dataset);
                token = data.token;

                if (token) {
                  token = token || data.cozyToken;
                }

                if (token) {
                  _context2.next = 25;
                  break;
                }

                throw Error("couldn't fetch a new token -- missing data-cozy or data-cozy-token attribute");

              case 25:
                newToken = new _AppToken.default(token);
                this.setToken(newToken);
                this.onTokenRefresh(newToken);
                return _context2.abrupt("return", newToken);

              case 29:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function refreshToken() {
        return _refreshToken.apply(this, arguments);
      }

      return refreshToken;
    }()
    /**
     * Fetches JSON in an authorized way.
     *
     * @param  {string} method The HTTP method.
     * @param  {string} path The URI.
     * @param  {object} body The payload.
     * @param  {object} options Options
     * @returns {object}
     * @throws {FetchError}
     */

  }, {
    key: "fetchJSON",
    value: function () {
      var _fetchJSON = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(method, path, body) {
        var _this = this;

        var options,
            _args3 = arguments;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
                _context3.prev = 1;
                _context3.next = 4;
                return this.fetchJSONWithCurrentToken(method, path, body, options);

              case 4:
                return _context3.abrupt("return", _context3.sent);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](1);

                if (!(_errors.default.EXPIRED_TOKEN.test(_context3.t0.message) || _errors.default.INVALID_TOKEN.test(_context3.t0.message) || _errors.default.INVALID_TOKEN_ALT.test(_context3.t0.message))) {
                  _context3.next = 23;
                  break;
                }

                _context3.prev = 10;
                _context3.next = 13;
                return this._promiseCache.exec(function () {
                  return _this.refreshToken();
                }, function () {
                  return 'refreshToken';
                });

              case 13:
                _context3.next = 18;
                break;

              case 15:
                _context3.prev = 15;
                _context3.t1 = _context3["catch"](10);
                throw _context3.t0;

              case 18:
                _context3.next = 20;
                return this.fetchJSONWithCurrentToken(method, path, body, options);

              case 20:
                return _context3.abrupt("return", _context3.sent);

              case 23:
                throw _context3.t0;

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 7], [10, 15]]);
      }));

      function fetchJSON(_x7, _x8, _x9) {
        return _fetchJSON.apply(this, arguments);
      }

      return fetchJSON;
    }()
  }, {
    key: "fetchJSONWithCurrentToken",
    value: function () {
      var _fetchJSONWithCurrentToken = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(method, path, bodyArg) {
        var options,
            clonedOptions,
            headers,
            body,
            resp,
            contentType,
            isJson,
            data,
            _args4 = arguments;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
                //Since we modify the object later by adding in some case a
                //content-type, let's clone this object to scope the modification
                clonedOptions = (0, _cloneDeep.default)(options);
                headers = clonedOptions.headers = clonedOptions.headers || {};
                headers['Accept'] = 'application/json';
                body = bodyArg;

                if (method !== 'GET' && method !== 'HEAD' && body !== undefined) {
                  if (!headers['Content-Type']) {
                    headers['Content-Type'] = 'application/json';
                    body = JSON.stringify(body);
                  }
                }

                _context4.next = 8;
                return this.fetch(method, path, body, clonedOptions);

              case 8:
                resp = _context4.sent;
                contentType = resp.headers.get('content-type');
                isJson = contentType && contentType.indexOf('json') >= 0;
                _context4.next = 13;
                return isJson ? resp.json() : resp.text();

              case 13:
                data = _context4.sent;

                if (!resp.ok) {
                  _context4.next = 16;
                  break;
                }

                return _context4.abrupt("return", data);

              case 16:
                throw new _errors.FetchError(resp, data);

              case 17:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function fetchJSONWithCurrentToken(_x10, _x11, _x12) {
        return _fetchJSONWithCurrentToken.apply(this, arguments);
      }

      return fetchJSONWithCurrentToken;
    }()
  }, {
    key: "fullpath",
    value: function fullpath(path) {
      if (path.startsWith('http')) {
        return path;
      } else {
        return this.uri + path;
      }
    }
  }, {
    key: "getAuthorizationHeader",
    value: function getAuthorizationHeader() {
      return this.token ? this.token.toAuthHeader() : null;
    }
  }, {
    key: "setCredentials",
    value: function setCredentials(token) {
      (0, _logDeprecate.default)('CozyStackClient::setCredentials is deprecated, use CozyStackClient::setToken');
      return this.setToken(token);
    }
  }, {
    key: "getCredentials",
    value: function getCredentials() {
      (0, _logDeprecate.default)('CozyStackClient::getCredentials is deprecated, use CozyStackClient::getAuthorizationHeader');
      return this.getAuthorizationHeader();
    }
    /**
     * Change or set the API token
     *
     * @param {string|AppToken|AccessToken} token - Stack API token
     */

  }, {
    key: "setToken",
    value: function setToken(token) {
      if (!token) {
        this.token = null;
      } else {
        if (token.toAuthHeader) {
          // AppToken or AccessToken
          this.token = token;
        } else if (typeof token === 'string') {
          // jwt string
          this.token = new _AppToken.default(token);
        } else {
          _logger.default.warn('Cozy-Client: Unknown token format', token);

          throw new Error('Cozy-Client: Unknown token format');
        }

        this.onRevocationChange(false);
      }
    }
    /**
     * Get the access token string, being an oauth token or an app token
     *
     * @returns {string} token
     */

  }, {
    key: "getAccessToken",
    value: function getAccessToken() {
      return this.token && this.token.getAccessToken();
    }
  }, {
    key: "setUri",
    value: function setUri(uri) {
      this.uri = normalizeUri(uri);
    }
  }, {
    key: "getIconURL",
    value: function getIconURL(opts) {
      return (0, _getIconURL2.default)(this, opts);
    }
  }]);
  return CozyStackClient;
}();

_microee.default.mixin(CozyStackClient);

var _default = CozyStackClient;
exports.default = _default;