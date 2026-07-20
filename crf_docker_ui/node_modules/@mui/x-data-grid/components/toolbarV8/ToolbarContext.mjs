'use client';

import _formatErrorMessage from "@mui/x-internals/formatErrorMessage";
import * as React from 'react';
export const ToolbarContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") ToolbarContext.displayName = "ToolbarContext";
export function useToolbarContext() {
  const context = React.useContext(ToolbarContext);
  if (context === undefined) {
    throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X: Missing context. Toolbar subcomponents must be placed within a <Toolbar /> component.' : _formatErrorMessage(63));
  }
  return context;
}