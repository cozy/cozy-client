"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = require("react");

var _dsl = require("../queries/dsl");

var _applications = require("../models/applications");

var useAppLinkWithStoreFallback = function useAppLinkWithStoreFallback(slug, client) {
  var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var _useState = (0, _react.useState)('loading'),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      fetchStatus = _useState2[0],
      setFetchStatus = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isInstalled = _useState4[0],
      setIsInstalled = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      url = _useState6[0],
      setURL = _useState6[1];

  (0, _react.useEffect)(function () {
    var load = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var apps, appDocument, appInstalled;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return client.query((0, _dsl.Q)('io.cozy.apps'));

              case 3:
                apps = _context.sent;
                appDocument = {
                  slug: slug
                };
                appInstalled = (0, _applications.isInstalled)(apps.data, appDocument);
                setIsInstalled(!!appInstalled);

                if (appInstalled) {
                  setURL((0, _applications.getUrl)(appInstalled) + path);
                } else {
                  setURL((0, _applications.getStoreURL)(apps.data, appDocument));
                }

                setFetchStatus('loaded');
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);
                setFetchStatus('errored');

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 11]]);
      }));

      return function load() {
        return _ref.apply(this, arguments);
      };
    }();

    load();
  }, [client, slug, path]);
  return {
    fetchStatus: fetchStatus,
    isInstalled: isInstalled,
    url: url
  };
};

var _default = useAppLinkWithStoreFallback;
exports.default = _default;