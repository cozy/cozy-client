"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getPermissionsFor = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _DocumentCollection2 = _interopRequireDefault(require("./DocumentCollection"));

var _normalize = require("./normalize");

var _FileCollection = require("./FileCollection");

var _utils = require("./utils");

var _logger = _interopRequireDefault(require("./logger"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["/permissions/doctype/", "/shared-by-link"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["/permissions/", ""]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["/permissions/", ""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var normalizePermission = function normalizePermission(perm) {
  return (0, _normalize.normalizeDoc)(perm, 'io.cozy.permissions');
};
/**
 * Implements `DocumentCollection` API along with specific methods for `io.cozy.permissions`.
 */


var PermissionCollection = /*#__PURE__*/function (_DocumentCollection) {
  (0, _inherits2.default)(PermissionCollection, _DocumentCollection);

  var _super = _createSuper(PermissionCollection);

  function PermissionCollection() {
    (0, _classCallCheck2.default)(this, PermissionCollection);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(PermissionCollection, [{
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(id) {
        var resp;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.stackClient.fetchJSON('GET', (0, _utils.uri)(_templateObject(), id));

              case 2:
                resp = _context.sent;
                return _context.abrupt("return", {
                  data: normalizePermission(resp.data)
                });

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
    /**
     * Create a new set of permissions
     * It can also associates one or more codes to it, via the codes parameter
     *
     * @param {object} permission - permission to create
     * @param {string} permission.codes A comma separed list of values (defaulted to code)
     * @param {string} permission.ttl Make the codes expire after a delay (bigduration format)
     * @param {boolean} permission.tiny If set to true then the generated shortcode will be 6 digits
     * Cozy-Stack has a few conditions to be able to use this tiny shortcode ATM you have to specifiy
     * a ttl < 1h, but it can change.
     * see https://docs.cozy.io/en/cozy-stack/permissions/#post-permissions for exact informations
     *
     * bigduration format: https://github.com/justincampbell/bigduration/blob/master/README.md
     * @see https://docs.cozy.io/en/cozy-stack/permissions/#post-permissions
     *
     */

  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_ref) {
        var _id, _type, _ref$codes, codes, ttl, tiny, attributes, searchParams, resp;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _id = _ref._id, _type = _ref._type, _ref$codes = _ref.codes, codes = _ref$codes === void 0 ? 'code' : _ref$codes, ttl = _ref.ttl, tiny = _ref.tiny, attributes = (0, _objectWithoutProperties2.default)(_ref, ["_id", "_type", "codes", "ttl", "tiny"]);
                searchParams = new URLSearchParams();
                searchParams.append('codes', codes);
                if (ttl) searchParams.append('ttl', ttl);
                if (tiny) searchParams.append('tiny', true);
                _context2.next = 7;
                return this.stackClient.fetchJSON('POST', "/permissions?".concat(searchParams), {
                  data: {
                    type: 'io.cozy.permissions',
                    attributes: attributes
                  }
                });

              case 7:
                resp = _context2.sent;
                return _context2.abrupt("return", {
                  data: normalizePermission(resp.data)
                });

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function create(_x2) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
    /**
     * Adds a permission to the given document. Document type must be
     * `io.cozy.apps`, `io.cozy.konnectors` or `io.cozy.permissions`
     *
     * @param  {object}  document - Document which receives the permission
     * @param  {object}  permission - Describes the permission
     * @param {object} options - options
     * @param {string} [options.expiresAt] - Date at which the permission will expire. Set to "" to remove it.
     * @param {string} [options.password] - To generate a password-protected link. Set to "" to remove it.
     * @returns {Promise}
     *
     * @example
     * ```
     * const permissions = await client.collection('io.cozy.permissions').add(
     *   konnector,
     *   {
     *     folder: {
     *       type: 'io.cozy.files',
     *       verbs: ['GET', 'PUT'],
     *       values: [`io.cozy.files.bc57b60eb2954537b0dcdc6ebd8e9d23`]
     *     }
     *   },
     *   { expiresAt: '2100-01-01T00:00:00Z', password: 'password' }
     * )
     * ```
     */

  }, {
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(document, permission) {
        var options,
            endpoint,
            expiresAt,
            password,
            hasPassword,
            hasExpiresAt,
            resp,
            _args3 = arguments;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                options = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
                _context3.t0 = document._type;
                _context3.next = _context3.t0 === 'io.cozy.apps' ? 4 : _context3.t0 === 'io.cozy.konnectors' ? 6 : _context3.t0 === 'io.cozy.permissions' ? 8 : 10;
                break;

              case 4:
                endpoint = "/permissions/apps/".concat(document.slug);
                return _context3.abrupt("break", 11);

              case 6:
                endpoint = "/permissions/konnectors/".concat(document.slug);
                return _context3.abrupt("break", 11);

              case 8:
                endpoint = "/permissions/".concat(document._id);
                return _context3.abrupt("break", 11);

              case 10:
                throw new Error('Permissions can only be added on existing permissions, apps and konnectors.');

              case 11:
                expiresAt = options.expiresAt, password = options.password; // We need to pass password and expires_at even if they are empty strings because the API expects them.
                // If value is a empty string, the stack will remove the password or expires_at.

                hasPassword = password || password === '';
                hasExpiresAt = expiresAt || expiresAt === '';
                _context3.next = 16;
                return this.stackClient.fetchJSON('PATCH', endpoint, {
                  data: {
                    type: 'io.cozy.permissions',
                    attributes: _objectSpread(_objectSpread({
                      permissions: permission
                    }, hasPassword && {
                      password: password
                    }), hasExpiresAt && {
                      expires_at: expiresAt
                    })
                  }
                });

              case 16:
                resp = _context3.sent;
                return _context3.abrupt("return", {
                  data: normalizePermission(resp.data)
                });

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function add(_x3, _x4) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "destroy",
    value: function destroy(permission) {
      return this.stackClient.fetchJSON('DELETE', (0, _utils.uri)(_templateObject2(), permission.id));
    }
  }, {
    key: "findLinksByDoctype",
    value: function () {
      var _findLinksByDoctype = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(doctype) {
        var resp;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.stackClient.fetchJSON('GET', (0, _utils.uri)(_templateObject3(), doctype));

              case 2:
                resp = _context4.sent;
                return _context4.abrupt("return", _objectSpread(_objectSpread({}, resp), {}, {
                  data: resp.data.map(normalizePermission)
                }));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function findLinksByDoctype(_x5) {
        return _findLinksByDoctype.apply(this, arguments);
      }

      return findLinksByDoctype;
    }()
    /**
     *
     * @deprecated
     */

  }, {
    key: "findApps",
    value: function () {
      var _findApps = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5() {
        var resp;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _logger.default.warn("PermissionCollection.findApps will be removed in next version of cozy-client. \n\n      You can use AppCollection.all() instead \n\n      or even better client.query(Q('io.cozy.apps'), {as: 'io.cozy.apps'})");

                _context5.next = 3;
                return this.stackClient.fetchJSON('GET', '/apps/');

              case 3:
                resp = _context5.sent;
                return _context5.abrupt("return", _objectSpread(_objectSpread({}, resp), {}, {
                  data: resp.data.map(function (a) {
                    return _objectSpread({
                      _id: a.id
                    }, a);
                  })
                }));

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function findApps() {
        return _findApps.apply(this, arguments);
      }

      return findApps;
    }()
    /**
     * Create a share link
     *
     * @param {{_id, _type}} document - cozy document
     * @param {object} options - options
     * @param {string} [options.ttl] - Time to live (bigduration format, e.g. "4Y3M2D1h30m15s")
     * @param {string} [options.password] - To generate a password-protected link
     * @param {string[]} [options.verbs] - explicit permissions to use
     * @param {string} [options.codes] A comma separed list of values (defaulted to code)
     * @param {boolean} [options.tiny] If set to true then the generated shortcode will be 6 digits
     * Cozy-Stack has a few conditions to be able to use this tiny shortcode ATM you have to specifiy
     * a ttl < 1h, but it can change.
     * see https://docs.cozy.io/en/cozy-stack/permissions/#post-permissions for exact informations
     */

  }, {
    key: "createSharingLink",
    value: function () {
      var _createSharingLink = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(document) {
        var options,
            ttl,
            password,
            verbs,
            tiny,
            _options$codes,
            codes,
            searchParams,
            resp,
            _args6 = arguments;

        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
                ttl = options.ttl, password = options.password, verbs = options.verbs, tiny = options.tiny, _options$codes = options.codes, codes = _options$codes === void 0 ? 'code' : _options$codes;
                searchParams = new URLSearchParams();
                searchParams.append('codes', codes);
                if (ttl) searchParams.append('ttl', ttl);
                if (tiny) searchParams.append('tiny', true);
                _context6.next = 8;
                return this.stackClient.fetchJSON('POST', "/permissions?".concat(searchParams), {
                  data: {
                    type: 'io.cozy.permissions',
                    attributes: _objectSpread({
                      permissions: getPermissionsFor(document, true, verbs ? {
                        verbs: verbs
                      } : {})
                    }, password && {
                      password: password
                    })
                  }
                });

              case 8:
                resp = _context6.sent;
                return _context6.abrupt("return", {
                  data: normalizePermission(resp.data)
                });

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function createSharingLink(_x6) {
        return _createSharingLink.apply(this, arguments);
      }

      return createSharingLink;
    }()
    /**
     * Follow the next link to fetch the next permissions
     *
     * @param {object} permissions JSON-API based permissions document
     */

  }, {
    key: "fetchPermissionsByLink",
    value: function () {
      var _fetchPermissionsByLink = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(permissions) {
        var resp;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(permissions.links && permissions.links.next)) {
                  _context7.next = 5;
                  break;
                }

                _context7.next = 3;
                return this.stackClient.fetchJSON('GET', permissions.links.next);

              case 3:
                resp = _context7.sent;
                return _context7.abrupt("return", _objectSpread(_objectSpread({}, resp), {}, {
                  data: resp.data.map(normalizePermission)
                }));

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function fetchPermissionsByLink(_x7) {
        return _fetchPermissionsByLink.apply(this, arguments);
      }

      return fetchPermissionsByLink;
    }()
    /**
     *
     * @param {object} document Cozy doc
     * @returns {object} with all the permissions
     */

  }, {
    key: "fetchAllLinks",
    value: function () {
      var _fetchAllLinks = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(document) {
        var allLinks, resp, _allLinks$data;

        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.findLinksByDoctype(document._type);

              case 2:
                allLinks = _context8.sent;
                resp = allLinks;

              case 4:
                if (!(resp.links && resp.links.next)) {
                  _context8.next = 11;
                  break;
                }

                _context8.next = 7;
                return this.fetchPermissionsByLink(resp);

              case 7:
                resp = _context8.sent;

                (_allLinks$data = allLinks.data).push.apply(_allLinks$data, (0, _toConsumableArray2.default)(resp.data));

                _context8.next = 4;
                break;

              case 11:
                return _context8.abrupt("return", allLinks);

              case 12:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function fetchAllLinks(_x8) {
        return _fetchAllLinks.apply(this, arguments);
      }

      return fetchAllLinks;
    }()
    /**
     * Destroy a sharing link and the related permissions
     *
     * @param {object} document - document to revoke sharing link
     */

  }, {
    key: "revokeSharingLink",
    value: function () {
      var _revokeSharingLink = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(document) {
        var allLinks, links, _iterator, _step, perm;

        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.fetchAllLinks(document);

              case 2:
                allLinks = _context9.sent;
                links = allLinks.data.filter(function (perm) {
                  return isPermissionRelatedTo(perm, document);
                });
                _iterator = _createForOfIteratorHelper(links);
                _context9.prev = 5;

                _iterator.s();

              case 7:
                if ((_step = _iterator.n()).done) {
                  _context9.next = 13;
                  break;
                }

                perm = _step.value;
                _context9.next = 11;
                return this.destroy(perm);

              case 11:
                _context9.next = 7;
                break;

              case 13:
                _context9.next = 18;
                break;

              case 15:
                _context9.prev = 15;
                _context9.t0 = _context9["catch"](5);

                _iterator.e(_context9.t0);

              case 18:
                _context9.prev = 18;

                _iterator.f();

                return _context9.finish(18);

              case 21:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[5, 15, 18, 21]]);
      }));

      function revokeSharingLink(_x9) {
        return _revokeSharingLink.apply(this, arguments);
      }

      return revokeSharingLink;
    }()
    /**
     * async getOwnPermissions - deprecated: please use fetchOwnPermissions instead
     *
     * @typedef {object} Permission
     *
     * @returns {Permission} permission
     */

  }, {
    key: "getOwnPermissions",
    value: function () {
      var _getOwnPermissions = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10() {
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _logger.default.warn('getOwnPermissions is deprecated, please use fetchOwnPermissions instead');

                return _context10.abrupt("return", this.fetchOwnPermissions());

              case 2:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getOwnPermissions() {
        return _getOwnPermissions.apply(this, arguments);
      }

      return getOwnPermissions;
    }()
    /**
     * async fetchOwnPermissions - Fetches permissions
     *
     * @typedef {object} Permission
     *
     * @returns {Permission} permission
     */

  }, {
    key: "fetchOwnPermissions",
    value: function () {
      var _fetchOwnPermissions = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11() {
        var resp;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this.stackClient.fetchJSON('GET', '/permissions/self');

              case 2:
                resp = _context11.sent;
                return _context11.abrupt("return", {
                  data: normalizePermission(resp.data),
                  included: resp.included ? resp.included.map(normalizePermission) : []
                });

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function fetchOwnPermissions() {
        return _fetchOwnPermissions.apply(this, arguments);
      }

      return fetchOwnPermissions;
    }()
  }]);
  return PermissionCollection;
}(_DocumentCollection2.default);
/**
 * Build a permission set
 *
 * @param {{_id, _type}} document - cozy document
 * @param {boolean} publicLink - are the permissions for a public link ?
 * @param {object} options - options
 * @param {string[]} [options.verbs] - explicit permissions to use
 * @returns {object} permissions object that can be sent through /permissions/*
 */


var getPermissionsFor = function getPermissionsFor(document) {
  var publicLink = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var _id = document._id,
      _type = document._type;
  var verbs = options.verbs ? options.verbs : publicLink ? ['GET'] : ['ALL']; // TODO: this works for albums, but it needs to be generalized and integrated
  // with cozy-client ; some sort of doctype "schema" will be needed here

  return (0, _FileCollection.isFile)(document) ? {
    files: {
      type: 'io.cozy.files',
      verbs: verbs,
      values: [_id]
    }
  } : {
    collection: {
      type: _type,
      verbs: verbs,
      values: [_id]
    },
    files: {
      type: 'io.cozy.files',
      verbs: verbs,
      values: ["".concat(_type, "/").concat(_id)],
      selector: 'referenced_by'
    }
  };
};

exports.getPermissionsFor = getPermissionsFor;

var isPermissionRelatedTo = function isPermissionRelatedTo(perm, document) {
  var _id = document._id;
  return (0, _FileCollection.isFile)(document) ? perm.attributes.permissions.files.values.indexOf(_id) !== -1 : perm.attributes.permissions.collection.values.indexOf(_id) !== -1;
};

var _default = PermissionCollection;
exports.default = _default;