"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIconURL = exports.default = exports._getIconURL = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _types = require("./types");

var _memoize = _interopRequireWildcard(require("./memoize"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Get Icon source Url
 *
 * @param  {object}  app - Apps data - io.cozy.apps
 * @param  {string}  slug - Slug - string
 * @param  {string|undefined} domain - Host to use in the origin (e.g. cozy.tools)
 * @param  {string} protocol - Url protocol (e.g. http / https)
 * @returns {string}  Source Url of icon
 * @private
 * @throws {Error} When cannot fetch or get icon source
 */
var loadIcon = function loadIcon(app, slug, domain, protocol) {
  if (!domain) throw new Error('Cannot fetch icon: missing domain');

  var source = _getAppIconURL(app, slug, domain, protocol);

  if (!source) {
    throw new Error("Cannot get icon source for app ".concat(app.name));
  }

  return source;
};
/**
 * Get App Icon URL
 *
 * @param  {object}  app - Apps data - io.cozy.apps or Slug - string
 * @param  {string}  slug - Slug - string
 * @param  {string|undefined} domain - Host to use in the origin (e.g. cozy.tools)
 * @param  {string} protocol - Url protocol (e.g. http / https)
 * @private
 * @returns {string|null}  App Icon URL
 */


var _getAppIconURL = function _getAppIconURL(app, slug, domain, protocol) {
  var path = app && app.links && app.links.icon || _getRegistryIconPath(app, slug);

  return path ? "".concat(protocol, "//").concat(domain).concat(path) : null;
};
/**
 * Get Registry Icon Path
 *
 * @param  {object}  app - Apps data - io.cozy.apps or Slug - string
 * @param  {string}  slug - Slug - string
 * @returns {string|undefined}  Registry icon path
 * @private
 */


var _getRegistryIconPath = function _getRegistryIconPath(app, slug) {
  if (slug) {
    return "/registry/".concat(slug, "/icon");
  }

  return app && app.latest_version && app.latest_version.version && "/registry/".concat(app.slug, "/").concat(app.latest_version.version, "/icon");
};

var mimeTypes = {
  gif: 'image/gif',
  ico: 'image/vnd.microsoft.icon',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml'
};
/**
 * Get icon extension
 *
 * @param {object} app io.cozy.apps or io.cozy.konnectors document
 * @param  {string} app.icon - App Icon
 * @param  {string} app.name - App Name
 * @returns {string}  icon extension
 * @private
 * @throws {Error} When problem while detecting icon mime type
 */

var getIconExtensionFromApp = function getIconExtensionFromApp(app) {
  if (!app.icon) {
    throw new Error("".concat(app.name, ": Cannot detect icon mime type since app has no icon"));
  }

  var extension = app.icon.split('.').pop();

  if (!extension) {
    throw new Error("".concat(app.name, ": Unable to detect icon mime type from extension (").concat(app.icon, ")"));
  }

  return extension;
};

var fallbacks = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(tries, check) {
    var err, _iterator, _step, _try, res;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iterator = _createForOfIteratorHelper(tries);
            _context.prev = 1;

            _iterator.s();

          case 3:
            if ((_step = _iterator.n()).done) {
              _context.next = 18;
              break;
            }

            _try = _step.value;
            _context.prev = 5;
            _context.next = 8;
            return _try();

          case 8:
            res = _context.sent;
            check && check(res);
            return _context.abrupt("return", res);

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](5);
            err = _context.t0;

          case 16:
            _context.next = 3;
            break;

          case 18:
            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t1 = _context["catch"](1);

            _iterator.e(_context.t1);

          case 23:
            _context.prev = 23;

            _iterator.f();

            return _context.finish(23);

          case 26:
            throw err;

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 20, 23, 26], [5, 13]]);
  }));

  return function fallbacks(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Fetch application/konnector that is installed
 *
 * @private
 */


var fetchAppOrKonnector = function fetchAppOrKonnector(stackClient, type, slug) {
  return stackClient.fetchJSON('GET', "/".concat(type, "s/").concat(slug)).then(function (x) {
    return x.data.attributes;
  });
};
/**
 * Fetch application/konnector from the registry
 *
 * @private
 */


var fetchAppOrKonnectorViaRegistry = function fetchAppOrKonnectorViaRegistry(stackClient, type, slug) {
  return stackClient.fetchJSON('GET', "/registry/".concat(slug)).then(function (x) {
    return x.latest_version.manifest;
  });
};
/**
 * Get Icon URL using blob mechanism if OAuth connected
 * or using preloaded url when blob not needed
 *
 * @param  {CozyStackClient}  stackClient - CozyStackClient
 * @param  {object} opts - Options
 * @param  {string} opts.type - Options type
 * @param  {string|undefined} opts.slug - Options slug
 * @param  {object|string|undefined}  opts.appData - Apps data - io.cozy.apps
 * @param  {string} [opts.priority='stack'] - Options priority
 * @returns {Promise<string>} DOMString containing URL source or a URL representing the Blob .
 * @private
 * @throws {Error} while fetching icon, or unknown image extension
 */


var _getIconURL = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(stackClient, opts) {
    var type, slug, appData, _opts$priority, priority, iconDataFetchers, resp, icon, app, appDataFetchers, ext, _URL, domain, protocol;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            type = opts.type, slug = opts.slug, appData = opts.appData, _opts$priority = opts.priority, priority = _opts$priority === void 0 ? 'stack' : _opts$priority;

            if (!stackClient.oauthOptions) {
              _context2.next = 29;
              break;
            }

            iconDataFetchers = [function () {
              return stackClient.fetch('GET', "/".concat(type, "s/").concat(slug, "/icon"));
            }, function () {
              return stackClient.fetch('GET', "/registry/".concat(slug, "/icon"));
            }];

            if (priority === 'registry') {
              iconDataFetchers.reverse();
            }

            _context2.next = 6;
            return fallbacks(iconDataFetchers, function (resp) {
              if (!resp.ok) {
                throw new Error("Error while fetching icon ".concat(resp.statusText));
              }
            });

          case 6:
            resp = _context2.sent;
            _context2.next = 9;
            return resp.blob();

          case 9:
            icon = _context2.sent;

            if (icon.type) {
              _context2.next = 26;
              break;
            }

            // iOS10 does not set correctly mime type for images, so we assume
            // that an empty mime type could mean that the app is running on iOS10.
            // For regular images like jpeg, png or gif it still works well in the
            // Safari browser but not for SVG.
            // So let's set a mime type manually. We cannot always set it to
            // image/svg+xml and must guess the mime type based on the icon attribute
            // from app/manifest
            // See https://stackoverflow.com/questions/38318411/uiwebview-on-ios-10-beta-not-loading-any-svg-images
            appDataFetchers = [function () {
              return fetchAppOrKonnector(stackClient, type, slug);
            }, function () {
              return fetchAppOrKonnectorViaRegistry(stackClient, type, slug);
            }];

            if (priority === 'registry') {
              appDataFetchers.reverse();
            }

            _context2.t1 = appData;

            if (_context2.t1) {
              _context2.next = 18;
              break;
            }

            _context2.next = 17;
            return fallbacks(appDataFetchers);

          case 17:
            _context2.t1 = _context2.sent;

          case 18:
            _context2.t0 = _context2.t1;

            if (_context2.t0) {
              _context2.next = 21;
              break;
            }

            _context2.t0 = {};

          case 21:
            app = _context2.t0;
            ext = getIconExtensionFromApp(app);

            if (mimeTypes[ext]) {
              _context2.next = 25;
              break;
            }

            throw new Error("Unknown image extension \"".concat(ext, "\" for app ").concat(app.name));

          case 25:
            icon = new Blob([icon], {
              type: mimeTypes[ext]
            });

          case 26:
            return _context2.abrupt("return", URL.createObjectURL(icon));

          case 29:
            _context2.prev = 29;
            _URL = new URL(stackClient.uri), domain = _URL.host, protocol = _URL.protocol;
            return _context2.abrupt("return", loadIcon(appData, slug, domain, protocol));

          case 34:
            _context2.prev = 34;
            _context2.t2 = _context2["catch"](29);
            throw new Error("Cannot fetch icon: invalid stackClient.uri: ".concat(_context2.t2.message));

          case 37:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[29, 34]]);
  }));

  return function _getIconURL(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Get Icon URL using blob mechanism if OAuth connected
 * or using preloaded url when blob not needed
 *
 */


exports._getIconURL = _getIconURL;

var getIconURL = function getIconURL() {
  return _getIconURL.apply(this, arguments).catch(function () {
    return new _memoize.ErrorReturned();
  });
};

exports.getIconURL = getIconURL;

var _default = (0, _memoize.default)(getIconURL, {
  maxDuration: 300 * 1000,
  key: function key(stackClient, opts) {
    var type = opts.type,
        slug = opts.slug,
        priority = opts.priority;
    return stackClient.uri + +':' + type + ':' + slug + ':' + priority;
  }
});

exports.default = _default;