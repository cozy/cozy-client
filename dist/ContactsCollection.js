"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CONTACTS_DOCTYPE = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _DocumentCollection2 = _interopRequireDefault(require("./DocumentCollection"));

var _normalize = require("./normalize");

var _types = require("cozy-client/dist/types");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var CONTACTS_DOCTYPE = 'io.cozy.contacts';
exports.CONTACTS_DOCTYPE = CONTACTS_DOCTYPE;
var normalizeContactJsonApi = (0, _normalize.normalizeDoctypeJsonApi)(CONTACTS_DOCTYPE);

var normalizeMyself = function normalizeMyself(contact) {
  var _contact$meta;

  return _objectSpread(_objectSpread({}, normalizeContactJsonApi(contact)), {}, {
    _rev: contact === null || contact === void 0 ? void 0 : (_contact$meta = contact.meta) === null || _contact$meta === void 0 ? void 0 : _contact$meta.rev
  });
};

var ContactsCollection = /*#__PURE__*/function (_DocumentCollection) {
  (0, _inherits2.default)(ContactsCollection, _DocumentCollection);

  var _super = _createSuper(ContactsCollection);

  function ContactsCollection() {
    (0, _classCallCheck2.default)(this, ContactsCollection);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(ContactsCollection, [{
    key: "find",
    value: function () {
      var _find = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(selector, options) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(selector !== undefined && Object.values(selector).length === 1 && selector['me'] == true)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", this.findMyself());

              case 4:
                return _context.abrupt("return", (0, _get2.default)((0, _getPrototypeOf2.default)(ContactsCollection.prototype), "find", this).call(this, selector, options));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function find(_x, _x2) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: "findMyself",
    value: function () {
      var _findMyself = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var resp, col;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.stackClient.fetchJSON('POST', '/contacts/myself');

              case 2:
                resp = _context2.sent;
                col = {
                  data: [normalizeMyself(resp.data)],
                  next: false,
                  meta: null,
                  bookmark: false
                };
                return _context2.abrupt("return", col);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function findMyself() {
        return _findMyself.apply(this, arguments);
      }

      return findMyself;
    }()
    /**
     * Destroys a contact
     *
     * If the contact is linked to accounts, it will be trashed instead of being
     * destroyed.
     *
     * @param  {IOCozyContact} contact - Contact to destroy. IT MUST BE THE FULL CONTACT OBJECT
     * @returns {Promise<{ data: IOCozyContact }>} - Resolves when contact has been destroyed
     */

  }, {
    key: "destroy",
    value: function () {
      var _destroy = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(contact) {
        var _contact$cozyMetadata;

        var syncData, isLinkedToAccounts;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                syncData = (contact === null || contact === void 0 ? void 0 : (_contact$cozyMetadata = contact.cozyMetadata) === null || _contact$cozyMetadata === void 0 ? void 0 : _contact$cozyMetadata.sync) || {};
                isLinkedToAccounts = Object.keys(syncData).length > 0;

                if (!isLinkedToAccounts) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", (0, _get2.default)((0, _getPrototypeOf2.default)(ContactsCollection.prototype), "update", this).call(this, _objectSpread(_objectSpread({}, contact), {}, {
                  trashed: true
                })));

              case 6:
                return _context3.abrupt("return", (0, _get2.default)((0, _getPrototypeOf2.default)(ContactsCollection.prototype), "destroy", this).call(this, contact));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function destroy(_x3) {
        return _destroy.apply(this, arguments);
      }

      return destroy;
    }()
  }]);
  return ContactsCollection;
}(_DocumentCollection2.default);

var _default = ContactsCollection;
exports.default = _default;