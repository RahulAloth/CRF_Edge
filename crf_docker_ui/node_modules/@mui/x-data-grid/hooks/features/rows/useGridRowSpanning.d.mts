import type { RefObject } from '@mui/x-internals/types';
import type { RowSpanningState } from '@mui/x-virtualizer/models';
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { GridStateInitializer } from "../../utils/useGridInitializeState.mjs";
export interface GridRowSpanningState extends RowSpanningState {}
export type RowRange = {
  firstRowIndex: number;
  lastRowIndex: number;
};
/**
 * @requires columnsStateInitializer (method) - should be initialized before
 * @requires rowsStateInitializer (method) - should be initialized before
 * @requires filterStateInitializer (method) - should be initialized before
 */
export declare const rowSpanningStateInitializer: GridStateInitializer;
export declare const useGridRowSpanning: (apiRef: RefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, "rowSpanning" | "pagination" | "paginationMode">) => void;