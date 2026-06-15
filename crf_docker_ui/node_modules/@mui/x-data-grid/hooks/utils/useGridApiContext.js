"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridApiContext = useGridApiContext;
var _formatErrorMessage2 = _interopRequireDefault(require("@mui/x-internals/formatErrorMessage"));
var React = _interopRequireWildcard(require("react"));
var _GridApiContext = require("../../components/GridApiContext");
function useGridApiContext() {
  const apiRef = React.useContext(_GridApiContext.GridApiContext);
  if (apiRef === undefined) {
    throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X Data Grid: Could not find the Data Grid context. ' + 'This happens when a component is rendered outside of a DataGrid, DataGridPro, or DataGridPremium parent component. ' + 'Ensure your component is a child of a Data Grid component. ' + 'This can also happen if you are bundling multiple versions of the Data Grid.' : (0, _formatErrorMessage2.default)(67));
  }
  return apiRef;
}