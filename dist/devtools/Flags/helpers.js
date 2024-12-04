"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isJSONString = exports.computeFlags = exports.makeHumanValue = void 0;

var _cozyFlags = _interopRequireDefault(require("cozy-flags"));

var human = function human(name) {
  return name.replace(/[a-z][A-Z]/g, function (str) {
    return str[0] + ' ' + str[1].toLowerCase();
  });
};

var makeHumanValue = function makeHumanValue(value) {
  return typeof value === 'object' ? JSON.stringify(value) : value.toString();
};

exports.makeHumanValue = makeHumanValue;

var computeFlags = function computeFlags() {
  return _cozyFlags.default.list().map(function (name) {
    var value = (0, _cozyFlags.default)(name);
    return {
      key: "flag__".concat(name),
      name: name,
      type: typeof value,
      humanName: human(name),
      value: value,
      humanValue: makeHumanValue(value)
    };
  });
};

exports.computeFlags = computeFlags;

var isJSONString = function isJSONString(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

exports.isJSONString = isJSONString;