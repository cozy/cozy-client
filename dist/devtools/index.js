"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "NavSecondaryAction", {
  enumerable: true,
  get: function get() {
    return _common.NavSecondaryAction;
  }
});
Object.defineProperty(exports, "ListGridItem", {
  enumerable: true,
  get: function get() {
    return _common.ListGridItem;
  }
});
Object.defineProperty(exports, "useLocalState", {
  enumerable: true,
  get: function get() {
    return _useLocalState7.default;
  }
});
Object.defineProperty(exports, "PanelContent", {
  enumerable: true,
  get: function get() {
    return _PanelContent.default;
  }
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _Fab = _interopRequireDefault(require("@material-ui/core/Fab"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Box = _interopRequireDefault(require("@material-ui/core/Box"));

var _Slide = _interopRequireDefault(require("@material-ui/core/Slide"));

var _styles = require("@material-ui/core/styles");

var _CozyTheme = _interopRequireDefault(require("cozy-ui/transpiled/react/providers/CozyTheme"));

var _Icon = _interopRequireDefault(require("cozy-ui/transpiled/react/Icon"));

var _List = _interopRequireDefault(require("cozy-ui/transpiled/react/List"));

var _Typography = _interopRequireDefault(require("cozy-ui/transpiled/react/Typography"));

var _ListItem = _interopRequireDefault(require("cozy-ui/transpiled/react/ListItem"));

var _ListItemText = _interopRequireDefault(require("cozy-ui/transpiled/react/ListItemText"));

var _Gear = _interopRequireDefault(require("cozy-ui/transpiled/react/Icons/Gear"));

var _CrossMedium = _interopRequireDefault(require("cozy-ui/transpiled/react/Icons/CrossMedium"));

var _Queries = _interopRequireDefault(require("./Queries"));

var _Flags = _interopRequireDefault(require("./Flags/Flags"));

var _LibraryVersions = _interopRequireDefault(require("./LibraryVersions"));

var _common = require("./common");

var _useLocalState7 = _interopRequireDefault(require("./useLocalState"));

var _PanelContent = _interopRequireDefault(require("./PanelContent"));

var ABOVE_ALL = 1000000;
var DEFAULT_PANEL_HEIGHT = 300;
var useStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    fab: {
      position: 'fixed',
      left: '1rem',
      bottom: '1rem',
      zIndex: ABOVE_ALL
    },
    panel: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: ABOVE_ALL
    },
    closeIcon: {
      position: 'absolute',
      top: '0',
      right: '0.5rem',
      transform: 'translateY(-66%)',
      background: 'var(--paperBackgroundColor)',
      border: "2px solid ".concat(theme.palette.primary.main),
      boxShadow: 'var(--shadow1)',
      zIndex: 1,
      '&:hover': {
        background: 'var(--paperBackgroundColor)'
      }
    },
    panelContainer: {
      background: 'var(--paperBackgroundColor)',
      height: '100%',
      flexWrap: 'nowrap',
      overflowX: 'scroll'
    },
    panelRight: {
      height: '100%',
      overflowY: 'scroll',
      flexGrow: 1,
      minWidth: 150
    },
    mono: {
      fontFamily: 'monospace'
    }
  };
});
var defaultPanels = [{
  id: 'queries',
  Component: _Queries.default
}, {
  id: 'flags',
  Component: _Flags.default
}, {
  id: 'library versions',
  Component: _LibraryVersions.default
}];

var DevToolsNavList = function DevToolsNavList(_ref) {
  var selected = _ref.selected,
      panels = _ref.panels,
      onNav = _ref.onNav;
  return /*#__PURE__*/_react.default.createElement(_List.default, null, panels.map(function (panel) {
    return /*#__PURE__*/_react.default.createElement(_ListItem.default, {
      key: panel.id,
      selected: selected === panel.id,
      dense: true,
      button: true,
      onClick: function onClick() {
        return onNav(panel.id);
      }
    }, /*#__PURE__*/_react.default.createElement(_ListItemText.default, null, panel.id), /*#__PURE__*/_react.default.createElement(_common.NavSecondaryAction, null));
  }));
};

var useResizeStyles = (0, _styles.makeStyles)(function (theme) {
  return {
    root: {
      height: 3,
      width: '100%',
      background: theme.palette.primary.main,
      cursor: 'row-resize'
    }
  };
});

