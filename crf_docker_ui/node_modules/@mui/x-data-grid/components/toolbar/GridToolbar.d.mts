import { type GridToolbarContainerProps } from "../containers/GridToolbarContainer.mjs";
import { type GridToolbarExportProps } from "./GridToolbarExport.mjs";
import { type GridToolbarQuickFilterProps } from "./GridToolbarQuickFilter.mjs";
export interface GridToolbarProps extends GridToolbarContainerProps, GridToolbarExportProps {
  /**
   * Show the history controls (undo/redo buttons).
   * @default true
   */
  showHistoryControls?: boolean;
  /**
   * Show the quick filter component.
   * @default true
   */
  showQuickFilter?: boolean;
  /**
   * Props passed to the quick filter component.
   */
  quickFilterProps?: GridToolbarQuickFilterProps;
}
/**
 * @deprecated Use the `showToolbar` prop to show the default toolbar instead. This component will be removed in a future major release.
 */
declare const GridToolbar: import("react").ForwardRefExoticComponent<GridToolbarProps> | import("react").ForwardRefExoticComponent<GridToolbarProps & import("react").RefAttributes<HTMLDivElement>>;
export { GridToolbar };