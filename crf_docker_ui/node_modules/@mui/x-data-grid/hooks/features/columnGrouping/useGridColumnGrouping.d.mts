import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
import type { GridStateInitializer } from "../../utils/useGridInitializeState.mjs";
export declare const columnGroupsStateInitializer: GridStateInitializer<Pick<DataGridProcessedProps, 'columnGroupingModel'>>;
/**
 * @requires useGridColumns (method, event)
 * @requires useGridParamsApi (method)
 */
export declare const useGridColumnGrouping: (apiRef: RefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, "columnGroupingModel">) => void;