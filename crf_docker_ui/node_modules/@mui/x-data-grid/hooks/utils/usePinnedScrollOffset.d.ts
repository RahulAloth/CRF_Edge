import { PinnedColumnPosition } from "../../internals/constants.js";
import type { useGridPrivateApiContext } from "./useGridPrivateApiContext.js";
export declare function usePinnedScrollOffset(apiRef: ReturnType<typeof useGridPrivateApiContext>, pinnedPosition?: PinnedColumnPosition): number;