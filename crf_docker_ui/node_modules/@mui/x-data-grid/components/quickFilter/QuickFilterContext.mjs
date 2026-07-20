'use client';

import _formatErrorMessage from "@mui/x-internals/formatErrorMessage";
import * as React from 'react';
export const QuickFilterContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") QuickFilterContext.displayName = "QuickFilterContext";
export function useQuickFilterContext() {
  const context = React.useContext(QuickFilterContext);
  if (context === undefined) {
    throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X: Missing context. Quick Filter subcomponents must be placed within a <QuickFilter /> component.' : _formatErrorMessage(62));
  }
  return context;
}