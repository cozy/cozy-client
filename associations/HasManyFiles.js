"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getFileDatetime = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get3 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _get4 = _interopRequireDefault(require("lodash/get"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _uniq = _interopRequireDefault(require("lodash/uniq"));

var _dsl = require("../queries/dsl");

var _store = require("../store");

var _const = require("../const");

var _Association = _interopRequireDefault(require("./Association"));

var _HasMany2 = _interopRequireDefault(require("./HasMany"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * newCursor - Returns a CouchDB view Cursor for cursor-based pagination
 *
 * @param {import("../types").ViewKey} key - The CouchDB key of the view which will be requested
 * @param {import("../types").DocId} startDocId - The first doc _id to return from the view
 *
 * @returns {import("../types").CouchDBViewCursor}
 */
var newCursor = function newCursor(_ref, startDocId) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 3),
      doctype = _ref2[0],
      id = _ref2[1],
      lastDatetime = _ref2[2];

  var cursorKey = lastDatetime ? [doctype, id, lastDatetime] : [doctype, id];
  return [cursorKey, startDocId];
};
/**
 * Get the file datetime
 *
 * @param  {import('../types').IOCozyFile} file - io.cozy.files document
 * @returns {string} The file datetime
 */


var getFileDatetime = function getFileDatetime(file) {
  var _file$metadata;

  // Some files do not have any metadata, e.g. bitmap files.
  return ((_file$metadata = file.metadata) === null || _file$metadata === void 0 ? void 0 : _file$metadata.datetime) || file.created_at;
};
/**
 *  This class is only used for photos albums relationships.
 *  Behind the hood, the queries uses a view returning the files sorted
 *  by datetime, with a cursor-based pagination.
 */


exports.getFileDatetime = getFileDatetime;

