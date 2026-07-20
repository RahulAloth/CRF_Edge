import type { RefObject } from '@mui/x-internals/types';
import type { GridPrivateApiCommon } from "../../models/api/gridApiCommon.mjs";
export declare const useGridRefs: <PrivateApi extends GridPrivateApiCommon>(apiRef: RefObject<PrivateApi>) => void;