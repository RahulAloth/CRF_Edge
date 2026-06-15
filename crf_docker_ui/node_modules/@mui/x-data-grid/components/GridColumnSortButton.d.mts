import * as React from 'react';
import type { GridSlotProps } from "../models/index.mjs";
import type { GridSortDirection } from "../models/gridSortModel.mjs";
export type GridColumnSortButtonProps = GridSlotProps['baseIconButton'] & {
  field: string;
  direction: GridSortDirection;
  index?: number;
  sortingOrder: readonly GridSortDirection[];
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
declare function GridColumnSortButton(props: GridColumnSortButtonProps): import("react/jsx-runtime").JSX.Element | null;
declare namespace GridColumnSortButton {
  var propTypes: any;
}
export { GridColumnSortButton };