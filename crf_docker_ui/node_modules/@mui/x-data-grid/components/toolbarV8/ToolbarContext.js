"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarContext = void 0;
exports.useToolbarContext = useToolbarContext;
var _formatErrorMessage2 = _interopRequireDefault(require("@mui/x-internals/formatErrorMessage"));
var React = _interopRequireWildcard(require("react"));
const ToolbarContext = exports.ToolbarContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ToolbarContext.displayName = "ToolbarContext";
function useToolbarContext() {
  const context = React.useContext(ToolbarContext);
  if (context === undefined) {
    throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X: Missing context. Toolbar subcomponents must be placed within a <Toolbar /> component.' : (0, _formatErrorMessage2.default)(63));
  }
  return context;
}