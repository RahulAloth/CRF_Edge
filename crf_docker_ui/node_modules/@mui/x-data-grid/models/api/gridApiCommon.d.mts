import type { Virtualizer } from '@mui/x-virtualizer';
import type { GridColumnApi } from "./gridColumnApi.mjs";
import type { GridColumnMenuApi } from "./gridColumnMenuApi.mjs";
import type { GridCoreApi, GridCorePrivateApi } from "./gridCoreApi.mjs";
import type { GridCsvExportApi } from "./gridCsvExportApi.mjs";
import type { GridDensityApi } from "./gridDensityApi.mjs";
import type { GridEditingApi, GridEditingPrivateApi } from "./gridEditingApi.mjs";
import type { GridFilterApi } from "./gridFilterApi.mjs";
import type { GridFocusApi, GridFocusPrivateApi } from "./gridFocusApi.mjs";
import type { GridLocaleTextApi } from "./gridLocaleTextApi.mjs";
import type { GridParamsApi, GridParamsPrivateApi } from "./gridParamsApi.mjs";
import type { GridPreferencesPanelApi } from "./gridPreferencesPanelApi.mjs";
import type { GridPrintExportApi } from "./gridPrintExportApi.mjs";
import type { GridRowApi, GridRowProPrivateApi } from "./gridRowApi.mjs";
import type { GridRowsMetaApi, GridRowsMetaPrivateApi } from "./gridRowsMetaApi.mjs";
import type { GridRowSelectionApi } from "./gridRowSelectionApi.mjs";
import type { GridSortApi } from "./gridSortApi.mjs";
import type { GridStateApi, GridStatePrivateApi } from "./gridStateApi.mjs";
import type { GridLoggerApi } from "./gridLoggerApi.mjs";
import type { GridScrollApi } from "./gridScrollApi.mjs";
import type { GridVirtualizationApi, GridVirtualizationPrivateApi } from "./gridVirtualizationApi.mjs";
import type { GridPipeProcessingApi, GridPipeProcessingPrivateApi } from "../../hooks/core/pipeProcessing/index.mjs";
import type { GridColumnSpanningApi, GridColumnSpanningPrivateApi } from "./gridColumnSpanning.mjs";
import type { GridStrategyProcessingApi } from "../../hooks/core/strategyProcessing/index.mjs";
import type { GridDimensionsApi, GridDimensionsPrivateApi } from "../../hooks/features/dimensions/gridDimensionsApi.mjs";
import type { GridPaginationApi } from "../../hooks/features/pagination/index.mjs";
import type { GridStatePersistenceApi } from "../../hooks/features/statePersistence/index.mjs";
import type { GridColumnGroupingApi } from "./gridColumnGroupingApi.mjs";
import type { GridInitialStateCommunity, GridStateCommunity } from "../gridStateCommunity.mjs";
import type { GridHeaderFilteringApi, GridHeaderFilteringPrivateApi } from "./gridHeaderFilteringApi.mjs";
import type { DataGridProcessedProps } from "../props/DataGridProps.mjs";
import type { GridColumnResizeApi } from "../../hooks/features/columnResize/index.mjs";
import type { GridPivotingPrivateApiCommunity } from "../../hooks/features/pivoting/gridPivotingInterfaces.mjs";
export interface GridApiCommon<GridState extends GridStateCommunity = GridStateCommunity, GridInitialState extends GridInitialStateCommunity = GridInitialStateCommunity> extends GridCoreApi, GridPipeProcessingApi, GridDensityApi, GridDimensionsApi, GridRowApi, GridRowsMetaApi, GridEditingApi, GridParamsApi, GridColumnApi, GridRowSelectionApi, GridSortApi, GridPaginationApi, GridCsvExportApi, GridFocusApi, GridFilterApi, GridColumnMenuApi, GridPreferencesPanelApi, GridPrintExportApi, GridVirtualizationApi, GridLocaleTextApi, GridScrollApi, GridColumnSpanningApi, GridStateApi<GridState>, GridStatePersistenceApi<GridInitialState>, GridColumnGroupingApi, GridHeaderFilteringApi, GridColumnResizeApi {}
export interface GridPrivateOnlyApiCommon<Api extends GridApiCommon, PrivateApi extends GridPrivateApiCommon, Props extends DataGridProcessedProps> extends GridCorePrivateApi<Api, PrivateApi, Props>, GridStatePrivateApi<PrivateApi['state']>, GridPipeProcessingPrivateApi, GridStrategyProcessingApi, GridColumnSpanningPrivateApi, GridRowsMetaPrivateApi, GridDimensionsPrivateApi, GridEditingPrivateApi, GridLoggerApi, GridFocusPrivateApi, GridHeaderFilteringPrivateApi, GridVirtualizationPrivateApi, GridRowProPrivateApi, GridParamsPrivateApi, GridPivotingPrivateApiCommunity {
  virtualizer: Virtualizer;
}
export interface GridPrivateApiCommon extends GridApiCommon, GridPrivateOnlyApiCommon<GridApiCommon, GridPrivateApiCommon, DataGridProcessedProps> {}