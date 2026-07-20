import { gridVisibleColumnDefinitionsSelector } from "../features/columns/gridColumnsSelector.mjs";
import { useGridSelector } from "./useGridSelector.mjs";
import { useGridRootProps } from "./useGridRootProps.mjs";
import { gridColumnGroupsHeaderMaxDepthSelector } from "../features/columnGrouping/gridColumnGroupsSelector.mjs";
import { gridPinnedRowsCountSelector } from "../features/rows/gridRowsSelector.mjs";
import { useGridPrivateApiContext } from "./useGridPrivateApiContext.mjs";
import { isMultipleRowSelectionEnabled } from "../features/rowSelection/utils.mjs";
import { gridExpandedRowCountSelector } from "../features/filter/gridFilterSelector.mjs";
export const useGridAriaAttributes = () => {
  const apiRef = useGridPrivateApiContext();
  const rootProps = useGridRootProps();
  const visibleColumns = useGridSelector(apiRef, gridVisibleColumnDefinitionsSelector);
  const accessibleRowCount = useGridSelector(apiRef, gridExpandedRowCountSelector);
  const headerGroupingMaxDepth = useGridSelector(apiRef, gridColumnGroupsHeaderMaxDepthSelector);
  const pinnedRowsCount = useGridSelector(apiRef, gridPinnedRowsCountSelector);
  const ariaLabel = rootProps['aria-label'];
  const ariaLabelledby = rootProps['aria-labelledby'];
  // `aria-label` and `aria-labelledby` should take precedence over `label`
  const shouldUseLabelAsAriaLabel = !ariaLabel && !ariaLabelledby && rootProps.label;
  return {
    role: 'grid',
    'aria-label': shouldUseLabelAsAriaLabel ? rootProps.label : ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-colcount': visibleColumns.length,
    'aria-rowcount': headerGroupingMaxDepth + 1 + pinnedRowsCount + accessibleRowCount,
    'aria-multiselectable': isMultipleRowSelectionEnabled(rootProps)
  };
};