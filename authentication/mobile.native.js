"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authFunction = exports.authenticateWithReactNativeInAppBrowser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _reactNativeInappbrowserReborn = require("react-native-inappbrowser-reborn");

var _reactNative = require("react-native");

//@ts-ignore
//@ts-ignore

/**
 * Opens a ReactNative InAppBrowser
 * and resolves with the URL containing
 * the token
 *
 * @param {string} url
 * @returns {Promise}
 */
var authenticateWithReactNativeInAppBrowser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(url) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              _reactNativeInappbrowserReborn.InAppBrowser.open(url, {
                // iOS Properties
                readerMode: false,
                animated: true,
                modalPresentationStyle: 'fullScreen',
                modalTransitionStyle: 'coverVertical',
                modalEnabled: true,
                enableBarCollapsing: false,
                // Android Properties
                showTitle: true,
                toolbarColor: '#6200EE',
                secondaryToolbarColor: 'black',
                enableUrlBarHiding: true,
                enableDefaultShare: true,
                forceCloseOnRedirection: false,
                // Specify full animation resource identifier(package:anim/name)
                // or only resource name(in case of animation bundled with app).
                animations: {
                  startEnter: 'slide_in_right',
                  startExit: 'slide_out_left',
                  endEnter: 'slide_in_left',
                  endExit: 'slide_out_right'
                }
              });

              var removeListener = function removeListener() {
                _reactNative.Linking.removeEventListener('url', linkListener);
              };

              var linkListener = function linkListener(_ref2) {
                var url = _ref2.url;
                var sanitizedUrl = url;
                var accessCode = /\?access_code=(.+)$/.test(url);
                var state = /\?state=(.+)$/.test(url);

                if (accessCode || state) {
                  if (_reactNative.Platform.OS === 'ios') {
                    // On iOS, the # added to the URL by the stack for security
                    // reason is encoded to %23. Because of this, URL().searchParams
                    // is not working as expected since %23 is added to the param
                    // instead of being ignored and assigned to the hash.
                    // Let's convert back %23 to # manually.
                    // I think the issue is related to Linking component but didn't
                    // find any issues on github about it. Need to make a simple
                    // reproduction case to create the issue.
                    if (url.endsWith('%23')) {
                      sanitizedUrl = url.replace(/%23$/, '#');
                    }
                  }

                  resolve(sanitizedUrl);
                  removeListener();

                  _reactNativeInappbrowserReborn.InAppBrowser.close();
                }
              };

              _reactNative.Linking.addEventListener('url', linkListener);
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function authenticateWithReactNativeInAppBrowser(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.authenticateWithReactNativeInAppBrowser = authenticateWithReactNativeInAppBrowser;
var authFunction = authenticateWithReactNativeInAppBrowser;
exports.authFunction = authFunction;