"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _keyBy = _interopRequireDefault(require("lodash/keyBy"));

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _size = _interopRequireDefault(require("lodash/size"));

var _intersectionBy = _interopRequireDefault(require("lodash/intersectionBy"));

var _associations = require("./associations");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @typedef {object} DoctypeSchema
 */

/**
 * @typedef {Record<string, DoctypeSchema>} SchemaDefinition
 */

/**
 * Returns a normalized schema object from the schema definition.
 *
 * - Relationships are resolved to classes if needed
 * - The name of the relationship (its key in the schema definition)
 *   is included in the relationship
 * - Empty relationships are nulled
 *
 * @private
 */
var normalizeDoctypeSchema = function normalizeDoctypeSchema(doctypeSchema) {
  var relationships = (0, _mapValues.default)(doctypeSchema.relationships || {}, function (v, k) {
    return _objectSpread(_objectSpread({}, v), {}, {
      name: k,
      type: (0, _associations.resolveClass)(v.doctype, v.type)
    });
  });
  return _objectSpread(_objectSpread({}, doctypeSchema), {}, {
    relationships: (0, _size.default)(relationships) > 0 ? (0, _keyBy.default)(relationships, 'name') : null
  });
};

var assert = function assert(predicate, errorMessage) {
  if (!predicate) throw new Error(errorMessage);
};

var ensureCanBeAdded = function ensureCanBeAdded(newSchemas, existingSchemas) {
  var sameNames = (0, _intersectionBy.default)(newSchemas, existingSchemas, function (x) {
    return x.name;
  });
  assert(sameNames.length === 0, "Duplicated names in schemas being added: ".concat(sameNames.map(function (x) {
    return x.name;
  }).join(', ')));
  var sameDoctypes = (0, _intersectionBy.default)(newSchemas, existingSchemas, function (x) {
    return x.doctype;
  });
  assert(sameDoctypes.length === 0, "Duplicated doctypes in schemas being added: ".concat(sameDoctypes.map(function (x) {
    return x.name;
  }).join(', ')));
};
/**
 * Stores information on a particular doctype.
 *
 * - Attribute validation
 * - Relationship access
 *
 * ```js
 * const schema = new Schema({
 *   todos: {
 *     attributes: {
 *       label: {
 *         unique: true
 *       }
 *     },
 *     relationships: {
 *       author: 'has-one-in-place'
 *     }
 *   }
 * }, cozyStackClient)
 * ```
 */


var Schema = /*#__PURE__*/function () {
  /**
   * @param  {SchemaDefinition} schemaDefinition - Schema for the application documents
   * @param  {object} client - An instance of cozy client (optional)
   */
  function Schema() {
    var schemaDefinition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var client = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    (0, _classCallCheck2.default)(this, Schema);
    this.byDoctype = {};
    this.add(schemaDefinition);
    this.client = client;
  }
  /**
   * @param {SchemaDefinition} schemaDefinition - Additional schema to merge to current schema
   */


  (0, _createClass2.default)(Schema, [{
    key: "add",
    value: function add() {
      var schemaDefinition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var normalizedSchemaDefinition = (0, _mapValues.default)(schemaDefinition, function (obj, name) {
        return _objectSpread({
          name: name
        }, normalizeDoctypeSchema(obj));
      });
      ensureCanBeAdded(Object.values(normalizedSchemaDefinition), Object.values(this.byDoctype));
      (0, _merge.default)(this.byDoctype, (0, _keyBy.default)(normalizedSchemaDefinition, function (x) {
        return x.doctype;
      }));
    }
    /**
     * Returns the schema for a doctype
     *
     * Creates an empty schema implicitly if it does not exist
     *
     * @param {string} doctype - Doctype
     */

  }, {
    key: "getDoctypeSchema",
    value: function getDoctypeSchema(doctype) {
      var schema = this.byDoctype[doctype];

      if (!schema) {
        schema = normalizeDoctypeSchema({
          name: doctype,
          doctype: doctype
        });
        this.byDoctype[doctype] = schema;
      }

      return schema;
    }
    /**
     * Returns the relationship for a given doctype/name
     *
     * @param {string} doctype - Doctype
     * @param {string} relationshipName - Relationship name
     */

  }, {
    key: "getRelationship",
    value: function getRelationship(doctype, relationshipName) {
      if (!doctype) {
        throw new TypeError("Invalid doctype ".concat(doctype));
      }

      var schema = this.getDoctypeSchema(doctype);

      if (!schema) {
        throw new Error("Cannot find doctype ".concat(doctype, " in schema"));
      }

      if (!schema.relationships) {
        throw new Error("Schema for doctype ".concat(doctype, " has no relationships"));
      }

      return schema.relationships[relationshipName];
    }
    /**
     * Validates a document considering the descriptions in schema.attributes.
     */

  }, {
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(document) {
        var errors, schema, n, ret;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                errors = {};
                schema = this.byDoctype[document._type];

                if (schema) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", true);

              case 4:
                if (schema.attributes) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", true);

              case 6:
                _context.t0 = _regenerator.default.keys(schema.attributes);

              case 7:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 15;
                  break;
                }

                n = _context.t1.value;
                _context.next = 11;
                return this.validateAttribute(document, n, schema.attributes[n]);

              case 11:
                ret = _context.sent;
                if (ret !== true) errors[n] = ret;
                _context.next = 7;
                break;

              case 15:
                if (!(Object.keys(errors).length === 0)) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return", true);

              case 17:
                return _context.abrupt("return", errors);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function validate(_x) {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: "validateAttribute",
    value: function () {
      var _validateAttribute = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(document, attrName, attrProps) {
        var ret;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(attrProps.unique && this.client)) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 3;
                return this.client.collection(document._type).checkUniquenessOf(attrName, document[attrName]);

              case 3:
                ret = _context2.sent;

                if (!(ret !== true)) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return", 'must be unique');

              case 6:
                return _context2.abrupt("return", true);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function validateAttribute(_x2, _x3, _x4) {
        return _validateAttribute.apply(this, arguments);
      }

      return validateAttribute;
    }()
  }]);
  return Schema;
}();

var _default = Schema;
exports.default = _default;