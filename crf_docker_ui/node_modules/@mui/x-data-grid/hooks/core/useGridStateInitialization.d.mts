import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommon } from "../../models/api/gridApiCommon.mjs";
export declare const useGridStateInitialization: <PrivateApi extends GridPrivateApiCommon>(apiRef: RefObject<PrivateApi>) => void;