import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommon } from "../../models/api/gridApiCommon.mjs";
import type { DataGridProcessedProps } from "../../models/props/DataGridProps.mjs";
export declare const useGridLocaleText: (apiRef: RefObject<GridPrivateApiCommon>, props: Pick<DataGridProcessedProps, "localeText">) => void;