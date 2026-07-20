'use client';

import _formatErrorMessage from "@mui/x-internals/formatErrorMessage";
import * as React from 'react';
export const GridPrivateApiContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") GridPrivateApiContext.displayName = "GridPrivateApiContext";
export function useGridPrivateApiContext() {
  const privateApiRef = React.useContext(GridPrivateApiContext);
  if (privateApiRef === undefined) {
    throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X Data Grid: Could not find the Data Grid private context. ' + 'This happens when a component is rendered outside of a DataGrid, DataGridPro, or DataGridPremium parent component. ' + 'Ensure your component is a child of a Data Grid component. ' + 'This can also happen if you are bundling multiple versions of the Data Grid.' : _formatErrorMessage(69));
  }
  return privateApiRef;
}