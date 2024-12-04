"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authFunction = exports.authenticateWithCordova = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _const = require("../const");

var _cozyDeviceHelper = require("cozy-device-helper");

/* global prompt */

/**
 * @type {import("../types").CordovaWindow}
 */
// @ts-ignore
var win = typeof window !== 'undefined' ? window : null;
/**
 * Open a SafariView Controller and resolve with the URL containing the token
 *
 * @param {string} url - Url containing access_code and state
 * @returns {Promise}
 */

var authenticateWithSafari = function authenticateWithSafari(url) {
  return new Promise(function (resolve, reject) {
    win.SafariViewController.show({
      url: url,
      transition: 'curl' // (this only works in iOS 9.1/9.2 and lower) unless animated is false you can choose from: curl, flip, fade, slide (default)
      // enterReaderModeIfAvailable: readerMode, // default false
      // tintColor: "#00ffff", // default is ios blue
      // barColor: "#0000ff", // on iOS 10+ you can change the background color as well
      // controlTintColor: "#ffffff" // on iOS 10+ you can override the default tintColor

    }, // this success handler will be invoked for the lifecycle events 'opened', 'loaded' and 'closed'
    function (result) {
      if (result.event === 'closed') {
        reject(new Error(_const.REGISTRATION_ABORT));
      }
    }, function (error) {
      console.log('KO: ' + error);
      reject(new Error(_const.REGISTRATION_ABORT));
    });
    var handle = win.handleOpenURL;

    win.handleOpenURL = function (url) {
      win.SafariViewController.hide();
      resolve(url);

      if (handle) {
        win.handleOpenURL = handle;
      }
    };
  });
};
/**
 * Opens an InAppBrowser and resolves with the URL containing the token
 *
 * @param {string} url - Url containing access_code and state
 * @returns {Promise}
 */


var authenticateWithInAppBrowser = function authenticateWithInAppBrowser(url) {
  return new Promise(function (resolve, reject) {
    var target = '_blank';
    var options = 'clearcache=yes,zoom=no';
    var inAppBrowser = win.cordova.InAppBrowser.open(url, target, options);

    var removeListener = function removeListener() {
      inAppBrowser.removeEventListener('loadstart', onLoadStart);
      inAppBrowser.removeEventListener('exit', onExit);
    };

    var onLoadStart = function onLoadStart(_ref) {
      var url = _ref.url;
      var accessCode = /\?access_code=(.+)$/.test(url);
      var state = /\?state=(.+)$/.test(url);

      if (accessCode || state) {
        resolve(url);
        removeListener();
        inAppBrowser.close();
      }
    };

    var onExit = function onExit() {
      reject(new Error(_const.REGISTRATION_ABORT));
      removeListener();
      inAppBrowser.close();
    };

    inAppBrowser.addEventListener('loadstart', onLoadStart);
    inAppBrowser.addEventListener('exit', onExit);
  });
};

var authenticateWithCordova = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(url) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = (0, _cozyDeviceHelper.isIOSApp)();

            if (!_context.t0) {
              _context.next = 5;
              break;
            }

            _context.next = 4;
            return (0, _cozyDeviceHelper.hasSafariPlugin)();

          case 4:
            _context.t0 = _context.sent;

          case 5:
            if (!_context.t0) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", authenticateWithSafari(url));

          case 9:
            if (!(0, _cozyDeviceHelper.hasInAppBrowserPlugin)()) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", authenticateWithInAppBrowser(url));

          case 13:
            /**
             * for dev purpose:
             * In oauth workflow, the server displays an authorization page
             * User must accept to give permission then the server gives an url
             * with query parameters used by cozy-client-js to initialize itself.
             *
             * This hack let developers open the authorization page in a new tab
             * then get the "access_code" url and paste it in the prompt to let the
             * application initialize and redirect to other pages.
             */
            console.log(url); // Useful for dev (see above).

            return _context.abrupt("return", new Promise(function (resolve) {
              setTimeout(function () {
                var token = prompt('Paste the url here:');
                resolve(token);
              }, 5000);
            }));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function authenticateWithCordova(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.authenticateWithCordova = authenticateWithCordova;
var authFunction = authenticateWithCordova;
exports.authFunction = authFunction;