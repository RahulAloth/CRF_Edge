import type { RefObject } from '@mui/x-internals/types';
import type { GridCsvExportOptions, GridRowId } from "../../../../models/index.mjs";
import type { GridCellParams } from "../../../../models/params/gridCellParams.mjs";
import type { GridStateColDef } from "../../../../models/colDef/gridColDef.mjs";
import type { GridApiCommunity } from "../../../../models/api/gridApiCommunity.mjs";
export declare const serializeCellValue: (cellParams: GridCellParams, options: {
  csvOptions: CSVOptions;
  ignoreValueFormatter: boolean;
}) => string;
type CSVOptions = Required<Pick<GridCsvExportOptions, 'delimiter' | 'shouldAppendQuotes' | 'escapeFormulas'>>;
interface BuildCSVOptions {
  columns: GridStateColDef[];
  rowIds: GridRowId[];
  csvOptions: Required<Pick<GridCsvExportOptions, 'delimiter' | 'includeColumnGroupsHeaders' | 'includeHeaders' | 'shouldAppendQuotes' | 'escapeFormulas'>>;
  ignoreValueFormatter: boolean;
  apiRef: RefObject<GridApiCommunity>;
}
export declare function buildCSV(options: BuildCSVOptions): string;
export {};