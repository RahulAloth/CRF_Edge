'use client';

import _formatErrorMessage from "@mui/x-internals/formatErrorMessage";
import * as React from 'react';
import { GridConfigurationContext } from "../../components/GridConfigurationContext.mjs";
export const useGridConfiguration = () => {
  const configuration = React.useContext(GridConfigurationContext);
  if (configuration === undefined) {
    throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X Data Grid: Could not find the Data Grid configuration context. ' + 'This happens when a component is rendered outside of a DataGrid, DataGridPro, or DataGridPremium parent component. ' + 'Ensure your component is a child of a Data Grid component. ' + 'This can also happen if you are bundling multiple versions of the Data Grid.' : _formatErrorMessage(68));
  }
  return configuration;
};