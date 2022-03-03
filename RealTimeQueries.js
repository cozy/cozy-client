"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = require("react");

var _useClient = _interopRequireDefault(require("./hooks/useClient"));

var _dsl = require("./queries/dsl");

var _store = require("./store");

var _CozyClient = _interopRequireDefault(require("./CozyClient"));

var _types = require("./types");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Normalizes an object representing a CouchDB document
 *
 * Ensures existence of `_type`
 *
 * @public
 * @param {CouchDBDocument} couchDBDoc - object representing the document
 * @returns {CozyClientDocument} full normalized document
 */
var normalizeDoc = function normalizeDoc(couchDBDoc, doctype) {
  return _objectSpread({
    id: couchDBDoc._id,
    _type: doctype
  }, couchDBDoc);
};
/**
 * DispatchChange
 *
 * @param {CozyClient} client CozyClient instane
 * @param {Doctype} doctype Doctype of the document to update
 * @param {CouchDBDocument} couchDBDoc Document to update
 * @param {Mutation} mutationDefinitionCreator Mutation to apply
 */


var dispatchChange = function dispatchChange(client, doctype, couchDBDoc, mutationDefinitionCreator) {
  var data = normalizeDoc(couchDBDoc, doctype);
  var response = {
    data: data
  };
  var options = {};
  client.dispatch((0, _store.receiveMutationResult)(client.generateRandomId(), response, options, mutationDefinitionCreator(data)));
};
/**
 * Component that subscribes to a doctype changes and keep the
 * internal store updated.
 *
 * @param  {object} options - Options
 * @param  {Doctype} options.doctype - The doctype to watch
 * @returns {null} The component does not display anything.
 */


var RealTimeQueries = function RealTimeQueries(_ref) {
  var doctype = _ref.doctype;
  var client = (0, _useClient.default)();
  (0, _react.useEffect)(function () {
    var realtime = client.plugins.realtime;

    if (!realtime) {
      throw new Error('You must include the realtime plugin to use RealTimeQueries');
    }

    var dispatchCreate = function dispatchCreate(couchDBDoc) {
      dispatchChange(client, doctype, couchDBDoc, _dsl.Mutations.createDocument);
    };

    var dispatchUpdate = function dispatchUpdate(couchDBDoc) {
      dispatchChange(client, doctype, couchDBDoc, _dsl.Mutations.updateDocument);
    };

    var dispatchDelete = function dispatchDelete(couchDBDoc) {
      dispatchChange(client, doctype, _objectSpread(_objectSpread({}, couchDBDoc), {}, {
        _deleted: true
      }), _dsl.Mutations.deleteDocument);
    };

    var subscribe = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return realtime.subscribe('created', doctype, dispatchCreate);

              case 2:
                _context.next = 4;
                return realtime.subscribe('updated', doctype, dispatchUpdate);

              case 4:
                _context.next = 6;
                return realtime.subscribe('deleted', doctype, dispatchDelete);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function subscribe() {
        return _ref2.apply(this, arguments);
      };
    }();

    subscribe();
    return function () {
      realtime.unsubscribe('created', doctype, dispatchCreate);
      realtime.unsubscribe('updated', doctype, dispatchUpdate);
      realtime.unsubscribe('deleted', doctype, dispatchDelete);
    };
  }, [client, doctype]);
  return null;
};

var _default = /*#__PURE__*/(0, _react.memo)(RealTimeQueries);

exports.default = _default;