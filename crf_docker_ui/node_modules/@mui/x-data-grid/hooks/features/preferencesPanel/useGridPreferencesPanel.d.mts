import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
import type { GridStateInitializer } from "../../utils/useGridInitializeState.mjs";
export declare const preferencePanelStateInitializer: GridStateInitializer<Pick<DataGridProcessedProps, 'initialState'>>;
/**
 * TODO: Add a single `setPreferencePanel` method to avoid multiple `setState`
 */
export declare const useGridPreferencesPanel: (apiRef: RefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, "initialState">) => void;