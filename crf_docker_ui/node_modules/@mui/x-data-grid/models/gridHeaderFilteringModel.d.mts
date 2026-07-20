import type { GridColDef } from "./colDef/index.mjs";
export type GridHeaderFilteringState = {
  enabled: boolean;
  editing: GridColDef['field'] | null;
  menuOpen: GridColDef['field'] | null;
};