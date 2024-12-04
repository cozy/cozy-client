"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observableQuery = exports.client = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var mockImplementations = function mockImplementations(base, implementations) {
  if (!implementations) {
    return;
  }

  Object.entries(implementations).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        name = _ref2[0],
        implementation = _ref2[1];

    try {
      base[name].mockImplementation(implementation);
    } catch (e) {
      console.error(e);
      throw new Error("Could not mock '".concat(name, ". Original error above."));
    }
  });
};

var client = function client(implementations) {
  var base = {
    query: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    destroy: jest.fn(),
    getAssociation: jest.fn(),
    makeObservableQuery: jest.fn(),
    requestQuery: jest.fn(),
    all: jest.fn(),
    setStore: jest.fn(),
    fetchQueryAndGetFromState: jest.fn()
  };
  mockImplementations(base, implementations);
  return base;
};

exports.client = client;

var observableQuery = function observableQuery(implementations) {
  var base = {
    currentResult: jest.fn(),
    subscribe: jest.fn(),
    fetchMore: jest.fn(),
    fetch: jest.fn()
  };
  mockImplementations(base, implementations);
  return base;
};

exports.observableQuery = observableQuery;