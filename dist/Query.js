"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.computeChildrenArgs = exports.getQueryAttributes = exports.default = exports.fetchQuery = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = require("react");

var _CozyClient = _interopRequireDefault(require("./CozyClient"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ObservableQuery = _interopRequireDefault(require("./ObservableQuery"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var dummyState = {}; // Need to have this since Query and ObservableQuery might come from
// two different incompatible versions of cozy-client. This is kept
// for backward compatibility

var fetchQuery = function fetchQuery(client, query) {
  if (query.fetch) {
    return query.fetch();
  } else {
    return client.query(query.definition, {
      as: query.queryId
    });
  }
};
/**
 * Get attributes that will be assigned to the instance of a Query
 */


exports.fetchQuery = fetchQuery;

var getQueryAttributes = function getQueryAttributes(client, props) {
  // Methods bound to the client
  var createDocument = client.create.bind(client);
  var saveDocument = client.save.bind(client);
  var deleteDocument = client.destroy.bind(client);
  var getAssociation = client.getAssociation.bind(client); // Methods on ObservableQuery

  var queryDefinition = typeof props.query === 'function' ? props.query(client, props) : props.query;
  var observableQuery = client.makeObservableQuery(queryDefinition, props);
  var fetchMore = observableQuery.fetchMore.bind(observableQuery); // Mutations

  var propMutations = props.mutations,
      rest = (0, _objectWithoutProperties2.default)(props, ["mutations"]);
  var mutations = typeof propMutations === 'function' ? propMutations(client, observableQuery, rest) : propMutations; // If the query comes from a CozyClient that it too old, which may happen
  // in the bar, we do not have query.fetch

  var fetch = observableQuery.fetch ? observableQuery.fetch.bind(observableQuery) : null;
  return {
    client: client,
    observableQuery: observableQuery,
    queryDefinition: queryDefinition,
    createDocument: createDocument,
    saveDocument: saveDocument,
    deleteDocument: deleteDocument,
    getAssociation: getAssociation,
    fetchMore: fetchMore,
    fetch: fetch,
    mutations: mutations
  };
};

exports.getQueryAttributes = getQueryAttributes;

var computeChildrenArgs = function computeChildrenArgs(queryAttributes) {
  var observableQuery = queryAttributes.observableQuery,
      fetchMore = queryAttributes.fetchMore,
      fetch = queryAttributes.fetch,
      createDocument = queryAttributes.createDocument,
      saveDocument = queryAttributes.saveDocument,
      deleteDocument = queryAttributes.deleteDocument,
      getAssociation = queryAttributes.getAssociation,
      mutations = queryAttributes.mutations;
  return [_objectSpread({
    fetchMore: fetchMore,
    fetch: fetch
  }, observableQuery.currentResult()), _objectSpread({
    createDocument: createDocument,
    saveDocument: saveDocument,
    deleteDocument: deleteDocument,
    getAssociation: getAssociation
  }, mutations)];
};

exports.computeChildrenArgs = computeChildrenArgs;

var Query = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Query, _Component);

  var _super = _createSuper(Query);

  function Query(props, context) {
    var _this;

    (0, _classCallCheck2.default)(this, Query);
    _this = _super.call(this, props, context);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onQueryChange", function () {
      _this.recomputeChildrenArgs();

      _this.setState(dummyState);
    });
    var client = context.client;

    if (!context.client) {
      throw new Error('Query should be used with client in context (use CozyProvider to set context)');
    }
    /**
     * Current client
     *
     * @type {CozyClient}
     */


    _this.client = client;
    /**
     * Observable query to connect store to query
     *
     * @type {ObservableQuery}
     */

    _this.observableQuery = null;
    /**
     * Callback to unsubscribe from observable query
     *
     * @type {Function}
     */

    _this.queryUnsubscribe = null;
    Object.assign((0, _assertThisInitialized2.default)(_this), getQueryAttributes(client, props));

    _this.recomputeChildrenArgs();

    return _this;
  }

  (0, _createClass2.default)(Query, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.queryUnsubscribe = this.observableQuery.subscribe(this.onQueryChange);

      if (this.props.enabled !== false) {
        this.executeQueryRespectingFetchPolicy();
      }
    }
  }, {
    key: "executeQueryRespectingFetchPolicy",
    value: function executeQueryRespectingFetchPolicy() {
      if (this.props.fetchPolicy) {
        var queryState = this.client.getQueryFromState(this.props.as);

        if (this.props.fetchPolicy && typeof this.props.fetchPolicy === 'function' && this.props.fetchPolicy(queryState)) {
          fetchQuery(this.client, this.observableQuery);
        }
      } else {
        fetchQuery(this.client, this.observableQuery);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.enabled === false && this.props.enabled !== false) {
        this.executeQueryRespectingFetchPolicy();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.queryUnsubscribe) {
        this.queryUnsubscribe();
      }
    }
  }, {
    key: "recomputeChildrenArgs",
    value: function recomputeChildrenArgs() {
      this.childrenArgs = computeChildrenArgs(this);
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children; // @ts-ignore

      return children(this.childrenArgs[0], this.childrenArgs[1]);
    }
  }]);
  return Query;
}(_react.Component);

exports.default = Query;
Query.contextTypes = {
  client: _propTypes.default.object,
  store: _propTypes.default.object
};
var queryPropType = _propTypes.default.object;
Query.propTypes = {
  /** Query definition that will be executed and observed */
  query: _propTypes.default.oneOfType([_propTypes.default.func, queryPropType]).isRequired,

  /** If set to false, query won't be executed */
  enabled: _propTypes.default.bool,

  /** Name of the query */
  as: _propTypes.default.string,

  /** Function called with the data from the query */
  children: _propTypes.default.func.isRequired,

  /**
   * Decides if the query is fetched at mount time. If not present
   * the query is always fetched at mount time. Receives the current
   * state of the query from the store as 1st argument.
   *
   * @example
   * If you want to only fetch queries that are older than 30 seconds:
   
   * ```js
   * const cache30s = ({ lastUpdate }) => {
   *   return !lastUpdate || (Date.now() - 30 * 1000 > lastUpdate)
   * }
   * <Query fetchPolicy={cache30s} ... />
   * ```
   */
  fetchPolicy: _propTypes.default.func
};
Query.defaultProps = {
  enabled: true
};