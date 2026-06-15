import type * as React from 'react';
import type { GridRowAriaAttributesInternalHook, GridRowsOverridableMethodsInternalHook } from "./gridRowConfiguration.mjs";
import type { GridAggregationInternalHooks } from "./gridAggregationConfiguration.mjs";
import type { GridCellEditableInternalHook } from "./gridCellEditableConfiguration.mjs";
import type { GridCSSVariablesInterface } from "../../constants/cssVariables.mjs";
import type { GridPrivateApiCommon } from "../api/gridApiCommon.mjs";
import type { GridPrivateApiCommunity } from "../api/gridApiCommunity.mjs";
import type { DataGridProcessedProps } from "../props/DataGridProps.mjs";
import type { GridParamsOverridableMethodsInternalHook } from "./gridParamsConfiguration.mjs";
export interface GridAriaAttributesInternalHook {
  useGridAriaAttributes: () => React.HTMLAttributes<HTMLElement>;
}
export interface GridInternalHook<Api, Props> extends GridAriaAttributesInternalHook, GridRowAriaAttributesInternalHook, GridCellEditableInternalHook<Api, Props>, GridAggregationInternalHooks<Api, Props>, GridRowsOverridableMethodsInternalHook<Api, Props>, GridParamsOverridableMethodsInternalHook<Api> {
  useCSSVariables: () => {
    id: string;
    variables: GridCSSVariablesInterface;
  };
}
export interface GridConfiguration<Api extends GridPrivateApiCommon = GridPrivateApiCommunity, Props = DataGridProcessedProps> {
  hooks: GridInternalHook<Api, Props>;
}