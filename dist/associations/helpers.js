"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReferencedById = exports.getReferencedBy = exports.isReferencedById = exports.isReferencedBy = exports.create = exports.resolveClass = exports.attachRelationships = exports.responseToRelationship = exports.pickTypeAndId = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _pickBy = _interopRequireDefault(require("lodash/pickBy"));

var _Association = _interopRequireDefault(require("./Association"));

var _HasOne = _interopRequireDefault(require("./HasOne"));

var _HasOneInPlace = _interopRequireDefault(require("./HasOneInPlace"));

var _HasMany = _interopRequireDefault(require("./HasMany"));

var _HasManyInPlace = _interopRequireDefault(require("./HasManyInPlace"));

var _HasManyFiles = _interopRequireDefault(require("./HasManyFiles"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var pickTypeAndId = function pickTypeAndId(x) {
  return (0, _pick.default)(x, '_type', '_id');
};

exports.pickTypeAndId = pickTypeAndId;

var applyHelper = function applyHelper(fn, objOrArr) {
  return Array.isArray(objOrArr) ? objOrArr.map(fn) : fn(objOrArr);
};

var responseToRelationship = function responseToRelationship(response) {
  return (0, _pickBy.default)({
    data: applyHelper(pickTypeAndId, response.data),
    meta: response.meta,
    next: response.next,
    skip: response.skip,
    bookmark: response.bookmark
  });
};

exports.responseToRelationship = responseToRelationship;

var attachRelationship = function attachRelationship(doc, relationships) {
  return _objectSpread(_objectSpread({}, doc), {}, {
    relationships: _objectSpread(_objectSpread({}, doc.relationships), relationships)
  });
};

var attachRelationships = function attachRelationships(response, relationshipsByDocId) {
  if (Array.isArray(response.data)) {
    return _objectSpread(_objectSpread({}, response), {}, {
      data: response.data.map(function (doc) {
        return attachRelationship(doc, relationshipsByDocId[doc._id]);
      })
    });
  } else {
    var doc = response.data;
    return _objectSpread(_objectSpread({}, response), {}, {
      data: attachRelationship(doc, relationshipsByDocId[doc._id])
    });
  }
};

exports.attachRelationships = attachRelationships;
var aliases = {
  'io.cozy.files:has-many': _HasManyFiles.default,
  'has-many': _HasMany.default,
  'belongs-to-in-place': _HasOneInPlace.default,
  'has-one': _HasOne.default,
  'has-one-in-place': _HasOneInPlace.default,
  'has-many-in-place': _HasManyInPlace.default
};
/**
 * Returns the relationship class for a given doctype/type.
 *
 * In the schema definition, some classes have string aliases
 * so you do not have to import directly the association.
 *
 * Some doctypes can have built-in overriden relationships.
 *
 * @private
 */

var resolveClass = function resolveClass(doctype, type) {
  if (type === undefined) {
    throw new Error('Undefined type for ' + doctype);
  }

  if (typeof type !== 'string') {
    return type;
  } else {
    var qualified = "".concat(doctype, ":").concat(type);
    var cls = aliases[qualified] || aliases[type];

    if (!cls) {
      throw new Error("Unknown association '".concat(type, "'"));
    } else {
      return cls;
    }
  }
};

exports.resolveClass = resolveClass;

var create = function create(target, _ref, accessors) {
  var name = _ref.name,
      type = _ref.type,
      doctype = _ref.doctype;

  if (target[name] instanceof _Association.default) {
    throw new Error("Association ".concat(name, " already exists"));
  }

  return new type(target, name, doctype, accessors);
};
/**
 * Checks if the file is referenced by a specific doctype
 *
 * @param {import("../types").IOCozyFile} file - io.cozy.files document
 * @param {import("../types").Doctype} referencedBy - Doctype where document is referenced
 * @returns {boolean} If a reference is found
 */


exports.create = create;

var isReferencedBy = function isReferencedBy(file, referencedBy) {
  var _file$relationships, _file$relationships$r;

  var references = (file === null || file === void 0 ? void 0 : (_file$relationships = file.relationships) === null || _file$relationships === void 0 ? void 0 : (_file$relationships$r = _file$relationships.referenced_by) === null || _file$relationships$r === void 0 ? void 0 : _file$relationships$r.data) || (file === null || file === void 0 ? void 0 : file.referenced_by) || [];
  return references.some(function (reference) {
    return reference.type === referencedBy;
  });
};
/**
 * Checks if the file is referenced by a specific doctype and a specific Id of that reference
 *
 * @param {import("../types").IOCozyFile} file - io.cozy.files document
 * @param {import("../types").Doctype} referencedBy - Doctype where document is referenced
 * @param {string} referencedId - Id of the referenced document
 * @returns {boolean} If a reference is found
 */


exports.isReferencedBy = isReferencedBy;

var isReferencedById = function isReferencedById(file, referencedBy, referencedId) {
  var _file$relationships2, _file$relationships2$;

  var references = (file === null || file === void 0 ? void 0 : (_file$relationships2 = file.relationships) === null || _file$relationships2 === void 0 ? void 0 : (_file$relationships2$ = _file$relationships2.referenced_by) === null || _file$relationships2$ === void 0 ? void 0 : _file$relationships2$.data) || (file === null || file === void 0 ? void 0 : file.referenced_by) || [];
  return references.some(function (reference) {
    return reference.type === referencedBy && reference.id === referencedId;
  });
};
/**
 * Get array of reference by an specific doctype
 *
 * @param {import("../types").IOCozyFile} file - io.cozy.files document
 * @param {import("../types").Doctype} referencedBy - Doctype where document is referenced
 * @returns {import("../types").Reference[]} Array of references found
 */


exports.isReferencedById = isReferencedById;

var getReferencedBy = function getReferencedBy(file, referencedBy) {
  var _file$relationships3, _file$relationships3$;

  var references = (file === null || file === void 0 ? void 0 : (_file$relationships3 = file.relationships) === null || _file$relationships3 === void 0 ? void 0 : (_file$relationships3$ = _file$relationships3.referenced_by) === null || _file$relationships3$ === void 0 ? void 0 : _file$relationships3$.data) || (file === null || file === void 0 ? void 0 : file.referenced_by) || [];
  return references.filter(function (reference) {
    return reference.type === referencedBy;
  });
};
/**
 * Get array of reference by an specific doctype and a specific Id of that reference
 *
 * @param {import("../types").IOCozyFile} file - io.cozy.files document
 * @param {import("../types").Doctype} referencedBy - Doctype where document is referenced
 * @param {string} referencedId - Id of the referenced document
 * @returns {import("../types").Reference[]} Array of the reference found
 */


exports.getReferencedBy = getReferencedBy;

var getReferencedById = function getReferencedById(file, referencedBy, referencedId) {
  var _file$relationships4, _file$relationships4$;

  var references = (file === null || file === void 0 ? void 0 : (_file$relationships4 = file.relationships) === null || _file$relationships4 === void 0 ? void 0 : (_file$relationships4$ = _file$relationships4.referenced_by) === null || _file$relationships4$ === void 0 ? void 0 : _file$relationships4$.data) || (file === null || file === void 0 ? void 0 : file.referenced_by) || [];
  return references.filter(function (reference) {
    return reference.type === referencedBy && reference.id === referencedId;
  });
};

exports.getReferencedById = getReferencedById;