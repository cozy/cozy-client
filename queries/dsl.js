"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryDefinition = exports.MutationTypes = exports.Mutations = exports.getDoctypeFromOperation = exports.uploadFile = exports.removeReferencedBy = exports.addReferencedBy = exports.removeReferencesTo = exports.addReferencesTo = exports.deleteDocument = exports.updateDocuments = exports.updateDocument = exports.createDocument = exports.isAGetByIdQuery = exports.Q = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _findKey = _interopRequireDefault(require("lodash/findKey"));

var _logger = _interopRequireDefault(require("../logger"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @typedef PartialQueryDefinition
 *
 * @property {Array} [indexedFields]
 * @property {Array} [sort]
 * @property {object} [selector]
 * @property {object} [partialFilter]
 * @property {Array} [fields]
 */

/**
 * @typedef {object} MangoSelector
 */

/**
 * @typedef {object} MangoPartialFilter
 */

/**
 * Chainable API to create query definitions to retrieve documents
 * from a Cozy. `QueryDefinition`s are sent to links.
 *
 * @augments {object}
 */
var QueryDefinition = /*#__PURE__*/function () {
  /**
   * @class
   *
   * @param {object} options Initial options for the query definition
   * @param  {import('../types').Doctype} [options.doctype] - The doctype of the doc.
   * @param {import('../types').DocId|null} [options.id] - The id of the doc.
   * @param {Array<import('../types').DocId>} [options.ids] - The ids of the docs.
   * @param {MangoSelector} [options.selector] - The selector to query the docs.
   * @param {Array<string>} [options.fields] - The fields to return.
   * @param {Array<string>} [options.indexedFields] - The fields to index.
   * @param {MangoPartialFilter} [options.partialFilter] - The partial index definition to filter docs.
   * @param {Array<object>} [options.sort] - The sorting params.
   * @param {Array<string>} [options.includes] - The docs to include.
   * @param {string|null} [options.referenced] - The referenced document.
   * @param {number|null} [options.limit] - The document's limit to return.
   * @param {number|null} [options.skip] - The number of docs to skip.
   * @param {import('../types').CouchDBViewCursor} [options.cursor] - The cursor to paginate views.
   * @param {string} [options.bookmark] - The bookmark to paginate mango queries.
   */
  function QueryDefinition() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, QueryDefinition);
    this.doctype = options.doctype;
    this.id = options.id;
    this.ids = options.ids;
    this.selector = options.selector;
    this.fields = options.fields;
    this.indexedFields = options.indexedFields;
    this.partialFilter = options.partialFilter;
    this.sort = options.sort;
    this.includes = options.includes;
    this.referenced = options.referenced;
    this.limit = options.limit;
    this.skip = options.skip;
    this.cursor = options.cursor;
    this.bookmark = options.bookmark;
  }
  /**
   * Checks if the sort order matches the index' fields order.
   *
   * When sorting with CouchDB, it is required to:
   * - use indexed fields
   * - keep the same order than the indexed fields.
   *
   * See https://docs.cozy.io/en/tutorials/data/queries/#sort-data-with-mango
   *
   * @param {PartialQueryDefinition} obj - A partial QueryDefinition to check
   */


  (0, _createClass2.default)(QueryDefinition, [{
    key: "checkSortOrder",
    value: function checkSortOrder(_ref) {
      var sort = _ref.sort,
          selector = _ref.selector,
          indexedFields = _ref.indexedFields;

      var _sort = this.sort || sort;

      var _selector = this.selector || selector || {};

      var _indexedFields = this.indexedFields || indexedFields;

      if (!_sort) {
        return;
      }

      var fieldsToIndex = _indexedFields || Object.keys(_selector);

      if (!fieldsToIndex || fieldsToIndex.length < 1) {
        return;
      }

      if (_sort.length > fieldsToIndex.length) {
        _logger.default.warn("You should not sort on non-indexed fields.\n\n        Sort: ".concat(JSON.stringify(_sort), "\n\n        Indexed fields: ").concat(fieldsToIndex));

        return;
      }

      for (var i = 0; i < _sort.length; i++) {
        if (Object.keys(_sort[i])[0] !== fieldsToIndex[i]) {
          _logger.default.warn("The sort order should be the same than the indexed fields.\n\n          Sort: ".concat(JSON.stringify(_sort), "\n\n          Indexed fields: ").concat(fieldsToIndex, "\n"));

          return;
        }
      }
    }
    /**
     * Checks the selector predicates.
     *
     * It is useful to warn the developer when a partial index might be used.
     *
     * @param {MangoSelector} selector - The selector definition
     * @returns {void}
     */

  }, {
    key: "checkSelector",
    value: function checkSelector(selector) {
      var hasExistsFalse = (0, _findKey.default)(selector, ['$exists', false]);

      if (hasExistsFalse) {
        _logger.default.warn("The \"$exists: false\" predicate should be defined as a partial index for better performance.\n\n        Selector: ".concat(JSON.stringify(selector)));
      }

      var hasNe = (0, _findKey.default)(selector, '$ne');

      if (hasNe) {
        _logger.default.info("The use of the $ne operator is more efficient with a partial index.\n\n        Selector: ".concat(JSON.stringify(selector)));
      }

      var nestedArrayKey = (0, _findKey.default)(selector, function (value) {
        return Array.isArray(value);
      });
      var hasNestedArrayWithoutOperator = nestedArrayKey && !nestedArrayKey.startsWith('$');

      if (hasNestedArrayWithoutOperator) {
        throw new Error("You pass ".concat(JSON.stringify(selector), ", this is a valid mango operation, \n\n        but sift doesn't support it so CozyClient can not evaluate \n\n        the request in memory. You must use a MongoDB operator \n\n        like $in or $or operator instead, preferably in a partial index, \n\n        to avoid costly full-scan"));
      }
    }
    /**
     * Check if the selected fields are all included in the selectors
     *
     * @param {PartialQueryDefinition} obj - A partial QueryDefinition to check
     */

  }, {
    key: "checkSelectFields",
    value: function checkSelectFields(_ref2) {
      var fields = _ref2.fields,
          selector = _ref2.selector,
          partialFilter = _ref2.partialFilter;

      var _fields = this.fields || fields;

      var _selector = this.selector || selector;

      var _partialFilter = this.partialFilter || partialFilter;

      if (!_fields || !_selector && !_partialFilter) {
        return;
      }

      var mergedSelector = _objectSpread(_objectSpread({}, _selector), _partialFilter);

      var selectorAttributes = Object.keys(mergedSelector);
      var hasEveryFieldsInSelector = selectorAttributes.every(function (attribute) {
        return _fields.includes(attribute);
      });

      if (!hasEveryFieldsInSelector) {
        throw new Error("The .select should includes all the fields used in where or partialIndex.\n        Please fix this query: fields: ".concat(JSON.stringify(this.toDefinition())));
      }

      return;
    }
    /**
     * Query a single document on its id.
     *
     * @param {string} id   The document id.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */

  }, {
    key: "getById",
    value: function getById(id) {
      if (!id) {
        throw new Error('getById called with undefined id');
      }

      return new QueryDefinition(_objectSpread(_objectSpread({}, this.toDefinition()), {}, {
        id: id
      }));
    }
    /**
     * Query several documents on their ids.
     *
     * @param {Array} ids   The documents ids.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */

  }, {
    key: "getByIds",
    value: function getByIds(ids) {
      return new QueryDefinition(_objectSpread(_objectSpread({}, this.toDefinition()), {}, {
        ids: ids
      }));
    }
    /**
     * Query documents with a [mango selector](http://docs.couchdb.org/en/latest/api/database/find.html#find-selectors).
     * Each field passed in the selector will be indexed, except if the indexField option is used.
     *
     * @param {MangoSelector} selector   The Mango selector.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */

  }, {
    key: "where",
    value: function where(selector) {
      this.checkSortOrder({
        selector: selector
      });
      this.checkSelector(selector);
      this.checkSelectFields({
        selector: selector
      });
      return new QueryDefinition(_objectSpread(_objectSpread({}, this.toDefinition()), {}, {
        selector: selector
      }));
    }
    /**
     * Specify which fields of each object should be returned. If it is omitted, the entire object is returned.
     *
     * @param {Array} fields The fields to return.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */

  }, {
    key: "select",
    value: function select(fields) {
      this.checkSelectFields({
        fields: fields
      });
      return new QueryDefinition(_objectSpread(_objectSpread({}, this.toDefinition()), {}, {
        fields: fields
      }));
    }
    /**
     * Specify which fields should be indexed. This prevent the automatic indexing of the mango fields.
     *
     * @param {Array} indexedFields The fields to index.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */

  }, {
    key: "indexFields",
    value: function indexFields(indexedFields) {
      this.checkSortOrder({
        indexedFields: indexedFields
      });
      return new QueryDefinition(_objectSpread(_objectSpread({}, this.toDefinition()), {}, {
        indexedFields: indexedFields
      }));
    }
    /**
     * Specify a [partial index](https://docs.couchdb.org/en/stable/api/database/find.html#find-partial-indexes).
     * The filter must follow the same syntax than the selector.
     *
     * A partial index includes a filter, used to select documents before the indexing.
     * You can find more information about partial indexes [here](https://docs.cozy.io/en/tutorials/data/advanced/#partial-indexes)
     *
     * @param {object} partialFilter - The filter definition.
     */

  }, {
    key: "partialIndex",
    value: function partialIndex(partialFilter) {
      this.checkSelectFields({
        partialFilter: partialFilter
      });
      return new QueryDefinition(_objectSpread(_objectSpread({}, this.toDefinition()), {}, {
        partialFilter: partialFilter
      }));
    }
    /**
     * Specify how to sort documents, following the [sort syntax](http://docs.couchdb.org/en/latest/api/database/find.html#find-sort)
     *
     * @param {Array} sort The list of field name and direction pairs.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */

  }, {
    key: "sortBy",
    value: function sortBy(sort) {
      if (!Array.isArray(sort)) {
        throw new Error("Invalid sort, should be an array ([{ label: \"desc\"}, { name: \"asc\"}]), you passed ".concat(JSON.stringify(sort), "."));
      }

      this.checkSortOrder({
        sort: sort
      });
      return new QueryDefinition(_objectSpread(_objectSpread({}, this.toDefinition()), {}, {
        sort: sort
      }));
    }
    /**
     * Includes documents having a relationships with the ones queried.
     * For example, query albums including the photos.
     *
     * @param {Array} includes The documents to include.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */

  }, {
    key: "include",
    value: function include(includes) {
      if (!Array.isArray(includes)) {
        throw new Error('include() takes an array of relationship names');
      }

      return new QueryDefinition(_objectSpread(_objectSpread({}, this.toDefinition()), {}, {
        includes: includes
      }));
    }
    /**
     * Maximum number of documents returned, useful for pagination. Default is 100.
     *
     * @param {number|null} limit The document's limit.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */

  }, {
    key: "limitBy",
    value: function limitBy(limit) {
      return new QueryDefinition(_objectSpread(_objectSpread({}, this.toDefinition()), {}, {
        limit: limit
      }));
    }
  }, {
    key: "UNSAFE_noLimit",
    value: function UNSAFE_noLimit() {
      return new QueryDefinition(_objectSpread(_objectSpread({}, this.toDefinition()), {}, {
        limit: null
      }));
    }
    /**
     * Skip the first ‘n’ documents, where ‘n’ is the value specified.
     *
     * Beware, this [performs badly](http://docs.couchdb.org/en/stable/ddocs/views/pagination.html#paging-alternate-method) on view's index.
     *  Prefer cursor-based pagination in such situation.
     *
     * @param {number} skip The number of documents to skip.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */

  }, {
    key: "offset",
    value: function offset(skip) {
      return new QueryDefinition(_objectSpread(_objectSpread({}, this.toDefinition()), {}, {
        bookmark: undefined,
        cursor: undefined,
        skip: skip
      }));
    }
    /**
     * Use [cursor-based](https://docs.cozy.io/en/cozy-stack/jsonapi/#pagination) pagination.
     * *Warning*: this is only useful for views.
     * The cursor is a [startkey, startkey_docid] array, where startkey is the view's key,
     * e.g. ["io.cozy.photos.albums", "album-id"] and startkey_docid is the id of
     * the starting document of the query, e.g. "file-id".
     * Use the last docid of each query as startkey_docid to paginate or leave blank for the first query.
     *
     * @param {import('../types').CouchDBViewCursor} cursor The cursor for pagination.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */

  }, {
    key: "offsetCursor",
    value: function offsetCursor(cursor) {
      return new QueryDefinition(_objectSpread(_objectSpread({}, this.toDefinition()), {}, {
        bookmark: undefined,
        skip: undefined,
        cursor: cursor
      }));
    }
    /**
     * Use [bookmark](https://docs.couchdb.org/en/2.2.0/api/database/find.html#pagination) pagination.
     * Note this only applies for mango-queries (not views) and is way more efficient than skip pagination.
     * The bookmark is a string returned by the _find response and can be seen as a pointer in
     * the index for the next query.
     *
     * @param {string} bookmark The bookmark to continue a previous paginated query.
     * @returns {QueryDefinition}  The QueryDefinition object.
     */

  }, {
    key: "offsetBookmark",
    value: function offsetBookmark(bookmark) {
      return new QueryDefinition(_objectSpread(_objectSpread({}, this.toDefinition()), {}, {
        skip: undefined,
        cursor: undefined,
        bookmark: bookmark
      }));
    }
    /**
     * Use the [file reference system](https://docs.cozy.io/en/cozy-stack/references-docs-in-vfs/)
     *
     * @param {object} document The reference document
     * @returns {QueryDefinition}  The QueryDefinition object.
     */

  }, {
    key: "referencedBy",
    value: function referencedBy(document) {
      return new QueryDefinition(_objectSpread(_objectSpread({}, this.toDefinition()), {}, {
        referenced: document
      }));
    }
  }, {
    key: "toDefinition",
    value: function toDefinition() {
      return {
        doctype: this.doctype,
        id: this.id,
        ids: this.ids,
        selector: this.selector,
        fields: this.fields,
        indexedFields: this.indexedFields,
        partialFilter: this.partialFilter,
        sort: this.sort,
        includes: this.includes,
        referenced: this.referenced,
        limit: this.limit,
        skip: this.skip,
        cursor: this.cursor,
        bookmark: this.bookmark
      };
    }
  }]);
  return QueryDefinition;
}();
/**
 * Helper to create a QueryDefinition. Recommended way to create
 * query definitions.
 *
 * @param {import('../types').Doctype} doctype - Doctype of the query definition
 *
 * @example
 * ```
 * import { Q } from 'cozy-client'
 *
 * const qDef = Q('io.cozy.todos').where({ _id: '1234' })
 * ```
 */


