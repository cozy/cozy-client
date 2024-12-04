"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _ = require(".");

var _argparse = require("argparse");

/* eslint-disable-file no-console */
var parseArgs = function parseArgs() {
  var parser = new _argparse.ArgumentParser();
  parser.addArgument('--url', {
    description: 'HTTP URL of the targeted cozy',
    defaultValue: 'http://cozy.tools:8080'
  });
  var args = parser.parseArgs();
  return args;
};

var main = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var args, client, _yield$client$collect, docs;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            args = parseArgs();
            _context.next = 3;
            return (0, _.createClientInteractive)({
              uri: args.url,
              scope: ['io.cozy.bank.operations'],
              oauth: {
                softwareID: 'fake-software-id',
                clientURI: 'http://testcozy.mycozy.cloud',
                softwareVersion: '1.1.0',
                logoURI: 'http://my-logo.com/logo.jpg'
              }
            });

          case 3:
            client = _context.sent;
            _context.next = 6;
            return client.collection('io.cozy.bank.operations').all();

          case 6:
            _yield$client$collect = _context.sent;
            docs = _yield$client$collect.data;
            console.log(docs);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

main().catch(function (e) {
  console.error(e);
  process.exit(1);
});