"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridPrivateApiContext = void 0;
exports.useGridPrivateApiContext = useGridPrivateApiContext;
var _formatErrorMessage2 = _interopRequireDefault(require("@mui/x-internals/formatErrorMessage"));
var React = _interopRequireWildcard(require("react"));
const GridPrivateApiContext = exports.GridPrivateApiContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") GridPrivateApiContext.displayName = "GridPrivateApiContext";
function useGridPrivateApiContext() {
  const privateApiRef = React.useContext(GridPrivateApiContext);
  if (privateApiRef === undefined) {
    throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X Data Grid: Could not find the Data Grid private context. ' + 'This happens when a component is rendered outside of a DataGrid, DataGridPro, or DataGridPremium parent component. ' + 'Ensure your component is a child of a Data Grid component. ' + 'This can also happen if you are bundling multiple versions of the Data Grid.' : (0, _formatErrorMessage2.default)(69));
  }
  return privateApiRef;
}