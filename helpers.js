"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootCozyUrl = exports.InvalidCozyUrlError = exports.InvalidProtocolError = exports.generateWebLink = exports.dehydrate = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _associations = require("./associations");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var dehydrate = function dehydrate(document) {
  var dehydrated = Object.entries(document).reduce(function (documentArg, _ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    var document = documentArg;

    if (!(value instanceof _associations.Association)) {
      document[key] = value; // @ts-ignore
    } else if (value.dehydrate) {
      // @ts-ignore
      document = value.dehydrate(document);
    } else {
      throw new Error("Association on key ".concat(key, " should have a dehydrate method"));
    }

    return document;
  }, {});
  return dehydrated;
};

exports.dehydrate = dehydrate;

var ensureFirstSlash = function ensureFirstSlash(path) {
  if (!path) {
    return '/';
  } else {
    return path.startsWith('/') ? path : '/' + path;
  }
};
/**
 * generateWebLink - Construct a link to a web app
 *
 * This function does not get its cozy url from a CozyClient instance so it can
 * be used to build urls that point to other Cozies than the user's own Cozy.
 * This is useful when pointing to the Cozy of the owner of a shared note for
 * example.
 *
 * @param {object} options               Object of options
 * @param {string}   options.cozyUrl       Base URL of the cozy, eg. cozy.tools or test.mycozy.cloud
 * @param {Array}    [options.searchParams]  Array of search parameters as [key, value] arrays, eg. ['username', 'bob']
 * @param {string}   [options.pathname]      Path to a specific part of the app, eg. /public
 * @param {string}   [options.hash]          Path inside the app, eg. /files/test.jpg
 * @param {string}   [options.slug]          Slug of the app
 * @param {string}   [options.subDomainType] Whether the cozy is using flat or nested subdomains. Defaults to flat.
 *
 * @returns {string} Generated URL
 */


var generateWebLink = function generateWebLink(_ref3) {
  var cozyUrl = _ref3.cozyUrl,
      searchParamsOption = _ref3.searchParams,
      pathname = _ref3.pathname,
      hash = _ref3.hash,
      slug = _ref3.slug,
      subDomainType = _ref3.subDomainType;
  var searchParams = searchParamsOption || [];
  var url = new URL(cozyUrl);
  url.host = subDomainType === 'nested' ? "".concat(slug, ".").concat(url.host) : url.host.split('.').map(function (x, i) {
    return i === 0 ? x + '-' + slug : x;
  }).join('.');
  url.pathname = pathname;
  url.hash = ensureFirstSlash(hash);

  var _iterator = _createForOfIteratorHelper(searchParams),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = (0, _slicedToArray2.default)(_step.value, 2),
          param = _step$value[0],
          value = _step$value[1];

      url.searchParams.set(param, value);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return url.toString();
};

exports.generateWebLink = generateWebLink;

var InvalidProtocolError = /*#__PURE__*/function (_Error) {
  (0, _inherits2.default)(InvalidProtocolError, _Error);

  var _super = _createSuper(InvalidProtocolError);

  function InvalidProtocolError(url) {
    var _this;

    (0, _classCallCheck2.default)(this, InvalidProtocolError);
    _this = _super.call(this, "Invalid URL protocol ".concat(url.protocol));
    _this.url = url;
    return _this;
  }

  return InvalidProtocolError;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));

exports.InvalidProtocolError = InvalidProtocolError;

var InvalidCozyUrlError = /*#__PURE__*/function (_Error2) {
  (0, _inherits2.default)(InvalidCozyUrlError, _Error2);

  var _super2 = _createSuper(InvalidCozyUrlError);

  function InvalidCozyUrlError(url) {
    var _this2;

    (0, _classCallCheck2.default)(this, InvalidCozyUrlError);
    _this2 = _super2.call(this, "URL ".concat(url.toString(), " does not seem to be a valid Cozy URL"));
    _this2.url = url;
    return _this2;
  }

  return InvalidCozyUrlError;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));
/* uri - Returns a well formed URL origin from a protocol, a hostname and a port
 *
 * If the protocol and/or port are omitted from the argument, the function will
 * default to HTTPS and omit the port in the returned origin.
 *
 * @param {object} url          Object of URL elements
 * @param {string} url.protocol Protocol to use in the origin (e.g. http)
 * @param {string} url.hostname Hostname to use in the origin (e.g. claude.mycozy.cloud)
 * @param {string} url.port     Port to use in the origin (e.g. 8080)
 *
 * @returns {string} Generated URL origin
 */


exports.InvalidCozyUrlError = InvalidCozyUrlError;

var uri = function uri(_ref4) {
  var protocol = _ref4.protocol,
      hostname = _ref4.hostname,
      port = _ref4.port;
  return (protocol !== '' ? "".concat(protocol, "//") : 'https://') + hostname + (port !== '' ? ":".concat(port) : '');
};
/* wellKnownUrl - Returns a valid URL string to a Well Known password change page
 *
 * The built URL will point to the origin generated from the given protocol,
 * hostname and port.
 *
 * @param {object} url          Object of URL elements
 * @param {string} url.protocol Protocol to use in the origin (e.g. http)
 * @param {string} url.hostname Hostname to use in the origin (e.g. claude.mycozy.cloud)
 * @param {string} url.port     Port to use in the origin (e.g. 8080)
 *
 * @returns {string} Generated Well Known password change URL string
 */


