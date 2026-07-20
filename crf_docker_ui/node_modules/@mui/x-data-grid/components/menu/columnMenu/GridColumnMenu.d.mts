import { GridColumnMenuColumnsItem } from "./menuItems/GridColumnMenuColumnsItem.mjs";
import { GridColumnMenuFilterItem } from "./menuItems/GridColumnMenuFilterItem.mjs";
import { GridColumnMenuSortItem } from "./menuItems/GridColumnMenuSortItem.mjs";
import type { GridGenericColumnMenuProps, GridColumnMenuComponent } from "./GridColumnMenuProps.mjs";
export declare const GRID_COLUMN_MENU_SLOTS: {
  columnMenuSortItem: typeof GridColumnMenuSortItem;
  columnMenuFilterItem: typeof GridColumnMenuFilterItem;
  columnMenuColumnsItem: typeof GridColumnMenuColumnsItem;
};
export declare const GRID_COLUMN_MENU_SLOT_PROPS: {
  columnMenuSortItem: {
    displayOrder: number;
  };
  columnMenuFilterItem: {
    displayOrder: number;
  };
  columnMenuColumnsItem: {
    displayOrder: number;
  };
};
declare const GridGenericColumnMenu: import("react").ForwardRefExoticComponent<GridGenericColumnMenuProps> | import("react").ForwardRefExoticComponent<GridGenericColumnMenuProps & import("react").RefAttributes<HTMLUListElement>>;
declare const GridColumnMenu: GridColumnMenuComponent;
export { GridColumnMenu, GridGenericColumnMenu };