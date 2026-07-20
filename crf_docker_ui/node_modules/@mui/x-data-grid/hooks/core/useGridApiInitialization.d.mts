import type { RefObject } from '@mui/x-internals/types';
import type { DataGridProcessedProps } from "../../models/props/DataGridProps.mjs";
import type { GridApiCommon, GridPrivateApiCommon } from "../../models/api/gridApiCommon.mjs";
export declare function unwrapPrivateAPI<PrivateApi extends GridPrivateApiCommon, Api extends GridApiCommon>(publicApi: Api): PrivateApi;
export declare function useGridApiInitialization<PrivateApi extends GridPrivateApiCommon, Api extends GridApiCommon>(inputApiRef: RefObject<Api | null> | undefined, props: Pick<DataGridProcessedProps, 'signature'>): RefObject<PrivateApi>;