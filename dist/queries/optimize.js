"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _groupBy2 = _interopRequireDefault(require("lodash/groupBy"));

var _flatten = _interopRequireDefault(require("lodash/flatten"));

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _uniq = _interopRequireDefault(require("lodash/uniq"));

var _uniqWith = _interopRequireDefault(require("lodash/uniqWith"));

var _dsl = require("./dsl");

var isIdQuery = function isIdQuery(query) {
  return query.id || query.ids;
};
/**
 * Optimize queries on a single doctype
 *
 * @param  {QueryDefinition[]} queries - Queries of a same doctype
 * @returns {QueryDefinition[]} Optimized queries
 * @private
 */


var optimizeDoctypeQueries = function optimizeDoctypeQueries(queries) {
  var _groupBy = (0, _groupBy2.default)(queries, function (q) {
    return isIdQuery(q) ? 'idQueries' : 'others';
  }),
      _groupBy$idQueries = _groupBy.idQueries,
      idQueries = _groupBy$idQueries === void 0 ? [] : _groupBy$idQueries,
      _groupBy$others = _groupBy.others,
      others = _groupBy$others === void 0 ? [] : _groupBy$others;

  var groupedIdQueries = idQueries.length > 0 ? new _dsl.QueryDefinition({
    doctype: queries[0].doctype,
    ids: (0, _uniq.default)((0, _flatten.default)(idQueries.map(function (q) {
      return q.id || q.ids;
    })))
  }) : []; // Deduplicate before concataining

  return (0, _uniqWith.default)(others, _isEqual.default).concat(groupedIdQueries);
};
/**
 * Reduce the number of queries used to fetch documents.
 *
 * - Deduplication of queries
 * - Groups id queries
 *
 * @param  {QueryDefinition[]} queries - Queries to optimized
 * @returns {QueryDefinition[]} Optimized queries
 * @private
 */


var optimizeQueries = function optimizeQueries(queries) {
  var byDoctype = (0, _groupBy2.default)(queries, function (q) {
    return q.doctype;
  });
  return (0, _flatten.default)(Object.values((0, _mapValues.default)(byDoctype, optimizeDoctypeQueries)));
};

var _default = optimizeQueries;
exports.default = _default;