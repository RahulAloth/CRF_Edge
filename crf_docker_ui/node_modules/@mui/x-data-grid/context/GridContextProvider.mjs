'use client';

import * as React from 'react';
import { GridApiContext } from "../components/GridApiContext.mjs";
import { GridPrivateApiContext } from "../hooks/utils/useGridPrivateApiContext.mjs";
import { GridRootPropsContext } from "./GridRootPropsContext.mjs";
import { GridConfigurationContext } from "../components/GridConfigurationContext.mjs";
import { GridPanelContextProvider } from "../components/panel/GridPanelContext.mjs";
import { GridCSSVariablesContext } from "../utils/css/context.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
export function GridContextProvider({
  privateApiRef,
  configuration,
  props,
  children
}) {
  const apiRef = React.useRef(privateApiRef.current.getPublicApi());
  return /*#__PURE__*/_jsx(GridConfigurationContext.Provider, {
    value: configuration,
    children: /*#__PURE__*/_jsx(GridRootPropsContext.Provider, {
      value: props,
      children: /*#__PURE__*/_jsx(GridPrivateApiContext.Provider, {
        value: privateApiRef,
        children: /*#__PURE__*/_jsx(GridApiContext.Provider, {
          value: apiRef,
          children: /*#__PURE__*/_jsx(GridPanelContextProvider, {
            children: /*#__PURE__*/_jsx(GridCSSVariablesContext, {
              children: children
            })
          })
        })
      })
    })
  });
}