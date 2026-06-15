import type { ComponentsOverrides, ComponentsProps } from '@mui/material/styles';
import type { DataGridProps } from "../models/props/DataGridProps.mjs";
export interface DataGridComponentsPropsList {
  MuiDataGrid: DataGridProps;
}
export interface DataGridComponents<Theme = unknown> {
  MuiDataGrid?: {
    defaultProps?: ComponentsProps['MuiDataGrid'];
    styleOverrides?: ComponentsOverrides<Theme>['MuiDataGrid'];
  };
}
declare module '@mui/material/styles' {
  interface ComponentsPropsList extends DataGridComponentsPropsList {}
  interface Components<Theme = unknown> extends DataGridComponents<Theme> {}
}