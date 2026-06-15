"use strict";
'use client';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGridRootProps = void 0;
var _formatErrorMessage2 = _interopRequireDefault(require("@mui/x-internals/formatErrorMessage"));
var React = _interopRequireWildcard(require("react"));
var _GridRootPropsContext = require("../../context/GridRootPropsContext");
const useGridRootProps = () => {
  const contextValue = React.useContext(_GridRootPropsContext.GridRootPropsContext);
  if (!contextValue) {
    throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X Data Grid: useGridRootProps should only be used inside a Data Grid component. ' + 'The component must be a child of DataGrid, DataGridPro, or DataGridPremium. ' + 'Ensure your component is properly nested within a Data Grid.' : (0, _formatErrorMessage2.default)(70));
  }
  return contextValue;
};
exports.useGridRootProps = useGridRootProps;