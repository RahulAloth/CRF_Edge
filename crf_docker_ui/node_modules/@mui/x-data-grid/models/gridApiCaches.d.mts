import type { GridRowsInternalCache } from "../hooks/features/rows/gridRowsInterfaces.mjs";
import type { GridRowsMetaInternalCache } from "../hooks/features/rows/gridRowsMetaInterfaces.mjs";
import type { GridColumnGroupingInternalCache } from "../hooks/features/columnGrouping/gridColumnGroupsInterfaces.mjs";
import type { GridColDef } from "./colDef/index.mjs";
export interface GridApiCaches {
  columns: {
    lastColumnsProp: readonly GridColDef[];
  };
  columnGrouping: GridColumnGroupingInternalCache;
  rows: GridRowsInternalCache;
  rowsMeta: GridRowsMetaInternalCache;
}