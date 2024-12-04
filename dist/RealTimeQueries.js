"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = require("react");

var _useClient = _interopRequireDefault(require("./hooks/useClient"));

var _realtime = require("./store/realtime");

var _realtime2 = require("./helpers/realtime");

/**
 * Component that subscribes to a doctype changes and keep the
 * internal store updated.
 *
 * @param {object} options - Options
 * @param {import("./types").Doctype} options.doctype - The doctype to watch
 * @returns {null} The component does not display anything.
 */
var RealTimeQueries = function RealTimeQueries(_ref) {
  var doctype = _ref.doctype;
  var client = (0, _useClient.default)();
  (0, _react.useEffect)(function () {
    var realtime = client.plugins.realtime;

    if (!realtime) {
      throw new Error('You must include the realtime plugin to use RealTimeQueries');
    }

    var options = {};

    if (doctype === 'io.cozy.files') {
      options.enhanceDocFn = _realtime2.ensureFilePath;
    }

    var handleCreated = function handleCreated(data) {
      (0, _realtime.dispatchCreate)(client, doctype, data, options);
    };

    var handleUpdated = function handleUpdated(data) {
      (0, _realtime.dispatchUpdate)(client, doctype, data, options);
    };

    var handleDeleted = function handleDeleted(data) {
      (0, _realtime.dispatchDelete)(client, doctype, data, options);
    };

    var subscribe = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return realtime.subscribe('created', doctype, handleCreated);

              case 2:
                _context.next = 4;
                return realtime.subscribe('updated', doctype, handleUpdated);

              case 4:
                _context.next = 6;
                return realtime.subscribe('deleted', doctype, handleDeleted);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function subscribe() {
        return _ref2.apply(this, arguments);
      };
    }();

    subscribe();
    return function () {
      realtime.unsubscribe('created', doctype, handleCreated);
      realtime.unsubscribe('updated', doctype, handleUpdated);
      realtime.unsubscribe('deleted', doctype, handleDeleted);
    };
  }, [client, doctype]);
  return null;
};

var _default = /*#__PURE__*/(0, _react.memo)(RealTimeQueries);

exports.default = _default;