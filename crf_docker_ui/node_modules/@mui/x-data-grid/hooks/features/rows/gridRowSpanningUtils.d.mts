import type { RefObject } from '@mui/x-internals/types';
import type { GridRenderContext } from "../../../models/index.mjs";
import type { GridValidRowModel } from "../../../models/gridRows.mjs";
import type { GridColDef } from "../../../models/colDef/index.mjs";
import type { GridApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { RowRange } from "./useGridRowSpanning.mjs";
export declare function getUnprocessedRange(testRange: RowRange, processedRange: RowRange): RowRange | null;
export declare function isRowContextInitialized(renderContext: GridRenderContext): boolean;
export declare const getCellValue: (row: GridValidRowModel, colDef: GridColDef, apiRef: RefObject<GridApiCommunity>) => any;