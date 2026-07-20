import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommon } from "../../../models/api/gridApiCommon.mjs";
import type { GridPipeProcessorGroup, GridPipeProcessor } from "./gridPipeProcessingApi.mjs";
export declare const useGridRegisterPipeProcessor: <PrivateApi extends GridPrivateApiCommon, G extends GridPipeProcessorGroup>(apiRef: RefObject<PrivateApi>, group: G, callback: GridPipeProcessor<G>, enabled?: boolean) => void;