import * as React from 'react';
import type { GridColumnMenuRootProps } from "./columnMenuInterfaces.mjs";
import type { GridColDef } from "../../../models/colDef/gridColDef.mjs";
interface UseGridColumnMenuSlotsProps extends GridColumnMenuRootProps {
  colDef: GridColDef;
  hideMenu: (event: React.SyntheticEvent) => void;
  addDividers?: boolean;
}
type UseGridColumnMenuSlotsResponse = Array<[React.JSXElementConstructor<any>, {
  [key: string]: any;
}]>;
declare const useGridColumnMenuSlots: (props: UseGridColumnMenuSlotsProps) => UseGridColumnMenuSlotsResponse;
export { useGridColumnMenuSlots };