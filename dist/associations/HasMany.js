"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.updateRelationship = exports.updateHasManyItem = exports.removeHasManyItem = exports.setHasManyItem = exports.getHasManyItems = exports.getHasManyItem = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _get = _interopRequireDefault(require("lodash/get"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _dsl = require("../queries/dsl");

var _store = require("../store");

var _Association2 = _interopRequireDefault(require("./Association"));

var _logger = _interopRequireDefault(require("../logger"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * @typedef {object} Relationship
 * @property {string} relName - name of the relationship
 * @property {string} relItemId - id of the relation
 * @property {Relation} relItemAttrs - Attributes to be set (at least _id and _type)
 */

/**
 * @typedef {object} Relation
 * @property {string} _id - id of the relation
 * @property {string} _type - doctype of the relation
 */
var empty = function empty() {
  return {
    data: [],
    next: true,
    meta: {
      count: 0
    }
  };
};

var updateArray = function updateArray(array, indexArg, el) {
  var index = indexArg === -1 ? array.length : indexArg;
  return [].concat((0, _toConsumableArray2.default)(array.slice(0, index)), [el], (0, _toConsumableArray2.default)(array.slice(index + 1)));
};
/**
 * Related documents are stored in the relationships attribute of the object,
 * following the JSON API spec.
 *
 * Responsible for
 *
 * - Creating relationships
 * - Removing relationships
 *
 * @description
 *
 * ```
 * const schema = {
 *   todos: {
 *      doctype: 'io.cozy.todos',
 *      relationships: {
 *        tasks: {
 *          doctype: 'io.cozy.tasks',
 *          type: 'has-many'
 *        }
 *      }
 *    }
 * }
 *
 * const todo = {
 *   label: "Protect people's privacy",
 *   relationships: {
 *     tasks: {
 *       data: [
 *         {_id: 1, _type: 'io.cozy.tasks'},
 *         {_id: 2, _type: 'io.cozy.tasks'}
 *       ]
 *     }
 *   }
 * }
 * ```
 */


var HasMany = /*#__PURE__*/function (_Association) {
  (0, _inherits2.default)(HasMany, _Association);

  var _super = _createSuper(HasMany);

  function HasMany() {
    var _this;

    (0, _classCallCheck2.default)(this, HasMany);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "updateRelationshipData", function (getUpdatedRelationshipData) {
      return function (dispatch, getState) {
        var previousRelationship = (0, _store.getDocumentFromState)(getState(), _this.target._type, _this.target._id);
        dispatch((0, _store.receiveQueryResult)(null, {
          data: _objectSpread(_objectSpread({}, previousRelationship), {}, {
            relationships: _objectSpread(_objectSpread({}, previousRelationship.relationships), {}, (0, _defineProperty2.default)({}, _this.name, getUpdatedRelationshipData(previousRelationship.relationships[_this.name])))
          })
        }));
      };
    });
    return _this;
  }

  (0, _createClass2.default)(HasMany, [{
    key: "fetchMore",
    value: function fetchMore() {
      throw 'Not implemented';
    }
  }, {
    key: "exists",
    value: function exists(document) {
      return this.existsById(document._id);
    }
  }, {
    key: "containsById",
    value: function containsById(id) {
      return this.getRelationship().data.find(function (_ref) {
        var _id = _ref._id;
        return id === _id;
      }) !== undefined;
    }
  }, {
    key: "existsById",
    value: function existsById(id) {
      return Boolean(this.containsById(id) && this.get(this.doctype, id));
    }
    /**
     * Add the relationships to the target document
     *
     * @param {import("../types").CozyClientDocument[]} docsArg - Documents to add as relationships
     * @returns {import("../types").CozyClientDocument} The saved target document
     */

  }, {
    key: "add",
    value: function add(docsArg) {
      var docs = Array.isArray(docsArg) ? docsArg : [docsArg];
      var ids = docs.map(function (doc) {
        return doc._id;
      });
      return this.addById(ids);
    }
    /**
     * Remove the relationships from the target document
     *
     * @param {import("../types").CozyClientDocument[]} docsArg - Documents to remove as relationships
     * @returns {import("../types").CozyClientDocument} The saved target document
     */

  }, {
    key: "remove",
    value: function remove(docsArg) {
      var docs = Array.isArray(docsArg) ? docsArg : [docsArg];
      var ids = docs.map(function (doc) {
        return doc._id;
      });
      return this.removeById(ids);
    }
    /**
     * Update target document with relationships
     *
     * @param {string[]} idsArg - The ids to add as a relationship
     */

  }, {
    key: "addTargetRelationships",
    value: function addTargetRelationships(idsArg) {
      var _this2 = this,
          _this$target$relation;

      if (!this.target.relationships) this.target.relationships = {};

      if (!this.target.relationships[this.name]) {
        this.target.relationships[this.name] = {
          data: []
        };
      }

      var ids = Array.isArray(idsArg) ? idsArg : [idsArg];
      var newRelations = ids.filter(function (id) {
        return !_this2.existsById(id);
      }).map(function (id) {
        return {
          _id: id,
          _type: _this2.doctype
        };
      });

      (_this$target$relation = this.target.relationships[this.name].data).push.apply(_this$target$relation, (0, _toConsumableArray2.default)(newRelations));

      this.updateMetaCount();
    }
    /**
     * Add a referenced document by id. You need to call save()
     * in order to synchronize your document with the store.
     *
     * @todo We shouldn't create the array of relationship manually since
     * it'll not be present in the store as well.
     * We certainly should use something like `updateRelationship`
     *
     */

  }, {
    key: "addById",
    value: function addById(idsArg) {
      this.addTargetRelationships(idsArg);
      return this.save(this.target);
    }
    /**
     * Remove relationships from target document
     *
     * @param {string[]} idsArg - The ids to remove from the target relationships
     */

  }, {
    key: "removeTargetRelationships",
    value: function removeTargetRelationships(idsArg) {
      var ids = Array.isArray(idsArg) ? idsArg : [idsArg];
      this.target.relationships[this.name].data = this.target.relationships[this.name].data.filter(function (_ref2) {
        var _id = _ref2._id;
        return !ids.includes(_id);
      });
      this.updateMetaCount();
    }
  }, {
    key: "removeById",
    value: function removeById(idsArg) {
      this.removeTargetRelationships(idsArg);
      return this.save(this.target);
    }
  }, {
    key: "updateMetaCount",
    value: function updateMetaCount() {
      if ((0, _get.default)(this.target.relationships[this.name], 'meta.count') !== undefined) {
        this.target.relationships[this.name].meta = _objectSpread(_objectSpread({}, this.target.relationships[this.name].meta), {}, {
          count: this.target.relationships[this.name].data.length
        });
      }
    }
  }, {
    key: "getRelationship",
    value: function getRelationship() {
      var rawData = this.target[this.name];
      var relationship = (0, _get.default)(this.target, "relationships.".concat(this.name));

      if (!relationship) {
        if (rawData && rawData.length) {
          _logger.default.warn("You're trying to access data on a relationship that appear to not be loaded yet. You may want to use 'include()' on your query");
        }

        return empty();
      }

      return relationship;
    }
  }, {
    key: "updateTargetRelationship",
    value: function updateTargetRelationship(store, updateFn) {
      // TODO See if updateTargetRelationship is still used, removing it would enable us
      // to remove store.readDocument and store.writeDocument and the StoreProxy
      var prevTarget = store.readDocument(this.target._type, this.target._id);
      store.writeDocument(this.updateRelationship(prevTarget, updateFn));
    }
  }, {
    key: "updateRelationship",
    value: function updateRelationship(target, updateFn) {
      return HasMany.updateRelationship(target, this.name, updateFn);
    }
  }, {
    key: "dehydrate",
    value: function dehydrate(doc) {
      return _objectSpread(_objectSpread({}, doc), {}, {
        relationships: _objectSpread(_objectSpread({}, doc.relationships), {}, (0, _defineProperty2.default)({}, this.name, {
          data: this.raw
        }))
      });
    }
    /**
     * @param {import("../types").CozyClientDocument} document - Document to query
     * @param {object} client - The CozyClient instance
     * @param {Association} assoc - The query params
     *
     * @returns {import("../types").CozyClientDocument | QueryDefinition}
     */

  }, {
    key: "raw",
    get: function get() {
      return this.getRelationship().data;
    }
    /**
     * Returns store documents
     */

  }, {
    key: "data",
    get: function get() {
      var _this3 = this;

      return this.getRelationship().data.map(function (_ref3) {
        var _id = _ref3._id,
            _type = _ref3._type;
        return _this3.get(_type, _id);
      }).filter(Boolean);
    }
  }, {
    key: "hasMore",
    get: function get() {
      return this.getRelationship().next;
    }
    /**
     * Returns the total number of documents in the relationship.
     * Does not handle documents absent from the store. If you want
     * to do that, you can use .data.length.
     *
     * @returns {number} - Total number of documents in the relationships
     */

  }, {
    key: "count",
    get: function get() {
      var relationship = this.getRelationship();
      return relationship.meta ? relationship.meta.count : relationship.data.length;
    }
  }], [{
    key: "query",
    value: function query(document, client, assoc) {
      var relationships = (0, _get.default)(document, "relationships.".concat(assoc.name, ".data"), []);
      var ids = relationships.map(function (assoc) {
        return assoc._id;
      });
      return new _dsl.QueryDefinition({
        doctype: assoc.doctype,
        ids: ids
      });
    }
  }]);
  return HasMany;
}(_Association2.default);
/**
 * Gets a relationship item with the relationship name and id
 *
 * @param {object} doc - Document to be updated
 * @param {string} relName - Name of the relationship
 * @param {string} relItemId - Id of the relationship item
 */


var getHasManyItem = HasMany.getHasManyItem = function (doc, relName, relItemId) {
  var relData = (0, _get.default)(doc, "relationships.".concat(relName, ".data"), []);
  return relData.find(function (rel) {
    return rel._id == relItemId;
  });
};

exports.getHasManyItem = getHasManyItem;

var getHasManyItems = HasMany.getHasManyItems = function (doc, relName) {
  return (0, _get.default)(doc, "relationships.".concat(relName, ".data"), []);
};
/**
 * Sets a relationship item with the relationship name and id
 *
 * @param {object} doc - Document to be updated
 * @param {string} relName - Name of the relationship
 * @param {string} relItemId - Id of the relationship item
 * @param {object} relItemAttrs - Attributes to be set (at least _id and _type)
 */


exports.getHasManyItems = getHasManyItems;

var setHasManyItem = HasMany.setHasManyItem = function (doc, relName, relItemId, relItemAttrs) {
  var relData = HasMany.getHasManyItems(doc, relName);
  var relIndex = relData.findIndex(function (rel) {
    return rel._id === relItemId;
  });
  var updatedRelItem = (0, _merge.default)({}, relData[relIndex], relItemAttrs);
  var updatedRelData = updateArray(relData, relIndex, updatedRelItem);
  var updatedDocument = HasMany.updateRelationship(doc, relName, function (relationship) {
    return (0, _merge.default)({}, relationship, {
      data: updatedRelData
    });
  });
  return updatedDocument;
};
/**
 * Remove one relationship item
 *
 * @param {object} doc - Document to be updated
 * @param {string} relName - Name of the relationship
 * @param {string} relItemId - Id of the relationship item
 */


exports.setHasManyItem = setHasManyItem;

var removeHasManyItem = HasMany.removeHasManyItem = function (doc, relName, relItemId) {
  var relData = HasMany.getHasManyItems(doc, relName);
  var updatedRelData = relData.filter(function (rel) {
    return rel._id !== relItemId;
  });
  var updatedDocument = HasMany.updateRelationship(doc, relName, function () {
    return {
      data: updatedRelData
    };
  });
  return updatedDocument;
};
/**
 * Updates a relationship item with the relationship name and id
 *
 * @param {object} doc - Document to be updated
 * @param {string} relName - Name of the relationship
 * @param {string} relItemId - Id of the relationship item
 * @param {Function} updater - receives the current relationship item and should
 * return an updated version. Merge should be used in the updater
 * if previous relationship item fields are to be kept.
 */


exports.removeHasManyItem = removeHasManyItem;

var updateHasManyItem = HasMany.updateHasManyItem = function (doc, relName, relItemId, updater) {
  var relItem = HasMany.getHasManyItem(doc, relName, relItemId);
  var updatedRelItem = updater(relItem);
  return HasMany.setHasManyItem(doc, relName, relItemId, updatedRelItem);
};

exports.updateHasManyItem = updateHasManyItem;

var updateRelationship = HasMany.updateRelationship = function (doc, relName, updateFn) {
  return _objectSpread(_objectSpread({}, doc), {}, {
    relationships: _objectSpread(_objectSpread({}, doc.relationships), {}, (0, _defineProperty2.default)({}, relName, _objectSpread(_objectSpread({}, doc.relationships ? doc.relationships[relName] : {}), updateFn(doc.relationships ? doc.relationships[relName] : {}))))
  });
};

exports.updateRelationship = updateRelationship;
var _default = HasMany;
exports.default = _default;