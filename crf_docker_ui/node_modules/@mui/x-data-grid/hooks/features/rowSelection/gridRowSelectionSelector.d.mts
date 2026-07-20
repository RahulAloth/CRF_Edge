import type { GridStateCommunity } from "../../../models/gridStateCommunity.mjs";
import type { GridRowId } from "../../../models/gridRows.mjs";
export declare const gridRowSelectionStateSelector: import("@mui/x-data-grid").OutputSelector<GridStateCommunity, unknown, import("@mui/x-data-grid").GridRowSelectionModel>;
export declare const gridRowSelectionManagerSelector: (args_0: import("react").RefObject<{
  state: GridStateCommunity;
} | null>) => import("../../../models/gridRowSelectionManager.mjs").RowSelectionManager;
export declare const gridRowSelectionCountSelector: (args_0: import("react").RefObject<{
  state: GridStateCommunity;
} | null>) => number;
export declare const gridRowSelectionIdsSelector: (args_0: import("react").RefObject<{
  state: GridStateCommunity;
} | null>) => Map<GridRowId, import("@mui/x-data-grid").GridValidRowModel>;