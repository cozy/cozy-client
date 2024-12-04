"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _sortBy = _interopRequireDefault(require("lodash/sortBy"));

var _overEvery = _interopRequireDefault(require("lodash/overEvery"));

var _get = _interopRequireDefault(require("lodash/get"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _reactRedux = require("react-redux");

var _reactInspector = require("react-inspector");

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableContainer = _interopRequireDefault(require("@material-ui/core/TableContainer"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _styles = require("@material-ui/core/styles");

var _Typography = _interopRequireDefault(require("cozy-ui/transpiled/react/Typography"));

var _ListItem = _interopRequireDefault(require("cozy-ui/transpiled/react/ListItem"));

var _ListItemText = _interopRequireDefault(require("cozy-ui/transpiled/react/ListItemText"));

var _context = _interopRequireDefault(require("../context"));

var _useClient = _interopRequireDefault(require("../hooks/useClient"));

var _common = require("./common");

var _PanelContent = _interopRequireDefault(require("./PanelContent"));

/**
 * @type {Object.<string, React.CSSProperties>}
 * @private
 */
var styles = {
  panelRight: {
    height: '100%',
    overflow: 'scroll',
    flexGrow: 1
  },
  mono: {
    fontFamily: 'monospace'
  },
  input: {
    width: 400
  }
};
var TableCell = (0, _styles.withStyles)({
  root: {
    fontFamily: 'inherit',
    fontSize: 'small'
  }
})(_TableCell.default);

var getClassNameForExecutedTimesQuery = function getClassNameForExecutedTimesQuery(time) {
  if (time <= 100) {
    return 'u-valid u-success';
  } else if (time > 100 && time < 250) {
    return 'u-warn u-warning';
  } else {
    return 'u-danger u-error';
  }
};
/**
 * @param  {{ queryState: import("../types").QueryState }} props - Query state containing fetchStatus, lastError
 */


var FetchStatus = function FetchStatus(props) {
  var queryState = props.queryState;
  var fetchStatus = queryState.fetchStatus,
      lastError = queryState.lastError;
  return /*#__PURE__*/_react.default.createElement("span", {
    className: fetchStatus === 'loaded' ? 'u-valid' : fetchStatus === 'pending' ? 'u-warn' : fetchStatus === 'failed' ? 'u-error' : ''
  }, fetchStatus, fetchStatus === 'failed' ? " - ".concat(lastError) : null);
};
/**
 * @param  {{ queryState: import("../types").QueryState }} props - Query state containing definition
 */


var IndexedFields = function IndexedFields(props) {
  var queryState = props.queryState;
  var indexedFields = queryState.definition.indexedFields;
  return /*#__PURE__*/_react.default.createElement("span", {
    className: "u-primaryColor"
  }, indexedFields ? indexedFields.join(', ') : null);
};
/**
 * @param  {string} search - Search string
 * @returns {function(import("../types").CozyClientDocument): Boolean}
 */


var makeMatcher = function makeMatcher(search) {
  var specs = search.split(';');
  var conditions = specs.map(function (spec) {
    var _spec$split = spec.split(':'),
        _spec$split2 = (0, _slicedToArray2.default)(_spec$split, 2),
        key = _spec$split2[0],
        value = _spec$split2[1];

    return function (obj) {
      if (!value) {
        return false;
      }

      var attr = (0, _get.default)(obj, key);
      return attr && attr.toString().toLowerCase().includes(value.toLowerCase());
    };
  });
  return (0, _overEvery.default)(conditions);
};

var useCozySelector = (0, _reactRedux.createSelectorHook)(_context.default);

var QueryData = function QueryData(_ref) {
  var data = _ref.data,
      doctype = _ref.doctype;
  var client = (0, _useClient.default)();

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showTable = _useState2[0],
      setShowTable = _useState2[1];

  var documents = useCozySelector(function (state) {
    return state.cozy.documents[doctype];
  });
  var storeData = (0, _react.useMemo)(function () {
    return data.map(function (id) {
      return client.hydrateDocument(documents[id]);
    });
  }, [client, data, documents]);
  var handleShowTable = (0, _react.useCallback)(function () {
    return setShowTable(function (value) {
      return !value;
    });
  }, [setShowTable]);

  var _useState3 = (0, _react.useState)(null),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      results = _useState4[0],
      setResults = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      search = _useState6[0],
      setSearch = _useState6[1];

  var handleSearch = (0, _react.useCallback)(function (ev) {
    var searchValue = ev.target.value;
    var matcher = searchValue !== '' ? makeMatcher(searchValue) : null;
    var results = matcher ? storeData.filter(matcher) : null;
    setSearch(searchValue);
    setResults(results);
  }, [storeData]);
  var viewData = results || storeData;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "u-pb-3"
  }, "Table:", ' ', /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    onChange: handleShowTable,
    checked: showTable
  }), /*#__PURE__*/_react.default.createElement("br", null), "Search:", ' ', /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    placeholder: "field.nested_field:value;other_field:other_value",
    onChange: handleSearch,
    value: search,
    style: styles.input
  }), /*#__PURE__*/_react.default.createElement("br", null), showTable ? /*#__PURE__*/_react.default.createElement(_reactInspector.TableInspector, {
    data: viewData
  }) : /*#__PURE__*/_react.default.createElement(_reactInspector.ObjectInspector, {
    data: viewData
  }));
};

