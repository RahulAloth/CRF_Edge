import { PinnedColumnPosition } from "../../internals/constants.mjs";
import type { useGridPrivateApiContext } from "./useGridPrivateApiContext.mjs";
export declare function usePinnedScrollOffset(apiRef: ReturnType<typeof useGridPrivateApiContext>, pinnedPosition?: PinnedColumnPosition): number;