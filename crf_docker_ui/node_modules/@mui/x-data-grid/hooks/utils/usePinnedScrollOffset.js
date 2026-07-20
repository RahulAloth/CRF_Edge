"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePinnedScrollOffset = usePinnedScrollOffset;
var _xVirtualizer = require("@mui/x-virtualizer");
var _constants = require("../../internals/constants");
function usePinnedScrollOffset(apiRef, pinnedPosition) {
  const store = apiRef.current.virtualizer.store;

  // SAFETY: For performance reasons, we only add store selectors for pinned cells in controlled
  // mode. Both pinnedPosition and layoutMode are stable (never change for a given instance),
  // so the hook call order is consistent across renders.
  if (pinnedPosition !== undefined) {
    const layoutMode = store.use(_xVirtualizer.Virtualization.selectors.layoutMode);
    if (layoutMode === 'controlled') {
      if (pinnedPosition === _constants.PinnedColumnPosition.LEFT) {
        return store.use(_xVirtualizer.Virtualization.selectors.pinnedLeftOffsetSelector);
      }
      if (pinnedPosition === _constants.PinnedColumnPosition.RIGHT) {
        return store.use(_xVirtualizer.Virtualization.selectors.pinnedRightOffsetSelector);
      }
    }
  }
  return 0;
}