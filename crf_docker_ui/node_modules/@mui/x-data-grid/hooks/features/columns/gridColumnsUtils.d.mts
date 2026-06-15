import type { RefObject } from '@mui/x-internals/types';
import type { GridColumnsState, GridColumnsRawState, GridColumnVisibilityModel, GridColumnsInitialState } from "./gridColumnsInterfaces.mjs";
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
import type { GridApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { GridColDef } from "../../../models/colDef/gridColDef.mjs";
import type { GridApiCommon } from "../../../models/api/gridApiCommon.mjs";
import type { GridRowEntry } from "../../../models/gridRows.mjs";
import type { GridDimensions } from "../dimensions/gridDimensionsApi.mjs";
export declare const COLUMNS_DIMENSION_PROPERTIES: readonly ["maxWidth", "minWidth", "width", "flex"];
export type GridColumnDimensionProperties = (typeof COLUMNS_DIMENSION_PROPERTIES)[number];
/**
 * Computes width for flex columns.
 * Based on CSS Flexbox specification:
 * https://drafts.csswg.org/css-flexbox-1/#resolve-flexible-lengths
 */
export declare function computeFlexColumnsWidth({
  initialFreeSpace,
  totalFlexUnits,
  flexColumns
}: {
  initialFreeSpace: number;
  totalFlexUnits: number;
  flexColumns: {
    field: GridColDef['field'];
    flex?: number | null;
    minWidth?: number;
    maxWidth?: number;
  }[];
}): Record<string, {
  flex: number;
  computedWidth: number;
  frozen: boolean;
}>;
/**
 * Compute the `computedWidth` (ie: the width the column should have during rendering) based on the `width` / `flex` / `minWidth` / `maxWidth` properties of `GridColDef`.
 * The columns already have been merged with there `type` default values for `minWidth`, `maxWidth` and `width`, thus the `!` for those properties below.
 * TODO: Unit test this function in depth and only keep basic cases for the whole grid testing.
 * TODO: Improve the `GridColDef` typing to reflect the fact that `minWidth` / `maxWidth` and `width` can't be null after the merge with the `type` default values.
 */
export declare const hydrateColumnsWidth: (rawState: GridColumnsRawState, dimensions: GridDimensions | undefined) => GridColumnsState;
export declare function getDefaultColTypeDef(type: GridColDef['type']): import("@mui/x-data-grid").GridColTypeDef;
export declare const createColumnsState: ({
  apiRef,
  columnsToUpsert,
  initialState,
  columnVisibilityModel,
  keepOnlyColumnsToUpsert,
  updateInitialVisibilityModel
}: {
  columnsToUpsert: readonly GridColDef[];
  initialState: GridColumnsInitialState | undefined;
  columnVisibilityModel?: GridColumnVisibilityModel;
  keepOnlyColumnsToUpsert: boolean;
  updateInitialVisibilityModel?: boolean;
  apiRef: RefObject<GridApiCommunity>;
}) => GridColumnsState;
export declare function getFirstNonSpannedColumnToRender({
  firstColumnToRender,
  apiRef,
  firstRowToRender,
  lastRowToRender,
  visibleRows
}: {
  firstColumnToRender: number;
  apiRef: RefObject<GridApiCommon>;
  firstRowToRender: number;
  lastRowToRender: number;
  visibleRows: GridRowEntry[];
}): number;
export declare function getTotalHeaderHeight(apiRef: RefObject<GridApiCommunity>, props: Pick<DataGridProcessedProps, 'columnHeaderHeight' | 'headerFilterHeight' | 'listView' | 'columnGroupHeaderHeight'>): number;