import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
import type { DataGridProcessedProps } from "../../../models/props/DataGridProps.mjs";
/**
 * @requires useGridCsvExport (method)
 * @requires useGridSelection (method)
 */
export declare const useGridClipboard: (apiRef: RefObject<GridPrivateApiCommunity>, props: Pick<DataGridProcessedProps, "ignoreValueFormatterDuringExport" | "onClipboardCopy" | "clipboardCopyCellDelimiter">) => void;