import type { RefObject } from '@mui/x-internals/types';
import type { GridRowId } from "../../../models/index.mjs";
import type { GridPrivateApiCommunity } from "../../../models/api/gridApiCommunity.mjs";
export declare const getLeftColumnIndex: ({
  currentColIndex,
  firstColIndex,
  lastColIndex,
  isRtl
}: {
  currentColIndex: number;
  firstColIndex: number;
  lastColIndex: number;
  isRtl: boolean;
}) => number | null;
export declare const getRightColumnIndex: ({
  currentColIndex,
  firstColIndex,
  lastColIndex,
  isRtl
}: {
  currentColIndex: number;
  firstColIndex: number;
  lastColIndex: number;
  isRtl: boolean;
}) => number | null;
export declare function findNonRowSpannedCell(apiRef: RefObject<GridPrivateApiCommunity>, rowId: GridRowId, colIndex: number, rowSpanScanDirection: 'up' | 'down'): GridRowId;