"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlagEdit = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _TextField = _interopRequireDefault(require("cozy-ui/transpiled/react/TextField"));

var _Buttons = _interopRequireDefault(require("cozy-ui/transpiled/react/Buttons"));

var _cozyFlags = _interopRequireDefault(require("cozy-flags"));

var _helpers = require("./helpers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var FlagEdit = function FlagEdit(_ref) {
  var editedFlag = _ref.flag;

  var _useState = (0, _react.useState)({
    key: '',
    name: '',
    value: '',
    humanValue: ''
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      formData = _useState2[0],
      setFormData = _useState2[1];

  (0, _react.useEffect)(function () {
    if (editedFlag) setFormData(editedFlag);
  }, [editedFlag]);

  var handleSubmit = function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name || !formData.value) return;
    /** @type {any} */

    var value = formData.value;

    if ((0, _helpers.isJSONString)(value)) {
      value = JSON.parse(value);
    } else if (value === 'true' || value === 'false') {
      value = Boolean(value);
    }

    (0, _cozyFlags.default)(formData.name, value);
    location.reload();
  };

  var handleFlagNameChange = function handleFlagNameChange(e) {
    setFormData(_objectSpread(_objectSpread({}, formData), {}, {
      key: "flag__".concat(e.target.value),
      name: e.target.value
    }));
  };

  var handleFlagValueChange = function handleFlagValueChange(e) {
    var value = e.target.value;

    if (Number.isInteger(value)) {
      value = parseInt(value);
    }

    setFormData(_objectSpread(_objectSpread({}, formData), {}, {
      value: value,
      humanValue: (0, _helpers.makeHumanValue)(value)
    }));
  };

  return /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: handleSubmit,
    className: "u-mt-1 u-flex-items-center u-flex"
  }, /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "Name",
    name: "name",
    onChange: handleFlagNameChange,
    value: formData.name,
    size: "small",
    variant: "outlined"
  }), /*#__PURE__*/_react.default.createElement(_TextField.default, {
    label: "Value",
    name: "value",
    onChange: handleFlagValueChange,
    value: formData.humanValue,
    size: "small",
    variant: "outlined",
    className: "u-ml-1"
  }), /*#__PURE__*/_react.default.createElement(_Buttons.default, {
    type: "submit",
    label: "Edit",
    className: "u-ml-1"
  }));
};

exports.FlagEdit = FlagEdit;