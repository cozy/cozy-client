"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.receiveMutationError = exports.receiveMutationResult = exports.initMutation = exports.isReceivingMutationResult = exports.isMutationAction = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var INIT_MUTATION = 'INIT_MUTATION';
var RECEIVE_MUTATION_RESULT = 'RECEIVE_MUTATION_RESULT';
var RECEIVE_MUTATION_ERROR = 'RECEIVE_MUTATION_ERROR';

var isMutationAction = function isMutationAction(action) {
  return [INIT_MUTATION, RECEIVE_MUTATION_RESULT, RECEIVE_MUTATION_ERROR].indexOf(action.type) !== -1;
};

exports.isMutationAction = isMutationAction;

var isReceivingMutationResult = function isReceivingMutationResult(action) {
  return action.type === RECEIVE_MUTATION_RESULT;
}; // actions


exports.isReceivingMutationResult = isReceivingMutationResult;

var initMutation = function initMutation(mutationId, definition) {
  return {
    type: INIT_MUTATION,
    mutationId: mutationId,
    definition: definition
  };
};

exports.initMutation = initMutation;

var receiveMutationResult = function receiveMutationResult(mutationId, response) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var definition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return _objectSpread(_objectSpread({
    type: RECEIVE_MUTATION_RESULT,
    mutationId: mutationId,
    response: response
  }, options), {}, {
    definition: definition
  });
};

exports.receiveMutationResult = receiveMutationResult;

var receiveMutationError = function receiveMutationError(mutationId, error) {
  var definition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return {
    type: RECEIVE_MUTATION_ERROR,
    mutationId: mutationId,
    error: error,
    definition: definition
  };
};

exports.receiveMutationError = receiveMutationError;