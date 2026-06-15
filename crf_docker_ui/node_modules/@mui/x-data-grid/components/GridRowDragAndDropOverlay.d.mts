import * as React from 'react';
import type { GridRowId } from "../models/gridRows.mjs";
export interface GridRowDragAndDropOverlayProps {
  rowId: GridRowId;
  className?: string;
}
export declare const GridRowDragAndDropOverlay: React.NamedExoticComponent<GridRowDragAndDropOverlayProps>;