var ResizeBar = function ResizeBar(_ref2) {
  var props = (0, _extends2.default)({}, _ref2);
  var theme = (0, _styles.useTheme)();
  var classes = useResizeStyles(theme);
  return /*#__PURE__*/_react.default.createElement("div", (0, _extends2.default)({
    className: classes.root
  }, props));
};

var DevToolsPanel = function DevToolsPanel(props) {
  var userPanels = props.panels,
      open = props.open;
  var panels = (0, _react.useMemo)(function () {
    if (userPanels) {
      return [].concat(defaultPanels, (0, _toConsumableArray2.default)(userPanels));
    }

    return defaultPanels;
  }, [userPanels]);

  var _useLocalState = (0, _useLocalState7.default)('cozydevtools__panel', 'queries'),
      _useLocalState2 = (0, _slicedToArray2.default)(_useLocalState, 2),
      currentPanel = _useLocalState2[0],
      setCurrentPanel = _useLocalState2[1];

  var ref = (0, _react.useRef)();

  var _useLocalState3 = (0, _useLocalState7.default)('cozydevtools__height', DEFAULT_PANEL_HEIGHT),
      _useLocalState4 = (0, _slicedToArray2.default)(_useLocalState3, 2),
      panelHeight = _useLocalState4[0],
      setPanelHeight = _useLocalState4[1];
  /**
   * Copied/adapted from react-query
   * https://github.com/tannerlinsley/react-query/blob/master/src/devtools/devtools.tsx
   */


  var handleDragStart = function handleDragStart(startEvent) {
    if (startEvent.button !== 0) return; // Only allow left click for drag

    var node = ref.current;

    if (node === undefined) {
      return;
    }

    var dragInfo = {
      // @ts-ignore
      originalHeight: node.getBoundingClientRect().height,
      pageY: startEvent.pageY
    };

    var run = function run(moveEvent) {
      var delta = dragInfo.pageY - moveEvent.pageY;
      var newHeight = dragInfo.originalHeight + delta;
      setPanelHeight(newHeight);
    };

    var unsub = function unsub() {
      document.removeEventListener('mousemove', run);
      document.removeEventListener('mouseUp', unsub);
    };

    document.addEventListener('mousemove', run);
    document.addEventListener('mouseup', unsub);
  };

  var classes = useStyles();
  return /*#__PURE__*/_react.default.createElement(_CozyTheme.default, {
    variant: "normal"
  }, /*#__PURE__*/_react.default.createElement(_Slide.default, {
    direction: "up",
    in: open,
    mountOnEnter: true,
    unmountOnExit: true
  }, /*#__PURE__*/_react.default.createElement(_Paper.default, {
    elevation: 12,
    ref: ref,
    className: props.className,
    style: {
      height: panelHeight
    }
  }, /*#__PURE__*/_react.default.createElement(ResizeBar, {
    onMouseDown: handleDragStart
  }), /*#__PURE__*/_react.default.createElement(_IconButton.default, {
    className: classes.closeIcon,
    onClick: props.onClose
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: _CrossMedium.default,
    size: 12
  })), /*#__PURE__*/_react.default.createElement(_Grid.default, {
    container: true,
    className: classes.panelContainer
  }, /*#__PURE__*/_react.default.createElement(_common.ListGridItem, null, /*#__PURE__*/_react.default.createElement(_Box.default, {
    p: 1
  }, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "subtitle1"
  }, "Cozy Devtools")), /*#__PURE__*/_react.default.createElement(DevToolsNavList, {
    panels: panels,
    selected: currentPanel,
    onNav: setCurrentPanel
  })), panels.map(function (panelOptions) {
    return currentPanel === panelOptions.id ? /*#__PURE__*/_react.default.createElement(panelOptions.Component, {
      key: panelOptions.id
    }) : null;
  })))));
};

var DevTools = function DevTools(_ref3) {
  var panels = _ref3.panels;
  var classes = useStyles();

  var _useLocalState5 = (0, _useLocalState7.default)('cozydevtools__open', false),
      _useLocalState6 = (0, _slicedToArray2.default)(_useLocalState5, 2),
      open = _useLocalState6[0],
      setOpen = _useLocalState6[1];

  var handleToggle = (0, _react.useCallback)(function () {
    return setOpen(function (state) {
      return !state;
    });
  }, [setOpen]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Fab.default, {
    color: "primary",
    onClick: handleToggle,
    className: classes.fab
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: _Gear.default
  })), /*#__PURE__*/_react.default.createElement(DevToolsPanel, {
    open: open,
    className: classes.panel,
    onClose: handleToggle,
    panels: panels
  }));
};

var _default = DevTools;
exports.default = _default;