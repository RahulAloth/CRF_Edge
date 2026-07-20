import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
export declare const useGridPaginationMeta: (apiRef: RefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, "paginationMeta" | "initialState" | "paginationMode" | "onPaginationMetaChange">) => void;