import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
export declare const useGridCellEditing: (apiRef: RefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, "editMode" | "processRowUpdate" | "onCellEditStart" | "onCellEditStop" | "cellModesModel" | "onCellModesModelChange" | "onProcessRowUpdateError" | "signature" | "dataSource">) => void;