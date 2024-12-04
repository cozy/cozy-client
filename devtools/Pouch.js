"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _cozyPouchLink = _interopRequireDefault(require("cozy-pouch-link"));

var _get = _interopRequireDefault(require("lodash/get"));

var _Button = _interopRequireDefault(require("cozy-ui/transpiled/react/Button"));

var _Typography = _interopRequireDefault(require("cozy-ui/transpiled/react/Typography"));

var _format = _interopRequireDefault(require("date-fns/format"));

var _useClient = _interopRequireDefault(require("../hooks/useClient"));

var _PanelContent = _interopRequireDefault(require("./PanelContent"));

var listStyle = {
  paddingLeft: '1rem'
};
var DATE_FORMAT = 'HH:mm:ss DD/MM/YYYY';

var useForceUpdate = function useForceUpdate() {
  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      setLastRender = _useState2[1];

  var forceUpdate = (0, _react.useCallback)(function () {
    setLastRender(Date.now());
  }, []);
  return forceUpdate;
};

var DoctypeSyncInfo = function DoctypeSyncInfo(_ref) {
  var link = _ref.link,
      doctype = _ref.doctype;
  var info = link.getSyncInfo(doctype);
  return /*#__PURE__*/_react.default.createElement("div", null, "Status: ", info ? (0, _get.default)(link, ['replicationStatus', doctype]) : 'Not synced', /*#__PURE__*/_react.default.createElement("br", null), "Date: ", info ? (0, _format.default)(info.date, DATE_FORMAT) : 'NA');
};
/**
 * Allows to view state and manage the PouchLink of the current cozy
 * client.
 */


var PouchDevTool = function PouchDevTool() {
  var client = (0, _useClient.default)();
  var forceUpdate = useForceUpdate();

  var _useState3 = (0, _react.useState)('NA'),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      status = _useState4[0],
      setStatus = _useState4[1];

  var pouchLink = (0, _react.useMemo)(function () {
    return client.links.find(function (link) {
      return link instanceof _cozyPouchLink.default;
    });
  }, [client]);

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      resetting = _useState6[0],
      setResetting = _useState6[1];

  (0, _react.useEffect)(function () {
    var handleReplicationStart = function handleReplicationStart() {
      return setStatus('replicating');
    };

    var handleReplicationStop = function handleReplicationStop() {
      return setStatus('stopped');
    };

    var handleReplicationEnd = function handleReplicationEnd() {
      return setStatus('idle');
    };

    client.on('pouchlink:sync:start', handleReplicationStart);
    client.on('pouchlink:sync:stop', handleReplicationStop);
    client.on('pouchlink:sync:end', handleReplicationEnd);
    client.on('pouchlink:doctypesync:start', forceUpdate);
    client.on('pouchlink:doctypesync:end', forceUpdate);
    return function () {
      client.removeListener('pouchlink:sync:start', handleReplicationStart);
      client.removeListener('pouchlink:sync:stop', handleReplicationStop);
      client.removeListener('pouchlink:sync:end', handleReplicationEnd);
      client.removeListener('pouchlink:doctypesync:start', forceUpdate);
      client.removeListener('pouchlink:doctypesync:end', forceUpdate);
    };
  }, [client, forceUpdate]);
  var handleClickStartReplication = (0, _react.useCallback)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Need to stop the replication loop before restarting it
            // otherwise startReplication has no effect since the replication
            // loop is already started.
            pouchLink.stopReplication();
            pouchLink.startReplication();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), [pouchLink]);
  var handleClickStopReplication = (0, _react.useCallback)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            pouchLink.stopReplication();

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })), [pouchLink]);
  var handleClickReset = (0, _react.useCallback)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3() {
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            setResetting(true);
            _context3.prev = 1;
            _context3.next = 4;
            return pouchLink.reset();

          case 4:
            if (window.confirm('Pouches have been destroyed, reload the page ?')) {
              window.location.reload();
            }

            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](1);
            setResetting(false);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 7]]);
  })), [setResetting, pouchLink]);

  if (!pouchLink) {
    return /*#__PURE__*/_react.default.createElement(_PanelContent.default, null, /*#__PURE__*/_react.default.createElement("p", null, "Pouch is not active"));
  }

  return /*#__PURE__*/_react.default.createElement(_PanelContent.default, null, /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "subtitle1"
  }, "Doctypes managed in Pouch"), /*#__PURE__*/_react.default.createElement("ul", {
    style: listStyle
  }, pouchLink.doctypes.map(function (doctype) {
    return /*#__PURE__*/_react.default.createElement("li", {
      className: "u-mb-half",
      key: doctype
    }, doctype, /*#__PURE__*/_react.default.createElement(DoctypeSyncInfo, {
      link: pouchLink,
      doctype: doctype
    }));
  })), /*#__PURE__*/_react.default.createElement(_Typography.default, {
    variant: "subtitle1"
  }, "Actions"), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: "u-mb-half",
    variant: "contained",
    disabled: status === 'replicating',
    onClick: handleClickStartReplication
  }, "Start replication"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: "u-mb-half",
    variant: "contained",
    disabled: status === 'idle',
    onClick: handleClickStopReplication
  }, "Stop replication"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    className: "u-mb-half",
    variant: "contained",
    disabled: resetting,
    onClick: handleClickReset
  }, "Destroy databases")));
};

var _default = PouchDevTool;
exports.default = _default;