var ObjectInspectorAndStringificator = function ObjectInspectorAndStringificator(_ref2) {
  var object = _ref2.object;

  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      showStringify = _useState8[0],
      setShowStringify = _useState8[1];

  var handleStringify = (0, _react.useCallback)(function () {
    return setShowStringify(function (value) {
      return !value;
    });
  }, [setShowStringify]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Stringify:", ' ', /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    onChange: handleStringify,
    checked: showStringify
  }), showStringify ? /*#__PURE__*/_react.default.createElement("pre", null, JSON.stringify(object, null, 2)) : /*#__PURE__*/_react.default.createElement(_reactInspector.ObjectInspector, {
    data: object
  }));
};

var QueryStateView = function QueryStateView(_ref3) {
  var name = _ref3.name;

  /**
   * @type {import("../types").QueryState}
   */
  var queryState = useCozySelector(function (state) {
    return state.cozy.queries[name];
  });
  var data = queryState.data,
      options = queryState.options;

  var _useMemo = (0, _react.useMemo)(function () {
    return {
      lastFetch: new Date(queryState.lastFetch),
      lastUpdate: new Date(queryState.lastUpdate)
    };
  }, [queryState]),
      lastFetch = _useMemo.lastFetch,
      lastUpdate = _useMemo.lastUpdate;

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_TableContainer.default, {
    component: _Paper.default,
    elevation: 0
  }, /*#__PURE__*/_react.default.createElement(_Table.default, {
    style: styles.mono,
    size: "small",
    className: "u-w-auto"
  }, /*#__PURE__*/_react.default.createElement(_TableBody.default, null, /*#__PURE__*/_react.default.createElement(_TableRow.default, null, /*#__PURE__*/_react.default.createElement(TableCell, null, "doctype"), /*#__PURE__*/_react.default.createElement(TableCell, null, queryState.definition.doctype)), /*#__PURE__*/_react.default.createElement(_TableRow.default, null, /*#__PURE__*/_react.default.createElement(TableCell, null, "definition"), /*#__PURE__*/_react.default.createElement(TableCell, null, /*#__PURE__*/_react.default.createElement(ObjectInspectorAndStringificator, {
    object: queryState.definition
  }))), /*#__PURE__*/_react.default.createElement(_TableRow.default, null, /*#__PURE__*/_react.default.createElement(TableCell, null, "indexFields"), /*#__PURE__*/_react.default.createElement(TableCell, null, /*#__PURE__*/_react.default.createElement(IndexedFields, {
    queryState: queryState
  }))), /*#__PURE__*/_react.default.createElement(_TableRow.default, null, /*#__PURE__*/_react.default.createElement(TableCell, null, "fetchStatus"), /*#__PURE__*/_react.default.createElement(TableCell, null, /*#__PURE__*/_react.default.createElement(FetchStatus, {
    queryState: queryState
  }))), /*#__PURE__*/_react.default.createElement(_TableRow.default, null, /*#__PURE__*/_react.default.createElement(TableCell, null, "lastFetch"), /*#__PURE__*/_react.default.createElement(TableCell, null, (0, _format.default)(lastFetch, 'HH:mm:ss'))), /*#__PURE__*/_react.default.createElement(_TableRow.default, null, /*#__PURE__*/_react.default.createElement(TableCell, null, "lastUpdate"), /*#__PURE__*/_react.default.createElement(TableCell, null, (0, _format.default)(lastUpdate, 'HH:mm:ss'))), /*#__PURE__*/_react.default.createElement(_TableRow.default, null, /*#__PURE__*/_react.default.createElement(TableCell, null, "documents"), /*#__PURE__*/_react.default.createElement(TableCell, null, data && data.length !== undefined ? data.length : data ? 1 : 0)), /*#__PURE__*/_react.default.createElement(_TableRow.default, null, /*#__PURE__*/_react.default.createElement(TableCell, null, "autoUpdate"), /*#__PURE__*/_react.default.createElement(TableCell, null, options && options.autoUpdate ? JSON.stringify(options.autoUpdate) : 'null')), /*#__PURE__*/_react.default.createElement(_TableRow.default, null, /*#__PURE__*/_react.default.createElement(TableCell, null, "execution stats"), /*#__PURE__*/_react.default.createElement(TableCell, null, /*#__PURE__*/_react.default.createElement(ObjectInspectorAndStringificator, {
    object: queryState.execution_stats
  })))))), /*#__PURE__*/_react.default.createElement(QueryData, {
    data: data,
    doctype: queryState.definition.doctype
  }));
};

