import type { RefObject } from '@mui/x-internals/types';
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { GridStateInitializer } from "../../utils/useGridInitializeState.mjs";
export declare const sortingStateInitializer: GridStateInitializer<Pick<DataGridProcessedProps, 'sortModel' | 'initialState' | 'disableMultipleColumnsSorting'>>;
/**
 * @requires useGridRows (event)
 * @requires useGridColumns (event)
 */
export declare const useGridSorting: (apiRef: RefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, "initialState" | "sortModel" | "onSortModelChange" | "sortingOrder" | "sortingMode" | "disableColumnSorting" | "disableMultipleColumnsSorting" | "multipleColumnsSortingMode" | "signature">) => void;