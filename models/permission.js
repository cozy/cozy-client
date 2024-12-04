"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isReadOnly = isReadOnly;
exports.fetchOwn = fetchOwn;
exports.isForType = isForType;
exports.isDocumentReadOnly = isDocumentReadOnly;
exports.isShortcutCreatedOnTheRecipientCozy = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _intersection = _interopRequireDefault(require("lodash/intersection"));

var _get = _interopRequireDefault(require("lodash/get"));

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

var _dsl = require("../queries/dsl");

var _file = require("./file");

var _const = require("../const");

var _logger = _interopRequireDefault(require("../logger"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @typedef {object} Document - Couchdb document like an io.cozy.files
 * @property {string} _id
 * @property {string} id
 * @property {string} _type
 * @property {string} type
 */

/**
 * @typedef {('ALL'|'GET'|'PATCH'|'POST'|'PUT'|'DELETE')} PermissionVerb
 */

/**
 * @typedef {object} PermissionItem
 * @property {PermissionVerb[]} verbs - ALL, GET, PUT, PATCH, DELETE, POST…
 * @property {string} selector - defaults to `id`
 * @property {string[]} values
 * @property {string} type - a couch db database like 'io.cozy.files'
 */

/**
 * Is this permission read only ?
 *
 * @private
 * @param {PermissionItem} perm - permission node in a io.cozy.permissions document
 * @param {object} options - Options
 * @param {PermissionVerb[]} [options.writability] - Writability
 * @returns {boolean} true if the note should be displayed read-only
 */
function isReadOnly(perm) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$writability = options.writability,
      writability = _options$writability === void 0 ? ['PATCH', 'POST', 'PUT', 'DELETE'] : _options$writability;
  return perm.verbs && // no verbs is equivalent to ['ALL']
  perm.verbs.length > 0 && // empty array is equivalent to ['ALL']
  (0, _intersection.default)(perm.verbs, ['ALL'].concat((0, _toConsumableArray2.default)(writability))).length === 0;
}
/**
 * Fetches the list of permissions blocks
 *
 * @param {CozyClient} client -
 * @returns {Promise<PermissionItem[]>} list of permissions
 */


function fetchOwn(_x) {
  return _fetchOwn.apply(this, arguments);
}
/**
 * Checks if the permission item is about a specific doctype
 *
 * @param {PermissionItem} permission -
 * @param {string} type - doctype
 */


function _fetchOwn() {
  _fetchOwn = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(client) {
    var collection, data, permissions;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            collection = client.collection('io.cozy.permissions');
            _context.next = 3;
            return collection.fetchOwnPermissions();

          case 3:
            data = _context.sent;
            permissions = (0, _get.default)(data, 'data.attributes.permissions');

            if (permissions) {
              _context.next = 7;
              break;
            }

            throw "Can't get self permissions";

          case 7:
            return _context.abrupt("return", Object.values(permissions));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchOwn.apply(this, arguments);
}

function isForType(permission, type) {
  return permission.type === type || permission.type + '.*' === type;
}
/**
 * Finds the permission block for the the file
 * in the permissions owned by the current cozy-client.
 *
 * Iterates through parent folders if needed
 * until we can find the permissions attached to the share
 *
 * @private
 * @param {object} options - Options
 * @param {Document} options.document - a couchdb document
 * @param {CozyClient} options.client - A cozy client
 * @param {PermissionItem[]} options.permissions -
 * @returns {Promise<PermissionItem|undefined>} the corresponding permission block
 */


function findPermissionFor(_x2) {
  return _findPermissionFor2.apply(this, arguments);
}

function _findPermissionFor2() {
  _findPermissionFor2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(options) {
    var document, client, permissions, id, type, doc, definedPermissions, perms, getFile, _getFile, _findPermissionFor, _findPermissionFor3;

    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _findPermissionFor3 = function _findPermissionFor5() {
              _findPermissionFor3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_ref) {
                var doc, client, perms, perm, parentId, parentFolder;
                return _regenerator.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        doc = _ref.doc, client = _ref.client, perms = _ref.perms;
                        perm = perms.find(function (perm) {
                          if (perm.values) {
                            var selector = perm.selector || 'id';
                            var value = doc[selector];
                            return perm.values.includes(value);
                          } else {
                            return true;
                          }
                        });

                        if (!perm) {
                          _context3.next = 6;
                          break;
                        }

                        return _context3.abrupt("return", perm);

                      case 6:
                        if (!(type === _const.DOCTYPE_FILES)) {
                          _context3.next = 16;
                          break;
                        }

                        // for files, we recursively try to check for parent folders
                        parentId = (0, _file.getParentFolderId)(doc);
                        _context3.t0 = parentId;

                        if (!_context3.t0) {
                          _context3.next = 13;
                          break;
                        }

                        _context3.next = 12;
                        return getFile(parentId);

                      case 12:
                        _context3.t0 = _context3.sent;

                      case 13:
                        parentFolder = _context3.t0;

                        if (!parentFolder) {
                          _context3.next = 16;
                          break;
                        }

                        return _context3.abrupt("return", _findPermissionFor({
                          doc: parentFolder,
                          perms: perms,
                          client: client
                        }));

                      case 16:
                        return _context3.abrupt("return", undefined);

                      case 17:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));
              return _findPermissionFor3.apply(this, arguments);
            };

            _findPermissionFor = function _findPermissionFor4(_x5) {
              return _findPermissionFor3.apply(this, arguments);
            };

            _getFile = function _getFile3() {
              _getFile = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(id) {
                var query, data;
                return _regenerator.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        query = (0, _dsl.Q)(_const.DOCTYPE_FILES).getById(id);
                        _context2.next = 3;
                        return client.query(query);

                      case 3:
                        data = _context2.sent;
                        return _context2.abrupt("return", data && data.data);

                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));
              return _getFile.apply(this, arguments);
            };

            getFile = function _getFile2(_x4) {
              return _getFile.apply(this, arguments);
            };

            document = options.document, client = options.client, permissions = options.permissions;
            id = document._id || document.id;
            type = document._type || document.type;
            doc = _objectSpread(_objectSpread({}, document), {}, {
              id: id,
              type: type
            });

            if (!permissions) {
              _context4.next = 12;
              break;
            }

            _context4.t0 = permissions;
            _context4.next = 15;
            break;

          case 12:
            _context4.next = 14;
            return fetchOwn(client);

          case 14:
            _context4.t0 = _context4.sent;

          case 15:
            definedPermissions = _context4.t0;
            perms = definedPermissions.filter(function (p) {
              return isForType(p, type);
            });
            return _context4.abrupt("return", _findPermissionFor({
              doc: doc,
              client: client,
              perms: perms
            }));

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _findPermissionFor2.apply(this, arguments);
}

