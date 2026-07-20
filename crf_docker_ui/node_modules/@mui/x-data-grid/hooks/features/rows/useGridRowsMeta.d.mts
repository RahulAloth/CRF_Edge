import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
import type { GridStateInitializer } from "../../utils/useGridInitializeState.mjs";
export declare const rowsMetaStateInitializer: GridStateInitializer;
/**
 * @requires useGridPageSize (method)
 * @requires useGridPage (method)
 */
export declare const useGridRowsMeta: (apiRef: RefObject<GridPrivateApiCommunity>, _props: Pick<DataGridProcessedProps, "getRowHeight" | "getEstimatedRowHeight" | "getRowSpacing" | "pagination" | "paginationMode" | "rowHeight">) => void;