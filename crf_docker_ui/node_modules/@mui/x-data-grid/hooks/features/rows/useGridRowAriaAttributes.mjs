import * as React from 'react';
import { useGridSelector } from "../../utils/useGridSelector.mjs";
import { gridColumnGroupsHeaderMaxDepthSelector } from "../columnGrouping/gridColumnGroupsSelector.mjs";
import { useGridPrivateApiContext } from "../../utils/useGridPrivateApiContext.mjs";
export const useGridRowAriaAttributes = () => {
  const apiRef = useGridPrivateApiContext();
  const headerGroupingMaxDepth = useGridSelector(apiRef, gridColumnGroupsHeaderMaxDepthSelector);
  return React.useCallback((rowNode, index) => {
    const ariaAttributes = {};
    const ariaRowIndex = index + headerGroupingMaxDepth + 2; // 1 for the header row and 1 as it's 1-based
    ariaAttributes['aria-rowindex'] = ariaRowIndex;

    // XXX: fix this properly
    if (rowNode && apiRef.current.isRowSelectable(rowNode.id)) {
      ariaAttributes['aria-selected'] = apiRef.current.isRowSelected(rowNode.id);
    }
    return ariaAttributes;
  }, [apiRef, headerGroupingMaxDepth]);
};