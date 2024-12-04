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

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

var DEFAULT_CACHE_TIMEOUT_QUERIES = 10 * 60 * 1000; // 10 minutes

var useFetchShortcut = function useFetchShortcut(client, id) {
  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      shortcutInfos = _useState2[0],
      setShortcutInfos = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      shortcutImg = _useState4[0],
      setShortcutImg = _useState4[1];

  var _useState5 = (0, _react.useState)('idle'),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      fetchStatus = _useState6[0],
      setFetchStatus = _useState6[1];

  (0, _react.useEffect)(function () {
    var fetchData = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var _shortcutInfosResult$, _shortcutInfosResult$2, _shortcutInfosResult$3, shortcutInfosResult, targetApp, targetAppIconUrl, shortcutRemoteUrl, imgUrl;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setFetchStatus('loading');
                _context.prev = 1;
                _context.next = 4;
                return client.fetchQueryAndGetFromState({
                  definition: (0, _dsl.Q)('io.cozy.files.shortcuts').getById(id),
                  options: {
                    as: "io.cozy.files.shortcuts/".concat(id),
                    fetchPolicy: _CozyClient.default.fetchPolicies.olderThan(DEFAULT_CACHE_TIMEOUT_QUERIES),
                    singleDocData: true
                  }
                });

              case 4:
                shortcutInfosResult = _context.sent;
                targetApp = shortcutInfosResult === null || shortcutInfosResult === void 0 ? void 0 : (_shortcutInfosResult$ = shortcutInfosResult.data) === null || _shortcutInfosResult$ === void 0 ? void 0 : (_shortcutInfosResult$2 = _shortcutInfosResult$.metadata) === null || _shortcutInfosResult$2 === void 0 ? void 0 : (_shortcutInfosResult$3 = _shortcutInfosResult$2.target) === null || _shortcutInfosResult$3 === void 0 ? void 0 : _shortcutInfosResult$3.app;

                if (!targetApp) {
                  _context.next = 13;
                  break;
                }

                _context.next = 9;
                return client.getStackClient().getIconURL({
                  type: 'app',
                  slug: targetApp,
                  priority: 'stack'
                });

              case 9:
                targetAppIconUrl = _context.sent;
                setShortcutImg(targetAppIconUrl);
                _context.next = 16;
                break;

              case 13:
                shortcutRemoteUrl = new URL(shortcutInfosResult.data.url);
                imgUrl = "".concat(client.getStackClient().uri, "/bitwarden/icons/").concat(shortcutRemoteUrl.host, "/icon.png");
                setShortcutImg(imgUrl);

              case 16:
                setShortcutInfos({
                  data: shortcutInfosResult.data
                });
                setFetchStatus('loaded');
                _context.next = 23;
                break;

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](1);
                setFetchStatus('failed');

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 20]]);
      }));

      return function fetchData() {
        return _ref.apply(this, arguments);
      };
    }();

    fetchData();
  }, [client, id]);
  return {
    shortcutInfos: shortcutInfos,
    shortcutImg: shortcutImg,
    fetchStatus: fetchStatus
  };
};

var _default = useFetchShortcut;
exports.default = _default;