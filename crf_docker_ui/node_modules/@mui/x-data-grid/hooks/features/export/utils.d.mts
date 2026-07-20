import type { RefObject } from '@mui/x-internals/types';
import type { GridApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { GridExportOptions, GridCsvGetRowsToExportParams } from "../../../models/gridExport.mjs";
import type { GridStateColDef } from "../../../models/colDef/gridColDef.mjs";
import type { GridRowId } from "../../../models/index.mjs";
interface GridGetColumnsToExportParams {
  /**
   * The API of the grid.
   */
  apiRef: RefObject<GridApiCommunity>;
  options: GridExportOptions;
}
export declare const getColumnsToExport: ({
  apiRef,
  options
}: GridGetColumnsToExportParams) => GridStateColDef[];
export declare const defaultGetRowsToExport: ({
  apiRef
}: GridCsvGetRowsToExportParams) => GridRowId[];
export {};