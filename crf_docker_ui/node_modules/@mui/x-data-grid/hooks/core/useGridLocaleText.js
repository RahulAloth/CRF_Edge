"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridLocaleText = void 0;
var _formatErrorMessage2 = _interopRequireDefault(require("@mui/x-internals/formatErrorMessage"));
var React = _interopRequireWildcard(require("react"));
const useGridLocaleText = (apiRef, props) => {
  const getLocaleText = React.useCallback(key => {
    if (props.localeText[key] == null) {
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI X: Missing translation for key ${key}.` : (0, _formatErrorMessage2.default)(64, key));
    }
    return props.localeText[key];
  }, [props.localeText]);
  apiRef.current.register('public', {
    getLocaleText
  });
};
exports.useGridLocaleText = useGridLocaleText;