exports.QueryDefinition = QueryDefinition;

var Q = function Q(doctype) {
  return new QueryDefinition({
    doctype: doctype
  });
};
/**
 * Check if the query is a getById() query
 *
 * @param {QueryDefinition} queryDefinition The query definition
 *
 * @returns {boolean}
 */


exports.Q = Q;

var isAGetByIdQuery = function isAGetByIdQuery(queryDefinition) {
  if (!queryDefinition) return false;
  var attributes = Object.values(queryDefinition);
  if (attributes.length === 0) return false; // 2 attrs because we check if id and doctype are not undefined

  return attributes.filter(function (attr) {
    return attr !== undefined;
  }).length === 2 && queryDefinition.id !== undefined;
}; // Mutations


exports.isAGetByIdQuery = isAGetByIdQuery;
var CREATE_DOCUMENT = 'CREATE_DOCUMENT';
var UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
var UPDATE_DOCUMENTS = 'UPDATE_DOCUMENTS';
var DELETE_DOCUMENT = 'DELETE_DOCUMENT';
var ADD_REFERENCES_TO = 'ADD_REFERENCES_TO';
var REMOVE_REFERENCES_TO = 'REMOVE_REFERENCES_TO';
var ADD_REFERENCED_BY = 'ADD_REFERENCED_BY';
var REMOVE_REFERENCED_BY = 'REMOVE_REFERENCED_BY';
var UPLOAD_FILE = 'UPLOAD_FILE';

