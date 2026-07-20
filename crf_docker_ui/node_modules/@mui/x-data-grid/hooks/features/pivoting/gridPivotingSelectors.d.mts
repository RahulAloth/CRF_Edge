import type { GridColDef } from "../../../models/colDef/index.mjs";
import type { GridStateCommunity } from "../../../models/gridStateCommunity.mjs";
export declare const gridPivotActiveSelector: (args_0: import("react").RefObject<{
  state: GridStateCommunity;
} | null>) => boolean;
export declare const gridPivotInitialColumnsSelector: (args_0: import("react").RefObject<{
  state: GridStateCommunity;
} | null>) => Map<string, GridColDef>;