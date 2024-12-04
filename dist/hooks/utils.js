"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equalityCheckForQuery = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Equality check
 *
 * Note we do not make a shallow equality check on documents, as it is less efficient and should
 * not be necessary: the queryResult.data is built by extracting documents from the state, thus
 * preserving references.
 *
 * @param {*} queryResA
 * @param {*} queryResB
 * @returns
 */
var equalityCheckForQuery = function equalityCheckForQuery(queryResA, queryResB) {
  //console.log('Call equality check : ', queryResA, queryResB)
  if (queryResA === queryResB) {
    // Referential equality
    return true;
  }

  if (typeof queryResA !== 'object' || queryResA === null || typeof queryResB !== 'object' || queryResB === null) {
    // queryResA or queryResB is not an object or null
    return false;
  }

  if (queryResA.id !== queryResB.id) {
    return false;
  }

  if (queryResA.fetchStatus !== queryResB.fetchStatus) {
    return false;
  }

  var docsA = queryResA.storeData;
  var docsB = queryResB.storeData;

  if (!docsA || !docsB) {
    // No data to check
    return false;
  }

  if (docsA.length !== docsB.length) {
    // A document was added or removed
    return false;
  }

  for (var i = 0; i < docsA.length; i++) {
    if (docsA[i] !== docsB[i]) {
      // References should be the same for non-updated documents
      return false;
    }
  }

  if (queryResA.relationshipNames) {
    var hydratedA = queryResA.data;
    var hydratedB = queryResB.data;

    if (hydratedA.length !== hydratedB.length) {
      return false;
    }

    for (var _i = 0; _i < hydratedA.length; _i++) {
      var _iterator = _createForOfIteratorHelper(queryResA.relationshipNames),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var name = _step.value;

          if (hydratedA[_i][name] && hydratedB[_i][name]) {
            var includedA = hydratedA[_i][name];
            var includedB = hydratedB[_i][name];

            if (includedA._rev && includedB._rev && includedA._rev !== includedB._rev) {
              return false;
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  } //console.log('docs are same')


  return true;
};

exports.equalityCheckForQuery = equalityCheckForQuery;