var createDocument = function createDocument(document) {
  return {
    mutationType: MutationTypes.CREATE_DOCUMENT,
    document: document
  };
};

exports.createDocument = createDocument;

var updateDocument = function updateDocument(document) {
  return {
    mutationType: MutationTypes.UPDATE_DOCUMENT,
    document: document
  };
};

exports.updateDocument = updateDocument;

var updateDocuments = function updateDocuments(documents) {
  return {
    mutationType: MutationTypes.UPDATE_DOCUMENTS,
    documents: documents
  };
};

exports.updateDocuments = updateDocuments;

var deleteDocument = function deleteDocument(document) {
  return {
    mutationType: MutationTypes.DELETE_DOCUMENT,
    document: document
  };
};

exports.deleteDocument = deleteDocument;

var addReferencesTo = function addReferencesTo(document, referencedDocuments) {
  return {
    mutationType: MutationTypes.ADD_REFERENCES_TO,
    referencedDocuments: referencedDocuments,
    document: document
  };
};

exports.addReferencesTo = addReferencesTo;

var removeReferencesTo = function removeReferencesTo(document, referencedDocuments) {
  return {
    mutationType: MutationTypes.REMOVE_REFERENCES_TO,
    referencedDocuments: referencedDocuments,
    document: document
  };
};

