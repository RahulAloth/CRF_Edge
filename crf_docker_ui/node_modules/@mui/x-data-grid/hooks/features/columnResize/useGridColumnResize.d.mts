import type { RefObject } from '@mui/x-internals/types';
import type { GridStateInitializer } from "../../utils/useGridInitializeState.mjs";
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
export declare const columnResizeStateInitializer: GridStateInitializer;
/**
 * @requires useGridColumns (method, event)
 * TODO: improve experience for last column
 */
export declare const useGridColumnResize: (apiRef: RefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, "autosizeOptions" | "autosizeOnMount" | "disableAutosize" | "onColumnResize" | "onColumnWidthChange" | "disableVirtualization">) => void;