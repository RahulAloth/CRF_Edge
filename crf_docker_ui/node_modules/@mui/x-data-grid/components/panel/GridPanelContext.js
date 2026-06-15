"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridPanelContext = void 0;
exports.GridPanelContextProvider = GridPanelContextProvider;
exports.useGridPanelContext = useGridPanelContext;
var _formatErrorMessage2 = _interopRequireDefault(require("@mui/x-internals/formatErrorMessage"));
var React = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
const GridPanelContext = exports.GridPanelContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") GridPanelContext.displayName = "GridPanelContext";
function useGridPanelContext() {
  const context = React.useContext(GridPanelContext);
  if (context === undefined) {
    throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X: Missing context.' : (0, _formatErrorMessage2.default)(61));
  }
  return context;
}
function GridPanelContextProvider({
  children
}) {
  const columnsPanelTriggerRef = React.useRef(null);
  const filterPanelTriggerRef = React.useRef(null);
  const aiAssistantPanelTriggerRef = React.useRef(null);
  const value = React.useMemo(() => ({
    columnsPanelTriggerRef,
    filterPanelTriggerRef,
    aiAssistantPanelTriggerRef
  }), []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GridPanelContext.Provider, {
    value: value,
    children: children
  });
}