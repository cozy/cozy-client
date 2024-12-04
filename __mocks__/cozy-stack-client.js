"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FetchError = exports.normalizeDoc = exports.default = exports.OAuthClient = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var _jest$requireActual = jest.requireActual('cozy-stack-client'),
    StackClient = _jest$requireActual.default,
    OriginalOAuthClient = _jest$requireActual.OAuthClient,
    normalizeDoc = _jest$requireActual.normalizeDoc,
    FetchError = _jest$requireActual.FetchError;

exports.FetchError = FetchError;
exports.normalizeDoc = normalizeDoc;
var collectionMock = {
  all: jest.fn(function () {
    return Promise.resolve();
  }),
  // needed because we call it inside the CozyClient constructor
  // so we can't define it during the test
  get: jest.fn(function () {
    return Promise.resolve({
      data: []
    });
  }),
  find: jest.fn(function () {
    return Promise.resolve();
  }),
  create: jest.fn(function () {
    return Promise.resolve();
  }),
  update: jest.fn(function () {
    return Promise.resolve();
  }),
  updateAll: jest.fn(function () {
    return Promise.resolve();
  }),
  destroy: jest.fn(function () {
    return Promise.resolve();
  }),
  findReferencedBy: jest.fn(function () {
    return Promise.resolve();
  })
};

var MockedStackClient = /*#__PURE__*/function (_StackClient) {
  (0, _inherits2.default)(MockedStackClient, _StackClient);

  var _super = _createSuper(MockedStackClient);

  function MockedStackClient(opts) {
    var _this;

    (0, _classCallCheck2.default)(this, MockedStackClient);
    _this = _super.call(this, opts);
    _this.collection = jest.fn(function () {
      return collectionMock;
    });
    return _this;
  }

  return MockedStackClient;
}(StackClient);

var OAuthClient = /*#__PURE__*/function (_OriginalOAuthClient) {
  (0, _inherits2.default)(OAuthClient, _OriginalOAuthClient);

  var _super2 = _createSuper(OAuthClient);

  function OAuthClient(opts) {
    var _this2;

    (0, _classCallCheck2.default)(this, OAuthClient);
    _this2 = _super2.call(this, opts);
    _this2.collection = jest.fn(function () {
      return collectionMock;
    });
    return _this2;
  }

  return OAuthClient;
}(OriginalOAuthClient);

exports.OAuthClient = OAuthClient;
var _default = MockedStackClient;
exports.default = _default;