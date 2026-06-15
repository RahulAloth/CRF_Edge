import type * as React from 'react';
import type { GridColDef } from "../../../models/colDef/gridColDef.mjs";
export interface GridColumnMenuItemProps {
  colDef: GridColDef;
  onClick: (event: React.MouseEvent<any>) => void;
  [key: string]: any;
}