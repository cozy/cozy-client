"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatchDelete = exports.dispatchUpdate = exports.dispatchCreate = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _dsl = require("../queries/dsl");

var _mutations = require("./mutations");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Normalizes an object representing a CouchDB document
 *
 * Ensures existence of `_type`
 *
 * @public
 * @param {import("../types").CouchDBDocument} couchDBDoc - object representing the document
 * @param {string} doctype - Doctype of the document
 * @returns {import("../types").CozyClientDocument} full normalized document
 */
var normalizeDoc = function normalizeDoc(couchDBDoc, doctype) {
  return _objectSpread({
    id: couchDBDoc._id,
    _type: doctype
  }, couchDBDoc);
};
/**
 * Enhances a document with additional attributes
 *
 * @async
 * @param {import("../types").CozyClientDocument} doc - The document to enhance
 * @param {Object} options - Options for enhancing the document
 * @param {Function} [options.enhanceDocFn] - Function to enhance document attributes
 * @param {object} options.client - CozyClient instance
 * @returns {Promise<import("../types").CozyClientDocument>} Enhanced document
 */


var enhanceDoc = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(doc, options) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(typeof options.enhanceDocFn === 'function')) {
              _context.next = 4;
              break;
            }

            _context.next = 3;
            return options.enhanceDocFn(doc, {
              client: options.client
            });

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
            return _context.abrupt("return", doc);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function enhanceDoc(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * DispatchChange
 *
 * @param {object} client CozyClient instance
 * @param {import("../types").CozyClientDocument} document Document to update
 * @param {import("../types").Mutation} mutationDefinitionCreator Mutation to apply
 *
 */


var dispatchChange = function dispatchChange(client, document, mutationDefinitionCreator) {
  var response = {
    data: document
  };
  var options = {};
  client.dispatch((0, _mutations.receiveMutationResult)(client.generateRandomId(), response, options, mutationDefinitionCreator(document)));
};
/**
 * @typedef {Object} DispatchOptions
 * @property {function} [enhanceDocFn] Optional function to enhance the document attributes before dispatch
 */

/**
 * Dispatches a create action for a document to update CozyClient store from realtime callbacks.
 *
 * @param {object} client - CozyClient instance
 * @param {import("../types").Doctype} doctype - Doctype of the document to create
 * @param {import("../types").CouchDBDocument} couchDBDoc - Document to create
 * @param {DispatchOptions} [options] Options
 */


var dispatchCreate = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(client, doctype, couchDBDoc) {
    var options,
        normalizedDoc,
        enhancedDoc,
        _args2 = arguments;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = _args2.length > 3 && _args2[3] !== undefined ? _args2[3] : {};
            normalizedDoc = normalizeDoc(couchDBDoc, doctype);
            _context2.next = 4;
            return enhanceDoc(normalizedDoc, {
              client: client,
              enhanceDocFn: options === null || options === void 0 ? void 0 : options.enhanceDocFn
            });

          case 4:
            enhancedDoc = _context2.sent;
            dispatchChange(client, enhancedDoc, _dsl.Mutations.createDocument);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function dispatchCreate(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * Dispatches a update action for a document to update CozyClient store from realtime callbacks.
 *
 * @param {object} client - CozyClient instance
 * @param {import("../types").Doctype} doctype - Doctype of the document to create
 * @param {import("../types").CouchDBDocument} couchDBDoc - Document to create
 * @param {DispatchOptions} [options] Options
 */


exports.dispatchCreate = dispatchCreate;

var dispatchUpdate = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(client, doctype, couchDBDoc) {
    var options,
        normalizedDoc,
        enhancedDoc,
        _args3 = arguments;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
            normalizedDoc = normalizeDoc(couchDBDoc, doctype);
            _context3.next = 4;
            return enhanceDoc(normalizedDoc, {
              client: client,
              enhanceDocFn: options === null || options === void 0 ? void 0 : options.enhanceDocFn
            });

          case 4:
            enhancedDoc = _context3.sent;
            dispatchChange(client, enhancedDoc, _dsl.Mutations.updateDocument);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function dispatchUpdate(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();
/**
 * Dispatches a delete action for a document to update CozyClient store from realtime callbacks.
 *
 * @param {object} client - CozyClient instance
 * @param {import("../types").Doctype} doctype - Doctype of the document to create
 * @param {import("../types").CouchDBDocument} couchDBDoc - Document to create
 * @param {DispatchOptions} [options] Options
 */


exports.dispatchUpdate = dispatchUpdate;

var dispatchDelete = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(client, doctype, couchDBDoc) {
    var options,
        normalizedDoc,
        enhancedDoc,
        _args4 = arguments;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            options = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : {};
            normalizedDoc = normalizeDoc(_objectSpread(_objectSpread({}, couchDBDoc), {}, {
              _deleted: true
            }), doctype);
            _context4.next = 4;
            return enhanceDoc(normalizedDoc, {
              client: client,
              enhanceDocFn: options === null || options === void 0 ? void 0 : options.enhanceDocFn
            });

          case 4:
            enhancedDoc = _context4.sent;
            dispatchChange(client, enhancedDoc, _dsl.Mutations.deleteDocument);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function dispatchDelete(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.dispatchDelete = dispatchDelete;