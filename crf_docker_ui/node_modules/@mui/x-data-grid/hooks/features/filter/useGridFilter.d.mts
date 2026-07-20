import type { RefObject } from '@mui/x-internals/types';
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { GridStateInitializer } from "../../utils/useGridInitializeState.mjs";
import type { GridConfiguration } from "../../../models/configuration/gridConfiguration.mjs";
export declare const filterStateInitializer: GridStateInitializer<Pick<DataGridProcessedProps, 'filterModel' | 'initialState' | 'disableMultipleColumnsFiltering'>>;
/**
 * @requires useGridColumns (method, event)
 * @requires useGridParamsApi (method)
 * @requires useGridRows (event)
 */
export declare const useGridFilter: (apiRef: RefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, "rows" | "initialState" | "filterModel" | "getRowId" | "onFilterModelChange" | "filterMode" | "disableMultipleColumnsFiltering" | "slots" | "slotProps" | "disableColumnFilter" | "disableEval" | "ignoreDiacritics" | "signature">, configuration: GridConfiguration) => void;