"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.registryEndpoint = exports.transformRegistryFormatToStackFormat = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _get = _interopRequireDefault(require("lodash/get"));

require("url-search-params-polyfill");

var _terms = _interopRequireDefault(require("./terms"));

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var transformRegistryFormatToStackFormat = function transformRegistryFormatToStackFormat(doc) {
  return _objectSpread({
    id: (0, _get.default)(doc, 'latest_version.manifest.source'),
    attributes: (0, _get.default)(doc, 'latest_version.manifest')
  }, doc);
};

exports.transformRegistryFormatToStackFormat = transformRegistryFormatToStackFormat;
var registryEndpoint = '/registry/';
exports.registryEndpoint = registryEndpoint;

var queryPartFromOptions = function queryPartFromOptions(options) {
  var query = new URLSearchParams(options).toString();
  return query ? "?".concat(query) : '';
};

var getBaseRoute = function getBaseRoute(app) {
  var type = app.type; // TODO node is an historic type, it should be `konnector`, check with the back

  var route = type === _constants.APP_TYPE.KONNECTOR || type === 'node' ? 'konnectors' : 'apps';
  return "/".concat(route);
};
/**
 * @typedef {object} RegistryApp
 * @property {string} slug
 * @property {object} terms
 * @property {boolean} installed
 * @property {string} type
 */

/**
 * @typedef {"dev"|"beta"|"stable"} RegistryAppChannel
 */


var Registry = /*#__PURE__*/function () {
  function Registry(options) {
    (0, _classCallCheck2.default)(this, Registry);

    if (!options.client) {
      throw new Error('Need to pass a client to instantiate a Registry API.');
    }

    this.client = options.client;
  }
  /**
   * Installs or updates an app from a source.
   *
   * Accepts the terms if the app has them.
   *
   * @param  {RegistryApp} app - App to be installed
   * @param  {string} source - String (ex: registry://drive/stable)
   * @returns {Promise}
   */


  (0, _createClass2.default)(Registry, [{
    key: "installApp",
    value: function () {
      var _installApp = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(app, source) {
        var slug, terms, searchParams, isUpdate, querypart, verb, baseRoute;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                slug = app.slug, terms = app.terms;
                searchParams = {};
                isUpdate = app.installed;
                if (isUpdate) searchParams.PermissionsAcked = isUpdate;
                if (source) searchParams.Source = source;
                querypart = queryPartFromOptions(searchParams);

                if (!terms) {
                  _context.next = 9;
                  break;
                }

                _context.next = 9;
                return _terms.default.save(this.client, terms);

              case 9:
                verb = app.installed ? 'PUT' : 'POST';
                baseRoute = getBaseRoute(app);
                return _context.abrupt("return", this.client.stackClient.fetchJSON(verb, "".concat(baseRoute, "/").concat(slug).concat(querypart)));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function installApp(_x, _x2) {
        return _installApp.apply(this, arguments);
      }

      return installApp;
    }()
    /**
     * Uninstalls an app.
     *
     * @param  {RegistryApp} app - App to be installed
     * @returns {Promise}
     */

  }, {
    key: "uninstallApp",
    value: function () {
      var _uninstallApp = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(app) {
        var slug, baseRoute;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                slug = app.slug;
                baseRoute = getBaseRoute(app);
                return _context2.abrupt("return", this.client.stackClient.fetchJSON('DELETE', "".concat(baseRoute, "/").concat(slug)));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function uninstallApp(_x3) {
        return _uninstallApp.apply(this, arguments);
      }

      return uninstallApp;
    }()
    /**
     * Fetch at most 200 apps from the channel
     *
     * @param  {object} params - Fetching parameters
     * @param  {string} params.type - "webapp" or "konnector"
     * @param  {RegistryAppChannel} params.channel - The channel of the apps to fetch
     * @param  {string} params.limit - maximum number of fetched apps - defaults to 200
     *
     * @returns {Promise<Array<RegistryApp>>}
     */

  }, {
    key: "fetchApps",
    value: function () {
      var _fetchApps = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(params) {
        var channel, type, _params$limit, limit, searchParams, querypart, _yield$this$client$st, apps;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                channel = params.channel, type = params.type, _params$limit = params.limit, limit = _params$limit === void 0 ? '200' : _params$limit;
                searchParams = {
                  limit: limit,
                  versionsChannel: channel,
                  latestChannelVersion: channel
                };
                querypart = new URLSearchParams(searchParams).toString();

                if (type) {
                  // Unfortunately, URLSearchParams encodes brackets so we have to do
                  // the querypart handling manually
                  querypart = querypart + "&filter[type]=".concat(type);
                }

                _context3.next = 6;
                return this.client.stackClient.fetchJSON('GET', "/registry?".concat(querypart));

              case 6:
                _yield$this$client$st = _context3.sent;
                apps = _yield$this$client$st.data;
                return _context3.abrupt("return", apps);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function fetchApps(_x4) {
        return _fetchApps.apply(this, arguments);
      }

      return fetchApps;
    }()
    /**
     * Fetch the list of apps that are in maintenance mode
     *
     * @returns {Promise<Array<RegistryApp>>}
     */

  }, {
    key: "fetchAppsInMaintenance",
    value: function fetchAppsInMaintenance() {
      return this.client.stackClient.fetchJSON('GET', '/registry/maintenance');
    }
    /**
     * Fetch the status of a single app on the registry
     *
     * @param  {string} slug - The slug of the app to fetch
     *
     * @returns {Promise<RegistryApp>}
     */

  }, {
    key: "fetchApp",
    value: function fetchApp(slug) {
      return this.client.stackClient.fetchJSON('GET', "/registry/".concat(slug));
    }
    /**
     * Fetch the latest version of an app for the given channel and slug
     *
     * @param  {object} params - Fetching parameters
     * @param  {string} params.slug - The slug of the app to fetch
     * @param  {RegistryAppChannel} params.channel - The channel of the app to fetch
     * @param  {string} params.version - The version of the app to fetch. Can also be "latest"
     *
     * @returns {Promise<RegistryApp>}
     */

  }, {
    key: "fetchAppVersion",
    value: function fetchAppVersion(params) {
      if (!params.slug) {
        throw new Error('Need to pass a slug to use fetchAppVersion');
      }

      var slug = params.slug,
          channel = params.channel,
          version = params.version;
      var finalChannel = !channel && (!version || version === 'latest') ? 'stable' : channel;
      var url = "/registry/".concat(slug, "/");

      if (finalChannel) {
        url += "".concat(finalChannel, "/").concat(version || 'latest');
      } else {
        url += "".concat(version);
      }

      return this.client.stackClient.fetchJSON('GET', url);
    }
  }]);
  return Registry;
}();

var _default = Registry;
exports.default = _default;