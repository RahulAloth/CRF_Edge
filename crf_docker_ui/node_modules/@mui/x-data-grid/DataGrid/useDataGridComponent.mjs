'use client';

import * as React from 'react';
import { useFirstRender } from '@mui/x-internals/useFirstRender';
import { useGridInitialization } from "../hooks/core/useGridInitialization.mjs";
import { useGridInitializeState } from "../hooks/utils/useGridInitializeState.mjs";
import { useGridClipboard } from "../hooks/features/clipboard/useGridClipboard.mjs";
import { columnMenuStateInitializer, useGridColumnMenu } from "../hooks/features/columnMenu/useGridColumnMenu.mjs";
import { useGridColumns, columnsStateInitializer } from "../hooks/features/columns/useGridColumns.mjs";
import { densityStateInitializer, useGridDensity } from "../hooks/features/density/useGridDensity.mjs";
import { useGridCsvExport } from "../hooks/features/export/useGridCsvExport.mjs";
import { useGridPrintExport } from "../hooks/features/export/useGridPrintExport.mjs";
import { useGridFilter, filterStateInitializer } from "../hooks/features/filter/useGridFilter.mjs";
import { focusStateInitializer, useGridFocus } from "../hooks/features/focus/useGridFocus.mjs";
import { useGridKeyboardNavigation } from "../hooks/features/keyboardNavigation/useGridKeyboardNavigation.mjs";
import { useGridPagination, paginationStateInitializer } from "../hooks/features/pagination/useGridPagination.mjs";
import { useGridPreferencesPanel, preferencePanelStateInitializer } from "../hooks/features/preferencesPanel/useGridPreferencesPanel.mjs";
import { useGridEditing, editingStateInitializer } from "../hooks/features/editing/useGridEditing.mjs";
import { useGridRows, rowsStateInitializer } from "../hooks/features/rows/useGridRows.mjs";
import { useGridRowsPreProcessors } from "../hooks/features/rows/useGridRowsPreProcessors.mjs";
import { useGridParamsApi } from "../hooks/features/rows/useGridParamsApi.mjs";
import { rowSelectionStateInitializer, useGridRowSelection } from "../hooks/features/rowSelection/useGridRowSelection.mjs";
import { useGridRowSelectionPreProcessors } from "../hooks/features/rowSelection/useGridRowSelectionPreProcessors.mjs";
import { useGridSorting, sortingStateInitializer } from "../hooks/features/sorting/useGridSorting.mjs";
import { useGridScroll } from "../hooks/features/scroll/useGridScroll.mjs";
import { useGridEvents } from "../hooks/features/events/useGridEvents.mjs";
import { dimensionsStateInitializer, useGridDimensions } from "../hooks/features/dimensions/useGridDimensions.mjs";
import { rowsMetaStateInitializer } from "../hooks/features/rows/useGridRowsMeta.mjs";
import { useGridStatePersistence } from "../hooks/features/statePersistence/useGridStatePersistence.mjs";
import { useGridColumnSpanning } from "../hooks/features/columns/useGridColumnSpanning.mjs";
import { useGridColumnGrouping, columnGroupsStateInitializer } from "../hooks/features/columnGrouping/useGridColumnGrouping.mjs";
import { useGridVirtualization, virtualizationStateInitializer } from "../hooks/features/virtualization/index.mjs";
import { columnResizeStateInitializer, useGridColumnResize } from "../hooks/features/columnResize/useGridColumnResize.mjs";
import { rowSpanningStateInitializer, useGridRowSpanning } from "../hooks/features/rows/useGridRowSpanning.mjs";
import { listViewStateInitializer, useGridListView } from "../hooks/features/listView/useGridListView.mjs";
import { propsStateInitializer } from "../hooks/core/useGridProps.mjs";
import { useGridDataSource } from "../hooks/features/dataSource/useGridDataSource.mjs";
export const useDataGridComponent = (apiRef, props, configuration) => {
  useGridInitialization(apiRef, props);

  /**
   * Register all pre-processors called during state initialization here.
   */
  useGridRowSelectionPreProcessors(apiRef, props);
  useGridRowsPreProcessors(apiRef);

  /**
   * Register all state initializers here.
   */
  useGridInitializeState(propsStateInitializer, apiRef, props);
  useGridInitializeState(rowSelectionStateInitializer, apiRef, props);
  useGridInitializeState(columnsStateInitializer, apiRef, props);
  useGridInitializeState(rowsStateInitializer, apiRef, props);
  useGridInitializeState(paginationStateInitializer, apiRef, props);
  useGridInitializeState(editingStateInitializer, apiRef, props);
  useGridInitializeState(focusStateInitializer, apiRef, props);
  useGridInitializeState(sortingStateInitializer, apiRef, props);
  useGridInitializeState(preferencePanelStateInitializer, apiRef, props);
  useGridInitializeState(filterStateInitializer, apiRef, props);
  useGridInitializeState(rowSpanningStateInitializer, apiRef, props);
  useGridInitializeState(densityStateInitializer, apiRef, props);
  useGridInitializeState(columnResizeStateInitializer, apiRef, props);
  useGridInitializeState(columnMenuStateInitializer, apiRef, props);
  useGridInitializeState(columnGroupsStateInitializer, apiRef, props);
  useGridInitializeState(virtualizationStateInitializer, apiRef, props);
  useGridInitializeState(dimensionsStateInitializer, apiRef, props);
  useGridInitializeState(rowsMetaStateInitializer, apiRef, props);
  useGridInitializeState(listViewStateInitializer, apiRef, props);
  useGridKeyboardNavigation(apiRef, props);
  useGridRowSelection(apiRef, props);
  useGridColumns(apiRef, props);
  useGridRows(apiRef, props, configuration);
  useGridRowSpanning(apiRef, props);
  useGridParamsApi(apiRef, props, configuration);
  useGridColumnSpanning(apiRef);
  useGridColumnGrouping(apiRef, props);
  useGridEditing(apiRef, props, configuration);
  useGridFocus(apiRef, props);
  useGridPreferencesPanel(apiRef, props);
  useGridFilter(apiRef, props, configuration);
  useGridSorting(apiRef, props);
  useGridDensity(apiRef, props);
  useGridColumnResize(apiRef, props);
  useGridPagination(apiRef, props);
  useGridScroll(apiRef, props);
  useGridColumnMenu(apiRef);
  useGridCsvExport(apiRef, props);
  useGridPrintExport(apiRef, props);
  useGridClipboard(apiRef, props);
  useGridDimensions(apiRef, props);
  useGridEvents(apiRef, props);
  useGridStatePersistence(apiRef);
  useGridVirtualization(apiRef, props);
  useGridListView(apiRef, props);
  useGridDataSource(apiRef, props);

  // Should be the last thing to run, because all pre-processors should have been registered by now.
  useFirstRender(() => {
    apiRef.current.runAppliersForPendingProcessors();
  });
  React.useEffect(() => {
    apiRef.current.runAppliersForPendingProcessors();
  });
};