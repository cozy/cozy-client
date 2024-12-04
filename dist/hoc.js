"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryConnectFlat = exports.queryConnect = exports.withClient = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _flowRight = _interopRequireDefault(require("lodash/flowRight"));

var _Query = _interopRequireDefault(require("./Query"));

var _useClient = _interopRequireDefault(require("./hooks/useClient"));

var _useQuery = require("./hooks/useQuery");

var _logger = _interopRequireDefault(require("./logger"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * @function
 * @description HOC to provide client from context as prop
 *
 * @param  {Component} WrappedComponent - wrapped component
 * @returns {Function} - Component that will receive client as prop
 */
var withClient = function withClient(WrappedComponent) {
  var Wrapped = function Wrapped(props) {
    var client = (0, _useClient.default)(); // @ts-ignore

    return /*#__PURE__*/_react.default.createElement(WrappedComponent, (0, _extends2.default)({}, props, {
      client: client
    }));
  }; // @ts-ignore


  Wrapped.displayName = "withClient(".concat(WrappedComponent.displayName || // @ts-ignore
  WrappedComponent.name, ")");
  return Wrapped;
};

exports.withClient = withClient;

var withQuery = function withQuery(dest, queryOpts, Original) {
  if (!queryOpts) {
    throw new Error("withQuery has no options for ".concat(dest, " (wrapping ").concat(Original.name, ")"));
  }

  return function (Component) {
    var Wrapper = function Wrapper(props, context) {
      if (!context.client) {
        throw new Error('Should be used with client in context (use CozyProvider to set context)');
      }

      var queryOptsRes = typeof queryOpts === 'function' ? queryOpts(props) : queryOpts;

      if (queryOpts.doc) {
        _logger.default.warn('queryOpts.doc is deprecated');

        return /*#__PURE__*/_react.default.createElement(Component, _objectSpread((0, _defineProperty2.default)({}, dest, queryOptsRes.doc), props));
      }

      return /*#__PURE__*/_react.default.createElement(_Query.default, queryOptsRes, function (result) {
        return /*#__PURE__*/_react.default.createElement(Component, _objectSpread((0, _defineProperty2.default)({}, dest, result), props));
      });
    };

    Wrapper.contextTypes = {
      client: _propTypes.default.object
    };
    Wrapper.displayName = "withQuery(".concat(Component.displayName || Component.name, ")");
    return Wrapper;
  };
};
/**
 * @function
 * @description HOC creator to connect component to several queries in a declarative manner
 *
 * @param  {object} querySpecs - Definition of the queries
 * @returns {Function} - HOC to apply to a component
 */


var queryConnect = function queryConnect(querySpecs) {
  return function (Component) {
    var enhancers = Object.keys(querySpecs).map(function (dest) {
      return withQuery(dest, querySpecs[dest], Component);
    });
    return _flowRight.default.apply(null, enhancers)(Component);
  };
};
/**
 * @function
 * @description HOC creator to connect component to several queries in a declarative manner
 * The only difference with queryConnect is that it does not wrap the component in N component
 * if there are N queries, only 1 extra level of nesting is introduced.
 *
 * @param  {object} querySpecs - Definition of the queries
 * @returns {Function} - HOC to apply to a component
 */


exports.queryConnect = queryConnect;

var queryConnectFlat = function queryConnectFlat(querySpecs) {
  return function (Component) {
    var Wrapper = function Wrapper(props) {
      var queryResults = (0, _useQuery.useQueries)(querySpecs);
      return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, props, queryResults));
    };

    Wrapper.displayName = "queryConnectFlat(".concat(Component.displayName || Component.name, ")");
    return Wrapper;
  };
};

exports.queryConnectFlat = queryConnectFlat;