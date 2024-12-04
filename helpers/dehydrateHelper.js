"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dehydrate = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _associations = require("../associations");

var dehydrate = function dehydrate(document) {
  var dehydrated = Object.entries(document).reduce(function (documentArg, _ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    var document = documentArg;

    if (!(value instanceof _associations.Association)) {
      document[key] = value; // @ts-ignore
    } else if (value.dehydrate) {
      // @ts-ignore
      document = value.dehydrate(document);
    } else {
      throw new Error("Association on key ".concat(key, " should have a dehydrate method"));
    }

    return document;
  }, {});
  return dehydrated;
};

exports.dehydrate = dehydrate;