"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.OAUTH_CLIENTS_DOCTYPE = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _DocumentCollection2 = _interopRequireDefault(require("./DocumentCollection"));

var _normalize = require("./normalize");

var _utils = require("./utils");

var querystring = _interopRequireWildcard(require("./querystring"));

var _Collection = require("./Collection");

var _errors = require("./errors");

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["/settings/clients/", ""]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["/settings/clients/", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["/settings/clients"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var OAUTH_CLIENTS_DOCTYPE = 'io.cozy.oauth.clients';
exports.OAUTH_CLIENTS_DOCTYPE = OAUTH_CLIENTS_DOCTYPE;
var normalizeOAuthClient = (0, _normalize.normalizeDoctypeJsonApi)(OAUTH_CLIENTS_DOCTYPE);
/**
 * Implements `DocumentCollection` API to interact with the /settings/clients endpoint of the stack
 */

var OAuthClientsCollection = /*#__PURE__*/function (_DocumentCollection) {
  (0, _inherits2.default)(OAuthClientsCollection, _DocumentCollection);

  var _super = _createSuper(OAuthClientsCollection);

  function OAuthClientsCollection(stackClient) {
    (0, _classCallCheck2.default)(this, OAuthClientsCollection);
    return _super.call(this, OAUTH_CLIENTS_DOCTYPE, stackClient);
  }
  /**
   * Fetches all OAuth clients
   *
   * @param  {object}         options             Query options
   * @param  {number}         [options.limit]     For pagination, the number of results to return.
   * @param  {string}         [options.bookmark]  For bookmark-based pagination, the document _id to start from
   * @param  {Array<string>}  [options.keys]      Ids of specific clients to return (within the current page),
   *
   * @returns {object} The JSON API conformant response.
   */


  (0, _createClass2.default)(OAuthClientsCollection, [{
    key: "all",
    value: function () {
      var _all = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var options,
            _options$limit,
            limit,
            bookmark,
            keys,
            params,
            url,
            path,
            resp,
            nextLink,
            nextLinkURL,
            nextBookmark,
            hasBookmark,
            data,
            meta,
            _args = arguments;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _options$limit = options.limit, limit = _options$limit === void 0 ? 100 : _options$limit, bookmark = options.bookmark, keys = options.keys;
                params = {
                  'page[limit]': limit,
                  'page[cursor]': bookmark
                };
                url = (0, _utils.uri)(_templateObject());
                path = querystring.buildURL(url, params);
                _context.prev = 5;
                _context.next = 8;
                return this.stackClient.fetchJSON('GET', path);

              case 8:
                resp = _context.sent;
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](5);
                return _context.abrupt("return", (0, _Collection.dontThrowNotFoundError)(_context.t0));

              case 14:
                nextLink = (0, _get2.default)(resp, 'links.next', '');
                nextLinkURL = new URL("".concat(this.stackClient.uri).concat(nextLink));
                nextBookmark = nextLinkURL.searchParams.get('page[cursor]') || undefined;
                hasBookmark = nextBookmark !== undefined;

                if (!keys) {
                  _context.next = 24;
                  break;
                }

                data = resp.data.filter(function (c) {
                  return keys.includes(c.id);
                }).map(function (c) {
                  return normalizeOAuthClient(c);
                });
                meta = _objectSpread(_objectSpread({}, resp.meta), {}, {
                  count: data.length
                });
                return _context.abrupt("return", {
                  data: data,
                  meta: meta,
                  next: keys.length > data.length && hasBookmark,
                  bookmark: nextBookmark
                });

              case 24:
                return _context.abrupt("return", {
                  data: resp.data.map(function (c) {
                    return normalizeOAuthClient(c);
                  }),
                  meta: resp.meta,
                  next: hasBookmark,
                  bookmark: nextBookmark
                });

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 11]]);
      }));

      function all() {
        return _all.apply(this, arguments);
      }

      return all;
    }()
    /**
     * Get an OAuth client by id
     *
     * @param  {string} id The client id.
     * @returns {object}  JsonAPI response containing normalized client as data attribute
     */

  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(id) {
        var resp;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.all({
                  keys: [id]
                });

              case 2:
                resp = _context2.sent;

              case 3:
                if (!resp.next) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 6;
                return this.all({
                  keys: [id],
                  bookmark: resp.bookmark
                });

              case 6:
                resp = _context2.sent;
                _context2.next = 3;
                break;

              case 9:
                if (!resp.data.length) {
                  _context2.next = 13;
                  break;
                }

                return _context2.abrupt("return", {
                  data: normalizeOAuthClient(resp.data[0])
                });

              case 13:
                resp.url = (0, _utils.uri)(_templateObject2(), id);
                resp.status = '404';
                throw new _errors.FetchError(resp, 'Not Found');

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
    /**
     * Destroys the OAuth client on the server
     *
     * @param {object} oauthClient The io.cozy.oauth.clients document to destroy
     *
     * @returns {{ data }} The deleted client
     */

  }, {
    key: "destroy",
    value: function () {
      var _destroy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(oauthClient) {
        var _id;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _id = oauthClient._id;
                _context3.next = 3;
                return this.stackClient.fetchJSON('DELETE', (0, _utils.uri)(_templateObject3(), _id));

              case 3:
                return _context3.abrupt("return", {
                  data: _objectSpread(_objectSpread({}, normalizeOAuthClient(oauthClient)), {}, {
                    _deleted: true
                  })
                });

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function destroy(_x2) {
        return _destroy.apply(this, arguments);
      }

      return destroy;
    }()
  }]);
  return OAuthClientsCollection;
}(_DocumentCollection2.default);

OAuthClientsCollection.normalizeDoctype = _normalize.normalizeDoctypeJsonApi;
var _default = OAuthClientsCollection;
exports.default = _default;