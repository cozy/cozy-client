"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldXMLHTTPRequestBeUsed = exports.fetchWithXMLHttpRequest = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _memoize = _interopRequireDefault(require("lodash/memoize"));

var headersFromString = function headersFromString(headerString) {
  return new Headers(headerString.split('\r\n').map(function (x) {
    return x.split(':', 2);
  }).filter(function (x) {
    return x.length == 2;
  }));
};
/**
 * Returns a `fetch()` like response but uses XHR.
 * XMLHTTPRequest provides upload progress events unlike fetch.
 *
 * @private
 * @param {string} fullpath - Route path
 * @param {object} options - Fetch options
 * @param {Function} options.onUploadProgress - Callback to receive upload progress events
 */


var fetchWithXMLHttpRequest = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(fullpath, options) {
    var response;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return new Promise(function (resolve, reject) {
              var xhr = new XMLHttpRequest();

              if (options.onUploadProgress && xhr.upload) {
                xhr.upload.addEventListener('progress', options.onUploadProgress, false);
              }

              xhr.onload = function () {
                if (this.readyState == 4) {
                  resolve(this);
                } else {
                  reject(this);
                }
              };

              xhr.onerror = function (err) {
                reject(err);
              };

              xhr.open(options.method, fullpath, true);
              xhr.withCredentials = true;

              for (var _i = 0, _Object$entries = Object.entries(options.headers); _i < _Object$entries.length; _i++) {
                var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i], 2),
                    headerName = _Object$entries$_i[0],
                    headerValue = _Object$entries$_i[1];

                xhr.setRequestHeader(headerName, headerValue);
              }

              xhr.send(options.body);
            });

          case 2:
            response = _context3.sent;
            return _context3.abrupt("return", {
              headers: headersFromString(response.getAllResponseHeaders()),
              ok: response.status >= 200 && response.status < 300,
              text: function () {
                var _text = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          return _context.abrupt("return", response.responseText);

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                function text() {
                  return _text.apply(this, arguments);
                }

                return text;
              }(),
              json: function () {
                var _json = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
                  return _regenerator.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          return _context2.abrupt("return", JSON.parse(response.responseText));

                        case 1:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                function json() {
                  return _json.apply(this, arguments);
                }

                return json;
              }(),
              status: response.status,
              statusText: response.statusText
            });

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function fetchWithXMLHttpRequest(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchWithXMLHttpRequest = fetchWithXMLHttpRequest;
var doesXHRSupportLoadAndProgress = (0, _memoize.default)(function () {
  var xhr = new XMLHttpRequest();
  return 'onload' in xhr && 'onprogress' in xhr;
});

var shouldXMLHTTPRequestBeUsed = function shouldXMLHTTPRequestBeUsed(method, path, options) {
  return Boolean(options.onUploadProgress) && doesXHRSupportLoadAndProgress();
};

exports.shouldXMLHTTPRequestBeUsed = shouldXMLHTTPRequestBeUsed;