var QueryListItem = function QueryListItem(_ref4) {
  var name = _ref4.name,
      selected = _ref4.selected,
      onClick = _ref4.onClick;
  var queryState = useCozySelector(function (state) {
    return state.cozy.queries[name];
  });
  var lastUpdate = (0, _react.useMemo)(function () {
    return (0, _format.default)(new Date(queryState.lastUpdate), 'HH:mm:ss');
  }, [queryState]);
  return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
    dense: true,
    button: true,
    selected: selected,
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, {
    primary: name,
    secondary: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, queryState.fetchStatus === 'failed' ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
      className: "u-error"
    }, "failed"), " -", ' ') : null, queryState.execution_stats && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(ExecutionTime, {
      queryState: queryState
    }), " -", ' '), lastUpdate ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, lastUpdate, " -") : null, queryState.data.length, " docs")
  }), /*#__PURE__*/_react.default.createElement(_common.NavSecondaryAction, null));
};

var ExecutionTime = function ExecutionTime(_ref5) {
  var queryState = _ref5.queryState;
  if (!queryState.execution_stats) return null;
  var classCSS = getClassNameForExecutedTimesQuery(queryState.execution_stats.execution_time_ms);
  return /*#__PURE__*/_react.default.createElement("span", {
    className: classCSS
  }, Math.round(queryState.execution_stats.execution_time_ms), " ms");
};

var QueryPanels = function QueryPanels() {
  var queries = useCozySelector(function (state) {
    return state.cozy.queries;
  });
  var sortedQueries = (0, _react.useMemo)(function () {
    return (0, _sortBy.default)(queries ? Object.values(queries) : [], function (queryState) {
      return Math.max(queryState.lastUpdate || -Infinity, queryState.lastErrorUpdate || -Infinity);
    }).map(function (queryState) {
      return queryState.id;
    }).reverse();
  }, [queries]);

  var _useState9 = (0, _react.useState)(function () {
    return sortedQueries[0];
  }),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      selectedQuery = _useState10[0],
      setSelectedQuery = _useState10[1];

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_common.ListGridItem, null, sortedQueries.map(function (queryName) {
    return /*#__PURE__*/_react.default.createElement(QueryListItem, {
      name: queryName,
      key: queryName,
      onClick: function onClick() {
        return setSelectedQuery(queryName);
      },
      selected: name === selectedQuery
    });
  }), sortedQueries.length === 0 ? /*#__PURE__*/_react.default.createElement(_PanelContent.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "body1"
  }, "No queries yet.")) : null), /*#__PURE__*/_react.default.createElement(_Box.default, {
    clone: true,
    p: 1,
    minWidth: 400
  }, /*#__PURE__*/_react.default.createElement(_Grid.default, {
    item: true,
    style: styles.panelRight
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "subtitle1"
  }, selectedQuery), selectedQuery ? /*#__PURE__*/_react.default.createElement(QueryStateView, {
    name: selectedQuery
  }) : null)));
};

var _default = QueryPanels;
exports.default = _default;