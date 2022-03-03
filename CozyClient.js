"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _fromPairs = _interopRequireDefault(require("lodash/fromPairs"));

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _uniqBy = _interopRequireDefault(require("lodash/uniqBy"));

var _zip = _interopRequireDefault(require("lodash/zip"));

var _forEach = _interopRequireDefault(require("lodash/forEach"));

var _get = _interopRequireDefault(require("lodash/get"));

var _microee = _interopRequireDefault(require("microee"));

var _cozyStackClient = _interopRequireWildcard(require("cozy-stack-client"));

var _const = require("./const");

var _StackLink = _interopRequireDefault(require("./StackLink"));

var _associations = require("./associations");

var _helpers = require("./associations/helpers");

var _helpers2 = require("./helpers");

var _dsl = require("./queries/dsl");

var _mobile = require("./authentication/mobile");

var _optimize = _interopRequireDefault(require("./queries/optimize"));

var _store = _interopRequireWildcard(require("./store"));

var _policies = _interopRequireDefault(require("./policies"));

var _Schema = _interopRequireDefault(require("./Schema"));

var _CozyLink = require("./CozyLink");

var _ObservableQuery = _interopRequireDefault(require("./ObservableQuery"));

var _snapshots = require("./testing/snapshots");

var _logger = _interopRequireDefault(require("./logger"));

var _types = require("./types");

var _queries = require("./store/queries");

var _jsonStableStringify = _interopRequireDefault(require("json-stable-stringify"));

var _promiseCache = _interopRequireDefault(require("./promise-cache"));

var _flagshipCertification = require("./flagship-certification/flagship-certification");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var ensureArray = function ensureArray(arr) {
  return Array.isArray(arr) ? arr : [arr];
};

var deprecatedHandler = function deprecatedHandler(msg) {
  return {
    get: function get(target, prop) {
      console.warn(msg);
      return target[prop];
    }
  };
};

var supportsReferences = function supportsReferences(relationshipClass) {
  return relationshipClass.prototype.addReferences && relationshipClass.prototype.removeReferences;
};

var referencesUnsupportedError = function referencesUnsupportedError(relationshipClassName) {
  return new Error("The \"".concat(relationshipClassName, "\" relationship does not support references. If you need to add references to a document, its relationship class must have the methods {add,remove}References"));
};

var DOC_CREATION = 'creation';
var DOC_UPDATE = 'update';
/**
 * @typedef {object} ClientOptions
 * @property {object} [client]
 * @property {object} [link]
 * @property {object} [links]
 * @property {Token} [token]
 * @property {string} [uri]
 * @property {object} [stackClient]
 * @property {boolean} [warningForCustomHandlers]
 * @property {boolean} [autoHydrate]
 * @property {object} [oauth]
 * @property {Function} [onTokenRefresh]
 * @property {Function} [onError] - Default callback if a query is errored
 * @property  {Link}         [link]   - Backward compatibility
 * @property  {Array<Link>}  [links]  - List of links
 * @property  {object}       [schema] - Schema description for each doctypes
 * @property  {AppMetadata}  [appMetadata] - Metadata about the application that will be used in ensureCozyMetadata
 * @property  {ClientCapabilities} [capabilities] - Capabilities sent by the stack
 * @property  {boolean} [store] - If set to false, the client will not instantiate a Redux store automatically. Use this if you want to merge cozy-client's store with your own redux store. See [here](https://docs.cozy.io/en/cozy-client/react-integration/#1b-use-your-own-redux-store) for more information.
 */

/**
 * Responsible for
 *
 * - Creating observable queries
 * - Hydration
 * - Creating plan for saving documents
 * - Associations
 */