var HasManyFiles = /*#__PURE__*/function (_HasMany) {
  (0, _inherits2.default)(HasManyFiles, _HasMany);

  var _super = _createSuper(HasManyFiles);

  function HasManyFiles() {
    (0, _classCallCheck2.default)(this, HasManyFiles);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(HasManyFiles, [{
    key: "fetchMore",
    value: function () {
      var _fetchMore = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
        var _this = this;

        var queryDef, relationships, lastRelationship;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                queryDef = new _dsl.QueryDefinition({
                  doctype: _const.DOCTYPE_FILES
                });
                relationships = this.getRelationship().data; // Get last datetime for cursor

                lastRelationship = relationships[relationships.length - 1];
                _context2.next = 5;
                return this.dispatch( /*#__PURE__*/function () {
                  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(dispatch, getState) {
                    var lastRelDoc, lastDatetime, cursor, response;
                    return _regenerator.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            lastRelDoc = (0, _store.getDocumentFromState)(getState(), lastRelationship._type, lastRelationship._id);
                            lastDatetime = getFileDatetime(lastRelDoc); // cursor-based pagination

                            cursor = newCursor([_this.target._type, _this.target._id, lastDatetime], relationships[relationships.length - 1]._id);
                            _context.next = 5;
                            return _this.query(queryDef.referencedBy(_this.target).offsetCursor(cursor));

                          case 5:
                            response = _context.sent;
                            // Remove first returned element, used as starting point for the query
                            response.data.shift();
                            _context.next = 9;
                            return _this.dispatch(_this.updateRelationshipData(function (previousRelationshipData) {
                              return _objectSpread(_objectSpread({}, previousRelationshipData), {}, {
                                data: [].concat((0, _toConsumableArray2.default)(previousRelationshipData.data), (0, _toConsumableArray2.default)(response.data)),
                                next: response.next
                              });
                            }));

                          case 9:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x, _x2) {
                    return _ref3.apply(this, arguments);
                  };
                }());

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchMore() {
        return _fetchMore.apply(this, arguments);
      }

      return fetchMore;
    }()
  }, {
    key: "addById",
    value: function () {
      var _addById = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(idsArg) {
        var _this2 = this;

        var ids, relations;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                ids = Array.isArray(idsArg) ? idsArg : [idsArg];
                this.addTargetRelationships(ids);
                relations = ids.map(function (id) {
                  return {
                    _id: id,
                    _type: _this2.doctype
                  };
                });
                _context3.next = 5;
                return this.mutate(this.addReferences(relations));

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function addById(_x3) {
        return _addById.apply(this, arguments);
      }

      return addById;
    }()
  }, {
    key: "removeById",
    value: function () {
      var _removeById = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(idsArg) {
        var _this3 = this;

        var ids, references;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                ids = Array.isArray(idsArg) ? idsArg : [idsArg];
                this.removeTargetRelationships(idsArg);
                references = ids.map(function (id) {
                  return {
                    _id: id,
                    _type: _this3.doctype
                  };
                });
                _context4.next = 5;
                return this.mutate(this.removeReferences(references));

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function removeById(_x4) {
        return _removeById.apply(this, arguments);
      }

      return removeById;
    }()
  }, {
    key: "addReferences",
    value: function addReferences(referencedDocs) {
      if (this.target._type === _const.DOCTYPE_FILES) {
        return _dsl.Mutations.addReferencedBy(this.target, referencedDocs);
      } else if (referencedDocs[0]._type === _const.DOCTYPE_FILES) {
        return _dsl.Mutations.addReferencesTo(this.target, referencedDocs);
      } else {
        throw new Error('Either the document or the references should be io.cozy.files');
      }
    }
  }, {
    key: "removeReferences",
    value: function removeReferences(referencedDocs) {
      if (this.target._type === _const.DOCTYPE_FILES) {
        return _dsl.Mutations.removeReferencedBy(this.target, referencedDocs);
      } else if (referencedDocs[0]._type === _const.DOCTYPE_FILES) {
        return _dsl.Mutations.removeReferencesTo(this.target, referencedDocs);
      } else {
        throw new Error('Either the document or the references should be io.cozy.files');
      }
    }
  }, {
    key: "dehydrate",
    value: function dehydrate(doc) {
      // HasManyFiles relationships are stored on the file doctype, not the document the files are related to
      return (0, _omit.default)(doc, [this.name, "relationships.".concat(this.name)]);
    }
    /**
     * @param {import("../types").CozyClientDocument} document - Document to query
     * @param {object} client - The CozyClient instance
     * @param {Association} assoc - The query params
     *
     * @returns {import("../types").CozyClientDocument | QueryDefinition}
     */

  }, {
    key: "data",
    get: function get() {
      var _this4 = this;

      if (this.target._type === _const.DOCTYPE_FILES) {
        var refs = (0, _get4.default)(this.target, 'referenced_by', []);
        return refs.map(function (_ref4) {
          var id = _ref4.id,
              type = _ref4.type;
          return _this4.get(type, id);
        }).filter(Boolean);
      } else {
        return (0, _get3.default)((0, _getPrototypeOf2.default)(HasManyFiles.prototype), "data", this);
      }
    }
  }], [{
    key: "query",
    value: function query(document, client, assoc) {
      if (document._type === _const.DOCTYPE_FILES) {
        var refs = (0, _get4.default)(document, "relationships.referenced_by.data", []);
        var ids = (0, _uniq.default)(refs.filter(function (ref) {
          return ref.type === assoc.doctype;
        }).map(function (ref) {
          return ref.id;
        }));
        return ids.length > 0 ? (0, _dsl.Q)(assoc.doctype).getByIds(ids) : null;
      } else {
        var cursor = newCursor([document._type, document._id], '');
        return (0, _dsl.Q)(assoc.doctype).referencedBy(document).offsetCursor(cursor);
      }
    }
  }]);
  return HasManyFiles;
}(_HasMany2.default);

exports.default = HasManyFiles;