"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createClientInteractive = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _http = _interopRequireDefault(require("http"));

var _open = _interopRequireDefault(require("open"));

var _fs = _interopRequireDefault(require("fs"));

var _merge = _interopRequireDefault(require("lodash/merge"));

var _serverDestroy = _interopRequireDefault(require("server-destroy"));

var _CozyClient = _interopRequireDefault(require("../CozyClient"));

var _cozyLogger = _interopRequireDefault(require("cozy-logger"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var log = _cozyLogger.default.namespace('create-cli-client');

var nodeFetch = require('node-fetch');

var btoa = require('btoa');
/**
 * Creates and starts and HTTP server suitable for OAuth authentication
 *
 * @param  {object} serverOptions - OAuth callback server options
 * @param  {Function} serverOptions.onAuthentication - Additional callback called
 * when the user authenticates
 * @param  {string} serverOptions.route - Route used for authentication
 * @param  {number} serverOptions.port - Port on which the server will listen
 * @param  {Function} serverOptions.onListen - Callback called when the
 * server starts
 *
 * @typedef {object} DestroyableServer
 * @function destroy
 *
 * @returns {DestroyableServer}
 *
 * @private
 */


var createCallbackServer = function createCallbackServer(serverOptions) {
  var route = serverOptions.route,
      onListen = serverOptions.onListen,
      onAuthentication = serverOptions.onAuthentication,
      port = serverOptions.port;

  var server = _http.default.createServer(function (request, response) {
    if (request.url.indexOf(route) === 0) {
      onAuthentication(request.url);
      response.write('Authentication successful, you can close this page.');
      response.end();
    }
  });

  server.listen(port, function () {
    onListen();
  });
  (0, _serverDestroy.default)(server);
  return server;
};
/**
 * Creates a function suitable for usage with CozyClient::startOAuthFlow
 *
 * Starts a local server. The stack upon user authentication will
 * redirect to this local server with a URL containing credentials.
 * The callback resolves with this authenticationURL which continues
 * the authentication flow inside startOAuthFlow.
 *
 * When the server is started, the authentication page is opened on the
 * desktop browser of the user.
 *
 * @param {object} serverOptions - Options for the OAuth callback server
 * @param {number} serverOptions.port - Port used for the OAuth callback server
 * @param {Function} serverOptions.onAuthentication - Callback when the user authenticates
 * @param {Function} serverOptions.onListen - Callback called with the authentication URL
 * @param {string} serverOptions.route - Route used for authentication
 * @param {boolean} serverOptions.shouldOpenAuthenticationPage - Whether the authentication
 * page should be automatically opened (default: true)
 *
 * @private
 */


var mkServerFlowCallback = function mkServerFlowCallback(serverOptions) {
  return function (authenticationURL) {
    return new Promise(function (resolve, reject) {
      var rejectTimeout, successTimeout;
      var server = createCallbackServer(_objectSpread(_objectSpread({}, serverOptions), {}, {
        onAuthentication: function onAuthentication(callbackURL) {
          log('debug', 'Authenticated, Shutting server down');
          successTimeout = setTimeout(function () {
            // Is there a way to call destroy only after all requests have
            // been completely served ? Otherwise we close the server while
            // the successful oauth page is being served and the page does
            // not get loaded on the client side.
            server.destroy();
            resolve('http://localhost:8000/' + callbackURL);
            clearTimeout(rejectTimeout);
          }, 300);
        },
        onListen: function onListen() {
          log('debug', 'OAuth callback server started, waiting for authentication');

          if (serverOptions.shouldOpenAuthenticationPage !== false) {
            (0, _open.default)(authenticationURL, {
              wait: false
            });
          }

          if (serverOptions.onListen) {
            serverOptions.onListen({
              authenticationURL: authenticationURL
            });
          }
        }
      }));
      rejectTimeout = setTimeout(function () {
        clearTimeout(successTimeout);
        server.destroy();
        reject('Timeout for authentication');
      }, 30 * 1000);
    });
  };
};

var hashCode = function hashCode(str) {
  var hash = 0,
      i,
      chr;
  if (str.length === 0) return hash;

  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
};

var DEFAULT_SERVER_OPTIONS = {
  port: 3333,
  route: '/do_access',
  getSavedCredentials: function getSavedCredentials(clientOptions) {
    if (!clientOptions.oauth.softwareID) {
      throw new Error('Please provide oauth.softwareID in your clientOptions.');
    }

    var doctypeHash = Math.abs(hashCode(JSON.stringify(clientOptions.scope)));
    var sluggedURI = clientOptions.uri.replace(/https?:\/\//, '').replace(/\./g, '-');
    return "/tmp/cozy-client-oauth-".concat(sluggedURI, "-").concat(clientOptions.oauth.softwareID, "-").concat(doctypeHash, ".json");
  }
};

var writeJSON = function writeJSON(fs, filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data));
};
/**
 * Parses a JSON from a file
 * Returns null in case of error
 *
 * @private
 */


var readJSON = function readJSON(fs, filename) {
  try {
    if (!fs.existsSync(filename)) {
      return null;
    }

    var res = JSON.parse(fs.readFileSync(filename).toString());
    return res;
  } catch (e) {
    _cozyLogger.default.warn("Could not load ".concat(filename, " (").concat(e.message, ")"));

    return null;
  }
};
/**
 * Creates a client with interactive authentication.
 *
 * - Will start an OAuth flow and open an authentication page
 * - Starts a local server to listen for the oauth callback
 * - Resolves with the client after user authentication
 *
 * @param {object} clientOptions Same as CozyClient::constructor.
 *
 * @example
 * ```
 * import { createClientInteractive } from 'cozy-client/dist/cli'
 * await createClientInteractive({
 *   uri: 'http://cozy.tools:8080',
 *   scope: ['io.cozy.bills'],
 *   oauth: {
 *     softwareID: 'my-cli-application-using-bills'
 *   }
 * })
 * ```
 *
 * @returns {Promise<CozyClient>} - A client that is ready with a token
 */


var createClientInteractive = function createClientInteractive(clientOptions, serverOpts) {
  global.fetch = nodeFetch;
  global.btoa = btoa;
  var serverOptions = (0, _merge.default)(DEFAULT_SERVER_OPTIONS, serverOpts);
  var createClientFS = serverOptions.fs || _fs.default;
  var mergedClientOptions = (0, _merge.default)({
    oauth: {
      clientName: 'cli-client',
      redirectURI: "http://localhost:".concat(serverOptions.port).concat(serverOptions.route)
    }
  }, clientOptions);

  if (!clientOptions.scope) {
    throw new Error('scope must be provided in client options');
  }

  var getSavedCredentials = serverOptions.getSavedCredentials;
  var savedCredentialsFilename = getSavedCredentials(mergedClientOptions);
  var savedCredentials = readJSON(createClientFS, savedCredentialsFilename);
  log('debug', "Starting OAuth flow");
  return new Promise( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {
      var client;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              client = new _CozyClient.default(mergedClientOptions);

              if (!savedCredentials) {
                _context.next = 7;
                break;
              }

              log('debug', "Using saved credentials in ".concat(savedCredentialsFilename));
              client.stackClient.setToken(savedCredentials.token);
              client.stackClient.setOAuthOptions(savedCredentials.oauthOptions);
              resolve(client);
              return _context.abrupt("return");

            case 7:
              _context.next = 9;
              return client.startOAuthFlow(mkServerFlowCallback(serverOptions));

            case 9:
              resolve(client);
              log('debug', "Saving credentials to ".concat(savedCredentialsFilename));
              writeJSON(createClientFS, savedCredentialsFilename, {
                oauthOptions: client.stackClient.oauthOptions,
                token: client.stackClient.token
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

exports.createClientInteractive = createClientInteractive;

var main = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    var client;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return createClientInteractive({
              scope: ['io.cozy.files'],
              uri: 'http://cozy.tools:8080',
              oauth: {
                softwareID: 'io.cozy.client.cli'
              }
            });

          case 2:
            client = _context2.sent;
            console.log(client.toJSON());

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function main() {
    return _ref2.apply(this, arguments);
  };
}();

if (require.main === module) {
  main().catch(function (e) {
    console.error(e);
    process.exit(1);
  });
}