import { createSelector, createRootSelector } from "../../../utils/createSelector.mjs";
import { GridEditModes } from "../../../models/gridEditRowModel.mjs";

/**
 * Select the row editing state.
 */
export const gridEditRowsStateSelector = createRootSelector(state => state.editRows);
export const gridRowIsEditingSelector = createSelector(gridEditRowsStateSelector, (editRows, {
  rowId,
  editMode
}) => editMode === GridEditModes.Row && Boolean(editRows[rowId]));
export const gridEditCellStateSelector = createSelector(gridEditRowsStateSelector, (editRows, {
  rowId,
  field
}) => editRows[rowId]?.[field] ?? null);