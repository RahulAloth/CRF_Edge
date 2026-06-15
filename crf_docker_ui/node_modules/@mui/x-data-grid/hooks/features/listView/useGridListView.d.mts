import type { RefObject } from '@mui/x-internals/types';
import type { GridListViewColDef } from "../../../models/colDef/gridColDef.mjs";
import type { GridStateInitializer } from "../../utils/useGridInitializeState.mjs";
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
export type GridListViewState = (GridListViewColDef & {
  computedWidth: number;
}) | undefined;
export declare const listViewStateInitializer: GridStateInitializer<Pick<DataGridProcessedProps, 'listViewColumn'>>;
export declare function useGridListView(apiRef: RefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, 'listView' | 'listViewColumn'>): void;