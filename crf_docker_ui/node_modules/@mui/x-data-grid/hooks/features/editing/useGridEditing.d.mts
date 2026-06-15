import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
import type { GridConfiguration } from "../../../models/configuration/gridConfiguration.mjs";
import type { GridStateInitializer } from "../../utils/useGridInitializeState.mjs";
export declare const editingStateInitializer: GridStateInitializer;
export declare const useGridEditing: (apiRef: RefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, "isCellEditable" | "editMode" | "processRowUpdate" | "dataSource" | "onDataSourceError">, configuration: GridConfiguration) => void;