var CozyClient = /*#__PURE__*/function () {
  /**
   * @param  {ClientOptions} rawOptions - Options
   *
   * @example
   * ```js
   * const client = new CozyClient({
   *   schema: {
   *     todos: {
   *       doctype: 'io.cozy.todos',
   *       relationships: {
   *         authors: {
   *           type: 'has-many',
   *           doctype: 'io.cozy.persons'
   *         }
   *       }
   *     }
   *   }
   * })
   * ```
   *
   * Cozy-Client will automatically call `this.login()` if provided with a token and an uri
   */
  function CozyClient() {
    var _this = this;

    var rawOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, CozyClient);
    (0, _defineProperty2.default)(this, "fetchQueryAndGetFromState", /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(query) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _this.query(query.definition, query.options);

              case 3:
                return _context.abrupt("return", _this.getQueryFromState(query.options.as));

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
    var link = rawOptions.link,
        links = rawOptions.links,
        _rawOptions$schema = rawOptions.schema,
        schema = _rawOptions$schema === void 0 ? {} : _rawOptions$schema,
        _rawOptions$appMetada = rawOptions.appMetadata,
        appMetadata = _rawOptions$appMetada === void 0 ? {} : _rawOptions$appMetada,
        capabilities = rawOptions.capabilities,
        options = (0, _objectWithoutProperties2.default)(rawOptions, ["link", "links", "schema", "appMetadata", "capabilities"]);

    if (link) {
      console.warn('`link` is deprecated, use `links`');
    }

    this.appMetadata = appMetadata;
    this.options = options;
    this.queryIdGenerator = new _queries.QueryIDGenerator();
    this.isLogged = false;
    this.instanceOptions = {}; // Bind handlers

    this.handleRevocationChange = this.handleRevocationChange.bind(this);
    this.handleTokenRefresh = this.handleTokenRefresh.bind(this);
    this.createClient();
    var stackClient = this.getStackClient();
    stackClient.on('error', function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _this.emit.apply(_this, ['error'].concat(args));
    });
    this.links = ensureArray(link || links || new _StackLink.default());
    this.registerClientOnLinks();
    this.chain = (0, _CozyLink.chain)(this.links);
    this.schema = new _Schema.default(schema, stackClient);
    /**
     * @type {ClientCapabilities}
     */

    this.capabilities = capabilities || null; // Instances of plugins registered with registerPlugin

    this.plugins = {};

    try {
      this.loadInstanceOptionsFromDOM();
    } catch (err) {// not a critical error, we may be in node or the instance options are not on the default HTML element
    }

    if (options.uri && options.token) {
      this.login();
    }
    /**
     * @type {object}
     */


    this.storeAccesors = null;

    if (options.store !== false) {
      this.ensureStore();
    }
    /**
     * Holds in-flight promises for deduplication purpose
     *
     * @private
     * @type {PromiseCache}
     */


    this._promiseCache = new _promiseCache.default();
  }
  /**
   * Gets overrided by MicroEE.mixin
   * This is here just so typescript does not scream
   *
   * TODO Find a better way to make TS understand that emit is
   * a method from cozy-client
   */


  (0, _createClass2.default)(CozyClient, [{
    key: "emit",
    value: function emit() {}
  }, {
    key: "on",
    value: function on() {}
  }, {
    key: "removeListener",
    value: function removeListener() {}
    /**
     * A plugin is a class whose constructor receives the client as first argument.
     * The main mean of interaction with the client should be with events
     * like "login"/"logout".
     *
     * The plugin system is meant to encourage separation of concerns, modularity
     * and testability : instead of registering events at module level, please
     * create a plugin that subscribes to events.
     *
     * Plugin instances are stored internally in the `plugins` attribute of the client
     * and can be accessed via this mean. A plugin class must have the attribute
     * `pluginName` that will be use as the key in the `plugins` object.
     *
     * Two plugins with the same `pluginName` cannot co-exist.
     *
     * @example
     * ```js
     * class AlertPlugin {
     *   constructor(client, options) {
     *     this.client = client
     *     this.options = options
     *     this.handleLogin = this.handleLogin.bind(this)
     *     this.handleLogout = this.handleLogout.bind(this)
     *     this.client.on("login", this.handleLogin)
     *     this.client.on("logout", this.handleLogout)
     *   }
     *
     *   handleLogin() {
     *     alert(this.options.onLoginAlert)
     *   }
     *
     *   handleLogout() {
     *     alert(this.options.onLogoutAlert)
     *   }
     * }
     *
     * AlertPlugin.pluginName = 'alerts'
     *
     * client.registerPlugin(AlertPlugin, {
     *   onLoginAlert: 'client has logged in !',
     *   onLogoutAlert: 'client has logged out !'
     * })
     *
     * // the instance of the plugin is accessible via
     * client.plugins.alerts
     * ```
     */

  }, {
    key: "registerPlugin",
    value: function registerPlugin(Plugin, options) {
      if (!Plugin.pluginName) {
        throw new Error('Cannot register a plugin whose class does not have `pluginName` attribute.');
      }

      if (this.plugins[Plugin.pluginName]) {
        throw new Error("Cannot register plugin ".concat(Plugin.pluginName, ". A plugin with the same name has already been registered."));
      }

      var instance = new Plugin(this, options);
      this.plugins[Plugin.pluginName] = instance;
      return instance;
    }
    /**
     * To help with the transition from cozy-client-js to cozy-client, it is possible to instantiate
     * a client with a cookie-based instance of cozy-client-js.
     *
     * @param {OldCozyClient} oldClient - An instance of the deprecated cozy-client
     * @param {object} options - CozyStackClient options
     * @returns {CozyClient}
     */

  }, {
    key: "addSchema",
    value: function addSchema(schemaDefinition) {
      this.schema.add(schemaDefinition);
    }
  }, {
    key: "registerClientOnLinks",
    value: function registerClientOnLinks() {
      var _iterator = _createForOfIteratorHelper(this.links),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var link = _step.value;

          if (link.registerClient) {
            try {
              link.registerClient(this);
            } catch (e) {
              console.warn(e);
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /**
     * Notify the links that they can start and set isLogged to true.
     *
     * On mobile, where url/token are set after instantiation, use this method
     * to set the token and uri via options.
     *
     * Emits
     *
     * - "beforeLogin" at the beginning, before links have been set up
     * - "login" when the client is fully logged in and links have been set up
     *
     * @param  {object}   [options] - Options
     * @param  {string}   options.token  - If passed, the token is set on the client
     * @param  {string}   options.uri  - If passed, the uri is set on the client
     * @returns {Promise} - Resolves when all links have been setup and client is fully logged in
     *
     */

  }, {
    key: "login",
    value: function login(options) {
      // Keep the promise to be able to return it in future calls.
      // This allows us to autoLogin in constructor without breaking any compatibility
      // with codes that uses an explicit login.
      if (this.isLogged && !this.isRevoked) {
        console.warn("CozyClient is already logged.");
        return this.loginPromise;
      }

      return this.loginPromise = this._login(options);
    }
  }, {
    key: "_login",
    value: function () {
      var _login2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(options) {
        var _iterator2, _step2, link;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.emit('beforeLogin');
                this.registerClientOnLinks();

                if (options) {
                  if (options.uri) {
                    this.stackClient.setUri(options.uri);
                  }

                  if (options.token) {
                    this.stackClient.setToken(options.token);
                  }
                }

                _iterator2 = _createForOfIteratorHelper(this.links);
                _context2.prev = 4;

                _iterator2.s();

              case 6:
                if ((_step2 = _iterator2.n()).done) {
                  _context2.next = 13;
                  break;
                }

                link = _step2.value;

                if (!link.onLogin) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 11;
                return link.onLogin();

              case 11:
                _context2.next = 6;
                break;

              case 13:
                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](4);

                _iterator2.e(_context2.t0);

              case 18:
                _context2.prev = 18;

                _iterator2.f();

                return _context2.finish(18);

              case 21:
                this.isLogged = true;
                this.isRevoked = false;
                this.emit('login');

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 15, 18, 21]]);
      }));

      function _login(_x2) {
        return _login2.apply(this, arguments);
      }

      return _login;
    }()
    /**
     * Logs out the client and reset all the links
     *
     * Emits
     *
     * - "beforeLogout" at the beginning, before links have been reset
     * - "login" when the client is fully logged out and links have been reset
     *
     * @returns {Promise} - Resolves when all links have been reset and client is fully logged out
     */

  }, {
    key: "logout",
    value: function () {
      var _logout = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
        var _iterator3, _step3, link;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.isLogged) {
                  _context3.next = 3;
                  break;
                }

                _logger.default.warn("CozyClient isn't logged.");

                return _context3.abrupt("return");

              case 3:
                this.emit('beforeLogout');
                this.isLogged = false;

                if (!(this.stackClient instanceof _cozyStackClient.OAuthClient)) {
                  _context3.next = 17;
                  break;
                }

                _context3.prev = 6;

                if (!(this.stackClient.unregister && (!this.stackClient.isRegistered || this.stackClient.isRegistered()))) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 10;
                return this.stackClient.unregister();

              case 10:
                _context3.next = 15;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t0 = _context3["catch"](6);

                _logger.default.warn("Impossible to unregister client on stack: ".concat(_context3.t0));

              case 15:
                _context3.next = 25;
                break;

              case 17:
                _context3.prev = 17;
                _context3.next = 20;
                return this.stackClient.fetch('DELETE', '/auth/login');

              case 20:
                _context3.next = 25;
                break;

              case 22:
                _context3.prev = 22;
                _context3.t1 = _context3["catch"](17);

                _logger.default.warn("Impossible to log out: ".concat(_context3.t1));

              case 25:
                // clean information on links
                _iterator3 = _createForOfIteratorHelper(this.links);
                _context3.prev = 26;

                _iterator3.s();

              case 28:
                if ((_step3 = _iterator3.n()).done) {
                  _context3.next = 41;
                  break;
                }

                link = _step3.value;

                if (!link.reset) {
                  _context3.next = 39;
                  break;
                }

                _context3.prev = 31;
                _context3.next = 34;
                return link.reset();

              case 34:
                _context3.next = 39;
                break;

              case 36:
                _context3.prev = 36;
                _context3.t2 = _context3["catch"](31);
                console.warn(_context3.t2);

              case 39:
                _context3.next = 28;
                break;

              case 41:
                _context3.next = 46;
                break;

              case 43:
                _context3.prev = 43;
                _context3.t3 = _context3["catch"](26);

                _iterator3.e(_context3.t3);

              case 46:
                _context3.prev = 46;

                _iterator3.f();

                return _context3.finish(46);

              case 49:
                if (this.store) {
                  this.dispatch((0, _store.resetState)());
                }

                this.emit('logout');

              case 51:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[6, 12], [17, 22], [26, 43, 46, 49], [31, 36]]);
      }));

      function logout() {
        return _logout.apply(this, arguments);
      }

      return logout;
    }()
    /**
     * Forwards to a stack client instance and returns
     * a [DocumentCollection]{@link https://docs.cozy.io/en/cozy-client/api/cozy-stack-client/#DocumentCollection} instance.
     *
     * @param  {string} doctype The collection doctype.
     * @returns {DocumentCollection} Collection corresponding to the doctype
     */

  }, {
    key: "collection",
    value: function collection(doctype) {
      return this.getStackClient().collection(doctype);
    }
  }, {
    key: "fetch",
    value: function fetch(method, path, body) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return this.getStackClient().fetch(method, path, body, options);
    }
  }, {
    key: "all",
    value: function all(doctype) {
      _logger.default.warn("\nclient.all is deprecated, prefer to use the Q helper to build a new QueryDefinition.\n\nimport { Q } from 'cozy-client'\nclient.query(Q('io.cozy.bills'))");

      return (0, _dsl.Q)(doctype);
    }
  }, {
    key: "find",
    value: function find(doctype) {
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      console.warn('client.find(doctype, selector) is deprecated, please use Q(doctype).where(selector) to build the same query.');
      return new _dsl.QueryDefinition({
        doctype: doctype,
        selector: selector
      });
    }
  }, {
    key: "get",
    value: function get(doctype, id) {
      console.warn("client.get(".concat(doctype, ", id) is deprecated, please use Q(").concat(doctype, ").getById(id) to build the same query."));
      return new _dsl.QueryDefinition({
        doctype: doctype,
        id: id
      });
    }
    /**
     * Creates a document and saves it on the server
     *
     * @param  {string} type - Doctype of the document
     * @param  {object} doc - Document to save
     * @param  {ReferenceMap} [references] - References are a special kind of relationship
     * that is not stored inside the referencer document, they are used for example between a photo
     * and its album. You should not need to use it normally.
     * @param  {object} options - Mutation options
     *
     * @example
     * ```js
     * await client.create('io.cozy.todos', {
     *   label: 'My todo',
     *   relationships: {
     *     authors: {
     *       data: [{_id: 1, _type: 'io.cozy.persons'}]
     *     }
     *   }
     * })
     * ```
     *
     * @returns {Promise}
     */

  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(type, doc, references) {
        var options,
            _type,
            attributes,
            normalizedDoc,
            ret,
            _args4 = arguments;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                options = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
                _type = doc._type, attributes = (0, _objectWithoutProperties2.default)(doc, ["_type"]);
                normalizedDoc = _objectSpread({
                  _type: type
                }, attributes);
                _context4.next = 5;
                return this.schema.validate(normalizedDoc);

              case 5:
                ret = _context4.sent;

                if (!(ret !== true)) {
                  _context4.next = 8;
                  break;
                }

                throw new Error('Validation failed');

              case 8:
                return _context4.abrupt("return", this.mutate(this.getDocumentSavePlan(normalizedDoc, references), options));

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function create(_x3, _x4, _x5) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "validate",
    value: function validate(document) {
      return this.schema.validate(document);
    }
    /**
     * Create or update a document on the server
     *
     * @param  {object} doc - Document to save
     * @param  {object} mutationOptions - Mutation options
     * @returns {Promise}
     */

  }, {
    key: "save",
    value: function () {
      var _save = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(doc) {
        var mutationOptions,
            _type,
            attributes,
            normalizedDoc,
            ret,
            _args5 = arguments;

        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                mutationOptions = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
                _type = doc._type, attributes = (0, _objectWithoutProperties2.default)(doc, ["_type"]);

                if (_type) {
                  _context5.next = 4;
                  break;
                }

                throw new Error('The document must have a `_type` property');

              case 4:
                normalizedDoc = _objectSpread({
                  _type: _type
                }, attributes);
                _context5.next = 7;
                return this.schema.validate(normalizedDoc);

              case 7:
                ret = _context5.sent;

                if (!(ret !== true)) {
                  _context5.next = 10;
                  break;
                }

                throw new Error('Validation failed');

              case 10:
                return _context5.abrupt("return", this.mutate(this.getDocumentSavePlan(normalizedDoc), mutationOptions));

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function save(_x6) {
        return _save.apply(this, arguments);
      }

      return save;
    }()
    /**
     * Saves multiple documents in one batch
     * - Can only be called with documents from the same doctype
     * - Does not support automatic creation of references
     *
     * @param  {CozyClientDocument[]} docs
     * @param  {Object} mutationOptions
     * @returns {Promise<void>}
     */

  }, {
    key: "saveAll",
    value: function () {
      var _saveAll = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(docs) {
        var _this2 = this;

        var mutationOptions,
            doctypes,
            validations,
            errors,
            toSaveDocs,
            mutation,
            _args6 = arguments;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                mutationOptions = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
                doctypes = Array.from(new Set(docs.map(function (x) {
                  return x._type;
                })));

                if (!(doctypes.length !== 1)) {
                  _context6.next = 4;
                  break;
                }

                throw new Error('saveAll can only save documents with the same doctype');

              case 4:
                _context6.next = 6;
                return Promise.all(docs.map(function (d) {
                  return _this2.schema.validate(d);
                }));

              case 6:
                validations = _context6.sent;
                errors = validations.filter(function (validation) {
                  return validation !== true;
                });

                if (!(errors.length > 0)) {
                  _context6.next = 11;
                  break;
                }

                console.warn('There has been some validation errors while bulk saving', errors);
                throw new Error('Validation failed for at least one doc');

              case 11:
                toSaveDocs = docs.map(function (d) {
                  return _this2.prepareDocumentForSave(d);
                });
                mutation = _dsl.Mutations.updateDocuments(toSaveDocs);
                return _context6.abrupt("return", this.mutate(mutation, mutationOptions));

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function saveAll(_x7) {
        return _saveAll.apply(this, arguments);
      }

      return saveAll;
    }()
  }, {
    key: "ensureCozyMetadata",
    value: function ensureCozyMetadata(document) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        event: DOC_CREATION
      };
      var METADATA_VERSION = 1;
      if (this.appMetadata === undefined) return document;
      var doctypeVersion;

      if (document._type) {
        var schema = this.schema.getDoctypeSchema(document._type);
        doctypeVersion = (0, _get.default)(schema, 'doctypeVersion');
      }

      var _this$appMetadata = this.appMetadata,
          slug = _this$appMetadata.slug,
          sourceAccount = _this$appMetadata.sourceAccount,
          version = _this$appMetadata.version;
      var now = new Date().toISOString();
      var cozyMetadata = (0, _get.default)(document, 'cozyMetadata', {});

      if (options.event === DOC_CREATION) {
        cozyMetadata = _objectSpread({
          metadataVersion: METADATA_VERSION,
          doctypeVersion: doctypeVersion,
          createdByApp: slug,
          sourceAccount: sourceAccount,
          createdAt: now,
          createdByAppVersion: version,
          updatedAt: now,
          updatedByApps: slug ? [{
            date: now,
            slug: slug,
            version: version
          }] : []
        }, cozyMetadata);
      } else if (options.event === DOC_UPDATE) {
        cozyMetadata = _objectSpread(_objectSpread({}, cozyMetadata), {}, {
          updatedAt: now,
          updatedByApps: [{
            date: now,
            slug: slug,
            version: version
          }].concat((0, _toConsumableArray2.default)((0, _get.default)(document, 'cozyMetadata.updatedByApps', []).filter(function (info) {
            return info.slug !== slug;
          })))
        });
      }

      return _objectSpread(_objectSpread({}, document), {}, {
        cozyMetadata: cozyMetadata
      });
    }
    /**
     * Dehydrates and adds metadata before saving a document
     *
     * @param  {CozyClientDocument} doc - Document that will be saved
     * @returns {CozyClientDocument}
     */

  }, {
    key: "prepareDocumentForSave",
    value: function prepareDocumentForSave(doc) {
      var isNewDoc = !doc._rev;
      var dehydratedDoc = this.ensureCozyMetadata((0, _helpers2.dehydrate)(doc), {
        event: isNewDoc ? DOC_CREATION : DOC_UPDATE
      });
      return dehydratedDoc;
    }
    /**
     * Creates a list of mutations to execute to create a document and its relationships.
     *
     * ```js
     * const baseDoc = { _type: 'io.cozy.todo', label: 'Go hiking' }
     * // relations can be arrays or single objects
     * const relationships = {
     *   attachments: [{ _id: 12345, _type: 'io.cozy.files' }, { _id: 6789, _type: 'io.cozy.files' }],
     *   bills: { _id: 9999, _type: 'io.cozy.bills' }
     * }
     * client.getDocumentSavePlan(baseDoc, relationships)
     * ```
     *
     *
     * @param  {object} document - Document to create
     * @param  {ReferenceMap} [referencesByName] - References to the created document. The
     * relationship class associated to each reference list should support references, otherwise this
     * method will throw.
     *
     * @returns {Mutation[]|Mutation}  One or more mutation to execute
     */

  }, {
    key: "getDocumentSavePlan",
    value: function getDocumentSavePlan(document, referencesByName) {
      var _this3 = this;

      var isNewDoc = !document._rev;
      var docToSave = this.prepareDocumentForSave(document);
      var saveMutation = isNewDoc ? _dsl.Mutations.createDocument(docToSave) : _dsl.Mutations.updateDocument(docToSave);
      var hasReferences = referencesByName && Object.values(referencesByName).filter(function (references) {
        return Array.isArray(references) ? references.length > 0 : references;
      }).length > 0;

      if (!hasReferences) {
        return saveMutation;
      } else {
        for (var _i = 0, _Object$keys = Object.keys(referencesByName); _i < _Object$keys.length; _i++) {
          var relName = _Object$keys[_i];
          var doctype = document._type;
          var doctypeRelationship = this.schema.getRelationship(doctype, relName);
          var relationshipClass = doctypeRelationship.type;

          if (!supportsReferences(relationshipClass)) {
            throw referencesUnsupportedError(doctypeRelationship.name);
          }
        }
      }

      if (referencesByName && !isNewDoc) {
        throw new Error('Unable to save external relationships on a not-new document');
      }

      return [saveMutation, function (response) {
        var doc = _this3.hydrateDocument(response.data);

        return Object.entries(referencesByName).map(function (_ref2) {
          var _ref3 = (0, _slicedToArray2.default)(_ref2, 2),
              relName = _ref3[0],
              references = _ref3[1];

          var relationship = doc[relName];
          return relationship.addReferences(references);
        });
      }];
    }
    /**
     * Hooks are an observable system for events on documents.
     * There are at the moment only 2 hooks available.
     *
     * - before:destroy, called just before a document is destroyed via CozyClient::destroy
     * - after:destroy, called after a document is destroyed via CozyClient::destroy
     *
     * @example
     * ```
     * CozyClient.registerHook('io.cozy.bank.accounts', 'before:destroy', () => {
     *   console.log('A io.cozy.bank.accounts is being destroyed')
     * })
     * ```
     *
     * @param  {string}   doctype - Doctype on which the hook will be registered
     * @param  {string}   name    - Name of the hook
     * @param  {Function} fn      - Callback to be executed
     */

  }, {
    key: "triggerHook",
    value: function triggerHook(name, document) {
      if (!CozyClient.hooks) return;
      var allHooks = CozyClient.hooks[document._type] || {};
      var hooks = allHooks[name] || [];

      var _iterator4 = _createForOfIteratorHelper(hooks),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var h = _step4.value;
          h(this, document);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
    /**
     * Destroys a document. {before,after}:destroy hooks will be fired.
     *
     * @param  {CozyClientDocument} document - Document to be deleted
     * @returns {Promise<CozyClientDocument>} The document that has been deleted
     */

  }, {
    key: "destroy",
    value: function () {
      var _destroy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(document) {
        var mutationOptions,
            res,
            _args7 = arguments;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                mutationOptions = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
                _context7.next = 3;
                return this.triggerHook('before:destroy', document);

              case 3:
                _context7.next = 5;
                return this.mutate(_dsl.Mutations.deleteDocument(document), mutationOptions);

              case 5:
                res = _context7.sent;
                _context7.next = 8;
                return this.triggerHook('after:destroy', document);

              case 8:
                return _context7.abrupt("return", res);

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function destroy(_x8) {
        return _destroy.apply(this, arguments);
      }

      return destroy;
    }()
  }, {
    key: "upload",
    value: function upload(file, dirPath) {
      var mutationOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.mutate(_dsl.Mutations.uploadFile(file, dirPath), mutationOptions);
    }
    /**
     * Makes sure that the query exists in the store
     *
     * @param  {string} queryId - Id of the query
     * @param  {QueryDefinition} queryDefinition - Definition of the query
     * @param  {QueryOptions} [options] - Additional options
     */

  }, {
    key: "ensureQueryExists",
    value: function ensureQueryExists(queryId, queryDefinition, options) {
      this.ensureStore();
      var existingQuery = (0, _store.getQueryFromState)(this.store.getState(), queryId); // Don't trigger the INIT_QUERY for fetchMore() calls

      if (existingQuery.fetchStatus !== 'loaded' || !queryDefinition.skip && !queryDefinition.bookmark) {
        this.dispatch((0, _store.initQuery)(queryId, queryDefinition, options));
      }
    }
    /**
     * Executes a query and returns its results.
     *
     * Results from the query will be saved internally and can be retrieved via
     * `getQueryFromState` or directly using `<Query />`. `<Query />` automatically
     * executes its query when mounted if no fetch policy has been indicated.
     *
     * @param  {QueryDefinition} queryDefinition - Definition that will be executed
     * @param  {QueryOptions} [options] - Options
     * @returns {Promise<QueryResult>}
     */

  }, {
    key: "query",
    value: function () {
      var _query = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(queryDefinition) {
        var _this4 = this;

        var _ref4,
            update,
            options,
            queryId,
            existingQuery,
            shouldFetch,
            response,
            _args8 = arguments;

        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _ref4 = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
                update = _ref4.update, options = (0, _objectWithoutProperties2.default)(_ref4, ["update"]);
                this.ensureStore();
                queryId = options.as || this.queryIdGenerator.generateId(queryDefinition);
                existingQuery = this.getQueryFromState(queryId);

                if (!options.fetchPolicy) {
                  _context8.next = 11;
                  break;
                }

                if (options.as) {
                  _context8.next = 8;
                  break;
                }

                throw new Error('Cannot use `fetchPolicy` without naming the query, please use `as` to name the query');

              case 8:
                shouldFetch = options.fetchPolicy(existingQuery);

                if (shouldFetch) {
                  _context8.next = 11;
                  break;
                }

                return _context8.abrupt("return");

              case 11:
                if (!(existingQuery && Object.keys(existingQuery).length > 0)) {
                  _context8.next = 14;
                  break;
                }

                if (!(existingQuery.fetchStatus === 'loading')) {
                  _context8.next = 14;
                  break;
                }

                return _context8.abrupt("return", this._promiseCache.get(function () {
                  return (0, _jsonStableStringify.default)(queryDefinition);
                }));

              case 14:
                this.ensureQueryExists(queryId, queryDefinition, options);
                _context8.prev = 15;
                this.dispatch((0, _store.loadQuery)(queryId));
                _context8.next = 19;
                return this._promiseCache.exec(function () {
                  return _this4.requestQuery(queryDefinition);
                }, function () {
                  return (0, _jsonStableStringify.default)(queryDefinition);
                });

              case 19:
                response = _context8.sent;
                this.dispatch((0, _store.receiveQueryResult)(queryId, response, {
                  update: update
                }));
                return _context8.abrupt("return", response);

              case 24:
                _context8.prev = 24;
                _context8.t0 = _context8["catch"](15);
                this.dispatch((0, _store.receiveQueryError)(queryId, _context8.t0)); // specific onError

                if (!options.onError) {
                  _context8.next = 31;
                  break;
                }

                options.onError(_context8.t0); // defaulted onError

                _context8.next = 36;
                break;

              case 31:
                if (!this.options.onError) {
                  _context8.next = 35;
                  break;
                }

                this.options.onError(_context8.t0);
                _context8.next = 36;
                break;

              case 35:
                throw _context8.t0;

              case 36:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this, [[15, 24]]);
      }));

      function query(_x9) {
        return _query.apply(this, arguments);
      }

      return query;
    }()
    /**
     * Will fetch all documents for a `queryDefinition`, automatically fetching more
     * documents if the total of documents is superior to the pagination limit. Can
     * result in a lot of network requests.
     *
     * @param  {QueryDefinition} queryDefinition - Definition to be executed
     * @param {QueryOptions} [options] - Options
     * @returns {Promise<QueryResult>} All documents matching the query
     */

  }, {
    key: "queryAll",
    value: function () {
      var _queryAll = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(queryDefinition) {
        var options,
            queryId,
            mergedOptions,
            resp,
            documents,
            currentResult,
            _args9 = arguments;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                options = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : {};
                queryId = options.as || this.queryIdGenerator.generateId(queryDefinition);
                mergedOptions = _objectSpread(_objectSpread({}, options), {}, {
                  as: queryId
                });
                _context9.next = 5;
                return this.query(queryDefinition, mergedOptions);

              case 5:
                resp = _context9.sent;
                documents = resp.data;

              case 7:
                if (!(resp && resp.next)) {
                  _context9.next = 21;
                  break;
                }

                if (!resp.bookmark) {
                  _context9.next = 14;
                  break;
                }

                _context9.next = 11;
                return this.query(queryDefinition.offsetBookmark(resp.bookmark), mergedOptions);

              case 11:
                resp = _context9.sent;
                _context9.next = 18;
                break;

              case 14:
                currentResult = (0, _store.getRawQueryFromState)(this.store.getState(), queryId);
                _context9.next = 17;
                return this.query(queryDefinition.offset(currentResult.data.length), mergedOptions);

              case 17:
                resp = _context9.sent;

              case 18:
                documents.push.apply(documents, (0, _toConsumableArray2.default)(resp.data));
                _context9.next = 7;
                break;

              case 21:
                return _context9.abrupt("return", documents);

              case 22:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function queryAll(_x10) {
        return _queryAll.apply(this, arguments);
      }

      return queryAll;
    }()
  }, {
    key: "watchQuery",
    value: function watchQuery() {
      console.warn('client.watchQuery is deprecated, please use client.makeObservableQuery.');
      return this.makeObservableQuery.apply(this, arguments);
    }
  }, {
    key: "makeObservableQuery",
    value: function makeObservableQuery(queryDefinition) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.ensureStore();
      var queryId = options.as || this.queryIdGenerator.generateId(queryDefinition);
      this.ensureQueryExists(queryId, queryDefinition);
      return new _ObservableQuery.default(queryId, queryDefinition, this, options);
    }
    /**
     * Mutate a document
     *
     * @param  {object}    mutationDefinition - Describe the mutation
     * @param {object} [options] - Options
     * @param  {string}    [options.as] - Mutation id
     * @param  {Function}    [options.update] - Function to update the document
     * @param  {Function}    [options.updateQueries] - Function to update queries
     * @returns {Promise}
     */

  }, {
    key: "mutate",
    value: function () {
      var _mutate = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(mutationDefinition) {
        var _ref5,
            update,
            updateQueries,
            options,
            mutationId,
            response,
            _args10 = arguments;

        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _ref5 = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : {};
                update = _ref5.update, updateQueries = _ref5.updateQueries, options = (0, _objectWithoutProperties2.default)(_ref5, ["update", "updateQueries"]);
                this.ensureStore();
                mutationId = options.as || this.queryIdGenerator.generateId(mutationDefinition);
                this.dispatch((0, _store.initMutation)(mutationId, mutationDefinition));
                _context10.prev = 5;
                _context10.next = 8;
                return this.requestMutation(mutationDefinition);

              case 8:
                response = _context10.sent;
                this.dispatch((0, _store.receiveMutationResult)(mutationId, response, {
                  update: update,
                  updateQueries: updateQueries
                }, mutationDefinition));
                return _context10.abrupt("return", response);

              case 13:
                _context10.prev = 13;
                _context10.t0 = _context10["catch"](5);
                this.dispatch((0, _store.receiveMutationError)(mutationId, _context10.t0, mutationDefinition));
                throw _context10.t0;

              case 17:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this, [[5, 13]]);
      }));

      function mutate(_x11) {
        return _mutate.apply(this, arguments);
      }

      return mutate;
    }()
    /**
     * Executes a query through links and fetches relationships
     *
     * @private
     * @param  {QueryDefinition} definition QueryDefinition to be executed
     * @returns {Promise<ClientResponse>}
     */

  }, {
    key: "requestQuery",
    value: function () {
      var _requestQuery = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(definition) {
        var mainResponse, withIncluded;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.chain.request(definition);

              case 2:
                mainResponse = _context11.sent;

                if (definition.includes) {
                  _context11.next = 5;
                  break;
                }

                return _context11.abrupt("return", mainResponse);

              case 5:
                _context11.next = 7;
                return this.fetchRelationships(mainResponse, this.getIncludesRelationships(definition));

              case 7:
                withIncluded = _context11.sent;
                return _context11.abrupt("return", withIncluded);

              case 9:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function requestQuery(_x12) {
        return _requestQuery.apply(this, arguments);
      }

      return requestQuery;
    }()
    /**
     * Fetch relationships for a response (can be several docs).
     * Fills the `relationships` attribute of each documents.
     *
     * Can potentially result in several fetch requests.
     * Queries are optimized before being sent (multiple single documents queries can be packed into
     * one multiple document query) for example.
     *
     * @private
     */

  }, {
    key: "fetchRelationships",
    value: function () {
      var _fetchRelationships = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12(response, relationshipsByName) {
        var _this5 = this;

        var isSingleDoc, responseDocs, queryDefToDocIdAndRel, documents, definitions, optimizedDefinitions, responses, uniqueDocuments, included, relationshipsByDocId, _iterator5, _step5, _step5$value, def, resp, docIdAndRel, _docIdAndRel, docId, relName;

        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                isSingleDoc = !Array.isArray(response.data);

                if (!(!isSingleDoc && response.data.length === 0)) {
                  _context12.next = 3;
                  break;
                }

                return _context12.abrupt("return", response);

              case 3:
                responseDocs = isSingleDoc ? [response.data] : response.data;
                queryDefToDocIdAndRel = new Map();
                documents = [];
                definitions = [];
                responseDocs.forEach(function (doc) {
                  return (0, _forEach.default)(relationshipsByName, function (relationship, relName) {
                    try {
                      var queryDef = relationship.type.query(doc, _this5, relationship);
                      var docId = doc._id; // Used to reattach responses into the relationships attribute of
                      // each document

                      queryDefToDocIdAndRel.set(queryDef, [docId, relName]); // Relationships can yield "queries" that are already resolved documents.
                      // These do not need to go through the usual link request mechanism.

                      if (queryDef instanceof _dsl.QueryDefinition) {
                        definitions.push(queryDef);
                      } else {
                        documents.push(queryDef);
                      }
                    } catch (_unused) {// eslint-disable-next-line
                      // We do not crash completely if one the relationship behaves badly and
                      // throws
                    }
                  });
                }); // Definitions can be in optimized/regrouped in case of HasMany relationships.

                optimizedDefinitions = (0, _optimize.default)(definitions);
                _context12.next = 11;
                return Promise.all(optimizedDefinitions.map(function (req) {
                  return _this5.chain.request(req);
                }));

              case 11:
                responses = _context12.sent;
                // "Included" documents will be stored in the `documents` store
                uniqueDocuments = (0, _uniqBy.default)((0, _flatten.default)(documents), '_id');
                included = (0, _flatten.default)(responses.map(function (r) {
                  return r.included || r.data;
                })).concat(uniqueDocuments).filter(Boolean); // Some relationships have the relationship data on the other side of the
                // relationship (ex: io.cozy.photos.albums do not have photo inclusion information,
                // it is on the io.cozy.files side).
                // Here we take the data received from the relationship queries, and group
                // it so that we can fill the `relationships` attribute of each doc before
                // storing the document. This makes the data easier to manipulate for the front-end.

                relationshipsByDocId = {};
                _iterator5 = _createForOfIteratorHelper((0, _zip.default)(optimizedDefinitions, responses));

                try {
                  for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                    _step5$value = (0, _slicedToArray2.default)(_step5.value, 2), def = _step5$value[0], resp = _step5$value[1];
                    docIdAndRel = queryDefToDocIdAndRel.get(def);

                    if (docIdAndRel) {
                      _docIdAndRel = (0, _slicedToArray2.default)(docIdAndRel, 2), docId = _docIdAndRel[0], relName = _docIdAndRel[1];
                      relationshipsByDocId[docId] = relationshipsByDocId[docId] || {};
                      relationshipsByDocId[docId][relName] = (0, _helpers.responseToRelationship)(resp);
                    }
                  }
                } catch (err) {
                  _iterator5.e(err);
                } finally {
                  _iterator5.f();
                }

                return _context12.abrupt("return", _objectSpread(_objectSpread({}, (0, _helpers.attachRelationships)(response, relationshipsByDocId)), {}, {
                  included: included
                }));

              case 18:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function fetchRelationships(_x13, _x14) {
        return _fetchRelationships.apply(this, arguments);
      }

      return fetchRelationships;
    }()
  }, {
    key: "requestMutation",
    value: function () {
      var _requestMutation = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13(definition) {
        var _this6 = this;

        var _definition, first, rest, firstResponse;

        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                if (!Array.isArray(definition)) {
                  _context13.next = 8;
                  break;
                }

                _definition = (0, _toArray2.default)(definition), first = _definition[0], rest = _definition.slice(1);
                _context13.next = 4;
                return this.requestMutation(first);

              case 4:
                firstResponse = _context13.sent;
                _context13.next = 7;
                return Promise.all(rest.map(function (def) {
                  var mutationDef = typeof def === 'function' ? def(firstResponse) : def;
                  return _this6.requestMutation(mutationDef);
                }));

              case 7:
                return _context13.abrupt("return", firstResponse);

              case 8:
                return _context13.abrupt("return", this.chain.request(definition));

              case 9:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function requestMutation(_x15) {
        return _requestMutation.apply(this, arguments);
      }

      return requestMutation;
    }()
  }, {
    key: "getIncludesRelationships",
    value: function getIncludesRelationships(queryDefinition) {
      var _this7 = this;

      var includes = queryDefinition.includes,
          doctype = queryDefinition.doctype;
      if (!includes) return {};
      return (0, _fromPairs.default)(includes.map(function (relName) {
        return [relName, _this7.schema.getRelationship(doctype, relName)];
      }));
    }
    /**
     * Returns documents with their relationships resolved according to their schema.
     * If related documents are not in the store, they will not be fetched automatically.
     * Instead, the relationships will have null documents.
     *
     * @param  {string} doctype - Doctype of the documents being hydrated
     * @param  {Array<CozyClientDocument>} documents - Documents to be hydrated
     * @returns {Array<HydratedDocument>}
     */

  }, {
    key: "hydrateDocuments",
    value: function hydrateDocuments(doctype, documents) {
      var _this8 = this;

      if (this.options.autoHydrate === false) {
        return documents;
      }

      var schema = this.schema.getDoctypeSchema(doctype);
      var relationships = schema.relationships;

      if (relationships) {
        return documents.map(function (doc) {
          return _this8.hydrateDocument(doc, schema);
        });
      } else {
        return documents;
      }
    }
    /**
     * Resolves relationships on a document.
     *
     * The original document is kept in the target attribute of
     * the relationship
     *
     * @param  {CozyClientDocument} document - for which relationships must be resolved
     * @param  {Schema} [schemaArg] - Optional
     * @returns {HydratedDocument}
     */

  }, {
    key: "hydrateDocument",
    value: function hydrateDocument(document, schemaArg) {
      if (!document) {
        return document;
      }

      var schema = schemaArg || this.schema.getDoctypeSchema(document._type);
      return _objectSpread(_objectSpread({}, document), this.hydrateRelationships(document, schema.relationships));
    }
  }, {
    key: "hydrateRelationships",
    value: function hydrateRelationships(document, schemaRelationships) {
      var methods = this.getRelationshipStoreAccessors();
      return (0, _mapValues.default)(schemaRelationships, function (assoc, name) {
        return (0, _associations.create)(document, assoc, methods);
      });
    }
    /**
     * Creates (locally) a new document for the given doctype.
     * This document is hydrated : its relationships are there
     * and working.
     */

  }, {
    key: "makeNewDocument",
    value: function makeNewDocument(doctype) {
      var obj = {
        _type: doctype
      };
      return this.hydrateDocument(obj);
    }
  }, {
    key: "generateRandomId",
    value: function generateRandomId() {
      return this.queryIdGenerator.generateRandomId();
    }
    /**
     * Creates an association that is linked to the store.
     */

  }, {
    key: "getAssociation",
    value: function getAssociation(document, associationName) {
      return (0, _associations.create)(document, this.schema.getRelationship(document._type, associationName), this.getRelationshipStoreAccessors());
    }
    /**
     * Returns the accessors that are given to the relationships for them
     * to deal with the stores.
     *
     * Relationships need to have access to the store to ping it when
     * a modification (addById/removeById etc...) has been done. This wakes
     * the store up, which in turn will update the `<Query>`s and re-render the data.
     */

  }, {
    key: "getRelationshipStoreAccessors",
    value: function getRelationshipStoreAccessors() {
      var _this9 = this;

      if (!this.storeAccesors) {
        this.storeAccessors = {
          get: this.getDocumentFromState.bind(this),
          save: function save(document, opts) {
            return _this9.save.call(_this9, document, opts);
          },
          dispatch: this.dispatch.bind(this),
          query: function query(def, opts) {
            return _this9.query.call(_this9, def, opts);
          },
          mutate: function mutate(def, opts) {
            return _this9.mutate.call(_this9, def, opts);
          }
        };
      }

      return this.storeAccessors;
    }
    /**
     * Get a collection of documents from the internal store.
     *
     * @param {string} type - Doctype of the collection
     *
     * @returns {CozyClientDocument[]} Array of documents or null if the collection does not exist.
     */

  }, {
    key: "getCollectionFromState",
    value: function getCollectionFromState(type) {
      try {
        return (0, _store.getCollectionFromState)(this.store.getState(), type);
      } catch (e) {
        _logger.default.warn('Could not getCollectionFromState', type, e.message);

        return null;
      }
    }
    /**
     * Get a document from the internal store.
     *
     * @param {string} type - Doctype of the document
     * @param {string} id   - Id of the document
     *
     * @returns {CozyClientDocument} Document or null if the object does not exist.
     */

  }, {
    key: "getDocumentFromState",
    value: function getDocumentFromState(type, id) {
      try {
        return (0, _store.getDocumentFromState)(this.store.getState(), type, id);
      } catch (e) {
        _logger.default.warn('Could not getDocumentFromState', type, id, e.message);

        return null;
      }
    }
    /**
     * Get a query from the internal store.
     *
     * @param {string} id - Id of the query (set via Query.props.as)
     * @param {object} options - Options
     * @param {boolean} [options.hydrated] - Whether documents should be returned already hydrated (default: false)
     * @param  {object} [options.singleDocData] - If true, the "data" returned will be
     * a single doc instead of an array for single doc queries. Defaults to false for backward
     * compatibility but will be set to true in the future.
     *
     * @returns {QueryState} - Query state or null if it does not exist.
     */

  }, {
    key: "getQueryFromState",
    value: function getQueryFromState(id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var hydrated = options.hydrated || false;
      var singleDocData = options.singleDocData || false;

      try {
        var queryResults = (0, _store.getQueryFromState)(this.store.getState(), id);
        var doctype = queryResults.definition && queryResults.definition.doctype;
        var isSingleDocQuery = queryResults.definition && queryResults.definition.id;

        if (!hydrated && !singleDocData) {
          // Early return let's us preserve reference equality in the simple case
          return queryResults;
        }

        var data = hydrated && doctype ? this.hydrateDocuments(doctype, queryResults.data) : queryResults.data;
        return _objectSpread(_objectSpread({}, queryResults), {}, {
          data: isSingleDocQuery && singleDocData ? data[0] : data
        });
      } catch (e) {
        console.warn("Could not get query from state. queryId: ".concat(id, ", error: ").concat(e.message));
        return null;
      }
    }
    /**
     * Executes a query and returns the results from internal store.
     *
     * Can be useful in pure JS context (without React)
     * Has a behavior close to <Query /> or useQuery
     *
     * @param {object} query - Query with definition and options
     * @returns {Promise<QueryState>} Query state
     */

  }, {
    key: "register",

    /**
     * Performs a complete OAuth flow using a Cordova webview
     * or React Native WebView for auth.
     * The `register` method's name has been chosen for compat reasons with the Authentication compo.
     *
     * @param   {string} cozyURL Receives the URL of the cozy instance.
     * @returns {object}   Contains the fetched token and the client information.
     */
    value: function register(cozyURL) {
      var stackClient = this.getStackClient();
      stackClient.setUri(cozyURL);
      return this.startOAuthFlow(_mobile.authFunction);
    }
  }, {
    key: "isReactNative",
    value: function isReactNative() {
      return typeof navigator != 'undefined' && navigator.product == 'ReactNative';
    }
    /**
     * Performs a complete OAuth flow, including updating the internal token at the end.
     *
     * @param   {Function} openURLCallback Receives the URL to present to the user as a parameter, and should return a promise that resolves with the URL the user was redirected to after accepting the permissions.
     * @returns {Promise<object>} Contains the fetched token and the client information. These should be stored and used to restore the client.
     */

  }, {
    key: "startOAuthFlow",
    value: function () {
      var _startOAuthFlow = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14(openURLCallback) {
        var stackClient;
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                stackClient = this.getStackClient();
                _context14.next = 3;
                return stackClient.register();

              case 3:
                if (!stackClient.oauthOptions.shouldRequireFlagshipPermissions) {
                  _context14.next = 6;
                  break;
                }

                _context14.next = 6;
                return (0, _flagshipCertification.certifyFlagship)(stackClient.oauthOptions.certificationConfig, this);

              case 6:
                return _context14.abrupt("return", this.authorize(openURLCallback));

              case 7:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function startOAuthFlow(_x16) {
        return _startOAuthFlow.apply(this, arguments);
      }

      return startOAuthFlow;
    }()
  }, {
    key: "authorize",
    value: function () {
      var _authorize = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee15(openURLCallback) {
        var stackClient, stateCode, url, redirectedURL, code, token, _stackClient;

        return _regenerator.default.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.prev = 0;
                stackClient = this.getStackClient();
                stateCode = stackClient.generateStateCode();
                url = stackClient.getAuthCodeURL(stateCode);
                _context15.next = 6;
                return openURLCallback(url);

              case 6:
                redirectedURL = _context15.sent;
                code = stackClient.getAccessCodeFromURL(redirectedURL, stateCode);
                _context15.next = 10;
                return stackClient.fetchAccessToken(code);

              case 10:
                token = _context15.sent;
                stackClient.setToken(token);
                return _context15.abrupt("return", {
                  token: token,
                  infos: stackClient.oauthOptions,
                  client: stackClient.oauthOptions // for compat with Authentication comp reasons

                });

              case 15:
                _context15.prev = 15;
                _context15.t0 = _context15["catch"](0);

                /* if REGISTRATION_ABORT is emited, we have to unregister the client. */
                if (_context15.t0.message === _const.REGISTRATION_ABORT) {
                  _stackClient = this.getStackClient();

                  _stackClient.unregister();
                }

                throw _context15.t0;

              case 19:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[0, 15]]);
      }));

      function authorize(_x17) {
        return _authorize.apply(this, arguments);
      }

      return authorize;
    }()
    /**
     * Renews the token if, for instance, new permissions are required or token
     * has expired.
     *
     * @returns {object}   Contains the fetched token and the client information.
     */

  }, {
    key: "renewAuthorization",
    value: function renewAuthorization() {
      return this.authorize(_mobile.authFunction);
    }
    /**
     * Sets the internal store of the client. Use this when you want to have cozy-client's
     * internal store colocated with your existing Redux store.
     *
     * Typically, you would need to do this only once in your application, this is why
     * setStore throws if you do it twice. If you really need to set the store again,
     * use options.force = true.
     *
     * @example
     * ```
     * const client = new CozyClient()
     * const store = createStore(combineReducers({
     *   todos: todoReducer,
     *   cozy: client.reducer()
     * })
     * client.setStore(store)
     * ```
     *
     * @param {ReduxStore} store - A redux store
     * @param {object} [options] - Options
     * @param {boolean} [options.force] - Will deactivate throwing when client's store already exists
     */

  }, {
    key: "setStore",
    value: function setStore(store) {
      var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref6$force = _ref6.force,
          force = _ref6$force === void 0 ? false : _ref6$force;

      if (store === undefined) {
        throw new Error('Store is undefined');
      } else if (this.store && !force) {
        throw new Error("Client already has a store, it is forbidden to change store.\nsetStore must be called before any query is executed. Try to\ncall setStore earlier in your code, preferably just after the\ninstantiation of the client.");
      }

      this.store = store;
    }
  }, {
    key: "ensureStore",
    value: function ensureStore() {
      if (!this.store) {
        this.setStore((0, _store.createStore)());
      }
    }
    /**
     * Returns whether the client has been revoked on the server
     */

  }, {
    key: "checkForRevocation",
    value: function () {
      var _checkForRevocation = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee16() {
        return _regenerator.default.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                return _context16.abrupt("return", this.stackClient.checkForRevocation());

              case 1:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function checkForRevocation() {
        return _checkForRevocation.apply(this, arguments);
      }

      return checkForRevocation;
    }()
    /** Sets public attribute and emits event related to revocation */

  }, {
    key: "handleRevocationChange",
    value: function handleRevocationChange(state) {
      if (state) {
        this.isRevoked = true;
        this.emit('revoked');
      } else {
        this.isRevoked = false;
        this.emit('unrevoked');
      }
    }
    /** Emits event when token is refreshed */

  }, {
    key: "handleTokenRefresh",
    value: function handleTokenRefresh(token) {
      this.emit('tokenRefreshed');

      if (this.options.onTokenRefresh) {
        deprecatedHandler("Using onTokenRefresh is deprecated, please use events like this: cozyClient.on('tokenRefreshed', token => console.log('Token has been refreshed', token)). https://git.io/fj3M3");
        this.options.onTokenRefresh(token);
      }
    }
    /**
     * If no stack client has been passed in options, creates a default stack
     * client and attaches handlers for revocation and token refresh.
     * If a stackClient has been passed in options, ensure it has handlers for
     * revocation and token refresh.
     *
     * If `oauth` options are passed, stackClient is an OAuthStackClient.
     */

  }, {
    key: "createClient",
    value: function createClient() {
      if (this.options.client) {
        console.warn('CozyClient: Using options.client is deprecated, please use options.stackClient.');
      }

      var warningForCustomHandlers = this.options.warningForCustomHandlers !== undefined ? this.options.warningForCustomHandlers : true;
      var stackClient = this.options.client || this.options.stackClient;
      var handlers = {
        onRevocationChange: this.handleRevocationChange,
        onTokenRefresh: this.handleTokenRefresh
      };

      if (stackClient) {
        this.stackClient = stackClient;

        if (!stackClient.options) {
          stackClient.options = {};
        }

        for (var _i2 = 0, _Object$keys2 = Object.keys(handlers); _i2 < _Object$keys2.length; _i2++) {
          var handlerName = _Object$keys2[_i2];

          if (!stackClient.options[handlerName]) {
            stackClient.options[handlerName] = handlers[handlerName];
          } else {
            if (warningForCustomHandlers) {
              console.warn("You passed a stackClient with its own ".concat(handlerName, ". It is not supported, unexpected things might happen."));
            }
          }
        }
      } else {
        var options = _objectSpread(_objectSpread({}, this.options), handlers);

        this.stackClient = this.options.oauth ? new _cozyStackClient.OAuthClient(options) : new _cozyStackClient.default(options);
      }

      this.client = new Proxy(this.stackClient, deprecatedHandler('Using cozyClient.client is deprecated, please use cozyClient.stackClient.'));
    }
  }, {
    key: "getClient",
    value: function getClient() {
      console.warn('CozyClient: getClient() is deprecated, please use getStackClient().');
      return this.getStackClient();
    }
  }, {
    key: "getStackClient",
    value: function getStackClient() {
      if (!this.stackClient) {
        this.createClient();
      }

      return this.stackClient;
    }
  }, {
    key: "reducer",
    value: function reducer() {
      return _store.default;
    }
  }, {
    key: "dispatch",
    value: function dispatch(action) {
      return this.store.dispatch(action);
    }
    /**
     * getInstanceOptions - Returns current instance options, such as domain or app slug
     *
     * @returns {object}
     */

  }, {
    key: "getInstanceOptions",
    value: function getInstanceOptions() {
      return this.instanceOptions;
    }
    /**
     * loadInstanceOptionsFromDOM - Loads the dataset injected by the Stack in web pages and exposes it through getInstanceOptions
     *
     * @param {string} [selector=[role=application]] A selector for the node that holds the dataset to load
     *
     * @returns {void}
     */

  }, {
    key: "loadInstanceOptionsFromDOM",
    value: function loadInstanceOptionsFromDOM() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[role=application]';
      var root = document.querySelector(selector);

      if (!(root instanceof HTMLElement)) {
        throw new Error('The selector that is passed does not return an HTMLElement');
      }

      var _root$dataset = root.dataset,
          _root$dataset$cozy = _root$dataset.cozy,
          cozy = _root$dataset$cozy === void 0 ? '{}' : _root$dataset$cozy,
          dataset = (0, _objectWithoutProperties2.default)(_root$dataset, ["cozy"]);
      this.instanceOptions = _objectSpread(_objectSpread({}, JSON.parse(cozy)), dataset);
      this.capabilities = this.instanceOptions.capabilities || null;
    }
    /**
     * Directly set the data in the store, without using a query
     * This is useful for cases like Pouch replication, which wants to
     * set some data in the store.
     *
     * @param {object} data - Data that is inserted in the store. Shape: { doctype: [data] }
     */

  }, {
    key: "setData",
    value: function setData(data) {
      var _this10 = this;

      this.ensureStore();
      Object.entries(data).forEach(function (_ref7) {
        var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
            doctype = _ref8[0],
            data = _ref8[1];

        _this10.dispatch((0, _store.receiveQueryResult)(null, {
          data: data
        }));
      });
    }
    /**
     * At any time put an error function
     *
     * @param {Function} [onError] - Set a callback for queries which are errored
     * @throws {Error} onError should not have been defined yet
     */

  }, {
    key: "setOnError",
    value: function setOnError(onError) {
      if (this.options && this.options.onError) {
        throw new Error('On Error is already defined');
      }

      this.options.onError = onError;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return new _snapshots.CozyClient({
        uri: this.options.uri
      });
    }
  }], [{
    key: "fromOldClient",
    value: function fromOldClient(oldClient, options) {
      return new CozyClient(_objectSpread({
        uri: oldClient._url,
        token: oldClient._token.token
      }, options));
    }
    /**
     * To help with the transition from cozy-client-js to cozy-client, it is possible to instantiate
     * a client with an OAuth-based instance of cozy-client-js.
     *
     * Warning: unlike other instantiators, this one needs to be awaited.
     *
     * @param {OldCozyClient} oldClient - An OAuth instance of the deprecated cozy-client
     * @param {object} options - CozyStackClient options
     * @returns {Promise<CozyClient>} An instance of a client, configured from the old client
     */

  }, {
    key: "fromOldOAuthClient",
    value: function () {
      var _fromOldOAuthClient = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee17(oldClient, options) {
        var credentials, oauthOptions;
        return _regenerator.default.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                if (!oldClient._oauth) {
                  _context17.next = 8;
                  break;
                }

                _context17.next = 3;
                return oldClient.authorize();

              case 3:
                credentials = _context17.sent;
                oauthOptions = {
                  oauth: credentials.client,
                  token: credentials.token,
                  scope: credentials.token.scope
                };
                return _context17.abrupt("return", new CozyClient(_objectSpread(_objectSpread({
                  uri: oldClient._url
                }, oauthOptions), options)));

              case 8:
                throw new Error('Cannot instantiate a new client: old client is not an OAuth client. CozyClient.fromOldClient might be more suitable.');

              case 9:
              case "end":
                return _context17.stop();
            }
          }
        }, _callee17);
      }));

      function fromOldOAuthClient(_x18, _x19) {
        return _fromOldOAuthClient.apply(this, arguments);
      }

      return fromOldOAuthClient;
    }()
    /**
     * In konnector/service context, CozyClient can be instantiated from
     * environment variables
     *
     * @param  {NodeEnvironment} [envArg]  - The environment
     * @param  {object} options - Options
     * @returns {CozyClient}
     */

  }, {
    key: "fromEnv",
    value: function fromEnv(envArg) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var env = envArg || (typeof process !== 'undefined' ? process.env : {});
      var COZY_URL = env.COZY_URL,
          COZY_CREDENTIALS = env.COZY_CREDENTIALS,
          NODE_ENV = env.NODE_ENV;

      if (!COZY_URL || !COZY_CREDENTIALS) {
        throw new Error('Env used to instantiate CozyClient must have COZY_URL and COZY_CREDENTIALS');
      }

      if (NODE_ENV === 'development') {
        options.oauth = JSON.parse(COZY_CREDENTIALS);
      } else {
        options.token = COZY_CREDENTIALS.trim();
      }

      options.uri = COZY_URL.trim();
      return new CozyClient(_objectSpread({}, options));
    }
    /**
     * When used from an app, CozyClient can be instantiated from the data injected by the stack in
     * the DOM.
     *
     * @param  {object}   options  - CozyClient constructor options
     * @param  {string}   selector - Options
     * @returns {CozyClient} - CozyClient instance
     */

  }, {
    key: "fromDOM",
    value: function fromDOM() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var selector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '[role=application]';
      var root = document.querySelector(selector);

      if (!(root instanceof HTMLElement)) {
        throw new Error("Cannot find an HTMLElement corresponding to ".concat(selector));
      }

      if (!root || !root.dataset) {
        throw new Error("Found no data in ".concat(selector, " to instantiate cozyClient"));
      }

      var data = root.dataset.cozy ? JSON.parse(root.dataset.cozy) : _objectSpread({}, root.dataset);
      var domain = data.domain,
          token = data.token;

      if (!domain || !token) {
        domain = domain || data.cozyDomain;
        token = token || data.cozyToken;
      }

      if (!domain || !token) {
        throw new Error("Found no data in ".concat(root.dataset, " to instantiate cozyClient"));
      }

      return new CozyClient(_objectSpread({
        uri: "".concat(window.location.protocol, "//").concat(domain),
        token: token,
        capabilities: data.capabilities
      }, options));
    }
  }, {
    key: "registerHook",
    value: function registerHook(doctype, name, fn) {
      var hooks = CozyClient.hooks[doctype] = CozyClient.hooks[doctype] || {};
      hooks[name] = hooks[name] || [];
      hooks[name].push(fn);
    }
  }]);
  return CozyClient;
}();

CozyClient.hooks = CozyClient.hooks || {};
CozyClient.fetchPolicies = _policies.default; //COZY_CLIENT_VERSION_PACKAGE in replaced by babel. See babel config

CozyClient.version = "27.19.2";

_microee.default.mixin(CozyClient);

var _default = CozyClient;
exports.default = _default;