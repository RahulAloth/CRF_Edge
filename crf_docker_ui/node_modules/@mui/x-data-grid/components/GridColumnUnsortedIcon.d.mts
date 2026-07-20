import type { GridBaseIconProps } from "../models/gridSlotsComponentsProps.mjs";
import type { GridSortDirection } from "../models/gridSortModel.mjs";
export interface GridColumnUnsortedIconProps extends GridBaseIconProps {
  sortingOrder: GridSortDirection[];
}
declare function GridColumnUnsortedIcon(props: GridColumnUnsortedIconProps): import("react/jsx-runtime").JSX.Element | null;
declare namespace GridColumnUnsortedIcon {
  var propTypes: any;
}
export { GridColumnUnsortedIcon };