function isDocumentReadOnly(_x3) {
  return _isDocumentReadOnly.apply(this, arguments);
}
/**
 * When a cozy to cozy sharing is created Cozy's stack creates a
 * shortcut in `/Inbox of sharing` on the recipient's cozy to have a
 * quick access even when the sharing is not accepted yet.
 *
 * However, this file is created only if the stack knows the URL of the cozy.
 * This is not always the case.
 *
 * This method is here to tell us if the shortcut's file is created
 * on the recipient's cozy. It can be used to make an UI distinction between the
 * both situation.
 *
 * @typedef  {object} Permission
 * @property {object} data Permission document
 * @property {Array} included Member information from the sharing
 *
 * @param {Permission} permission From getOwnPermissions mainly
 */


function _isDocumentReadOnly() {
  _isDocumentReadOnly = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(args) {
    var document, client, writability, _args$permissions, permissions, perm;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            document = args.document;
            client = args.client;
            writability = args.writability;
            _args$permissions = args.permissions;

            if (!(_args$permissions === void 0)) {
              _context5.next = 10;
              break;
            }

            _context5.next = 7;
            return fetchOwn(client);

          case 7:
            _context5.t0 = _context5.sent;
            _context5.next = 11;
            break;

          case 10:
            _context5.t0 = _args$permissions;

          case 11:
            permissions = _context5.t0;

            if (!(permissions.length <= 1)) {
              _context5.next = 16;
              break;
            }

            _context5.t1 = permissions[0] // shortcut because most of time, there will be only one permission block
            ;
            _context5.next = 19;
            break;

          case 16:
            _context5.next = 18;
            return findPermissionFor({
              document: document,
              client: client,
              permissions: permissions
            });

          case 18:
            _context5.t1 = _context5.sent;

          case 19:
            perm = _context5.t1;

            if (!perm) {
              _context5.next = 24;
              break;
            }

            return _context5.abrupt("return", isReadOnly(perm, {
              writability: writability
            }));

          case 24:
            _logger.default.warn("can't find the document in current attached permissions");

            return _context5.abrupt("return", undefined);

          case 26:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _isDocumentReadOnly.apply(this, arguments);
}

var isShortcutCreatedOnTheRecipientCozy = function isShortcutCreatedOnTheRecipientCozy(permission) {
  if (!permission.included) return false;
  var sharingMember = permission.included.find(function (item) {
    return item.type === 'io.cozy.sharings.members';
  });

  if (sharingMember && sharingMember.attributes.instance) {
    return true;
  }

  return false;
};

exports.isShortcutCreatedOnTheRecipientCozy = isShortcutCreatedOnTheRecipientCozy;