"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootCozyUrl = exports.InvalidCozyUrlError = exports.BlockedCozyError = exports.InvalidProtocolError = exports.InvalidRedirectLinkError = exports.deconstructRedirectLink = exports.deconstructCozyWebLinkWithSlug = exports.generateWebLink = exports.ensureFirstSlash = void 0;

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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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


exports.ensureFirstSlash = ensureFirstSlash;

var generateWebLink = function generateWebLink(_ref) {
  var cozyUrl = _ref.cozyUrl,
      searchParamsOption = _ref.searchParams,
      pathname = _ref.pathname,
      hash = _ref.hash,
      slug = _ref.slug,
      subDomainType = _ref.subDomainType;
  var searchParams = searchParamsOption || [];
  var url = new URL(cozyUrl);
  url.host = subDomainType === 'nested' ? "".concat(slug, ".").concat(url.host) : url.host.split('.').map(function (x, i) {
    return i === 0 ? x + '-' + slug : x;
  }).join('.');
  url.pathname = ensureFirstSlash(pathname);
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
/**
 * Deconstruct the given link in order to retrieve useful data like Cozy's name, domain, or slug
 *
 * The given link MUST contain a slug
 *
 * @param {string} webLink - link to deconstruct. It should be a link from a Cozy and containing a slug
 * @param {import("../types").SubdomainType} [subDomainType=flat] - whether the cozy is using flat or nested subdomains.
 * @returns {import("../types").CozyLinkData} Deconstructed link
 */


exports.generateWebLink = generateWebLink;

var deconstructCozyWebLinkWithSlug = function deconstructCozyWebLinkWithSlug(webLink) {
  var subDomainType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'flat';
  var url = new URL(webLink);
  var slug = subDomainType === 'nested' ? url.host.split('.')[0] : url.host.split('.')[0].split('-')[1];
  var cozyName = subDomainType === 'nested' ? url.host.split('.')[1] : url.host.split('.')[0].split('-')[0];
  var cozyBaseDomain = url.host.split('.').slice(subDomainType === 'nested' ? 2 : 1).join('.');
  return {
    cozyBaseDomain: cozyBaseDomain,
    cozyName: cozyName,
    pathname: url.pathname,
    hash: url.hash,
    protocol: url.protocol,
    searchParams: url.searchParams.toString(),
    slug: slug
  };
};

exports.deconstructCozyWebLinkWithSlug = deconstructCozyWebLinkWithSlug;

var isValidSlug = function isValidSlug(slug) {
  return slug.match(/^[a-z0-9]+$/);
};
/**
 * Deconstruct the given redirect link in order to retrieve slug, pathname and hash
 *
 * @param {string} redirectLink - redirect link to deconstruct (i.e. 'drive/public/#/folder/SOME_ID')
 * @returns {import("../types").RedirectLinkData} Deconstructed link
 * @throws {InvalidRedirectLinkError} Thrown when redirect link is invalid
 */


var deconstructRedirectLink = function deconstructRedirectLink(redirectLink) {
  var _redirectLink$split = redirectLink.split('#'),
      _redirectLink$split2 = (0, _slicedToArray2.default)(_redirectLink$split, 2),
      splits = _redirectLink$split2[0],
      hash = _redirectLink$split2[1];

  var _splits$split = splits.split(/\/(.*)/),
      _splits$split2 = (0, _slicedToArray2.default)(_splits$split, 2),
      slug = _splits$split2[0],
      pathname = _splits$split2[1];

  if (!isValidSlug(slug)) {
    throw new InvalidRedirectLinkError(redirectLink);
  }

  return {
    slug: slug,
    pathname: pathname,
    hash: hash
  };
};

exports.deconstructRedirectLink = deconstructRedirectLink;

var InvalidRedirectLinkError = /*#__PURE__*/function (_Error) {
  (0, _inherits2.default)(InvalidRedirectLinkError, _Error);

  var _super = _createSuper(InvalidRedirectLinkError);

  function InvalidRedirectLinkError(redirectLink) {
    var _this;

    (0, _classCallCheck2.default)(this, InvalidRedirectLinkError);
    _this = _super.call(this, "Invalid redirect link ".concat(redirectLink));
    _this.redirectLink = redirectLink;
    return _this;
  }

  return InvalidRedirectLinkError;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));

exports.InvalidRedirectLinkError = InvalidRedirectLinkError;

var InvalidProtocolError = /*#__PURE__*/function (_Error2) {
  (0, _inherits2.default)(InvalidProtocolError, _Error2);

  var _super2 = _createSuper(InvalidProtocolError);

  function InvalidProtocolError(url) {
    var _this2;

    (0, _classCallCheck2.default)(this, InvalidProtocolError);
    _this2 = _super2.call(this, "Invalid URL protocol ".concat(url.protocol));
    _this2.url = url;
    return _this2;
  }

  return InvalidProtocolError;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));

exports.InvalidProtocolError = InvalidProtocolError;

var BlockedCozyError = /*#__PURE__*/function (_Error3) {
  (0, _inherits2.default)(BlockedCozyError, _Error3);

  var _super3 = _createSuper(BlockedCozyError);

  function BlockedCozyError(url) {
    var _this3;

    (0, _classCallCheck2.default)(this, BlockedCozyError);
    _this3 = _super3.call(this, "Blocked cozy ".concat(url.toString()));
    _this3.url = url;
    return _this3;
  }

  return BlockedCozyError;
}( /*#__PURE__*/(0, _wrapNativeSuper2.default)(Error));

