'use client';

import _formatErrorMessage from "@mui/x-internals/formatErrorMessage";
import * as React from 'react';
import { GridRootPropsContext } from "../../context/GridRootPropsContext.mjs";
export const useGridRootProps = () => {
  const contextValue = React.useContext(GridRootPropsContext);
  if (!contextValue) {
    throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X Data Grid: useGridRootProps should only be used inside a Data Grid component. ' + 'The component must be a child of DataGrid, DataGridPro, or DataGridPremium. ' + 'Ensure your component is properly nested within a Data Grid.' : _formatErrorMessage(70));
  }
  return contextValue;
};