var wellKnownUrl = function wellKnownUrl(url) {
  return uri(url) + '/.well-known/change-password';
};
/* isValidOrigin - Checks whether a given URL is a valid Cozy origin
 *
 * This method tries to fetch the Well Known change password page of the Cozy
 * supposedly at the given origin. This allows us to determine whether the given
 * origin is the root URL of a Cozy or not via the status of the response:
 * - a 200 response status means there's an actual Well Known password change
 *   page accessible from the given origin so we suppose it's a valid Cozy
 *   origin (i.e. it could be another site altogether though)
 * - a 401 response status means the pointed page requires authentication so the
 *   origin is probably pointing to a Cozy app
 * - another status means there aren't any Cozy behind to the given origin
 *
 * @param {object} url          Object of URL elements
 * @param {string} url.protocol Protocol to use in the origin (e.g. http)
 * @param {string} url.hostname Hostname to use in the origin (e.g. claude.mycozy.cloud)
 * @param {string} url.port     Port to use in the origin (e.g. 8080)
 *
 * @returns {Promise<boolean>} True if we believe there's a Cozy behind the given origin
 * @throws {InvalidCozyUrlError} Thrown when we know for sure there aren't any Cozy behind the given origin
 */


var isValidOrigin = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(url) {
    var _yield$fetch, status;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(wellKnownUrl(url));

          case 2:
            _yield$fetch = _context.sent;
            status = _yield$fetch.status;

            if (!(status === 404)) {
              _context.next = 6;
              break;
            }

            throw new InvalidCozyUrlError(url);

          case 6:
            return _context.abrupt("return", status === 200);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isValidOrigin(_x) {
    return _ref5.apply(this, arguments);
  };
}();
/**
 * rootCozyUrl - Get the root URL of a Cozy from more precise ones
 *
 * The goal is to allow users to use any URL copied from their browser as their
 * Cozy URL rather than trying to explain to them what we expect (e.g. when
 * requesting the Cozy URL to connect an app).
 * If we can't get the root URL either because there's no Cozy or the domain
 * does not exist or anything else, we'll throw an InvalidCozyUrlError.
 * Also, since we communicate only via HTTP or HTTPS, we'll throw an
 * InvalidProtocolError if any other protocol is used.
 *
 * This function expects a fully qualified URL thus with a protocol and a valid
 * hostname. If your application accepts Cozy intances as input (e.g. `claude`
 * when the Cozy can be found at `https://claude.mycozy.cloud`), it is your
 * responsibility to add the appropriate domain to the hostname before calling
 * this function.
 *
 * Examples:
 *
 * 1. getting the root URL when your user gives you its instance name
 *
 *   const userInput = 'claude'
 *   const rootUrl = await rootCozyUrl(new URL(`https://${userInput}.mycozy.cloud`))
 *   // → returns new URL('https://claude.mycozy.cloud')
 *
 * 2. getting the root URL when your user gives you a Cozy Drive URL
 *
 *   const userInput = 'https://claude-drive.mycozy.cloud/#/folder/io.cozy.files.root-dir'
 *   const rootUrl = await rootCozyUrl(new URL(userInput))
 *   // → returns new URL('https://claude.mycozy.cloud')
 *
 * 3. getting the root URL when the Cozy uses nested sub-domains
 *
 *   const userInput = 'http://photos.camille.nimbus.com:8080/#/album/1234567890'
 *   const rootCozyUrl = await rootCozyUrl(new URL(userInput))
 *   // → returns new URL('http://camille.nimbus.com:8080')
 *
 * @param {URL} url The URL from which we'll try to get the root Cozy URL
 *
 * @returns {Promise<URL>} The root Cozy URL
 */


var rootCozyUrl = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(url) {
    var _url$hostname$split, _url$hostname$split2, subDomain, domain, _hostname, hostname;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (['http:', 'https:'].includes(url.protocol)) {
              _context2.next = 2;
              break;
            }

            throw new InvalidProtocolError(url);

          case 2:
            _context2.next = 4;
            return isValidOrigin(url);

          case 4:
            if (!_context2.sent) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", url);

          case 6:
            if (!/^[^.-][^.]+-[^.-]+\./.test(url.hostname)) {
              _context2.next = 13;
              break;
            }

            _url$hostname$split = url.hostname.split('.'), _url$hostname$split2 = (0, _toArray2.default)(_url$hostname$split), subDomain = _url$hostname$split2[0], domain = _url$hostname$split2.slice(1);
            _hostname = [subDomain.replace(/-.+/, '')].concat((0, _toConsumableArray2.default)(domain)).join('.');
            _context2.next = 11;
            return isValidOrigin({
              protocol: url.protocol,
              hostname: _hostname,
              port: url.port
            });

          case 11:
            if (!_context2.sent) {
              _context2.next = 13;
              break;
            }

            return _context2.abrupt("return", new URL(uri({
              protocol: url.protocol,
              hostname: _hostname,
              port: url.port
            })));

          case 13:
            // Try to remove the first sub-domain in case its a nested app name
            // eslint-disable-next-line no-unused-vars
            hostname = url.hostname.split('.').splice(1).join('.');
            _context2.next = 16;
            return isValidOrigin({
              protocol: url.protocol,
              hostname: hostname,
              port: url.port
            });

          case 16:
            if (!_context2.sent) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("return", new URL(uri({
              protocol: url.protocol,
              hostname: hostname,
              port: url.port
            })));

          case 18:
            throw new InvalidCozyUrlError(url);

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function rootCozyUrl(_x2) {
    return _ref6.apply(this, arguments);
  };
}();

exports.rootCozyUrl = rootCozyUrl;