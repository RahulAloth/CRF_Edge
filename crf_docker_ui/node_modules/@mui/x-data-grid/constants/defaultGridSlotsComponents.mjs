import _extends from "@babel/runtime/helpers/esm/extends";
import { GridSkeletonCell, GridColumnsPanel, GridFilterPanel, GridFooter, GridLoadingOverlay, GridNoRowsOverlay, GridPagination, GridPanel, GridRow, GridColumnHeaderFilterIconButton, GridRowCount, GridColumnsManagement, GridColumnHeaderSortIcon, GridNoColumnsOverlay, GridRowCheckbox } from "../components/index.mjs";
import { GridCell } from "../components/cell/GridCell.mjs";
import { GridColumnHeaders } from "../components/GridColumnHeaders.mjs";
import { GridColumnMenu } from "../components/menu/columnMenu/GridColumnMenu.mjs";
import { GridDetailPanels } from "../components/GridDetailPanels.mjs";
import { GridPinnedRows } from "../components/GridPinnedRows.mjs";
import { GridNoResultsOverlay } from "../components/GridNoResultsOverlay.mjs";
import materialSlots from "../material/index.mjs";
import { GridBottomContainer } from "../components/virtualization/GridBottomContainer.mjs";
import { GridToolbar } from "../components/toolbarV8/GridToolbar.mjs";

// TODO: camelCase these key. It's a private helper now.
// Remove then need to call `uncapitalizeObjectKeys`.
export const DATA_GRID_DEFAULT_SLOTS_COMPONENTS = _extends({}, materialSlots, {
  cell: GridCell,
  skeletonCell: GridSkeletonCell,
  columnHeaderFilterIconButton: GridColumnHeaderFilterIconButton,
  columnHeaderSortIcon: GridColumnHeaderSortIcon,
  columnMenu: GridColumnMenu,
  columnHeaders: GridColumnHeaders,
  detailPanels: GridDetailPanels,
  bottomContainer: GridBottomContainer,
  footer: GridFooter,
  footerRowCount: GridRowCount,
  toolbar: GridToolbar,
  pinnedRows: GridPinnedRows,
  loadingOverlay: GridLoadingOverlay,
  noResultsOverlay: GridNoResultsOverlay,
  noRowsOverlay: GridNoRowsOverlay,
  noColumnsOverlay: GridNoColumnsOverlay,
  pagination: GridPagination,
  filterPanel: GridFilterPanel,
  columnsPanel: GridColumnsPanel,
  columnsManagement: GridColumnsManagement,
  panel: GridPanel,
  row: GridRow,
  rowCheckbox: GridRowCheckbox
});