import type { GridDataSourceApi } from "../../hooks/features/dataSource/models.mjs";
import type { GridInitialStateCommunity, GridStateCommunity } from "../gridStateCommunity.mjs";
import type { DataGridProcessedProps } from "../props/DataGridProps.mjs";
import type { GridApiCommon, GridPrivateOnlyApiCommon } from "./gridApiCommon.mjs";
import type { GridColumnReorderApi } from "./gridColumnApi.mjs";
import type { GridRowProApi } from "./gridRowApi.mjs";
import type { GridRowMultiSelectionApi } from "./gridRowSelectionApi.mjs";
/**
 * The API of the community version of the Data Grid.
 */
export interface GridApiCommunity extends GridApiCommon<GridStateCommunity, GridInitialStateCommunity>, GridDataSourceApi {}
export interface GridPrivateApiCommunity extends GridApiCommunity, GridPrivateOnlyApiCommon<GridApiCommunity, GridPrivateApiCommunity, DataGridProcessedProps>, GridRowMultiSelectionApi, GridColumnReorderApi, GridRowProApi {}