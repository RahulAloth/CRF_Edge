import type { RefObject } from '@mui/x-internals/types';
import type { GridRowId } from "../../../models/gridRows.mjs";
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
export declare const useGridRowsOverridableMethods: (apiRef: RefObject<GridPrivateApiCommunity>) => {
  setRowIndex: (rowId: GridRowId, targetIndex: number) => void;
  setRowPosition: (sourceRowId: GridRowId, targetRowId: GridRowId, position: import("../../../internals/index.mjs").RowReorderDropPosition) => void | Promise<void>;
};