import type { GridControlledStateReasonLookup } from "../events/gridEventLookup.mjs";
import type { GridApiCommon } from "./gridApiCommon.mjs";
/**
 * Additional details passed to the callbacks
 */
export interface GridCallbackDetails<K extends keyof GridControlledStateReasonLookup = any> {
  /**
   * The reason for this callback to have been called.
   */
  reason?: GridControlledStateReasonLookup[K];
  /**
   * GridApi that let you manipulate the grid.
   */
  api: GridApiCommon;
}