'use client';

import _formatErrorMessage from "@mui/x-internals/formatErrorMessage";
import * as React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
export const GridPanelContext = /*#__PURE__*/React.createContext(undefined);
if (process.env.NODE_ENV !== "production") GridPanelContext.displayName = "GridPanelContext";
export function useGridPanelContext() {
  const context = React.useContext(GridPanelContext);
  if (context === undefined) {
    throw new Error(process.env.NODE_ENV !== "production" ? 'MUI X: Missing context.' : _formatErrorMessage(61));
  }
  return context;
}
export function GridPanelContextProvider({
  children
}) {
  const columnsPanelTriggerRef = React.useRef(null);
  const filterPanelTriggerRef = React.useRef(null);
  const aiAssistantPanelTriggerRef = React.useRef(null);
  const value = React.useMemo(() => ({
    columnsPanelTriggerRef,
    filterPanelTriggerRef,
    aiAssistantPanelTriggerRef
  }), []);
  return /*#__PURE__*/_jsx(GridPanelContext.Provider, {
    value: value,
    children: children
  });
}