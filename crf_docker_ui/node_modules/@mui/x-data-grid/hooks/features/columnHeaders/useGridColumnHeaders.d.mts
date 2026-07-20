import * as React from 'react';
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
import type { GridColumnsRenderContext } from "../../../models/params/gridScrollParams.mjs";
import type { GridStateColDef } from "../../../models/colDef/gridColDef.mjs";
import type { GridSortColumnLookup } from "../sorting/index.mjs";
import type { GridFilterActiveItemsLookup } from "../filter/index.mjs";
import type { GridColumnGroupIdentifier, GridColumnIdentifier } from "../focus/index.mjs";
import type { GridColumnMenuState } from "../columnMenu/index.mjs";
import { type GridColumnVisibilityModel, gridColumnPositionsSelector } from "../columns/index.mjs";
import type { GridGroupingStructure } from "../columnGrouping/gridColumnGroupsInterfaces.mjs";
import { PinnedColumnPosition } from "../../../internals/constants.mjs";
export interface UseGridColumnHeadersProps {
  visibleColumns: GridStateColDef[];
  sortColumnLookup: GridSortColumnLookup;
  filterColumnLookup: GridFilterActiveItemsLookup;
  columnHeaderTabIndexState: GridColumnIdentifier | null;
  columnGroupHeaderTabIndexState: GridColumnGroupIdentifier | null;
  columnHeaderFocus: GridColumnIdentifier | null;
  columnGroupHeaderFocus: GridColumnGroupIdentifier | null;
  headerGroupingMaxDepth: number;
  columnMenuState: GridColumnMenuState;
  columnVisibility: GridColumnVisibilityModel;
  columnGroupsHeaderStructure: GridGroupingStructure[][];
  hasOtherElementInTabSequence: boolean;
}
export interface GetHeadersParams {
  position?: PinnedColumnPosition;
  renderContext?: GridColumnsRenderContext;
  maxLastColumn?: number;
}
type OwnerState = DataGridProcessedProps;
export declare const GridColumnHeaderRow: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material/styles").Theme> & {
  ownerState: OwnerState;
}, Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, keyof React.ClassAttributes<HTMLDivElement> | keyof React.HTMLAttributes<HTMLDivElement>>, {}>;
export declare const useGridColumnHeaders: (props: UseGridColumnHeadersProps) => {
  renderContext: GridColumnsRenderContext;
  leftRenderContext: {
    firstColumnIndex: number;
    lastColumnIndex: number;
  } | null;
  rightRenderContext: {
    firstColumnIndex: number;
    lastColumnIndex: number;
  } | null;
  pinnedColumns: {
    left: GridStateColDef[];
    right: GridStateColDef[];
  };
  visibleColumns: GridStateColDef[];
  columnPositions: number[];
  getFillers: (params: GetHeadersParams | undefined, children: React.ReactNode, leftOverflow: number, borderBottom?: boolean) => import("react/jsx-runtime").JSX.Element;
  getColumnHeadersRow: () => import("react/jsx-runtime").JSX.Element;
  getColumnsToRender: (params?: GetHeadersParams) => {
    renderedColumns: GridStateColDef[];
    firstColumnToRender: number;
    lastColumnToRender: number;
  };
  getColumnGroupHeadersRows: () => React.JSX.Element[] | null;
  getPinnedCellOffset: (pinnedPosition: PinnedColumnPosition | undefined, computedWidth: number, columnIndex: number, columnPositions: ReturnType<typeof gridColumnPositionsSelector>, columnsTotalWidth: number, scrollbarWidth: number) => number | undefined;
  isDragging: boolean;
  getInnerProps: () => {
    role: string;
  };
};
export {};