exports.removeReferencesTo = removeReferencesTo;

var addReferencedBy = function addReferencedBy(document, referencedDocuments) {
  return {
    mutationType: MutationTypes.ADD_REFERENCED_BY,
    referencedDocuments: referencedDocuments,
    document: document
  };
};

exports.addReferencedBy = addReferencedBy;

var removeReferencedBy = function removeReferencedBy(document, referencedDocuments) {
  return {
    mutationType: MutationTypes.REMOVE_REFERENCED_BY,
    referencedDocuments: referencedDocuments,
    document: document
  };
};

exports.removeReferencedBy = removeReferencedBy;

var uploadFile = function uploadFile(file, dirPath) {
  return {
    mutationType: MutationTypes.UPLOAD_FILE,
    file: file,
    dirPath: dirPath
  };
};

exports.uploadFile = uploadFile;

var getDoctypeFromOperation = function getDoctypeFromOperation(operation) {
  if (operation.mutationType) {
    var type = operation.mutationType;

    switch (type) {
      case CREATE_DOCUMENT:
        return operation.document._type;

      case UPDATE_DOCUMENT:
        return operation.document._type;

      case UPDATE_DOCUMENTS:
        return operation.documents[0]._type;

      case DELETE_DOCUMENT:
        return operation.document._type;

      case ADD_REFERENCES_TO:
        throw new Error('Not implemented');

      case UPLOAD_FILE:
        throw new Error('Not implemented');

      default:
        throw new Error("Unknown mutationType ".concat(type));
    }
  } else {
    return operation.doctype;
  }
};

exports.getDoctypeFromOperation = getDoctypeFromOperation;
var Mutations = {
  createDocument: createDocument,
  updateDocument: updateDocument,
  updateDocuments: updateDocuments,
  deleteDocument: deleteDocument,
  addReferencesTo: addReferencesTo,
  removeReferencesTo: removeReferencesTo,
  addReferencedBy: addReferencedBy,
  removeReferencedBy: removeReferencedBy,
  uploadFile: uploadFile
};
exports.Mutations = Mutations;
var MutationTypes = {
  CREATE_DOCUMENT: CREATE_DOCUMENT,
  UPDATE_DOCUMENT: UPDATE_DOCUMENT,
  UPDATE_DOCUMENTS: UPDATE_DOCUMENTS,
  DELETE_DOCUMENT: DELETE_DOCUMENT,
  ADD_REFERENCES_TO: ADD_REFERENCES_TO,
  REMOVE_REFERENCES_TO: REMOVE_REFERENCES_TO,
  ADD_REFERENCED_BY: ADD_REFERENCED_BY,
  REMOVE_REFERENCED_BY: REMOVE_REFERENCED_BY,
  UPLOAD_FILE: UPLOAD_FILE
};
exports.MutationTypes = MutationTypes;