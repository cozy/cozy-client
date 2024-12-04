"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useClientErrors;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _QuotaAlert = _interopRequireDefault(require("cozy-ui/transpiled/react/deprecated/QuotaAlert"));

var _filter = _interopRequireDefault(require("lodash/filter"));

var _cozyStackClient = require("cozy-stack-client");

var _ = require("./");

/**
 * Rendering functions for client fetch errors by status code
 *
 * @private
 * @type {object}
 */
var byHttpStatus = {
  413: QuotaError // <QuotaError />

};
/**
 * Display for a quota error from the client
 *
 * @see QuotaAlert
 * @private
 * @param {object} props - Props
 * @param {Function} props.dismiss - remove the error from the stack to display
 * @returns {React.ReactElement}
 */

function QuotaError(_ref) {
  var dismiss = _ref.dismiss;
  return /*#__PURE__*/_react.default.createElement(_QuotaAlert.default, {
    onClose: dismiss
  });
}
/**
 * Returns the handler for an error
 *
 * @param {import("../types").ClientError} error - The error
 * @returns {Function|null} React Component
 */


function getErrorComponent(error) {
  if (error instanceof Response || error instanceof _cozyStackClient.FetchError) {
    var status = error.status || '';
    return byHttpStatus[status] || null;
  }

  return null;
}
/**
 * Renders a stack of errors
 *
 * @private
 * @see ClientErrors
 * @param {import("../types").ClientError[]} errorStack - array of errors/exceptions
 * @param {Function} setErrorStack - mutates the array of errors
 * @returns {Array<React.ReactElement>} React rendering
 */


function renderErrors(errorStack, setErrorStack) {
  var errors = errorStack.map(function (error, key) {
    var Component = getErrorComponent(error);

    if (Component) {
      var dismiss = function dismiss() {
        return setErrorStack(function (stack) {
          return (0, _filter.default)(stack, function (e) {
            return e !== error;
          });
        });
      };

      return /*#__PURE__*/_react.default.createElement(Component, {
        key: key,
        error: error,
        dismiss: dismiss
      });
    } else {
      return null;
    }
  });
  return errors;
}
/**
 * Manages the client errors and allows to display them
 *
 * Returns a `ClientErrors` React component that takes care
 * of how to display cozy-client errors (probably displaying a modal)
 *
 * Only Quota Errors are managed for now.
 *
 * @example
 * ```
 * const App = () => {
 *   const { ClientErrors } = useClientErrors()
 *
 *   return <Layout>
 *      <h1>My app</h1>
 *      <ClientErrors />
 *   </Layout>
 * }
 * ```
 *
 * @param {object} [props] - Props
 * @param {boolean} [props.handleExceptions] - should cozy-client directly handle errors before forwarding them to the caller?
 * @returns {{ClientErrors: Function}} React component
 */


function useClientErrors() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$handleException = _ref2.handleExceptions,
      handleExceptions = _ref2$handleException === void 0 ? true : _ref2$handleException;

  var client = (0, _.useClient)();

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      errorStack = _useState2[0],
      setErrorStack = _useState2[1];
  /**
   * Handle client errors, add them to the error stack
   *
   * @param {import("../types").ClientError} error -
   * @returns {boolean} true if the error was manager, false otherwise
   */


  var handleError = (0, _react.useCallback)(function (error) {
    // `isErrorManaged` is there to avoid the same error to be added twice
    // once the error has been added once, the `isErrorManaged`is set to true
    // and any future push is ignored
    if (error.isErrorManaged) return false;
    var isManageable = !!getErrorComponent(error);

    if (isManageable) {
      error.isErrorManaged = true;
      setErrorStack(function (stack) {
        return stack.concat(error);
      });
      return true;
    } else {
      error.isErrorManaged = false;
      return false;
    }
  }, [setErrorStack]);
  (0, _react.useEffect)(function () {
    if (handleExceptions) {
      client.on('error', handleError);
      return function () {
        return client.removeListener('error', handleError);
      };
    } else {
      return undefined;
    }
  }, [client, handleError, handleExceptions]); // @ts-ignore

  var ClientErrors = (0, _react.useCallback)(function () {
    return renderErrors(errorStack, setErrorStack);
  }, [errorStack, setErrorStack]); // @ts-ignore

  ClientErrors.displayName = 'ClientErrors';
  return {
    ClientErrors: ClientErrors
  };
}