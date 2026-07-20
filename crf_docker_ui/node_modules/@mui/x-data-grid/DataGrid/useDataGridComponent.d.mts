import type { RefObject } from '@mui/x-internals/types';
import type { DataGridProcessedProps } from "../models/props/DataGridProps.mjs";
import type { GridPrivateApiCommunity } from "../models/api/gridApiCommunity.mjs";
import type { GridConfiguration } from "../models/configuration/gridConfiguration.mjs";
export declare const useDataGridComponent: (apiRef: RefObject<GridPrivateApiCommunity>, props: DataGridProcessedProps, configuration: GridConfiguration) => void;