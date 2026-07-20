import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
import type { GridStateInitializer } from "../../utils/useGridInitializeState.mjs";
export declare const headerFilteringStateInitializer: GridStateInitializer;
export declare const useGridHeaderFiltering: (apiRef: RefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, "signature" | "headerFilters">) => void;