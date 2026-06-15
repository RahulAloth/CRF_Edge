'use client';

import _formatErrorMessage from "@mui/x-internals/formatErrorMessage";
import * as React from 'react';
import { GridApiContext } from "../../components/GridApiContext.mjs";
export function useGridApiContext() {
  const apiRef = React.useContext(GridApiContext);
  if (apiRef === undefined) {
    throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X Data Grid: Could not find the Data Grid context. ' + 'This happens when a component is rendered outside of a DataGrid, DataGridPro, or DataGridPremium parent component. ' + 'Ensure your component is a child of a Data Grid component. ' + 'This can also happen if you are bundling multiple versions of the Data Grid.' : _formatErrorMessage(67));
  }
  return apiRef;
}