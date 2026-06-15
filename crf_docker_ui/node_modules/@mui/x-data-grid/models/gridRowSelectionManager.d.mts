import type { GridRowId } from "./gridRows.mjs";
import type { GridRowSelectionModel } from "./gridRowSelectionModel.mjs";
export interface RowSelectionManager {
  data: Set<GridRowId>;
  has(id: GridRowId): boolean;
  select(id: GridRowId): void;
  unselect(id: GridRowId): void;
}
export declare const createRowSelectionManager: (model: GridRowSelectionModel) => RowSelectionManager;