import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
import type { GridStateInitializer } from "../../utils/useGridInitializeState.mjs";
export declare const paginationStateInitializer: GridStateInitializer<Pick<DataGridProcessedProps, 'paginationModel' | 'rowCount' | 'initialState' | 'autoPageSize' | 'signature' | 'paginationMeta' | 'pagination' | 'paginationMode'>>;
/**
 * @requires useGridFilter (state)
 * @requires useGridDimensions (event) - can be after
 */
export declare const useGridPagination: (apiRef: RefObject<GridPrivateApiCommunity>, props: DataGridProcessedProps) => void;