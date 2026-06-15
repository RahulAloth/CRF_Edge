import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommon } from "../../../models/api/gridApiCommon.mjs";
import type { GridPipeProcessorGroup } from "./gridPipeProcessingApi.mjs";
export declare const useGridRegisterPipeApplier: <PrivateApi extends GridPrivateApiCommon, G extends GridPipeProcessorGroup>(apiRef: RefObject<PrivateApi>, group: G, callback: () => void) => void;