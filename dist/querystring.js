"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildURL = exports.encode = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _pickBy = _interopRequireDefault(require("lodash/pickBy"));

/**
 * Encode a value of any type into a URI search param compatible string with a specific treatment for arrays which will keep their brackets (they do not with standard `toString()` method).
 *
 * Examples:
 *
 *   encodeValues([['io.cozy.files', 'abcd1234'], '12345'])
 *   // → '[[%22io.cozy.files%22,%22abcd1234%22],%2212345%22]'
 *
 *   encodeValues([['io.cozy.files', 'abcd1234'], '12345'].toString(), true)
 *   // → '%22io.cozy.files%2Cabcd1234%2C12345%22'
 *
 *   encodeValues([['io.cozy.files', 'abcd1234'], '12345'].toString(), false)
 *   // → 'io.cozy.files%2Cabcd1234%2C12345'
 *
 *   encodeValues('[1234]')
 *   // → %5B1234%5D
 *
 * @function
 * @private
 */
var encodeValues = function encodeValues(values) {
  var fromArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (Array.isArray(values)) {
    return '[' + values.map(function (v) {
      return encodeValues(v, true);
    }).join(',') + ']';
  }

  return fromArray ? encodeURIComponent("\"".concat(values, "\"")) : encodeURIComponent(values);
};
/**
 * Encode an object as querystring, values are encoded as
 * URI components, keys are not.
 *
 * @function
 * @private
 */


var encode = function encode(data) {
  return Object.entries(data).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    var encodedValue = encodeValues(v);
    return "".concat(k, "=").concat(encodedValue);
  }).join('&');
};
/**
 * Returns a URL from base url and a query parameter object.
 * Any undefined parameter is removed.
 *
 * @function
 * @private
 */


exports.encode = encode;

var buildURL = function buildURL(url, params) {
  var qs = encode((0, _pickBy.default)(params));

  if (qs) {
    return "".concat(url, "?").concat(qs);
  } else {
    return url;
  }
};

exports.buildURL = buildURL;