exports.BlockedCozyError = BlockedCozyError;

var InvalidCozyUrlError = /*#__PURE__*/function (_Error4) {
  (0, _inherits2.default)(InvalidCozyUrlError, _Error4);

  var _super4 = _createSuper(InvalidCozyUrlError);

  function InvalidCozyUrlError(url) {
    var _this4;

    (0, _classCallCheck2.default)(this, InvalidCozyUrlError);
    _this4 = _super4.call(this, "URL ".concat(url.toString(), " does not seem to be a valid Cozy URL"));
    _this4.url = url;
    return _this4;
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

var uri = function uri(_ref2) {
  var protocol = _ref2.protocol,
      hostname = _ref2.hostname,
      port = _ref2.port;
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
 *   origin is probably pointing to a cozy-app. In that case we should consider this
 *   URL to be invalid
 * - a 503 response status with a "Blocked" reason means the pointed page is a Cozy
 *   but it is blocked. In that case we consider that the url is a valid Cozy origin
 *   but we want the method to throw as we cannot verify if the URL points to the
 *   Cozy's root or to a specifc slug. The caller is responsible to handle that exception
 * - another status means there aren't any Cozy behind to the given origin
 *
 * @param {URL} url URL to validate
 *
 * @returns {Promise<boolean>} True if we believe there's a Cozy behind the given origin
 * @throws {InvalidCozyUrlError} Thrown when we know for sure there aren't any Cozy behind the given origin
 * @throws {BlockedCozyError} Thrown when we know for sure there is Cozy behind the given origin but it is in a "Blocked" state
 */


var isValidOrigin = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(url) {
    var response, status, responseUri, wasRedirected;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(wellKnownUrl(url));

          case 2:
            response = _context.sent;
            status = response.status, responseUri = response.url;

            if (!(status === 404)) {
              _context.next = 6;
              break;
            }

            throw new InvalidCozyUrlError(url);

          case 6:
            _context.next = 8;
            return isResponseAboutBlockedCozy(response);

          case 8:
            if (!_context.sent) {
              _context.next = 10;
              break;
            }

            throw new BlockedCozyError(url);

          case 10:
            wasRedirected = url.origin !== new URL(responseUri).origin;
            return _context.abrupt("return", status === 200 && !wasRedirected);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isValidOrigin(_x) {
    return _ref3.apply(this, arguments);
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
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(url) {
    var _url$hostname$split, _url$hostname$split2, subDomain, domain, _hostname, noSlugUrl, hostname, noSubUrl;

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

            return _context2.abrupt("return", new URL(uri({
              protocol: url.protocol,
              hostname: url.hostname,
              port: url.port
            })));

          case 6:
            if (!/^[^.-][^.]+-[^.-]+\./.test(url.hostname)) {
              _context2.next = 14;
              break;
            }

            _url$hostname$split = url.hostname.split('.'), _url$hostname$split2 = (0, _toArray2.default)(_url$hostname$split), subDomain = _url$hostname$split2[0], domain = _url$hostname$split2.slice(1);
            _hostname = [subDomain.replace(/-.+/, '')].concat((0, _toConsumableArray2.default)(domain)).join('.');
            noSlugUrl = new URL(uri({
              protocol: url.protocol,
              hostname: _hostname,
              port: url.port
            }));
            _context2.next = 12;
            return isValidOrigin(noSlugUrl);

          case 12:
            if (!_context2.sent) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", noSlugUrl);

          case 14:
            // Try to remove the first sub-domain in case its a nested app name
            // eslint-disable-next-line no-unused-vars
            hostname = url.hostname.split('.').splice(1).join('.');
            noSubUrl = new URL(uri({
              protocol: url.protocol,
              hostname: hostname,
              port: url.port
            }));
            _context2.next = 18;
            return isValidOrigin(noSubUrl);

          case 18:
            if (!_context2.sent) {
              _context2.next = 20;
              break;
            }

            return _context2.abrupt("return", noSubUrl);

          case 20:
            throw new InvalidCozyUrlError(url);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function rootCozyUrl(_x2) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Check if the given response is about a Cozy being blocked
 *
 * @param {Response} response - Fetch API response
 * @returns {Promise<boolean>} true if the response is about a Cozy being blocked, false otherwize
 */


exports.rootCozyUrl = rootCozyUrl;

var isResponseAboutBlockedCozy = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(response) {
    var _data$some;

    var contentType, isJson, data;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(response.status !== 503)) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", false);

          case 2:
            contentType = response.headers.get('content-type');
            isJson = contentType && contentType.indexOf('json') >= 0;
            _context3.next = 6;
            return isJson ? response.json() : response.text();

          case 6:
            data = _context3.sent;

            if (!(data !== null && data !== void 0 && (_data$some = data.some) !== null && _data$some !== void 0 && _data$some.call(data, function (reason) {
              return reason.title === 'Blocked';
            }))) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", true);

          case 9:
            return _context3.abrupt("return", false);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function isResponseAboutBlockedCozy(_x3) {
    return _ref5.apply(this, arguments);
  };
}();