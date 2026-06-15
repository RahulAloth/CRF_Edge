"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridConfiguration = void 0;
var _formatErrorMessage2 = _interopRequireDefault(require("@mui/x-internals/formatErrorMessage"));
var React = _interopRequireWildcard(require("react"));
var _GridConfigurationContext = require("../../components/GridConfigurationContext");
const useGridConfiguration = () => {
  const configuration = React.useContext(_GridConfigurationContext.GridConfigurationContext);
  if (configuration === undefined) {
    throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X Data Grid: Could not find the Data Grid configuration context. ' + 'This happens when a component is rendered outside of a DataGrid, DataGridPro, or DataGridPremium parent component. ' + 'Ensure your component is a child of a Data Grid component. ' + 'This can also happen if you are bundling multiple versions of the Data Grid.' : (0, _formatErrorMessage2.default)(68));
  }
  return configuration;
};
exports.useGridConfiguration = useGridConfiguration;