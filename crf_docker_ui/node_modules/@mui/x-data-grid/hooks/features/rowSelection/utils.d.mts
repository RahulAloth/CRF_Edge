import type { RefObject } from '@mui/x-internals/types';
import type { GridRowId, GridRowTreeConfig } from "../../../models/gridRows.mjs";
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { GridRowSelectionPropagation } from "../../../models/gridRowSelectionModel.mjs";
import type { RowSelectionManager } from "../../../models/gridRowSelectionManager.mjs";
export declare const ROW_SELECTION_PROPAGATION_DEFAULT: GridRowSelectionPropagation;
export declare const checkboxPropsSelector: (args_0: import("react").RefObject<{
  state: import("../../../models/gridStateCommunity.mjs").GridStateCommunity;
} | null>, args_1: {
  groupId: GridRowId;
  autoSelectParents: boolean;
}) => {
  isIndeterminate: boolean;
  isChecked: boolean;
  isSelectable: boolean;
};
export declare function isMultipleRowSelectionEnabled(props: Pick<DataGridProcessedProps, 'signature' | 'disableMultipleRowSelection' | 'checkboxSelection'>): boolean;
export declare const findRowsToSelect: (apiRef: RefObject<GridPrivateApiCommunity>, tree: GridRowTreeConfig, selectedRow: GridRowId, autoSelectDescendants: boolean, autoSelectParents: boolean, addRow: (rowId: GridRowId) => void, rowSelectionManager?: RowSelectionManager) => void;
export declare const findRowsToDeselect: (apiRef: RefObject<GridPrivateApiCommunity>, tree: GridRowTreeConfig, deselectedRow: GridRowId, autoSelectDescendants: boolean, autoSelectParents: boolean, removeRow: (rowId: GridRowId) => void) => void;