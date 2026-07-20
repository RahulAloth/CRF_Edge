import type { RefObject } from '@mui/x-internals/types';
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { GridStateInitializer } from "../../utils/useGridInitializeState.mjs";
import type { GridConfiguration } from "../../../models/configuration/gridConfiguration.mjs";
export declare const rowsStateInitializer: GridStateInitializer<Pick<DataGridProcessedProps, 'dataSource' | 'rows' | 'rowCount' | 'getRowId' | 'loading'>>;
export declare const useGridRows: (apiRef: RefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, "rows" | "getRowId" | "rowCount" | "throttleRowsMs" | "signature" | "pagination" | "paginationMode" | "loading" | "dataSource" | "processRowUpdate" | "onProcessRowUpdateError">, configuration: GridConfiguration) => void;