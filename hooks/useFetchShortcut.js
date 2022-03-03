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
        var shortcutInfosResult, shortcutRemoteUrl, imgUrl;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setFetchStatus('loading');
                _context.prev = 1;
                _context.next = 4;
                return client.getStackClient().fetchJSON('GET', "/shortcuts/".concat(id));

              case 4:
                shortcutInfosResult = _context.sent;
                shortcutRemoteUrl = new URL(shortcutInfosResult.data.attributes.url);
                imgUrl = "".concat(client.getStackClient().uri, "/bitwarden/icons/").concat(shortcutRemoteUrl.host, "/icon.png");
                setShortcutImg(imgUrl);
                setShortcutInfos(shortcutInfosResult);
                setFetchStatus('loaded');
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](1);
                setFetchStatus('failed');

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 12]]);
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