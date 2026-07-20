import _extends from "@babel/runtime/helpers/esm/extends";
import { gridColumnDefinitionsSelector } from "../../hooks/features/columns/gridColumnsSelector.mjs";
import { useGridSelector } from "../../hooks/utils/useGridSelector.mjs";
import { gridPreferencePanelStateSelector } from "../../hooks/features/preferencesPanel/gridPreferencePanelSelector.mjs";
import { GridPreferencePanelsValue } from "../../hooks/features/preferencesPanel/gridPreferencePanelsValue.mjs";
import { useGridApiContext } from "../../hooks/utils/useGridApiContext.mjs";
import { useGridRootProps } from "../../hooks/utils/useGridRootProps.mjs";
import { useGridPanelContext } from "./GridPanelContext.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
export function GridPreferencesPanel() {
  const apiRef = useGridApiContext();
  const columns = useGridSelector(apiRef, gridColumnDefinitionsSelector);
  const rootProps = useGridRootProps();
  const preferencePanelState = useGridSelector(apiRef, gridPreferencePanelStateSelector);
  const {
    columnsPanelTriggerRef,
    filterPanelTriggerRef,
    aiAssistantPanelTriggerRef
  } = useGridPanelContext();
  const panelContent = apiRef.current.unstable_applyPipeProcessors('preferencePanel', null, preferencePanelState.openedPanelValue ?? GridPreferencePanelsValue.filters);
  let target = null;
  switch (preferencePanelState.openedPanelValue) {
    case GridPreferencePanelsValue.filters:
      target = filterPanelTriggerRef.current;
      break;
    case GridPreferencePanelsValue.columns:
      target = columnsPanelTriggerRef.current;
      break;
    case GridPreferencePanelsValue.aiAssistant:
      target = aiAssistantPanelTriggerRef.current;
      break;
    default:
  }
  return /*#__PURE__*/_jsx(rootProps.slots.panel, _extends({
    id: preferencePanelState.panelId,
    open: columns.length > 0 && preferencePanelState.open,
    "aria-labelledby": preferencePanelState.labelId,
    target: target,
    onClose: () => apiRef.current.hidePreferences()
  }, rootProps.slotProps?.panel, {
    children: panelContent
  }));
}